import { WMSLayerConfig, WMTSLayerConfig, XYZLayerConfig } from '@/types/climate';

// Available WMS layers for climate projections and related data
// Focus on future climate scenarios (2050, 2100)

// Sea Level Rise Projections - Climate change impact visualization
// These layers show projected coastal flooding under different sea level rise scenarios
// corresponding to climate projections for 2050 (+1m) to 2100 (+3m)
export const SEA_LEVEL_RISE_LAYERS: WMSLayerConfig[] = [
  {
    id: 'slr-1m-2050',
    name: 'Submersion marine +1m (horizon 2050)',
    url: 'https://mapsref.brgm.fr/wxs/sea_level_rise/littoral_slr',
    layers: 'LIT_SLR_MNT_NIVEAU_1.0',
    version: '1.1.1',
    format: 'image/png',
    transparent: true,
    attribution: '© BRGM - Projections climatiques',
    opacity: 0.7,
    visible: true,
    category: 'climate',
  },
  {
    id: 'slr-2m-2080',
    name: 'Submersion marine +2m (horizon 2080)',
    url: 'https://mapsref.brgm.fr/wxs/sea_level_rise/littoral_slr',
    layers: 'LIT_SLR_MNT_NIVEAU_2.0',
    version: '1.1.1',
    format: 'image/png',
    transparent: true,
    attribution: '© BRGM - Projections climatiques',
    opacity: 0.7,
    visible: false,
    category: 'climate',
  },
  {
    id: 'slr-3m-2100',
    name: 'Submersion marine +3m (horizon 2100)',
    url: 'https://mapsref.brgm.fr/wxs/sea_level_rise/littoral_slr',
    layers: 'LIT_SLR_MNT_NIVEAU_3.0',
    version: '1.1.1',
    format: 'image/png',
    transparent: true,
    attribution: '© BRGM - Projections climatiques',
    opacity: 0.7,
    visible: false,
    category: 'climate',
  },
  {
    id: 'slr-4m-extreme',
    name: 'Submersion marine +4m (scénario extrême)',
    url: 'https://mapsref.brgm.fr/wxs/sea_level_rise/littoral_slr',
    layers: 'LIT_SLR_MNT_NIVEAU_4.0',
    version: '1.1.1',
    format: 'image/png',
    transparent: true,
    attribution: '© BRGM - Projections climatiques',
    opacity: 0.7,
    visible: false,
    category: 'climate',
  },
];

// Flood risk layers - Current baseline for climate adaptation
// Géorisques WMS does not send CORS headers; use proxy to avoid cross-origin errors.
// Note: Georisques WMS only supports EPSG:4326, so we use crs and needsProxy for reprojection.
export const FLOOD_RISK_LAYERS: WMSLayerConfig[] = [
  {
    id: 'flood-zones',
    name: 'Zones inondables actuelles (TRI)',
    url: 'https://georisques.gouv.fr/services/di_fxx_2020',
    layers: 'OUV_ZONSSINOND_FXX',
    version: '1.3.0',
    format: 'image/png',
    transparent: true,
    attribution: '© Géorisques',
    opacity: 0.6,
    visible: true,
    category: 'risk',
    needsProxy: true,
    crs: 'EPSG:4326',
  },
  {
    id: 'flood-alea',
    name: 'Aléas inondation',
    url: 'https://georisques.gouv.fr/services/di_fxx_2020',
    layers: 'OUV_ZONSALEA_FXX',
    version: '1.3.0',
    format: 'image/png',
    transparent: true,
    attribution: '© Géorisques',
    opacity: 0.6,
    visible: false,
    category: 'risk',
    needsProxy: true,
    crs: 'EPSG:4326',
  },
];

// Reference and administrative layers
export const REFERENCE_WMS_LAYERS: WMSLayerConfig[] = [
  // Cours d'eau - Sandre BD Topage
  {
    id: 'sandre-cours-eau',
    name: 'Cours d\'eau (BD Topage)',
    url: 'https://services.sandre.eaufrance.fr/geo/sandre',
    layers: 'CoursEau_FXX',
    version: '1.3.0',
    format: 'image/png',
    transparent: true,
    attribution: '© Sandre - EauFrance',
    opacity: 0.8,
    visible: false,
    category: 'reference',
  },
];

