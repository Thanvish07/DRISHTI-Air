import React, { useState } from 'react';
import { StationAQI } from '../types';
import { ArrowUpDown, ArrowUp, ArrowDown, ExternalLink, AlertTriangle, Thermometer, Wind, Droplets, Gauge, Sun, CloudRain, Eye, Layers, TrendingUp } from 'lucide-react';

interface AqiDataTableProps {
  stations: StationAQI[];
  onSelectStation: (station: StationAQI) => void;
  onOpenForecast?: (station: StationAQI, target?: string) => void;
}

type SortField =
  | 'station_id'
  | 'station_name'
  | 'city'
  | 'category'
  | 'aqi'
  | 'pm25'
  | 'pm10'
  | 'no2'
  | 'so2'
  | 'co'
  | 'o3'
  | 'temperature_c'
  | 'relative_humidity_pct'
  | 'wind_speed_mps'
  | 'solar_radiation_wm2'
  | 'barometric_pressure_hpa'
  | 'rainfall_mm'
  | 'aerosol_optical_depth';

type TableViewMode = 'consolidated' | 'weather' | 'pollutants';

export const AqiDataTable: React.FC<AqiDataTableProps> = ({ stations, onSelectStation, onOpenForecast }) => {
  const [viewMode, setViewMode] = useState<TableViewMode>('consolidated');
  const [sortField, setSortField] = useState<SortField>('aqi');
  const [sortAsc, setSortAsc] = useState<boolean>(true); // default ascending (lowest NAQI first)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true); // default to ascending on field selection
    }
  };

  const sortedStations = [...stations].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];

    if (aVal === undefined) aVal = '';
    if (bVal === undefined) bVal = '';

    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    return sortAsc ? Number(aVal) - Number(bVal) : Number(bVal) - Number(aVal);
  });

  const totalPages = Math.ceil(sortedStations.length / itemsPerPage) || 1;
  const paginatedStations = sortedStations.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-3 h-3 text-slate-600 inline ml-1" />;
    }
    return sortAsc ? (
      <ArrowUp className="w-3 h-3 text-emerald-400 inline ml-1" />
    ) : (
      <ArrowDown className="w-3 h-3 text-emerald-400 inline ml-1" />
    );
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
      {/* Header bar */}
      <div className="px-5 py-3.5 bg-slate-850 border-b border-slate-800 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bold text-sm text-slate-100">National Ambient Telemetry &amp; Meteorological Table</span>
          
          <a
            href="https://airquality.cpcb.gov.in/ccr/#/all-india-aqi-portal"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-medium text-emerald-400 hover:text-emerald-300 underline underline-offset-2 flex items-center gap-1 ml-1"
            title="Open CPCB CCR All-India AQI Portal"
          >
            CPCB CCR All-India Portal
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setViewMode('consolidated')}
            className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
              viewMode === 'consolidated'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Consolidated (AQI + Weather)
          </button>
          <button
            onClick={() => setViewMode('weather')}
            className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
              viewMode === 'weather'
                ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-sky-300'
            }`}
          >
            <Thermometer className="w-3.5 h-3.5" />
            Weather Feeds (8 Variables)
          </button>
          <button
            onClick={() => setViewMode('pollutants')}
            className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
              viewMode === 'pollutants'
                ? 'bg-slate-700 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Wind className="w-3.5 h-3.5" />
            Criteria Pollutants (6)
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-950/80 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
            <tr>
              <th
                onClick={() => handleSort('station_id')}
                className="px-4 py-3 cursor-pointer hover:text-white transition select-none"
              >
                Station ID {renderSortIcon('station_id')}
              </th>
              <th
                onClick={() => handleSort('station_name')}
                className="px-4 py-3 cursor-pointer hover:text-white transition select-none"
              >
                Station / Category {renderSortIcon('station_name')}
              </th>
              <th
                onClick={() => handleSort('city')}
                className="px-4 py-3 cursor-pointer hover:text-white transition select-none"
              >
                City / State {renderSortIcon('city')}
              </th>
              <th
                onClick={() => handleSort('aqi')}
                className="px-4 py-3 text-center cursor-pointer hover:text-white transition select-none bg-slate-900/50"
              >
                NAQI {renderSortIcon('aqi')}
              </th>

              {/* Weather Columns in Consolidated and Weather Modes */}
              {(viewMode === 'weather' || viewMode === 'consolidated') && (
                <>
                  <th
                    onClick={() => handleSort('temperature_c')}
                    className="px-4 py-3 text-center cursor-pointer hover:text-white transition select-none text-sky-300"
                  >
                    Temp <span className="text-[10px] text-slate-400 lowercase font-mono">°C</span> {renderSortIcon('temperature_c')}
                  </th>
                  <th
                    onClick={() => handleSort('relative_humidity_pct')}
                    className="px-4 py-3 text-center cursor-pointer hover:text-white transition select-none text-sky-300"
                  >
                    Humidity <span className="text-[10px] text-slate-400 lowercase font-mono">%</span> {renderSortIcon('relative_humidity_pct')}
                  </th>
                  <th
                    onClick={() => handleSort('wind_speed_mps')}
                    className="px-4 py-3 text-center cursor-pointer hover:text-white transition select-none text-sky-300"
                  >
                    Wind <span className="text-[10px] text-slate-400 lowercase font-mono">m/s dir</span> {renderSortIcon('wind_speed_mps')}
                  </th>
                  <th
                    onClick={() => handleSort('barometric_pressure_hpa')}
                    className="px-4 py-3 text-center cursor-pointer hover:text-white transition select-none text-sky-300"
                  >
                    Pressure <span className="text-[10px] text-slate-400 lowercase font-mono">hPa</span> {renderSortIcon('barometric_pressure_hpa')}
                  </th>
                  {viewMode === 'weather' && (
                    <>
                      <th
                        onClick={() => handleSort('solar_radiation_wm2')}
                        className="px-4 py-3 text-center cursor-pointer hover:text-white transition select-none text-sky-300"
                      >
                        Solar <span className="text-[10px] text-slate-400 lowercase font-mono">W/m²</span> {renderSortIcon('solar_radiation_wm2')}
                      </th>
                      <th
                        onClick={() => handleSort('rainfall_mm')}
                        className="px-4 py-3 text-center cursor-pointer hover:text-white transition select-none text-sky-300"
                      >
                        Rainfall <span className="text-[10px] text-slate-400 lowercase font-mono">mm</span> {renderSortIcon('rainfall_mm')}
                      </th>
                      <th
                        onClick={() => handleSort('aerosol_optical_depth')}
                        className="px-4 py-3 text-center cursor-pointer hover:text-white transition select-none text-sky-300"
                      >
                        AOD (MODIS) {renderSortIcon('aerosol_optical_depth')}
                      </th>
                    </>
                  )}
                </>
              )}

              {/* Pollutant Columns in Pollutants and Consolidated Modes */}
              {(viewMode === 'pollutants' || viewMode === 'consolidated') && (
                <>
                  <th
                    onClick={() => handleSort('pm25')}
                    className="px-4 py-3 text-center cursor-pointer hover:text-white transition select-none"
                  >
                    PM2.5 <span className="text-[10px] text-slate-400 lowercase font-mono">µg/m³</span> {renderSortIcon('pm25')}
                  </th>
                  <th
                    onClick={() => handleSort('pm10')}
                    className="px-4 py-3 text-center cursor-pointer hover:text-white transition select-none"
                  >
                    PM10 <span className="text-[10px] text-slate-400 lowercase font-mono">µg/m³</span> {renderSortIcon('pm10')}
                  </th>
                  {viewMode === 'pollutants' && (
                    <>
                      <th
                        onClick={() => handleSort('no2')}
                        className="px-4 py-3 text-center cursor-pointer hover:text-white transition select-none"
                      >
                        NO2 <span className="text-[10px] text-slate-400 lowercase font-mono">µg/m³</span> {renderSortIcon('no2')}
                      </th>
                      <th
                        onClick={() => handleSort('so2')}
                        className="px-4 py-3 text-center cursor-pointer hover:text-white transition select-none"
                      >
                        SO2 <span className="text-[10px] text-slate-400 lowercase font-mono">µg/m³</span> {renderSortIcon('so2')}
                      </th>
                      <th
                        onClick={() => handleSort('co')}
                        className="px-4 py-3 text-center cursor-pointer hover:text-white transition select-none"
                      >
                        CO <span className="text-[10px] text-slate-400 lowercase font-mono">mg/m³</span> {renderSortIcon('co')}
                      </th>
                      <th
                        onClick={() => handleSort('o3')}
                        className="px-4 py-3 text-center cursor-pointer hover:text-white transition select-none"
                      >
                        O3 <span className="text-[10px] text-slate-400 lowercase font-mono">µg/m³</span> {renderSortIcon('o3')}
                      </th>
                    </>
                  )}
                  <th className="px-4 py-3 text-center">Dominant Driver</th>
                </>
              )}

              <th className="px-4 py-3 text-right">Inspect</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 text-slate-200">
            {paginatedStations.length === 0 ? (
              <tr>
                <td colSpan={14} className="px-6 py-12 text-center text-slate-400">
                  <div className="flex flex-col items-center gap-2">
                    <AlertTriangle className="w-6 h-6 text-amber-500" />
                    <p className="font-medium text-slate-300">No CPCB monitoring stations match the active filter criteria.</p>
                    <p className="text-xs text-slate-400">Try adjusting your State, City, Category, or Station ID search query.</p>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedStations.map((st) => (
                <tr
                  key={st.station_id}
                  onClick={() => onSelectStation(st)}
                  className="hover:bg-slate-800/60 cursor-pointer transition-colors group"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-xs font-bold text-emerald-400">
                        {st.station_id}
                      </span>
                      {st.cpcb_site_id && (
                        <span className="font-mono text-[10px] text-slate-400 bg-slate-800 px-1 py-0.5 rounded border border-slate-700">
                          {st.cpcb_site_id}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-100 group-hover:text-emerald-300 transition leading-snug">
                      {st.station_name}
                    </div>
                    {st.category && (
                      <span className="inline-block mt-0.5 text-[10px] px-1.5 py-0.2 rounded bg-indigo-950/60 text-indigo-300 border border-indigo-800/50">
                        {st.category}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-400">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-semibold text-slate-300">{st.city}</span>, {st.state}
                      {st.zone && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700 font-mono">
                          {st.zone}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center bg-slate-900/40">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border ${st.category_bg}`}
                    >
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: st.category_color }}
                      />
                      {st.aqi} • {st.aqi_category}
                    </span>
                  </td>

                  {/* Weather Columns */}
                  {(viewMode === 'weather' || viewMode === 'consolidated') && (
                    <>
                      <td className="px-4 py-3 text-center font-mono text-xs text-amber-300 font-semibold">
                        {st.temperature_c}°C
                      </td>
                      <td className="px-4 py-3 text-center font-mono text-xs text-sky-300">
                        {st.relative_humidity_pct}%
                      </td>
                      <td className="px-4 py-3 text-center font-mono text-xs text-slate-200">
                        <span className="font-bold text-teal-400">{st.wind_speed_mps}</span> m/s{' '}
                        <span className="text-[10px] text-slate-400 bg-slate-800 px-1 py-0.5 rounded font-mono">
                          {st.wind_direction_cardinal}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center font-mono text-xs text-slate-300">
                        {st.barometric_pressure_hpa}
                      </td>
                      {viewMode === 'weather' && (
                        <>
                          <td className="px-4 py-3 text-center font-mono text-xs text-amber-400">
                            {st.solar_radiation_wm2}
                          </td>
                          <td className="px-4 py-3 text-center font-mono text-xs text-blue-300">
                            {st.rainfall_mm > 0 ? (
                              <span className="text-blue-400 font-bold">{st.rainfall_mm}</span>
                            ) : (
                              '0.0'
                            )}
                          </td>
                          <td className="px-4 py-3 text-center font-mono text-xs text-purple-300 font-semibold">
                            {st.aerosol_optical_depth}
                          </td>
                        </>
                      )}
                    </>
                  )}

                  {/* Pollutants Columns */}
                  {(viewMode === 'pollutants' || viewMode === 'consolidated') && (
                    <>
                      <td className="px-4 py-3 text-center font-mono text-xs text-slate-200">
                        {st.pm25}
                      </td>
                      <td className="px-4 py-3 text-center font-mono text-xs text-slate-200">
                        {st.pm10}
                      </td>
                      {viewMode === 'pollutants' && (
                        <>
                          <td className="px-4 py-3 text-center font-mono text-xs text-slate-200">
                            {st.no2}
                          </td>
                          <td className="px-4 py-3 text-center font-mono text-xs text-slate-200">
                            {st.so2}
                          </td>
                          <td className="px-4 py-3 text-center font-mono text-xs text-slate-200">
                            {st.co}
                          </td>
                          <td className="px-4 py-3 text-center font-mono text-xs text-slate-200">
                            {st.o3}
                          </td>
                        </>
                      )}
                      <td className="px-4 py-3 text-center">
                        <span className="px-2 py-0.5 text-xs font-bold rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                          {st.dominant_pollutant}
                        </span>
                      </td>
                    </>
                  )}

                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {onOpenForecast && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenForecast(st, 'AQI');
                          }}
                          className="p-1 rounded text-teal-400 hover:text-white hover:bg-teal-950/60 transition"
                          title="24h TimesFM AI Forecast"
                        >
                          <TrendingUp className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectStation(st);
                        }}
                        className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition"
                        title="Inspect Sub-indices and Weather Telemetry"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="px-5 py-3 bg-slate-950/60 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div>
            Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, sortedStations.length)} of {sortedStations.length} entries
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 transition"
            >
              Previous
            </button>
            <span className="px-2 font-mono text-slate-300">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 transition"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
