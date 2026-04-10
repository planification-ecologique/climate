import path from 'path';

export type FuturePopLayerId =
  | 'futurepop-ssp2-2050'
  | 'futurepop-ssp2-2100'
  | 'futurepop-ssp4-2050'
  | 'futurepop-ssp4-2100'
  | 'futurepop-ssp2-diff-2050'
  | 'futurepop-ssp4-diff-2050';

export const ALL_FUTUREPOP_IDS: FuturePopLayerId[] = [
  'futurepop-ssp2-2050',
  'futurepop-ssp2-2100',
  'futurepop-ssp4-2050',
  'futurepop-ssp4-2100',
  'futurepop-ssp2-diff-2050',
  'futurepop-ssp4-diff-2050',
];

export function isFuturePopLayerId(id: string): id is FuturePopLayerId {
  return ALL_FUTUREPOP_IDS.includes(id as FuturePopLayerId);
}

export function isDiffLayer(layerId: FuturePopLayerId): boolean {
  return layerId.includes('-diff-');
}

export function getFuturePopColorRampFile(layerId: FuturePopLayerId): string {
  const filename = isDiffLayer(layerId) ? 'futurepop-diff-blue-red.txt' : 'futurepop-yellow-red.txt';
  return path.join(process.cwd(), 'src', 'lib', 'tiles', filename);
}

export function getFuturePopSourceTif(layerId: FuturePopLayerId): string {
  const repoRoot = path.resolve(process.cwd(), '..');

  switch (layerId) {
    case 'futurepop-ssp2-2050':
      return path.join(repoRoot, 'data', 'FuturePop_SSP2_1km_v0_2', 'FuturePop_SSP2_2050_1km_v0_2.tif');
    case 'futurepop-ssp2-2100':
      return path.join(repoRoot, 'data', 'FuturePop_SSP2_1km_v0_2', 'FuturePop_SSP2_2100_1km_v0_2.tif');
    case 'futurepop-ssp4-2050':
      return path.join(repoRoot, 'data', 'FuturePop_SSP4_1km_v0_2', 'FuturePop_SSP4_2050_1km_v0_2.tif');
    case 'futurepop-ssp4-2100':
      return path.join(repoRoot, 'data', 'FuturePop_SSP4_1km_v0_2', 'FuturePop_SSP4_2100_1km_v0_2.tif');
    case 'futurepop-ssp2-diff-2050':
      return path.join(repoRoot, 'data', 'FuturePop_diff', 'FuturePop_SSP2_diff_2050_minus_2025_france.tif');
    case 'futurepop-ssp4-diff-2050':
      return path.join(repoRoot, 'data', 'FuturePop_diff', 'FuturePop_SSP4_diff_2050_minus_2025_france.tif');
    default: {
      const _exhaustive: never = layerId;
      return _exhaustive;
    }
  }
}

export const FRANCE_BBOX_WGS84: [number, number, number, number] = [
  -5.5, // minLon
  41.0, // minLat
  9.9, // maxLon
  51.7, // maxLat
];
