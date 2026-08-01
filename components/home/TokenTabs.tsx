'use client';

import React from 'react';

export type TabId = 'all' | 'normal' | 'tax' | 'open';

interface Tab {
  id: TabId;
  label: string;
  count?: number;
}

interface TokenTabsProps {
  active: TabId;
  onChange: (tab: TabId) => void;
}

const TABS: Tab[] = [
  { id: 'all',    label: 'All Tokens',  count: 1247 },
  { id: 'normal', label: 'Normal',      count: 892  },
  { id: 'tax',    label: 'Tax',         count: 213  },
  { id: 'open',   label: 'Open Market', count: 142  },
];

export default function TokenTabs({ active, onChange }: TokenTabsProps) {
  return (
    <div
      className="flex items-center gap-1 px-6 overflow-x-auto"
      style={{ borderBottom: '1px solid #1F262A' }}
    >
      {TABS.map((tab) => (
        <button
          key={tab.id}
          className={`az-tab ${active === tab.id ? 'active' : ''}`}
          onClick={() => onChange(tab.id)}
          id={`tab-${tab.id}`}
          aria-selected={active === tab.id}
          role="tab"
        >
          {tab.label}
          {tab.count !== undefined && (
            <span
              className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full tabular-nums"
              style={{
                background: active === tab.id ? 'rgba(34,224,200,0.12)' : 'rgba(100,112,121,0.12)',
                color: active === tab.id ? '#22E0C8' : '#647079',
              }}
            >
              {tab.count >= 1000 ? `${Math.floor(tab.count / 1000)},${String(tab.count % 1000).padStart(3, '0')}` : tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
