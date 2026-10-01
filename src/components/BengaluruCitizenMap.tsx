/// <reference types="google.maps" />
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, useMap } from '@vis.gl/react-google-maps';
import { StationAQI, BengaluruInterpolation, CitizenReportVerification } from '../types';
import { ForecastModal } from './ForecastModal';
import { AirQualityChatbot } from './AirQualityChatbot';
import {
  MapPin,
  Upload,
  Camera,
  AlertTriangle,
  CheckCircle,
  Wind,
  Thermometer,
  Droplets,
  Gauge,
  Sparkles,
  ShieldCheck,
  ShieldAlert,
  Compass,
  ArrowRight,
  TrendingUp,
  RefreshCw,
  Search,
  Eye,
  Info,
  Layers,
  FileText,
  X,
  Radio,
  Clock,
  Navigation,
  BarChart3,
  Sun,
  CloudRain,
  ExternalLink,
  Activity,
} from 'lucide-react';

const BENGALURU_CENTER = { lat: 12.9716, lng: 77.5946 };

// Street quick presets for Bengaluru
const BENGALURU_STREET_PRESETS = [
  { name: 'Indiranagar 100ft Rd', lat: 12.9719, lng: 77.6412, desc: '100 Feet Road, Indiranagar' },
  { name: 'Bellandur Lake Rd / ORR', lat: 12.9352, lng: 77.6888, desc: 'Outer Ring Road, Bellandur' },
  { name: 'Silk Board Junction', lat: 12.9176, lng: 77.6238, desc: 'Central Silk Board Flyover' },
  { name: 'Koramangala 80ft Rd', lat: 12.9352, lng: 77.6245, desc: '80 Feet Road, Koramangala 4th Block' },
  { name: 'Whitefield EPIP Main Rd', lat: 12.9784, lng: 77.7289, desc: 'EPIP Zone, Whitefield' },
  { name: 'Malleshwaram 8th Cross', lat: 13.0076, lng: 77.5713, desc: '8th Cross Road, Malleshwaram' },
  { name: 'Hebbal Flyover Corridor', lat: 13.0358, lng: 77.5970, desc: 'Bellary Road, Hebbal' },
  { name: 'Peenya Industrial 1st Stage', lat: 13.0285, lng: 77.5195, desc: '1st Stage Industrial Area, Peenya' },
  { name: 'MG Road / Brigade Rd', lat: 12.9756, lng: 77.6095, desc: 'MG Road Metro Station, Central' },
];

// Real-world Citizen Report Test Scenarios
const CITIZEN_SAMPLE_PRESETS = [
  {
    id: 'sample_tree_safe',
    label: 'Roadside Green Tree (False Alarm Test)',
    badge: 'Non-Hazard / Safe',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    description: 'Lush roadside shade tree and sidewalk green foliage near residential apartment complex. No smoke, flames, or unusual chemical odor observed.',
    streetPresetIndex: 0, // Indiranagar
    mediaType: 'image' as const,
    imagePlaceholder: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
        <rect width="400" height="300" fill="#0f172a"/>
        <rect x="0" y="240" width="400" height="60" fill="#14532d"/>
        <rect x="0" y="255" width="400" height="45" fill="#166534"/>
        <rect x="185" y="140" width="30" height="110" fill="#78350f" rx="3"/>
        <circle cx="200" cy="110" r="75" fill="#15803d" opacity="0.95"/>
        <circle cx="150" cy="120" r="55" fill="#16a34a" opacity="0.9"/>
        <circle cx="250" cy="120" r="55" fill="#16a34a" opacity="0.9"/>
        <circle cx="200" cy="70" r="50" fill="#22c55e" opacity="0.9"/>
        <circle cx="170" cy="95" r="40" fill="#4ade80" opacity="0.75"/>
        <circle cx="230" cy="95" r="40" fill="#4ade80" opacity="0.75"/>
        <rect x="15" y="15" width="370" height="46" fill="#020617" opacity="0.88" rx="6"/>
        <text x="25" y="33" fill="#4ade80" font-family="monospace" font-size="12" font-weight="bold">CITIZEN PHOTO: Roadside Shade Tree &amp; Foliage</text>
        <text x="25" y="48" fill="#94a3b8" font-family="monospace" font-size="10.5">Clean Botanical Photosynthesis • Zero Emission Hazard</text>
      </svg>
    `),
  },
  {
    id: 'sample_tea_stall',
    label: 'Tea Stall Kettle (Small-Time, Non-Spreading)',
    badge: 'Non-Spreading Micro',
    badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
    description: 'Roadside tea stall boiling kettle on small stove releasing gentle water vapor. Localized micro-steam dissipates in 3 meters; does not spread to neighborhood.',
    streetPresetIndex: 3, // Koramangala
    mediaType: 'image' as const,
    imagePlaceholder: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
        <rect width="400" height="300" fill="#0f172a"/>
        <rect x="100" y="210" width="200" height="60" fill="#334155" rx="4"/>
        <rect x="170" y="160" width="60" height="50" fill="#94a3b8" rx="8"/>
        <path d="M160 180 L145 170" stroke="#94a3b8" stroke-width="6" stroke-linecap="round"/>
        <path d="M200 140 Q200 120 220 120 Q240 120 240 140" stroke="#94a3b8" stroke-width="5" fill="none"/>
        <ellipse cx="140" cy="155" rx="8" ry="12" fill="#e2e8f0" opacity="0.7"/>
        <ellipse cx="132" cy="135" rx="12" ry="15" fill="#cbd5e1" opacity="0.4"/>
        <rect x="15" y="15" width="370" height="46" fill="#020617" opacity="0.88" rx="6"/>
        <text x="25" y="33" fill="#38bdf8" font-family="monospace" font-size="12" font-weight="bold">CITIZEN PHOTO: Roadside Tea Stall Kettle</text>
        <text x="25" y="48" fill="#94a3b8" font-family="monospace" font-size="10.5">Contained Micro-Activity • Lacks Buoyancy to Spread</text>
      </svg>
    `),
  },
  {
    id: 'sample_waste_burn',
    label: 'Open Garbage / Plastic Fire',
    badge: 'Real Hazard (Spreads)',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    description: 'Thick black smoke rising from open garbage heap burning near lake perimeter road with strong acrid plastic smell spreading to residential apartments.',
    streetPresetIndex: 1, // Bellandur
    mediaType: 'image' as const,
    imagePlaceholder: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
        <rect width="400" height="300" fill="#1e293b"/>
        <path d="M50 250 Q100 150 180 200 T300 240 Z" fill="#334155"/>
        <path d="M120 220 Q140 120 180 80 Q220 50 260 120 T290 220 Z" fill="#475569" opacity="0.9"/>
        <path d="M150 210 Q170 140 200 110 Q230 90 250 150 T270 210 Z" fill="#0f172a" opacity="0.95"/>
        <polygon points="170,230 190,190 210,230" fill="#f97316"/>
        <polygon points="180,230 195,180 205,230" fill="#eab308"/>
        <polygon points="188,230 198,195 202,230" fill="#ffffff"/>
        <text x="20" y="35" fill="#f87171" font-family="monospace" font-size="14" font-weight="bold">CITIZEN PHOTO: Open Garbage Combustion</text>
        <text x="20" y="55" fill="#94a3b8" font-family="monospace" font-size="11">Black Carbon Smoke &amp; Acrid VOC Plume</text>
      </svg>
    `),
  },
  {
    id: 'sample_construction_dust',
    label: 'Unpaved Road Construction Dust',
    badge: 'Real Hazard (Spreads)',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    description: 'Heavy earthmovers and unpaved excavation work causing continuous massive particulate dust storm across multiple traffic lanes without water suppression.',
    streetPresetIndex: 4, // Whitefield
    mediaType: 'image' as const,
    imagePlaceholder: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
        <rect width="400" height="300" fill="#1e293b"/>
        <ellipse cx="200" cy="180" rx="160" ry="70" fill="#78716c" opacity="0.6"/>
        <ellipse cx="220" cy="150" rx="120" ry="50" fill="#a8a29e" opacity="0.5"/>
        <rect x="130" y="190" width="70" height="35" fill="#eab308"/>
        <rect x="230" y="200" width="80" height="30" fill="#64748b"/>
        <text x="20" y="35" fill="#fbbf24" font-family="monospace" font-size="14" font-weight="bold">CITIZEN PHOTO: Fugitive Construction Dust</text>
        <text x="20" y="55" fill="#94a3b8" font-family="monospace" font-size="11">Dense Coarse PM10 Mineral Suspensions</text>
      </svg>
    `),
  },
  {
    id: 'sample_diesel_traffic',
    label: 'Diesel Bottleneck Congestion',
    badge: 'Real Hazard (Spreads)',
    badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    description: 'Heavy diesel trucks and private buses idling in bottleneck gridlock emitting thick blue-black exhaust fumes into surrounding street canyon.',
    streetPresetIndex: 2, // Silk Board
    mediaType: 'image' as const,
    imagePlaceholder: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
        <rect width="400" height="300" fill="#0f172a"/>
        <rect x="40" y="180" width="100" height="60" fill="#dc2626" rx="4"/>
        <rect x="170" y="170" width="110" height="70" fill="#2563eb" rx="4"/>
        <rect x="300" y="185" width="80" height="55" fill="#16a34a" rx="4"/>
        <ellipse cx="140" cy="170" rx="50" ry="30" fill="#475569" opacity="0.8"/>
        <ellipse cx="280" cy="160" rx="60" ry="35" fill="#334155" opacity="0.85"/>
        <text x="20" y="35" fill="#fb923c" font-family="monospace" font-size="14" font-weight="bold">CITIZEN PHOTO: Heavy Diesel Exhaust Gridlock</text>
        <text x="20" y="55" fill="#94a3b8" font-family="monospace" font-size="11">Elevated NOx, CO &amp; Fine Carbon Particulates</text>
      </svg>
    `),
  },
  {
    id: 'sample_steam_safe',
    label: 'Cooling Tower Steam (False Alarm)',
    badge: 'Non-Hazard / Safe',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    description: 'Citizen reported white cloud coming out from tech park rooftop. Visual verification reveals it is pure clean boiler steam/cooling condensation.',
    streetPresetIndex: 0, // Indiranagar
    mediaType: 'image' as const,
    imagePlaceholder: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
        <rect width="400" height="300" fill="#0f172a"/>
        <rect x="140" y="160" width="120" height="120" fill="#334155"/>
        <ellipse cx="200" cy="120" rx="55" ry="35" fill="#ffffff" opacity="0.8"/>
        <ellipse cx="220" cy="80" rx="45" ry="30" fill="#ffffff" opacity="0.5"/>
        <ellipse cx="240" cy="45" rx="35" ry="20" fill="#ffffff" opacity="0.25"/>
        <text x="20" y="35" fill="#34d399" font-family="monospace" font-size="14" font-weight="bold">CITIZEN PHOTO: Non-Hazardous Steam Plume</text>
        <text x="20" y="55" fill="#94a3b8" font-family="monospace" font-size="11">Clean Condensation; Zero Particulate Surge</text>
      </svg>
    `),
  },
];

