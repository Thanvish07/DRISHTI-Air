import React from 'react';
import { StationAQI } from '../types';
import { X, MapPin, AlertCircle, CheckCircle2, ShieldAlert, Thermometer, Droplets, Wind, Compass, Sun, Gauge, CloudRain, Eye, Layers, TrendingUp, Sparkles } from 'lucide-react';

interface StationDetailModalProps {
  station: StationAQI | null;
  onClose: () => void;
  onOpenForecast?: (station: StationAQI, target?: string) => void;
}

export const StationDetailModal: React.FC<StationDetailModalProps> = ({ station, onClose, onOpenForecast }) => {
  if (!station) return null;

  const pollutantsInfo = [
    {
      code: 'PM2.5',
      name: 'Fine Particulate Matter',
      unit: 'µg/m³',
      val: station.pm25,
      subIndex: station.sub_indices['PM2.5'],
      cpcbStandard: '60 µg/m³ (24h)',
      exceeded: station.pm25 > 60,
    },
    {
      code: 'PM10',
      name: 'Respirable Particulates',
      unit: 'µg/m³',
      val: station.pm10,
      subIndex: station.sub_indices['PM10'],
      cpcbStandard: '100 µg/m³ (24h)',
      exceeded: station.pm10 > 100,
    },
    {
      code: 'NO2',
      name: 'Nitrogen Dioxide',
      unit: 'µg/m³',
      val: station.no2,
      subIndex: station.sub_indices['NO2'],
      cpcbStandard: '80 µg/m³ (24h)',
      exceeded: station.no2 > 80,
    },
    {
      code: 'SO2',
      name: 'Sulfur Dioxide',
      unit: 'µg/m³',
      val: station.so2,
      subIndex: station.sub_indices['SO2'],
      cpcbStandard: '80 µg/m³ (24h)',
      exceeded: station.so2 > 80,
    },
    {
      code: 'CO',
      name: 'Carbon Monoxide',
      unit: 'mg/m³',
      val: station.co,
      subIndex: station.sub_indices['CO'],
      cpcbStandard: '2.0 mg/m³ (8h)',
      exceeded: station.co > 2.0,
    },
    {
      code: 'O3',
      name: 'Ozone',
      unit: 'µg/m³',
      val: station.o3,
      subIndex: station.sub_indices['O3'],
      cpcbStandard: '100 µg/m³ (8h)',
      exceeded: station.o3 > 100,
    },
  ];

  const weatherVars = [
    {
      label: 'Ambient Temperature',
      val: `${station.temperature_c} °C`,
      icon: <Thermometer className="w-4 h-4 text-amber-400" />,
      sub: 'IMD AWS Sensor feed',
    },
    {
      label: 'Relative Humidity',
      val: `${station.relative_humidity_pct} %`,
      icon: <Droplets className="w-4 h-4 text-sky-400" />,
      sub: 'Atmospheric moisture',
    },
    {
      label: 'Wind Velocity',
      val: `${station.wind_speed_mps} m/s`,
      icon: <Wind className="w-4 h-4 text-teal-400" />,
      sub: 'Near-surface speed',
    },
    {
      label: 'Wind Direction',
      val: `${station.wind_direction_cardinal} (${station.wind_direction_deg}°)`,
      icon: <Compass className="w-4 h-4 text-indigo-400" />,
      sub: 'Azimuth orientation',
    },
    {
      label: 'Barometric Pressure',
      val: `${station.barometric_pressure_hpa} hPa`,
      icon: <Gauge className="w-4 h-4 text-slate-300" />,
      sub: 'Station level pressure',
    },
    {
      label: 'Solar Radiation',
      val: `${station.solar_radiation_wm2} W/m²`,
      icon: <Sun className="w-4 h-4 text-yellow-400" />,
      sub: 'Pyranometer flux',
    },
    {
      label: 'Rainfall Precipitation',
      val: `${station.rainfall_mm} mm`,
      icon: <CloudRain className="w-4 h-4 text-blue-400" />,
      sub: 'Tipping bucket gauge',
    },
    {
      label: 'Aerosol Optical Depth (AOD)',
      val: `${station.aerosol_optical_depth}`,
      icon: <Eye className="w-4 h-4 text-purple-400" />,
      sub: 'GEE MODIS / VIIRS 550nm',
    },
  ];

  const getHealthStatement = (category: string) => {
    switch (category) {
      case 'Good':
        return 'Minimal impact. Air quality is considered satisfactory, and air pollution poses little or no risk.';
      case 'Satisfactory':
        return 'Minor breathing discomfort to sensitive people with asthma or cardiac conditions.';
      case 'Moderate':
        return 'Breathing discomfort to the people with lungs, asthma and heart diseases on prolonged exposure.';
      case 'Poor':
        return 'Breathing discomfort to most people on prolonged exposure. Sensitive groups should avoid strenuous outdoor physical activities.';
      case 'Very Poor':
        return 'Respiratory illness on prolonged exposure. Effect may be more pronounced in people with lung and heart diseases.';
      default:
        return 'Affects healthy people and seriously impacts those with existing diseases. Emergency GRAP Stage IV conditions recommended.';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden text-slate-200">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-850 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
              {station.station_id}
            </span>
            {station.cpcb_site_id && (
              <span className="font-mono text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                {station.cpcb_site_id}
              </span>
            )}
            {station.category && (
              <span className="text-xs bg-indigo-950/60 text-indigo-300 px-2 py-0.5 rounded border border-indigo-800/40 font-medium">
                {station.category}
              </span>
            )}
            <h2 className="text-base font-bold text-white truncate max-w-md">
              {station.station_name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[82vh] overflow-y-auto">
          {/* Location & Status Pill */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2 text-sm text-slate-300 flex-wrap">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>
                <strong className="text-white">{station.city}</strong>, {station.state} (India)
              </span>
              {station.zone && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-medium">
                  {station.zone} Zone
                </span>
              )}
              <span className="text-xs text-slate-500 font-mono">
                [{station.lat.toFixed(4)}°N, {station.lng.toFixed(4)}°E]
              </span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={station.portal_link || 'https://airquality.cpcb.gov.in/ccr/#/all-india-aqi-portal'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-emerald-400 hover:text-emerald-300 underline underline-offset-2 flex items-center gap-1 font-medium"
              >
                CPCB All-India Portal
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
              </a>
              <span className="text-xs font-mono text-slate-400">
                Updated: {new Date(station.last_updated).toLocaleTimeString()}
              </span>
            </div>
          </div>

          {/* Overall AQI Card */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-xl border bg-slate-800/40 border-slate-700/60">
            <div className="flex items-center gap-4">
              <div
                className="w-20 h-20 rounded-2xl flex flex-col items-center justify-center font-black shadow-lg"
                style={{
                  backgroundColor: `${station.category_color}25`,
                  color: station.category_color,
                  border: `2px solid ${station.category_color}50`,
                }}
              >
                <span className="text-3xl leading-none">{station.aqi}</span>
                <span className="text-[10px] tracking-wider uppercase font-semibold mt-1">NAQI</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-white">{station.aqi_category} Air Quality</h3>
                  <span className="px-2 py-0.5 text-xs font-semibold rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    Primary: {station.dominant_pollutant}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1 max-w-sm">
                  Sub-index of {station.dominant_pollutant} is the dominant contributor to overall NAQI.
                </p>
              </div>
            </div>
          </div>

          {/* 8 Target Meteorological Variables */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                <Thermometer className="w-4 h-4 text-sky-400" />
                8 Target Meteorological Variables (IMD / CAAQMS / GEE)
              </h4>
              <span className="text-[11px] text-slate-400 font-mono">Real-time Weather Ingestion</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {weatherVars.map((w, idx) => (
                <div key={idx} className="bg-sky-950/20 border border-sky-900/40 rounded-xl p-3 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span className="truncate">{w.label}</span>
                    {w.icon}
                  </div>
                  <div className="text-lg font-bold text-white font-mono my-0.5">{w.val}</div>
                  <div className="text-[10px] text-slate-500 truncate">{w.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Target 6 Criteria Pollutants Normalized */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-emerald-400" />
              Normalized Criteria Pollutants &amp; Sub-Indices
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {pollutantsInfo.map((p) => (
                <div
                  key={p.code}
                  className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-200">{p.code}</span>
                    <span className="text-[10px] font-mono text-slate-500">{p.unit}</span>
                  </div>
                  <div className="my-2">
                    <div className="text-xl font-extrabold text-white font-mono">
                      {p.val}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Sub-Index: <strong className="text-slate-200">{p.subIndex}</strong>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-850 flex items-center justify-between text-[10px]">
                    <span className="text-slate-500 truncate" title={`NAAQS Standard: ${p.cpcbStandard}`}>
                      Limit: {p.cpcbStandard}
                    </span>
                    {p.exceeded ? (
                      <span className="text-rose-400 font-semibold flex items-center gap-0.5">
                        <AlertCircle className="w-3 h-3" /> Exceeded
                      </span>
                    ) : (
                      <span className="text-emerald-400 font-semibold flex items-center gap-0.5">
                        <CheckCircle2 className="w-3 h-3" /> Within
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Health Advisory Section */}
          <div className="bg-indigo-950/20 border border-indigo-900/40 rounded-xl p-4">
            <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-indigo-400" />
              CPCB National Health Impact Statement
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {getHealthStatement(station.aqi_category)}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-850 border-t border-slate-800 flex items-center justify-between gap-3 flex-wrap">
          {onOpenForecast && (
            <button
              onClick={() => {
                onOpenForecast(station, 'AQI');
              }}
              className="px-4 py-2 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-md shadow-emerald-950/40"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Launch 24h TimesFM AI Forecast</span>
              <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
            </button>
          )}

          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition ml-auto"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