// Protected natural areas - INPN/MNHN
// Note: Carmen Carto uses WMS 1.1.1 (not 1.3.0) and requires CORS proxy
export const PROTECTED_AREAS_LAYERS: WMSLayerConfig[] = [
  {
    id: 'znieff-type1',
    name: 'ZNIEFF Type 1 (zones remarquables)',
    url: 'https://ws.carmencarto.fr/WMS/119/fxx_inpn',
    layers: 'Znieff1',
    version: '1.1.1',
    format: 'image/png',
    transparent: true,
    attribution: '© INPN - MNHN',
    opacity: 0.6,
    visible: false,
    category: 'environment',
    needsProxy: true,
  },
  {
    id: 'znieff-type2',
    name: 'ZNIEFF Type 2 (grands ensembles)',
    url: 'https://ws.carmencarto.fr/WMS/119/fxx_inpn',
    layers: 'Znieff2',
    version: '1.1.1',
    format: 'image/png',
    transparent: true,
    attribution: '© INPN - MNHN',
    opacity: 0.5,
    visible: false,
    category: 'environment',
    needsProxy: true,
  },
  {
    id: 'znieff-type1-mer',
    name: 'ZNIEFF Type 1 Marines',
    url: 'https://ws.carmencarto.fr/WMS/119/fxx_inpn',
    layers: 'Znieff1_mer',
    version: '1.1.1',
    format: 'image/png',
    transparent: true,
    attribution: '© INPN - MNHN',
    opacity: 0.6,
    visible: false,
    category: 'environment',
    needsProxy: true,
  },
  {
    id: 'znieff-type2-mer',
    name: 'ZNIEFF Type 2 Marines',
    url: 'https://ws.carmencarto.fr/WMS/119/fxx_inpn',
    layers: 'Znieff2_mer',
    version: '1.1.1',
    format: 'image/png',
    transparent: true,
    attribution: '© INPN - MNHN',
    opacity: 0.5,
    visible: false,
    category: 'environment',
    needsProxy: true,
  },
];

// Land cover and land use - IGN Geoplateforme
// WARNING: These layers have strict rate limits (1 req/sec) and may load slowly
// They require the proxy for bbox reprojection (EPSG:4326 only)
export const LAND_COVER_LAYERS: WMSLayerConfig[] = [
  // BD Forêt - Forest inventory
  {
    id: 'bdforet-v2',
    name: '🐢 Inventaire forestier (BD Forêt v2)',
    url: 'https://data.geopf.fr/wms-r/wms',
    layers: 'LANDCOVER.FORESTINVENTORY.V2',
    version: '1.3.0',
    format: 'image/png',
    transparent: true,
    attribution: '© IGN - BD Forêt (chargement lent)',
    opacity: 0.7,
    visible: false,
    category: 'environment',
    apiKey: 'essentiels',
    crs: 'EPSG:4326',
    needsProxy: true,
  },
  // RPG - Agricultural parcels
  {
    id: 'rpg-agriculture',
    name: '🐢 Parcelles agricoles (RPG)',
    url: 'https://data.geopf.fr/wms-r/wms',
    layers: 'LANDUSE.AGRICULTURE.LATEST',
    version: '1.3.0',
    format: 'image/png',
    transparent: true,
    attribution: '© IGN - RPG (chargement lent)',
    opacity: 0.7,
    visible: false,
    category: 'exposure',
    apiKey: 'essentiels',
    crs: 'EPSG:4326',
    needsProxy: true,
  },
];

// Additional risk layers - Géorisques & BRGM
export const GEOLOGICAL_RISK_LAYERS: WMSLayerConfig[] = [
  // Clay shrink-swell risk (Géorisques – no CORS; use proxy)
  {
    id: 'rga-argiles',
    name: 'Retrait-gonflement des argiles',
    url: 'https://www.georisques.gouv.fr/services',
    layers: 'ALEARG_REALISE',
    version: '1.3.0',
    format: 'image/png',
    transparent: true,
    attribution: '© Géorisques - BRGM',
    opacity: 0.6,
    visible: false,
    category: 'risk',
    needsProxy: true,
  },
  // Underground cavities
  {
    id: 'cavites-localisees',
    name: 'Cavités souterraines localisées',
    url: 'https://geoservices.brgm.fr/risques',
    layers: 'CAVITE_LOCALISEE',
    version: '1.1.1',
    format: 'image/png',
    transparent: true,
    attribution: '© BRGM',
    opacity: 0.7,
    visible: false,
    category: 'risk',
  },
  {
    id: 'cavites-communes',
    name: 'Cavités souterraines (par commune)',
    url: 'https://geoservices.brgm.fr/risques',
    layers: 'CAVITE_COMMUNE',
    version: '1.1.1',
    format: 'image/png',
    transparent: true,
    attribution: '© BRGM',
    opacity: 0.6,
    visible: false,
    category: 'risk',
  },
];

