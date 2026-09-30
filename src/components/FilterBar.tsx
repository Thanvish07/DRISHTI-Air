import React from 'react';
import { Search, Filter, RotateCcw } from 'lucide-react';

interface FilterBarProps {
  selectedState: string;
  setSelectedState: (state: string) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  stationQuery: string;
  setStationQuery: (query: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  stationTypeFilter?: string;
  setStationTypeFilter?: (type: string) => void;
  availableStates: string[];
  availableCities: string[];
  availableStationTypes?: string[];
  totalCount: number;
  filteredCount: number;
  onResetFilters: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedState,
  setSelectedState,
  selectedCity,
  setSelectedCity,
  stationQuery,
  setStationQuery,
  categoryFilter,
  setCategoryFilter,
  stationTypeFilter = 'All',
  setStationTypeFilter,
  availableStates,
  availableCities,
  availableStationTypes = ['Traffic Intersection', 'Commercial', 'Industrial', 'Residential / Institutional', 'Urban Background'],
  totalCount,
  filteredCount,
  onResetFilters,
}) => {
  const categories = [
    { label: 'All NAQI', value: 'All' },
    { label: 'Good (0-50)', value: 'Good', color: 'text-emerald-400 border-emerald-500/30' },
    { label: 'Satisfactory (51-100)', value: 'Satisfactory', color: 'text-lime-400 border-lime-500/30' },
    { label: 'Moderate (101-200)', value: 'Moderate', color: 'text-yellow-400 border-yellow-500/30' },
    { label: 'Poor (201-300)', value: 'Poor', color: 'text-orange-400 border-orange-500/30' },
    { label: 'Very Poor (301-400)', value: 'Very Poor', color: 'text-rose-400 border-rose-500/30' },
    { label: 'Severe (401+)', value: 'Severe', color: 'text-red-400 border-red-500/30' },
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-sm space-y-3.5">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Core Dropdowns & Search */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 flex-1">
          {/* State Filter */}
          <div>
            <label className="block text-[11px] font-semibold tracking-wider uppercase text-slate-400 mb-1 flex items-center gap-1">
              <Filter className="w-3 h-3 text-emerald-400" />
              State / UT
            </label>
            <select
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setSelectedCity('All'); // Reset city when state changes
              }}
              className="w-full bg-slate-800/90 border border-slate-700 text-sm text-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500 transition font-medium"
            >
              <option value="All">All States (India)</option>
              {availableStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          {/* City Filter */}
          <div>
            <label className="block text-[11px] font-semibold tracking-wider uppercase text-slate-400 mb-1 flex items-center gap-1">
              <Filter className="w-3 h-3 text-cyan-400" />
              City
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full bg-slate-800/90 border border-slate-700 text-sm text-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500 transition font-medium"
            >
              <option value="All">All Cities</option>
              {availableCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Station No / Name Search Input */}
          <div>
            <label className="block text-[11px] font-semibold tracking-wider uppercase text-slate-400 mb-1 flex items-center gap-1">
              <Search className="w-3 h-3 text-amber-400" />
              Station No. / Code
            </label>
            <div className="relative">
              <input
                type="text"
                value={stationQuery}
                onChange={(e) => setStationQuery(e.target.value)}
                placeholder="e.g. DL001, site_142..."
                className="w-full bg-slate-800/90 border border-slate-700 text-sm text-slate-200 rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:border-emerald-500 placeholder-slate-500 transition font-medium"
              />
              {stationQuery && (
                <button
                  onClick={() => setStationQuery('')}
                  className="absolute right-2.5 top-2.5 text-xs text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Counter & Reset */}
        <div className="flex items-center justify-between lg:justify-end gap-3 pt-1 lg:pt-5 shrink-0">
          <div className="text-xs text-slate-400 font-mono">
            Showing <span className="font-bold text-emerald-400">{filteredCount}</span> of {totalCount}
          </div>
          {(selectedState !== 'All' || selectedCity !== 'All' || stationQuery || categoryFilter !== 'All' || stationTypeFilter !== 'All') && (
            <button
              onClick={onResetFilters}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 bg-slate-800 px-2.5 py-1.5 rounded-lg border border-slate-700 hover:border-slate-600 transition"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Category Pills Quick Filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-none text-xs">
        <span className="text-slate-500 text-[11px] uppercase tracking-wider font-semibold mr-1 whitespace-nowrap">
          NAQI Filter:
        </span>
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setCategoryFilter(cat.value)}
            className={`px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap transition-all ${
              categoryFilter === cat.value
                ? 'bg-slate-700 text-white border border-slate-600 shadow-sm'
                : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
};
