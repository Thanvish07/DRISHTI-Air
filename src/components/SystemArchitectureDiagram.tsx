import React, { useState } from 'react';
import {
  Radio,
  Camera,
  MapPin,
  CloudSun,
  Database,
  GitMerge,
  Sparkles,
  Layers,
  MessageSquare,
  BarChart3,
  Settings,
  ShieldCheck,
  Map,
  AlertTriangle,
  Code2,
  ArrowUp,
  Info,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

// Custom SVG icon for Satellite to match the image accurately
const SatelliteIcon: React.FC<{ className?: string }> = ({ className = 'w-9 h-9' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
  >
    <path d="M12 2a1 1 0 0 1 1 1v1.07A7.002 7.002 0 0 1 19.93 11H21a1 1 0 1 1 0 2h-1.07A7.002 7.002 0 0 1 13 19.93V21a1 1 0 1 1-2 0v-1.07A7.002 7.002 0 0 1 4.07 13H3a1 1 0 1 1 0-2h1.07A7.002 7.002 0 0 1 11 4.07V3a1 1 0 0 1 1-1zm0 4a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm-1 3h2v2h-2V9zm0 4h2v2h-2v-2z" />
  </svg>
);

// Custom SVG icon for Sensor Fusion branching nodes to match the image
const SensorFusionForkIcon: React.FC<{ className?: string }> = ({ className = 'w-9 h-9' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="6" cy="6" r="3" fill="currentColor" />
    <circle cx="18" cy="6" r="3" fill="currentColor" />
    <circle cx="12" cy="18" r="3" fill="currentColor" />
    <path d="M6 9v3a3 3 0 0 0 3 3h3m6-6v3a3 3 0 0 1-3 3h-3m0 0v3" />
  </svg>
);

// Custom SVG icon for Folded Map to match image
const FoldedMapIcon: React.FC<{ className?: string }> = ({ className = 'w-9 h-9' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
  </svg>
);

interface DetailModalData {
  title: string;
  layer: string;
  icon: React.ReactNode;
  subtitle: string;
  description: string;
  drishtiMapping: string;
  specifications: string[];
}

export const SystemArchitectureDiagram: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<DetailModalData | null>(null);

  return (
    <div className="space-y-6">
      {/* Title & Subtitle Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-mono font-bold">
              4-Tier Architectural Model
            </span>
            <span className="text-xs text-slate-400 font-mono">DRISHTI-Air Architecture</span>
          </div>
          <h3 className="text-lg font-bold text-white mt-1">
            Agentic AI System Architecture
          </h3>
          <p className="text-xs text-slate-400 mt-0.5 max-w-2xl">
            Hierarchical multi-tier pipeline connecting Multi-Source Sensor Ingestion, Spatial Feature Construction, Autonomous Multi-Agent Reasoning, and Interactive User Interfaces.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 shrink-0">
          <Info className="w-3.5 h-3.5 text-cyan-400" />
          <span>Click any block to inspect DRISHTI-Air bindings</span>
        </div>
      </div>

      {/* Main 4-Tier Architectural Diagram Canvas */}
      <div className="bg-[#f8fafc] dark:bg-slate-950 border border-slate-250 dark:border-slate-800/80 rounded-2xl p-5 sm:p-8 shadow-2xl space-y-6">
        {/* ========================================================= */}
        {/* TIER 4 (TOP): Applications & User Interface (Warm Orange) */}
        {/* ========================================================= */}
        <div className="bg-[#fef9f5] border-2 border-[#fcdcc5] rounded-2xl p-5 sm:p-6 shadow-sm transition hover:shadow-md">
          <h4 className="text-lg sm:text-xl font-bold text-[#c25e19] tracking-tight mb-4 flex items-center gap-2">
            <span>Applications &amp; User Interface</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 4.1: Interactive Map & Dashboard */}
            <div
              onClick={() =>
                setSelectedItem({
                  title: 'Interactive Map & Dashboard',
                  layer: 'Applications & User Interface',
                  icon: <FoldedMapIcon className="w-10 h-10 text-[#c25e19]" />,
                  subtitle: 'Dual Geospatial Visualization',
                  description:
                    'Primary visual interfaces offering interactive all-India CAAQMS station exploration with real-time NAQI color coding and high-precision Bengaluru street pinpointing.',
                  drishtiMapping:
                    'Implemented in AqiGeoMap.tsx and BengaluruCitizenMap.tsx with Google Maps Platform and Dark environmental skin.',
                  specifications: [
                    '169+ Active CAAQMS Ground Stations mapped live',
                    'Dynamic Zoom, Pan, Station Detail Overlays',
                    'Bengaluru Street-Level Pinpoint Inverse Distance Weighting',
                    'Real-time automated 15-second polling synchronization',
                  ],
                })
              }
              className="bg-white border border-[#f3d3bd] rounded-xl p-5 shadow-sm hover:shadow-md hover:border-[#c25e19] transition-all cursor-pointer flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-xl flex items-center justify-center text-[#c25e19] mb-3 group-hover:scale-105 transition-transform">
                <FoldedMapIcon className="w-10 h-10 text-[#c25e19]" />
              </div>
              <h5 className="font-bold text-slate-850 text-sm sm:text-base text-slate-900 group-hover:text-[#c25e19] transition-colors leading-snug">
                Interactive Map &amp; Dashboard
              </h5>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                (All-India CAAQMS &amp; Bengaluru Pinpoint)
              </p>
            </div>

            {/* Card 4.2: Chat Interface */}
            <div
              onClick={() =>
                setSelectedItem({
                  title: 'Chat Interface',
                  layer: 'Applications & User Interface',
                  icon: <MessageSquare className="w-10 h-10 text-[#c25e19] fill-[#c25e19]" />,
                  subtitle: 'Natural language queries',
                  description:
                    'Conversational environmental analyst answering user inquiries and synthesizing dynamic visual analytics graphs grounded in real-time ground telemetry.',
                  drishtiMapping:
                    'Powered by AeroQuery: Conversational Telemetry & Dynamic Visual Analytics Agent with Gemini 3.8 Flash.',
                  specifications: [
                    'Natural language intent detection',
                    '5-mode dynamic line chart synthesis',
                    'NAAQS standards compliance check',
                    'Diurnal trends with National AQI hazard bands',
                  ],
                })
              }
              className="bg-white border border-[#f3d3bd] rounded-xl p-5 shadow-sm hover:shadow-md hover:border-[#c25e19] transition-all cursor-pointer flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-xl flex items-center justify-center text-[#c25e19] mb-3 group-hover:scale-105 transition-transform">
                <MessageSquare className="w-10 h-10 text-[#c25e19] fill-[#c25e19]" />
              </div>
              <h5 className="font-bold text-slate-850 text-sm sm:text-base text-slate-900 group-hover:text-[#c25e19] transition-colors leading-snug">
                Chat Interface
              </h5>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                (Natural language queries)
              </p>
            </div>

            {/* Card 4.3: Reports & Alerts */}
            <div
              onClick={() =>
                setSelectedItem({
                  title: 'Reports & Alerts',
                  layer: 'Applications & User Interface',
                  icon: <AlertTriangle className="w-10 h-10 text-[#c25e19] fill-[#c25e19]" />,
                  subtitle: 'Insights & Notifications',
                  description:
                    'Automated anomaly notifications, citizen hazard reports, and health advisories for sensitive demographic cohorts.',
                  drishtiMapping:
                    'Exceedance badges, health recommendation panels, and Multimodal citizen hazard verification notifications.',
                  specifications: [
                    'Dominant criteria pollutant detection',
                    'Citizen photo upload plume audits',
                    'Vulnerable population health recommendations',
                    'Hotspot peak exceedance warnings',
                  ],
                })
              }
              className="bg-white border border-[#f3d3bd] rounded-xl p-5 shadow-sm hover:shadow-md hover:border-[#c25e19] transition-all cursor-pointer flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-xl flex items-center justify-center text-[#c25e19] mb-3 group-hover:scale-105 transition-transform">
                <AlertTriangle className="w-10 h-10 text-[#c25e19] fill-[#c25e19]" />
              </div>
              <h5 className="font-bold text-slate-850 text-sm sm:text-base text-slate-900 group-hover:text-[#c25e19] transition-colors leading-snug">
                Reports &amp; Alerts
              </h5>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                (Insights &amp; Notifications)
              </p>
            </div>

            {/* Card 4.4: API Access */}
            <div
              onClick={() =>
                setSelectedItem({
                  title: 'API Access',
                  layer: 'Applications & User Interface',
                  icon: <Code2 className="w-10 h-10 text-[#c25e19]" />,
                  subtitle: 'External Integration',
                  description:
                    'REST endpoints and Python ADK 2.0 tool definitions allowing external clients, data science scripts, and municipal agents to access live telemetry.',
                  drishtiMapping:
                    'Available via Express routes (/api/aqi/realtime, /api/agent/orchestrate, /api/forecast) and Python ADK decorators.',
                  specifications: [
                    'JSON API endpoints on Node.js / Express',
                    'Python ADK 2.0 @agent.tool decorator contracts',
                    'Real-time streaming and 15s cycle triggers',
                    'Structured JSON output validation',
                  ],
                })
              }
              className="bg-white border border-[#f3d3bd] rounded-xl p-5 shadow-sm hover:shadow-md hover:border-[#c25e19] transition-all cursor-pointer flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-xl flex items-center justify-center text-[#c25e19] mb-3 group-hover:scale-105 transition-transform">
                <Code2 className="w-10 h-10 text-[#c25e19]" />
              </div>
              <h5 className="font-bold text-slate-850 text-sm sm:text-base text-slate-900 group-hover:text-[#c25e19] transition-colors leading-snug">
                API Access
              </h5>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                (External Integration)
              </p>
            </div>
          </div>
        </div>

        {/* Upward Connecting Arrow */}
        <div className="flex justify-center -my-2">
          <div className="flex flex-col items-center text-slate-400 dark:text-slate-500">
            <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center shadow-sm">
              <ArrowUp className="w-5 h-5 text-slate-600 dark:text-slate-300 stroke-[3]" />
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* TIER 3: Agentic System (Royal Blue) */}
        {/* ========================================================= */}
        <div className="bg-[#f2f7fc] border-2 border-[#cde0f3] rounded-2xl p-5 sm:p-6 shadow-sm transition hover:shadow-md">
          <h4 className="text-lg sm:text-xl font-bold text-[#1f5899] tracking-tight mb-4 flex items-center gap-2">
            <span>Agentic System</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 3.1: Interaction Agent */}
            <div
              onClick={() =>
                setSelectedItem({
                  title: 'Interaction Agent',
                  layer: 'Agentic System',
                  icon: <MessageSquare className="w-10 h-10 text-[#1f5899] fill-[#1f5899]" />,
                  subtitle: 'Understand user intent and query the system',
                  description:
                    'Natural language reasoning agent that interprets conversational prompts, grounds responses in live ground telemetry, and triggers dynamic visual charts.',
                  drishtiMapping:
                    'Operates as AeroQuery: Conversational Telemetry & Dynamic Visual Analytics Agent (gemini-3.8-flash).',
                  specifications: [
                    'Intent parsing for multi-station comparisons',
                    'Zero raw markdown asterisks generation',
                    'Context binding with selected pinpoints and stations',
                    'Dynamic SVG/Canvas chart parameterization',
                  ],
                })
              }
              className="bg-white border border-[#c3daf2] rounded-xl p-5 shadow-sm hover:shadow-md hover:border-[#1f5899] transition-all cursor-pointer flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-xl flex items-center justify-center text-[#1f5899] mb-3 group-hover:scale-105 transition-transform">
                <MessageSquare className="w-10 h-10 text-[#1f5899] fill-[#1f5899]" />
              </div>
              <h5 className="font-bold text-slate-850 text-sm sm:text-base text-slate-900 group-hover:text-[#1f5899] transition-colors leading-snug">
                Interaction Agent
              </h5>
              <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
                Understand user intent and query the system
              </p>
            </div>

            {/* Card 3.2: Analytics Agent */}
            <div
              onClick={() =>
                setSelectedItem({
                  title: 'Analytics Agent',
                  layer: 'Agentic System',
                  icon: <BarChart3 className="w-10 h-10 text-[#1f5899]" />,
                  subtitle: 'Forecasting and root-cause analysis',
                  description:
                    'Foundation model forecasting agent predicting 24-hour pollutant diurnal trajectories with probabilistic uncertainty intervals and weather covariates.',
                  drishtiMapping:
                    'Operates as TimesFM 2.0 Foundation Forecaster (Google Research timesfm-2.0-500m).',
                  specifications: [
                    '168-hour rolling telemetry context window',
                    '24-hour diurnal forecasts for PM2.5, PM10, AQI',
                    'P10 / P50 / P90 probabilistic confidence cones',
                    'Exogenous temperature & wind vector conditioning',
                  ],
                })
              }
              className="bg-white border border-[#c3daf2] rounded-xl p-5 shadow-sm hover:shadow-md hover:border-[#1f5899] transition-all cursor-pointer flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-xl flex items-center justify-center text-[#1f5899] mb-3 group-hover:scale-105 transition-transform">
                <BarChart3 className="w-10 h-10 text-[#1f5899]" />
              </div>
              <h5 className="font-bold text-slate-850 text-sm sm:text-base text-slate-900 group-hover:text-[#1f5899] transition-colors leading-snug">
                Analytics Agent
              </h5>
              <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
                Forecasting and root-cause analysis
              </p>
            </div>

            {/* Card 3.3: Planning Agent */}
            <div
              onClick={() =>
                setSelectedItem({
                  title: 'Planning Agent',
                  layer: 'Agentic System',
                  icon: <Settings className="w-10 h-10 text-[#1f5899] fill-[#1f5899]" />,
                  subtitle: 'Decompose tasks, call tools and manage workflow',
                  description:
                    'Master orchestration engine managing periodic 15-second polling loops, task decomposition, tool dispatch, and agent message bus coordination.',
                  drishtiMapping:
                    'Operates as National Macro-Ingestion & CAAQMS Orchestrator on Google ADK 2.0 Web Engine.',
                  specifications: [
                    'Periodic 15-second auto-cycle synchronization',
                    'Dynamic tool execution and payload assembly',
                    'Asynchronous event bus dispatch',
                    'Multi-model fallback coordination (Flash -> Lite)',
                  ],
                })
              }
              className="bg-white border border-[#c3daf2] rounded-xl p-5 shadow-sm hover:shadow-md hover:border-[#1f5899] transition-all cursor-pointer flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-xl flex items-center justify-center text-[#1f5899] mb-3 group-hover:scale-105 transition-transform">
                <Settings className="w-10 h-10 text-[#1f5899] fill-[#1f5899]" />
              </div>
              <h5 className="font-bold text-slate-850 text-sm sm:text-base text-slate-900 group-hover:text-[#1f5899] transition-colors leading-snug">
                Planning Agent
              </h5>
              <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
                Decompose tasks, call tools and manage workflow
              </p>
            </div>

            {/* Card 3.4: Verification Agent */}
            <div
              onClick={() =>
                setSelectedItem({
                  title: 'Verification Agent',
                  layer: 'Agentic System',
                  icon: <ShieldCheck className="w-10 h-10 text-[#1f5899] fill-[#1f5899]" />,
                  subtitle: 'Validate results and ensure reliability',
                  description:
                    'Computer vision and cross-station auditing agent that validates citizen smoke/burning uploads against surrounding 5km sensor readings to prevent fraud.',
                  drishtiMapping:
                    'Operates as Multimodal Hazard Verification Agent (Gemini Vision API + ground truth telemetry).',
                  specifications: [
                    'Multimodal image/video plume analysis',
                    '5km radius ground sensor cross-reference',
                    '0-100% confidence scoring algorithm',
                    'Fraud & spurious upload detection',
                  ],
                })
              }
              className="bg-white border border-[#c3daf2] rounded-xl p-5 shadow-sm hover:shadow-md hover:border-[#1f5899] transition-all cursor-pointer flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-xl flex items-center justify-center text-[#1f5899] mb-3 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-10 h-10 text-[#1f5899] fill-[#1f5899]" />
              </div>
              <h5 className="font-bold text-slate-850 text-sm sm:text-base text-slate-900 group-hover:text-[#1f5899] transition-colors leading-snug">
                Verification Agent
              </h5>
              <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
                Validate results and ensure reliability
              </p>
            </div>
          </div>
        </div>

        {/* Upward Connecting Arrow */}
        <div className="flex justify-center -my-2">
          <div className="flex flex-col items-center text-slate-400 dark:text-slate-500">
            <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center shadow-sm">
              <ArrowUp className="w-5 h-5 text-slate-600 dark:text-slate-300 stroke-[3]" />
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* TIER 2: Sensor Fusion & Data Processing (Forest Green) */}
        {/* ========================================================= */}
        <div className="bg-[#f2faf5] border-2 border-[#caecd8] rounded-2xl p-5 sm:p-6 shadow-sm transition hover:shadow-md">
          <h4 className="text-lg sm:text-xl font-bold text-[#21774d] tracking-tight mb-4 flex items-center gap-2">
            <span>Sensor Fusion &amp; Data Processing</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 2.1: Data Ingestion */}
            <div
              onClick={() =>
                setSelectedItem({
                  title: 'Data Ingestion',
                  layer: 'Sensor Fusion & Data Processing',
                  icon: <Database className="w-10 h-10 text-[#21774d] fill-[#21774d]" />,
                  subtitle: 'Collect from multiple sources',
                  description:
                    'Automated pipeline polling Central Control Room (CCR) portal, State Pollution Control Boards, and automated weather radars every 15 seconds.',
                  drishtiMapping:
                    'Handled by Express /api/aqi/realtime backend scraper and pipeline caching layers.',
                  specifications: [
                    'Periodic 15s asynchronous polling',
                    '32 States & Union Territories coverage',
                    'Dead sensor detection & timeout failovers',
                    'Automated retry with exponential backoff',
                  ],
                })
              }
              className="bg-white border border-[#bce4cc] rounded-xl p-5 shadow-sm hover:shadow-md hover:border-[#21774d] transition-all cursor-pointer flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-xl flex items-center justify-center text-[#21774d] mb-3 group-hover:scale-105 transition-transform">
                <Database className="w-10 h-10 text-[#21774d] fill-[#21774d]" />
              </div>
              <h5 className="font-bold text-slate-850 text-sm sm:text-base text-slate-900 group-hover:text-[#21774d] transition-colors leading-snug">
                Data Ingestion
              </h5>
              <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
                Collect from multiple sources
              </p>
            </div>

            {/* Card 2.2: Sensor Fusion */}
            <div
              onClick={() =>
                setSelectedItem({
                  title: 'Sensor Fusion',
                  layer: 'Sensor Fusion & Data Processing',
                  icon: <SensorFusionForkIcon className="w-10 h-10 text-[#21774d]" />,
                  subtitle: 'Align and combine multi-source data',
                  description:
                    'Geospatial Inverse Distance Weighting (IDW) aligning surrounding ground stations and matching weather radar covariates.',
                  drishtiMapping:
                    'Bengaluru Citizen Hyperlocal Agent and geospatial IDW interpolation kernel.',
                  specifications: [
                    'Haversine distance spatial weighting (d^-2)',
                    'Multi-station criteria pollutant alignment',
                    'Micro-meteorological covariate matching',
                    'Urban boundary layer surface roughness',
                  ],
                })
              }
              className="bg-white border border-[#bce4cc] rounded-xl p-5 shadow-sm hover:shadow-md hover:border-[#21774d] transition-all cursor-pointer flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-xl flex items-center justify-center text-[#21774d] mb-3 group-hover:scale-105 transition-transform">
                <SensorFusionForkIcon className="w-10 h-10 text-[#21774d]" />
              </div>
              <h5 className="font-bold text-slate-850 text-sm sm:text-base text-slate-900 group-hover:text-[#21774d] transition-colors leading-snug">
                Sensor Fusion
              </h5>
              <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
                Align and combine multi-source data
              </p>
            </div>

            {/* Card 2.3: Cleaning & Imputation */}
            <div
              onClick={() =>
                setSelectedItem({
                  title: 'Cleaning & Imputation',
                  layer: 'Sensor Fusion & Data Processing',
                  icon: <Sparkles className="w-10 h-10 text-[#21774d]" />,
                  subtitle: 'Handle missing data and noise',
                  description:
                    'Filters physical impossibilities (negative concentrations, frozen values), applies sensor drift offsets, and handles calibration anomalies.',
                  drishtiMapping:
                    'Executed during server-side telemetry normalization before state broadcast.',
                  specifications: [
                    'Outlier rejection (concentrations > physical caps)',
                    'Baseline drift correction for electrochemical sensors',
                    'Missing sub-index imputation from secondary sensors',
                    'NAQI piece-wise linear breakpoint calculation',
                  ],
                })
              }
              className="bg-white border border-[#bce4cc] rounded-xl p-5 shadow-sm hover:shadow-md hover:border-[#21774d] transition-all cursor-pointer flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-xl flex items-center justify-center text-[#21774d] mb-3 group-hover:scale-105 transition-transform">
                <Sparkles className="w-10 h-10 text-[#21774d]" />
              </div>
              <h5 className="font-bold text-slate-850 text-sm sm:text-base text-slate-900 group-hover:text-[#21774d] transition-colors leading-snug">
                Cleaning &amp; Imputation
              </h5>
              <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
                Handle missing data and noise
              </p>
            </div>

            {/* Card 2.4: Feature Construction */}
            <div
              onClick={() =>
                setSelectedItem({
                  title: 'Feature Construction',
                  layer: 'Sensor Fusion & Data Processing',
                  icon: <Layers className="w-10 h-10 text-[#21774d]" />,
                  subtitle: 'Spatio-temporal features and context',
                  description:
                    'Builds 168-hour rolling historical matrices, wind vector components (U and V), diurnal solar cycles, and ventilation coefficients.',
                  drishtiMapping:
                    'Prepares input tensors fed into Google TimesFM 2.0 and AeroQuery contexts.',
                  specifications: [
                    '168-hour rolling context series assembly',
                    'Wind vector resolution (speed + direction to u/v)',
                    'Diurnal phase and thermal inversion features',
                    'Dominant criteria pollutant index attribution',
                  ],
                })
              }
              className="bg-white border border-[#bce4cc] rounded-xl p-5 shadow-sm hover:shadow-md hover:border-[#21774d] transition-all cursor-pointer flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-xl flex items-center justify-center text-[#21774d] mb-3 group-hover:scale-105 transition-transform">
                <Layers className="w-10 h-10 text-[#21774d]" />
              </div>
              <h5 className="font-bold text-slate-850 text-sm sm:text-base text-slate-900 group-hover:text-[#21774d] transition-colors leading-snug">
                Feature Construction
              </h5>
              <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
                Spatio-temporal features and context
              </p>
            </div>
          </div>
        </div>

        {/* Upward Connecting Arrow */}
        <div className="flex justify-center -my-2">
          <div className="flex flex-col items-center text-slate-400 dark:text-slate-500">
            <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center shadow-sm">
              <ArrowUp className="w-5 h-5 text-slate-600 dark:text-slate-300 stroke-[3]" />
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* TIER 1 (BOTTOM): Multi-Source Data (Royal Purple) */}
        {/* ========================================================= */}
        <div className="bg-[#f9f5fc] border-2 border-[#e6d8f5] rounded-2xl p-5 sm:p-6 shadow-sm transition hover:shadow-md">
          <h4 className="text-lg sm:text-xl font-bold text-[#5f3796] tracking-tight mb-4 flex items-center gap-2">
            <span>Multi-Source Data</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {/* Card 1.1: Air Quality Stations */}
            <div
              onClick={() =>
                setSelectedItem({
                  title: 'Air Quality Stations',
                  layer: 'Multi-Source Data',
                  icon: <Radio className="w-9 h-9 text-[#5f3796]" />,
                  subtitle: 'AQI, pollutants, meteorology',
                  description:
                    'Physical continuous ambient air quality monitoring stations (CAAQMS) deployed across Indian industrial, commercial, and residential zones.',
                  drishtiMapping:
                    '169+ CAAQMS ground stations measuring PM2.5, PM10, NO2, SO2, CO, and O3 in real-time.',
                  specifications: [
                    'Beta Attenuation Monitors (BAM-1020) for particulate matter',
                    'Chemiluminescence analyzers for Nitrogen Oxides (NO2)',
                    'Ultraviolet fluorescence analyzers for Sulfur Dioxide (SO2)',
                    'Non-Dispersive Infrared (NDIR) analyzers for Carbon Monoxide',
                  ],
                })
              }
              className="bg-white border border-[#ddc7f2] rounded-xl p-4 shadow-sm hover:shadow-md hover:border-[#5f3796] transition-all cursor-pointer flex flex-col items-center text-center group"
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-[#5f3796] mb-2.5 group-hover:scale-105 transition-transform">
                <Radio className="w-9 h-9 text-[#5f3796]" />
              </div>
              <h5 className="font-bold text-slate-850 text-xs sm:text-sm text-slate-900 group-hover:text-[#5f3796] transition-colors leading-snug">
                Air Quality Stations
              </h5>
              <p className="text-[11px] text-slate-500 mt-1 font-medium leading-relaxed">
                AQI, pollutants, meteorology
              </p>
            </div>

            {/* Card 1.2: Satellite Data */}
            <div
              onClick={() =>
                setSelectedItem({
                  title: 'Satellite Data',
                  layer: 'Multi-Source Data',
                  icon: <SatelliteIcon className="w-9 h-9 text-[#5f3796]" />,
                  subtitle: 'AOD, NO₂, PM, land use',
                  description:
                    'Earth observation satellite constellations monitoring column-integrated aerosol optical depth, tropospheric nitrogen dioxide, and surface reflectance.',
                  drishtiMapping:
                    'Integrated into regional background dispersion models and boundary layer height estimations.',
                  specifications: [
                    'Sentinel-5P TROPOMI tropospheric NO2 columns',
                    'MODIS/Aqua Aerosol Optical Depth (AOD) at 550nm',
                    'INSAT-3D thermal infrared boundary layer tracking',
                    'Land surface roughness & canopy categorization',
                  ],
                })
              }
              className="bg-white border border-[#ddc7f2] rounded-xl p-4 shadow-sm hover:shadow-md hover:border-[#5f3796] transition-all cursor-pointer flex flex-col items-center text-center group"
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-[#5f3796] mb-2.5 group-hover:scale-105 transition-transform">
                <SatelliteIcon className="w-9 h-9 text-[#5f3796]" />
              </div>
              <h5 className="font-bold text-slate-850 text-xs sm:text-sm text-slate-900 group-hover:text-[#5f3796] transition-colors leading-snug">
                Satellite Data
              </h5>
              <p className="text-[11px] text-slate-500 mt-1 font-medium leading-relaxed">
                AOD, NO₂, PM, land use
              </p>
            </div>

            {/* Card 1.3: Street-level Images */}
            <div
              onClick={() =>
                setSelectedItem({
                  title: 'Street-level Images',
                  layer: 'Multi-Source Data',
                  icon: <Camera className="w-9 h-9 text-[#5f3796] fill-[#5f3796]" />,
                  subtitle: 'Traffic, construction, urban context',
                  description:
                    'Citizen ground uploads and traffic monitoring video feeds capturing visible smoke plumes, open biomass burning, and road construction dust.',
                  drishtiMapping:
                    'Ingested directly into Multimodal Hazard Verification Agent (Gemini Vision).',
                  specifications: [
                    'Citizen geo-tagged hazard photographs and videos',
                    'Open waste and agricultural stubble burning detection',
                    'Urban construction fugitive dust emissions',
                    'Vehicular congestion plume identification',
                  ],
                })
              }
              className="bg-white border border-[#ddc7f2] rounded-xl p-4 shadow-sm hover:shadow-md hover:border-[#5f3796] transition-all cursor-pointer flex flex-col items-center text-center group"
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-[#5f3796] mb-2.5 group-hover:scale-105 transition-transform">
                <Camera className="w-9 h-9 text-[#5f3796] fill-[#5f3796]" />
              </div>
              <h5 className="font-bold text-slate-850 text-xs sm:text-sm text-slate-900 group-hover:text-[#5f3796] transition-colors leading-snug">
                Street-level Images
              </h5>
              <p className="text-[11px] text-slate-500 mt-1 font-medium leading-relaxed">
                Traffic, construction, urban context
              </p>
            </div>

            {/* Card 1.4: Geospatial Data */}
            <div
              onClick={() =>
                setSelectedItem({
                  title: 'Geospatial Data',
                  layer: 'Multi-Source Data',
                  icon: <MapPin className="w-9 h-9 text-[#5f3796] fill-[#5f3796]" />,
                  subtitle: 'Transport, land use, emissions',
                  description:
                    'High-resolution spatial GIS layers representing major road corridors, industrial cluster boundaries, elevation contours, and land use classification.',
                  drishtiMapping:
                    'Used by Bengaluru Citizen Hyperlocal Agent for street reverse geocoding and IDW weighting.',
                  specifications: [
                    'OpenStreetMap & Google Maps transport networks',
                    'Digital Elevation Models (SRTM 30m resolution)',
                    'Industrial vs residential zoning boundaries',
                    'Street canyon aspect ratios and building geometry',
                  ],
                })
              }
              className="bg-white border border-[#ddc7f2] rounded-xl p-4 shadow-sm hover:shadow-md hover:border-[#5f3796] transition-all cursor-pointer flex flex-col items-center text-center group"
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-[#5f3796] mb-2.5 group-hover:scale-105 transition-transform">
                <MapPin className="w-9 h-9 text-[#5f3796] fill-[#5f3796]" />
              </div>
              <h5 className="font-bold text-slate-850 text-xs sm:text-sm text-slate-900 group-hover:text-[#5f3796] transition-colors leading-snug">
                Geospatial Data
              </h5>
              <p className="text-[11px] text-slate-500 mt-1 font-medium leading-relaxed">
                Transport, land use, emissions
              </p>
            </div>

            {/* Card 1.5: Weather Data */}
            <div
              onClick={() =>
                setSelectedItem({
                  title: 'Weather Data',
                  layer: 'Multi-Source Data',
                  icon: <CloudSun className="w-9 h-9 text-[#5f3796]" />,
                  subtitle: 'Temperature, humidity, wind, rainfall',
                  description:
                    'Meteorological surface observations and atmospheric soundings providing 8 key micro-climate variables governing pollutant dispersion.',
                  drishtiMapping:
                    'Matched to each ground station and street pinpoint (Temp, Humidity, Wind speed, Wind dir, Pressure, Solar radiation).',
                  specifications: [
                    'Ambient Temperature (°C) & Relative Humidity (%)',
                    'Wind Speed (m/s) & Cardinal Wind Direction (deg)',
                    'Barometric Pressure (hPa) & Solar Radiation (W/m²)',
                    'Rainfall precipitation accumulation (mm)',
                  ],
                })
              }
              className="bg-white border border-[#ddc7f2] rounded-xl p-4 shadow-sm hover:shadow-md hover:border-[#5f3796] transition-all cursor-pointer flex flex-col items-center text-center group"
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-[#5f3796] mb-2.5 group-hover:scale-105 transition-transform">
                <CloudSun className="w-9 h-9 text-[#5f3796]" />
              </div>
              <h5 className="font-bold text-slate-850 text-xs sm:text-sm text-slate-900 group-hover:text-[#5f3796] transition-colors leading-snug">
                Weather Data
              </h5>
              <p className="text-[11px] text-slate-500 mt-1 font-medium leading-relaxed">
                Temperature, humidity, wind, rainfall
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Detail Modal / Inspector Panel */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
            >
              ✕
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 shrink-0">
                {selectedItem.icon}
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 block">
                  {selectedItem.layer}
                </span>
                <h4 className="text-lg font-bold text-white leading-tight">
                  {selectedItem.title}
                </h4>
                <span className="text-xs text-slate-400 font-medium">{selectedItem.subtitle}</span>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80">
                <span className="text-[10px] font-bold uppercase text-slate-500 block mb-1">
                  Functional Purpose
                </span>
                <p className="text-slate-300 leading-relaxed">{selectedItem.description}</p>
              </div>

              <div className="bg-emerald-950/30 border border-emerald-500/30 p-3.5 rounded-xl">
                <span className="text-[10px] font-bold uppercase text-emerald-400 block mb-1">
                  DRISHTI-Air Platform Implementation
                </span>
                <p className="text-emerald-200 font-medium leading-relaxed">
                  {selectedItem.drishtiMapping}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase text-slate-500 block mb-1.5">
                  Technical Specifications &amp; Capabilities
                </span>
                <ul className="space-y-1.5 text-slate-300">
                  {selectedItem.specifications.map((spec, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