// NASA SEDAC — Global 1/8° urban land fraction (SSP), 2000–2100
// WMS: https://sedac.ciesin.columbia.edu/geoserver/wms
// Layer names follow the same GeoServer convention as SEDAC population SSP layers
// (workspace popdynamics, prefix popdynamics-1-8th-…, suffix _urban-land-fraction-proj-ssp{n}-{year}).
// If a layer does not load, query GetCapabilities on the URL above and adjust the `layers` string.
export const SEDAC_SSP_URBAN_LAND_LAYERS: WMSLayerConfig[] = [
  {
    id: 'sedac-urban-ssp-baseline-2000',
    name: 'Terres urbaines (réf. 2000, SEDAC 1/8°)',
    url: 'https://sedac.ciesin.columbia.edu/geoserver/wms',
    layers:
      'popdynamics:popdynamics-1-8th-urban-land-extent-projection-base-year-ssp-2000-2100_urban-land-fraction-ssps-byr-2000',
    version: '1.1.1',
    format: 'image/png',
    transparent: true,
    attribution:
      '© NASA SEDAC / CIESIN (Global One-Eighth Degree Urban Land Extent, DOI 10.7927/NJ0X-8Y67)',
    opacity: 0.65,
    visible: false,
    category: 'exposure',
    needsProxy: true,
  },
  {
    id: 'sedac-urban-ssp245-2050',
    name: 'Projection terres urbaines 2050 (SSP2, SEDAC 1/8°)',
    url: 'https://sedac.ciesin.columbia.edu/geoserver/wms',
    layers:
      'popdynamics:popdynamics-1-8th-urban-land-extent-projection-base-year-ssp-2000-2100_urban-land-fraction-proj-ssp2-2050',
    version: '1.1.1',
    format: 'image/png',
    transparent: true,
    attribution:
      '© NASA SEDAC / CIESIN (Global One-Eighth Degree Urban Land Extent, DOI 10.7927/NJ0X-8Y67)',
    opacity: 0.65,
    visible: false,
    category: 'exposure',
    needsProxy: true,
  },
  {
    id: 'sedac-urban-ssp585-2050',
    name: 'Projection terres urbaines 2050 (SSP5, SEDAC 1/8°)',
    url: 'https://sedac.ciesin.columbia.edu/geoserver/wms',
    layers:
      'popdynamics:popdynamics-1-8th-urban-land-extent-projection-base-year-ssp-2000-2100_urban-land-fraction-proj-ssp5-2050',
    version: '1.1.1',
    format: 'image/png',
    transparent: true,
    attribution:
      '© NASA SEDAC / CIESIN (Global One-Eighth Degree Urban Land Extent, DOI 10.7927/NJ0X-8Y67)',
    opacity: 0.65,
    visible: false,
    category: 'exposure',
    needsProxy: true,
  },
  {
    id: 'sedac-urban-ssp585-2100',
    name: 'Projection terres urbaines 2100 (SSP5, SEDAC 1/8°)',
    url: 'https://sedac.ciesin.columbia.edu/geoserver/wms',
    layers:
      'popdynamics:popdynamics-1-8th-urban-land-extent-projection-base-year-ssp-2000-2100_urban-land-fraction-proj-ssp5-2100',
    version: '1.1.1',
    format: 'image/png',
    transparent: true,
    attribution:
      '© NASA SEDAC / CIESIN (Global One-Eighth Degree Urban Land Extent, DOI 10.7927/NJ0X-8Y67)',
    opacity: 0.65,
    visible: false,
    category: 'exposure',
    needsProxy: true,
  },
];

