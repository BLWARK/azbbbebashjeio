import React from 'react';

interface ProgressBarProps {
  /** 0–100 */
  value: number;
  height?: number;
  showLabel?: boolean;
  className?: string;
}

export default function ProgressBar({
  value,
  height = 4,
  showLabel = false,
  className = '',
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {showLabel && (
        <div className="flex justify-between text-xs" style={{ color: '#647079' }}>
          <span>Bonding Progress</span>
          <span style={{ color: '#22E0C8', fontFamily: 'var(--font-mono)' }}>{clamped}%</span>
        </div>
      )}
      <div
        className="progress-track w-full"
        style={{ height }}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="progress-fill h-full"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
