/// <reference types="google.maps" />
import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, useMap } from '@vis.gl/react-google-maps';
import { StationAQI } from '../types';
import { MapPin, Wind, Layers, Activity, ShieldAlert, CheckCircle2, ChevronRight, Eye, Thermometer, Droplets, Gauge, Sun, CloudRain, Compass, ExternalLink, Maximize2, Minimize2, X, TrendingUp, Sparkles } from 'lucide-react';

interface AqiGeoMapProps {
  stations: StationAQI[];
  onSelectStation: (station: StationAQI) => void;
  onOpenForecast?: (station: StationAQI, target?: string) => void;
  selectedState?: string;
  selectedCity?: string;
}

const INDIA_CENTER = { lat: 20.5937, lng: 78.9629 };

// Tracker subcomponent inside <Map> to convert target LatLng to container pixels live
const MapPositionTracker: React.FC<{
  targetStation: StationAQI | null;
  onPositionUpdate: (pos: { x: number; y: number } | null) => void;
}> = ({ targetStation, onPositionUpdate }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !targetStation) {
      onPositionUpdate(null);
      return;
    }

    const overlay = new google.maps.OverlayView();
    overlay.onAdd = () => {};
    overlay.onRemove = () => {};
    overlay.draw = () => {
      const projection = overlay.getProjection();
      if (!projection) return;
      const point = projection.fromLatLngToContainerPixel(
        new google.maps.LatLng(targetStation.lat, targetStation.lng)
      );
      if (point) {
        onPositionUpdate({ x: point.x, y: point.y });
      }
    };
    overlay.setMap(map);

    const updatePos = () => {
      const projection = overlay.getProjection();
      if (!projection) return;
      const point = projection.fromLatLngToContainerPixel(
        new google.maps.LatLng(targetStation.lat, targetStation.lng)
      );
      if (point) {
        onPositionUpdate({ x: point.x, y: point.y });
      }
    };

    const listeners = [
      map.addListener('center_changed', updatePos),
      map.addListener('zoom_changed', updatePos),
      map.addListener('bounds_changed', updatePos),
      map.addListener('drag', updatePos),
    ];

    updatePos();

    return () => {
      listeners.forEach((l) => google.maps.event.removeListener(l));
      overlay.setMap(null);
    };
  }, [map, targetStation, onPositionUpdate]);

  return null;
};