// World Bank Climate Change Knowledge Portal - CMIP6 Climate Projections
// These are global gridded climate projections from THREDDS WMS server
// https://climatedata.worldbank.org/

// Helper to build World Bank THREDDS WMS URL
// Available percentiles: p10, p50, p90
export function buildWorldBankWMSUrl(
  variable: string,
  ssp: string,
  period: string,
  percentile: string = 'p50'
): string {
  // World Bank THREDDS server uses 'median' in filenames for p50 (50th percentile)
  const percentileSegment = percentile === 'p50' ? 'median' : percentile;
  return `https://climatedata.worldbank.org/thredds/wms/CRM/cmip6-x0.25/${variable}/ensemble-all-${ssp}/anomaly-${variable}-seasonal-mean_cmip6-x0.25_ensemble-all-${ssp}_climatology_${percentileSegment}_${period}.nc`;
}

// Check if a layer is a World Bank CMIP6 layer (needs dynamic percentile)
export function isWorldBankCMIP6Layer(layerId: string): boolean {
  return layerId.startsWith('cmip6-');
}

// Extract layer parameters from layer ID (e.g., 'cmip6-tas-ssp585-2050' -> { variable: 'tas', ssp: 'ssp585', period: '2040-2059' })
export function parseCMIP6LayerId(layerId: string): { variable: string; ssp: string; period: string } | null {
  const match = layerId.match(/^cmip6-(\w+)-(\w+)-(\d+)$/);
  if (!match) return null;
  
  const [, variable, ssp, year] = match;
  // Map year to period
  const periodMap: Record<string, string> = {
    '2050': '2040-2059',
    '2100': '2080-2099',
  };
  
  return {
    variable,
    ssp,
    period: periodMap[year] || '2040-2059',
  };
}

// Temperature Anomaly Projections - SSP5-8.5 (High emissions scenario)
export const CMIP6_TEMPERATURE_LAYERS: WMSLayerConfig[] = [
  // 2040-2059 (mid-century)
  {
    id: 'cmip6-tas-ssp585-2050',
    name: 'Anomalie température 2040-2059 (SSP5-8.5)',
    url: buildWorldBankWMSUrl('tas', 'ssp585', '2040-2059', 'p10'),
    layers: 'anomaly-tas-seasonal-mean',
    version: '1.3.0',
    format: 'image/png',
    transparent: true,
    attribution: '© World Bank Climate Change Knowledge Portal (CMIP6)',
    opacity: 0.75,
    visible: true,
    category: 'climate',
    styles: 'raster/cckp-GHRSST_anomaly',
    colorScaleRange: [-2, 8],
    time: '2050-01-16T00:00:00.000Z',
    crs: 'EPSG:4326',
  },
  // 2080-2099 (end of century)
  {
    id: 'cmip6-tas-ssp585-2100',
    name: 'Anomalie température 2080-2099 (SSP5-8.5)',
    url: buildWorldBankWMSUrl('tas', 'ssp585', '2080-2099', 'p10'),
    layers: 'anomaly-tas-seasonal-mean',
    version: '1.3.0',
    format: 'image/png',
    transparent: true,
    attribution: '© World Bank Climate Change Knowledge Portal (CMIP6)',
    opacity: 0.75,
    visible: false,
    category: 'climate',
    styles: 'raster/cckp-GHRSST_anomaly',
    colorScaleRange: [-2, 10],
    time: '2080-01-16T00:00:00.000Z',
    crs: 'EPSG:4326',
  },
];

