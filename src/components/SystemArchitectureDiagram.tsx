import React, { useState } from 'react';
import {
  Sparkles,
  Info,
  CheckCircle2,
  ExternalLink,
  X,
  ArrowRight,
} from 'lucide-react';

// Custom SVG Icons matching the Proposed Agent Design diagram
const AntennaStationIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.93 4.93a10 10 0 0 1 14.14 0" />
    <path d="M7.76 7.76a6 6 0 0 1 8.48 0" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
    <path d="M12 14v8" />
    <path d="M8 22h8" />
  </svg>
);

const SatelliteDiagramIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M5.5 2a1.5 1.5 0 0 0-1.5 1.5v2.09c0 .35.12.69.35.95l2.61 2.91-2.91 2.61A1.5 1.5 0 0 0 4 13.5v2.09A1.5 1.5 0 0 0 5.5 17h2.09c.35 0 .69-.12.95-.35l2.61-2.91 2.91 2.61c.26.23.6.35.95.35H17a1.5 1.5 0 0 0 1.5-1.5v-2.09a1.5 1.5 0 0 0-.35-.95l-2.61-2.91 2.91-2.61c.23-.26.35-.6.35-.95V5.5A1.5 1.5 0 0 0 17 4h-2.09a1.5 1.5 0 0 0-.95.35L11.05 7.26 8.14 4.35A1.5 1.5 0 0 0 7.59 4H5.5zm7.07 9.9 1.41-1.41 2.83 2.83-1.41 1.41-2.83-2.83zm-4.24-4.24 1.41-1.41 2.83 2.83-1.41 1.41-2.83-2.83z" />
  </svg>
);

const CitizenCameraIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <circle cx="9" cy="4" r="2.5" />
    <path d="M12 9H6a3 3 0 0 0-3 3v8h2v-6h1v6h2v-6h1v6h2v-8a3 3 0 0 0-3-3z" />
    <rect x="14" y="9" width="8" height="6" rx="1.5" />
    <circle cx="18" cy="12" r="1.5" fill="#fce7f3" />
    <path d="M16 8h4v1h-4z" />
  </svg>
);

const PinpointMapIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
  </svg>
);

const WeatherCloudIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <circle cx="8" cy="7" r="3.5" />
    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
  </svg>
);

const DataIngestionCylinderIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 9c0 1.66-4.03 3-9 3s-9-1.34-9-3V5h18v4z" opacity="0.8" />
    <path d="M21 14c0 1.66-4.03 3-9 3s-9-1.34-9-3V9h18v5z" opacity="0.9" />
    <path d="M21 19c0 1.66-4.03 3-9 3s-9-1.34-9-3v-5h18v5z" />
  </svg>
);

const SensorFusionNodesIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="6" r="3" fill="currentColor" />
    <circle cx="18" cy="6" r="3" fill="currentColor" />
    <circle cx="12" cy="18" r="3" fill="currentColor" />
    <path d="M6 9v3a3 3 0 0 0 3 3h3m6-6v3a3 3 0 0 1-3 3h-3m0 0v3" />
  </svg>
);

const TimesfmChartIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="12" width="3.5" height="9" rx="1" />
    <rect x="8.5" y="8" width="3.5" height="13" rx="1" />
    <rect x="14" y="4" width="3.5" height="17" rx="1" />
    <rect x="19.5" y="10" width="3.5" height="11" rx="1" />
    <path d="M3 21h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const GearProcessingIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54A.484.484 0 0 0 13.92 2h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.73 8.47c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.485.485 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
  </svg>
);

const StackedLayersIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="m12 2-10 6 10 6 10-6-10-6z" />
    <path d="m2 12 10 6 10-6-1.5-.9-8.5 5.1-8.5-5.1-1.5.9z" opacity="0.85" />
    <path d="m2 16 10 6 10-6-1.5-.9-8.5 5.1-8.5-5.1-1.5.9z" opacity="0.7" />
  </svg>
);

interface BlockDetail {
  title: string;
  category: string;
  badge: string;
  color: string;
  description: string;
  implementation: string;
  specifications: string[];
}

