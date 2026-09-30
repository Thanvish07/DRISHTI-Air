import React, { useState, useEffect, useMemo } from 'react';
import { StationAQI, ForecastResponse, Forecast24hPoint } from '../types';
import {
  X,
  TrendingUp,
  Activity,
  Layers,
  Sparkles,
  Clock,
  Calendar,
  CheckCircle2,
  Copy,
  Check,
  Code2,
  ArrowUpRight,
  ArrowDownRight,
  ShieldAlert,
  Info,
  ExternalLink,
  Wind,
  Thermometer,
  Droplets,
  Sun,
  Gauge,
  CloudRain,
} from 'lucide-react';

interface ForecastModalProps {
  station: StationAQI | null;
  initialTarget?: string;
  isOpen: boolean;
  onClose: () => void;
}

const TARGETS = [
  { id: 'AQI', label: 'Overall NAQI', unit: 'Index', color: '#10b981' },
  { id: 'PM2.5', label: 'PM2.5', unit: 'µg/m³', color: '#f59e0b' },
  { id: 'PM10', label: 'PM10', unit: 'µg/m³', color: '#eab308' },
  { id: 'CO', label: 'CO (Carbon Monoxide)', unit: 'mg/m³', color: '#06b6d4' },
  { id: 'NO2', label: 'NO2', unit: 'µg/m³', color: '#ec4899' },
  { id: 'SO2', label: 'SO2', unit: 'µg/m³', color: '#8b5cf6' },
  { id: 'O3', label: 'Ozone (O3)', unit: 'µg/m³', color: '#3b82f6' },
];