// Temperature Anomaly Projections - SSP2-4.5 (Moderate scenario)
export const CMIP6_TEMPERATURE_SSP245_LAYERS: WMSLayerConfig[] = [
  {
    id: 'cmip6-tas-ssp245-2050',
    name: 'Anomalie température 2040-2059 (SSP2-4.5)',
    url: buildWorldBankWMSUrl('tas', 'ssp245', '2040-2059', 'p10'),
    layers: 'anomaly-tas-seasonal-mean',
    version: '1.3.0',
    format: 'image/png',
    transparent: true,
    attribution: '© World Bank Climate Change Knowledge Portal (CMIP6)',
    opacity: 0.75,
    visible: false,
    category: 'climate',
    styles: 'raster/cckp-GHRSST_anomaly',
    colorScaleRange: [-2, 6],
    time: '2050-01-16T00:00:00.000Z',
    crs: 'EPSG:4326',
  },
  {
    id: 'cmip6-tas-ssp245-2100',
    name: 'Anomalie température 2080-2099 (SSP2-4.5)',
    url: buildWorldBankWMSUrl('tas', 'ssp245', '2080-2099', 'p10'),
    layers: 'anomaly-tas-seasonal-mean',
    version: '1.3.0',
    format: 'image/png',
    transparent: true,
    attribution: '© World Bank Climate Change Knowledge Portal (CMIP6)',
    opacity: 0.75,
    visible: false,
    category: 'climate',
    styles: 'raster/cckp-GHRSST_anomaly',
    colorScaleRange: [-2, 8],
    time: '2080-01-16T00:00:00.000Z',
    crs: 'EPSG:4326',
  },
];

// Temperature Anomaly Projections - SSP1-2.6 (Low emissions scenario)
export const CMIP6_TEMPERATURE_SSP126_LAYERS: WMSLayerConfig[] = [
  {
    id: 'cmip6-tas-ssp126-2050',
    name: 'Anomalie température 2040-2059 (SSP1-2.6)',
    url: buildWorldBankWMSUrl('tas', 'ssp126', '2040-2059', 'p10'),
    layers: 'anomaly-tas-seasonal-mean',
    version: '1.3.0',
    format: 'image/png',
    transparent: true,
    attribution: '© World Bank Climate Change Knowledge Portal (CMIP6)',
    opacity: 0.75,
    visible: false,
    category: 'climate',
    styles: 'raster/cckp-GHRSST_anomaly',
    colorScaleRange: [-2, 4],
    time: '2050-01-16T00:00:00.000Z',
    crs: 'EPSG:4326',
  },
  {
    id: 'cmip6-tas-ssp126-2100',
    name: 'Anomalie température 2080-2099 (SSP1-2.6)',
    url: buildWorldBankWMSUrl('tas', 'ssp126', '2080-2099', 'p10'),
    layers: 'anomaly-tas-seasonal-mean',
    version: '1.3.0',
    format: 'image/png',
    transparent: true,
    attribution: '© World Bank Climate Change Knowledge Portal (CMIP6)',
    opacity: 0.75,
    visible: false,
    category: 'climate',
    styles: 'raster/cckp-GHRSST_anomaly',
    colorScaleRange: [-2, 5],
    time: '2080-01-16T00:00:00.000Z',
    crs: 'EPSG:4326',
  },
];

// Precipitation Anomaly Projections
export const CMIP6_PRECIPITATION_LAYERS: WMSLayerConfig[] = [
  {
    id: 'cmip6-pr-ssp585-2050',
    name: 'Anomalie précipitations 2040-2059 (SSP5-8.5)',
    url: buildWorldBankWMSUrl('pr', 'ssp585', '2040-2059', 'p10'),
    layers: 'anomaly-pr-seasonal-mean',
    version: '1.3.0',
    format: 'image/png',
    transparent: true,
    attribution: '© World Bank Climate Change Knowledge Portal (CMIP6)',
    opacity: 0.75,
    visible: false,
    category: 'climate',
    styles: 'raster/cckp-GHRSST_anomaly',
    colorScaleRange: [-50, 50],
    time: '2050-01-16T00:00:00.000Z',
    crs: 'EPSG:4326',
  },
  {
    id: 'cmip6-pr-ssp585-2100',
    name: 'Anomalie précipitations 2080-2099 (SSP5-8.5)',
    url: buildWorldBankWMSUrl('pr', 'ssp585', '2080-2099', 'p10'),
    layers: 'anomaly-pr-seasonal-mean',
    version: '1.3.0',
    format: 'image/png',
    transparent: true,
    attribution: '© World Bank Climate Change Knowledge Portal (CMIP6)',
    opacity: 0.75,
    visible: false,
    category: 'climate',
    styles: 'raster/cckp-GHRSST_anomaly',
    colorScaleRange: [-50, 50],
    time: '2080-01-16T00:00:00.000Z',
    crs: 'EPSG:4326',
  },
];

