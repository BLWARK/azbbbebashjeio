import React from 'react';
import ProgressBar from '@/components/ui/ProgressBar';

interface BondingCurveProps {
  progress: number;
}

// BNB needed to graduate (static placeholder)
const GRADUATION_BNB = 100;

export default function BondingCurve({ progress }: BondingCurveProps) {
  const bnbRaised = ((progress / 100) * GRADUATION_BNB).toFixed(1);
  const isNearGrad = progress >= 80;
  const isGraduated = progress >= 100;

  return (
    <div className="flex flex-col gap-3 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold" style={{ color: '#E8EEF0' }}>
          Bonding Curve
        </span>
        {isNearGrad && !isGraduated && (
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded"
            style={{
              background: 'rgba(34,224,200,0.1)',
              border: '1px solid rgba(34,224,200,0.25)',
              color: '#22E0C8',
            }}
          >
            🚀 Graduating Soon!
          </span>
        )}
        {isGraduated && (
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded"
            style={{
              background: 'rgba(34,224,200,0.1)',
              border: '1px solid rgba(34,224,200,0.25)',
              color: '#22E0C8',
            }}
          >
            ✅ Graduated
          </span>
        )}
      </div>

      {/* Progress bar */}
      <div className="flex flex-col gap-1.5">
        <ProgressBar value={progress} height={8} />
        {/* Tick marks */}
        <div className="flex justify-between">
          {[0, 25, 50, 75, 100].map((tick) => (
            <span
              key={tick}
              className="text-[10px] tabular-nums"
              style={{ color: tick <= progress ? '#22E0C8' : '#647079', fontFamily: 'var(--font-mono)' }}
            >
              {tick}%
            </span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div
        className="grid gap-3 pt-2"
        style={{ gridTemplateColumns: '1fr 1fr', borderTop: '1px solid #1F262A' }}
      >
        <div className="flex flex-col gap-0.5">
          <span className="text-xs" style={{ color: '#647079' }}>Progress</span>
          <span
            className="text-sm font-bold tabular-nums"
            style={{
              color: isNearGrad ? '#22E0C8' : '#E8EEF0',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {progress}%
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-xs" style={{ color: '#647079' }}>BNB Raised</span>
          <span
            className="text-sm font-bold tabular-nums"
            style={{ color: '#E8EEF0', fontFamily: 'var(--font-mono)' }}
          >
            {bnbRaised} / {GRADUATION_BNB}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs leading-relaxed" style={{ color: '#647079' }}>
        {isGraduated
          ? 'This token has graduated! It is now tradeable on PancakeSwap with full liquidity.'
          : `When the market cap reaches ${GRADUATION_BNB} BNB, all liquidity will be deposited on PancakeSwap and locked forever.`}
      </p>
    </div>
  );
}
