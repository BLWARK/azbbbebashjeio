import React from 'react';
import type { Token } from '@/lib/mock-data';
import { formatMcap, formatAddress, formatChange, formatVolume, formatNumber } from '@/lib/mock-data';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import ProgressBar from '@/components/ui/ProgressBar';
import Link from 'next/link';
import type { TokenTag, TokenType } from '@/lib/mock-data';

interface TokenTableProps {
  tokens: Token[];
}

interface TokenTableRowProps {
  token: Token;
  index: number;
}

function ChangeCell({ value }: { value: number }) {
  const isPositive = value >= 0;
  return (
    <span
      className="tabular-nums text-xs font-semibold"
      style={{
        color: isPositive ? '#22E0C8' : '#FF5C4D',
        fontFamily: 'var(--font-mono)',
      }}
    >
      {formatChange(value)}
    </span>
  );
}

function TokenTableRow({ token, index }: TokenTableRowProps) {
  return (
    <Link href={`/token/${token.id}`} className="block">
      <div
        className="az-table-row grid items-center px-4 py-3 transition-colors"
        style={{
          gridTemplateColumns: '32px 2fr 1fr 1fr 80px 1fr 1fr 72px 72px 72px 72px',
          gap: '12px',
        }}
      >
        {/* # */}
        <span
          className="text-xs tabular-nums"
          style={{ color: '#647079', fontFamily: 'var(--font-mono)' }}
        >
          {index + 1}
        </span>

        {/* COIN */}
        <div className="flex items-center gap-2 min-w-0">
          <Avatar gradient={token.avatarGradient} symbol={token.symbol} size={28} />
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold truncate" style={{ color: '#E8EEF0' }}>
              {token.name}
            </span>
            <span
              className="text-xs truncate"
              style={{ color: '#647079', fontFamily: 'var(--font-mono)' }}
            >
              {token.symbol}
            </span>
          </div>
          <div className="flex gap-1 flex-shrink-0">
            {token.tags.slice(0, 2).map((t) => (
              <Badge key={t} variant={t as TokenTag} className="!text-[10px] !px-1.5 !py-0">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </Badge>
            ))}
          </div>
        </div>

        {/* MCAP */}
        <span
          className="tabular-nums text-xs font-semibold"
          style={{ color: '#E8EEF0', fontFamily: 'var(--font-mono)' }}
        >
          {formatMcap(token.mcap)}
        </span>

        {/* PROGRESS */}
        <div className="flex items-center gap-2">
          <ProgressBar value={token.bondingProgress} height={3} className="flex-1" />
          <span
            className="tabular-nums text-xs flex-shrink-0"
            style={{ color: '#647079', fontFamily: 'var(--font-mono)', width: 28 }}
          >
            {token.bondingProgress}%
          </span>
        </div>

        {/* AGE */}
        <span className="text-xs" style={{ color: '#647079' }}>
          {token.createdAt}
        </span>

        {/* 24H VOL */}
        <span
          className="tabular-nums text-xs"
          style={{ color: '#E8EEF0', fontFamily: 'var(--font-mono)' }}
        >
          {formatVolume(token.volume24h)}
        </span>

        {/* HOLDERS */}
        <span
          className="tabular-nums text-xs"
          style={{ color: '#E8EEF0', fontFamily: 'var(--font-mono)' }}
        >
          {formatNumber(token.holders)}
        </span>

        {/* 5M */}
        <ChangeCell value={token.priceChange5m} />

        {/* 1H */}
        <ChangeCell value={token.priceChange1h} />

        {/* 4H */}
        <ChangeCell value={token.priceChange4h} />

        {/* 24H */}
        <ChangeCell value={token.priceChange24h} />
      </div>
    </Link>
  );
}

const TABLE_HEADERS = [
  { label: '#', span: '32px' },
  { label: 'COIN', span: '2fr' },
  { label: 'MCAP', span: '1fr' },
  { label: 'PROGRESS', span: '1fr' },
  { label: 'AGE', span: '80px' },
  { label: '24H VOL', span: '1fr' },
  { label: 'HOLDERS', span: '1fr' },
  { label: '5M', span: '72px' },
  { label: '1H', span: '72px' },
  { label: '4H', span: '72px' },
  { label: '24H', span: '72px' },
];

export default function TokenTable({ tokens }: TokenTableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[960px]">
        {/* Header row */}
        <div
          className="grid items-center px-4 py-2 sticky top-0"
        style={{
          gridTemplateColumns: '32px 2fr 1fr 1fr 80px 1fr 1fr 72px 72px 72px 72px',
          gap: '12px',
          background: '#0E1113',
          borderBottom: '1px solid #1F262A',
        }}
      >
        {TABLE_HEADERS.map(({ label }) => (
          <span
            key={label}
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: '#647079' }}
          >
            {label}
          </span>
        ))}
      </div>

      {/* Body */}
      <div>
        {tokens.map((token, i) => (
          <TokenTableRow key={token.id} token={token} index={i} />
        ))}
        {tokens.length === 0 && (
          <div className="flex items-center justify-center py-20">
            <p className="text-sm" style={{ color: '#647079' }}>
              No tokens found
            </p>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
