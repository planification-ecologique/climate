// Climate indicator types
export type ClimateIndicator =
  | 'tas'      // Mean temperature
  | 'tasmax'   // Maximum temperature
  | 'tasmin'   // Minimum temperature
  | 'pr'       // Daily precipitation
  | 'fd'       // Frost days
  | 'tr'       // Tropical nights
  | 'su'       // Summer days
  | 'hwdi'     // Heat wave duration index
  | 'fwi';     // Fire weather index

export interface IndicatorInfo {
  code: ClimateIndicator;
  name: string;
  description: string;
  unit: string;
  colorScale: string[];
  minValue: number;
  maxValue: number;
}

// Climate scenarios
export type Scenario = 'rcp26' | 'rcp45' | 'rcp85';

export interface ScenarioInfo {
  code: Scenario;
  name: string;
  description: string;
  color: string;
  warmingRange: string;
}

// Time periods
export type TimePeriod = 'reference' | 'near' | 'mid' | 'end';

export interface PeriodInfo {
  code: TimePeriod;
  name: string;
  years: string;
  label: string;
}

// Map state
export interface MapViewport {
  latitude: number;
  longitude: number;
  zoom: number;
}

export interface SelectedLocation {
  latitude: number;
  longitude: number;
  name?: string;
  data?: LocationClimateData;
}

export interface LocationClimateData {
  indicator: ClimateIndicator;
  scenario: Scenario;
  period: TimePeriod;
  value: number;
  unit: string;
  anomaly?: number;
}

// WMS Layer configuration
export interface WMSLayerConfig {
  id: string;
  name: string;
  url: string;
  layers: string;
  version: string;
  format?: string;
  transparent?: boolean;
  attribution: string;
  opacity?: number;
  visible?: boolean;
  category: 'climate' | 'risk' | 'reference' | 'environment' | 'exposure' | 'population';
  // Additional WMS parameters for THREDDS/CMIP6 servers
  styles?: string;
  colorScaleRange?: [number, number];
  time?: string;
  crs?: string; // Override CRS (default EPSG:3857, some servers need EPSG:4326)
  apiKey?: string; // API key for authentication (e.g., IGN Geoplateforme)
  needsProxy?: boolean; // Force use of CORS proxy even if not auto-detected
}

// World Bank Climate Data configuration
export interface CMIP6LayerConfig {
  variable: ClimateIndicator;
  scenario: Scenario;
  period: TimePeriod;
  percentile: 'p10' | 'p50' | 'p90'; // 10th, median, 90th percentile
}

// WMTS Layer configuration (for pre-rendered tile services like IGN)
export interface WMTSLayerConfig {
  id: string;
  name: string;
  url: string; // Base WMTS service URL (e.g., https://data.geopf.fr/wmts)
  layer: string; // WMTS layer identifier
  style: string; // WMTS style (usually 'normal')
  tileMatrixSet: string; // TileMatrixSet identifier (e.g., PM_6_16 for Web Mercator)
  format: string; // Tile format (e.g., 'image/png')
  attribution: string;
  opacity?: number;
  visible?: boolean;
  category: 'climate' | 'risk' | 'reference' | 'environment' | 'exposure' | 'population';
  minZoom?: number; // Minimum zoom level
  maxZoom?: number; // Maximum zoom level
}

// XYZ Raster tiles configuration (e.g., self-hosted tiles)
export interface XYZLayerConfig {
  id: string;
  name: string;
  tiles: string[]; // Tile URL templates: https://.../{z}/{x}/{y}.png
  attribution: string;
  opacity?: number;
  visible?: boolean;
  category: 'climate' | 'risk' | 'reference' | 'environment' | 'exposure' | 'population';
  minZoom?: number;
  maxZoom?: number;
}
