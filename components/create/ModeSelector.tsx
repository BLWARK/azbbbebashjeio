'use client';

import React from 'react';

type Mode = 'classic' | 'open';

interface ModeSelectorProps {
  mode: Mode;
  onChange: (mode: Mode) => void;
}

const MODES = [
  {
    id: 'classic' as Mode,
    label: 'Classic',
    emoji: '🏛️',
    desc: 'Standard bonding curve launch with automatic PancakeSwap graduation.',
  },
  {
    id: 'open' as Mode,
    label: 'Open Market',
    emoji: '🌐',
    desc: 'Launch directly with custom liquidity — full control over price.',
  },
];

export default function ModeSelector({ mode, onChange }: ModeSelectorProps) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#647079' }}>
        Launch Mode
      </h2>
      <div className="flex flex-col gap-2">
        {MODES.map((m) => {
          const isActive = mode === m.id;
          return (
            <button
              key={m.id}
              onClick={() => onChange(m.id)}
              className="flex flex-col gap-1 p-3 rounded-xl text-left transition-all duration-200"
              style={{
                background: isActive ? 'rgba(34,224,200,0.06)' : '#0E1113',
                border: `1px solid ${isActive ? 'rgba(34,224,200,0.35)' : '#1F262A'}`,
                boxShadow: isActive ? '0 0 12px rgba(34,224,200,0.08)' : 'none',
              }}
              aria-pressed={isActive}
              id={`mode-${m.id}`}
            >
              <div className="flex items-center gap-2">
                <span className="text-base">{m.emoji}</span>
                <span
                  className="text-sm font-bold"
                  style={{ color: isActive ? '#22E0C8' : '#E8EEF0' }}
                >
                  {m.label}
                </span>
                {isActive && (
                  <span
                    className="ml-auto text-[10px] px-1.5 py-0.5 rounded font-semibold"
                    style={{
                      background: 'rgba(34,224,200,0.12)',
                      border: '1px solid rgba(34,224,200,0.3)',
                      color: '#22E0C8',
                    }}
                  >
                    Selected
                  </span>
                )}
              </div>
              <p className="text-xs leading-relaxed" style={{ color: '#647079' }}>
                {m.desc}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
