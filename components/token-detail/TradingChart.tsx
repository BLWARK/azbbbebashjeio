'use client';

import React, { useState } from 'react';

type Timeframe = '1m' | '5m' | '15m' | '1H' | '4H' | '1D';

const TIMEFRAMES: Timeframe[] = ['1m', '5m', '15m', '1H', '4H', '1D'];

// ── Fake SVG chart ────────────────────────────────────────────────
function ChartSVG({ timeframe }: { timeframe: Timeframe }) {
  // Different path shapes per timeframe for realism
  const paths: Record<Timeframe, string> = {
    '1m':  'M0,140 C30,138 60,142 90,132 C120,122 150,128 180,118 C210,108 240,115 270,100 C300,88 330,95 360,80 C390,68 420,75 450,60 C480,48 510,55 540,42 C570,32 590,28 620,20',
    '5m':  'M0,150 C40,148 80,155 120,140 C160,128 200,135 240,118 C280,105 320,112 360,95 C400,82 440,90 480,72 C510,58 540,65 570,48 C590,38 608,30 620,18',
    '15m': 'M0,160 C50,155 100,162 150,148 C200,135 250,145 300,128 C350,114 400,122 450,105 C490,94 520,100 555,85 C580,75 605,68 620,58',
    '1H':  'M0,100 C40,105 80,92 120,98 C160,104 200,88 240,82 C280,76 320,85 360,68 C400,54 440,62 480,48 C510,38 550,42 580,30 C600,22 612,18 620,12',
    '4H':  'M0,130 C60,125 120,132 180,115 C240,102 300,110 360,92 C420,78 480,86 530,68 C565,56 590,60 620,45',
    '1D':  'M0,80 C80,85 160,72 240,78 C320,84 400,65 480,55 C540,48 580,52 620,38',
  };

  const linePath = paths[timeframe];
  // Create fill path by closing at bottom
  const fillPath = `${linePath} L620,240 L0,240 Z`;

  return (
    <svg
      viewBox="0 0 620 240"
      preserveAspectRatio="none"
      width="100%"
      height="100%"
      style={{ display: 'block' }}
    >
      <defs>
        {/* Line gradient */}
        <linearGradient id="chart-line-grad" x1="0" y1="0" x2="620" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#22E0C8" />
          <stop offset="60%"  stopColor="#3E7BF0" />
          <stop offset="100%" stopColor="#7B5BE0" />
        </linearGradient>

        {/* Area fill gradient */}
        <linearGradient id="chart-area-grad" x1="0" y1="0" x2="0" y2="240" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#22E0C8" stopOpacity="0.2" />
          <stop offset="70%"  stopColor="#3E7BF0" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#050708" stopOpacity="0" />
        </linearGradient>

        {/* Grid lines */}
        <pattern id="chart-grid" width="62" height="48" patternUnits="userSpaceOnUse">
          <line x1="62" y1="0" x2="62" y2="240" stroke="#1F262A" strokeWidth="0.5" />
          <line x1="0" y1="48" x2="620" y2="48" stroke="#1F262A" strokeWidth="0.5" />
        </pattern>
      </defs>

      {/* Grid */}
      <rect width="620" height="240" fill="url(#chart-grid)" />

      {/* Fill area */}
      <path d={fillPath} fill="url(#chart-area-grad)" />

      {/* Line */}
      <path
        d={linePath}
        fill="none"
        stroke="url(#chart-line-grad)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Current price dot */}
      <circle cx="620" cy={timeframe === '1m' ? 20 : timeframe === '5m' ? 18 : timeframe === '15m' ? 58 : timeframe === '1H' ? 12 : timeframe === '4H' ? 45 : 38} r="4" fill="#22E0C8" />
      <circle cx="620" cy={timeframe === '1m' ? 20 : timeframe === '5m' ? 18 : timeframe === '15m' ? 58 : timeframe === '1H' ? 12 : timeframe === '4H' ? 45 : 38} r="8" fill="#22E0C8" fillOpacity="0.2" />
    </svg>
  );
}

export default function TradingChart() {
  const [timeframe, setTimeframe] = useState<Timeframe>('5m');

  return (
    <div
      className="flex flex-col"
      style={{
        background: '#0E1113',
        border: '1px solid #1F262A',
        borderRadius: 8,
        overflow: 'hidden',
      }}
    >
      {/* Chart toolbar */}
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{ borderBottom: '1px solid #1F262A' }}
      >
        <div className="flex items-center gap-1">
          {TIMEFRAMES.map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className="px-2.5 py-1 rounded text-xs font-semibold transition-all duration-150"
              style={{
                background: timeframe === tf ? 'rgba(34,224,200,0.12)' : 'transparent',
                color: timeframe === tf ? '#22E0C8' : '#647079',
                border: timeframe === tf ? '1px solid rgba(34,224,200,0.25)' : '1px solid transparent',
              }}
              aria-pressed={timeframe === tf}
              id={`chart-tf-${tf}`}
            >
              {tf}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="live-dot" />
          <span className="text-xs" style={{ color: '#647079' }}>Live</span>
          <div
            className="px-2 py-0.5 rounded text-xs font-semibold"
            style={{
              background: 'rgba(34,224,200,0.1)',
              border: '1px solid rgba(34,224,200,0.25)',
              color: '#22E0C8',
              fontFamily: 'var(--font-mono)',
            }}
          >
            +12.4%
          </div>
        </div>
      </div>

      {/* Price labels (Y axis) */}
      <div className="flex" style={{ height: 280 }}>
        <div
          className="flex flex-col justify-between py-2 pr-2 text-right flex-shrink-0"
          style={{ width: 64 }}
        >
          {['$0.0001', '$0.00008', '$0.00006', '$0.00004', '$0.00002'].map((p) => (
            <span
              key={p}
              className="text-[10px]"
              style={{ color: '#647079', fontFamily: 'var(--font-mono)' }}
            >
              {p}
            </span>
          ))}
        </div>

        {/* Chart area */}
        <div className="flex-1 relative">
          <ChartSVG timeframe={timeframe} />
        </div>
      </div>

      {/* X-axis labels */}
      <div
        className="flex justify-between px-16 py-2"
        style={{ borderTop: '1px solid #1F262A' }}
      >
        {['12:00', '12:10', '12:20', '12:30', '12:40', '12:50', '13:00', '13:10', '13:20', '13:30'].map((t) => (
          <span
            key={t}
            className="text-[10px]"
            style={{ color: '#647079', fontFamily: 'var(--font-mono)' }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