// Dark Map Style for Bengaluru Map
const BENGALURU_DARK_MAP_STYLE: google.maps.MapTypeStyle[] = [
  { elementType: 'geometry', stylers: [{ color: '#090d16' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#090d16' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#94a3b8' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#38bdf8' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#64748b' }],
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
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#cbd5e1' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#0369a1' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#082f49' }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#1e293b' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#020617' }],
  },
];

// Helper to overlay dynamic Plume Cone and connection lines directly onto Google Map
const MapPlumeAndConnectionsOverlay: React.FC<{
  pinLat: number;
  pinLng: number;
  interpolation: BengaluruInterpolation | null;
  verification: CitizenReportVerification | null;
}> = ({ pinLat, pinLng, interpolation, verification }) => {
  const map = useMap();
  const plumePolygonRef = useRef<google.maps.Polygon | null>(null);
  const connectionLinesRef = useRef<google.maps.Polyline[]>([]);

  // Draw Connection Lines to contributing stations
  useEffect(() => {
    if (!map) return;

    // Clear previous lines
    connectionLinesRef.current.forEach((line) => line.setMap(null));
    connectionLinesRef.current = [];

    if (interpolation && interpolation.nearby_stations) {
      const pinLatLng = new google.maps.LatLng(pinLat, pinLng);
      // Create subtle dashed lines
      interpolation.nearby_stations.forEach((st) => {
        // We need station coordinates: let's query from stations or approximation
        // The endpoint returns nearby_stations with station_id
        // We will store lines if station coordinates are available
      });
    }

    return () => {
      connectionLinesRef.current.forEach((line) => line.setMap(null));
      connectionLinesRef.current = [];
    };
  }, [map, pinLat, pinLng, interpolation]);

  // Draw Downwind Dispersion Plume Cone when report is verified
  useEffect(() => {
    if (!map) return;

    if (plumePolygonRef.current) {
      plumePolygonRef.current.setMap(null);
      plumePolygonRef.current = null;
    }

    if (verification && verification.is_real_hazard && verification.downwind_dispersion) {
      const { plume_bearing_deg, dispersion_angle_deg, max_reach_km } = verification.downwind_dispersion;
      const reachKm = Math.max(1.2, max_reach_km || 2.5);
      const halfAngle = (dispersion_angle_deg || 35) / 2;

      const origin = new google.maps.LatLng(pinLat, pinLng);

      // Generate polygon vertices for the plume cone
      const coords: google.maps.LatLngLiteral[] = [{ lat: pinLat, lng: pinLng }];
      const steps = 16;
      for (let i = 0; i <= steps; i++) {
        const angleDeg = plume_bearing_deg - halfAngle + (i / steps) * (halfAngle * 2);
        const rad = (angleDeg * Math.PI) / 180;
        // 1 deg lat = 110.574 km, 1 deg lng = 111.320 * cos(lat) km
        const dLat = (reachKm * Math.cos(rad)) / 110.574;
        const dLng = (reachKm * Math.sin(rad)) / (111.32 * Math.cos((pinLat * Math.PI) / 180));
        coords.push({ lat: pinLat + dLat, lng: pinLng + dLng });
      }

      // Close polygon
      coords.push({ lat: pinLat, lng: pinLng });

      const severityColor =
        verification.severity_level === 'Severe / Critical'
          ? '#e11d48'
          : verification.severity_level === 'High'
          ? '#ea580c'
          : '#d97706';

      plumePolygonRef.current = new google.maps.Polygon({
        paths: coords,
        strokeColor: severityColor,
        strokeOpacity: 0.85,
        strokeWeight: 2,
        fillColor: severityColor,
        fillOpacity: 0.28,
        map,
        zIndex: 5,
      });

      // Pan to frame both pin and plume
      const bounds = new google.maps.LatLngBounds();
      coords.forEach((c) => bounds.extend(c));
      map.fitBounds(bounds, { top: 60, right: 60, bottom: 60, left: 60 });
    }

    return () => {
      if (plumePolygonRef.current) {
        plumePolygonRef.current.setMap(null);
        plumePolygonRef.current = null;
      }
    };
  }, [map, pinLat, pinLng, verification]);

  return null;
};

// Map Click Listener subcomponent to capture any street coordinate in Bengaluru
const MapClickListener: React.FC<{
  onMapClick: (lat: number, lng: number) => void;
}> = ({ onMapClick }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    const listener = map.addListener('click', (e: google.maps.MapMouseEvent) => {
      if (e.latLng) {
        onMapClick(e.latLng.lat(), e.latLng.lng());
      }
    });

    return () => {
      google.maps.event.removeListener(listener);
    };
  }, [map, onMapClick]);

  return null;
};

interface BengaluruCitizenMapProps {
  onBackToMainMap: () => void;
}

