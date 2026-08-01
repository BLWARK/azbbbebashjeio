'use client';

import React from 'react';
import Switch from '@/components/ui/Switch';

export type ViewMode = 'grid' | 'list';
export type SortBy = 'creation' | 'mcap' | 'volume' | 'progress';

interface FilterBarProps {
  showGraduated: boolean;
  onGraduatedToggle: (v: boolean) => void;
  sortBy: SortBy;
  onSortChange: (v: SortBy) => void;
  viewMode: ViewMode;
  onViewModeChange: (v: ViewMode) => void;
}

// ── Icons ─────────────────────────────────────────────────────────
const GridIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const ListIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const ChevronDown = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const SORT_OPTIONS: { value: SortBy; label: string }[] = [
  { value: 'creation', label: 'Creation Time' },
  { value: 'mcap',     label: 'Market Cap'    },
  { value: 'volume',   label: '24h Volume'    },
  { value: 'progress', label: 'Bond Progress' },
];

export default function FilterBar({
  showGraduated,
  onGraduatedToggle,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
}: FilterBarProps) {
  return (
    <div
      className="flex items-center justify-between gap-4 px-6 py-3 flex-wrap"
      style={{ borderBottom: '1px solid #1F262A' }}
    >
      {/* Left — Graduated toggle + Chain filter */}
      <div className="flex items-center gap-4">
        <Switch
          checked={showGraduated}
          onChange={onGraduatedToggle}
          label="Show Graduated"
          id="filter-graduated"
        />

        {/* Chain chip */}
        <button
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-150"
          style={{
            background: '#0E1113',
            border: '1px solid #1F262A',
            color: '#647079',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = '#22E0C8';
            (e.currentTarget as HTMLButtonElement).style.color = '#E8EEF0';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = '#1F262A';
            (e.currentTarget as HTMLButtonElement).style.color = '#647079';
          }}
          id="filter-chain"
        >
          {/* BNB dot */}
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#F0B90B',
              display: 'inline-block',
              flexShrink: 0,
            }}
          />
          All Chains
          <ChevronDown />
        </button>
      </div>

      {/* Right — Sort + View toggle */}
      <div className="flex items-center gap-3">
        {/* Sort */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortBy)}
            className="appearance-none pl-3 pr-8 py-1.5 rounded-lg text-xs font-medium outline-none cursor-pointer"
            style={{
              background: '#0E1113',
              border: '1px solid #1F262A',
              color: '#647079',
              height: 32,
            }}
            id="filter-sort"
            aria-label="Sort tokens by"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value} style={{ background: '#0E1113', color: '#E8EEF0' }}>
                {o.label}
              </option>
            ))}
          </select>
          <span
            className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: '#647079' }}
          >
            <ChevronDown />
          </span>
        </div>

        {/* Divider */}
        <div style={{ width: 1, height: 20, background: '#1F262A' }} />

        {/* View mode toggle */}
        <div
          className="flex items-center rounded-lg overflow-hidden"
          style={{ border: '1px solid #1F262A' }}
        >
          <button
            onClick={() => onViewModeChange('grid')}
            className="flex items-center justify-center transition-colors duration-150"
            style={{
              width: 32,
              height: 32,
              background: viewMode === 'grid' ? '#151A1D' : '#0E1113',
              color: viewMode === 'grid' ? '#22E0C8' : '#647079',
              borderRight: '1px solid #1F262A',
            }}
            aria-label="Grid view"
            aria-pressed={viewMode === 'grid'}
            id="view-mode-grid"
          >
            <GridIcon />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className="flex items-center justify-center transition-colors duration-150"
            style={{
              width: 32,
              height: 32,
              background: viewMode === 'list' ? '#151A1D' : '#0E1113',
              color: viewMode === 'list' ? '#22E0C8' : '#647079',
            }}
            aria-label="List view"
            aria-pressed={viewMode === 'list'}
            id="view-mode-list"
          >
            <ListIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