export const SystemArchitectureDiagram: React.FC = () => {
  const [selectedBlock, setSelectedBlock] = useState<BlockDetail | null>(null);

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-mono font-bold">
              Proposed Agent Design
            </span>
            <span className="text-xs text-slate-400 font-mono">DRISHTI-Air Multi-Agent Pipeline</span>
          </div>
          <h3 className="text-lg font-bold text-white mt-1">
            End-to-End System Architecture: Inputs, Agent Core &amp; Insights
          </h3>
          <p className="text-xs text-slate-400 mt-0.5 max-w-2xl">
            Federated climate action workflow fusing national CAAQMS stations, satellite feeds, citizen multimodal observations, Google TimesFM forecasting, and real-time interactive intelligence.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 shrink-0">
          <Info className="w-3.5 h-3.5 text-cyan-400" />
          <span>Click any block to inspect DRISHTI-Air specifications</span>
        </div>
      </div>

      {/* Main Proposed Agent Design Canvas */}
      <div className="bg-slate-950 border border-slate-800 rounded-3xl p-4 sm:p-7 shadow-2xl overflow-x-auto">
        <div className="min-w-[980px] space-y-4">
          {/* Main Diagram Title */}
          <div className="text-left pb-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1d4ed8] dark:text-[#38bdf8] tracking-tight">
              Proposed Agent Design
            </h2>
          </div>

          {/* Three Major Columns Grid with Connecting Arrows */}
          <div className="grid grid-cols-12 gap-3 items-stretch">
            {/* COLUMN 1: Input Data Sources (Pink Container, 4 cols) */}
            <div className="col-span-4 bg-[#fdf2f8] dark:bg-[#2e1065]/20 border-2 border-[#f472b6]/60 dark:border-[#a855f7]/40 rounded-2xl p-4 flex flex-col justify-between shadow-md">
              <div>
                <h3 className="text-center font-bold text-[#86198f] dark:text-[#f472b6] text-lg mb-4 tracking-tight">
                  Input Data Sources
                </h3>

                <div className="space-y-4">
                  {/* Item 1: Air Quality Stations */}
                  <div
                    onClick={() =>
                      setSelectedBlock({
                        title: 'Air Quality Stations',
                        category: 'Input Data Sources',
                        badge: 'Ground Truth CAAQMS',
                        color: 'text-purple-600 dark:text-purple-300',
                        description: 'Air Pollutant levels from ground stations across India.',
                        implementation: 'Continuous real-time ingestion from 169+ CPCB CCR ground stations across 32 States & UTs.',
                        specifications: [
                          'Pollutants: PM2.5, PM10, NO2, SO2, CO, O3',
                          'Frequency: 15-second automated ingestion cycle',
                          'Data Source: airquality.cpcb.gov.in (Central Control Room)',
                          'Calibration: Official CPCB sub-index breakpoints',
                        ],
                      })
                    }
                    className="flex items-center gap-3.5 p-2 rounded-xl hover:bg-white/60 dark:hover:bg-purple-950/40 transition cursor-pointer group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-[#7e22ce] dark:text-purple-300 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <AntennaStationIcon className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-tight">
                        Air Quality Stations
                      </div>
                      <div className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug font-serif mt-0.5">
                        Air Pollutant levels from ground stations across India
                      </div>
                    </div>
                  </div>

                  {/* Item 2: Satellite Data */}
                  <div
                    onClick={() =>
                      setSelectedBlock({
                        title: 'Satellite Data',
                        category: 'Input Data Sources',
                        badge: 'Earth Observation',
                        color: 'text-purple-600 dark:text-purple-300',
                        description: 'Air Pollutant data from satellites.',
                        implementation: 'Google Earth Engine integration accessing MODIS Terra/Aqua AOD & Sentinel-5P TROPOMI tropospheric NO2 column densities.',
                        specifications: [
                          'Aerosol Optical Depth (AOD at 550nm)',
                          'Tropospheric NO2 Column Mass',
                          'Regional aerosol transport & wildfire advection vectors',
                          'Synthesized with surface sensor measurements',
                        ],
                      })
                    }
                    className="flex items-center gap-3.5 p-2 rounded-xl hover:bg-white/60 dark:hover:bg-purple-950/40 transition cursor-pointer group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-[#7e22ce] dark:text-purple-300 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <SatelliteDiagramIcon className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-tight">
                        Satellite Data
                      </div>
                      <div className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug font-serif mt-0.5">
                        Air Pollutant data from satellites
                      </div>
                    </div>
                  </div>

                  {/* Item 3: Citizen Sourced Street-level Images */}
                  <div
                    onClick={() =>
                      setSelectedBlock({
                        title: 'Citizen Sourced Street-level Images',
                        category: 'Input Data Sources',
                        badge: 'Crowdsourced Media',
                        color: 'text-purple-600 dark:text-purple-300',
                        description: 'Local images by citizens/user like traffic, burning trash etc.',
                        implementation: 'Direct upload portal allowing citizens to submit incident photos and video clips with automated keyframe extraction for multimodal AI forensic inspection.',
                        specifications: [
                          'Formats: JPEG, PNG, WebP, MP4 video clips',
                          'In-browser HTML5 Canvas keyframe extraction',
                          'Incident categories: Open burning, construction dust, diesel congestion',
                          'Geotagged with street address & pinpoint coordinates',
                        ],
                      })
                    }
                    className="flex items-center gap-3.5 p-2 rounded-xl hover:bg-white/60 dark:hover:bg-purple-950/40 transition cursor-pointer group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-[#7e22ce] dark:text-purple-300 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <CitizenCameraIcon className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-tight">
                        Citizen Sourced Street-level Images
                      </div>
                      <div className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug font-serif mt-0.5">
                        Local images by citizens/user like traffic, burning trash etc
                      </div>
                    </div>
                  </div>

                  {/* Item 4: Geospatial Data */}
                  <div
                    onClick={() =>
                      setSelectedBlock({
                        title: 'Geospatial Data',
                        category: 'Input Data Sources',
                        badge: 'Google Maps API',
                        color: 'text-purple-600 dark:text-purple-300',
                        description: 'Geospatial information of sensors and other data sources.',
                        implementation: 'Google Maps Platform Geocoding & Maps JavaScript SDK anchoring sensors, streets, urban arterial junctions, and dispersion polygons.',
                        specifications: [
                          'Station Lat/Lng Coordinates across 32 States & UTs',
                          'Bengaluru street-level reverse geocoding',
                          'Street canyon geometry and sensitive residential zones',
                          'Open government spatial boundary datasets (data.gov.in)',
                        ],
                      })
                    }
                    className="flex items-center gap-3.5 p-2 rounded-xl hover:bg-white/60 dark:hover:bg-purple-950/40 transition cursor-pointer group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-[#7e22ce] dark:text-purple-300 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <PinpointMapIcon className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-tight">
                        Geospatial Data
                      </div>
                      <div className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug font-serif mt-0.5">
                        Geospatial information of sensors and other data sources
                      </div>
                    </div>
                  </div>

                  {/* Item 5: Weather Data */}
                  <div
                    onClick={() =>
                      setSelectedBlock({
                        title: 'Weather Data',
                        category: 'Input Data Sources',
                        badge: 'Meteorology Covariates',
                        color: 'text-purple-600 dark:text-purple-300',
                        description: 'Weather information like wind speed, temperature etc.',
                        implementation: 'IMD Automated Weather Stations (AWS) & CAAQMS sensor suites feeding 8 target meteorological variables.',
                        specifications: [
                          'Wind Speed (m/s) & Direction (degrees / cardinal)',
                          'Ambient Temperature (°C) & Relative Humidity (%)',
                          'Barometric Surface Pressure (hPa) & Rainfall (mm)',
                          'Solar Radiation (W/m²) & Aerosol Optical Depth (AOD)',
                        ],
                      })
                    }
                    className="flex items-center gap-3.5 p-2 rounded-xl hover:bg-white/60 dark:hover:bg-purple-950/40 transition cursor-pointer group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-[#7e22ce] dark:text-purple-300 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <WeatherCloudIcon className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-tight">
                        Weather Data
                      </div>
                      <div className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug font-serif mt-0.5">
                        Weather information like wind speed, temperature etc
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center pt-2 text-[10px] text-purple-700 dark:text-purple-300 font-mono">
                5 Federated Data Streams
              </div>
            </div>

            {/* Connecting Arrow 1 -> 2 */}
            <div className="col-span-1 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center shadow-lg border border-slate-700">
                <ArrowRight className="w-5 h-5 text-sky-400" />
              </div>
            </div>

            {/* COLUMN 2: DRISHTI Agent Design (Cyan Container, 4 cols) */}
            <div className="col-span-4 bg-[#f0f9ff] dark:bg-[#082f49]/30 border-2 border-[#38bdf8]/60 dark:border-[#0284c7]/40 rounded-2xl p-4 flex flex-col justify-between shadow-md">
              <div>
                <h3 className="text-center font-bold text-[#0369a1] dark:text-[#38bdf8] text-lg mb-2 tracking-tight">
                  DRISHTI Agent Design
                </h3>

                {/* Gemini Header with Tools Set */}
                <div className="flex flex-col items-center justify-center mb-3">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/80 dark:bg-slate-900 shadow-sm border border-sky-200 dark:border-sky-800">
                    <span className="font-black text-base sm:text-lg bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                      Gemini
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-1">
                    Tools Set
                  </span>
                </div>

                {/* Dashed Border Container for Tools Set */}
                <div className="border-2 border-dashed border-[#0284c7]/50 rounded-2xl p-3 bg-white/50 dark:bg-slate-900/50 space-y-3">
                  {/* Sub-row 1: Data Ingestion & Sensor Fusion */}
                  <div className="grid grid-cols-2 gap-2 text-center">
                    {/* Tool: Data Ingestion */}
                    <div
                      onClick={() =>
                        setSelectedBlock({
                          title: 'Data Ingestion',
                          category: 'DRISHTI Agent Tools Set',
                          badge: 'ETL Pipeline',
                          color: 'text-sky-600 dark:text-sky-300',
                          description: 'Collecting data from multiple sources.',
                          implementation: 'Autonomous ADK pipeline polling CCR portal, state telemetry feeds, and IMD stations every 15 seconds.',
                          specifications: [
                            'Asynchronous non-blocking HTTP streaming',
                            'Schema normalization across disparate state formats',
                            'Automated sensor health verification',
                            'In-memory circular telemetry buffer',
                          ],
                        })
                      }
                      className="p-2 rounded-xl bg-white dark:bg-slate-950 border border-sky-100 dark:border-slate-800 hover:border-sky-400 transition cursor-pointer flex flex-col items-center group shadow-xs"
                    >
                      <DataIngestionCylinderIcon className="w-7 h-7 text-[#0284c7] dark:text-sky-400 mb-1 group-hover:scale-105 transition-transform" />
                      <div className="font-bold text-[11px] sm:text-xs text-slate-900 dark:text-white leading-tight">
                        Data Ingestion
                      </div>
                      <div className="text-[10px] text-slate-600 dark:text-slate-400 font-serif leading-tight mt-0.5">
                        Collecting data from multiple sources
                      </div>
                    </div>

                    {/* Tool: Sensor Fusion */}
                    <div
                      onClick={() =>
                        setSelectedBlock({
                          title: 'Sensor Fusion',
                          category: 'DRISHTI Agent Tools Set',
                          badge: 'Multimodal Fusion',
                          color: 'text-sky-600 dark:text-sky-300',
                          description: 'Fuse citizen, station, satellite, and contextual data.',
                          implementation: 'Cross-correlates macro station readings with citizen media forensic evidence and satellite AOD vectors.',
                          specifications: [
                            'Inverse Distance Weighting (IDW) interpolation',
                            'Satellite AOD cross-validation against ground PM2.5',
                            'Incident-induced chemical surge calculation',
                            'Plume dispersion physics modeling (Gaussian)',
                          ],
                        })
                      }
                      className="p-2 rounded-xl bg-white dark:bg-slate-950 border border-sky-100 dark:border-slate-800 hover:border-sky-400 transition cursor-pointer flex flex-col items-center group shadow-xs"
                    >
                      <SensorFusionNodesIcon className="w-7 h-7 text-[#0284c7] dark:text-sky-400 mb-1 group-hover:scale-105 transition-transform" />
                      <div className="font-bold text-[11px] sm:text-xs text-slate-900 dark:text-white leading-tight">
                        Sensor Fusion
                      </div>
                      <div className="text-[10px] text-slate-600 dark:text-slate-400 font-serif leading-tight mt-0.5">
                        Fuse citizen, station, satellite, and contextual data
                      </div>
                    </div>
                  </div>

                  {/* Sub-row 2: Forecasting and Analytics (Center Hero) */}
                  <div
                    onClick={() =>
                      setSelectedBlock({
                        title: 'Forecasting and Analytics',
                        category: 'DRISHTI Agent Tools Set',
                        badge: 'Google TimesFM 2.0',
                        color: 'text-teal-600 dark:text-teal-300',
                        description: 'Using Google TimesFM to forecast air quality.',
                        implementation: 'Deploys Google Research TimesFM 2.0 (500M parameter zero-shot foundation model) to forecast NAQI and criteria pollutants.',
                        specifications: [
                          'Context Window: 168 hours historical observations',
                          'Forecast Horizon: 24 hours predictive trajectory',
                          'Covariates: Wind, Temp, Humidity, Pressure, Radiation',
                          'Deterministic ARIMA/Holt-Winters failover redundancy',
                        ],
                      })
                    }
                    className="p-2.5 rounded-xl bg-white dark:bg-slate-950 border border-sky-100 dark:border-slate-800 hover:border-teal-400 transition cursor-pointer flex flex-col items-center group shadow-xs"
                  >
                    <TimesfmChartIcon className="w-7 h-7 text-[#0284c7] dark:text-teal-400 mb-1 group-hover:scale-105 transition-transform" />
                    <div className="font-bold text-xs text-slate-900 dark:text-white leading-tight">
                      Forecasting and Analytics
                    </div>
                    <div className="text-[10px] text-slate-600 dark:text-slate-400 font-serif leading-tight mt-0.5">
                      Using Google TimesFM to forecast air quality
                    </div>
                  </div>

                  {/* Sub-row 3: Data Processing & Feature Construction */}
                  <div className="grid grid-cols-2 gap-2 text-center">
                    {/* Tool: Data Processing */}
                    <div
                      onClick={() =>
                        setSelectedBlock({
                          title: 'Data Processing',
                          category: 'DRISHTI Agent Tools Set',
                          badge: 'ETL & Cleanse',
                          color: 'text-sky-600 dark:text-sky-300',
                          description: 'Clean, align, and harmonize observations.',
                          implementation: 'Cleans faulty sensor noise, aligns asynchronous timestamps, handles missing data points, and standardizes units.',
                          specifications: [
                            'Dead sensor spike & flatline detection',
                            'NAAQS mathematical breakpoint mapping',
                            'Diurnal solar cycle normalization',
                            'Sub-index derivation for PM2.5, PM10, NO2, SO2, CO, O3',
                          ],
                        })
                      }
                      className="p-2 rounded-xl bg-white dark:bg-slate-950 border border-sky-100 dark:border-slate-800 hover:border-sky-400 transition cursor-pointer flex flex-col items-center group shadow-xs"
                    >
                      <GearProcessingIcon className="w-7 h-7 text-[#0284c7] dark:text-sky-400 mb-1 group-hover:scale-105 transition-transform" />
                      <div className="font-bold text-[11px] sm:text-xs text-slate-900 dark:text-white leading-tight">
                        Data Processing
                      </div>
                      <div className="text-[10px] text-slate-600 dark:text-slate-400 font-serif leading-tight mt-0.5">
                        Clean, align, and harmonize observations
                      </div>
                    </div>

                    {/* Tool: Feature Construction */}
                    <div
                      onClick={() =>
                        setSelectedBlock({
                          title: 'Feature Construction',
                          category: 'DRISHTI Agent Tools Set',
                          badge: 'Feature Engineering',
                          color: 'text-sky-600 dark:text-sky-300',
                          description: 'Build spatial and temporal features.',
                          implementation: 'Engineers spatial matrices, downwind drift angles, boundary layer mixing depths, and diurnal rolling averages.',
                          specifications: [
                            'Wind vector projection along residential azimuths',
                            'Gaussian dispersion plume angle & reach calculation',
                            'Thermal buoyancy & convective rise estimation',
                            'Diurnal traffic bottleneck emission profiling',
                          ],
                        })
                      }
                      className="p-2 rounded-xl bg-white dark:bg-slate-950 border border-sky-100 dark:border-slate-800 hover:border-sky-400 transition cursor-pointer flex flex-col items-center group shadow-xs"
                    >
                      <StackedLayersIcon className="w-7 h-7 text-[#0284c7] dark:text-sky-400 mb-1 group-hover:scale-105 transition-transform" />
                      <div className="font-bold text-[11px] sm:text-xs text-slate-900 dark:text-white leading-tight">
                        Feature Construction
                      </div>
                      <div className="text-[10px] text-slate-600 dark:text-slate-400 font-serif leading-tight mt-0.5">
                        Build spatial and temporal features
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center pt-2 text-[10px] text-sky-700 dark:text-sky-300 font-mono">
                Google ADK 2.0 Autonomous Core
              </div>
            </div>

            {/* Connecting Arrow 2 -> 3 */}
            <div className="col-span-1 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center shadow-lg border border-slate-700">
                <ArrowRight className="w-5 h-5 text-amber-400" />
              </div>
            </div>

            {/* COLUMN 3: Air Quality Insights (Yellow / Cream Container, 3 cols) */}
            <div className="col-span-3 bg-[#fefce8] dark:bg-[#422006]/20 border-2 border-[#facc15]/60 dark:border-[#ca8a04]/40 rounded-2xl p-4 flex flex-col justify-between shadow-md">
              <div>
                <h3 className="text-center font-bold text-[#854d0e] dark:text-[#facc15] text-lg mb-3 tracking-tight">
                  Air Quality Insights
                </h3>

                <div className="space-y-3.5">
                  {/* Insight 1: Real-Time Air Quality Monitoring */}
                  <div
                    onClick={() =>
                      setSelectedBlock({
                        title: 'Real-Time Air Quality Monitoring',
                        category: 'Air Quality Insights',
                        badge: 'Nationwide Macro Map',
                        color: 'text-amber-600 dark:text-amber-400',
                        description: 'Interactive nationwide air quality monitoring.',
                        implementation: 'Interactive Google Map rendering 169+ CPCB stations color-coded by the official NAQI tier scale with 15s live refresh.',
                        specifications: [
                          'Station diagnostics & 6 criteria pollutants view',
                          '8 meteorological covariates per ground sensor',
                          'AeroQuery natural language chatbot with Plotly plots',
                          'Dynamic filtering across 32 States & UTs',
                        ],
                      })
                    }
                    className="p-2 rounded-xl bg-white/80 dark:bg-slate-900 border border-amber-200 dark:border-amber-900/60 hover:border-amber-500 transition cursor-pointer group shadow-xs"
                  >
                    {/* Visual Preview Graphic: Nationwide Map */}
                    <div className="w-full h-20 rounded-lg overflow-hidden bg-slate-950 border border-slate-800 relative mb-2 flex items-center justify-center">
                      <svg className="w-full h-full opacity-85" viewBox="0 0 160 80">
                        <rect width="160" height="80" fill="#090d16" />
                        {/* Simplified India Coastline Outline */}
                        <path d="M40 15 Q60 5 80 15 T110 30 T125 50 T100 75 T75 60 T50 45 Z" fill="#0f172a" stroke="#1e293b" strokeWidth="1" />
                        {/* Sample Station Dots with NAQI colors */}
                        <circle cx="65" cy="22" r="3.5" fill="#ef4444" className="animate-pulse" /> {/* Delhi - Red */}
                        <circle cx="78" cy="25" r="3" fill="#f97316" /> {/* Lucknow */}
                        <circle cx="92" cy="28" r="3" fill="#eab308" /> {/* Patna */}
                        <circle cx="50" cy="38" r="3" fill="#84cc16" /> {/* Mumbai */}
                        <circle cx="68" cy="55" r="3" fill="#10b981" /> {/* Bengaluru */}
                        <circle cx="75" cy="62" r="2.5" fill="#10b981" /> {/* Chennai */}
                        <circle cx="108" cy="38" r="3" fill="#ef4444" /> {/* Kolkata */}
                        <circle cx="60" cy="30" r="2.5" fill="#eab308" /> {/* Ahmedabad */}
                        <circle cx="70" cy="45" r="2.5" fill="#84cc16" /> {/* Hyderabad */}
                      </svg>
                      <span className="absolute bottom-1 right-1 text-[8px] font-mono px-1 rounded bg-black/60 text-slate-300">
                        169+ Stations
                      </span>
                    </div>

                    <div className="font-bold text-xs sm:text-sm text-[#854d0e] dark:text-amber-300 leading-tight">
                      Real-Time Air Quality Monitoring
                    </div>
                    <div className="text-[10.5px] text-slate-600 dark:text-slate-300 font-serif leading-tight mt-0.5">
                      Interactive nationwide air quality monitoring
                    </div>
                  </div>

                  {/* Insight 2: Hyperlocal Insights */}
                  <div
                    onClick={() =>
                      setSelectedBlock({
                        title: 'Hyperlocal Insights',
                        category: 'Air Quality Insights',
                        badge: 'Bengaluru Citizen Map',
                        color: 'text-amber-600 dark:text-amber-400',
                        description: 'Citizen sourced hyper-local insights for air quality.',
                        implementation: 'High-resolution street-level map interpolating nearby sensors and visualizing verified citizen hazard plumes downwind.',
                        specifications: [
                          'Any-street pinpointing with reverse geocoding',
                          'Gemini multimodal combustion vs steam verification',
                          'Real-time before/after pollutant level surge deltas',
                          'Gaussian plume dispersion polygons over streets',
                        ],
                      })
                    }
                    className="p-2 rounded-xl bg-white/80 dark:bg-slate-900 border border-amber-200 dark:border-amber-900/60 hover:border-amber-500 transition cursor-pointer group shadow-xs"
                  >
                    {/* Visual Preview Graphic: Street Map with Plume */}
                    <div className="w-full h-20 rounded-lg overflow-hidden bg-slate-950 border border-slate-800 relative mb-2 flex items-center justify-center">
                      <svg className="w-full h-full opacity-85" viewBox="0 0 160 80">
                        <rect width="160" height="80" fill="#0f172a" />
                        {/* Street grid lines */}
                        <path d="M0 25 H160 M0 55 H160 M40 0 V80 M90 0 V80 M130 0 V80" stroke="#1e293b" strokeWidth="1" />
                        {/* Dispersion Plume Cone */}
                        <path d="M50 45 L130 20 L140 65 Z" fill="rgba(244, 63, 94, 0.35)" stroke="#f43f5e" strokeWidth="1" strokeDasharray="2,2" />
                        {/* Pinpoint Location Marker */}
                        <circle cx="50" cy="45" r="4" fill="#f43f5e" />
                        <circle cx="50" cy="45" r="8" fill="none" stroke="#f43f5e" strokeWidth="1" className="animate-ping" opacity="0.6" />
                        {/* Downwind affected streets */}
                        <circle cx="95" cy="38" r="2.5" fill="#f59e0b" />
                        <circle cx="125" cy="48" r="2.5" fill="#eab308" />
                      </svg>
                      <span className="absolute bottom-1 right-1 text-[8px] font-mono px-1 rounded bg-black/60 text-rose-300">
                        Plume Cone
                      </span>
                    </div>

                    <div className="font-bold text-xs sm:text-sm text-[#854d0e] dark:text-amber-300 leading-tight">
                      Hyperlocal Insights
                    </div>
                    <div className="text-[10.5px] text-slate-600 dark:text-slate-300 font-serif leading-tight mt-0.5">
                      Citizen sourced hyper-local insights for air quality
                    </div>
                  </div>

                  {/* Insight 3: Air Quality Forecasts */}
                  <div
                    onClick={() =>
                      setSelectedBlock({
                        title: 'Air Quality Forecasts',
                        category: 'Air Quality Insights',
                        badge: 'Zero-Shot TimesFM',
                        color: 'text-amber-600 dark:text-amber-400',
                        description: 'Next-day forecasting without retraining.',
                        implementation: 'Google TimesFM foundation model generates 24-hour predictive curves with confidence intervals conditioned on weather covariates.',
                        specifications: [
                          'Predicts NAQI & PM2.5, PM10, NO2, SO2, CO, O3',
                          'Zero-shot generalization across all climate zones',
                          'Hourly diurnal trend with peak hour identification',
                          'Actionable GRAP early intervention alerts',
                        ],
                      })
                    }
                    className="p-2 rounded-xl bg-white/80 dark:bg-slate-900 border border-amber-200 dark:border-amber-900/60 hover:border-amber-500 transition cursor-pointer group shadow-xs"
                  >
                    {/* Visual Preview Graphic: Forecast Curve */}
                    <div className="w-full h-20 rounded-lg overflow-hidden bg-slate-950 border border-slate-800 relative mb-2 flex items-center justify-center">
                      <svg className="w-full h-full opacity-85" viewBox="0 0 160 80">
                        <rect width="160" height="80" fill="#090d16" />
                        {/* Confidence interval band */}
                        <path d="M10 55 Q50 35 80 40 T150 25 L150 45 Q115 55 80 50 T10 65 Z" fill="rgba(14, 165, 233, 0.15)" />
                        {/* Historical Line */}
                        <path d="M10 60 Q30 50 50 40 T80 45" fill="none" stroke="#38bdf8" strokeWidth="2" />
                        {/* Forecast Line */}
                        <path d="M80 45 Q115 32 150 35" fill="none" stroke="#34d399" strokeWidth="2.5" strokeDasharray="3,3" />
                        {/* Split point (Now) */}
                        <line x1="80" y1="10" x2="80" y2="70" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
                        <circle cx="80" cy="45" r="3" fill="#38bdf8" />
                      </svg>
                      <span className="absolute bottom-1 right-1 text-[8px] font-mono px-1 rounded bg-black/60 text-emerald-300">
                        24h Horizon
                      </span>
                    </div>

                    <div className="font-bold text-xs sm:text-sm text-[#854d0e] dark:text-amber-300 leading-tight">
                      Air Quality Forecasts
                    </div>
                    <div className="text-[10.5px] text-slate-600 dark:text-slate-300 font-serif leading-tight mt-0.5">
                      Next-day forecasting without retraining
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center pt-2 text-[10px] text-amber-700 dark:text-amber-300 font-mono">
                Real-Time Public &amp; Policy Intelligence
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inspect Specifications Modal */}
      {selectedBlock && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-400">
                  {selectedBlock.category}
                </span>
                <h4 className="text-lg font-bold text-white mt-0.5">
                  {selectedBlock.title}
                </h4>
              </div>

              <button
                onClick={() => setSelectedBlock(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Summary:</span>
                <p className="text-slate-200 leading-relaxed">{selectedBlock.description}</p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">DRISHTI-Air Implementation:</span>
                <p className="text-slate-300 leading-relaxed font-mono text-[11.5px]">{selectedBlock.implementation}</p>
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide block">Technical Specifications:</span>
                <ul className="space-y-1">
                  {selectedBlock.specifications.map((spec, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              onClick={() => setSelectedBlock(null)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition cursor-pointer"
            >
              Close Block Inspector
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
