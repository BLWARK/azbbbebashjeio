import React from 'react';
import { TOP_HOLDERS } from '@/lib/mock-data';

export default function TopHolders() {
  const maxPct = TOP_HOLDERS[0]?.percentage ?? 100;

  return (
    <div
      className="flex flex-col"
      style={{
        background: '#0E1113',
        border: '1px solid #1F262A',
        borderRadius: 8,
        overflow: 'hidden',
        marginTop: 12,
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: '1px solid #1F262A' }}
      >
        <span className="text-sm font-semibold" style={{ color: '#E8EEF0' }}>
          Top Holders
        </span>
        <span className="text-xs" style={{ color: '#647079' }}>
          Distribution
        </span>
      </div>

      {/* Holders list */}
      <div>
        {TOP_HOLDERS.map((holder) => (
          <div
            key={holder.rank}
            className="flex items-center gap-3 px-4 py-2.5"
            style={{ borderBottom: '1px solid rgba(31,38,42,0.5)' }}
          >
            {/* Rank */}
            <span
              className="text-xs tabular-nums flex-shrink-0 w-4 text-right"
              style={{ color: '#647079', fontFamily: 'var(--font-mono)' }}
            >
              {holder.rank}
            </span>

            {/* Address */}
            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span
                  className="text-xs truncate"
                  style={{
                    color: holder.isBonding ? '#3E7BF0' : holder.isCreator ? '#FF5C4D' : '#E8EEF0',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {holder.address}
                </span>
                {holder.isBonding && (
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded flex-shrink-0"
                    style={{
                      background: 'rgba(62,123,240,0.12)',
                      border: '1px solid rgba(62,123,240,0.25)',
                      color: '#3E7BF0',
                    }}
                  >
                    curve
                  </span>
                )}
                {holder.isCreator && (
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded flex-shrink-0"
                    style={{
                      background: 'rgba(255,92,77,0.1)',
                      border: '1px solid rgba(255,92,77,0.25)',
                      color: '#FF5C4D',
                    }}
                  >
                    dev
                  </span>
                )}
              </div>

              {/* Bar */}
              <div
                className="mt-1 rounded-full overflow-hidden"
                style={{ height: 2, background: '#1F262A' }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(holder.percentage / maxPct) * 100}%`,
                    background: holder.isBonding
                      ? 'linear-gradient(90deg, #3E7BF0, #7B5BE0)'
                      : holder.isCreator
                      ? '#FF5C4D'
                      : 'linear-gradient(90deg, #22E0C8, #3E7BF0)',
                  }}
                />
              </div>
            </div>

            {/* Percentage */}
            <span
              className="text-xs tabular-nums flex-shrink-0 font-semibold"
              style={{
                color: holder.isBonding ? '#3E7BF0' : holder.isCreator ? '#FF5C4D' : '#647079',
                fontFamily: 'var(--font-mono)',
                minWidth: 36,
                textAlign: 'right',
              }}
            >
              {holder.percentage.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
