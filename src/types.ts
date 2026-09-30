export interface StationAQI {
  station_id: string;
  cpcb_site_id?: string;
  station_name: string;
  city: string;
  state: string;
  zone?: string;
  category?: string;
  portal_link?: string;
  lat: number;
  lng: number;
  aqi: number;
  aqi_category: 'Good' | 'Satisfactory' | 'Moderate' | 'Poor' | 'Very Poor' | 'Severe';
  category_color: string;
  category_bg: string;
  dominant_pollutant: string;
  sub_indices: {
    'PM2.5': number;
    PM10: number;
    NO2: number;
    SO2: number;
    CO: number;
    O3: number;
  };
  pm25: number;
  pm10: number;
  no2: number;
  so2: number;
  co: number;
  o3: number;
  // 8 Target Meteorological Variables
  temperature_c: number;
  relative_humidity_pct: number;
  wind_speed_mps: number;
  wind_direction_deg: number;
  wind_direction_cardinal: string;
  solar_radiation_wm2: number;
  barometric_pressure_hpa: number;
  rainfall_mm: number;
  aerosol_optical_depth: number;
  sources_consolidated?: string[];
  status: string;
  last_updated: string;
}

export interface PipelineMetrics {
  total_stations: number;
  avg_aqi: number;
  avg_category: string;
  primary_dominant: string;
  peak_station: StationAQI | null;
  cleanest_station: StationAQI | null;
  dominant_breakdown: Record<string, number>;
  states_count?: number;
  cities_count?: number;
  weather_summary?: {
    avg_temp: number;
    avg_humidity: number;
    max_wind: number;
    avg_aod: number;
  };
}

export interface AgentOrchestrationResult {
  agent_name: string;
  framework: string;
  model: string;
  tool_called: string;
  status: string;
  elapsed_ms: number;
  executive_summary: string;
  actionable_advisories: string[];
  timestamp: string;
}

export interface AgentLogEntry {
  id: string;
  timestamp: string;
  type: 'TOOL_CALL' | 'TOOL_RESULT' | 'DATA_NORMALIZATION' | 'LLM_REASONING' | 'UI_UPDATE' | 'TIMER_TICK';
  message: string;
  details?: string;
}

export interface WeatherCovariates {
  temperature_c: number;
  relative_humidity_pct: number;
  wind_speed_mps: number;
  wind_direction_deg: number;
  wind_direction_cardinal?: string;
  solar_radiation_wm2: number;
  barometric_pressure_hpa: number;
  aerosol_optical_depth: number;
  dispersion_modulation_pct?: number;
}

export interface Forecast168hPoint {
  hour_index: number; // -167 to 0
  timestamp: string;
  value: number;
  is_current?: boolean;
  covariates?: WeatherCovariates;
}

export interface Forecast24hPoint {
  step: number; // 1 to 24
  horizon_label: string; // e.g. "t+1h"
  timestamp: string;
  timesfm: number;
  timesfm_lower_80: number;
  timesfm_upper_80: number;
  seasonal_naive?: number;
  delta?: number;
  covariates?: WeatherCovariates;
}

export interface ForecastMetrics {
  timesfm_mae: number;
  timesfm_rmse: number;
  timesfm_mape: number;
  seasonal_naive_mae?: number;
  seasonal_naive_rmse?: number;
  seasonal_naive_mape?: number;
  mae_improvement_pct?: number;
  rmse_improvement_pct?: number;
}

export interface ForecastResponse {
  station: StationAQI;
  target: string;
  unit: string;
  context_len: number;
  horizon_hours: number;
  historical_168h: Forecast168hPoint[];
  forecast_24h: Forecast24hPoint[];
  weather_covariates_summary?: {
    covariates_count: number;
    variables: string[];
    avg_temp: number;
    avg_humidity: number;
    avg_wind: number;
    avg_solar: number;
    avg_pressure: number;
    avg_aod: number;
    modulation_strategy: string;
  };
  metrics: ForecastMetrics;
  model_metadata: {
    timesfm: {
      name: string;
      architecture: string;
      context_len: number;
      horizon_len: number;
      description: string;
      covariates_used?: string[];
      covariate_weighting?: string;
    };
    seasonal_naive?: {
      name: string;
      sp: number;
      strategy: string;
      formula: string;
      description: string;
    };
  };
}

export interface BengaluruInterpolation {
  lat: number;
  lng: number;
  street_address: string;
  formatted_address: string;
  nearby_stations: Array<{
    station_id: string;
    station_name: string;
    distance_km: number;
    aqi: number;
    weight_pct?: number;
  }>;
  interpolation_method: 'single_nearest' | 'multi_station_average';
  pollutants: {
    pm25: number;
    pm10: number;
    no2: number;
    so2: number;
    co: number;
    o3: number;
  };
  sub_indices: {
    'PM2.5': number;
    PM10: number;
    NO2: number;
    SO2: number;
    CO: number;
    O3: number;
  };
  aqi: number;
  aqi_category: 'Good' | 'Satisfactory' | 'Moderate' | 'Poor' | 'Very Poor' | 'Severe';
  category_color: string;
  category_bg: string;
  dominant_pollutant: string;
  weather: {
    temperature_c: number;
    relative_humidity_pct: number;
    wind_speed_mps: number;
    wind_direction_deg: number;
    wind_direction_cardinal: string;
    solar_radiation_wm2: number;
    barometric_pressure_hpa: number;
    rainfall_mm: number;
    aerosol_optical_depth: number;
  };
}

export interface PollutantImpactDetail {
  baseline: number;
  delta: number;
  predicted: number;
  unit: string;
  rationale: string;
}

export interface DownwindAffectedArea {
  name: string;
  distance_km: number;
  estimated_arrival_mins: number;
  risk_level: 'Critical' | 'High' | 'Moderate' | 'Low';
  recommended_action: string;
}

export interface CitizenReportVerification {
  id: string;
  timestamp: string;
  lat: number;
  lng: number;
  street_address: string;
  user_description: string;
  media_type: 'image' | 'video';
  media_url?: string;
  is_real_hazard: boolean;
  confidence_score: number; // 0 to 1
  hazard_category: string;
  severity_level: 'Safe / Non-Hazard' | 'Low' | 'Moderate' | 'High' | 'Severe / Critical';
  verification_summary: string;
  visual_evidence: string;
  baseline_pollutants: {
    pm25: number;
    pm10: number;
    no2: number;
    so2: number;
    co: number;
    o3: number;
  };
  pollutant_impacts: {
    pm25: PollutantImpactDetail;
    pm10: PollutantImpactDetail;
    no2: PollutantImpactDetail;
    so2: PollutantImpactDetail;
    co: PollutantImpactDetail;
    o3: PollutantImpactDetail;
  };
  predicted_aqi: number;
  predicted_category: string;
  weather_snapshot: {
    temperature_c: number;
    relative_humidity_pct: number;
    wind_speed_mps: number;
    wind_direction_deg: number;
    wind_direction_cardinal: string;
    barometric_pressure_hpa: number;
  };
  downwind_dispersion: {
    plume_bearing_deg: number;
    plume_bearing_cardinal: string;
    wind_origin_cardinal: string;
    wind_speed_mps: number;
    dispersion_angle_deg: number;
    max_reach_km: number;
    affected_streets_and_areas: DownwindAffectedArea[];
    advisory_for_residents: string;
  };
  contributing_stations: Array<{
    station_id: string;
    station_name: string;
    distance_km: number;
  }>;
}
