import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { spawn } from 'child_process';
import { FRANCE_BBOX_WGS84, getFuturePopColorRampFile, getFuturePopSourceTif, isFuturePopLayerId, isDiffLayer, type FuturePopLayerId } from '@/lib/tiles/futurepop';

const TILE_SIZE = 256;

function tileToWebMercatorBbox(z: number, x: number, y: number): [number, number, number, number] {
  // WebMercator extent
  const originShift = 20037508.342789244;
  const initialResolution = (2 * originShift) / TILE_SIZE;
  const resolution = initialResolution / Math.pow(2, z);

  const minX = x * TILE_SIZE * resolution - originShift;
  const maxX = (x + 1) * TILE_SIZE * resolution - originShift;
  const maxY = originShift - y * TILE_SIZE * resolution;
  const minY = originShift - (y + 1) * TILE_SIZE * resolution;

  return [minX, minY, maxX, maxY];
}

function run(cmd: string, args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: ['ignore', 'ignore', 'pipe'] });
    let stderr = '';
    child.stderr.on('data', (d) => (stderr += d.toString()));
    child.on('error', reject);
    child.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${cmd} exited with code ${code}: ${stderr}`));
    });
  });
}

function runCapture(cmd: string, args: string[]): Promise<{ stdout: string; stderr: string }> {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: ['ignore', 'pipe', 'pipe'] });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (d) => (stdout += d.toString()));
    child.stderr.on('data', (d) => (stderr += d.toString()));
    child.on('error', reject);
    child.on('exit', (code) => {
      if (code === 0) resolve({ stdout, stderr });
      else reject(new Error(`${cmd} exited with code ${code}: ${stderr}`));
    });
  });
}

async function fileExists(p: string): Promise<boolean> {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function ensureFranceCog(layerId: FuturePopLayerId): Promise<string> {
  const src = getFuturePopSourceTif(layerId);
  const outDir = path.join(process.cwd(), '.cache', 'futurepop-cog-france');
  const out = path.join(outDir, `${layerId}.tif`);

  if (await fileExists(out)) return out;
  await fs.mkdir(outDir, { recursive: true });

  // Diff layers are already France-cropped (WGS84), just reproject to 3857 COG
  // Normal layers are global, crop + reproject
  const isDiff = isDiffLayer(layerId);

  const args: string[] = [
    '-t_srs', 'EPSG:3857',
  ];

  if (!isDiff) {
    const [minLon, minLat, maxLon, maxLat] = FRANCE_BBOX_WGS84;
    args.push(
      '-te_srs', 'EPSG:4326',
      '-te', String(minLon), String(minLat), String(maxLon), String(maxLat),
    );
  }

  args.push(
    '-r', 'bilinear',
    '-multi',
    '-wo', 'NUM_THREADS=ALL_CPUS',
    '-of', 'COG',
  );

  if (isDiff) {
    // Diff data uses -9999 as nodata
    args.push('-srcnodata', '-9999', '-dstnodata', '-9999');
  } else {
    // Treat zeros as nodata for visualization (render them transparent)
    args.push('-dstnodata', '0');
  }

  args.push(src, out);
  await run('gdalwarp', args);

  return out;
}

interface ScaleParams {
  min: number;
  max: number;
}

async function getScaleParams(cogPath: string, layerId: FuturePopLayerId): Promise<ScaleParams | null> {
  const cacheJson = `${cogPath}.stats.json`;
  if (await fileExists(cacheJson)) {
    const raw = await fs.readFile(cacheJson, 'utf-8');
    return JSON.parse(raw) as ScaleParams;
  }

  const { stdout: infoRaw } = await runCapture('gdalinfo', ['-stats', '-json', cogPath]);

  try {
    const info = JSON.parse(infoRaw);
    const band = info?.bands?.[0];
    const statsMin = Number(band?.metadata?.['']?.STATISTICS_MINIMUM);
    const statsMax = Number(band?.metadata?.['']?.STATISTICS_MAXIMUM);

    if (!Number.isFinite(statsMin) || !Number.isFinite(statsMax)) return null;

    let out: ScaleParams;

    if (isDiffLayer(layerId)) {
      // Symmetric scale for divergent data: center zero at byte 128
      // Use a clamped range to make moderate changes visible
      // (P99.9 is ~300, so 500 captures most variation while keeping Paris visible)
      const absMax = Math.min(500, Math.max(Math.abs(statsMin), Math.abs(statsMax)));
      out = { min: -absMax, max: absMax };
    } else {
      // Normal population: scale from 1 to a clamped max
      const min = Math.max(1, statsMin);
      const max = Math.min(statsMax, min + (statsMax - min) * 0.2);
      out = { min, max };
    }

    await fs.writeFile(cacheJson, JSON.stringify(out), 'utf-8');
    return out;
  } catch {
    return null;
  }
}

export async function GET(_req: NextRequest, ctx: { params: Promise<{ layerId: string; z: string; x: string; y: string }> }) {
  const { layerId, z, x, y } = await ctx.params;

  if (!isFuturePopLayerId(layerId)) {
    return NextResponse.json({ error: 'Unknown layer' }, { status: 404 });
  }

  const zClean = z.replace(/\.png$/i, '');
  const xClean = x.replace(/\.png$/i, '');
  const yClean = y.replace(/\.png$/i, '');

  const zi = Number(zClean);
  const xi = Number(xClean);
  const yi = Number(yClean);
  if (!Number.isInteger(zi) || !Number.isInteger(xi) || !Number.isInteger(yi)) {
    return NextResponse.json({ error: 'Invalid tile coords' }, { status: 400 });
  }

  const cacheDir = path.join(process.cwd(), '.cache', 'tiles', layerId, String(zi), String(xi));
  const cachePath = path.join(cacheDir, `${yi}.v2.png`);
  if (await fileExists(cachePath)) {
    const buf = await fs.readFile(cachePath);
    return new NextResponse(buf, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  }

  const cog = await ensureFranceCog(layerId);
  await fs.mkdir(cacheDir, { recursive: true });

  const [minX, minY, maxX, maxY] = tileToWebMercatorBbox(zi, xi, yi);

  const scale = await getScaleParams(cog, layerId);
  const tmpGray = path.join(cacheDir, `${yi}.v2.byte.tif`);
  const translateArgs = [
    '-of', 'GTiff',
    '-projwin_srs', 'EPSG:3857',
    '-projwin', String(minX), String(maxY), String(maxX), String(minY),
    '-outsize', String(TILE_SIZE), String(TILE_SIZE),
    '-ot', 'Byte',
  ];

  if (scale) {
    if (isDiffLayer(layerId)) {
      // Map [-absMax..+absMax] → [1..255] with zero at 128
      translateArgs.push('-scale', String(scale.min), String(scale.max), '1', '255');
    } else {
      // Map [min..max] → [1..255], 0 stays transparent
      translateArgs.push('-scale', String(scale.min), String(scale.max), '1', '255');
    }
  }

  translateArgs.push('-a_nodata', '0');
  translateArgs.push(cog, tmpGray);

  try {
    await run('gdal_translate', translateArgs);
    await run('gdaldem', [
      'color-relief',
      '-alpha',
      tmpGray,
      getFuturePopColorRampFile(layerId),
      cachePath,
    ]);
    await fs.unlink(tmpGray).catch(() => {});
    const buf = await fs.readFile(cachePath);
    return new NextResponse(buf, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (e) {
    await fs.unlink(tmpGray).catch(() => {});
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: 'Tile render failed', detail: message }, { status: 500 });
  }
}
