import { NextRequest, NextResponse } from 'next/server';

// Allowed WMS server URLs (whitelist for security)
const ALLOWED_WMS_HOSTS = [
  'climatedata.worldbank.org',
  'mapsref.brgm.fr',
  'georisques.gouv.fr',
  'www.georisques.gouv.fr',
  'wxs.ign.fr',
  'data.geopf.fr',
  'geoservices.brgm.fr',
  'services.sandre.eaufrance.fr',
  'ws.carmencarto.fr',
  'sedac.ciesin.columbia.edu',
];

const DEFAULT_FETCH_TIMEOUT_MS = 30_000;

/**
 * Convert EPSG:3857 (Web Mercator) coordinates to EPSG:4326 (WGS84)
 */
function webMercatorToWgs84(x: number, y: number): [number, number] {
  const lon = (x * 180) / 20037508.34;
  const lat = (Math.atan(Math.exp((y * Math.PI) / 20037508.34)) * 360) / Math.PI - 90;
  return [lon, lat];
}

/**
 * Transform bbox from EPSG:3857 to EPSG:4326
 * Input: minX,minY,maxX,maxY in Web Mercator
 * Output: minLat,minLon,maxLat,maxLon in WGS84 (WMS 1.3.0 order for EPSG:4326)
 */
function transformBbox3857to4326(bbox3857: string): string {
  const [minX, minY, maxX, maxY] = bbox3857.split(',').map(Number);
  const [minLon, minLat] = webMercatorToWgs84(minX, minY);
  const [maxLon, maxLat] = webMercatorToWgs84(maxX, maxY);
  // WMS 1.3.0 with CRS=EPSG:4326 expects: minLat,minLon,maxLat,maxLon
  return `${minLat},${minLon},${maxLat},${maxLon}`;
}

/**
 * WMS Proxy API Route
 * Proxies WMS requests to external servers to bypass CORS restrictions.
 * Also handles coordinate transformation from EPSG:3857 to EPSG:4326 for servers
 * that don't support Web Mercator.
 * 
 * Usage: /api/wms?baseUrl=<encoded-base-url>&bbox=<bbox-3857>&reproject=true
 * 
 * Parameters:
 * - baseUrl: URL-encoded WMS base URL with all params except bbox
 * - bbox: Bounding box in EPSG:3857 format (minx,miny,maxx,maxy)
 * - reproject: If true, transforms bbox from EPSG:3857 to EPSG:4326
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const baseUrl = searchParams.get('baseUrl');
  const bbox = searchParams.get('bbox');
  const reproject = searchParams.get('reproject') === 'true';
  const timeoutMsRaw = searchParams.get('timeoutMs');
  const timeoutMs = timeoutMsRaw ? Math.min(Math.max(parseInt(timeoutMsRaw, 10) || DEFAULT_FETCH_TIMEOUT_MS, 5_000), 120_000) : DEFAULT_FETCH_TIMEOUT_MS;

  if (!baseUrl) {
    return NextResponse.json(
      { error: 'Missing baseUrl parameter' },
      { status: 400 }
    );
  }

  if (!bbox) {
    return NextResponse.json(
      { error: 'Missing bbox parameter' },
      { status: 400 }
    );
  }

  try {
    // Decode the base URL
    const decodedBaseUrl = decodeURIComponent(baseUrl);
    
    // Parse hostname for security check
    const parsedUrl = new URL(decodedBaseUrl);

    // Security check: only allow whitelisted hosts
    if (!ALLOWED_WMS_HOSTS.includes(parsedUrl.hostname)) {
      console.error(`WMS proxy blocked: ${parsedUrl.hostname} not in whitelist`);
      return NextResponse.json(
        { error: 'WMS host not allowed' },
        { status: 403 }
      );
    }

    // Transform bbox if reprojection is requested (for servers that require EPSG:4326)
    const finalBbox = reproject ? transformBbox3857to4326(bbox) : bbox;

    // Build the full URL with bbox
    const fullUrl = `${decodedBaseUrl}&bbox=${finalBbox}`;
    
    // Fetch from the WMS server
    const response = await fetch(fullUrl, {
      // SEDAC/GeoServer can be slow to accept connections; give it more time than undici defaults.
      signal: AbortSignal.timeout(timeoutMs),
      headers: {
        'Accept': 'image/png,image/*,*/*',
        'User-Agent': 'Impact-Climat/1.0',
      },
    });

    if (!response.ok) {
      console.error(`WMS proxy error: ${response.status} for ${fullUrl}`);
      return new NextResponse(null, { status: response.status });
    }

    // Get the response body as array buffer
    const data = await response.arrayBuffer();

    // Return the image with appropriate headers
    return new NextResponse(data, {
      status: 200,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'image/png',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('WMS proxy error:', error);
    const message = error instanceof Error ? error.message : String(error);
    if (message.includes('Timeout') || message.includes('timed out') || message.includes('UND_ERR_CONNECT_TIMEOUT') || message.includes('AbortError')) {
      return NextResponse.json(
        { error: 'WMS upstream timed out' },
        { status: 504 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to fetch WMS tile' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
