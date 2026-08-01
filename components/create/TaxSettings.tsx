'use client';

import React, { useState } from 'react';
import Switch from '@/components/ui/Switch';
import Input from '@/components/ui/Input';

export default function TaxSettings() {
  const [enabled, setEnabled]     = useState(false);
  const [buyTax, setBuyTax]       = useState('1');
  const [sellTax, setSellTax]     = useState('1');
  const [treasury, setTreasury]   = useState('50');
  const [liquidity, setLiquidity] = useState('30');
  const [burn, setBurn]           = useState('20');

  const total = (
    parseFloat(treasury || '0') +
    parseFloat(liquidity || '0') +
    parseFloat(burn || '0')
  );
  const isBalanced = Math.abs(total - 100) < 0.01;

  return (
    <div
      className="flex flex-col gap-3 rounded-xl overflow-hidden"
      style={{
        border: `1px solid ${enabled ? 'rgba(123,91,224,0.3)' : '#1F262A'}`,
        background: enabled ? 'rgba(123,91,224,0.03)' : '#0E1113',
        transition: 'border-color 0.2s ease, background 0.2s ease',
      }}
    >
      {/* Toggle header */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: enabled ? '1px solid rgba(123,91,224,0.15)' : '1px solid #1F262A' }}
      >
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-semibold" style={{ color: '#E8EEF0' }}>
            Tax Configuration
          </span>
          <span className="text-xs" style={{ color: '#647079' }}>
            Apply buy/sell taxes with auto-allocation
          </span>
        </div>
        <Switch
          checked={enabled}
          onChange={setEnabled}
          id="tax-enabled"
        />
      </div>

      {/* Expanded settings */}
      {enabled && (
        <div className="flex flex-col gap-4 px-4 pb-4">
          {/* Buy / Sell tax rates */}
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Buy Tax (%)"
              type="number"
              min="0"
              max="25"
              step="0.1"
              value={buyTax}
              onChange={(e) => setBuyTax(e.target.value)}
              suffix="%"
              hint="Max 25%"
              id="tax-buy"
            />
            <Input
              label="Sell Tax (%)"
              type="number"
              min="0"
              max="25"
              step="0.1"
              value={sellTax}
              onChange={(e) => setSellTax(e.target.value)}
              suffix="%"
              hint="Max 25%"
              id="tax-sell"
            />
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'rgba(123,91,224,0.15)' }} />

          {/* Allocation sliders */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between text-xs">
              <span style={{ color: '#647079' }}>Tax Allocation</span>
              <span
                style={{
                  color: isBalanced ? '#22E0C8' : '#FF5C4D',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                }}
              >
                {total.toFixed(0)}% {isBalanced ? '✓' : '≠ 100%'}
              </span>
            </div>

            {/* Treasury */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-xs">
                <span style={{ color: '#647079' }}>🏦 Treasury</span>
                <span style={{ color: '#7B5BE0', fontFamily: 'var(--font-mono)' }}>
                  {treasury}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={treasury}
                onChange={(e) => setTreasury(e.target.value)}
                className="w-full"
                style={{ accentColor: '#7B5BE0' }}
                aria-label="Treasury allocation percentage"
              />
            </div>

            {/* Liquidity */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-xs">
                <span style={{ color: '#647079' }}>💧 Auto-Liquidity</span>
                <span style={{ color: '#3E7BF0', fontFamily: 'var(--font-mono)' }}>
                  {liquidity}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={liquidity}
                onChange={(e) => setLiquidity(e.target.value)}
                className="w-full"
                style={{ accentColor: '#3E7BF0' }}
                aria-label="Auto-liquidity allocation percentage"
              />
            </div>

            {/* Burn */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-xs">
                <span style={{ color: '#647079' }}>🔥 Burn</span>
                <span style={{ color: '#22E0C8', fontFamily: 'var(--font-mono)' }}>
                  {burn}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={burn}
                onChange={(e) => setBurn(e.target.value)}
                className="w-full"
                style={{ accentColor: '#22E0C8' }}
                aria-label="Burn allocation percentage"
              />
            </div>

            {/* Warning if not balanced */}
            {!isBalanced && (
              <p className="text-[10px] mt-1" style={{ color: '#FF5C4D' }}>
                ⚠ Allocations must sum to 100%. Currently {total.toFixed(0)}%.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