// Combined array of all CMIP6 climate projection layers
export const CLIMATE_PROJECTION_LAYERS: WMSLayerConfig[] = [
  ...CMIP6_TEMPERATURE_LAYERS,
  ...CMIP6_TEMPERATURE_SSP245_LAYERS,
  ...CMIP6_TEMPERATURE_SSP126_LAYERS,
  ...CMIP6_PRECIPITATION_LAYERS,
];

// OCS GE (Occupation du Sol Grande Échelle) - IGN WMTS Layers
// Land cover and land use at large scale, available via WMTS (pre-rendered tiles)
// Source: https://data.geopf.fr/wmts - PM_6_16 TileMatrixSet (Web Mercator, zoom 6-16)
export const OCS_GE_WMTS_LAYERS: WMTSLayerConfig[] = [
  {
    id: 'ocsge-couverture-2021-2023',
    name: 'Couverture du sol (OCS GE 2021-2023)',
    url: 'https://data.geopf.fr/wmts',
    layer: 'OCSGE.COUVERTURE.2021-2023',
    style: 'normal',
    tileMatrixSet: 'PM_6_16',
    format: 'image/png',
    attribution: '© IGN - OCS GE',
    opacity: 0.7,
    visible: false,
    category: 'exposure',
    minZoom: 6,
    maxZoom: 16,
  },
  {
    id: 'ocsge-usage-2021-2023',
    name: 'Usage du sol (OCS GE 2021-2023)',
    url: 'https://data.geopf.fr/wmts',
    layer: 'OCSGE.USAGE.2021-2023',
    style: 'normal',
    tileMatrixSet: 'PM_6_16',
    format: 'image/png',
    attribution: '© IGN - OCS GE',
    opacity: 0.7,
    visible: false,
    category: 'exposure',
    minZoom: 6,
    maxZoom: 16,
  },
  {
    id: 'ocsge-artif-2021-2023',
    name: 'Artificialisation (OCS GE 2021-2023)',
    url: 'https://data.geopf.fr/wmts',
    layer: 'OCSGE.ARTIF.2021-2023',
    style: 'normal',
    tileMatrixSet: 'PM_6_16',
    format: 'image/png',
    attribution: '© IGN - OCS GE',
    opacity: 0.7,
    visible: false,
    category: 'exposure',
    minZoom: 6,
    maxZoom: 16,
  },
  {
    id: 'ocsge-construction-2021-2023',
    name: 'Zones construites (OCS GE 2021-2023)',
    url: 'https://data.geopf.fr/wmts',
    layer: 'OCSGE.CONSTRUCTION.2021-2023',
    style: 'normal',
    tileMatrixSet: 'PM_6_16',
    format: 'image/png',
    attribution: '© IGN - OCS GE',
    opacity: 0.7,
    visible: false,
    category: 'exposure',
    minZoom: 6,
    maxZoom: 16,
  },
];

// FuturePop (WorldPop) — local GeoTIFF tiles served by /api/tiles
// Source GeoTIFFs (WGS84) are stored in repo root under data/FuturePop_SSP2_1km_v0_2/
// We serve France-focused PNG tiles (WebMercator) via a small API route.
const FUTUREPOP_ATTRIBUTION = '© WorldPop (FuturePop SSPs 1km v0.2, DOI 10.5258/SOTON/WP00849)';

