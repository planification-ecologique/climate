import { create } from 'zustand';
import { ClimateIndicator, Scenario, TimePeriod, MapViewport, SelectedLocation } from '@/types/climate';
import { getAllLayers } from '@/lib/climate/layers';

// Percentile options for World Bank CMIP6 data
export type Percentile = 'p10' | 'p50' | 'p90';

export const PERCENTILE_OPTIONS: Record<Percentile, { label: string; description: string }> = {
  p10: { label: 'P10 (optimiste)', description: '10e percentile - scénario bas' },
  p50: { label: 'P50 (médian)', description: '50e percentile - scénario médian' },
  p90: { label: 'P90 (pessimiste)', description: '90e percentile - scénario haut' },
};

interface ClimateState {
  // Current selections
  indicator: ClimateIndicator;
  scenario: Scenario;
  period: TimePeriod;
  percentile: Percentile;

  // Map state
  viewport: MapViewport;
  selectedLocation: SelectedLocation | null;

  // Layer visibility
  activeLayers: string[];
  layerOpacity: Record<string, number>;

  // UI state
  sidebarOpen: boolean;
  legendVisible: boolean;

  // Actions
  setIndicator: (indicator: ClimateIndicator) => void;
  setScenario: (scenario: Scenario) => void;
  setPeriod: (period: TimePeriod) => void;
  setPercentile: (percentile: Percentile) => void;
  setViewport: (viewport: MapViewport) => void;
  setSelectedLocation: (location: SelectedLocation | null) => void;
  toggleLayer: (layerId: string) => void;
  setLayerOpacity: (layerId: string, opacity: number) => void;
  setSidebarOpen: (open: boolean) => void;
  setLegendVisible: (visible: boolean) => void;
  resetToDefaults: () => void;
}

// Default viewport centered on France metropolitan
const DEFAULT_VIEWPORT: MapViewport = {
  latitude: 46.603354,
  longitude: 1.888334,
  zoom: 5.5,
};

// Default active layers - CMIP6 temperature projection (2050) + admin boundaries
const DEFAULT_ACTIVE_LAYERS: string[] = ['cmip6-tas-ssp585-2050', 'admin-departments', 'admin-regions', 'admin-country'];

// Initialize layer opacity from layer configs
const initializeLayerOpacity = (): Record<string, number> => {
  const opacities: Record<string, number> = {};
  getAllLayers().forEach(layer => {
    opacities[layer.id] = layer.opacity ?? 0.7;
  });
  return opacities;
};

export const useClimateStore = create<ClimateState>((set) => ({
  // Initial state
  indicator: 'tas',
  scenario: 'rcp45',
  period: 'end',
  percentile: 'p50',
  viewport: DEFAULT_VIEWPORT,
  selectedLocation: null,
  activeLayers: DEFAULT_ACTIVE_LAYERS,
  layerOpacity: initializeLayerOpacity(),
  sidebarOpen: true,
  legendVisible: true,

  // Actions
  setIndicator: (indicator) => set({ indicator }),
  setScenario: (scenario) => set({ scenario }),
  setPeriod: (period) => set({ period }),
  setPercentile: (percentile) => set({ percentile }),
  setViewport: (viewport) => set({ viewport }),
  setSelectedLocation: (location) => set({ selectedLocation: location }),

  toggleLayer: (layerId) =>
    set((state) => ({
      activeLayers: state.activeLayers.includes(layerId)
        ? state.activeLayers.filter((id) => id !== layerId)
        : [...state.activeLayers, layerId],
    })),

  setLayerOpacity: (layerId, opacity) =>
    set((state) => ({
      layerOpacity: { ...state.layerOpacity, [layerId]: opacity },
    })),

  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setLegendVisible: (visible) => set({ legendVisible: visible }),

  resetToDefaults: () =>
    set({
      indicator: 'tas',
      scenario: 'rcp45',
      period: 'end',
      percentile: 'p50',
      viewport: DEFAULT_VIEWPORT,
      selectedLocation: null,
      activeLayers: DEFAULT_ACTIVE_LAYERS,
      sidebarOpen: true,
      legendVisible: true,
    }),
}));