export const BengaluruCitizenMap: React.FC<BengaluruCitizenMapProps> = ({ onBackToMainMap }) => {
  // Pinpoint Coordinates (Default: Indiranagar 100ft Road)
  const [pinLat, setPinLat] = useState<number>(12.9719);
  const [pinLng, setPinLng] = useState<number>(77.6412);
  const [streetAddress, setStreetAddress] = useState<string>('100 Feet Road, Indiranagar, Bengaluru');
  const [isGeocoding, setIsGeocoding] = useState<boolean>(false);

  // Bengaluru Stations & Ground Interpolation
  const [bengaluruStations, setBengaluruStations] = useState<StationAQI[]>([]);
  const [interpolation, setInterpolation] = useState<BengaluruInterpolation | null>(null);
  const [isLoadingInterpolation, setIsLoadingInterpolation] = useState<boolean>(false);

  // Citizen Report Form & Media Upload
  const [streetSearchText, setStreetSearchText] = useState<string>('');
  const [isSearchingStreet, setIsSearchingStreet] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);

  const [userDescription, setUserDescription] = useState<string>(
    'Thick black smoke rising from open garbage heap burning near lake perimeter road with strong acrid plastic smell spreading to residential apartments.'
  );
  const [mediaFile, setMediaFile] = useState<{
    dataUrl: string;
    type: 'image' | 'video';
    name: string;
  } | null>({
    dataUrl: CITIZEN_SAMPLE_PRESETS[0].imagePlaceholder,
    type: 'image',
    name: 'citizen_garbage_smoke.jpg',
  });

  // Multimodal Verification Results
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verificationResult, setVerificationResult] = useState<CitizenReportVerification | null>(null);
  const [activeTab, setActiveTab] = useState<'report_form' | 'verification_result'>('report_form');
  const [showPinpointPopup, setShowPinpointPopup] = useState<boolean>(true);

  // Pinpoint 24-Hour Forecasting States (Uses same forecasting code as main map)
  const [isForecastOpen, setIsForecastOpen] = useState<boolean>(false);
  const [forecastTarget, setForecastTarget] = useState<string>('AQI');

  // Compute effective AQI (reflects verified hazard elevation)
  const effectiveAqi = useMemo(() => {
    if (verificationResult?.is_real_hazard && verificationResult?.predicted_aqi) {
      return verificationResult.predicted_aqi;
    }
    return interpolation?.aqi ?? 65;
  }, [verificationResult, interpolation]);

  // Compute effective AQI category
  const effectiveCategory = useMemo(() => {
    if (verificationResult?.is_real_hazard && verificationResult?.predicted_category) {
      return verificationResult.predicted_category;
    }
    return interpolation?.aqi_category ?? 'Satisfactory';
  }, [verificationResult, interpolation]);

  // Dynamic color tier scale for pinpoint location marker and badges
  const pinTier = useMemo(() => {
    const aqi = effectiveAqi;
    if (aqi <= 50) return { bg: '#10b981', border: '#059669', badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40', text: '#10b981', label: 'Good' };
    if (aqi <= 100) return { bg: '#84cc16', border: '#65a30d', badgeBg: 'bg-lime-500/20 text-lime-300 border-lime-500/40', text: '#84cc16', label: 'Satisfactory' };
    if (aqi <= 200) return { bg: '#eab308', border: '#ca8a04', badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40', text: '#eab308', label: 'Moderate' };
    if (aqi <= 300) return { bg: '#f97316', border: '#ea580c', badgeBg: 'bg-orange-500/20 text-orange-300 border-orange-500/40', text: '#f97316', label: 'Poor' };
    if (aqi <= 400) return { bg: '#ef4444', border: '#dc2626', badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/40', text: '#ef4444', label: 'Very Poor' };
    return { bg: '#7f1d1d', border: '#991b1b', badgeBg: 'bg-red-950/60 text-red-200 border-red-700/60', text: '#dc2626', label: 'Severe' };
  }, [effectiveAqi]);

  // 6 Criteria Pollutants displaying baseline vs post-incident updated level changes
  const activePollutants = useMemo(() => {
    const base = interpolation?.pollutants || { pm25: 45, pm10: 85, no2: 32, so2: 12, co: 0.85, o3: 28 };
    if (!verificationResult || !verificationResult.pollutant_impacts) {
      return {
        pm25: { current: base.pm25, baseline: base.pm25, delta: 0, unit: 'µg/m³', isSurged: false },
        pm10: { current: base.pm10, baseline: base.pm10, delta: 0, unit: 'µg/m³', isSurged: false },
        no2: { current: base.no2, baseline: base.no2, delta: 0, unit: 'µg/m³', isSurged: false },
        so2: { current: base.so2, baseline: base.so2, delta: 0, unit: 'µg/m³', isSurged: false },
        co: { current: base.co, baseline: base.co, delta: 0, unit: 'mg/m³', isSurged: false },
        o3: { current: base.o3, baseline: base.o3, delta: 0, unit: 'µg/m³', isSurged: false },
      };
    }

    const impacts = verificationResult.pollutant_impacts;
    return {
      pm25: {
        current: impacts.pm25?.predicted ?? base.pm25,
        baseline: impacts.pm25?.baseline ?? base.pm25,
        delta: impacts.pm25?.delta ?? 0,
        unit: impacts.pm25?.unit || 'µg/m³',
        isSurged: (impacts.pm25?.delta ?? 0) > 0,
      },
      pm10: {
        current: impacts.pm10?.predicted ?? base.pm10,
        baseline: impacts.pm10?.baseline ?? base.pm10,
        delta: impacts.pm10?.delta ?? 0,
        unit: impacts.pm10?.unit || 'µg/m³',
        isSurged: (impacts.pm10?.delta ?? 0) > 0,
      },
      no2: {
        current: impacts.no2?.predicted ?? base.no2,
        baseline: impacts.no2?.baseline ?? base.no2,
        delta: impacts.no2?.delta ?? 0,
        unit: impacts.no2?.unit || 'µg/m³',
        isSurged: (impacts.no2?.delta ?? 0) > 0,
      },
      so2: {
        current: impacts.so2?.predicted ?? base.so2,
        baseline: impacts.so2?.baseline ?? base.so2,
        delta: impacts.so2?.delta ?? 0,
        unit: impacts.so2?.unit || 'µg/m³',
        isSurged: (impacts.so2?.delta ?? 0) > 0,
      },
      co: {
        current: impacts.co?.predicted ?? base.co,
        baseline: impacts.co?.baseline ?? base.co,
        delta: impacts.co?.delta ?? 0,
        unit: impacts.co?.unit || 'mg/m³',
        isSurged: (impacts.co?.delta ?? 0) > 0,
      },
      o3: {
        current: impacts.o3?.predicted ?? base.o3,
        baseline: impacts.o3?.baseline ?? base.o3,
        delta: impacts.o3?.delta ?? 0,
        unit: impacts.o3?.unit || 'µg/m³',
        isSurged: (impacts.o3?.delta ?? 0) > 0,
      },
    };
  }, [interpolation, verificationResult]);

  // Convert interpolated pinpoint location into StationAQI object for ForecastModal
  const pinpointStationAsAQI: StationAQI | null = useMemo(() => {
    if (!interpolation) return null;
    return {
      station_id: `BLR_PINPOINT_${pinLat.toFixed(3)}_${pinLng.toFixed(3)}`,
      cpcb_site_id: `pinpoint_${pinLat.toFixed(3)}_${pinLng.toFixed(3)}`,
      station_name: streetAddress || `Pinpoint Location (${pinLat.toFixed(4)}, ${pinLng.toFixed(4)})`,
      city: 'Bengaluru',
      state: 'Karnataka',
      category: 'Pinpointed Street Telemetry',
      zone: 'South Zone',
      portal_link: 'https://airquality.cpcb.gov.in/ccr/#/all-india-aqi-portal',
      lat: pinLat,
      lng: pinLng,
      aqi: effectiveAqi,
      aqi_category: effectiveCategory as any,
      category_color: pinTier.bg,
      category_bg: `${pinTier.bg}22`,
      dominant_pollutant: interpolation.dominant_pollutant,
      sub_indices: interpolation.sub_indices,
      pm25: activePollutants.pm25.current,
      pm10: activePollutants.pm10.current,
      no2: activePollutants.no2.current,
      so2: activePollutants.so2.current,
      co: activePollutants.co.current,
      o3: activePollutants.o3.current,
      temperature_c: interpolation.weather.temperature_c,
      relative_humidity_pct: interpolation.weather.relative_humidity_pct,
      wind_speed_mps: interpolation.weather.wind_speed_mps,
      wind_direction_deg: interpolation.weather.wind_direction_deg,
      wind_direction_cardinal: interpolation.weather.wind_direction_cardinal,
      solar_radiation_wm2: interpolation.weather.solar_radiation_wm2,
      barometric_pressure_hpa: interpolation.weather.barometric_pressure_hpa,
      rainfall_mm: interpolation.weather.rainfall_mm,
      aerosol_optical_depth: interpolation.weather.aerosol_optical_depth,
      status: verificationResult?.is_real_hazard ? 'Post-Incident Elevated Telemetry' : 'Live Pinpoint Telemetry',
      last_updated: new Date().toISOString(),
    };
  }, [interpolation, pinLat, pinLng, streetAddress, effectiveAqi, effectiveCategory, pinTier, activePollutants, verificationResult]);

  const apiKey = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string) || '';

  // 1. Fetch all Bengaluru Ground Monitoring Stations
  useEffect(() => {
    fetch('/api/bengaluru/stations')
      .then((res) => res.json())
      .then((data) => {
        if (data.stations) {
          setBengaluruStations(data.stations);
        }
      })
      .catch((err) => console.error('Failed to fetch Bengaluru stations:', err));
  }, []);

  // 2. Fetch Street-Level Ground Monitoring Station Interpolation
  const fetchInterpolation = useCallback(async (lat: number, lng: number, street: string) => {
    setIsLoadingInterpolation(true);
    try {
      const res = await fetch(`/api/bengaluru/interpolate?lat=${lat}&lng=${lng}&street=${encodeURIComponent(street)}`);
      const data: BengaluruInterpolation = await res.json();
      setInterpolation(data);
    } catch (err) {
      console.error('Failed to interpolate Bengaluru telemetry:', err);
    } finally {
      setIsLoadingInterpolation(false);
    }
  }, []);

  // Trigger interpolation when pin moves
  useEffect(() => {
    fetchInterpolation(pinLat, pinLng, streetAddress);
  }, [pinLat, pinLng, streetAddress, fetchInterpolation]);

  // Reverse Geocode when user clicks on a new map location
  const handleMapPinpoint = useCallback(
    (lat: number, lng: number) => {
      setPinLat(lat);
      setPinLng(lng);
      setVerificationResult(null); // Reset verification on new pinpoint
      setActiveTab('report_form');
      setShowPinpointPopup(true);
      setIsGeocoding(true);

      if (window.google && window.google.maps) {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: { lat, lng } }, (results, status) => {
          setIsGeocoding(false);
          if (status === 'OK' && results && results[0]) {
            const formatted = results[0].formatted_address;
            setStreetAddress(formatted);
          } else {
            setStreetAddress(`Street Location (${lat.toFixed(4)}, ${lng.toFixed(4)}), Bengaluru`);
          }
        });
      } else {
        setIsGeocoding(false);
        setStreetAddress(`Street Location (${lat.toFixed(4)}, ${lng.toFixed(4)}), Bengaluru`);
      }
    },
    []
  );

  // Quick preset selector
  const handleSelectPreset = (preset: (typeof BENGALURU_STREET_PRESETS)[0]) => {
    handleMapPinpoint(preset.lat, preset.lng);
  };

  // Sample report selector
  const handleSelectSampleReport = (sample: (typeof CITIZEN_SAMPLE_PRESETS)[0]) => {
    const street = BENGALURU_STREET_PRESETS[sample.streetPresetIndex];
    handleMapPinpoint(street.lat, street.lng);
    setUserDescription(sample.description);
    setMediaFile({
      dataUrl: sample.imagePlaceholder,
      type: sample.mediaType,
      name: `${sample.id}.jpg`,
    });
    setVerificationResult(null);
  };

  // Street Search Geocoding within Bengaluru City
  const handleSearchStreet = useCallback(
    (customQuery?: string) => {
      const q = (customQuery !== undefined ? customQuery : streetSearchText).trim();
      if (!q) return;

      setIsSearchingStreet(true);
      setSearchError(null);

      if (window.google && window.google.maps) {
        const geocoder = new google.maps.Geocoder();
        const addressToSearch = q.toLowerCase().includes('bengaluru') || q.toLowerCase().includes('bangalore')
          ? q
          : `${q}, Bengaluru, Karnataka, India`;

        geocoder.geocode(
          {
            address: addressToSearch,
            bounds: {
              north: 13.25,
              south: 12.75,
              east: 77.85,
              west: 77.35,
            },
          },
          (results, status) => {
            setIsSearchingStreet(false);
            if (status === 'OK' && results && results[0]) {
              const loc = results[0].geometry.location;
              handleMapPinpoint(loc.lat(), loc.lng());
              setStreetAddress(results[0].formatted_address);
              setSearchError(null);
            } else {
              setSearchError(`Could not find "${q}" in Bengaluru. Try another street or junction.`);
            }
          }
        );
      } else {
        setIsSearchingStreet(false);
        setSearchError('Google Geocoding Service currently unavailable.');
      }
    },
    [streetSearchText, handleMapPinpoint]
  );

  // File upload handler (Supports Image & Video with automated keyframe extraction)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isVideo = file.type.startsWith('video/');

    if (isVideo) {
      const videoUrl = URL.createObjectURL(file);
      setVideoPreviewUrl(videoUrl);

      // Create video element in memory to capture a keyframe for Gemini Multimodal
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.src = videoUrl;
      video.muted = true;
      video.playsInline = true;

      video.onloadeddata = () => {
        video.currentTime = Math.min(1.0, (video.duration || 1) / 2);
      };

      video.onseeked = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = Math.min(800, video.videoWidth || 640);
          canvas.height = Math.min(600, video.videoHeight || 480);
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const frameDataUrl = canvas.toDataURL('image/jpeg', 0.85);
            setMediaFile({
              dataUrl: frameDataUrl,
              type: 'video',
              name: file.name,
            });
          }
        } catch (captureErr) {
          console.warn('Canvas video frame extraction warning:', captureErr);
          // Fallback to reading file directly
          const reader = new FileReader();
          reader.onload = (event) => {
            setMediaFile({
              dataUrl: event.target?.result as string,
              type: 'video',
              name: file.name,
            });
          };
          reader.readAsDataURL(file);
        }
      };
    } else {
      setVideoPreviewUrl(null);
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setMediaFile({
          dataUrl,
          type: 'image',
          name: file.name,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // 3. Dispatch Multimodal Verification Agent
  const handleRunVerification = async () => {
    if (!userDescription.trim()) return;
    setIsVerifying(true);

    try {
      const payload = {
        image: mediaFile?.dataUrl || undefined,
        mediaType: mediaFile?.type || 'image',
        description: userDescription,
        lat: pinLat,
        lng: pinLng,
        streetAddress,
        baselinePollutants: interpolation?.pollutants || { pm25: 45, pm10: 85, no2: 32, so2: 12, co: 0.85, o3: 28 },
        weatherData: interpolation?.weather || {
          temperature_c: 28,
          relative_humidity_pct: 60,
          wind_speed_mps: 3.2,
          wind_direction_deg: 240,
          wind_direction_cardinal: 'WSW',
          barometric_pressure_hpa: 918,
        },
        contributingStations: interpolation?.nearby_stations || [],
      };

      const res = await fetch('/api/bengaluru/verify-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data: CitizenReportVerification = await res.json();
      setVerificationResult(data);
      setActiveTab('verification_result');
    } catch (err) {
      console.error('Failed to run verification agent:', err);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Banner & Mode Switcher Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-sky-500 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-sky-950/40">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-mono text-[11px] font-bold border border-sky-500/30">
                Bengaluru Street-Level Telemetry
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[11px] font-semibold border border-emerald-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Multimodal Verification Agent
              </span>
            </div>
            <h2 className="text-base md:text-lg font-black text-white tracking-tight mt-0.5">
              Bengaluru Citizen Telemetry &amp; Multimodal Hazard Verifier
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 self-stretch md:self-auto justify-between md:justify-end">
          <button
            onClick={onBackToMainMap}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 shadow transition cursor-pointer"
          >
            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            <span>Switch to All-India Map</span>
          </button>
        </div>
      </div>

      {/* Street Search Bar & Quick-Jump Presets */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 shadow-xl space-y-2.5">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-sky-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={streetSearchText}
              onChange={(e) => {
                setStreetSearchText(e.target.value);
                setSearchError(null);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSearchStreet();
                }
              }}
              placeholder="Search street name or locality name in Bengaluru city..."
              className="w-full bg-slate-950 border border-slate-700/80 focus:border-sky-500 rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition font-sans"
            />
            {streetSearchText && (
              <button
                onClick={() => setStreetSearchText('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            onClick={() => handleSearchStreet()}
            disabled={isSearchingStreet || !streetSearchText.trim()}
            className="px-4 py-2 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-md shadow-sky-950/40 flex items-center justify-center gap-1.5 transition shrink-0 cursor-pointer"
          >
            {isSearchingStreet ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Geocoding...</span>
              </>
            ) : (
              <>
                <Search className="w-3.5 h-3.5" />
                <span>Pinpoint Street</span>
              </>
            )}
          </button>
        </div>

        {searchError && (
          <div className="text-[11px] text-rose-400 bg-rose-950/40 border border-rose-800/50 rounded-lg px-2.5 py-1">
            {searchError}
          </div>
        )}

        {/* Street Quick-Jump Presets Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-thin pt-1">
          <span className="text-[11px] font-semibold text-slate-400 shrink-0 flex items-center gap-1 mr-1">
            <Navigation className="w-3 h-3 text-sky-400" />
            Key Arteries:
          </span>
          {BENGALURU_STREET_PRESETS.map((pst, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectPreset(pst)}
              className={`px-2 py-1 rounded-lg text-[11px] font-medium shrink-0 transition flex items-center gap-1 ${
                streetAddress.includes(pst.name)
                  ? 'bg-sky-600 text-white shadow'
                  : 'bg-slate-950 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
              }`}
            >
              <MapPin className="w-2.5 h-2.5 text-sky-400" />
              <span>{pst.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Google Map (Left) + Citizen Agent Panel (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* Left Column: Interactive Bengaluru Google Map (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative h-[560px] flex flex-col">
            {/* Map Top Bar */}
            <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs text-slate-300 z-10">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-500 animate-bounce" />
                <span className="font-semibold text-white truncate max-w-[280px]">
                  {isGeocoding ? 'Reverse geocoding street...' : streetAddress}
                </span>
              </div>
              <div className="text-[11px] font-mono text-slate-400 hidden sm:block">
                Lat: {pinLat.toFixed(4)}, Lng: {pinLng.toFixed(4)}
              </div>
            </div>

            {/* Google Map Viewport */}
            <div className="relative flex-1 w-full">
              <APIProvider apiKey={apiKey}>
                <Map
                  defaultCenter={BENGALURU_CENTER}
                  defaultZoom={13}
                  mapId="bengaluru_citizen_map"
                  className="w-full h-full"
                  styles={BENGALURU_DARK_MAP_STYLE}
                  gestureHandling="greedy"
                  disableDefaultUI={false}
                >
                  {/* Click Listener to drop pin anywhere in Bengaluru */}
                  <MapClickListener onMapClick={handleMapPinpoint} />

                  {/* Pinpoint User Location Beacon with dynamic AQI Tier color and floating badge */}
                  <AdvancedMarker
                    position={{ lat: pinLat, lng: pinLng }}
                    draggable={true}
                    onClick={() => setShowPinpointPopup((prev) => !prev)}
                    onDragEnd={(e) => {
                      if (e.latLng) {
                        handleMapPinpoint(e.latLng.lat(), e.latLng.lng());
                      }
                    }}
                  >
                    <div className="relative flex flex-col items-center justify-center cursor-pointer group">
                      {/* Floating AQI Badge pill right above the pin */}
                      <div
                        className="mb-1 px-3 py-1 rounded-full text-xs font-black font-mono shadow-2xl border-2 border-white text-white whitespace-nowrap animate-bounce flex items-center gap-1.5 z-20"
                        style={{ backgroundColor: pinTier.bg }}
                        title={`Pinpointed AQI: ${effectiveAqi} (${effectiveCategory}) • Click to toggle telemetry popup`}
                      >
                        <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                        <span>AQI {effectiveAqi} • {effectiveCategory}</span>
                        {verificationResult?.is_real_hazard && <span className="text-xs">🔥</span>}
                      </div>

                      <div className="relative flex items-center justify-center">
                        <div
                          className="w-12 h-12 rounded-full animate-ping absolute opacity-60"
                          style={{ backgroundColor: pinTier.bg }}
                        />
                        <div
                          className="w-9 h-9 rounded-full border-2 border-white shadow-2xl flex items-center justify-center text-white z-10 transition-transform group-hover:scale-125"
                          style={{ backgroundColor: pinTier.bg }}
                        >
                          <MapPin className="w-5 h-5 text-white drop-shadow" />
                        </div>
                      </div>
                    </div>
                  </AdvancedMarker>

                  {/* 20 Bengaluru Ground Monitoring Stations */}
                  {bengaluruStations.map((st) => {
                    const isNearby = interpolation?.nearby_stations.some((ns) => ns.station_id === st.station_id);
                    return (
                      <AdvancedMarker
                        key={st.station_id}
                        position={{ lat: st.lat, lng: st.lng }}
                        onClick={() => {
                          handleMapPinpoint(st.lat, st.lng);
                        }}
                      >
                        <div
                          className={`p-1 rounded-full border shadow-md transition-transform hover:scale-125 ${
                            isNearby
                              ? 'bg-emerald-500 border-white ring-2 ring-emerald-400'
                              : 'bg-slate-800 border-slate-600 opacity-80'
                          }`}
                          title={`${st.station_name} • AQI: ${st.aqi} (${st.aqi_category})`}
                        >
                          <Radio className="w-3.5 h-3.5 text-white" />
                        </div>
                      </AdvancedMarker>
                    );
                  })}

                  {/* Downwind Plume Polygon & Connections */}
                  <MapPlumeAndConnectionsOverlay
                    pinLat={pinLat}
                    pinLng={pinLng}
                    interpolation={interpolation}
                    verification={verificationResult}
                  />
                </Map>
              </APIProvider>

              {/* CPCB NAQI Tier Scale at Bottom-Left (matching main map) */}
              <div className="absolute bottom-3 left-3 z-10 bg-slate-950/90 backdrop-blur-md p-2.5 rounded-xl border border-slate-800/90 shadow-2xl text-[11px] flex flex-col gap-1.5 max-w-[260px] pointer-events-auto">
                <div className="flex items-center justify-between text-slate-300 font-semibold border-b border-slate-800/70 pb-1">
                  <span>CPCB NAQI Tier Scale</span>
                  <span className="text-[10px] text-slate-500 font-normal">Live Ground Scale</span>
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

              {/* Map Floating Helper HUD at Bottom-Right */}
              <div className="absolute bottom-3 right-3 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-xl px-3 py-2 text-[11px] text-slate-300 shadow-xl flex items-center gap-2.5 z-10 hidden sm:flex pointer-events-auto">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: pinTier.bg }} />
                  <span>Pinpoint ({effectiveCategory})</span>
                </div>
                <span className="text-slate-700">•</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span>CAAQMS Sensor</span>
                </div>
                <span className="text-slate-700">•</span>
                <span className="text-slate-400">Click street to move pin</span>
              </div>

              {/* Pinpoint Telemetry & Weather Popup Overlay (like main map) */}
              {showPinpointPopup && interpolation && (
                <div className="absolute top-3 right-3 z-20 w-[350px] max-w-[calc(100%-24px)] bg-slate-950/95 backdrop-blur-md border border-slate-700/80 rounded-2xl shadow-2xl p-3.5 flex flex-col gap-2.5 pointer-events-auto max-h-[510px] overflow-y-auto scrollbar-thin text-xs text-slate-200">
                  {/* Top Location & Close Bar */}
                  <div className="flex items-start justify-between gap-2 border-b border-slate-800/80 pb-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        <h4 className="font-bold text-white text-xs truncate" title={streetAddress}>
                          {streetAddress}
                        </h4>
                      </div>
                      <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                        Lat: {pinLat.toFixed(4)}, Lng: {pinLng.toFixed(4)} • Bengaluru
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <div
                        className="px-2 py-0.5 rounded-lg text-right border"
                        style={{
                          backgroundColor: `${pinTier.bg}20`,
                          borderColor: pinTier.bg,
                        }}
                      >
                        <span className="text-sm font-black font-mono block leading-tight" style={{ color: pinTier.bg }}>
                          {effectiveAqi}
                        </span>
                        <span className="text-[8px] uppercase font-bold text-slate-300 block">
                          {effectiveCategory}
                        </span>
                      </div>
                      <button
                        onClick={() => setShowPinpointPopup(false)}
                        className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                        title="Dismiss popup"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Incident Alert Banner (if verified) */}
                  {verificationResult && (
                    <div
                      className={`p-2 rounded-xl border text-[11px] flex items-center justify-between gap-2 ${
                        verificationResult.is_real_hazard
                          ? 'bg-rose-950/50 border-rose-800/60 text-rose-200'
                          : 'bg-emerald-950/50 border-emerald-800/60 text-emerald-200'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 truncate">
                        {verificationResult.is_real_hazard ? (
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 animate-pulse" />
                        ) : (
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        )}
                        <span className="font-bold truncate">
                          {verificationResult.is_real_hazard ? 'Real Hazard Verified' : 'Safe / Non-Hazard'}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-black/40 shrink-0">
                        {verificationResult.is_real_hazard
                          ? `AQI: ${interpolation.aqi} ➔ ${effectiveAqi}`
                          : 'Baseline Intact'}
                      </span>
                    </div>
                  )}

                  {/* 6 Criteria Pollutants Grid */}
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Activity className="w-3 h-3 text-cyan-400" />
                        Criteria Pollutants (Live Telemetry)
                      </span>
                      {verificationResult?.is_real_hazard && (
                        <span className="text-[9px] text-rose-400 font-bold">Surge Active</span>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-1.5 text-center font-mono">
                      {/* PM2.5 */}
                      <div className={`p-1.5 rounded-lg border ${activePollutants.pm25.isSurged ? 'bg-rose-950/30 border-rose-700/60' : 'bg-slate-900 border-slate-800'}`}>
                        <div className="text-[9px] text-slate-400">PM2.5</div>
                        <div className={`text-xs font-black ${activePollutants.pm25.isSurged ? 'text-rose-400' : 'text-white'}`}>
                          {activePollutants.pm25.current}
                        </div>
                        <div className="text-[8px] text-slate-500">
                          {activePollutants.pm25.isSurged ? `+${activePollutants.pm25.delta}` : 'µg/m³'}
                        </div>
                      </div>

                      {/* PM10 */}
                      <div className={`p-1.5 rounded-lg border ${activePollutants.pm10.isSurged ? 'bg-rose-950/30 border-rose-700/60' : 'bg-slate-900 border-slate-800'}`}>
                        <div className="text-[9px] text-slate-400">PM10</div>
                        <div className={`text-xs font-black ${activePollutants.pm10.isSurged ? 'text-rose-400' : 'text-white'}`}>
                          {activePollutants.pm10.current}
                        </div>
                        <div className="text-[8px] text-slate-500">
                          {activePollutants.pm10.isSurged ? `+${activePollutants.pm10.delta}` : 'µg/m³'}
                        </div>
                      </div>

                      {/* NO2 */}
                      <div className={`p-1.5 rounded-lg border ${activePollutants.no2.isSurged ? 'bg-rose-950/30 border-rose-700/60' : 'bg-slate-900 border-slate-800'}`}>
                        <div className="text-[9px] text-slate-400">NO2</div>
                        <div className={`text-xs font-black ${activePollutants.no2.isSurged ? 'text-rose-400' : 'text-white'}`}>
                          {activePollutants.no2.current}
                        </div>
                        <div className="text-[8px] text-slate-500">
                          {activePollutants.no2.isSurged ? `+${activePollutants.no2.delta}` : 'µg/m³'}
                        </div>
                      </div>

                      {/* SO2 */}
                      <div className={`p-1.5 rounded-lg border ${activePollutants.so2.isSurged ? 'bg-rose-950/30 border-rose-700/60' : 'bg-slate-900 border-slate-800'}`}>
                        <div className="text-[9px] text-slate-400">SO2</div>
                        <div className={`text-xs font-black ${activePollutants.so2.isSurged ? 'text-rose-400' : 'text-white'}`}>
                          {activePollutants.so2.current}
                        </div>
                        <div className="text-[8px] text-slate-500">
                          {activePollutants.so2.isSurged ? `+${activePollutants.so2.delta}` : 'µg/m³'}
                        </div>
                      </div>

                      {/* CO */}
                      <div className={`p-1.5 rounded-lg border ${activePollutants.co.isSurged ? 'bg-rose-950/30 border-rose-700/60' : 'bg-slate-900 border-slate-800'}`}>
                        <div className="text-[9px] text-slate-400">CO</div>
                        <div className={`text-xs font-black ${activePollutants.co.isSurged ? 'text-rose-400' : 'text-white'}`}>
                          {activePollutants.co.current}
                        </div>
                        <div className="text-[8px] text-slate-500">
                          {activePollutants.co.isSurged ? `+${activePollutants.co.delta}` : 'mg/m³'}
                        </div>
                      </div>

                      {/* O3 */}
                      <div className={`p-1.5 rounded-lg border ${activePollutants.o3.isSurged ? 'bg-rose-950/30 border-rose-700/60' : 'bg-slate-900 border-slate-800'}`}>
                        <div className="text-[9px] text-slate-400">O3</div>
                        <div className={`text-xs font-black ${activePollutants.o3.isSurged ? 'text-rose-400' : 'text-white'}`}>
                          {activePollutants.o3.current}
                        </div>
                        <div className="text-[8px] text-slate-500">
                          {activePollutants.o3.isSurged ? `+${activePollutants.o3.delta}` : 'µg/m³'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 8 Meteorological Variables Grid */}
                  <div>
                    <div className="text-[10px] font-bold text-sky-400 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Thermometer className="w-3 h-3 text-sky-400" />
                        8 Meteorological Variables
                      </span>
                      <span className="text-[9px] text-slate-500 font-mono">CAAQMS / IMD</span>
                    </div>

                    <div className="grid grid-cols-2 gap-1 text-[10px]">
                      <div className="bg-slate-900/90 border border-slate-800 p-1.5 rounded-lg flex items-center justify-between">
                        <span className="text-slate-400 flex items-center gap-1">
                          <Thermometer className="w-3 h-3 text-amber-400" /> Temp:
                        </span>
                        <span className="font-bold text-white font-mono">{interpolation.weather.temperature_c}°C</span>
                      </div>
                      <div className="bg-slate-900/90 border border-slate-800 p-1.5 rounded-lg flex items-center justify-between">
                        <span className="text-slate-400 flex items-center gap-1">
                          <Droplets className="w-3 h-3 text-blue-400" /> Humidity:
                        </span>
                        <span className="font-bold text-white font-mono">{interpolation.weather.relative_humidity_pct}%</span>
                      </div>
                      <div className="bg-slate-900/90 border border-slate-800 p-1.5 rounded-lg flex items-center justify-between">
                        <span className="text-slate-400 flex items-center gap-1">
                          <Wind className="w-3 h-3 text-teal-400" /> Wind:
                        </span>
                        <span className="font-bold text-white font-mono">{interpolation.weather.wind_speed_mps} m/s</span>
                      </div>
                      <div className="bg-slate-900/90 border border-slate-800 p-1.5 rounded-lg flex items-center justify-between">
                        <span className="text-slate-400 flex items-center gap-1">
                          <Compass className="w-3 h-3 text-indigo-400" /> Wind Dir:
                        </span>
                        <span className="font-bold text-white font-mono">
                          {interpolation.weather.wind_direction_cardinal} ({interpolation.weather.wind_direction_deg}°)
                        </span>
                      </div>
                      <div className="bg-slate-900/90 border border-slate-800 p-1.5 rounded-lg flex items-center justify-between">
                        <span className="text-slate-400 flex items-center gap-1">
                          <Gauge className="w-3 h-3 text-slate-400" /> Pressure:
                        </span>
                        <span className="font-bold text-white font-mono">{interpolation.weather.barometric_pressure_hpa} hPa</span>
                      </div>
                      <div className="bg-slate-900/90 border border-slate-800 p-1.5 rounded-lg flex items-center justify-between">
                        <span className="text-slate-400 flex items-center gap-1">
                          <Sun className="w-3 h-3 text-amber-400" /> Solar:
                        </span>
                        <span className="font-bold text-white font-mono">{interpolation.weather.solar_radiation_wm2} W/m²</span>
                      </div>
                      <div className="bg-slate-900/90 border border-slate-800 p-1.5 rounded-lg flex items-center justify-between">
                        <span className="text-slate-400 flex items-center gap-1">
                          <CloudRain className="w-3 h-3 text-cyan-400" /> Rain:
                        </span>
                        <span className="font-bold text-white font-mono">{interpolation.weather.rainfall_mm} mm</span>
                      </div>
                      <div className="bg-slate-900/90 border border-slate-800 p-1.5 rounded-lg flex items-center justify-between">
                        <span className="text-slate-400 flex items-center gap-1">
                          <Eye className="w-3 h-3 text-purple-400" /> AOD:
                        </span>
                        <span className="font-bold text-purple-300 font-mono">{interpolation.weather.aerosol_optical_depth}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button: 24h AI Forecast for Pinpoint */}
                  <button
                    onClick={() => {
                      setForecastTarget('AQI');
                      setIsForecastOpen(true);
                    }}
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white text-xs font-bold shadow-md shadow-teal-950/40 transition cursor-pointer mt-1"
                  >
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>24h TimesFM AI Forecast for Pinpoint</span>
                    <Sparkles className="w-3 h-3 text-cyan-200 ml-auto" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Citizen Report Submission & Multimodal Verification Agent (Moved below Map on Left Side) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setActiveTab('report_form')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    activeTab === 'report_form'
                      ? 'bg-slate-800 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Citizen Report Form
                </button>
                <button
                  onClick={() => setActiveTab('verification_result')}
                  disabled={!verificationResult}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'verification_result'
                      ? 'bg-slate-800 text-cyan-300 shadow-sm'
                      : 'text-slate-500 hover:text-slate-300 disabled:opacity-40'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Multimodal Verification</span>
                </button>
              </div>

              {verificationResult && (
                <span
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide border flex items-center gap-1.5 ${
                    verificationResult.is_real_hazard
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-sm shadow-rose-950/40'
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${verificationResult.is_real_hazard ? 'bg-rose-400 animate-ping' : 'bg-emerald-400'}`} />
                  <span>{verificationResult.is_real_hazard ? 'Hazard Verified (+Surge)' : 'False Alarm (Normal)'}</span>
                </span>
              )}
            </div>

            {/* TAB 1: Report Submission Form */}
            {activeTab === 'report_form' && (
              <div className="space-y-4">
                {/* Sample Incident Presets (1-Click Test) */}
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-2">
                    <FileText className="w-3.5 h-3.5 text-emerald-400" />
                    Load Sample Citizen Incident:
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {CITIZEN_SAMPLE_PRESETS.map((sample) => (
                      <button
                        key={sample.id}
                        onClick={() => handleSelectSampleReport(sample)}
                        className="text-left p-2 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 transition group cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px] font-bold text-white group-hover:text-cyan-300">
                            {sample.label}
                          </span>
                        </div>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded border ${sample.badgeColor}`}>
                          {sample.badge}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Upload Image / Video Zone */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    Attach Incident Image / Video Frame:
                  </label>
                  {mediaFile ? (
                    <div className="relative rounded-xl border border-slate-700 overflow-hidden bg-slate-950 p-2.5 space-y-2">
                      <div className="flex items-center gap-3">
                        {mediaFile.type === 'image' ? (
                          <img
                            src={mediaFile.dataUrl}
                            alt="Citizen upload preview"
                            className="w-20 h-16 object-cover rounded-lg border border-slate-800 shrink-0"
                          />
                        ) : (
                          <img
                            src={mediaFile.dataUrl}
                            alt="Video Keyframe extracted"
                            className="w-20 h-16 object-cover rounded-lg border border-slate-800 shrink-0"
                          />
                        )}
                        <div className="flex-1 min-w-0 text-xs">
                          <div className="font-semibold text-white truncate">{mediaFile.name}</div>
                          <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-mono">
                            <Sparkles className="w-3 h-3" />
                            {mediaFile.type === 'video'
                              ? 'Video Keyframe extracted for Gemini Multimodal'
                              : 'Ready for Gemini Multimodal Analysis'}
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setMediaFile(null);
                            setVideoPreviewUrl(null);
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                          title="Remove media"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Inline Video Player for video files */}
                      {mediaFile.type === 'video' && videoPreviewUrl && (
                        <div className="border-t border-slate-800/80 pt-2">
                          <video
                            src={videoPreviewUrl}
                            controls
                            className="w-full max-h-36 rounded-lg bg-black object-contain shadow"
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    <label className="border-2 border-dashed border-slate-800 hover:border-slate-700 rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer bg-slate-950/60 hover:bg-slate-950 transition">
                      <Upload className="w-6 h-6 text-sky-400 mb-1" />
                      <span className="text-xs font-semibold text-slate-200">
                        Upload Incident Photo or Video
                      </span>
                      <span className="text-[10px] text-slate-500 mt-0.5">
                        JPEG, PNG, WebP or MP4 video clip
                      </span>
                      <input
                        type="file"
                        accept="image/*,video/*"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                    </label>
                  )}
                </div>

                {/* Description Textarea */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Citizen Description &amp; Visual Observation:
                  </label>
                  <textarea
                    rows={3}
                    value={userDescription}
                    onChange={(e) => setUserDescription(e.target.value)}
                    placeholder="Describe what you see: color of smoke, smell, fire, dust intensity, or vehicle tailpipe..."
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition resize-none font-sans"
                  />
                </div>

                {/* Run Verification Button */}
                <div className="pt-1">
                  <button
                    onClick={handleRunVerification}
                    disabled={isVerifying || !userDescription.trim()}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 disabled:opacity-50 text-white font-bold text-xs shadow-lg shadow-teal-950/50 flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    {isVerifying ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Verifying with Gemini Multimodal Agent...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Verify Hazard &amp; Predict 6-Pollutant Spread</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: Multimodal Verification & Dispersion Results */}
            {activeTab === 'verification_result' && verificationResult && (
              <div className="space-y-4 text-xs">
                {/* Top Status Card */}
                <div
                  className={`p-3.5 rounded-xl border ${
                    verificationResult.is_real_hazard
                      ? 'bg-rose-950/40 border-rose-800/60 text-rose-200'
                      : 'bg-emerald-950/40 border-emerald-800/60 text-emerald-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-black text-sm flex items-center gap-1.5">
                      {verificationResult.is_real_hazard ? (
                        <>
                          <AlertTriangle className="w-4 h-4 text-rose-400" />
                          <span>REAL ENVIRONMENTAL HAZARD VERIFIED</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                          <span>SAFE / NON-HAZARD (FALSE ALARM)</span>
                        </>
                      )}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-black/40 font-mono text-[10px] font-bold">
                      Confidence: {Math.round(verificationResult.confidence_score * 100)}%
                    </span>
                  </div>

                  <p className="text-xs leading-relaxed text-slate-300">
                    {verificationResult.verification_summary}
                  </p>

                  <div className="mt-2 text-[11px] text-slate-400 font-mono bg-black/30 p-2 rounded-lg">
                    <strong className="text-white">Visual Evidence:</strong> {verificationResult.visual_evidence}
                  </div>
                </div>

                {/* 6 Pollutants Impact Breakdown Table */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Impact on 6 Criteria Pollutants</span>
                    </span>
                    <span className="font-mono text-cyan-400 text-[11px]">Baseline → Surge → Predicted</span>
                  </div>

                  <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950 flex flex-col shadow-inner">
                    <div className="overflow-x-auto overflow-y-auto max-h-[340px] scrollbar-thin">
                      <table className="w-full text-left font-mono text-xs">
                        <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 sticky top-0 z-10 shadow-sm">
                          <tr>
                            <th className="py-2.5 px-3">Pollutant</th>
                            <th className="py-2.5 px-2 text-right">Baseline</th>
                            <th className="py-2.5 px-2 text-right text-rose-400">Delta (Δ)</th>
                            <th className="py-2.5 px-2 text-right text-cyan-300 font-bold">Predicted</th>
                            <th className="py-2.5 px-3 text-left font-sans hidden sm:table-cell">Chemistry Rationale</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/70">
                          {Object.entries(verificationResult.pollutant_impacts).map(([key, item]) => {
                            const polName = key.toUpperCase();
                            const isSurged = item.delta > 0;
                            return (
                              <tr key={key} className="hover:bg-slate-900/60 transition-colors">
                                <td className="py-3 px-3 font-bold text-white">
                                  <div className="flex items-center gap-2">
                                    <span
                                      className={`w-2 h-2 rounded-full ${
                                        isSurged ? 'bg-rose-500 animate-pulse' : 'bg-emerald-400'
                                      }`}
                                    />
                                    <span>{polName}</span>
                                  </div>
                                </td>
                                <td className="py-3 px-2 text-right text-slate-300">
                                  {item.baseline} <span className="text-[10px] text-slate-500">{item.unit}</span>
                                </td>
                                <td className={`py-3 px-2 text-right font-bold ${isSurged ? 'text-rose-400' : 'text-slate-500'}`}>
                                  {isSurged ? (
                                    <span className="px-1.5 py-0.5 rounded bg-rose-500/10 border border-rose-500/20 text-rose-300 text-[11px] font-black">
                                      +{item.delta}
                                    </span>
                                  ) : (
                                    '0.0'
                                  )}
                                </td>
                                <td className="py-3 px-2 text-right font-black text-cyan-300">
                                  {item.predicted} <span className="text-[10px] text-cyan-500/80">{item.unit}</span>
                                </td>
                                <td className="py-3 px-3 text-left font-sans text-[11px] text-slate-300 hidden sm:table-cell leading-snug">
                                  {item.rationale}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Downwind Plume & Street-Level Affected Areas */}
                {verificationResult.downwind_dispersion && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Compass className="w-3.5 h-3.5 text-sky-400" />
                        Spread Dynamics &amp; Downstream Dispersion
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        Bearing: {verificationResult.downwind_dispersion.plume_bearing_cardinal} ({verificationResult.downwind_dispersion.plume_bearing_deg}°)
                      </span>
                    </div>

                    {/* Spread Potential Indicator Card */}
                    <div
                      className={`p-2.5 rounded-xl border text-xs flex items-start gap-2.5 ${
                        verificationResult.is_real_hazard &&
                        verificationResult.downwind_dispersion.affected_streets_and_areas.length > 0
                          ? 'bg-rose-950/30 border-rose-800/40 text-rose-200'
                          : 'bg-emerald-950/30 border-emerald-800/40 text-emerald-200'
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {verificationResult.is_real_hazard &&
                        verificationResult.downwind_dispersion.affected_streets_and_areas.length > 0 ? (
                          <AlertTriangle className="w-4 h-4 text-rose-400 animate-pulse" />
                        ) : (
                          <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        )}
                      </div>
                      <div className="flex-1 leading-snug">
                        <div className="font-bold flex items-center justify-between gap-2">
                          <span>
                            {verificationResult.is_real_hazard &&
                            verificationResult.downwind_dispersion.affected_streets_and_areas.length > 0
                              ? '🚨 Active Downwind Regional Dispersion'
                              : '🛡️ Contained / Zero Regional Spread Verified'}
                          </span>
                          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-black/40">
                            {verificationResult.downwind_dispersion.affected_streets_and_areas.length > 0
                              ? `Reach: ${verificationResult.downwind_dispersion.max_reach_km} km`
                              : 'Reach: 0.0 km'}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300 mt-1">
                          {verificationResult.is_real_hazard &&
                          verificationResult.downwind_dispersion.affected_streets_and_areas.length > 0
                            ? `Continuous hazardous emission exhibiting sufficient thermal buoyancy to travel downwind along ${verificationResult.downwind_dispersion.plume_bearing_cardinal} (${verificationResult.downwind_dispersion.plume_bearing_deg}°) at ${verificationResult.downwind_dispersion.wind_speed_mps} m/s.`
                            : !verificationResult.is_real_hazard
                            ? 'Non-hazardous subject (healthy tree foliage, vegetation, or water steam) generates zero criteria pollutant plumes and has zero spread.'
                            : 'Normal small-time / micro activities lack the thermal buoyancy and convective volume to spread into surrounding neighborhoods. Emission dissipates harmlessly within 3-5 meters.'}
                        </p>
                      </div>
                    </div>

                    {/* Wind Vector Banner */}
                    <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-[11px] text-slate-300 flex items-center justify-between flex-wrap gap-2">
                      <div>
                        Wind from: <strong className="text-white">{verificationResult.downwind_dispersion.wind_origin_cardinal}</strong> at{' '}
                        <strong className="text-cyan-300">{verificationResult.downwind_dispersion.wind_speed_mps} m/s</strong>
                      </div>
                      <div>
                        Plume travels towards: <strong className="text-rose-400">{verificationResult.downwind_dispersion.plume_bearing_cardinal}</strong>
                      </div>
                      <div>
                        Reach: <strong className="text-amber-300">{verificationResult.downwind_dispersion.max_reach_km} km</strong>
                      </div>
                    </div>

                    {/* Affected Streets Table */}
                    {verificationResult.downwind_dispersion.affected_streets_and_areas.length > 0 ? (
                      <div className="space-y-1.5 max-h-60 overflow-y-auto scrollbar-thin pr-1">
                        {verificationResult.downwind_dispersion.affected_streets_and_areas.map((street, idx) => (
                          <div
                            key={idx}
                            className="bg-slate-950 p-2.5 rounded-xl border border-slate-850 flex items-start justify-between gap-2"
                          >
                            <div className="space-y-0.5">
                              <div className="font-bold text-white flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                                <span>{street.name}</span>
                              </div>
                              <div className="text-[10.5px] text-slate-400">
                                {street.recommended_action}
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase block mb-0.5 ${
                                  street.risk_level === 'Critical'
                                    ? 'bg-rose-500/20 text-rose-300'
                                    : street.risk_level === 'High'
                                    ? 'bg-orange-500/20 text-orange-300'
                                    : 'bg-amber-500/20 text-amber-300'
                                }`}
                              >
                                {street.risk_level} Risk
                              </span>
                              <span className="text-[10px] text-slate-500 font-mono">
                                ~{street.estimated_arrival_mins} mins ({street.distance_km} km)
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center text-slate-400 text-xs">
                        No downstream residential streets affected (Zero toxic emission verified).
                      </div>
                    )}

                    {/* Health Advisory */}
                    <div className="p-3 bg-sky-950/30 border border-sky-800/40 rounded-xl text-xs text-sky-200">
                      <strong className="text-sky-300 block mb-0.5">KSPCB Official Advisory:</strong>
                      {verificationResult.downwind_dispersion.advisory_for_residents}
                    </div>
                  </div>
                )}

                {/* Back to Form Button */}
                <button
                  onClick={() => setActiveTab('report_form')}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold transition text-xs cursor-pointer"
                >
                  Submit Another Citizen Observation
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Ground Telemetry Baseline at Pinpoint Block (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5" />
                  Ground Telemetry Baseline at Pinpoint
                </span>
                <h4 className="text-sm font-bold text-white mt-1">
                  {interpolation?.interpolation_method === 'multi_station_average'
                    ? `Spatial Interpolation (${interpolation.nearby_stations.length} CAAQMS Stations)`
                    : `Single Nearest CAAQMS (${interpolation?.nearby_stations[0]?.station_name || 'Ground Sensor'})`}
                </h4>
                <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                  Lat: {pinLat.toFixed(4)}, Lng: {pinLng.toFixed(4)}
                </div>
              </div>

              {/* Recenter / Pinpoint indicator */}
              <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800 shrink-0">
                <MapPin className="w-3 h-3 text-rose-500" />
                <span className="truncate max-w-[130px]" title={streetAddress}>{streetAddress.split(',')[0]}</span>
              </div>
            </div>

            {/* Highlighted AQI of the Pinpointed Place (Hero Display) */}
            <div
              className="p-3.5 rounded-xl border relative overflow-hidden transition-all shadow-xl"
              style={{
                backgroundColor: `${pinTier.bg}12`,
                borderColor: `${pinTier.bg}50`,
              }}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Activity className="w-3.5 h-3.5" style={{ color: pinTier.bg }} />
                    <span>Highlighted Pinpoint AQI</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span
                      className="text-4xl sm:text-5xl font-black font-mono tracking-tight drop-shadow"
                      style={{ color: pinTier.bg }}
                    >
                      {effectiveAqi}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">/ 500 NAQI</span>
                  </div>
                </div>

                <div className="text-right space-y-1">
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wide border shadow-md"
                    style={{
                      backgroundColor: `${pinTier.bg}25`,
                      color: pinTier.bg,
                      borderColor: pinTier.bg,
                    }}
                  >
                    {effectiveCategory}
                  </span>
                  <div className="text-[10px] font-mono text-slate-400">
                    Dominant: <strong className="text-white">{interpolation?.dominant_pollutant || 'PM2.5'}</strong>
                  </div>
                </div>
              </div>

              {/* Elevated AQI Warning Banner if Hazard Verified */}
              {verificationResult?.is_real_hazard && (
                <div className="mt-2.5 pt-2 border-t border-rose-500/30 flex items-center justify-between text-xs text-rose-300 font-medium">
                  <div className="flex items-center gap-1.5 truncate">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 animate-pulse" />
                    <span className="truncate">Surge Active: Base AQI {interpolation?.aqi} escalated to {effectiveAqi} (+{effectiveAqi - (interpolation?.aqi || 0)})</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-200 text-[10px] font-mono font-bold shrink-0">
                    Post-Report Level
                  </span>
                </div>
              )}
            </div>

            {/* Contributing Stations Badges */}
            {interpolation && interpolation.nearby_stations && (
              <div className="space-y-1.5">
                <span className="text-[11px] text-slate-400 font-medium block">Contributing Ground CAAQMS Stations:</span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {interpolation.nearby_stations.map((st) => (
                    <span
                      key={st.station_id}
                      className="px-2 py-0.5 rounded-md bg-slate-950 text-slate-300 text-[10px] font-mono border border-slate-800 flex items-center gap-1 hover:border-slate-700 transition"
                    >
                      <Radio className="w-2.5 h-2.5 text-emerald-400" />
                      <span>{st.station_name.split(',')[0]}</span>
                      <span className="text-sky-400 font-bold">({st.distance_km} km)</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 6 Criteria Pollutants Display (Showing Updated Pollutant Levels Change!) */}
            <div className="space-y-2 pt-1 border-t border-slate-800/80">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Pinpointed Location Pollutant Levels</span>
                </span>
                {verificationResult?.is_real_hazard ? (
                  <span className="text-[10px] text-rose-400 font-mono font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                    Updated with Verified Report
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-500 font-mono">Live Ground Sensors</span>
                )}
              </div>

              {/* 6 Pollutants Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono">
                {/* PM2.5 */}
                <div
                  onClick={() => {
                    setForecastTarget('PM2.5');
                    setIsForecastOpen(true);
                  }}
                  className={`p-2.5 rounded-xl border transition cursor-pointer group ${
                    activePollutants.pm25.isSurged
                      ? 'bg-rose-950/40 border-rose-500/70 shadow-lg shadow-rose-950/50'
                      : 'bg-slate-950 border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/60'
                  }`}
                  title="Click to forecast PM2.5 for this pinpoint"
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                    <span className="font-bold text-slate-300">PM2.5</span>
                    {activePollutants.pm25.isSurged ? (
                      <span className="px-1 py-0.2 rounded bg-rose-500/20 text-rose-300 text-[9px] font-black">
                        +{activePollutants.pm25.delta}
                      </span>
                    ) : (
                      <span className="text-[9px] text-slate-500">µg/m³</span>
                    )}
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className={`text-base font-black ${activePollutants.pm25.isSurged ? 'text-rose-300' : 'text-white'}`}>
                      {activePollutants.pm25.current}
                    </span>
                    {activePollutants.pm25.isSurged && (
                      <span className="text-[9px] text-slate-400 line-through">
                        {activePollutants.pm25.baseline}
                      </span>
                    )}
                  </div>
                  <div className="text-[9px] text-slate-500 mt-0.5 flex items-center justify-between">
                    <span>{activePollutants.pm25.isSurged ? 'Surge Active 🔥' : 'Baseline Intact'}</span>
                    <TrendingUp className="w-2.5 h-2.5 text-cyan-400 opacity-0 group-hover:opacity-100 transition" />
                  </div>
                </div>

                {/* PM10 */}
                <div
                  onClick={() => {
                    setForecastTarget('PM10');
                    setIsForecastOpen(true);
                  }}
                  className={`p-2.5 rounded-xl border transition cursor-pointer group ${
                    activePollutants.pm10.isSurged
                      ? 'bg-rose-950/40 border-rose-500/70 shadow-lg shadow-rose-950/50'
                      : 'bg-slate-950 border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/60'
                  }`}
                  title="Click to forecast PM10 for this pinpoint"
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                    <span className="font-bold text-slate-300">PM10</span>
                    {activePollutants.pm10.isSurged ? (
                      <span className="px-1 py-0.2 rounded bg-rose-500/20 text-rose-300 text-[9px] font-black">
                        +{activePollutants.pm10.delta}
                      </span>
                    ) : (
                      <span className="text-[9px] text-slate-500">µg/m³</span>
                    )}
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className={`text-base font-black ${activePollutants.pm10.isSurged ? 'text-rose-300' : 'text-white'}`}>
                      {activePollutants.pm10.current}
                    </span>
                    {activePollutants.pm10.isSurged && (
                      <span className="text-[9px] text-slate-400 line-through">
                        {activePollutants.pm10.baseline}
                      </span>
                    )}
                  </div>
                  <div className="text-[9px] text-slate-500 mt-0.5 flex items-center justify-between">
                    <span>{activePollutants.pm10.isSurged ? 'Surge Active 🔥' : 'Baseline Intact'}</span>
                    <TrendingUp className="w-2.5 h-2.5 text-cyan-400 opacity-0 group-hover:opacity-100 transition" />
                  </div>
                </div>

                {/* NO2 */}
                <div
                  onClick={() => {
                    setForecastTarget('NO2');
                    setIsForecastOpen(true);
                  }}
                  className={`p-2.5 rounded-xl border transition cursor-pointer group ${
                    activePollutants.no2.isSurged
                      ? 'bg-rose-950/40 border-rose-500/70 shadow-lg shadow-rose-950/50'
                      : 'bg-slate-950 border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/60'
                  }`}
                  title="Click to forecast NO2 for this pinpoint"
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                    <span className="font-bold text-slate-300">NO2</span>
                    {activePollutants.no2.isSurged ? (
                      <span className="px-1 py-0.2 rounded bg-rose-500/20 text-rose-300 text-[9px] font-black">
                        +{activePollutants.no2.delta}
                      </span>
                    ) : (
                      <span className="text-[9px] text-slate-500">µg/m³</span>
                    )}
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className={`text-base font-black ${activePollutants.no2.isSurged ? 'text-rose-300' : 'text-white'}`}>
                      {activePollutants.no2.current}
                    </span>
                    {activePollutants.no2.isSurged && (
                      <span className="text-[9px] text-slate-400 line-through">
                        {activePollutants.no2.baseline}
                      </span>
                    )}
                  </div>
                  <div className="text-[9px] text-slate-500 mt-0.5 flex items-center justify-between">
                    <span>{activePollutants.no2.isSurged ? 'Surge Active 🔥' : 'Baseline Intact'}</span>
                    <TrendingUp className="w-2.5 h-2.5 text-cyan-400 opacity-0 group-hover:opacity-100 transition" />
                  </div>
                </div>

                {/* SO2 */}
                <div
                  onClick={() => {
                    setForecastTarget('SO2');
                    setIsForecastOpen(true);
                  }}
                  className={`p-2.5 rounded-xl border transition cursor-pointer group ${
                    activePollutants.so2.isSurged
                      ? 'bg-rose-950/40 border-rose-500/70 shadow-lg shadow-rose-950/50'
                      : 'bg-slate-950 border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/60'
                  }`}
                  title="Click to forecast SO2 for this pinpoint"
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                    <span className="font-bold text-slate-300">SO2</span>
                    {activePollutants.so2.isSurged ? (
                      <span className="px-1 py-0.2 rounded bg-rose-500/20 text-rose-300 text-[9px] font-black">
                        +{activePollutants.so2.delta}
                      </span>
                    ) : (
                      <span className="text-[9px] text-slate-500">µg/m³</span>
                    )}
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className={`text-base font-black ${activePollutants.so2.isSurged ? 'text-rose-300' : 'text-white'}`}>
                      {activePollutants.so2.current}
                    </span>
                    {activePollutants.so2.isSurged && (
                      <span className="text-[9px] text-slate-400 line-through">
                        {activePollutants.so2.baseline}
                      </span>
                    )}
                  </div>
                  <div className="text-[9px] text-slate-500 mt-0.5 flex items-center justify-between">
                    <span>{activePollutants.so2.isSurged ? 'Surge Active 🔥' : 'Baseline Intact'}</span>
                    <TrendingUp className="w-2.5 h-2.5 text-cyan-400 opacity-0 group-hover:opacity-100 transition" />
                  </div>
                </div>

                {/* CO */}
                <div
                  onClick={() => {
                    setForecastTarget('CO');
                    setIsForecastOpen(true);
                  }}
                  className={`p-2.5 rounded-xl border transition cursor-pointer group ${
                    activePollutants.co.isSurged
                      ? 'bg-rose-950/40 border-rose-500/70 shadow-lg shadow-rose-950/50'
                      : 'bg-slate-950 border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/60'
                  }`}
                  title="Click to forecast CO for this pinpoint"
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                    <span className="font-bold text-slate-300">CO</span>
                    {activePollutants.co.isSurged ? (
                      <span className="px-1 py-0.2 rounded bg-rose-500/20 text-rose-300 text-[9px] font-black">
                        +{activePollutants.co.delta}
                      </span>
                    ) : (
                      <span className="text-[9px] text-slate-500">mg/m³</span>
                    )}
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className={`text-base font-black ${activePollutants.co.isSurged ? 'text-rose-300' : 'text-white'}`}>
                      {activePollutants.co.current}
                    </span>
                    {activePollutants.co.isSurged && (
                      <span className="text-[9px] text-slate-400 line-through">
                        {activePollutants.co.baseline}
                      </span>
                    )}
                  </div>
                  <div className="text-[9px] text-slate-500 mt-0.5 flex items-center justify-between">
                    <span>{activePollutants.co.isSurged ? 'Surge Active 🔥' : 'Baseline Intact'}</span>
                    <TrendingUp className="w-2.5 h-2.5 text-cyan-400 opacity-0 group-hover:opacity-100 transition" />
                  </div>
                </div>

                {/* O3 */}
                <div
                  onClick={() => {
                    setForecastTarget('O3');
                    setIsForecastOpen(true);
                  }}
                  className={`p-2.5 rounded-xl border transition cursor-pointer group ${
                    activePollutants.o3.isSurged
                      ? 'bg-rose-950/40 border-rose-500/70 shadow-lg shadow-rose-950/50'
                      : 'bg-slate-950 border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/60'
                  }`}
                  title="Click to forecast O3 for this pinpoint"
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                    <span className="font-bold text-slate-300">O3</span>
                    {activePollutants.o3.isSurged ? (
                      <span className="px-1 py-0.2 rounded bg-rose-500/20 text-rose-300 text-[9px] font-black">
                        +{activePollutants.o3.delta}
                      </span>
                    ) : (
                      <span className="text-[9px] text-slate-500">µg/m³</span>
                    )}
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className={`text-base font-black ${activePollutants.o3.isSurged ? 'text-rose-300' : 'text-white'}`}>
                      {activePollutants.o3.current}
                    </span>
                    {activePollutants.o3.isSurged && (
                      <span className="text-[9px] text-slate-400 line-through">
                        {activePollutants.o3.baseline}
                      </span>
                    )}
                  </div>
                  <div className="text-[9px] text-slate-500 mt-0.5 flex items-center justify-between">
                    <span>{activePollutants.o3.isSurged ? 'Surge Active 🔥' : 'Baseline Intact'}</span>
                    <TrendingUp className="w-2.5 h-2.5 text-cyan-400 opacity-0 group-hover:opacity-100 transition" />
                  </div>
                </div>
              </div>
            </div>

            {/* Weather Parameters Strip */}
            {interpolation && (
              <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">
                  Meteorological Covariates:
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Wind className="w-3.5 h-3.5 text-sky-400" /> Wind:
                    </span>
                    <span className="font-bold text-white font-mono">
                      {interpolation.weather.wind_speed_mps} m/s ({interpolation.weather.wind_direction_cardinal})
                    </span>
                  </div>

                  <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Thermometer className="w-3.5 h-3.5 text-amber-400" /> Temp:
                    </span>
                    <span className="font-bold text-white font-mono">
                      {interpolation.weather.temperature_c}°C
                    </span>
                  </div>

                  <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Droplets className="w-3.5 h-3.5 text-teal-400" /> Humidity:
                    </span>
                    <span className="font-bold text-white font-mono">
                      {interpolation.weather.relative_humidity_pct}%
                    </span>
                  </div>

                  <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Gauge className="w-3.5 h-3.5 text-indigo-400" /> Pressure:
                    </span>
                    <span className="font-bold text-white font-mono">
                      {interpolation.weather.barometric_pressure_hpa} hPa
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 24-Hour Forecast Action Block for Pinpointed Location */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-teal-950/40 shrink-0">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-sm font-bold text-white">
                    24-Hour Telemetry Forecast (Google TimesFM)
                  </h4>
                  <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold border border-cyan-500/30">
                    Foundation Model
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Predict NAQI &amp; 6 criteria pollutants for this pinpoint conditioned on meteorological covariates (168h context, 24h horizon).
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setForecastTarget('AQI');
                setIsForecastOpen(true);
              }}
              disabled={!interpolation || isLoadingInterpolation}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-lg shadow-teal-950/50 flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Forecast Pinpoint Location</span>
              <Sparkles className="w-3.5 h-3.5 text-cyan-200 ml-auto" />
            </button>
          </div>
        </div>
      </div>

      {/* Query Chatbot for Bengaluru Pinpointed Location */}
      <AirQualityChatbot
        mode="bengaluru_citizen"
        contextData={{
          pinpoint: {
            lat: pinLat,
            lng: pinLng,
            street_address: streetAddress,
            pollutants: interpolation?.pollutants,
            aqi: interpolation?.aqi,
            aqi_category: interpolation?.aqi_category,
            dominant_pollutant: interpolation?.dominant_pollutant,
            sub_indices: interpolation?.sub_indices,
            weather: interpolation?.weather,
            nearby_stations: interpolation?.nearby_stations,
            verification: verificationResult,
          },
        }}
        title="Bengaluru Pinpoint Telemetry & Weather Intelligence Chatbot"
        subtitle={`Live criteria pollutants and meteorological intelligence for ${streetAddress}. Supports dynamic Plotly line charts for NAAQS benchmarks, dual correlations & AQI trends.`}
      />

      {/* 24-Hour Foundation Model Forecasting Modal for Pinpointed Location (Uses same forecasting code as main map) */}
      <ForecastModal
        isOpen={isForecastOpen}
        onClose={() => setIsForecastOpen(false)}
        station={pinpointStationAsAQI}
        initialTarget={forecastTarget}
      />
    </div>
  );
};
