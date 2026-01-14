import { IndicatorInfo, ScenarioInfo, PeriodInfo, ClimateIndicator, Scenario, TimePeriod } from '@/types/climate';

export const INDICATORS: Record<ClimateIndicator, IndicatorInfo> = {
  tas: {
    code: 'tas',
    name: 'Température moyenne',
    description: 'Température moyenne quotidienne à 2 mètres',
    unit: '°C',
    colorScale: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026'],
    minValue: -5,
    maxValue: 30,
  },
  tasmax: {
    code: 'tasmax',
    name: 'Température maximale',
    description: 'Température maximale quotidienne à 2 mètres',
    unit: '°C',
    colorScale: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026'],
    minValue: 0,
    maxValue: 45,
  },
  tasmin: {
    code: 'tasmin',
    name: 'Température minimale',
    description: 'Température minimale quotidienne à 2 mètres',
    unit: '°C',
    colorScale: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026'],
    minValue: -20,
    maxValue: 25,
  },
  pr: {
    code: 'pr',
    name: 'Précipitations',
    description: 'Cumul de précipitations quotidiennes',
    unit: 'mm/jour',
    colorScale: ['#ffffd9', '#edf8b1', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#253494', '#081d58'],
    minValue: 0,
    maxValue: 15,
  },
  fd: {
    code: 'fd',
    name: 'Jours de gel',
    description: 'Nombre de jours où la température minimale est inférieure à 0°C',
    unit: 'jours',
    colorScale: ['#081d58', '#253494', '#225ea8', '#1d91c0', '#41b6c4', '#7fcdbb', '#c7e9b4', '#edf8b1', '#ffffd9'],
    minValue: 0,
    maxValue: 150,
  },
  tr: {
    code: 'tr',
    name: 'Nuits tropicales',
    description: 'Nombre de jours où la température minimale est supérieure à 20°C',
    unit: 'jours',
    colorScale: ['#ffffd9', '#fee391', '#fec44f', '#fe9929', '#ec7014', '#cc4c02', '#993404', '#662506'],
    minValue: 0,
    maxValue: 60,
  },
  su: {
    code: 'su',
    name: 'Jours d\'été',
    description: 'Nombre de jours où la température maximale dépasse 25°C',
    unit: 'jours',
    colorScale: ['#ffffd9', '#fee391', '#fec44f', '#fe9929', '#ec7014', '#cc4c02', '#993404', '#662506'],
    minValue: 0,
    maxValue: 180,
  },
  hwdi: {
    code: 'hwdi',
    name: 'Durée des vagues de chaleur',
    description: 'Indice de durée des vagues de chaleur',
    unit: 'jours',
    colorScale: ['#ffffd9', '#fee391', '#fec44f', '#fe9929', '#ec7014', '#cc4c02', '#993404', '#662506'],
    minValue: 0,
    maxValue: 30,
  },
  fwi: {
    code: 'fwi',
    name: 'Indice Feu Météo',
    description: 'Indice météorologique de risque incendie',
    unit: '-',
    colorScale: ['#2166ac', '#67a9cf', '#d1e5f0', '#fddbc7', '#ef8a62', '#b2182b'],
    minValue: 0,
    maxValue: 50,
  },
};

export const SCENARIOS: Record<Scenario, ScenarioInfo> = {
  rcp26: {
    code: 'rcp26',
    name: 'RCP 2.6',
    description: 'Scénario d\'atténuation forte - Réchauffement limité à +2°C',
    color: '#2166ac',
    warmingRange: '+1.0°C à +2.4°C',
  },
  rcp45: {
    code: 'rcp45',
    name: 'RCP 4.5',
    description: 'Scénario intermédiaire - Stabilisation des émissions',
    color: '#fdae61',
    warmingRange: '+1.7°C à +3.2°C',
  },
  rcp85: {
    code: 'rcp85',
    name: 'RCP 8.5',
    description: 'Scénario sans politique climatique - Émissions croissantes',
    color: '#d73027',
    warmingRange: '+3.2°C à +5.4°C',
  },
};

export const PERIODS: Record<TimePeriod, PeriodInfo> = {
  reference: {
    code: 'reference',
    name: 'Référence',
    years: '1976-2005',
    label: 'Période de référence',
  },
  near: {
    code: 'near',
    name: 'Horizon proche',
    years: '2021-2050',
    label: 'Horizon proche',
  },
  mid: {
    code: 'mid',
    name: 'Milieu de siècle',
    years: '2041-2070',
    label: 'Milieu de siècle',
  },
  end: {
    code: 'end',
    name: 'Fin de siècle',
    years: '2071-2100',
    label: 'Fin de siècle',
  },
};

// Helper functions
export function getIndicatorInfo(code: ClimateIndicator): IndicatorInfo {
  return INDICATORS[code];
}

export function getScenarioInfo(code: Scenario): ScenarioInfo {
  return SCENARIOS[code];
}

export function getPeriodInfo(code: TimePeriod): PeriodInfo {
  return PERIODS[code];
}

export function getAllIndicators(): IndicatorInfo[] {
  return Object.values(INDICATORS);
}

export function getAllScenarios(): ScenarioInfo[] {
  return Object.values(SCENARIOS);
}

export function getAllPeriods(): PeriodInfo[] {
  return Object.values(PERIODS);
}
