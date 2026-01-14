import { WMSLayerConfig } from '@/types/climate';

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
  },
];

// Reference and administrative layers
export const REFERENCE_WMS_LAYERS: WMSLayerConfig[] = [

];

// World Bank Climate Change Knowledge Portal - CMIP6 Climate Projections
// These are global gridded climate projections from THREDDS WMS server
// https://climatedata.worldbank.org/

// Helper to build World Bank THREDDS WMS URL
// Note: Available percentiles are p10, p90 (not p50/median which return 500 errors)
function buildWorldBankWMSUrl(
  variable: string,
  ssp: string,
  period: string,
  percentile: string = 'p10'
): string {
  return `https://climatedata.worldbank.org/thredds/wms/CRM/cmip6-x0.25/${variable}/ensemble-all-${ssp}/anomaly-${variable}-seasonal-mean_cmip6-x0.25_ensemble-all-${ssp}_climatology_${percentile}_${period}.nc`;
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

// Get all layers combined
export function getAllLayers(): WMSLayerConfig[] {
  return [
    ...SEA_LEVEL_RISE_LAYERS,
    ...FLOOD_RISK_LAYERS,
    ...REFERENCE_WMS_LAYERS,
    ...CLIMATE_PROJECTION_LAYERS,
  ];
}

export function getLayersByCategory(category: 'climate' | 'risk' | 'reference'): WMSLayerConfig[] {
  return getAllLayers().filter(layer => layer.category === category);
}

export function getLayerById(id: string): WMSLayerConfig | undefined {
  return getAllLayers().find(layer => layer.id === id);
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
