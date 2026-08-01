'use client';

import React from 'react';
import type { Token } from '@/lib/mock-data';
import { formatAddress, formatMcap, formatNumber } from '@/lib/mock-data';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import type { TokenTag, TokenType } from '@/lib/mock-data';

interface TokenHeaderProps {
  token: Token;
}

const CopyIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const TelegramIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.012 9.477c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L6.972 14.9l-2.95-.924c-.642-.204-.657-.642.136-.953l11.527-4.448c.537-.194 1.006.131.877.673z" />
  </svg>
);

const WebsiteIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
  </svg>
);

export default function TokenHeader({ token }: TokenHeaderProps) {
  const caDisplay = `${token.contractAddress.slice(0, 10)}...${token.contractAddress.slice(-6)}`;

  return (
    <div
      className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 sm:p-6 flex-wrap"
      style={{ borderBottom: '1px solid #1F262A' }}
    >
      {/* Avatar */}
      <Avatar gradient={token.avatarGradient} symbol={token.symbol} size={72} />

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col gap-2">
        {/* Name + Symbol + Tags */}
        <div className="flex items-center gap-3 flex-wrap">
          <h1
            className="text-2xl font-black leading-tight"
            style={{ color: '#E8EEF0', fontFamily: 'var(--font-display)' }}
          >
            {token.name}
          </h1>
          <span
            className="text-base font-semibold"
            style={{ color: '#647079', fontFamily: 'var(--font-mono)' }}
          >
            ({token.symbol})
          </span>
          {token.tags.map((tag) => (
            <Badge key={tag} variant={tag as TokenTag}>
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
            </Badge>
          ))}
          <Badge variant={token.type as TokenType}>
            {token.type.charAt(0).toUpperCase() + token.type.slice(1)}
          </Badge>
        </div>

        {/* MCAP + Price */}
        <div className="flex items-center gap-4 sm:gap-6 flex-wrap mt-2 sm:mt-0">
          <div className="flex flex-col gap-0.5">
            <span className="text-xs" style={{ color: '#647079' }}>Market Cap</span>
            <span
              className="text-lg font-bold"
              style={{ color: '#22E0C8', fontFamily: 'var(--font-mono)' }}
            >
              {formatMcap(token.mcap)}
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs" style={{ color: '#647079' }}>Price</span>
            <span
              className="text-base font-semibold"
              style={{ color: '#E8EEF0', fontFamily: 'var(--font-mono)' }}
            >
              ${token.price.toFixed(token.price < 0.001 ? 10 : 6)}
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs" style={{ color: '#647079' }}>Holders</span>
            <span
              className="text-base font-semibold"
              style={{ color: '#E8EEF0', fontFamily: 'var(--font-mono)' }}
            >
              {formatNumber(token.holders)}
            </span>
          </div>
        </div>

        {/* Contract address */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs" style={{ color: '#647079' }}>CA:</span>
          <div
            className="flex items-center gap-2 px-2.5 py-1 rounded-lg"
            style={{
              background: '#0E1113',
              border: '1px solid #1F262A',
            }}
          >
            <span
              className="text-xs"
              style={{ color: '#E8EEF0', fontFamily: 'var(--font-mono)' }}
            >
              {caDisplay}
            </span>
            <button
              className="transition-colors duration-150"
              style={{ color: '#647079' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#22E0C8')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#647079')}
              aria-label="Copy contract address"
              title="Copy contract address"
            >
              <CopyIcon />
            </button>
          </div>

          {/* Creator */}
          <span className="text-xs" style={{ color: '#647079' }}>
            dev: <span style={{ color: '#647079', fontFamily: 'var(--font-mono)' }}>
              {formatAddress(token.creator)}
            </span>
          </span>
        </div>

        {/* Social links */}
        <div className="flex items-center gap-2">
          {token.website && (
            <a
              href={token.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-150"
              style={{
                background: '#0E1113',
                border: '1px solid #1F262A',
                color: '#647079',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = '#22E0C8';
                (e.currentTarget as HTMLAnchorElement).style.color = '#22E0C8';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = '#1F262A';
                (e.currentTarget as HTMLAnchorElement).style.color = '#647079';
              }}
            >
              <WebsiteIcon /> Website
            </a>
          )}
          {token.twitter && (
            <a
              href={token.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-150"
              style={{ background: '#0E1113', border: '1px solid #1F262A', color: '#647079' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = '#2FC8E8';
                (e.currentTarget as HTMLAnchorElement).style.color = '#2FC8E8';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = '#1F262A';
                (e.currentTarget as HTMLAnchorElement).style.color = '#647079';
              }}
            >
              <TwitterIcon /> Twitter
            </a>
          )}
          {token.telegram && (
            <a
              href={token.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-150"
              style={{ background: '#0E1113', border: '1px solid #1F262A', color: '#647079' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = '#2FC8E8';
                (e.currentTarget as HTMLAnchorElement).style.color = '#2FC8E8';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = '#1F262A';
                (e.currentTarget as HTMLAnchorElement).style.color = '#647079';
              }}
            >
              <TelegramIcon /> Telegram
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
