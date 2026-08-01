'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import BondingCurve from './BondingCurve';
import type { Token } from '@/lib/mock-data';

interface TradeWidgetProps {
  token: Token;
}

type TradeMode = 'buy' | 'sell';

const QUICK_AMOUNTS_BNB = [0.1, 0.5, 1, 2];

export default function TradeWidget({ token }: TradeWidgetProps) {
  const [mode, setMode]           = useState<TradeMode>('buy');
  const [amount, setAmount]       = useState('');
  const [slippage, setSlippage]   = useState('1');
  const [showSlip, setShowSlip]   = useState(false);

  const isBuy = mode === 'buy';
  const accentColor = isBuy ? '#22E0C8' : '#FF5C4D';

  const estimatedTokens = amount
    ? (parseFloat(amount) / token.price / 1_000_000).toFixed(2) + 'M'
    : '—';

  return (
    <div
      className="flex flex-col gap-0"
      style={{
        background: '#0E1113',
        border: '1px solid #1F262A',
        borderRadius: 8,
        overflow: 'hidden',
      }}
    >
      {/* Buy / Sell tabs */}
      <div className="flex" style={{ borderBottom: '1px solid #1F262A' }}>
        {(['buy', 'sell'] as TradeMode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className="flex-1 py-3 text-sm font-bold capitalize transition-all duration-200"
            style={{
              background: mode === m
                ? m === 'buy' ? 'rgba(34,224,200,0.08)' : 'rgba(255,92,77,0.08)'
                : 'transparent',
              color: mode === m
                ? m === 'buy' ? '#22E0C8' : '#FF5C4D'
                : '#647079',
              borderBottom: mode === m ? `2px solid ${m === 'buy' ? '#22E0C8' : '#FF5C4D'}` : '2px solid transparent',
            }}
            aria-selected={mode === m}
            id={`trade-${m}-tab`}
          >
            {m === 'buy' ? '↑ Buy' : '↓ Sell'}
          </button>
        ))}
      </div>

      {/* Body */}
      <div className="flex flex-col gap-4 p-4">
        {/* Currency toggle */}
        <div className="flex items-center gap-2 text-xs" style={{ color: '#647079' }}>
          <span>Switch to</span>
          <button
            className="px-2 py-0.5 rounded text-xs font-medium transition-colors duration-150"
            style={{
              background: '#151A1D',
              border: '1px solid #1F262A',
              color: '#E8EEF0',
            }}
          >
            {isBuy ? token.symbol : 'BNB'} →
          </button>
        </div>

        {/* Amount input */}
        <div>
          <div
            className="flex items-center gap-2 rounded-lg px-3"
            style={{
              background: '#151A1D',
              border: `1px solid ${amount ? accentColor + '40' : '#1F262A'}`,
              height: 48,
            }}
          >
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1 bg-transparent text-base font-semibold outline-none tabular-nums"
              style={{ color: '#E8EEF0', caretColor: accentColor }}
              aria-label={`Amount in ${isBuy ? 'BNB' : token.symbol}`}
            />
            <span
              className="text-sm font-semibold flex-shrink-0"
              style={{ color: '#647079', fontFamily: 'var(--font-mono)' }}
            >
              {isBuy ? 'BNB' : token.symbol}
            </span>
          </div>

          {/* Quick amounts */}
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => setAmount('')}
              className="px-2.5 py-1 rounded text-xs font-medium transition-colors duration-150"
              style={{
                background: '#151A1D',
                border: '1px solid #1F262A',
                color: '#647079',
              }}
            >
              Reset
            </button>
            {QUICK_AMOUNTS_BNB.map((q) => (
              <button
                key={q}
                onClick={() => setAmount(String(q))}
                className="flex-1 py-1 rounded text-xs font-semibold transition-all duration-150"
                style={{
                  background: amount === String(q) ? 'rgba(34,224,200,0.1)' : '#151A1D',
                  border: `1px solid ${amount === String(q) ? 'rgba(34,224,200,0.3)' : '#1F262A'}`,
                  color: amount === String(q) ? '#22E0C8' : '#647079',
                }}
              >
                {q} BNB
              </button>
            ))}
          </div>
        </div>

        {/* Estimated output */}
        {amount && (
          <div
            className="flex items-center justify-between px-3 py-2 rounded-lg text-xs"
            style={{ background: '#151A1D', border: '1px solid #1F262A' }}
          >
            <span style={{ color: '#647079' }}>
              {isBuy ? 'You receive ~' : 'You get ~'}
            </span>
            <span
              style={{ color: accentColor, fontFamily: 'var(--font-mono)', fontWeight: 600 }}
            >
              {isBuy ? `${estimatedTokens} ${token.symbol}` : `${(parseFloat(amount) * token.price * 0.98).toFixed(4)} BNB`}
            </span>
          </div>
        )}

        {/* Slippage */}
        <div>
          <button
            onClick={() => setShowSlip((v) => !v)}
            className="flex items-center justify-between w-full text-xs transition-colors duration-150"
            style={{ color: '#647079' }}
            aria-expanded={showSlip}
          >
            <span>Slippage: {slippage}%</span>
            <span style={{ transform: showSlip ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
              ▾
            </span>
          </button>
          {showSlip && (
            <div className="flex gap-2 mt-2">
              {['0.5', '1', '2', '5'].map((s) => (
                <button
                  key={s}
                  onClick={() => setSlippage(s)}
                  className="flex-1 py-1 rounded text-xs font-semibold transition-all duration-150"
                  style={{
                    background: slippage === s ? 'rgba(34,224,200,0.1)' : '#151A1D',
                    border: `1px solid ${slippage === s ? 'rgba(34,224,200,0.3)' : '#1F262A'}`,
                    color: slippage === s ? '#22E0C8' : '#647079',
                  }}
                >
                  {s}%
                </button>
              ))}
            </div>
          )}
        </div>

        {/* CTA Button */}
        <Button
          variant={isBuy ? 'primary' : 'danger'}
          size="lg"
          fullWidth
          id="trade-submit-btn"
          style={isBuy ? {} : { background: '#FF5C4D', color: '#fff', fontWeight: 700 }}
        >
          {isBuy ? '🔗 Connect Wallet to Buy' : '🔗 Connect Wallet to Sell'}
        </Button>

        <p className="text-[10px] text-center" style={{ color: '#647079' }}>
          1% fee goes to Azura protocol treasury
        </p>
      </div>

      {/* Divider */}
      <div style={{ borderTop: '1px solid #1F262A' }}>
        <BondingCurve progress={token.bondingProgress} />
      </div>
    </div>
  );
}