export const FUTUREPOP_XYZ_LAYERS: XYZLayerConfig[] = [
  // Absolute population layers
  {
    id: 'futurepop-ssp2-2050',
    name: 'Population SSP2 (2050)',
    tiles: ['/api/tiles/futurepop-ssp2-2050/{z}/{x}/{y}'],
    attribution: FUTUREPOP_ATTRIBUTION,
    opacity: 0.7,
    visible: false,
    category: 'population',
    minZoom: 4,
    maxZoom: 12,
  },
  {
    id: 'futurepop-ssp2-2100',
    name: 'Population SSP2 (2100)',
    tiles: ['/api/tiles/futurepop-ssp2-2100/{z}/{x}/{y}'],
    attribution: FUTUREPOP_ATTRIBUTION,
    opacity: 0.7,
    visible: false,
    category: 'population',
    minZoom: 4,
    maxZoom: 12,
  },
  {
    id: 'futurepop-ssp4-2050',
    name: 'Population SSP4 (2050)',
    tiles: ['/api/tiles/futurepop-ssp4-2050/{z}/{x}/{y}'],
    attribution: FUTUREPOP_ATTRIBUTION,
    opacity: 0.7,
    visible: false,
    category: 'population',
    minZoom: 4,
    maxZoom: 12,
  },
  {
    id: 'futurepop-ssp4-2100',
    name: 'Population SSP4 (2100)',
    tiles: ['/api/tiles/futurepop-ssp4-2100/{z}/{x}/{y}'],
    attribution: FUTUREPOP_ATTRIBUTION,
    opacity: 0.7,
    visible: false,
    category: 'population',
    minZoom: 4,
    maxZoom: 12,
  },
  // Diff layers (2050 - 2025)
  {
    id: 'futurepop-ssp2-diff-2050',
    name: 'Variation pop. SSP2 (2050 vs 2025)',
    tiles: ['/api/tiles/futurepop-ssp2-diff-2050/{z}/{x}/{y}'],
    attribution: FUTUREPOP_ATTRIBUTION,
    opacity: 0.7,
    visible: false,
    category: 'population',
    minZoom: 4,
    maxZoom: 12,
  },
  {
    id: 'futurepop-ssp4-diff-2050',
    name: 'Variation pop. SSP4 (2050 vs 2025)',
    tiles: ['/api/tiles/futurepop-ssp4-diff-2050/{z}/{x}/{y}'],
    attribution: FUTUREPOP_ATTRIBUTION,
    opacity: 0.7,
    visible: false,
    category: 'population',
    minZoom: 4,
    maxZoom: 12,
  },
];

// Get all layers combined
export function getAllLayers(): WMSLayerConfig[] {
  return [
    ...SEA_LEVEL_RISE_LAYERS,
    ...FLOOD_RISK_LAYERS,
    ...REFERENCE_WMS_LAYERS,
    ...CLIMATE_PROJECTION_LAYERS,
    ...PROTECTED_AREAS_LAYERS,
    ...LAND_COVER_LAYERS,
    ...GEOLOGICAL_RISK_LAYERS,
    ...SEDAC_SSP_URBAN_LAND_LAYERS,
  ];
}

export function getLayersByCategory(category: 'climate' | 'risk' | 'reference'): WMSLayerConfig[] {
  return getAllLayers().filter(layer => layer.category === category);
}

export function getLayerById(id: string): WMSLayerConfig | undefined {
  return getAllLayers().find(layer => layer.id === id);
}

// Get all WMTS layers
export function getAllWMTSLayers(): WMTSLayerConfig[] {
  return [...OCS_GE_WMTS_LAYERS];
}

// Get WMTS layer by ID
export function getWMTSLayerById(id: string): WMTSLayerConfig | undefined {
  return getAllWMTSLayers().find(layer => layer.id === id);
}

// Get all XYZ raster tile layers
export function getAllXYZLayers(): XYZLayerConfig[] {
  return [...FUTUREPOP_XYZ_LAYERS];
}

export function getXYZLayerById(id: string): XYZLayerConfig | undefined {
  return getAllXYZLayers().find(layer => layer.id === id);
}

// Data sources for climate projections (for future integration)
export const CLIMATE_DATA_SOURCES = {
  CHELSA: {
    name: 'CHELSA Climate',
    description: 'High-resolution climate data including future projections (CMIP6)',
    url: 'https://chelsa-climate.org/',
    periods: ['2041-2070', '2071-2100'],
    scenarios: ['ssp126', 'ssp245', 'ssp370', 'ssp585'],
    variables: ['bio1 (temperature)', 'bio12 (precipitation)'],
    format: 'COG (Cloud Optimized GeoTIFF)',
    accessNote: 'Requires titiler or similar tile server to serve as XYZ tiles',
  },
  METEO_FRANCE: {
    name: 'Météo-France / DRIAS',
    description: 'Official French climate projections',
    url: 'https://www.drias-climat.fr/',
    periods: ['2021-2050', '2041-2070', '2071-2100'],
    scenarios: ['rcp26', 'rcp45', 'rcp85'],
    variables: ['tas', 'tasmax', 'tasmin', 'pr', 'fd', 'tr', 'su'],
    format: 'NetCDF (requires processing)',
    accessNote: 'API access in development',
  },
};
