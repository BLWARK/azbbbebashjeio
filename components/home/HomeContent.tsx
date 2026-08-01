'use client';

import React, { useState, useMemo } from 'react';
import TokenTabs, { type TabId } from './TokenTabs';
import FilterBar, { type ViewMode, type SortBy } from './FilterBar';
import TokenGrid from './TokenGrid';
import TokenTable from './TokenTable';
import { MOCK_TOKENS, type Token } from '@/lib/mock-data';

export default function HomeContent() {
  const [activeTab, setActiveTab]         = useState<TabId>('all');
  const [showGraduated, setShowGraduated] = useState(false);
  const [sortBy, setSortBy]               = useState<SortBy>('creation');
  const [viewMode, setViewMode]           = useState<ViewMode>('grid');

  const filtered = useMemo<Token[]>(() => {
    let tokens = MOCK_TOKENS;

    // Filter by tab type
    if (activeTab !== 'all') {
      tokens = tokens.filter((t) => t.type === activeTab);
    }

    // Filter graduated
    if (!showGraduated) {
      tokens = tokens.filter((t) => !t.graduated);
    }

    // Sort
    return [...tokens].sort((a, b) => {
      switch (sortBy) {
        case 'mcap':     return b.mcap - a.mcap;
        case 'volume':   return b.volume24h - a.volume24h;
        case 'progress': return b.bondingProgress - a.bondingProgress;
        case 'creation':
        default:         return 0; // keep original order (newest first in mock)
      }
    });
  }, [activeTab, showGraduated, sortBy]);

  return (
    <div className="flex flex-col">
      {/* Tabs */}
      <TokenTabs active={activeTab} onChange={setActiveTab} />

      {/* Filter bar */}
      <FilterBar
        showGraduated={showGraduated}
        onGraduatedToggle={setShowGraduated}
        sortBy={sortBy}
        onSortChange={setSortBy}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* Content */}
      {viewMode === 'grid' ? (
        <TokenGrid tokens={filtered} />
      ) : (
        <TokenTable tokens={filtered} />
      )}
    </div>
  );
}
