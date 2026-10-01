import React from 'react';
import {
  Layers,
  Radio,
  Sparkles,
  Cpu,
  Database,
  MapPin,
  TrendingUp,
  Zap,
  ArrowRight,
  Bot,
  Activity,
  Flame,
  Navigation,
  BookOpen,
  Sliders,
  Camera,
  Home,
  FileText,
  Video,
  Code2,
  ExternalLink,
  Mail,
} from 'lucide-react';

interface WelcomeViewProps {
  onNavigateToMap: (view: 'all_india' | 'bengaluru_citizen') => void;
  onNavigateToTab?: (tab: 'dashboard' | 'console' | 'python' | 'workflow') => void;
}

export const WelcomeView: React.FC<WelcomeViewProps> = ({
  onNavigateToMap,
  onNavigateToTab,
}) => {
  return (
    <div className="space-y-8 pb-10">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-500/10 via-emerald-500/10 to-transparent blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/40 flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              DRISHTI-Air Agentic AI Platform
            </span>
            <span className="px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 font-mono text-xs font-semibold border border-sky-500/30">
              National CAAQMS Ingestion • Hyperlocal Verification
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-mono text-xs font-semibold border border-indigo-500/30 flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5" />
              Google AI Studio &amp; TimesFM 2.0
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Distributed Real-time Ingestion, Sensing &amp; Hyperlocal Telemetry Intelligence
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            DRISHTI-Air bridges India&apos;s macro-level air quality monitoring with street-level citizen observations. By combining continuous ground sensors from 169+ CAAQMS stations, Inverse Distance Weighting (IDW) spatial interpolation, multimodal hazard verification via Gemini, and zero-shot foundation model forecasting with Google TimesFM, DRISHTI-Air delivers end-to-end, actionable climate intelligence.
          </p>
        </div>
      </div>

      {/* Section 1: Google Tools & Verified Data Pipeline */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Zap className="w-4 h-4" />
              Technology Stack &amp; Data Pipeline
            </span>
            <h2 className="text-lg sm:text-xl font-black text-white mt-0.5">
              Google Tools &amp; Verified Data Pipeline
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">100% Operational &amp; Verified Components</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card: Google AI & Developer Tools */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-5 h-5 text-cyan-200" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Google AI &amp; Developer Tools</h3>
                <p className="text-xs text-slate-400 font-mono">Foundational Models &amp; Orchestration</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-850 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <Bot className="w-3.5 h-3.5 text-indigo-400" />
                    Gemini Multimodal Models (gemini-3.8-flash)
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono">Vision &amp; Reasoning</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Powers multimodal incident verification for citizen photos/videos, visual evidence forensic analysis, and AeroQuery conversational telemetry intelligence across national CAAQMS streams.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-850 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-teal-400" />
                    Google TimesFM 2.0 (500M Foundation Model)
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 font-mono">Zero-Shot Forecasting</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Zero-shot time-series foundation model providing 24-hour predictive horizons for NAQI and all 6 criteria pollutants conditioned on 168-hour historical context, benchmarked against Seasonal Naive baselines.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-850 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                    Google AI Studio
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono">Agent Engine</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  The primary rapid prototyping, prompting, and runtime execution environment orchestrating the autonomous multi-agent pipeline and toolset.
                </p>
              </div>
            </div>
          </div>

          {/* Card: Verified Telemetry & Spatial Pipeline */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-cyan-600 flex items-center justify-center text-white shadow-md">
                <Database className="w-5 h-5 text-emerald-200" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Telemetry &amp; Spatial Pipeline</h3>
                <p className="text-xs text-slate-400 font-mono">Ground Sensors, Interpolation &amp; Geospatial</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-850 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-emerald-400" />
                    CAAQMS Ground Telemetry (169+ Stations)
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">Ground Truth</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Real-time telemetry ingested from 169+ Continuous Ambient Air Quality Monitoring Stations across 32 States &amp; UTs, calibrated for 6 criteria pollutants (PM2.5, PM10, NO2, SO2, CO, O3) and 8 meteorological parameters.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-850 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <Navigation className="w-3.5 h-3.5 text-teal-400" />
                    Inverse Distance Weighting (IDW) Engine
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 font-mono">Spatial Synthesis</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Spatial interpolation engine synthesizing nearby ground station readings to calculate localized street-level air quality baselines for any arbitrary coordinate selected across Bengaluru.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-850 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-sky-400" />
                    Google Maps Platform (@vis.gl/react-google-maps)
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-mono">Geospatial UI</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Interactive vector maps, dynamic NAQI tier color-coded station pins, detailed modal info window overlays, and downwind hazard dispersion plume polygons.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: DRISHTI-Air App & Features & Deliverables */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              User Guide &amp; Walkthrough
            </span>
            <h2 className="text-lg sm:text-xl font-black text-white mt-0.5">
              DRISHTI-Air App &amp; Features
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">Platform Deliverables &amp; Interactive Guides</span>
        </div>

        {/* 3 Blocks: Agentic App PPT, Demo Video, and Github Link */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Block 1: Agentic App PPT */}
          <a
            href="https://indianinstituteofscience-my.sharepoint.com/:p:/g/personal/snaman_iisc_ac_in/IQBq9yuke0yxRZy10zHQ0y_mARh9vVUcEhS_VPx0wPH_5P0?e=Kz7JHL"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-950 border border-amber-500/30 hover:border-amber-400 rounded-2xl p-5 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-amber-500/10 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                  <FileText className="w-5 h-5 text-amber-300" />
                </div>
                <span className="text-[11px] font-mono text-amber-400 flex items-center gap-1 group-hover:underline">
                  <span>Open PPT</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-white group-hover:text-amber-200 transition-colors">
                  Agentic App PPT
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Presentation deck covering distributed multi-agent architecture, TimesFM foundation forecasting, and climate action impact.
                </p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-amber-300/80 font-mono">
              <span>IISc SharePoint Deck</span>
              <span className="text-slate-500">PowerPoint</span>
            </div>
          </a>

          {/* Block 2: Demo Video */}
          <a
            href="https://drive.google.com/file/d/1f7rupwejZhwh0bfGq1yRbp8xgGGdcrYO/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden bg-gradient-to-br from-rose-500/10 via-slate-900 to-slate-950 border border-rose-500/30 hover:border-rose-400 rounded-2xl p-5 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-rose-500/10 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                  <Video className="w-5 h-5 text-rose-300" />
                </div>
                <span className="text-[11px] font-mono text-rose-400 flex items-center gap-1 group-hover:underline">
                  <span>Watch Video</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-white group-hover:text-rose-200 transition-colors">
                  Demo Video
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Recorded prototype demonstration showcasing real-time CAAQMS ingestion, TimesFM predictions, and multimodal verification.
                </p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-rose-300/80 font-mono">
              <span>Google Drive Video</span>
              <span className="text-slate-500">Live Demo</span>
            </div>
          </a>

          {/* Block 3: Github Link */}
          <a
            href="https://github.com/Thanvish07/DRISHTI-Air/tree/main"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden bg-gradient-to-br from-cyan-500/10 via-slate-900 to-slate-950 border border-cyan-500/30 hover:border-cyan-400 rounded-2xl p-5 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-500/10 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                  <Code2 className="w-5 h-5 text-cyan-300" />
                </div>
                <span className="text-[11px] font-mono text-cyan-400 flex items-center gap-1 group-hover:underline">
                  <span>Source Code</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-white group-hover:text-cyan-200 transition-colors">
                  Github Link
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Full open-source codebase containing multi-agent ingestion pipelines, Google ADK orchestration, and interactive web maps.
                </p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-cyan-300/80 font-mono">
              <span>Thanvish07 / DRISHTI-Air</span>
              <span className="text-slate-500">main branch</span>
            </div>
          </a>
        </div>

        {/* Feature Guides */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
          {/* Card 1: All-Indian CAAQMS Map Features */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-sm border border-emerald-500/30">
                    1
                  </div>
                  <h3 className="font-bold text-white text-base">
                    All-Indian CAAQMS Map Features
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[11px] font-mono">
                  Macro Monitoring
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Explore continuous ambient air quality across India with real-time station metrics, meteorological covariates, and time-series forecasting:
              </p>

              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-850">
                  <Sliders className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Filter by State, City &amp; AQI Severity:</strong>
                    Use the filter bar to isolate hotspot cities (e.g. Delhi, Patna, Ghaziabad) or compare clean peninsular zones (Bengaluru, Mysuru, Thiruvananthapuram).
                  </div>
                </li>

                <li className="flex items-start gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-850">
                  <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Interactive Map &amp; Info Window Overlays:</strong>
                    Hover or click any CAAQMS pin on the Google Map to inspect live NAQI, category color, all 6 criteria pollutants, and 8 meteorological variables.
                  </div>
                </li>

                <li className="flex items-start gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-850">
                  <TrendingUp className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">24-Hour TimesFM Zero-Shot Forecasts:</strong>
                    Click &quot;Forecast&quot; on any station or data table row to generate a 24-hour predictive forecast curve powered by Google TimesFM without model retraining.
                  </div>
                </li>

                <li className="flex items-start gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-850">
                  <Bot className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">AeroQuery AI Chatbot with Dynamic Charts:</strong>
                    Ask questions like <em>&quot;Compare Delhi vs Mumbai vs Bengaluru AQI&quot;</em> or <em>&quot;Show PM2.5 correlation with wind speed&quot;</em> for natural language analysis and dynamic Plotly graphs.
                  </div>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onNavigateToMap('all_india')}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <Layers className="w-4 h-4" />
              <span>Explore All-India CAAQMS Map</span>
            </button>
          </div>

          {/* Card 2: Bengaluru Hyperlocal Citizen Map Features */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-black text-sm border border-sky-500/30">
                    2
                  </div>
                  <h3 className="font-bold text-white text-base">
                    Bengaluru Hyperlocal Citizen Map Features
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/30 text-[11px] font-mono">
                  Hyperlocal Verification
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Pinpoint any street in Bengaluru city to trigger spatial sensor interpolation and upload citizen media for Gemini multimodal hazard verification:
              </p>

              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-850">
                  <Navigation className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Drop Pin Anywhere in Bengaluru:</strong>
                    Click anywhere on the Bengaluru map or click key artery presets (Silk Board, Whitefield, Bellandur) to trigger automated reverse geocoding and multi-station telemetry baseline interpolation.
                  </div>
                </li>

                <li className="flex items-start gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-850">
                  <Camera className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Upload Photos / Videos or Test Presets:</strong>
                    Select a sample citizen incident (Open Garbage Fire, Unpaved Road Dust, Diesel Bottleneck) or upload your own incident photo/video frame.
                  </div>
                </li>

                <li className="flex items-start gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-850">
                  <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Gemini Multimodal Hazard Verification:</strong>
                    Click &quot;Verify Hazard&quot; to have Gemini analyze visual evidence, identify combustion smoke vs harmless water steam, and predict pollutant emission deltas.
                  </div>
                </li>

                <li className="flex items-start gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-850">
                  <Flame className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Updated Pollutant Levels &amp; Plume Dispersion:</strong>
                    Verified hazards instantly elevate the pinpoint display to show post-incident pollutant level changes, update the map marker tier color, and draw downwind dispersion plume polygons with affected streets.
                  </div>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onNavigateToMap('bengaluru_citizen')}
              className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <Radio className="w-4 h-4" />
              <span>Explore Bengaluru Hyperlocal Citizen Map</span>
            </button>
          </div>
        </div>
      </div>

      {/* Contact Us for Any Queries */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Mail className="w-4 h-4" />
              Get In Touch
            </span>
            <h2 className="text-lg sm:text-xl font-black text-white mt-0.5">
              Contact Us for any Queries
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">Indian Institute of Science (IISc Bengaluru)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Contact 1: Naman Srivastava */}
          <div className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-xl transition-all space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold text-sm">
                NS
              </div>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">Naman Srivastava</h3>
                <p className="text-[11px] text-slate-400 font-mono">Indian Institute of Science</p>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-800/80">
              <a
                href="mailto:snaman@iisc.ac.in"
                className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
              >
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <span>snaman@iisc.ac.in</span>
              </a>
            </div>
          </div>

          {/* Contact 2: J Thanish Vishaal */}
          <div className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-xl transition-all space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-bold text-sm">
                TV
              </div>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">J Thanish Vishaal</h3>
                <p className="text-[11px] text-slate-400 font-mono">Indian Institute of Science</p>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-800/80">
              <a
                href="mailto:thanishvish1@iisc.ac.in"
                className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
              >
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <span>thanishvish1@iisc.ac.in</span>
              </a>
            </div>
          </div>

          {/* Contact 3: Pawan Kumar */}
          <div className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-xl transition-all space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold text-sm">
                PK
              </div>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">Pawan Kumar</h3>
                <p className="text-[11px] text-slate-400 font-mono">Indian Institute of Science</p>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-800/80">
              <a
                href="mailto:kpawan@iisc.ac.in"
                className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
              >
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <span>kpawan@iisc.ac.in</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