// Dark high-contrast styling tailored for environmental sensor networks
const DARK_MAP_STYLES: google.maps.MapTypeStyle[] = [
  { elementType: 'geometry', stylers: [{ color: '#0f172a' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#0f172a' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#94a3b8' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#cbd5e1' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#64748b' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#064e3b' }, { lightness: -20 }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#1e293b' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#0f172a' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#334155' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#020617' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#475569' }],
  },
];

export const AqiGeoMap: React.FC<AqiGeoMapProps> = ({
  stations,
  onSelectStation,
  onOpenForecast,
  selectedState = 'All',
  selectedCity = 'All',
}) => {
  const [hoveredStation, setHoveredStation] = useState<StationAQI | null>(null);
  const [activeTierFilter, setActiveTierFilter] = useState<string>('All');
  const [mapType, setMapType] = useState<'roadmap' | 'satellite'>('roadmap');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [pinPos, setPinPos] = useState<{ x: number; y: number } | null>(null);

  const apiKey = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string) || '';

  const handleMarkerHover = useCallback(
    (st: StationAQI, e?: any) => {
      setHoveredStation(st);
      if (containerRef.current && e) {
        const mouseEv = (e.domEvent || e) as MouseEvent;
        if (mouseEv && typeof mouseEv.clientX === 'number' && typeof mouseEv.clientY === 'number') {
          const rect = containerRef.current.getBoundingClientRect();
          setPinPos({
            x: mouseEv.clientX - rect.left,
            y: mouseEv.clientY - rect.top,
          });
        }
      }
    },
    []
  );

  // Compute strictly clamped popup positioning inside the map frame
  const popupCoords = useMemo(() => {
    if (!hoveredStation || !containerRef.current) return null;
    const containerWidth = containerRef.current.clientWidth || 800;
    const containerHeight = containerRef.current.clientHeight || 750;

    const POPUP_WIDTH = Math.min(345, containerWidth - 28);
    const POPUP_HEIGHT = Math.min(460, containerHeight - 36);
    const PADDING = 14;

    const currentX = pinPos?.x ?? containerWidth / 2;
    const currentY = pinPos?.y ?? containerHeight / 2;

    let top: number;
    // If pin is in the upper 48% of the visible container:
    // Place popup BELOW the pin so it stays fully inside the frame!
    if (currentY < containerHeight * 0.48) {
      top = currentY + 28;
    } else {
      // Place popup ABOVE the pin
      top = currentY - POPUP_HEIGHT - 28;
    }

    let left = currentX - POPUP_WIDTH / 2;

    // Strict boundary clamping so the popup NEVER extends outside the map frame
    const clampedTop = Math.max(PADDING, Math.min(containerHeight - POPUP_HEIGHT - PADDING, top));
    const clampedLeft = Math.max(PADDING, Math.min(containerWidth - POPUP_WIDTH - PADDING, left));

    return {
      top: clampedTop,
      left: clampedLeft,
      width: POPUP_WIDTH,
      maxHeight: POPUP_HEIGHT,
      isBelow: currentY < containerHeight * 0.48,
    };
  }, [hoveredStation, pinPos]);

  // Filter stations for map display based on tier filter if selected
  const mapStations = useMemo(() => {
    if (activeTierFilter === 'All') return stations;
    if (activeTierFilter === 'Critical') {
      return stations.filter((s) => s.aqi >= 300);
    }
    return stations.filter((s) => s.aqi_category === activeTierFilter);
  }, [stations, activeTierFilter]);

  // Statistics for map legend
  const stats = useMemo(() => {
    let severeCount = 0;
    let poorCount = 0;
    let moderateCount = 0;
    let goodCount = 0;
    stations.forEach((s) => {
      if (s.aqi >= 300) severeCount++;
      else if (s.aqi >= 200) poorCount++;
      else if (s.aqi >= 100) moderateCount++;
      else goodCount++;
    });
    return { severeCount, poorCount, moderateCount, goodCount };
  }, [stations]);

  return (
    <div className="bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
      {/* Map Control Header */}
      <div className="p-4 sm:p-5 border-b border-slate-800/80 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-slate-900/60">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 text-emerald-400 shadow-inner">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-slate-100 text-base flex items-center gap-1.5">
                All-India Geospatial Telemetry Map
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Interactive GIS
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Live coordinates across {stations.length} Continuous Ambient Air Quality Monitoring Stations (CAAQMS)
            </p>
          </div>
        </div>

        {/* Tier Filters & View Toggle */}
        <div className="flex items-center flex-wrap gap-2">
          <div className="flex items-center gap-1 bg-slate-950/70 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTierFilter('All')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                activeTierFilter === 'All'
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All ({stations.length})
            </button>
            <button
              onClick={() => setActiveTierFilter('Critical')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                activeTierFilter === 'Critical'
                  ? 'bg-red-500 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-red-400'
              }`}
            >
              Severe/Very Poor ({stats.severeCount})
            </button>
            <button
              onClick={() => setActiveTierFilter('Good')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                activeTierFilter === 'Good'
                  ? 'bg-emerald-500/30 text-emerald-300 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-emerald-400'
              }`}
            >
              Good/Satisfactory ({stats.goodCount})
            </button>
          </div>

          <div className="flex items-center gap-1 bg-slate-950/70 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setMapType('roadmap')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                mapType === 'roadmap'
                  ? 'bg-slate-800 text-slate-100 font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Terrain
            </button>
            <button
              onClick={() => setMapType('satellite')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                mapType === 'satellite'
                  ? 'bg-slate-800 text-slate-100 font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Satellite
            </button>
          </div>

          {/* Vertical Size Toggle */}
          <div className="flex items-center bg-slate-950/70 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setIsExpanded((prev) => !prev)}
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 font-medium ${
                isExpanded
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title={isExpanded ? 'Collapse to standard height' : 'Expand vertical height'}
            >
              {isExpanded ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Standard View</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Expand Map Height</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Map Canvas Area - Vertically Expanded */}
      <div
        ref={containerRef}
        className={`relative w-full transition-all duration-300 bg-slate-950 overflow-hidden ${
          isExpanded ? 'h-[900px] lg:h-[960px]' : 'h-[750px] lg:h-[820px]'
        }`}
      >
        {!apiKey ? (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center text-slate-400">
            <MapPin className="w-10 h-10 text-emerald-500/50 mb-3 animate-pulse" />
            <h4 className="text-base font-semibold text-slate-200">Google Maps Platform Key Required</h4>
            <p className="text-xs text-slate-400 max-w-md mt-1.5">
              Google Maps API key is initializing. CAAQMS telemetry stations are available in the table below.
            </p>
          </div>
        ) : (
          <APIProvider apiKey={apiKey} libraries={['marker']}>
            <Map
              mapId="DEMO_MAP_ID"
              defaultCenter={INDIA_CENTER}
              defaultZoom={5}
              minZoom={3}
              maxZoom={18}
              mapTypeId={mapType}
              colorScheme="DARK"
              gestureHandling="greedy"
              disableDefaultUI={false}
              internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
              streetViewControl={false}
              mapTypeControl={false}
              fullscreenControl={true}
              zoomControl={true}
              onClick={() => setHoveredStation(null)}
              className="w-full h-full"
              style={{ width: '100%', height: '100%' }}
            >
            {/* Live Container Position Tracker */}
            <MapPositionTracker
              targetStation={hoveredStation}
              onPositionUpdate={setPinPos}
            />

            {/* Station Markers */}
            {mapStations.map((st) => {
              const isHovered = hoveredStation?.station_id === st.station_id;

              return (
                <AdvancedMarker
                  key={st.station_id}
                  position={{ lat: st.lat, lng: st.lng }}
                  title={`${st.station_name} | AQI: ${st.aqi} (${st.aqi_category})`}
                  onMouseEnter={(e) => handleMarkerHover(st, e)}
                  onClick={() => {
                    setHoveredStation(st);
                    onSelectStation(st);
                  }}
                  zIndex={isHovered ? 9999 : st.aqi}
                >
                  <Pin
                    background={st.category_color || '#ef4444'}
                    borderColor="#ffffff"
                    glyphColor="#ffffff"
                    scale={isHovered ? 1.3 : 0.88}
                  />
                </AdvancedMarker>
              );
            })}
          </Map>
        </APIProvider>
      )}

        {/* Clamped In-Frame Ground Station Overlay Popup */}
        {hoveredStation && popupCoords && (
          <div
            style={{
              position: 'absolute',
              top: `${popupCoords.top}px`,
              left: `${popupCoords.left}px`,
              width: `${popupCoords.width}px`,
              maxHeight: `${popupCoords.maxHeight}px`,
            }}
            className="z-30 bg-white/95 backdrop-blur-md text-slate-900 border border-slate-300/80 shadow-2xl rounded-2xl p-3.5 overflow-y-auto font-sans scrollbar-thin transition-all duration-150 animate-fadeIn pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Station Title & CPCB Metadata */}
            <div className="flex items-start justify-between gap-2 border-b border-slate-200 pb-2 mb-2">
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-mono text-[10px] bg-slate-900 text-emerald-400 px-1.5 py-0.5 rounded font-bold">
                    {hoveredStation.station_id}
                  </span>
                  {hoveredStation.cpcb_site_id && (
                    <span className="font-mono text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded border border-slate-300 font-semibold">
                      {hoveredStation.cpcb_site_id}
                    </span>
                  )}
                  {hoveredStation.category && (
                    <span className="text-[9px] bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded border border-indigo-200 font-semibold">
                      {hoveredStation.category}
                    </span>
                  )}
                </div>
                <h4 className="text-xs font-bold text-slate-900 mt-1 leading-snug">
                  {hoveredStation.station_name}
                </h4>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="text-[11px] font-medium text-slate-500">
                    {hoveredStation.city}, {hoveredStation.state}
                  </span>
                  <a
                    href={hoveredStation.portal_link || 'https://airquality.cpcb.gov.in/ccr/#/all-india-aqi-portal'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-emerald-600 hover:text-emerald-700 flex items-center gap-0.5 font-medium underline ml-2"
                  >
                    CPCB Portal <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-1.5 shrink-0">
                <div
                  className="px-2 py-1 rounded-md text-right shrink-0 border"
                  style={{
                    backgroundColor: `${hoveredStation.category_color}15`,
                    borderColor: hoveredStation.category_color,
                  }}
                >
                  <span
                    className="text-base font-extrabold leading-none block font-mono"
                    style={{ color: hoveredStation.category_color }}
                  >
                    {hoveredStation.aqi}
                  </span>
                  <span className="text-[9px] uppercase font-bold text-slate-600 block">
                    {hoveredStation.aqi_category}
                  </span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setHoveredStation(null);
                  }}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                  title="Close overlay popup"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Dominant Criteria Pollutant */}
            <div className="flex items-center justify-between text-[11px] mb-2 px-2 py-1 rounded bg-slate-100 text-slate-700">
              <span className="text-slate-500 font-medium">Dominant Driver:</span>
              <span className="font-bold text-slate-900 font-mono">
                {hoveredStation.dominant_pollutant}
              </span>
            </div>

            {/* 6 Real-time Criteria Pollutants Grid */}
            <div className="mb-2">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>Criteria Pollutants (Normalized)</span>
                <span className="text-[9px] text-slate-400">NAQI Sub-indices</span>
              </div>
              <div className="grid grid-cols-3 gap-1 text-[10px]">
                <div className="bg-slate-50 border border-slate-200 p-1 rounded">
                  <span className="text-slate-400 block font-semibold text-[9px]">PM2.5</span>
                  <span className="font-bold text-slate-800 font-mono text-[11px]">{hoveredStation.pm25}</span>
                  <span className="text-[8px] text-slate-400 block">µg/m³</span>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-1 rounded">
                  <span className="text-slate-400 block font-semibold text-[9px]">PM10</span>
                  <span className="font-bold text-slate-800 font-mono text-[11px]">{hoveredStation.pm10}</span>
                  <span className="text-[8px] text-slate-400 block">µg/m³</span>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-1 rounded">
                  <span className="text-slate-400 block font-semibold text-[9px]">NO2</span>
                  <span className="font-bold text-slate-800 font-mono text-[11px]">{hoveredStation.no2}</span>
                  <span className="text-[8px] text-slate-400 block">µg/m³</span>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-1 rounded">
                  <span className="text-slate-400 block font-semibold text-[9px]">SO2</span>
                  <span className="font-bold text-slate-800 font-mono text-[11px]">{hoveredStation.so2}</span>
                  <span className="text-[8px] text-slate-400 block">µg/m³</span>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-1 rounded">
                  <span className="text-slate-400 block font-semibold text-[9px]">CO</span>
                  <span className="font-bold text-slate-800 font-mono text-[11px]">{hoveredStation.co}</span>
                  <span className="text-[8px] text-slate-400 block">mg/m³</span>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-1 rounded">
                  <span className="text-slate-400 block font-semibold text-[9px]">O3</span>
                  <span className="font-bold text-slate-800 font-mono text-[11px]">{hoveredStation.o3}</span>
                  <span className="text-[8px] text-slate-400 block">µg/m³</span>
                </div>
              </div>
            </div>

            {/* 8 Target Meteorological Variables */}
            <div className="mb-2.5 pt-2 border-t border-slate-200">
              <div className="text-[10px] font-bold text-sky-800 uppercase tracking-wider mb-1 flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <Thermometer className="w-3 h-3 text-sky-600" />
                  8 Meteorological Variables
                </span>
                <span className="text-[9px] text-slate-500 font-mono">IMD / CAAQMS / GEE</span>
              </div>

              <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                <div className="bg-sky-50/70 border border-sky-200/80 p-1.5 rounded flex items-center justify-between">
                  <span className="text-slate-600 flex items-center gap-1 font-medium">
                    <Thermometer className="w-3 h-3 text-amber-600" /> Temp:
                  </span>
                  <span className="font-bold text-slate-900 font-mono">{hoveredStation.temperature_c}°C</span>
                </div>
                <div className="bg-sky-50/70 border border-sky-200/80 p-1.5 rounded flex items-center justify-between">
                  <span className="text-slate-600 flex items-center gap-1 font-medium">
                    <Droplets className="w-3 h-3 text-blue-500" /> Humidity:
                  </span>
                  <span className="font-bold text-slate-900 font-mono">{hoveredStation.relative_humidity_pct}%</span>
                </div>
                <div className="bg-sky-50/70 border border-sky-200/80 p-1.5 rounded flex items-center justify-between">
                  <span className="text-slate-600 flex items-center gap-1 font-medium">
                    <Wind className="w-3 h-3 text-teal-600" /> Wind Speed:
                  </span>
                  <span className="font-bold text-slate-900 font-mono">{hoveredStation.wind_speed_mps} m/s</span>
                </div>
                <div className="bg-sky-50/70 border border-sky-200/80 p-1.5 rounded flex items-center justify-between">
                  <span className="text-slate-600 flex items-center gap-1 font-medium">
                    <Compass className="w-3 h-3 text-indigo-500" /> Wind Dir:
                  </span>
                  <span className="font-bold text-slate-900 font-mono">
                    {hoveredStation.wind_direction_cardinal} ({hoveredStation.wind_direction_deg}°)
                  </span>
                </div>
                <div className="bg-sky-50/70 border border-sky-200/80 p-1.5 rounded flex items-center justify-between">
                  <span className="text-slate-600 flex items-center gap-1 font-medium">
                    <Gauge className="w-3 h-3 text-slate-600" /> Pressure:
                  </span>
                  <span className="font-bold text-slate-900 font-mono">{hoveredStation.barometric_pressure_hpa} hPa</span>
                </div>
                <div className="bg-sky-50/70 border border-sky-200/80 p-1.5 rounded flex items-center justify-between">
                  <span className="text-slate-600 flex items-center gap-1 font-medium">
                    <Sun className="w-3 h-3 text-amber-500" /> Solar Rad:
                  </span>
                  <span className="font-bold text-slate-900 font-mono">{hoveredStation.solar_radiation_wm2} W/m²</span>
                </div>
                <div className="bg-sky-50/70 border border-sky-200/80 p-1.5 rounded flex items-center justify-between">
                  <span className="text-slate-600 flex items-center gap-1 font-medium">
                    <CloudRain className="w-3 h-3 text-blue-600" /> Rainfall:
                  </span>
                  <span className="font-bold text-slate-900 font-mono">{hoveredStation.rainfall_mm} mm</span>
                </div>
                <div className="bg-sky-50/70 border border-sky-200/80 p-1.5 rounded flex items-center justify-between">
                  <span className="text-slate-600 flex items-center gap-1 font-medium">
                    <Eye className="w-3 h-3 text-purple-600" /> AOD Index:
                  </span>
                  <span className="font-bold text-purple-900 font-mono">{hoveredStation.aerosol_optical_depth}</span>
                </div>
              </div>
            </div>

            {/* Sources tag */}
            <div className="text-[9px] text-slate-400 mb-2.5 bg-slate-100 px-2 py-1 rounded flex items-center justify-between font-mono">
              <span>Feeds: Ground CAAQMS Telemetry</span>
              <span className="text-emerald-700 font-bold">15s Live</span>
            </div>

            {/* Action Buttons: 24h Forecast + Station Diagnostics */}
            <div className="space-y-1.5">
              {/* Primary 24h AI Forecasting Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (onOpenForecast) {
                    onOpenForecast(hoveredStation, 'AQI');
                  }
                }}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white text-xs font-bold shadow-md shadow-teal-950/40 transition-all cursor-pointer"
                title="Run 24-hour time-series forecast using Google TimesFM zero-shot foundation model"
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>24h TimesFM AI Forecast</span>
                <Sparkles className="w-3 h-3 text-cyan-200 ml-auto" />
              </button>

              {/* Inspect Full Station Diagnostics */}
              <button
                onClick={() => {
                  onSelectStation(hoveredStation);
                  setHoveredStation(null);
                }}
                className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-medium transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Inspect Full Station Diagnostics</span>
                <ChevronRight className="w-3 h-3 ml-auto opacity-70" />
              </button>
            </div>
          </div>
        )}

        {/* Legend Overlay at Bottom-Left */}
        <div className="absolute bottom-3 left-3 z-10 bg-slate-950/85 backdrop-blur-md p-2.5 rounded-xl border border-slate-800/80 shadow-lg text-[11px] flex flex-col gap-1.5 max-w-[260px] pointer-events-auto">
          <div className="flex items-center justify-between text-slate-300 font-semibold border-b border-slate-800/60 pb-1">
            <span>CPCB NAQI Tier Scale</span>
            <span className="text-[10px] text-slate-500 font-normal">Hover Pin to View</span>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shadow-sm" />
              <span className="text-slate-400">0 - 50 Good</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-lime-500 inline-block shadow-sm" />
              <span className="text-slate-400">51 - 100 Satisfactory</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block shadow-sm" />
              <span className="text-slate-400">101 - 200 Moderate</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block shadow-sm" />
              <span className="text-slate-400">201 - 300 Poor</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block shadow-sm" />
              <span className="text-slate-400">301 - 400 Very Poor</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-950 inline-block border border-red-500 shadow-sm" />
              <span className="text-slate-400">401 - 500 Severe</span>
            </div>
          </div>
        </div>

        {/* Quick Location Badge at Top-Right */}
        <div className="absolute top-3 right-3 z-10 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-xs text-slate-300 shadow-md flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Pan & Zoom Enabled • Hover Pin to Inspect</span>
        </div>
      </div>
    </div>
  );
};
