import React from 'react';
import { Activity, Play, Pause, RefreshCw, Cpu, Layers, Radio, Workflow } from 'lucide-react';

interface HeaderProps {
  countdown: number;
  isPaused: boolean;
  onTogglePause: () => void;
  onManualRefresh: () => void;
  isRefreshing: boolean;
  pollCycle: number;
  activeTab: 'dashboard' | 'console' | 'python' | 'workflow';
  setActiveTab: (tab: 'dashboard' | 'console' | 'python' | 'workflow') => void;
  dashboardMapView?: 'all_india' | 'bengaluru_citizen';
  setDashboardMapView?: (view: 'all_india' | 'bengaluru_citizen') => void;
}

export const Header: React.FC<HeaderProps> = ({
  countdown,
  isPaused,
  onTogglePause,
  onManualRefresh,
  isRefreshing,
  pollCycle,
  activeTab,
  setActiveTab,
  dashboardMapView = 'all_india',
  setDashboardMapView,
}) => {
  const progressPercent = ((15 - countdown) / 15) * 100;

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Branding & Status */}
        <div className="flex items-center gap-3.5">
          <div className="relative flex items-center justify-center px-2.5 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-500 shadow-lg shadow-emerald-500/20 text-white font-black text-xs tracking-wider">
            DRISHTI
            <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-slate-950"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                DRISHTI-Air: Distributed Real-time Ingestion, Sensing &amp; Hazard Telemetry Intelligence
              </h1>
              <span className="px-2 py-0.5 text-[11px] font-semibold tracking-wide rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                ADK 2.0 Multi-Agent Network
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-mono rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                <Cpu className="w-3 h-3" />
                gemini-3.8-flash
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-2 mt-0.5 flex-wrap">
              <span>National CAAQMS Ingestion • TimesFM Forecasting • Bengaluru Verification</span>
              <span className="text-slate-600">•</span>
              <a
                href="https://airquality.cpcb.gov.in/ccr/#/all-india-aqi-portal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2 flex items-center gap-1 font-medium transition"
                title="Open official CPCB CCR All India AQI Portal"
              >
                CPCB Portal
                <svg className="w-3 h-3 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
              </a>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400 font-mono text-[11px]">Cycle #{pollCycle}</span>
            </p>
          </div>
        </div>

        {/* Tab Navigation & 15s Timer Controls */}
        <div className="flex items-center flex-wrap gap-3 w-full md:w-auto justify-between md:justify-end">
          {/* View Mode Tabs */}
          <div className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-lg text-xs">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-1.5 rounded-md font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'dashboard'
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              Live Dashboard
            </button>
            <button
              onClick={() => setActiveTab('console')}
              className={`px-3 py-1.5 rounded-md font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'console'
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              Agent Logs
            </button>
            <button
              onClick={() => setActiveTab('python')}
              className={`px-3 py-1.5 rounded-md font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'python'
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Python ADK Code
            </button>
            <button
              onClick={() => setActiveTab('workflow')}
              className={`px-3 py-1.5 rounded-md font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'workflow'
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Workflow className="w-3.5 h-3.5" />
              Agent Workflow
            </button>
          </div>

          {/* Quick Map Switcher in Header (when on Dashboard) */}
          {activeTab === 'dashboard' && setDashboardMapView && (
            <div className="hidden sm:flex items-center bg-slate-900 border border-slate-800 p-1 rounded-lg text-xs">
              <button
                onClick={() => setDashboardMapView('all_india')}
                className={`px-2.5 py-1 rounded-md font-medium transition flex items-center gap-1.5 ${
                  dashboardMapView === 'all_india'
                    ? 'bg-slate-800 text-emerald-400 border border-slate-700 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="All-India CPCB Monitoring Network"
              >
                <Layers className="w-3 h-3" />
                <span>All-India Map</span>
              </button>
              <button
                onClick={() => setDashboardMapView('bengaluru_citizen')}
                className={`px-2.5 py-1 rounded-md font-medium transition flex items-center gap-1.5 ${
                  dashboardMapView === 'bengaluru_citizen'
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Bengaluru Street-Level Citizen Telemetry & Multimodal Verification"
              >
                <Radio className="w-3 h-3 text-sky-300 animate-pulse" />
                <span>Bengaluru Map</span>
              </button>
            </div>
          )}

          {/* Real-time 15s Timer Bar */}
          <div className="flex items-center gap-2.5 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-xl shadow-inner">
            <div className="flex items-center gap-2">
              {/* Circular SVG Mini Progress */}
              <div className="relative w-6 h-6 flex items-center justify-center">
                <svg className="w-6 h-6 transform -rotate-90">
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="text-slate-800"
                    fill="transparent"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className={isPaused ? 'text-amber-500' : 'text-emerald-400 transition-all duration-1000'}
                    strokeDasharray={56.5}
                    strokeDashoffset={56.5 - (56.5 * progressPercent) / 100}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <span className="absolute text-[9px] font-mono font-bold text-slate-200">
                  {countdown}
                </span>
              </div>

              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${isPaused ? 'bg-amber-400' : 'bg-emerald-400 animate-pulse'}`} />
                  <span className="text-[11px] font-semibold text-slate-200">
                    {isPaused ? 'Timer Paused' : '15s Ingestion Loop'}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">
                  {isPaused ? 'Paused for inspection' : `Next poll: ${countdown}s`}
                </span>
              </div>
            </div>

            {/* Pause/Resume Toggle */}
            <button
              onClick={onTogglePause}
              title={isPaused ? 'Resume 15s Timer' : 'Pause 15s Timer'}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-emerald-400" /> : <Pause className="w-3.5 h-3.5" />}
            </button>

            {/* Poll Now Button */}
            <button
              onClick={onManualRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-1 px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 active:scale-95 disabled:opacity-50 text-white rounded-lg text-xs font-semibold shadow-sm transition"
            >
              <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Poll Now</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
