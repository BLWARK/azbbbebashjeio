import React from 'react';
import type { Token, TokenTag, TokenType } from '@/lib/mock-data';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import ProgressBar from '@/components/ui/ProgressBar';
import { formatMcap, formatAddress, formatChange, formatNumber } from '@/lib/mock-data';
import Link from 'next/link';

interface TokenCardProps {
  token: Token;
}

// ── Inline mini price chart (fake SVG sparkline) ──────────────────
function Sparkline({ positive }: { positive: boolean }) {
  const color = positive ? '#22E0C8' : '#FF5C4D';
  // Two preset paths for up/down trends
  const upPath = 'M0,18 C5,17 8,15 12,12 C16,9 20,11 24,8 C28,5 32,7 36,4 C40,2 44,3 48,1';
  const downPath = 'M0,1 C4,3 8,2 12,5 C16,8 20,6 24,10 C28,13 32,11 36,14 C40,17 44,16 48,18';
  const path = positive ? upPath : downPath;

  return (
    <svg width="48" height="20" viewBox="0 0 48 20" fill="none" className="flex-shrink-0">
      <defs>
        <linearGradient id={`sg-${positive ? 'up' : 'down'}`} x1="0" y1="0" x2="48" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor={positive ? '#22E0C8' : '#FF5C4D'} />
          <stop offset="1" stopColor={positive ? '#3E7BF0' : '#7B5BE0'} />
        </linearGradient>
      </defs>
      <path
        d={path}
        stroke={`url(#sg-${positive ? 'up' : 'down'})`}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function TokenCard({ token }: TokenCardProps) {
  const isPositive = token.priceChange24h >= 0;

  return (
    <Link href={`/token/${token.id}`} className="block" tabIndex={0}>
      <article className="token-card p-4 flex flex-col gap-3" aria-label={`${token.name} token card`}>
        {/* ── Row 1: Avatar + Name + Change ────────────────────── */}
        <div className="flex items-start gap-3">
          <Avatar
            gradient={token.avatarGradient}
            symbol={token.symbol}
            size={52}
          />
          <div className="flex-1 min-w-0 flex flex-col gap-0.5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-col min-w-0">
                <span
                  className="text-sm font-bold leading-tight truncate"
                  style={{ color: '#E8EEF0' }}
                >
                  {token.name}
                </span>
                <span
                  className="text-xs leading-tight"
                  style={{ color: '#647079', fontFamily: 'var(--font-mono)' }}
                >
                  {token.symbol}
                </span>
              </div>
              {/* 24h change + sparkline */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <Sparkline positive={isPositive} />
                <span
                  className="text-xs font-bold tabular-nums"
                  style={{
                    color: isPositive ? '#22E0C8' : '#FF5C4D',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {formatChange(token.priceChange24h)}
                </span>
              </div>
            </div>

            {/* Creator */}
            <span
              className="text-xs truncate"
              style={{ color: '#647079' }}
              title={token.creator}
            >
              dev: {formatAddress(token.creator)}
            </span>
          </div>
        </div>

        {/* ── Row 2: Tags ──────────────────────────────────────── */}
        {token.tags.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap">
            {token.tags.map((tag) => (
              <Badge key={tag} variant={tag as TokenTag}>
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </Badge>
            ))}
          </div>
        )}

        {/* ── Row 3: Type + Created ────────────────────────────── */}
        <div className="flex items-center justify-between">
          <Badge variant={token.type as TokenType}>
            {token.type.charAt(0).toUpperCase() + token.type.slice(1)}
          </Badge>
          <span
            className="text-xs"
            style={{ color: '#647079', fontFamily: 'var(--font-mono)' }}
          >
            {token.createdAt}
          </span>
        </div>

        {/* ── Row 4: MCAP + Holders + Replies ─────────────────── */}
        <div
          className="flex items-center justify-between text-xs pt-1"
          style={{ borderTop: '1px solid #1F262A' }}
        >
          <div className="flex flex-col gap-0.5">
            <span style={{ color: '#647079' }}>MCAP</span>
            <span
              style={{ color: '#E8EEF0', fontFamily: 'var(--font-mono)', fontWeight: 600 }}
            >
              {formatMcap(token.mcap)}
            </span>
          </div>
          <div className="flex flex-col gap-0.5 text-center">
            <span style={{ color: '#647079' }}>Holders</span>
            <span
              style={{ color: '#E8EEF0', fontFamily: 'var(--font-mono)', fontWeight: 600 }}
            >
              {formatNumber(token.holders)}
            </span>
          </div>
          <div className="flex flex-col gap-0.5 text-right">
            <span style={{ color: '#647079' }}>💬 Replies</span>
            <span
              style={{ color: '#E8EEF0', fontFamily: 'var(--font-mono)', fontWeight: 600 }}
            >
              {token.replies}
            </span>
          </div>
        </div>

        {/* ── Row 5: Bonding Progress ──────────────────────────── */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs">
            <span style={{ color: '#647079' }}>
              {token.graduated ? '✅ Graduated' : 'Bonding Curve'}
            </span>
            <span
              style={{
                color: token.graduated ? '#22E0C8' : token.bondingProgress >= 80 ? '#22E0C8' : '#647079',
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
              }}
            >
              {token.bondingProgress}%
            </span>
          </div>
          <ProgressBar value={token.bondingProgress} height={3} />
        </div>
      </article>
    </Link>
  );
}
