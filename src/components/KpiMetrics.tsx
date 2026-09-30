import React from 'react';
import { PipelineMetrics } from '../types';
import { Gauge, ShieldAlert, Wind, MapPin, Thermometer, Droplets, Eye } from 'lucide-react';

interface KpiMetricsProps {
  metrics: PipelineMetrics | null;
  agentSummary?: string;
  actionableAdvisories?: string[];
  isAnalyzing?: boolean;
  onTriggerAgentAnalysis?: () => void;
}

export const KpiMetrics: React.FC<KpiMetricsProps> = ({
  metrics,
}) => {
  if (!metrics) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 bg-slate-900 border border-slate-800 rounded-xl" />
        ))}
      </div>
    );
  }

  const getCategoryTheme = (category: string) => {
    switch (category) {
      case 'Good':
        return { text: 'text-emerald-400', badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' };
      case 'Satisfactory':
        return { text: 'text-lime-400', badge: 'bg-lime-500/10 text-lime-400 border-lime-500/30' };
      case 'Moderate':
        return { text: 'text-amber-400', badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30' };
      case 'Poor':
        return { text: 'text-orange-400', badge: 'bg-orange-500/10 text-orange-400 border-orange-500/30' };
      case 'Very Poor':
        return { text: 'text-rose-400', badge: 'bg-rose-500/10 text-rose-400 border-rose-500/30' };
      default:
        return { text: 'text-red-400', badge: 'bg-red-500/10 text-red-300 border-red-500/30' };
    }
  };

  const avgTheme = getCategoryTheme(metrics.avg_category);

  return (
    <div className="space-y-4">
      {/* 4 Macro KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Active Stations Monitored */}
        <div className="bg-slate-900/90 border border-slate-800/90 hover:border-slate-700/80 rounded-xl p-4 shadow-sm transition">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold tracking-wider uppercase text-slate-400">
              Active Ground Stations
            </span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <MapPin className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white tracking-tight">
              {metrics.total_stations}
            </span>
            <span className="text-xs font-medium text-emerald-400">
              {metrics.states_count ? `${metrics.states_count} States/UTs` : 'All-India'}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
            <span>National CAAQMS Network</span>
            <span className="font-mono text-emerald-400 font-semibold">
              {metrics.cities_count ? `${metrics.cities_count} Cities` : '6 Pollutants'}
            </span>
          </p>
        </div>

        {/* Card 2: National Avg AQI */}
        <div className="bg-slate-900/90 border border-slate-800/90 hover:border-slate-700/80 rounded-xl p-4 shadow-sm transition">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold tracking-wider uppercase text-slate-400">
              National Average NAQI
            </span>
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Gauge className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className={`text-3xl font-extrabold tracking-tight ${avgTheme.text}`}>
              {metrics.avg_aqi}
            </span>
            <span className={`px-2 py-0.5 text-xs font-bold rounded-md border ${avgTheme.badge}`}>
              {metrics.avg_category}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Macro-level aggregate across active nodes
          </p>
        </div>

        {/* Card 3: Dominant Criteria Pollutant */}
        <div className="bg-slate-900/90 border border-slate-800/90 hover:border-slate-700/80 rounded-xl p-4 shadow-sm transition">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold tracking-wider uppercase text-slate-400">
              Primary Dominant Pollutant
            </span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <Wind className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-amber-400 tracking-tight">
              {metrics.primary_dominant}
            </span>
            <span className="text-xs text-slate-400">Fine Particulate</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            {metrics.dominant_breakdown[metrics.primary_dominant] || 0} of {metrics.total_stations} stations report peak sub-index
          </p>
        </div>

        {/* Card 4: Critical Hotspot */}
        <div className="bg-slate-900/90 border border-slate-800/90 hover:border-slate-700/80 rounded-xl p-4 shadow-sm transition">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold tracking-wider uppercase text-slate-400">
              Critical Hotspot (Peak AQI)
            </span>
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-rose-400 tracking-tight">
              {metrics.peak_station?.aqi || '-'}
            </span>
            <span className="text-xs font-semibold text-rose-400/90 truncate">
              {metrics.peak_station?.city || 'Delhi'}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 truncate" title={metrics.peak_station?.station_name}>
            {metrics.peak_station?.station_name || 'Monitoring Node'}
          </p>
        </div>
      </div>

      {/* Meteorological & Weather Variables Strip */}
      {metrics.weather_summary && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-2.5 flex items-center justify-between gap-3 flex-wrap text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 font-semibold text-[11px] border border-sky-500/20 flex items-center gap-1">
              <Thermometer className="w-3.5 h-3.5" /> 8 Weather Feeds
            </span>
            <span className="text-slate-400 text-[11px]">Consolidated IMD AWS • CAAQMS • GEE AOD</span>
          </div>

          <div className="flex items-center gap-4 flex-wrap font-mono text-[11px]">
            <span className="flex items-center gap-1">
              <Thermometer className="w-3 h-3 text-amber-400" />
              <span className="text-slate-400 font-sans">Avg Temp:</span>{' '}
              <strong className="text-white">{metrics.weather_summary.avg_temp}°C</strong>
            </span>
            <span className="flex items-center gap-1">
              <Droplets className="w-3 h-3 text-sky-400" />
              <span className="text-slate-400 font-sans">Avg Humidity:</span>{' '}
              <strong className="text-white">{metrics.weather_summary.avg_humidity}%</strong>
            </span>
            <span className="flex items-center gap-1">
              <Wind className="w-3 h-3 text-teal-400" />
              <span className="text-slate-400 font-sans">Peak Wind:</span>{' '}
              <strong className="text-white">{metrics.weather_summary.max_wind} m/s</strong>
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3 text-purple-400" />
              <span className="text-slate-400 font-sans">Mean AOD:</span>{' '}
              <strong className="text-white">{metrics.weather_summary.avg_aod}</strong>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
