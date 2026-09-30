import React, { useState } from 'react';
import {
  Network,
  Cpu,
  Bot,
  Activity,
  Layers,
  Database,
  Radio,
  Eye,
  LineChart,
  ShieldAlert,
  Sparkles,
  Zap,
  ArrowRight,
  ArrowDown,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  Code2,
  Compass,
  Wind,
  FileCode,
  Workflow,
  Share2,
  Scan,
  MapPin,
  TrendingUp,
} from 'lucide-react';
import { SystemArchitectureDiagram } from './SystemArchitectureDiagram';

interface AgentSpec {
  id: string;
  name: string;
  codename: string;
  role: string;
  model: string;
  framework: string;
  trigger: string;
  latency: string;
  status: 'ACTIVE' | 'ONLINE' | 'STANDBY';
  color: string;
  borderColor: string;
  bgLight: string;
  description: string;
  inputs: string[];
  outputs: string[];
  flowTo: { targetId: string; payload: string }[];
  codeSnippet: string;
}

export const AgentArchitectureView: React.FC = () => {
  const [selectedAgentId, setSelectedAgentId] = useState<string>('cpcb_ingestion');
  const [activeSubTab, setActiveSubTab] = useState<'topology' | 'system_architecture' | 'agents' | 'protocols'>('topology');
  const [hoveredEdge, setHoveredEdge] = useState<string | null>(null);

  // 5 Active Specialized Agents (GRAP agent removed as requested)
  const agentsList: AgentSpec[] = [
    {
      id: 'cpcb_ingestion',
      name: 'National Macro-Ingestion & CAAQMS Agent',
      codename: 'National_Ingestion_Orchestrator',
      role: 'Continuous Ground Telemetry Ingestion, Cleansing & Spatial Normalization',
      model: 'Rule-Based Engine + ADK Async Pipeline',
      framework: 'Google ADK 2.0 / Node.js Express',
      trigger: 'Every 15 Seconds (Periodic Auto-Cycle)',
      latency: '~240ms',
      status: 'ACTIVE',
      color: 'from-emerald-500 to-teal-600',
      borderColor: 'border-emerald-500',
      bgLight: 'bg-emerald-500/10',
      description:
        'Continuous ambient air quality monitoring agent that ingests real-time ground readings from 169+ CAAQMS continuous monitoring stations across 32 Indian States and Union Territories. Validates sensor calibration, filters out dead sensors, normalizes micro-meteorological variables, and calculates individual pollutant sub-indices.',
      inputs: [
        'Central Control Room (CCR) telemetry portal feeds (169+ stations)',
        'State Pollution Control Boards (SPCBs) telemetry streams',
        'IMD automated meteorological radar stations (Temp, Humidity, Wind)',
      ],
      outputs: [
        'Cleansed StationAQI stream (PM2.5, PM10, NO2, SO2, CO, O3)',
        'National macro-level KPIs (average AQI, peak hotspot, cleanest station)',
        'Normalized 8-covariate meteorological vectors',
      ],
      flowTo: [
        { targetId: 'timesfm_forecaster', payload: 'Rolling 168h Historical Tensor & Weather Covariates' },
        { targetId: 'bengaluru_citizen', payload: 'Active Karnataka & Bengaluru Station Cluster Telemetry' },
        { targetId: 'aeroquery_agent', payload: 'Live Normalized National Telemetry & State Indices' },
      ],
      codeSnippet: `@agent.tool\ndef fetch_realtime_aqi(poll_cycle: int) -> dict:\n    """Polls 169+ stations across India and cleans telemetry."""\n    raw_telemetry = scrape_or_ingest_telemetry()\n    validated = [normalize_station(st) for st in raw_telemetry if st['status'] == 'LIVE']\n    metrics = compute_national_kpis(validated)\n    return {"stations": validated, "metrics": metrics, "cycle": poll_cycle}`,
    },
    {
      id: 'timesfm_forecaster',
      name: 'TimesFM 2.0 Foundation Forecasting Agent',
      codename: 'TimesFM_Temporal_Forecaster',
      role: 'Zero-Shot 24-Hour Probabilistic Temporal Forecasts',
      model: 'Google Research TimesFM 2.0 (timesfm-2.0-500m)',
      framework: 'Google TimesFM PyTorch / sktime AutoARIMA Fallback',
      trigger: 'On-Demand & 6-Hour Scheduled Batch',
      latency: '~650ms',
      status: 'ACTIVE',
      color: 'from-cyan-500 to-blue-600',
      borderColor: 'border-cyan-500',
      bgLight: 'bg-cyan-500/10',
      description:
        'Advanced foundation model agent leveraging Google Research zero-shot TimesFM 2.0 architecture trained on 100B+ time-series real-world data points. Takes a 168-hour rolling context window of ground telemetry and generates 24-hour diurnal trajectory forecast cones with P10/P50/P90 prediction intervals conditioned on exogenous meteorological covariates.',
      inputs: [
        '168-hour rolling historical ground telemetry (PM2.5, PM10, AQI)',
        'Covariates: Wind speed, wind direction, boundary layer temp, relative humidity',
      ],
      outputs: [
        '24-hour horizon hourly forecast point predictions (P50)',
        'Probabilistic uncertainty bounds (P10 lower, P90 upper)',
        'Model diagnostic metrics (sMAPE, MAE, R², Peak Exceedance probability)',
      ],
      flowTo: [
        { targetId: 'aeroquery_agent', payload: '24h Diurnal Forecast Series for Scientific Charting' },
      ],
      codeSnippet: `import timesfm\n\ntfm = timesfm.TimesFm(context_len=168, horizon_len=24)\ntfm.load_from_checkpoint(repo_id="google/timesfm-2.0-500m-pytorch")\n\ndef run_24h_station_forecast(station_history, target='PM2.5', covariates=None):\n    point_fc, full_quantiles = tfm.forecast(station_history, freq=[0], exogenous=covariates)\n    return {"p10": full_quantiles[:, 0], "p50": point_fc, "p90": full_quantiles[:, 2]}`,
    },
    {
      id: 'bengaluru_citizen',
      name: 'Bengaluru Citizen Hyperlocal Agent',
      codename: 'Bengaluru_Hyperlocal_Synthesizer',
      role: 'Inverse Distance Weighting (IDW) & Micro-Meteorology',
      model: 'IDW Spatial Kernel + Gaussian Plume Dispersion Model',
      framework: 'Google ADK 2.0 Citizen Agent / SciPy Spatial',
      trigger: 'Interactive User Pinpoint Drop / Geocode Search',
      latency: '~120ms',
      status: 'ACTIVE',
      color: 'from-sky-500 to-indigo-600',
      borderColor: 'border-sky-500',
      bgLight: 'bg-sky-500/10',
      description:
        'Hyperlocal geospatial interpolation agent dedicated to the Greater Bengaluru metropolitan area. When a citizen clicks any street or coordinates, the agent identifies the nearest active CAAQMS ground stations (Hebbal, BTM Layout, Silk Board, Peenya, BWSSB, City Railway, etc.), executes power-weighted IDW, and interpolates street-level concentrations for all 6 criteria pollutants and weather parameters.',
      inputs: [
        'Selected GPS coordinates (latitude, longitude) & street address',
        'Surrounding Bengaluru continuous CAAQMS stations telemetry',
        'Local elevation & urban canyon surface roughness vectors',
      ],
      outputs: [
        'Exact street-level PM2.5, PM10, NO2, SO2, CO, O3 concentrations',
        'Interpolated NAQI index and dominant driver pollutant',
        'Micro-weather telemetry (wind vector, temp, humidity, pressure, solar radiation)',
      ],
      flowTo: [
        { targetId: 'multimodal_verifier', payload: 'Pinpoint Baseline AQI for 5km Plume Cross-Validation' },
        { targetId: 'aeroquery_agent', payload: 'Hyperlocal 6-Pollutants & Weather for Diurnal QA' },
      ],
      codeSnippet: `@citizen_agent.tool\ndef interpolate_bengaluru_telemetry(lat: float, lng: float, stations: list) -> dict:\n    """Executes Inverse Distance Weighting across surrounding stations."""\n    distances = [haversine_km(lat, lng, s.lat, s.lng) for s in stations]\n    weights = [1.0 / (d ** 2.0 + 0.01) for d in distances]\n    pollutants = compute_weighted_average(stations, weights)\n    return {"street_aqi": calculate_naqi(pollutants), "pollutants": pollutants}`,
    },
    {
      id: 'multimodal_verifier',
      name: 'Multimodal Hazard Verification Agent',
      codename: 'Gemini_Vision_Hazard_Verifier',
      role: 'Computer Vision & Cross-Station Ground Truth Verification',
      model: 'gemini-3.8-flash (Multimodal Vision API)',
      framework: 'Google GenAI SDK (@google/genai)',
      trigger: 'Citizen Image/Video Upload',
      latency: '~850ms',
      status: 'ACTIVE',
      color: 'from-amber-500 to-rose-600',
      borderColor: 'border-amber-500',
      bgLight: 'bg-amber-500/10',
      description:
        'Audits and validates citizen hazard reports using state-of-the-art computer vision and spatial cross-station telemetry verification. Inspects uploaded photos and videos for visible smoke plumes, open waste burning, construction dust plumes, or vehicular emissions, and cross-references sensor telemetry within a 5 km radius to prevent fraudulent submissions.',
      inputs: [
        'Uploaded citizen hazard photograph or video clip',
        'Report metadata (hazard category, severity, notes)',
        'Local interpolated sensor telemetry at reporting coordinates',
      ],
      outputs: [
        'Verification status (VERIFIED_CRITICAL, VERIFIED_MODERATE, UNVERIFIED)',
        'Confidence score percentage (0-100%)',
        'Visual plume analysis & fraud assessment reasoning',
        'Automated municipal dispatch escalation tag',
      ],
      flowTo: [
        { targetId: 'aeroquery_agent', payload: 'Verified Hazard Event Context for Local Advisories' },
      ],
      codeSnippet: `async def verify_citizen_report(image_bytes: bytes, hazard_type: str, local_aqi: int):\n    prompt = f"Analyze image for {hazard_type}. Local interpolated AQI is {local_aqi}."\n    response = await ai.models.generate_content(\n        model="gemini-3.8-flash",\n        contents=[Part.from_bytes(data=image_bytes, mime_type="image/jpeg"), prompt]\n    )\n    return parse_verification_json(response.text)`,
    },
    {
      id: 'aeroquery_agent',
      name: 'AeroQuery: Conversational Telemetry & Dynamic Visual Analytics Agent',
      codename: 'AeroQuery_Visual_Analytics_Agent',
      role: 'Conversational Environmental Reasoning & Dynamic Telemetry Visualizer',
      model: 'gemini-3.8-flash + Plotly.js Visual Runtime',
      framework: 'Google GenAI SDK + Plotly Dynamic Rendering Engine',
      trigger: 'Natural Language User Inquiries & Graph Requests',
      latency: '~520ms',
      status: 'ACTIVE',
      color: 'from-violet-500 to-fuchsia-600',
      borderColor: 'border-violet-500',
      bgLight: 'bg-violet-500/10',
      description:
        'Specialized conversational telemetry reasoning agent situated across both the Main Map and the Bengaluru Citizen Map. Answers complex environmental chemistry queries, evaluates criteria pollutant exceedances against NAAQS benchmarks, and dynamically synthesizes interactive multi-variable analytics charts across 5 modes: AQI diurnal trends with CPCB hazard bands, single pollutant vs NAAQS benchmarks, dual-pollutant cross-correlations, multi-station comparisons, and inter-city comparisons.',
      inputs: [
        'User natural language query prompt',
        'Main map context (stations list, city/state filters, national metrics)',
        'Bengaluru citizen context (pinpoint street, 6 pollutants, micro-weather)',
      ],
      outputs: [
        'Scientific conversational explanation (free of raw markdown characters)',
        'Plotly.js JSON schema (traces, shapes, hazard bands, dual-axes)',
        'Live interactive SVG/Canvas line graphs with pan/zoom/export controls',
      ],
      flowTo: [],
      codeSnippet: `@agent.tool\ndef generate_plotly_visualization(query: str, telemetry_context: dict) -> dict:\n    intent = detect_plotting_intent(query)\n    traces = build_diurnal_traces(telemetry_context, intent.mode)\n    shapes = generate_cpcb_color_bands() if intent.cpcb_bands else []\n    return {"answer": answer_text, "plot_config": {"traces": traces, "shapes": shapes}}`,
    },
  ];

  const selectedAgent = agentsList.find((a) => a.id === selectedAgentId) || agentsList[0];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold flex items-center gap-1.5">
                <Workflow className="w-3.5 h-3.5" />
                DRISHTI-Air Multi-Agent Workflow
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-[11px] font-mono">
                5 Specialized Autonomous Agents
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 text-[11px] font-mono">
                Google ADK 2.0 Orchestrator
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              DRISHTI-Air: Distributed Real-time Ingestion, Sensing &amp; Hazard Telemetry Intelligence
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
              Decentralized multi-agent workflow coordinating continuous national ground telemetry ingestion across 169+ CAAQMS stations, Google TimesFM 2.0 zero-shot time-series foundation forecasting, Inverse Distance Weighting (IDW) Bengaluru street interpolation, Gemini Vision multimodal hazard verification, and AeroQuery dynamic visual analytics.
            </p>
          </div>

          <div className="flex items-center gap-2 p-1.5 bg-slate-950 rounded-xl border border-slate-800 shrink-0">
            <button
              onClick={() => setActiveSubTab('topology')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                activeSubTab === 'topology'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Workflow className="w-4 h-4" />
              <span>Agent Workflow &amp; Topology</span>
            </button>
            <button
              onClick={() => setActiveSubTab('system_architecture')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                activeSubTab === 'system_architecture'
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>System Architecture</span>
            </button>
            <button
              onClick={() => setActiveSubTab('agents')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                activeSubTab === 'agents'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Bot className="w-4 h-4" />
              <span>Agents Directory</span>
            </button>
            <button
              onClick={() => setActiveSubTab('protocols')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                activeSubTab === 'protocols'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>Protocols &amp; Failover</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sub-View 1: Multi-Agent Workflow Topology */}
      {activeSubTab === 'topology' && (
        <div className="space-y-6">
          {/* Topology Diagram Container */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6 relative">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Workflow className="w-5 h-5 text-cyan-400" />
                  <span>Agent Flow &amp; Inter-Agent Coordination Workflow</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Click any agent node to highlight its live inputs, outbound dispatches, and coordinate paths.
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>Real-time Active Mesh</span>
                </span>
                <span className="text-slate-700">•</span>
                <span className="text-cyan-400 font-mono text-[11px]">ADK 2.0 Event Bus</span>
              </div>
            </div>

            {/* Visual Multi-Agent Flow Canvas */}
            <div className="space-y-6">
              {/* STAGE 1: INGESTION STAGE */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold font-mono text-emerald-400 uppercase tracking-wider">
                  <span className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[11px]">1</span>
                  <span>Ingestion Layer (National Ground Sensor Telemetry)</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                  {/* External Sensors Source */}
                  <div className="lg:col-span-4 bg-slate-950/90 border border-slate-800 rounded-xl p-4 space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-300 flex items-center gap-1.5">
                        <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                        CAAQMS &amp; IMD Radars
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">169+ Stations</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Continuous monitoring instruments (BAM-1020, Chemiluminescence, UV Photometry) measuring 6 criteria pollutants + 8 IMD weather covariates across 32 States &amp; UTs.
                    </p>
                    <div className="flex flex-wrap gap-1 text-[10px] font-mono text-slate-400">
                      <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-emerald-300">PM2.5 / PM10</span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-300">NO2 / SO2</span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-amber-300">CO / O3</span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-sky-300">Wind &amp; Temp</span>
                    </div>
                  </div>

                  {/* Flow Arrow */}
                  <div className="lg:col-span-1 flex items-center justify-center py-2 lg:py-0">
                    <div className="flex lg:flex-row flex-col items-center gap-1 text-emerald-400 font-mono text-[10px]">
                      <ArrowRight className="w-5 h-5 hidden lg:block animate-pulse" />
                      <ArrowDown className="w-5 h-5 lg:hidden animate-pulse" />
                    </div>
                  </div>

                  {/* Agent 1 Node: CPCB Ingestion Orchestrator */}
                  <div
                    onClick={() => setSelectedAgentId('cpcb_ingestion')}
                    className={`lg:col-span-7 p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedAgentId === 'cpcb_ingestion'
                        ? 'bg-slate-850 border-emerald-500 shadow-lg shadow-emerald-950/40 ring-1 ring-emerald-500'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md">
                          <Bot className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-white">National Macro-Ingestion &amp; CAAQMS Agent</h4>
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                              Tier 1
                            </span>
                          </div>
                          <span className="text-xs text-slate-400 font-mono">National_Ingestion_Orchestrator</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] font-mono text-emerald-400 block font-bold">15s Auto-Cycle</span>
                        <span className="text-[10px] text-slate-500 font-mono">Latency: ~240ms</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 mt-2.5">
                      Cleans dead sensor values, normalizes criteria pollutant sub-indices, updates national average/hotspot KPIs, and dispatches validated telemetry onto the ADK bus.
                    </p>

                    <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                      <span className="flex items-center gap-1.5 text-emerald-400">
                        <Share2 className="w-3.5 h-3.5" />
                        Dispatches to: TimesFM Forecaster, Bengaluru Citizen Agent &amp; Chatbot
                      </span>
                      <span className="font-mono text-slate-500 text-[10px]">ADK Async Pipeline</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* STAGE 2: FOUNDATION MODEL & SPATIAL INTERPOLATION STAGE */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2 text-xs font-bold font-mono text-cyan-400 uppercase tracking-wider">
                  <span className="w-6 h-6 rounded-md bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[11px]">2</span>
                  <span>Spatial &amp; Temporal Foundation Layer</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Agent 2 Node: TimesFM Forecaster */}
                  <div
                    onClick={() => setSelectedAgentId('timesfm_forecaster')}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedAgentId === 'timesfm_forecaster'
                        ? 'bg-slate-850 border-cyan-500 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-500'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md">
                          <Cpu className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-white">TimesFM 2.0 Foundation Forecaster</h4>
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                              Tier 2A
                            </span>
                          </div>
                          <span className="text-xs text-slate-400 font-mono">TimesFM_Temporal_Forecaster</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] font-mono text-cyan-400 block font-bold">Zero-Shot 24h</span>
                        <span className="text-[10px] text-slate-500 font-mono">P10 / P50 / P90</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 mt-2.5">
                      Ingests 168h rolling ground telemetry context and computes 24-hour probabilistic forecast cones conditioned on boundary layer temperature and wind vectors.
                    </p>

                    <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                      <span className="flex items-center gap-1.5 text-cyan-400">
                        <TrendingUp className="w-3.5 h-3.5" />
                        Inbound: 168h series ➔ Outbound: 24h forecast cone
                      </span>
                      <span className="font-mono text-slate-500 text-[10px]">Google TimesFM</span>
                    </div>
                  </div>

                  {/* Agent 3 Node: Bengaluru Citizen Hyperlocal Agent */}
                  <div
                    onClick={() => setSelectedAgentId('bengaluru_citizen')}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedAgentId === 'bengaluru_citizen'
                        ? 'bg-slate-850 border-sky-500 shadow-lg shadow-sky-950/40 ring-1 ring-sky-500'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-white">Bengaluru Citizen Hyperlocal Agent</h4>
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-500/10 text-sky-400 border border-sky-500/30">
                              Tier 2B
                            </span>
                          </div>
                          <span className="text-xs text-slate-400 font-mono">Bengaluru_Hyperlocal_Synthesizer</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] font-mono text-sky-400 block font-bold">IDW Kernel</span>
                        <span className="text-[10px] text-slate-500 font-mono">Latency: ~120ms</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 mt-2.5">
                      Executes Inverse Distance Weighting across surrounding Bengaluru ground stations for any clicked pinpoint, computing street-level PM2.5, PM10, NO2, SO2, CO, O3 and micro-weather.
                    </p>

                    <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                      <span className="flex items-center gap-1.5 text-sky-400">
                        <Share2 className="w-3.5 h-3.5" />
                        Feeds: Multimodal Verifier &amp; AeroQuery Agent
                      </span>
                      <span className="font-mono text-slate-500 text-[10px]">SciPy Spatial</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* STAGE 3: MULTIMODAL VERIFICATION & SCIENTIFIC INTELLIGENCE STAGE */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2 text-xs font-bold font-mono text-indigo-400 uppercase tracking-wider">
                  <span className="w-6 h-6 rounded-md bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-[11px]">3</span>
                  <span>Multimodal Verification &amp; Conversational Intelligence Layer</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Agent 4 Node: Multimodal Hazard Verifier */}
                  <div
                    onClick={() => setSelectedAgentId('multimodal_verifier')}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedAgentId === 'multimodal_verifier'
                        ? 'bg-slate-850 border-amber-500 shadow-lg shadow-amber-950/40 ring-1 ring-amber-500'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-rose-600 flex items-center justify-center text-white shadow-md">
                          <Eye className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-white">Multimodal Hazard Verification Agent</h4>
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/30">
                              Tier 3A
                            </span>
                          </div>
                          <span className="text-xs text-slate-400 font-mono">Gemini_Vision_Hazard_Verifier</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] font-mono text-amber-400 block font-bold">Gemini Vision</span>
                        <span className="text-[10px] text-slate-500 font-mono">Cross-Station Audit</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 mt-2.5">
                      Ingests citizen-uploaded hazard photos or videos of smoke plumes and waste burning. Cross-references nearby Bengaluru ground sensors to prevent fraud and output a 0-100% confidence score.
                    </p>

                    <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                      <span className="flex items-center gap-1.5 text-amber-400">
                        <Scan className="w-3.5 h-3.5" />
                        Inbound: Photo bytes + 5km sensor baseline
                      </span>
                      <span className="font-mono text-slate-500 text-[10px]">gemini-3.8-flash</span>
                    </div>
                  </div>

                  {/* Agent 5 Node: AeroQuery Dynamic Visual Analytics Agent */}
                  <div
                    onClick={() => setSelectedAgentId('aeroquery_agent')}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedAgentId === 'aeroquery_agent'
                        ? 'bg-slate-850 border-violet-500 shadow-lg shadow-violet-950/40 ring-1 ring-violet-500'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-white shadow-md">
                          <LineChart className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-white">AeroQuery: Conversational Telemetry &amp; Visual Analytics</h4>
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-violet-500/10 text-violet-400 border border-violet-500/30">
                              Tier 3B
                            </span>
                          </div>
                          <span className="text-xs text-slate-400 font-mono">AeroQuery_Visual_Analytics_Agent</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] font-mono text-violet-400 block font-bold">5 Analytics Modes</span>
                        <span className="text-[10px] text-slate-500 font-mono">Dynamic Line Charts</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 mt-2.5">
                      Answers scientific queries across both maps without raw markdown asterisks, dynamically generating 5-mode interactive telemetry analytics charts (NAAQS benchmarks, CPCB hazard bands, dual correlation).
                    </p>

                    <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                      <span className="flex items-center gap-1.5 text-violet-400">
                        <Sparkles className="w-3.5 h-3.5" />
                        Renders directly in interactive chat bubbles
                      </span>
                      <span className="font-mono text-slate-500 text-[10px]">AeroQuery Engine</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Selected Agent Quick Status Banner */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${selectedAgent.borderColor} bg-current animate-ping`} />
                <div>
                  <span className="text-xs font-bold text-white">Active Inspected Agent: {selectedAgent.name}</span>
                  <span className="text-[11px] font-mono text-slate-400 block">{selectedAgent.role}</span>
                </div>
              </div>
              <button
                onClick={() => setActiveSubTab('agents')}
                className="px-3 py-1.5 rounded-lg bg-slate-850 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-200 transition flex items-center gap-1.5 shrink-0"
              >
                <span>View Full Agent Specification</span>
                <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sub-View: 4-Tier Agentic AI System Architecture (Matching Uploaded Architecture Diagram) */}
      {activeSubTab === 'system_architecture' && <SystemArchitectureDiagram />}

      {/* Sub-View 2: Agents Directory & Detailed Inspector Panel */}
      {activeSubTab === 'agents' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Agent Selection List */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
              <span>Ecosystem Agents ({agentsList.length})</span>
              <span className="text-emerald-400 font-mono">100% Operational</span>
            </div>

            {agentsList.map((agent) => {
              const isSelected = agent.id === selectedAgentId;
              return (
                <div
                  key={agent.id}
                  onClick={() => setSelectedAgentId(agent.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer text-left relative overflow-hidden ${
                    isSelected
                      ? 'bg-slate-900 border-emerald-500/80 shadow-lg shadow-emerald-950/30'
                      : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-850 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl bg-gradient-to-br ${agent.color} flex items-center justify-center text-white shrink-0 shadow-md`}
                      >
                        <Bot className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white leading-tight">{agent.name}</h4>
                        <span className="text-[11px] font-mono text-slate-400">{agent.codename}</span>
                      </div>
                    </div>

                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold font-mono">
                      {agent.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 mt-2.5 line-clamp-2">{agent.role}</p>

                  <div className="flex items-center gap-3 mt-3 pt-2.5 border-t border-slate-800/80 text-[10.5px] font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      <Cpu className="w-3 h-3 text-cyan-400" />
                      <span className="truncate max-w-[130px]">{agent.model.split('/')[0]}</span>
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="flex items-center gap-1 text-emerald-400">
                      <Clock className="w-3 h-3" />
                      {agent.latency}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Agent Deep Inspector Panel */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              {/* Agent Title & Metadata Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800 flex-wrap">
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${selectedAgent.color} flex items-center justify-center text-white shadow-xl shadow-cyan-950/40`}
                  >
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-white">{selectedAgent.name}</h3>
                      <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-mono text-[10px] border border-slate-700">
                        {selectedAgent.codename}
                      </span>
                    </div>
                    <p className="text-xs text-emerald-400 font-medium">{selectedAgent.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 text-xs font-mono font-bold border border-emerald-500/30 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Real-time Active</span>
                  </span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Agent Functional Overview
                </h5>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                  {selectedAgent.description}
                </p>
              </div>

              {/* Operational Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                    Foundation Model
                  </span>
                  <span className="font-bold text-cyan-300 font-mono text-xs truncate block">
                    {selectedAgent.model}
                  </span>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                    Execution Trigger
                  </span>
                  <span className="font-bold text-slate-200 text-xs truncate block">
                    {selectedAgent.trigger}
                  </span>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                    Avg Ingestion Latency
                  </span>
                  <span className="font-bold text-emerald-400 font-mono text-xs block">
                    {selectedAgent.latency}
                  </span>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                    Framework Binding
                  </span>
                  <span className="font-bold text-indigo-300 text-xs truncate block">
                    {selectedAgent.framework}
                  </span>
                </div>
              </div>

              {/* Inputs & Outputs Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800/80 space-y-2">
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-blue-400" />
                    <span>Inputs &amp; Telemetry Sources:</span>
                  </span>
                  <ul className="space-y-1 text-xs text-slate-400">
                    {selectedAgent.inputs.map((inItem, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-blue-400 font-bold">•</span>
                        <span>{inItem}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800/80 space-y-2">
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>Outputs &amp; Dispatched Products:</span>
                  </span>
                  <ul className="space-y-1 text-xs text-slate-400">
                    {selectedAgent.outputs.map((outItem, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{outItem}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Inter-Agent Coordination Flow */}
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                  Outbound Agent Data Dispatches
                </span>
                {selectedAgent.flowTo.length > 0 ? (
                  <div className="space-y-2">
                    {selectedAgent.flowTo.map((flow, idx) => {
                      const peer = agentsList.find((a) => a.id === flow.targetId);
                      return (
                        <div
                          key={idx}
                          className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs flex items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-2">
                            <ArrowRight className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                            <span className="font-semibold text-white">{peer?.name || flow.targetId}</span>
                          </div>
                          <span className="text-[11px] font-mono text-slate-400 truncate max-w-xs">{flow.payload}</span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/60">
                    Terminal visual interaction agent — renders directly in user chat and graphical viewport.
                  </p>
                )}
              </div>

              {/* Python ADK Tool Implementation Snippet */}
              <div>
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <FileCode className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Python ADK Agent Implementation</span>
                  </span>
                  <span className="font-mono text-[10px] text-slate-500">Google ADK 2.0</span>
                </div>
                <pre className="bg-slate-950 border border-slate-800/90 rounded-xl p-3.5 text-[11px] font-mono text-emerald-300/90 overflow-x-auto scrollbar-thin">
                  {selectedAgent.codeSnippet}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sub-View 3: Coordination Protocols & Failover Redundancy */}
      {activeSubTab === 'protocols' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <span>Multi-Agent Communication Protocols &amp; Resilience Architecture</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Deterministic failover matrices, JSON-RPC schema contracts, and zero-downtime mechanisms in DRISHTI-Air.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                1
              </div>
              <h4 className="text-xs font-bold text-white">Event-Driven Agent Message Bus</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Agents communicate asynchronously using typed JSON messages over the internal ADK runtime bus. Ingestion events immediately propagate to geospatial caches without thread blocking.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold">
                2
              </div>
              <h4 className="text-xs font-bold text-white">Multi-Model Automatic Failover</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Primary queries execute on <code>gemini-3.8-flash</code>. Under high-demand spikes (HTTP 503) or rate limits (HTTP 429), execution silently cascades to <code>gemini-3.1-flash-lite</code> or the deterministic heuristic engine.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold">
                3
              </div>
              <h4 className="text-xs font-bold text-white">Zero-Loss Heuristic Fallback</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                If external AI APIs are unreachable, deterministic physical models (Seasonal Naive forecaster, CPCB formula sub-index calculator, and mathematical IDW) guarantee uninterrupted telemetry.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
