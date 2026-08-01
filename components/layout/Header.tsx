'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { TRENDING_TICKERS } from '@/lib/mock-data';

// ── Icons ─────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
  </svg>
);

const GlobeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
  </svg>
);

const WalletIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12V7H5a2 2 0 010-4h14v4" />
    <path d="M3 5v14a2 2 0 002 2h16v-5" />
    <path d="M18 12a2 2 0 000 4h4v-4z" />
  </svg>
);

// ── Ticker Tape ───────────────────────────────────────────────────
function TickerTape() {
  // Duplicate array for seamless loop
  const items = [...TRENDING_TICKERS, ...TRENDING_TICKERS];

  return (
    <div
      className="overflow-hidden flex items-center"
      style={{
        background: '#0E1113',
        borderBottom: '1px solid #1F262A',
        height: 32,
        fontSize: 11,
      }}
    >
      <div className="ticker-tape">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-1 px-4">
            <span style={{ color: '#647079', fontFamily: 'var(--font-mono)' }}>
              {item.symbol}
            </span>
            <span
              style={{
                color: item.positive ? '#22E0C8' : '#FF5C4D',
                fontFamily: 'var(--font-mono)',
                fontWeight: 500,
              }}
            >
              {item.change}
            </span>
            <span style={{ color: '#1F262A', marginLeft: 8 }}>|</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Header ────────────────────────────────────────────────────────
export default function Header({ onMobileMenuToggle }: { onMobileMenuToggle?: () => void }) {
  const [search, setSearch] = useState('');

  return (
    <header
      className="flex-shrink-0 flex flex-col w-full"
      style={{ background: '#050708', borderBottom: '1px solid #1F262A' }}
    >
      {/* Ticker tape row */}
      <TickerTape />

      {/* Main header bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3">
        {/* Left — page breadcrumb / title area */}
        <div className="flex items-center gap-3">
          {onMobileMenuToggle && (
            <button
              onClick={onMobileMenuToggle}
              className="md:hidden flex items-center justify-center rounded"
              style={{ width: 32, height: 32, color: '#E8EEF0', background: '#151A1D', border: '1px solid #1F262A' }}
              aria-label="Toggle mobile menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Azura logo.png" alt="Azura Logo" className="h-6 sm:h-7 w-auto" />
        </div>

        {/* Right — search + lang + wallet */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search */}
          <div
            className="hidden sm:flex items-center gap-2 rounded-lg px-3 transition-all duration-200"
            style={{
              background: '#0E1113',
              border: '1px solid #1F262A',
              height: 36,
              width: 200,
            }}
            onFocus={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = '#22E0C8';
            }}
            onBlur={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = '#1F262A';
            }}
          >
            <span style={{ color: '#647079' }}>
              <SearchIcon />
            </span>
            <input
              type="text"
              placeholder="Search tokens..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-xs outline-none"
              style={{ color: '#E8EEF0', caretColor: '#22E0C8' }}
              aria-label="Search tokens"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="text-xs"
                style={{ color: '#647079' }}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Language */}
          <button
            className="hidden md:flex items-center gap-1.5 px-3 rounded-lg text-xs font-medium transition-colors duration-150"
            style={{
              height: 36,
              background: '#0E1113',
              border: '1px solid #1F262A',
              color: '#647079',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = '#E8EEF0';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = '#647079';
            }}
            aria-label="Select language"
          >
            <GlobeIcon />
            EN
          </button>

          {/* Create Token shortcut */}
          <Link href="/create" className="hidden sm:block">
            <Button variant="secondary" size="sm" id="header-create-token-btn">
              + Create
            </Button>
          </Link>

          {/* Connect Wallet */}
          <Button
            variant="primary"
            size="sm"
            id="header-connect-wallet-btn"
            className="px-2 sm:px-4"
          >
            <WalletIcon />
            <span className="hidden sm:inline">Connect Wallet</span>
            <span className="sm:hidden">Connect</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
