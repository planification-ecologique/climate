/**
 * World Bank Climate Change Knowledge Portal (CCKP) API Integration
 * Source: https://climateknowledgeportal.worldbank.org/country/france/climate-data-projections
 * 
 * Provides CMIP6 climate projections at 0.25° resolution
 * Data includes temperature, precipitation, and extreme event indicators
 */

const CCKP_API_BASE = 'https://cckpapi.worldbank.org/cckp/v1';

// SSP Scenarios (Shared Socioeconomic Pathways)
export type SSPScenario = 'ssp126' | 'ssp245' | 'ssp370' | 'ssp585';

export const SSP_SCENARIOS: Record<SSPScenario, { name: string; description: string; color: string }> = {
  ssp126: {
    name: 'SSP1-2.6',
    description: 'Durabilité - Faibles émissions, réchauffement < 2°C',
    color: '#2166ac',
  },
  ssp245: {
    name: 'SSP2-4.5',
    description: 'Intermédiaire - Tendance actuelle',
    color: '#fdae61',
  },
  ssp370: {
    name: 'SSP3-7.0',
    description: 'Rivalités régionales - Émissions élevées',
    color: '#f46d43',
  },
  ssp585: {
    name: 'SSP5-8.5',
    description: 'Développement fossile - Très fortes émissions',
    color: '#d73027',
  },
};

// Time periods for projections
export type ProjectionPeriod = '2020-2039' | '2040-2059' | '2060-2079' | '2080-2099';

export const PROJECTION_PERIODS: Record<ProjectionPeriod, { label: string; midYear: number }> = {
  '2020-2039': { label: 'Horizon 2030', midYear: 2030 },
  '2040-2059': { label: 'Horizon 2050', midYear: 2050 },
  '2060-2079': { label: 'Horizon 2070', midYear: 2070 },
  '2080-2099': { label: 'Horizon 2100', midYear: 2100 },
};

// Climate variables available
export type ClimateVariable = 'tas' | 'tasmax' | 'tasmin' | 'pr' | 'fd' | 'tr' | 'su' | 'hd35';

export const CLIMATE_VARIABLES: Record<ClimateVariable, { name: string; unit: string; description: string }> = {
  tas: { name: 'Température moyenne', unit: '°C', description: 'Température moyenne journalière' },
  tasmax: { name: 'Température maximale', unit: '°C', description: 'Température maximale journalière' },
  tasmin: { name: 'Température minimale', unit: '°C', description: 'Température minimale journalière' },
  pr: { name: 'Précipitations', unit: 'mm', description: 'Précipitations totales' },
  fd: { name: 'Jours de gel', unit: 'jours', description: 'Nombre de jours où Tmin < 0°C' },
  tr: { name: 'Nuits tropicales', unit: 'jours', description: 'Nombre de nuits où Tmin > 20°C' },
  su: { name: 'Jours d\'été', unit: 'jours', description: 'Nombre de jours où Tmax > 25°C' },
  hd35: { name: 'Jours très chauds', unit: 'jours', description: 'Nombre de jours où Tmax > 35°C' },
};

export interface ClimateProjection {
  variable: ClimateVariable;
  scenario: SSPScenario;
  period: ProjectionPeriod;
  value: number;
  anomaly?: number;
  unit: string;
}

export interface CountryClimateData {
  countryCode: string;
  countryName: string;
  historicalBaseline: {
    period: string;
    tas: number;
    pr: number;
  };
  projections: ClimateProjection[];
}

/**
 * Fetch climate projection data from World Bank CCKP API
 */
export async function fetchClimateProjection(
  variable: ClimateVariable,
  scenario: SSPScenario,
  period: ProjectionPeriod,
  countryCode: string = 'FRA'
): Promise<ClimateProjection | null> {
  try {
    // Build API URL for anomaly data
    const url = `${CCKP_API_BASE}/cmip6-x0.25_climatology_${variable}_anomaly_annual_${period}_median_${scenario}_ensemble_all_mean/${countryCode}?_format=json`;
    
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`CCKP API error: ${response.status}`);
      return null;
    }
    
    const data = await response.json();
    
    if (data.data && data.data[countryCode]) {
      // Extract the value (API returns object with date key)
      const values = Object.values(data.data[countryCode]) as number[];
      const anomaly = values[0];
      
      return {
        variable,
        scenario,
        period,
        value: anomaly,
        anomaly,
        unit: CLIMATE_VARIABLES[variable].unit,
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching CCKP data:', error);
    return null;
  }
}

/**
 * Fetch multiple projections for comparison
 */
export async function fetchProjectionsForPeriod(
  period: ProjectionPeriod,
  variables: ClimateVariable[] = ['tas', 'tasmax', 'pr'],
  countryCode: string = 'FRA'
): Promise<ClimateProjection[]> {
  const scenarios: SSPScenario[] = ['ssp126', 'ssp245', 'ssp585'];
  const projections: ClimateProjection[] = [];
  
  for (const variable of variables) {
    for (const scenario of scenarios) {
      const projection = await fetchClimateProjection(variable, scenario, period, countryCode);
      if (projection) {
        projections.push(projection);
      }
    }
  }
  
  return projections;
}

/**
 * Get pre-computed summary for France (faster than API calls)
 * Based on CCKP CMIP6 data for France
 * Source: https://climateknowledgeportal.worldbank.org/country/france/climate-data-projections
 */
export function getFranceClimateSummary(): CountryClimateData {
  return {
    countryCode: 'FRA',
    countryName: 'France',
    historicalBaseline: {
      period: '1995-2014',
      tas: 11.4, // °C mean annual temperature
      pr: 889,   // mm annual precipitation
    },
    projections: [
      // 2050 projections (2040-2059)
      { variable: 'tas', scenario: 'ssp126', period: '2040-2059', value: 1.2, anomaly: 1.2, unit: '°C' },
      { variable: 'tas', scenario: 'ssp245', period: '2040-2059', value: 1.4, anomaly: 1.4, unit: '°C' },
      { variable: 'tas', scenario: 'ssp585', period: '2040-2059', value: 1.8, anomaly: 1.8, unit: '°C' },
      
      // 2100 projections (2080-2099)
      { variable: 'tas', scenario: 'ssp126', period: '2080-2099', value: 1.5, anomaly: 1.5, unit: '°C' },
      { variable: 'tas', scenario: 'ssp245', period: '2080-2099', value: 2.4, anomaly: 2.4, unit: '°C' },
      { variable: 'tas', scenario: 'ssp585', period: '2080-2099', value: 4.5, anomaly: 4.5, unit: '°C' },
      
      // Tropical nights (2080-2099)
      { variable: 'tr', scenario: 'ssp126', period: '2080-2099', value: 5, anomaly: 5, unit: 'jours' },
      { variable: 'tr', scenario: 'ssp245', period: '2080-2099', value: 12, anomaly: 12, unit: 'jours' },
      { variable: 'tr', scenario: 'ssp585', period: '2080-2099', value: 35, anomaly: 35, unit: 'jours' },
      
      // Hot days > 35°C (2080-2099)
      { variable: 'hd35', scenario: 'ssp126', period: '2080-2099', value: 3, anomaly: 3, unit: 'jours' },
      { variable: 'hd35', scenario: 'ssp245', period: '2080-2099', value: 8, anomaly: 8, unit: 'jours' },
      { variable: 'hd35', scenario: 'ssp585', period: '2080-2099', value: 25, anomaly: 25, unit: 'jours' },
    ],
  };
}