export const ForecastModal: React.FC<ForecastModalProps> = ({
  station,
  initialTarget = 'AQI',
  isOpen,
  onClose,
}) => {
  const [selectedTarget, setSelectedTarget] = useState<string>(initialTarget);
  const [forecastData, setForecastData] = useState<ForecastResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<Forecast24hPoint | null>(null);
  const [viewScope, setViewScope] = useState<'24h' | '168h_context'>('24h');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [showCodeSnippet, setShowCodeSnippet] = useState<boolean>(false);

  // Sync initial target if modal opens
  useEffect(() => {
    if (initialTarget) {
      setSelectedTarget(initialTarget);
    }
  }, [initialTarget, isOpen]);

  // Fetch forecast data when station or target changes
  useEffect(() => {
    if (!isOpen || !station) return;

    let isMounted = true;
    const fetchForecast = async () => {
      setLoading(true);
      setError(null);
      try {
        const queryParams = new URLSearchParams();
        queryParams.append('station_id', station.station_id);
        queryParams.append('target', selectedTarget);
        if (station.lat !== undefined) queryParams.append('lat', String(station.lat));
        if (station.lng !== undefined) queryParams.append('lng', String(station.lng));
        if (station.station_name) queryParams.append('station_name', station.station_name);
        if (station.aqi !== undefined) queryParams.append('aqi', String(station.aqi));
        if (station.pm25 !== undefined) queryParams.append('pm25', String(station.pm25));
        if (station.pm10 !== undefined) queryParams.append('pm10', String(station.pm10));
        if (station.no2 !== undefined) queryParams.append('no2', String(station.no2));
        if (station.so2 !== undefined) queryParams.append('so2', String(station.so2));
        if (station.co !== undefined) queryParams.append('co', String(station.co));
        if (station.o3 !== undefined) queryParams.append('o3', String(station.o3));
        if (station.temperature_c !== undefined) queryParams.append('temp', String(station.temperature_c));
        if (station.relative_humidity_pct !== undefined) queryParams.append('rh', String(station.relative_humidity_pct));
        if (station.wind_speed_mps !== undefined) queryParams.append('wind', String(station.wind_speed_mps));
        if (station.barometric_pressure_hpa !== undefined) queryParams.append('press', String(station.barometric_pressure_hpa));
        if (station.aerosol_optical_depth !== undefined) queryParams.append('aod', String(station.aerosol_optical_depth));

        const res = await fetch(`/api/forecast/24h?${queryParams.toString()}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch forecast`);
        const data: ForecastResponse = await res.json();
        if (isMounted) {
          setForecastData(data);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || 'Failed to compute 24-hour forecast');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchForecast();

    return () => {
      isMounted = false;
    };
  }, [isOpen, station, selectedTarget]);

  // Python sktime snippet string for copy/inspection
  const pythonSnippet = useMemo(() => {
    const stId = station?.station_id || 'DL001';
    return `# -------------------------------------------------------------
# 24-Hour Forecasting Pipeline using sktime TimesFM Foundation Model
# Target: ${selectedTarget} | Station: ${stId} (${station?.station_name || 'CAAQMS'})
# Context: 168 Hours (1 full week) | Horizon: 24 Hours Ahead
# Dynamic Exogenous Weather Covariates (IMD / CAAQMS / GEE):
# - Wind Speed (m/s) [Atmospheric Dispersion & Advection]
# - Ambient Temperature (°C) [PBL Height & Nocturnal Thermal Inversion]
# - Relative Humidity (%) [Hygroscopic Aerosol Growth]
# - Solar Radiation (W/m²) [Photochemical Ozone / NO2 Kinetics]
# - Barometric Pressure (hPa) [Atmospheric Subsidence]
# - Aerosol Optical Depth (AOD) [Columnar Aerosol Loading]
# -------------------------------------------------------------
from sktime.forecasting.timesfm import TimesFMForecaster
from sktime.performance_metrics.forecasting import (
    MeanAbsoluteError,
    MeanSquaredError,
    MeanAbsolutePercentageError,
)
import numpy as np
import pandas as pd

# 1. Load station ${stId} 168-hour historical telemetry (${selectedTarget})
y_train = pd.Series(
    historical_168h_values,
    index=pd.date_range(end=current_timestamp, periods=168, freq="h"),
    name="${selectedTarget}"
)

# 2. Ingest 6 dynamic meteorological covariates (X_train)
X_train = pd.DataFrame({
    "wind_speed_mps": historical_weather["wind_speed_mps"],
    "temperature_c": historical_weather["temperature_c"],
    "relative_humidity_pct": historical_weather["relative_humidity_pct"],
    "solar_radiation_wm2": historical_weather["solar_radiation_wm2"],
    "barometric_pressure_hpa": historical_weather["barometric_pressure_hpa"],
    "aerosol_optical_depth": historical_weather["aerosol_optical_depth"],
}, index=y_train.index)

# 3. Projected 24-hour weather covariates for the forecast horizon (X_future)
future_index = pd.date_range(start=current_timestamp + pd.Timedelta(hours=1), periods=24, freq="h")
X_future = pd.DataFrame({
    "wind_speed_mps": future_weather_24h["wind_speed_mps"],
    "temperature_c": future_weather_24h["temperature_c"],
    "relative_humidity_pct": future_weather_24h["relative_humidity_pct"],
    "solar_radiation_wm2": future_weather_24h["solar_radiation_wm2"],
    "barometric_pressure_hpa": future_weather_24h["barometric_pressure_hpa"],
    "aerosol_optical_depth": future_weather_24h["aerosol_optical_depth"],
}, index=future_index)

fh = np.arange(1, 25)

# 4. Google TimesFM Foundation Model Forecaster with Dynamic Exogenous Covariates (X-Reg)
tfm_model = TimesFMForecaster(
    context_len=168,
    horizon_len=24,
    backend="cpu"
)
# Condition foundation model on target time series and weather covariates
tfm_model.fit(y=y_train, X=X_train)
y_pred_tfm = tfm_model.predict(fh=fh, X=X_future)

# 5. Compute validation metrics
mae = MeanAbsoluteError()
rmse = MeanSquaredError(square_root=True)
mape = MeanAbsolutePercentageError(symmetric=True)

print(f"TimesFM Validation MAE:  {mae(y_train[-24:], y_pred_tfm):.2f}")
print(f"TimesFM Validation RMSE: {rmse(y_train[-24:], y_pred_tfm):.2f}")
print(f"TimesFM Validation sMAPE: {mape(y_train[-24:], y_pred_tfm) * 100:.1f}%")
`;
  }, [station, selectedTarget]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(pythonSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  if (!isOpen || !station) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div
        className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-5xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 md:p-5 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border-b border-slate-800 flex items-start justify-between gap-3 shrink-0">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/30 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                sktime TimesFM Pipeline
              </span>
              <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-mono text-xs font-bold border border-sky-500/30 flex items-center gap-1">
                <Wind className="w-3.5 h-3.5" />
                6 Weather Covariates Active
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-xs font-semibold border border-slate-700">
                {station.station_id}
              </span>
              {station.cpcb_site_id && (
                <span className="px-2 py-0.5 rounded bg-slate-800/80 text-slate-400 font-mono text-xs">
                  {station.cpcb_site_id}
                </span>
              )}
              {station.category && (
                <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 text-xs border border-indigo-500/20">
                  {station.category}
                </span>
              )}
            </div>

            <h3 className="text-lg md:text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <span>{station.station_name}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {station.city}, {station.state} • 168-Hour Context Time-Series Horizon Evaluation
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCodeSnippet(!showCodeSnippet)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-slate-200 flex items-center gap-1.5 transition"
              title="View sktime Python execution code"
            >
              <Code2 className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Python Code</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 md:p-6 overflow-y-auto space-y-5 flex-1">
          {/* Target Variable Selector Tabs */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                Select Forecast Target
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                Context: <strong>168h</strong> (1 Week) → Horizon: <strong>24h Ahead</strong>
              </span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
              {TARGETS.map((t) => {
                const isSelected = selectedTarget === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTarget(t.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition shrink-0 flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-950/40 ring-1 ring-emerald-400/50'
                        : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/60'
                    }`}
                  >
                    <span>{t.label}</span>
                    <span className="text-[10px] opacity-75 font-mono">({t.unit})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Python sktime Execution Code Accordion */}
          {showCodeSnippet && (
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 relative font-mono text-xs text-slate-300">
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-800">
                <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5" />
                  sktime 24-Hour Forecasting Pipeline (Python Execution Code)
                </span>
                <button
                  onClick={handleCopyCode}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] flex items-center gap-1 transition"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="overflow-x-auto p-2 bg-slate-950/60 rounded text-[11px] leading-relaxed text-slate-300 select-all scrollbar-thin">
                {pythonSnippet}
              </pre>
            </div>
          )}

          {/* Loading / Error State */}
          {loading && (
            <div className="py-20 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-10 h-10 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-medium text-slate-300">
                Fitting sktime NaiveForecaster & TimesFM Transformer on 168h context...
              </p>
              <p className="text-xs text-slate-500 font-mono">
                Context: 168 hours • Horizon: 24 steps • Zero-shot patch autoregression
              </p>
            </div>
          )}

          {error && !loading && (
            <div className="p-4 rounded-xl bg-red-950/40 border border-red-800/60 text-red-200 text-xs flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Forecast Content */}
          {!loading && !error && forecastData && (
            <div className="space-y-4">
              {/* Dynamic Weather Covariates Conditioning Strip */}
              <div className="bg-slate-950/80 border border-sky-900/40 rounded-xl p-3 shadow-md space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-sky-950/80 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded-md bg-sky-500/10 text-sky-400">
                      <Wind className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-xs font-bold text-sky-300 uppercase tracking-wider font-mono">
                      Dynamic Weather Covariates Conditioning (TimesFM X-Reg)
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-200 border border-sky-500/30 text-[10px] font-bold font-mono self-start sm:self-auto flex items-center gap-1">
                    <CloudRain className="w-3 h-3 text-sky-300" />
                    6 Exogenous Meteorological Covariates Active
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs">
                  {/* Covariate 1: Wind Speed */}
                  <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-2 flex flex-col justify-between">
                    <span className="text-[10px] text-slate-400 flex items-center gap-1 truncate">
                      <Wind className="w-3 h-3 text-teal-400 shrink-0" /> Wind Speed
                    </span>
                    <span className="text-sm font-bold text-white font-mono mt-0.5">
                      {forecastData.station.wind_speed_mps} <span className="text-[10px] text-slate-400 font-sans font-normal">m/s ({forecastData.station.wind_direction_cardinal || 'WSW'})</span>
                    </span>
                    <span className="text-[9px] text-teal-400/90 truncate mt-0.5 font-medium">
                      Mechanical Dispersion
                    </span>
                  </div>

                  {/* Covariate 2: Ambient Temperature */}
                  <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-2 flex flex-col justify-between">
                    <span className="text-[10px] text-slate-400 flex items-center gap-1 truncate">
                      <Thermometer className="w-3 h-3 text-amber-400 shrink-0" /> Ambient Temp
                    </span>
                    <span className="text-sm font-bold text-white font-mono mt-0.5">
                      {forecastData.station.temperature_c} <span className="text-[10px] text-slate-400 font-sans font-normal">°C</span>
                    </span>
                    <span className="text-[9px] text-amber-400/90 truncate mt-0.5 font-medium">
                      PBL & Thermal Inversion
                    </span>
                  </div>

                  {/* Covariate 3: Relative Humidity */}
                  <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-2 flex flex-col justify-between">
                    <span className="text-[10px] text-slate-400 flex items-center gap-1 truncate">
                      <Droplets className="w-3 h-3 text-sky-400 shrink-0" /> Humidity
                    </span>
                    <span className="text-sm font-bold text-white font-mono mt-0.5">
                      {forecastData.station.relative_humidity_pct} <span className="text-[10px] text-slate-400 font-sans font-normal">%</span>
                    </span>
                    <span className="text-[9px] text-sky-400/90 truncate mt-0.5 font-medium">
                      Hygroscopic Swelling
                    </span>
                  </div>

                  {/* Covariate 4: Solar Radiation */}
                  <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-2 flex flex-col justify-between">
                    <span className="text-[10px] text-slate-400 flex items-center gap-1 truncate">
                      <Sun className="w-3 h-3 text-yellow-400 shrink-0" /> Solar Rad
                    </span>
                    <span className="text-sm font-bold text-white font-mono mt-0.5">
                      {forecastData.station.solar_radiation_wm2} <span className="text-[10px] text-slate-400 font-sans font-normal">W/m²</span>
                    </span>
                    <span className="text-[9px] text-yellow-400/90 truncate mt-0.5 font-medium">
                      Photochemical Kinetics
                    </span>
                  </div>

                  {/* Covariate 5: Barometric Pressure */}
                  <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-2 flex flex-col justify-between">
                    <span className="text-[10px] text-slate-400 flex items-center gap-1 truncate">
                      <Gauge className="w-3 h-3 text-indigo-400 shrink-0" /> Pressure
                    </span>
                    <span className="text-sm font-bold text-white font-mono mt-0.5">
                      {forecastData.station.barometric_pressure_hpa} <span className="text-[10px] text-slate-400 font-sans font-normal">hPa</span>
                    </span>
                    <span className="text-[9px] text-indigo-400/90 truncate mt-0.5 font-medium">
                      Atmospheric Subsidence
                    </span>
                  </div>

                  {/* Covariate 6: AOD */}
                  <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-2 flex flex-col justify-between">
                    <span className="text-[10px] text-slate-400 flex items-center gap-1 truncate">
                      <Activity className="w-3 h-3 text-purple-400 shrink-0" /> GEE AOD
                    </span>
                    <span className="text-sm font-bold text-white font-mono mt-0.5">
                      {forecastData.station.aerosol_optical_depth}
                    </span>
                    <span className="text-[9px] text-purple-400/90 truncate mt-0.5 font-medium">
                      Columnar Aerosol Loading
                    </span>
                  </div>
                </div>
              </div>

              {/* Macro Metric Strip (Current Value & Predicted Value) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Current Value Card */}
                {(() => {
                  const currentPt = forecastData.historical_168h[forecastData.historical_168h.length - 1];
                  const currentVal = currentPt?.value;
                  const currentDate = currentPt ? new Date(currentPt.timestamp) : null;
                  return (
                    <div className="bg-slate-950/70 border border-emerald-500/30 rounded-xl p-4 shadow-sm relative overflow-hidden flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 ring-4 ring-emerald-500/20 animate-pulse" />
                          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono">
                            Current Value
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[10px] font-bold font-mono">
                          T₀ Ground Telemetry
                        </span>
                      </div>

                      <div className="mt-2.5 flex items-baseline gap-2">
                        <span className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
                          {currentVal !== undefined ? currentVal : '-'}
                        </span>
                        <span className="text-sm font-semibold text-emerald-400 font-mono">
                          {forecastData.unit}
                        </span>
                      </div>

                      <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-slate-500" />
                          <span>
                            Baseline at {currentDate ? currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) : 'T₀ (Now)'}
                          </span>
                        </span>
                        <span className="text-slate-400 font-mono text-[10px]">
                          CPCB Station Sensor
                        </span>
                      </div>
                    </div>
                  );
                })()}

                {/* Predicted Value Card */}
                {(() => {
                  const currentPt = forecastData.historical_168h[forecastData.historical_168h.length - 1];
                  const currentVal = currentPt?.value;
                  const peakPt = [...forecastData.forecast_24h].sort((a, b) => b.timesfm - a.timesfm)[0];
                  const peakDate = peakPt ? new Date(peakPt.timestamp) : null;
                  const lastPt = forecastData.forecast_24h[forecastData.forecast_24h.length - 1];
                  const predictedVal = peakPt?.timesfm ?? lastPt?.timesfm;
                  const delta = (predictedVal !== undefined && currentVal !== undefined)
                    ? Number((predictedVal - currentVal).toFixed(1))
                    : null;

                  return (
                    <div className="bg-slate-950/70 border border-cyan-500/30 rounded-xl p-4 shadow-sm relative overflow-hidden flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono">
                            Predicted Value
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-[10px] font-bold font-mono">
                          TimesFM 24h Horizon
                        </span>
                      </div>

                      <div className="mt-2.5 flex items-baseline gap-2.5 flex-wrap">
                        <span className="text-3xl sm:text-4xl font-black text-cyan-300 font-mono tracking-tight">
                          {predictedVal ?? '-'}
                        </span>
                        <span className="text-sm font-semibold text-slate-400 font-mono">
                          {forecastData.unit}
                        </span>
                        {delta !== null && (
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-bold font-mono border flex items-center gap-1 ${
                              delta > 0
                                ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                                : delta < 0
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                : 'bg-slate-800 text-slate-300 border-slate-700'
                            }`}
                          >
                            {delta > 0 ? (
                              <>
                                <ArrowUpRight className="w-3 h-3" /> +{delta}
                              </>
                            ) : delta < 0 ? (
                              <>
                                <ArrowDownRight className="w-3 h-3" /> {delta}
                              </>
                            ) : (
                              '0.0'
                            )}
                            <span className="text-[10px] opacity-75 font-sans font-normal">vs current</span>
                          </span>
                        )}
                      </div>

                      <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
                          <span>
                            Peak at <strong>{peakPt?.horizon_label}</strong> ({peakDate ? peakDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) : '-'})
                          </span>
                        </span>
                        <span className="text-slate-400 font-mono text-[10px]">
                          24h End: {lastPt?.timesfm} {forecastData.unit}
                        </span>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* View Scope Toggle & Graph Legend */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-950/50 p-2.5 rounded-xl border border-slate-800">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setViewScope('24h')}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                      viewScope === '24h'
                        ? 'bg-slate-800 text-white font-semibold shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    24h Forecast Horizon
                  </button>
                  <button
                    onClick={() => setViewScope('168h_context')}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                      viewScope === '168h_context'
                        ? 'bg-slate-800 text-white font-semibold shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    7-Day Context (168h) + Horizon
                  </button>
                </div>

                <div className="flex items-center gap-4 text-xs font-medium flex-wrap">
                  {/* TimesFM Legend */}
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-1 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                    <span className="text-cyan-300 font-semibold">Google TimesFM (Zero-shot Foundation)</span>
                  </div>

                  {/* Confidence Band Legend */}
                  {viewScope === '24h' && (
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 bg-cyan-500/20 border border-cyan-400/40 rounded-sm" />
                      <span className="text-slate-400 text-[11px]">80% Quantile Confidence Interval</span>
                    </div>
                  )}

                  {/* T0 Origin Anchor */}
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white" />
                    <span className="text-emerald-400 text-[11px]">T₀ Base Reading</span>
                  </div>
                </div>
              </div>

              {/* Interactive SVG Plot / Graph */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 md:p-5 relative shadow-inner">
                {viewScope === '24h' ? (
                  <Forecast24hPlot
                    forecastPoints={forecastData.forecast_24h}
                    currentValue={forecastData.historical_168h[forecastData.historical_168h.length - 1]?.value}
                    targetUnit={forecastData.unit}
                    targetName={forecastData.target}
                    hoveredPoint={hoveredPoint}
                    onHoverPoint={setHoveredPoint}
                  />
                ) : (
                  <Context168hPlot
                    historicalPoints={forecastData.historical_168h}
                    forecastPoints={forecastData.forecast_24h}
                    targetUnit={forecastData.unit}
                    targetName={forecastData.target}
                  />
                )}
              </div>

              {/* Hour-by-Hour Forecast Predictions Table */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <span>Google TimesFM Hour-by-Hour Predictions (Next 24 Hours)</span>
                  <span className="text-[11px] font-mono text-cyan-400">
                    24h Autoregressive Patch Horizon
                  </span>
                </div>

                <div className="border border-slate-800 rounded-xl overflow-hidden max-h-56 overflow-y-auto scrollbar-thin">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-slate-950 text-slate-400 sticky top-0 border-b border-slate-800">
                      <tr>
                        <th className="py-2.5 px-3">Horizon</th>
                        <th className="py-2.5 px-3">Timestamp</th>
                        <th className="py-2.5 px-3 text-right text-cyan-400">TimesFM Forecast</th>
                        <th className="py-2.5 px-3 text-right text-slate-400">80% CI</th>
                        <th className="py-2.5 px-3 text-right text-sky-400">Weather Covariates (Wind • Temp • RH)</th>
                        <th className="py-2.5 px-3 text-right">Regulatory Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-850 bg-slate-900/60 text-slate-200">
                      {forecastData.forecast_24h.map((pt) => {
                        const date = new Date(pt.timestamp);
                        const benchmark = getNaaqsBenchmark(forecastData.target);
                        const exceeds = benchmark ? pt.timesfm > benchmark.val : false;
                        return (
                          <tr
                            key={pt.step}
                            className={`hover:bg-slate-800/80 transition ${
                              hoveredPoint?.step === pt.step ? 'bg-cyan-950/40 ring-1 ring-cyan-500/40' : ''
                            }`}
                            onMouseEnter={() => setHoveredPoint(pt)}
                            onMouseLeave={() => setHoveredPoint(null)}
                          >
                            <td className="py-2.5 px-3 font-bold text-white">{pt.horizon_label}</td>
                            <td className="py-2.5 px-3 text-slate-400 font-sans text-[11px]">
                              {date.toLocaleDateString([], { month: 'short', day: 'numeric' })}{' '}
                              {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                            </td>
                            <td className="py-2.5 px-3 text-right font-extrabold text-cyan-300">
                              {pt.timesfm} {forecastData.unit}
                            </td>
                            <td className="py-2.5 px-3 text-right text-slate-300 text-[11px]">
                              [{pt.timesfm_lower_80} – {pt.timesfm_upper_80}]
                            </td>
                            <td className="py-2.5 px-3 text-right">
                              {pt.covariates ? (
                                <div className="flex items-center justify-end gap-1.5 text-[11px] font-mono">
                                  <span className="text-teal-400 font-semibold" title="Wind Speed">{pt.covariates.wind_speed_mps}m/s</span>
                                  <span className="text-slate-600">•</span>
                                  <span className="text-amber-400 font-semibold" title="Ambient Temperature">{pt.covariates.temperature_c}°C</span>
                                  <span className="text-slate-600">•</span>
                                  <span className="text-sky-400 font-semibold" title="Relative Humidity">{pt.covariates.relative_humidity_pct}%</span>
                                </div>
                              ) : (
                                <span className="text-slate-500 text-[10px] font-sans">-</span>
                              )}
                            </td>
                            <td className="py-2.5 px-3 text-right">
                              {benchmark ? (
                                exceeds ? (
                                  <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20 text-[10px] font-sans font-medium">
                                    Exceeds Limit ({benchmark.val})
                                  </span>
                                ) : (
                                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[10px] font-sans font-medium">
                                    Within Safe Limit
                                  </span>
                                )
                              ) : (
                                <span className="text-slate-500 text-[10px] font-sans">Monitored</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>sktime Time Series Forecasting Execution Engine (Google TimesFM Zero-Shot Foundation Model)</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Dynamic Tick & Axis Scaling Utilities for Pollutants & NAQI               */
/* -------------------------------------------------------------------------- */
function calculateNiceTicks(
  minVal: number,
  maxVal: number,
  maxTicks = 6,
  isDecimal = false
): {
  ticks: number[];
  niceMin: number;
  niceMax: number;
  decimals: number;
} {
  const span = Math.max(isDecimal ? 0.05 : 2, maxVal - minVal);
  const rawStep = span / (maxTicks - 1);
  const power = Math.floor(Math.log10(rawStep));
  const magnitude = Math.pow(10, power);
  const fraction = rawStep / magnitude;

  let niceFraction = 1;
  if (fraction < 1.5) niceFraction = 1;
  else if (fraction < 3) niceFraction = 2;
  else if (fraction < 7) niceFraction = 5;
  else niceFraction = 10;

  const step = niceFraction * magnitude;
  const decimals = isDecimal ? Math.max(1, -Math.floor(Math.log10(step))) : 0;

  const niceMin = Math.max(0, Math.floor(minVal / step) * step);
  const niceMax = Math.ceil(maxVal / step) * step;

  const ticks: number[] = [];
  let current = niceMin;
  let guard = 0;
  while (current <= niceMax + step * 0.01 && guard < 25) {
    ticks.push(Number(current.toFixed(decimals)));
    current += step;
    guard++;
  }

  return { ticks, niceMin, niceMax, decimals };
}

function getNaaqsBenchmark(targetName: string): { val: number; label: string; color: string } | null {
  switch (targetName.toUpperCase()) {
    case 'PM2.5':
      return { val: 60, label: 'CPCB 24h NAAQS Limit (60 µg/m³)', color: '#f59e0b' };
    case 'PM10':
      return { val: 100, label: 'CPCB 24h NAAQS Limit (100 µg/m³)', color: '#eab308' };
    case 'NO2':
      return { val: 80, label: 'CPCB 24h NAAQS Limit (80 µg/m³)', color: '#ec4899' };
    case 'SO2':
      return { val: 80, label: 'CPCB 24h NAAQS Limit (80 µg/m³)', color: '#8b5cf6' };
    case 'CO':
      return { val: 2.0, label: 'CPCB 8h NAAQS Limit (2.0 mg/m³)', color: '#06b6d4' };
    case 'O3':
      return { val: 100, label: 'CPCB 8h NAAQS Limit (100 µg/m³)', color: '#3b82f6' };
    case 'AQI':
      return { val: 100, label: 'NAQI Satisfactory / Moderate Threshold (100)', color: '#eab308' };
    default:
      return null;
  }
}

/* -------------------------------------------------------------------------- */
/* Focused 24-Hour Horizon Plot (SVG)                                         */
/* -------------------------------------------------------------------------- */
interface Forecast24hPlotProps {
  forecastPoints: Forecast24hPoint[];
  currentValue?: number;
  targetUnit: string;
  targetName: string;
  hoveredPoint: Forecast24hPoint | null;
  onHoverPoint: (pt: Forecast24hPoint | null) => void;
}

const Forecast24hPlot: React.FC<Forecast24hPlotProps> = ({
  forecastPoints,
  currentValue,
  targetUnit,
  targetName,
  hoveredPoint,
  onHoverPoint,
}) => {
  // Chart dimensions with generous margins for dual-tier labels and units
  const width = 880;
  const height = 340;
  const padding = { top: 38, right: 45, bottom: 64, left: 74 };

  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  const isDecimalTarget = targetName === 'CO';

  // Gather all values across TimesFM model and confidence interval
  const allValues = [
    ...(currentValue !== undefined ? [currentValue] : []),
    ...forecastPoints.map((p) => p.timesfm),
    ...forecastPoints.map((p) => p.timesfm_lower_80),
    ...forecastPoints.map((p) => p.timesfm_upper_80),
  ];

  const rawMin = Math.min(...allValues);
  const rawMax = Math.max(...allValues);

  // Compute clean, equidistant, pollutant-specific Y-axis ticks
  const { ticks: yTicks, niceMin, niceMax, decimals } = calculateNiceTicks(
    Math.max(0, rawMin * 0.92),
    rawMax * 1.08,
    6,
    isDecimalTarget
  );

  // Scalers
  const getX = (stepIndex: number) => padding.left + (stepIndex / 24) * plotWidth;
  const getY = (val: number) =>
    padding.top + plotHeight - ((val - niceMin) / Math.max(1e-4, niceMax - niceMin)) * plotHeight;

  // Build TimesFM Path
  const originVal = currentValue ?? forecastPoints[0].timesfm;
  let tfmPath = `M ${getX(0)} ${getY(originVal)}`;
  forecastPoints.forEach((pt) => {
    tfmPath += ` L ${getX(pt.step)} ${getY(pt.timesfm)}`;
  });

  // Build Uncertainty Band Area Path (TimesFM 80% interval)
  let bandPath = `M ${getX(0)} ${getY(originVal)}`;
  forecastPoints.forEach((pt) => {
    bandPath += ` L ${getX(pt.step)} ${getY(pt.timesfm_upper_80)}`;
  });
  for (let i = forecastPoints.length - 1; i >= 0; i--) {
    const pt = forecastPoints[i];
    bandPath += ` L ${getX(pt.step)} ${getY(pt.timesfm_lower_80)}`;
  }
  bandPath += ` L ${getX(0)} ${getY(originVal)} Z`;

  // Standard benchmark line
  const benchmark = getNaaqsBenchmark(targetName);
  const benchmarkY = benchmark && benchmark.val >= niceMin && benchmark.val <= niceMax ? getY(benchmark.val) : null;

  // X-axis Steps: 0, 3, 6, 9, 12, 15, 18, 21, 24 (9 clean equidistant points across the 24 hours)
  const xSteps = [0, 3, 6, 9, 12, 15, 18, 21, 24];

  // Base timestamp for origin
  const originDate = forecastPoints.length > 0 ? new Date(new Date(forecastPoints[0].timestamp).getTime() - 3600000) : new Date();

  return (
    <div className="w-full overflow-x-auto scrollbar-thin">
      <div className="min-w-[760px]">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto select-none font-mono">
          <defs>
            <linearGradient id="tfmBandGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.05" />
            </linearGradient>
            <filter id="glowCyan" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="2.8" floodColor="#06b6d4" floodOpacity="0.65" />
            </filter>
            <linearGradient id="gridLineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#334155" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#1e293b" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Background Grid Lines & Y-Axis Ticks */}
          {yTicks.map((tickVal) => {
            const y = getY(tickVal);
            return (
              <g key={tickVal}>
                {/* Horizontal Grid Line */}
                <line
                  x1={padding.left}
                  y1={y}
                  x2={padding.left + plotWidth}
                  y2={y}
                  stroke="#1e293b"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                {/* Left Y-axis Tick Notch */}
                <line
                  x1={padding.left - 6}
                  y1={y}
                  x2={padding.left}
                  y2={y}
                  stroke="#64748b"
                  strokeWidth="1.2"
                />
                {/* Y-axis Numeric Value Label */}
                <text
                  x={padding.left - 10}
                  y={y + 3.5}
                  textAnchor="end"
                  fill="#cbd5e1"
                  fontSize="11"
                  fontWeight="bold"
                >
                  {isDecimalTarget ? tickVal.toFixed(2) : decimals > 0 ? tickVal.toFixed(decimals) : tickVal}
                </text>
              </g>
            );
          })}

          {/* NAAQS Regulatory Standard Benchmark Line (if within visible range) */}
          {benchmark && benchmarkY !== null && (
            <g>
              <line
                x1={padding.left}
                y1={benchmarkY}
                x2={padding.left + plotWidth}
                y2={benchmarkY}
                stroke={benchmark.color}
                strokeWidth="1.2"
                strokeDasharray="6 3"
                opacity="0.85"
              />
              <rect
                x={padding.left + plotWidth - 215}
                y={benchmarkY - 18}
                width="210"
                height="15"
                rx="3"
                fill="#0f172a"
                fillOpacity="0.85"
                stroke={benchmark.color}
                strokeWidth="0.8"
              />
              <text
                x={padding.left + plotWidth - 110}
                y={benchmarkY - 7}
                textAnchor="middle"
                fill={benchmark.color}
                fontSize="9"
                fontWeight="bold"
              >
                {benchmark.label}
              </text>
            </g>
          )}

          {/* X Axis Vertical Grid Lines and Dual-Tier Labels */}
          {xSteps.map((step) => {
            const x = getX(step);
            const stepDate =
              step === 0
                ? originDate
                : new Date(forecastPoints[Math.min(step - 1, forecastPoints.length - 1)].timestamp);

            const stepLabel = step === 0 ? 'T₀ (Now)' : `t+${step}h`;
            const timeLabel = stepDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
            const isDayChange = stepDate.getHours() >= 0 && stepDate.getHours() < 3 && step > 0;

            return (
              <g key={step}>
                {/* Vertical Grid Line */}
                <line
                  x1={x}
                  y1={padding.top}
                  x2={x}
                  y2={padding.top + plotHeight}
                  stroke={step === 0 ? '#10b981' : '#1e293b'}
                  strokeWidth={step === 0 ? '1.5' : '1'}
                  strokeDasharray={step === 0 ? 'none' : '3 3'}
                />
                {/* Bottom X-axis Tick Notch */}
                <line
                  x1={x}
                  y1={padding.top + plotHeight}
                  x2={x}
                  y2={padding.top + plotHeight + 6}
                  stroke="#64748b"
                  strokeWidth="1.2"
                />

                {/* Tier 1: Horizon Step Label */}
                <text
                  x={x}
                  y={padding.top + plotHeight + 18}
                  textAnchor="middle"
                  fill={step === 0 ? '#10b981' : '#f8fafc'}
                  fontSize="11"
                  fontWeight="bold"
                >
                  {stepLabel}
                </text>

                {/* Tier 2: Real-World Clock Time (AM/PM) */}
                <text
                  x={x}
                  y={padding.top + plotHeight + 31}
                  textAnchor="middle"
                  fill="#94a3b8"
                  fontSize="9.5"
                  fontFamily="sans-serif"
                >
                  {timeLabel}
                </text>

                {/* Day Marker Indicator when crossing midnight */}
                {isDayChange && (
                  <text
                    x={x}
                    y={padding.top + plotHeight + 43}
                    textAnchor="middle"
                    fill="#38bdf8"
                    fontSize="8.5"
                    fontWeight="bold"
                  >
                    +1 Day
                  </text>
                )}
              </g>
            );
          })}

          {/* Solid Left Y-Axis Baseline */}
          <line
            x1={padding.left}
            y1={padding.top}
            x2={padding.left}
            y2={padding.top + plotHeight}
            stroke="#475569"
            strokeWidth="1.8"
          />

          {/* Solid Bottom X-Axis Baseline */}
          <line
            x1={padding.left}
            y1={padding.top + plotHeight}
            x2={padding.left + plotWidth}
            y2={padding.top + plotHeight}
            stroke="#475569"
            strokeWidth="1.8"
          />

          {/* Unit Tag at top-left of Y-Axis */}
          <text
            x={padding.left - 10}
            y={padding.top - 12}
            textAnchor="end"
            fill="#38bdf8"
            fontSize="10"
            fontWeight="bold"
          >
            [{targetUnit}]
          </text>

          {/* TimesFM 80% Uncertainty Band Area */}
          <path d={bandPath} fill="url(#tfmBandGrad)" />

          {/* TimesFM Line (Solid Cyan Glow) */}
          <path
            d={tfmPath}
            fill="none"
            stroke="#06b6d4"
            strokeWidth="3"
            filter="url(#glowCyan)"
          />

          {/* Origin Marker (t = 0) */}
          <circle
            cx={getX(0)}
            cy={getY(originVal)}
            r="5"
            fill="#10b981"
            stroke="#ffffff"
            strokeWidth="2"
          />

          {/* Individual TimesFM Data Points */}
          {forecastPoints.map((pt) => {
            const x = getX(pt.step);
            const yTfm = getY(pt.timesfm);
            const isHovered = hoveredPoint?.step === pt.step;

            return (
              <g key={pt.step}>
                {/* TimesFM Point */}
                <circle
                  cx={x}
                  cy={yTfm}
                  r={isHovered ? 6 : 3.5}
                  fill="#06b6d4"
                  stroke="#082f49"
                  strokeWidth="1.8"
                  className="cursor-pointer transition-all"
                  onMouseEnter={() => onHoverPoint(pt)}
                  onMouseLeave={() => onHoverPoint(null)}
                />

                {/* Invisible hover area column for easy mouse interaction */}
                <rect
                  x={x - plotWidth / 48}
                  y={padding.top}
                  width={plotWidth / 24}
                  height={plotHeight}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => onHoverPoint(pt)}
                />
              </g>
            );
          })}

          {/* Active Hover Crosshair, Cursor Tracking & Tooltip */}
          {hoveredPoint && (
            <g>
              {/* Vertical Crosshair Line */}
              <line
                x1={getX(hoveredPoint.step)}
                y1={padding.top}
                x2={getX(hoveredPoint.step)}
                y2={padding.top + plotHeight}
                stroke="#38bdf8"
                strokeWidth="1.2"
                strokeDasharray="3 3"
              />

              {/* Horizontal Crosshair Line to Y-Axis */}
              <line
                x1={padding.left}
                y1={getY(hoveredPoint.timesfm)}
                x2={getX(hoveredPoint.step)}
                y2={getY(hoveredPoint.timesfm)}
                stroke="#06b6d4"
                strokeWidth="1"
                strokeDasharray="2 2"
                opacity="0.75"
              />

              {/* Highlight Rings on Active Point */}
              <circle
                cx={getX(hoveredPoint.step)}
                cy={getY(hoveredPoint.timesfm)}
                r="8"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="1.5"
                className="animate-pulse"
              />

              {/* Dynamic Enhanced Tooltip Card */}
              {(() => {
                const xPos = getX(hoveredPoint.step);
                const hasCov = Boolean(hoveredPoint.covariates);
                const tipWidth = 245;
                const tipHeight = hasCov ? 92 : 78;
                const tipX = xPos > width - 260 ? xPos - tipWidth - 12 : xPos + 12;
                const tipY = Math.min(
                  height - tipHeight - 12,
                  Math.max(padding.top - 5, getY(hoveredPoint.timesfm) - 45)
                );

                const dateStr = new Date(hoveredPoint.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                });

                const benchmark = getNaaqsBenchmark(targetName);
                const exceeds = benchmark ? hoveredPoint.timesfm > benchmark.val : false;

                return (
                  <g transform={`translate(${tipX}, ${tipY})`}>
                    <rect
                      width={tipWidth}
                      height={tipHeight}
                      rx="9"
                      fill="#020617"
                      stroke="#0284c7"
                      strokeWidth="1.4"
                      filter="drop-shadow(0 6px 12px rgba(0,0,0,0.7))"
                    />
                    {/* Tooltip Header */}
                    <text x="12" y="17" fill="#38bdf8" fontSize="10.5" fontWeight="bold">
                      {targetName} • {hoveredPoint.horizon_label} ({dateStr})
                    </text>
                    {/* TimesFM Readout */}
                    <text x="12" y="34" fill="#06b6d4" fontSize="11.5" fontWeight="bold">
                      TimesFM: {hoveredPoint.timesfm} {targetUnit}
                    </text>
                    {/* Confidence Interval */}
                    <text x="12" y="49" fill="#94a3b8" fontSize="9.5">
                      80% Confidence Band: [{hoveredPoint.timesfm_lower_80} – {hoveredPoint.timesfm_upper_80}]
                    </text>
                    {/* Weather Covariates */}
                    {hoveredPoint.covariates && (
                      <text x="12" y="64" fill="#38bdf8" fontSize="9" fontFamily="monospace">
                        Covariates: {hoveredPoint.covariates.wind_speed_mps}m/s • {hoveredPoint.covariates.temperature_c}°C • {hoveredPoint.covariates.relative_humidity_pct}% RH
                      </text>
                    )}
                    {/* Benchmark Status */}
                    {benchmark && (
                      <text
                        x="12"
                        y={hasCov ? "80" : "66"}
                        fill={exceeds ? '#f43f5e' : '#10b981'}
                        fontSize="9.5"
                        fontWeight="bold"
                      >
                        {exceeds ? `⚠ Exceeds Limit (${benchmark.val})` : `✔ Safe / Within Limit (${benchmark.val})`}
                      </text>
                    )}
                  </g>
                );
              })()}
            </g>
          )}

          {/* X-Axis Title */}
          <text
            x={padding.left + plotWidth / 2}
            y={height - 12}
            textAnchor="middle"
            fill="#94a3b8"
            fontSize="11"
            fontWeight="bold"
          >
            X-Axis: Forecasting Horizon (Next 24 Hours in 1-Hour Temporal Steps)
          </text>

          {/* Y-Axis Title (Rotated) */}
          <text
            x={-height / 2 + 10}
            y={18}
            textAnchor="middle"
            transform="rotate(-90)"
            fill="#94a3b8"
            fontSize="11"
            fontWeight="bold"
          >
            Y-Axis: {targetName} ({targetUnit})
          </text>
        </svg>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Full 168h Context + 24h Horizon Plot (SVG)                                 */
/* -------------------------------------------------------------------------- */
interface Context168hPlotProps {
  historicalPoints: Array<{ hour_index: number; timestamp: string; value: number }>;
  forecastPoints: Forecast24hPoint[];
  targetUnit: string;
  targetName: string;
}

const Context168hPlot: React.FC<Context168hPlotProps> = ({
  historicalPoints,
  forecastPoints,
  targetUnit,
  targetName,
}) => {
  const width = 880;
  const height = 320;
  const padding = { top: 38, right: 45, bottom: 62, left: 74 };

  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  const isDecimalTarget = targetName === 'CO';

  // Total domain: -167 to +24 = 192 total hours
  const totalHours = 192;

  const allVals = [
    ...historicalPoints.map((p) => p.value),
    ...forecastPoints.map((p) => p.timesfm),
  ];

  const rawMin = Math.min(...allVals);
  const rawMax = Math.max(...allVals);

  // Compute clean Y-axis ticks with proper pollutant precision
  const { ticks: yTicks, niceMin, niceMax, decimals } = calculateNiceTicks(
    Math.max(0, rawMin * 0.92),
    rawMax * 1.08,
    6,
    isDecimalTarget
  );

  const getX = (hourOffset: number) => {
    const normalized = (hourOffset + 167) / totalHours;
    return padding.left + normalized * plotWidth;
  };

  const getY = (val: number) =>
    padding.top + plotHeight - ((val - niceMin) / Math.max(1e-4, niceMax - niceMin)) * plotHeight;

  // Build Historical Path
  let histPath = '';
  historicalPoints.forEach((pt, i) => {
    const x = getX(pt.hour_index);
    const y = getY(pt.value);
    if (i === 0) histPath += `M ${x} ${y}`;
    else histPath += ` L ${x} ${y}`;
  });

  // Build Forecast TimesFM Path
  const currentVal = historicalPoints[historicalPoints.length - 1]?.value ?? forecastPoints[0].timesfm;
  let tfmPath = `M ${getX(0)} ${getY(currentVal)}`;
  forecastPoints.forEach((pt) => {
    tfmPath += ` L ${getX(pt.step)} ${getY(pt.timesfm)}`;
  });

  const originX = getX(0);

  // NAAQS benchmark line
  const benchmark = getNaaqsBenchmark(targetName);
  const benchmarkY = benchmark && benchmark.val >= niceMin && benchmark.val <= niceMax ? getY(benchmark.val) : null;

  // Day Markers along 168h context + 24h horizon
  const dayOffsets = [-168, -144, -120, -96, -72, -48, -24, 0, 24];

  return (
    <div className="w-full overflow-x-auto scrollbar-thin">
      <div className="min-w-[760px]">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto select-none font-mono">
          {/* Shaded Forecast Horizon Background */}
          <rect
            x={originX}
            y={padding.top}
            width={padding.left + plotWidth - originX}
            height={plotHeight}
            fill="#082f49"
            fillOpacity="0.3"
          />

          {/* Horizontal Gridlines & Y-Axis Ticks */}
          {yTicks.map((tickVal) => {
            const y = getY(tickVal);
            return (
              <g key={tickVal}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={padding.left + plotWidth}
                  y2={y}
                  stroke="#1e293b"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <line
                  x1={padding.left - 6}
                  y1={y}
                  x2={padding.left}
                  y2={y}
                  stroke="#64748b"
                  strokeWidth="1.2"
                />
                <text
                  x={padding.left - 10}
                  y={y + 3.5}
                  textAnchor="end"
                  fill="#cbd5e1"
                  fontSize="11"
                  fontWeight="bold"
                >
                  {isDecimalTarget ? tickVal.toFixed(2) : decimals > 0 ? tickVal.toFixed(decimals) : tickVal}
                </text>
              </g>
            );
          })}

          {/* Regulatory Benchmark Line */}
          {benchmark && benchmarkY !== null && (
            <g>
              <line
                x1={padding.left}
                y1={benchmarkY}
                x2={padding.left + plotWidth}
                y2={benchmarkY}
                stroke={benchmark.color}
                strokeWidth="1.2"
                strokeDasharray="6 3"
                opacity="0.8"
              />
            </g>
          )}

          {/* Dividing Origin Line (Now T0) */}
          <line
            x1={originX}
            y1={padding.top}
            x2={originX}
            y2={padding.top + plotHeight}
            stroke="#10b981"
            strokeWidth="2"
            strokeDasharray="4 3"
          />
          <text
            x={originX}
            y={padding.top - 12}
            textAnchor="middle"
            fill="#10b981"
            fontSize="10.5"
            fontWeight="bold"
          >
            Origin T₀ (Current Hour)
          </text>

          {/* Historical 168h Telemetry Line */}
          <path
            d={histPath}
            fill="none"
            stroke="#64748b"
            strokeWidth="1.8"
          />

          {/* Forecast TimesFM Line */}
          <path
            d={tfmPath}
            fill="none"
            stroke="#06b6d4"
            strokeWidth="2.8"
          />

          {/* Day Markers on X Axis */}
          {dayOffsets.map((h) => {
            const x = getX(h);
            const label = h === 0 ? 'Now' : h > 0 ? `+${h}h` : `${Math.round(h / 24)}d`;
            const subLabel = h === 0 ? 'T₀' : h > 0 ? 'Horizon' : `Day ${7 + Math.round(h / 24)}`;
            return (
              <g key={h}>
                <line
                  x1={x}
                  y1={padding.top + plotHeight}
                  x2={x}
                  y2={padding.top + plotHeight + 6}
                  stroke="#64748b"
                  strokeWidth="1.2"
                />
                <text
                  x={x}
                  y={padding.top + plotHeight + 18}
                  textAnchor="middle"
                  fill={h === 0 ? '#10b981' : '#f8fafc'}
                  fontSize="10"
                  fontWeight="bold"
                >
                  {label}
                </text>
                <text
                  x={x}
                  y={padding.top + plotHeight + 30}
                  textAnchor="middle"
                  fill="#94a3b8"
                  fontSize="8.5"
                >
                  {subLabel}
                </text>
              </g>
            );
          })}

          {/* Solid Left Y-Axis Baseline */}
          <line
            x1={padding.left}
            y1={padding.top}
            x2={padding.left}
            y2={padding.top + plotHeight}
            stroke="#475569"
            strokeWidth="1.8"
          />

          {/* Solid Bottom X-Axis Baseline */}
          <line
            x1={padding.left}
            y1={padding.top + plotHeight}
            x2={padding.left + plotWidth}
            y2={padding.top + plotHeight}
            stroke="#475569"
            strokeWidth="1.8"
          />

          {/* Y-Axis Unit Tag */}
          <text
            x={padding.left - 10}
            y={padding.top - 12}
            textAnchor="end"
            fill="#38bdf8"
            fontSize="10"
            fontWeight="bold"
          >
            [{targetUnit}]
          </text>

          {/* X-Axis Title */}
          <text
            x={padding.left + plotWidth / 2}
            y={height - 10}
            textAnchor="middle"
            fill="#94a3b8"
            fontSize="11"
            fontWeight="bold"
          >
            X-Axis: 168-Hour Historical Context (7 Days Diurnal Telemetry) → 24h Forecasting Horizon
          </text>

          {/* Y-Axis Title (Rotated) */}
          <text
            x={-height / 2 + 10}
            y={18}
            textAnchor="middle"
            transform="rotate(-90)"
            fill="#94a3b8"
            fontSize="11"
            fontWeight="bold"
          >
            Y-Axis: {targetName} ({targetUnit})
          </text>
        </svg>
      </div>
    </div>
  );
};
