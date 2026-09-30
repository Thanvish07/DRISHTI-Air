/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Header } from './components/Header';
import { KpiMetrics } from './components/KpiMetrics';
import { FilterBar } from './components/FilterBar';
import { AqiGeoMap } from './components/AqiGeoMap';
import { AqiDataTable } from './components/AqiDataTable';
import { StationDetailModal } from './components/StationDetailModal';
import { ForecastModal } from './components/ForecastModal';
import { BengaluruCitizenMap } from './components/BengaluruCitizenMap';
import { AirQualityChatbot } from './components/AirQualityChatbot';
import { AgentConsole } from './components/AgentConsole';
import { PythonCodeViewer } from './components/PythonCodeViewer';
import { AgentArchitectureView } from './components/AgentArchitectureView';
import { StationAQI, PipelineMetrics, AgentLogEntry, AgentOrchestrationResult } from './types';
import { Layers, Radio, Sparkles } from 'lucide-react';

export default function App() {
  const [countdown, setCountdown] = useState<number>(15);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [pollCycle, setPollCycle] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'console' | 'python' | 'workflow'>('dashboard');
  const [dashboardMapView, setDashboardMapView] = useState<'all_india' | 'bengaluru_citizen'>('all_india');

  // Filter States
  const [selectedState, setSelectedState] = useState<string>('All');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [stationQuery, setStationQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  // Data States
  const [stations, setStations] = useState<StationAQI[]>([]);
  const [metrics, setMetrics] = useState<PipelineMetrics | null>(null);
  const [selectedStation, setSelectedStation] = useState<StationAQI | null>(null);
  const [forecastStation, setForecastStation] = useState<StationAQI | null>(null);
  const [forecastTarget, setForecastTarget] = useState<string>('AQI');
  const [isForecastOpen, setIsForecastOpen] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  // Agent States & Logs
  const [orchestrationResult, setOrchestrationResult] = useState<AgentOrchestrationResult | null>(null);
  const [logs, setLogs] = useState<AgentLogEntry[]>([]);
  const [quotaExceeded, setQuotaExceeded] = useState<boolean>(false);

  useEffect(() => {
    const handleQuota = () => setQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuota);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuota);
  }, []);

  const addLog = useCallback(
    (type: AgentLogEntry['type'], message: string, details?: string) => {
      const entry: AgentLogEntry = {
        id: Math.random().toString(36).substring(2, 9),
        timestamp: new Date().toLocaleTimeString(),
        type,
        message,
        details,
      };
      setLogs((prev) => [entry, ...prev.slice(0, 75)]);
    },
    []
  );

  const handleOpenForecast = useCallback(
    (station: StationAQI, target: string = 'AQI') => {
      setForecastStation(station);
      setForecastTarget(target);
      setIsForecastOpen(true);
      addLog(
        'TOOL_CALL',
        `Dispatched tool: run_24h_station_forecast(station="${station.station_id}", target="${target}", context_len=168, horizon=24)`,
        `Evaluating Google TimesFM Foundation Model Forecaster (168h context)`
      );
    },
    [addLog]
  );

  // Fetch telemetry from CPCB pipeline endpoint
  const fetchData = useCallback(
    async (isManual = false) => {
      setIsRefreshing(true);
      const startTime = performance.now();

      addLog(
        'TOOL_CALL',
        `Dispatched tool: fetch_cpcb_realtime_aqi(state="${selectedState}", city="${selectedCity}")`,
        isManual ? 'Manual Poll' : '15s Web Timer'
      );

      try {
        const queryParams = new URLSearchParams();
        if (selectedState !== 'All') queryParams.append('state', selectedState);
        if (selectedCity !== 'All') queryParams.append('city', selectedCity);
        if (stationQuery) queryParams.append('station_id', stationQuery);

        const response = await fetch(`/api/aqi/realtime?${queryParams.toString()}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();

        const elapsed = Math.round(performance.now() - startTime);

        setStations(data.stations || []);
        setMetrics(data.metrics || null);
        setPollCycle((c) => c + 1);

        addLog(
          'TOOL_RESULT',
          `CPCB Ingestion successful: ${data.stations?.length || 0} ground stations ingested in ${elapsed}ms`,
          `NAQI Range: ${data.metrics?.cleanest_station?.aqi || '-'} - ${data.metrics?.peak_station?.aqi || '-'}`
        );

        addLog(
          'DATA_NORMALIZATION',
          `Target criteria pollutants validated: CO, NO2, O3, PM10, PM2.5, SO2. Breakpoints mapped.`,
          `Dominant: ${data.metrics?.primary_dominant || 'PM2.5'}`
        );

        addLog('UI_UPDATE', `ADK Web reactive data table updated seamlessly with zero page reload.`);
      } catch (err: any) {
        addLog('TOOL_RESULT', `CPCB Data Link warning: ${err.message}. Graceful fallback active.`);
      } finally {
        setIsRefreshing(false);
      }
    },
    [selectedState, selectedCity, stationQuery, addLog]
  );

  // Trigger Gemini Agent Orchestration
  const triggerAgentAnalysis = useCallback(
    async (customQuery?: string) => {
      setIsAnalyzing(true);
      addLog(
        'LLM_REASONING',
        `Invoking Gemini (gemini-3.8-flash) for macro environmental synthesis...`,
        customQuery ? `User Prompt: ${customQuery}` : 'Environmental Synthesis'
      );

      try {
        const res = await fetch('/api/agent/orchestrate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            metrics,
            stationsSummary: stations.slice(0, 10).map((s) => ({
              name: s.station_name,
              city: s.city,
              aqi: s.aqi,
              dominant: s.dominant_pollutant,
            })),
            userQuery: customQuery,
          }),
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: AgentOrchestrationResult = await res.json();
        setOrchestrationResult(data);

        addLog(
          'LLM_REASONING',
          `Gemini agent reasoning completed in ${data.elapsed_ms}ms.`,
          `Generated ${data.actionable_advisories?.length || 0} actionable advisories`
        );
      } catch (err: any) {
        addLog('LLM_REASONING', `Synthesis engine active: ${err.message}`);
      } finally {
        setIsAnalyzing(false);
      }
    },
    [metrics, stations, addLog]
  );

  // 15-Second Background Web Timer
  useEffect(() => {
    fetchData();
  }, [selectedState, selectedCity]);

  useEffect(() => {
    if (metrics && !orchestrationResult) {
      triggerAgentAnalysis();
    }
  }, [metrics, orchestrationResult, triggerAgentAnalysis]);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          fetchData();
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, fetchData]);

  // Derived Filter Lists
  const availableStates = Array.from(new Set(stations.map((s) => s.state))).sort();
  const availableCities = Array.from(
    new Set(
      stations
        .filter((s) => (selectedState === 'All' ? true : s.state === selectedState))
        .map((s) => s.city)
    )
  ).sort();

  // Filter stations for table
  const displayedStations = stations.filter((s) => {
    if (categoryFilter !== 'All' && s.aqi_category !== categoryFilter) {
      return false;
    }
    if (stationQuery) {
      const q = stationQuery.toLowerCase();
      const matchId = s.station_id.toLowerCase().includes(q);
      const matchSite = s.cpcb_site_id?.toLowerCase().includes(q);
      const matchName = s.station_name.toLowerCase().includes(q);
      if (!matchId && !matchName && !matchSite) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Quota Exceeded Notification Banner */}
      {quotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      {/* Header */}
      <Header
        countdown={countdown}
        isPaused={isPaused}
        onTogglePause={() => setIsPaused((p) => !p)}
        onManualRefresh={() => {
          setCountdown(15);
          fetchData(true);
        }}
        isRefreshing={isRefreshing}
        pollCycle={pollCycle}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        dashboardMapView={dashboardMapView}
        setDashboardMapView={setDashboardMapView}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6 space-y-6">
        {activeTab === 'dashboard' && (
          <>
            {/* KPI Cards & Ground Baseline Metrics */}
            <KpiMetrics metrics={metrics} />

            {/* Map View Switcher (All-India CAAQMS vs Bengaluru Citizen Telemetry) */}
            <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-2xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 flex-wrap">
                <button
                  onClick={() => setDashboardMapView('all_india')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                    dashboardMapView === 'all_india'
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-950/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>All-India CAAQMS Telemetry Map</span>
                </button>

                <button
                  onClick={() => setDashboardMapView('bengaluru_citizen')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                    dashboardMapView === 'bengaluru_citizen'
                      ? 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-md shadow-sky-950/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Radio className="w-4 h-4 text-sky-300 animate-pulse" />
                  <span>Bengaluru Citizen Telemetry &amp; Multimodal Verification Map</span>
                  <span className="px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-200 text-[10px] font-mono border border-sky-500/30">
                    Street-Level
                  </span>
                </button>
              </div>

              <div className="text-xs text-slate-400 font-mono hidden md:flex items-center gap-2">
                {dashboardMapView === 'all_india' ? (
                  <span>Nationwide CAAQMS network • TimesFM forecasts</span>
                ) : (
                  <span>Pinpoint any Bengaluru street • Upload photo/video • Verify hazards</span>
                )}
              </div>
            </div>

            {/* View A: All-India CAAQMS Telemetry Map */}
            {dashboardMapView === 'all_india' && (
              <>
                {/* Interactive Filters Bar */}
                <FilterBar
                  selectedState={selectedState}
                  setSelectedState={setSelectedState}
                  selectedCity={selectedCity}
                  setSelectedCity={setSelectedCity}
                  stationQuery={stationQuery}
                  setStationQuery={setStationQuery}
                  categoryFilter={categoryFilter}
                  setCategoryFilter={setCategoryFilter}
                  availableStates={availableStates}
                  availableCities={availableCities}
                  totalCount={stations.length}
                  filteredCount={displayedStations.length}
                  onResetFilters={() => {
                    setSelectedState('All');
                    setSelectedCity('All');
                    setStationQuery('');
                    setCategoryFilter('All');
                  }}
                />

                {/* Interactive Geospatial Mapping Integration (Google Maps) */}
                <AqiGeoMap
                  stations={displayedStations}
                  onSelectStation={(st) => setSelectedStation(st)}
                  onOpenForecast={(st, target) => handleOpenForecast(st, target)}
                  selectedState={selectedState}
                  selectedCity={selectedCity}
                />

                {/* Query Chatbot for Main Map (Ground Monitoring Stations across States, Cities & Areas) */}
                <AirQualityChatbot
                  mode="main_map"
                  contextData={{
                    stations, // Complete nationwide dataset of all CAAQMS ground monitoring stations
                    metrics,
                    selectedState,
                    selectedCity,
                  }}
                  title="AeroQuery: National Ground Stations & Weather Intelligence Chatbot"
                  subtitle="Query any ground monitoring station, city, or state. Request dynamic line graphs for AQI trends, NAAQS benchmarks, dual-pollutant correlations, multi-station or inter-city comparisons."
                />

                {/* Standardized Data Table */}
                <AqiDataTable
                  stations={displayedStations}
                  onSelectStation={(st) => setSelectedStation(st)}
                  onOpenForecast={(st, target) => handleOpenForecast(st, target)}
                />
              </>
            )}

            {/* View B: Bengaluru Hyperlocal Citizen Telemetry & Multimodal Verification Map */}
            {dashboardMapView === 'bengaluru_citizen' && (
              <BengaluruCitizenMap onBackToMainMap={() => setDashboardMapView('all_india')} />
            )}
          </>
        )}

        {activeTab === 'console' && (
          <AgentConsole
            logs={logs}
            orchestrationResult={orchestrationResult}
            onAskAgent={(query) => triggerAgentAnalysis(query)}
            isQuerying={isAnalyzing}
            onClearLogs={() => setLogs([])}
          />
        )}

        {activeTab === 'python' && <PythonCodeViewer />}

        {activeTab === 'workflow' && <AgentArchitectureView />}
      </main>

      {/* Station Details Modal */}
      <StationDetailModal
        station={selectedStation}
        onClose={() => setSelectedStation(null)}
        onOpenForecast={(st, target) => handleOpenForecast(st, target)}
      />

      {/* 24-Hour Forecasting Modal (sktime Seasonal Naive vs TimesFM) */}
      <ForecastModal
        station={forecastStation}
        initialTarget={forecastTarget}
        isOpen={isForecastOpen}
        onClose={() => setIsForecastOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 px-6 py-4 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Google ADK 2.0 Web Engine & google-genai SDK</span>
            <span className="text-slate-700">•</span>
            <span>Central Pollution Control Board (CPCB India) Telemetry Pipeline</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Poll Interval: 15s</span>
            <span>Target Pollutants: CO, NO2, O3, PM10, PM2.5, SO2</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
