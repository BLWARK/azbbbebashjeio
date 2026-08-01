import React from 'react';
import type { Token, TokenTag, TokenType } from '@/lib/mock-data';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import ProgressBar from '@/components/ui/ProgressBar';
import LiveNumber from '@/components/ui/LiveNumber';
import { formatMcap, formatAddress, formatChange, formatNumber } from '@/lib/mock-data';
import Link from 'next/link';
import { useLiveToken } from '@/hooks/useLiveToken';

interface TokenCardProps {
  token: Token;
}

// ── Small chain icon (Binance / BNB style) ──────────────────────
const ChainIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0l3.81 3.812-1.928 1.928L12 3.812 8.118 5.74 6.19 3.812 12 0zm0 7.74l3.81 3.812-3.81 3.812-3.81-3.812L12 7.74zm5.74 1.928L24 13.48l-6.26 6.26-1.928-1.928 4.332-4.332-4.332-4.332 1.928-1.928zM0 13.48l6.26-6.26 1.928 1.928L3.856 13.48l4.332 4.332-1.928 1.928L0 13.48zm12 6.708l3.81-3.812 1.928 1.928L12 24l-5.74-5.74 1.928-1.928L12 20.188z" />
  </svg>
);

export default function TokenCard({ token: initialToken }: TokenCardProps) {
  const token = useLiveToken(initialToken);
  const isPositive = token.priceChange24h >= 0;

  return (
    <Link href={`/token/${token.id}`} className="block" tabIndex={0}>
      <article
        className="token-card flex gap-4 p-3 rounded-xl transition-colors duration-200"
        style={{
          background: '#0E1113',
          border: '1px solid #1F262A',
        }}
        aria-label={`${token.name} token card`}
      >
        {/* ── Left: Huge Avatar with overlapping badge ────────────────────── */}
        <div className="relative flex-shrink-0" style={{ width: 140, height: 140 }}>
          <Avatar
            gradient={token.avatarGradient}
            symbol={token.symbol}
            size={140}
            src={token.imageSrc}
          />
          
          {/* Network Badge (Overlapping bottom right) */}
          <div
            className="absolute -bottom-1.5 -right-1.5 rounded-full flex items-center justify-center"
            style={{
              width: 28,
              height: 28,
              background: '#F0B90B', // BNB Yellow
              color: '#000',
              border: '2px solid #0E1113',
            }}
          >
            <ChainIcon />
          </div>
        </div>

        {/* ── Right: Details ────────────────────────────────────────────── */}
        <div className="flex-1 flex flex-col min-w-0 py-1">
          
          {/* Row 1: Title & % Change */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-baseline gap-1.5 min-w-0 truncate">
              <span className="font-bold text-sm truncate" style={{ color: '#E8EEF0' }}>
                {token.symbol}
              </span>
              <span className="text-[11px] truncate" style={{ color: '#647079' }}>
                {token.name}
              </span>
            </div>
            
            {/* Price Change Pill */}
            <div
              className="flex-shrink-0 px-1.5 py-0.5 rounded text-[10px] font-bold tabular-nums"
              style={{
                background: isPositive ? 'rgba(34, 224, 200, 0.1)' : 'rgba(255, 92, 77, 0.1)',
                color: isPositive ? '#22E0C8' : '#FF5C4D',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {formatChange(token.priceChange24h)}
            </div>
          </div>

          {/* Row 2: Badges */}
          <div className="flex gap-1.5 flex-wrap mt-2">
            {token.tags.map((tag) => (
              <Badge key={tag} variant={tag as TokenTag}>
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </Badge>
            ))}
            <Badge variant={token.type as TokenType}>
              {token.type.charAt(0).toUpperCase() + token.type.slice(1)}
            </Badge>
          </div>

          {/* Spacer to push stats to bottom */}
          <div className="flex-1" />

          {/* Row 3: Stats (Created By, Market Cap) */}
          <div className="flex flex-col gap-1 mt-3">
            <div className="flex items-center justify-between text-xs">
              <span style={{ color: '#647079' }}>created by:</span>
              <span
                style={{
                  color: '#E8EEF0',
                  fontFamily: 'var(--font-mono)',
                  textDecoration: 'underline',
                  textUnderlineOffset: '2px',
                  textDecorationColor: '#1F262A',
                }}
              >
                {formatAddress(token.creator)}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span style={{ color: '#647079' }}>Market Cap:</span>
              <LiveNumber
                className="px-1"
                style={{ color: '#E8EEF0', fontFamily: 'var(--font-mono)' }}
                value={formatMcap(token.mcap)}
              />
            </div>
          </div>

          {/* Row 4: Progress Bar */}
          <div className="flex flex-col mt-2">
            <div className="text-right mb-1">
              <LiveNumber
                className="text-[10px] font-bold tabular-nums px-1"
                style={{ color: '#22E0C8', fontFamily: 'var(--font-mono)' }}
                value={`${token.bondingProgress.toFixed(3)}%`}
              />
            </div>
            <ProgressBar value={token.bondingProgress} height={4} />
          </div>

        </div>
      </article>
    </Link>
  );
}
