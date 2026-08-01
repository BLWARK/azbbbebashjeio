'use client';

import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

// ── HeroBanner ────────────────────────────────────────────────────
export default function HeroBanner() {
  return (
    <section
      className="relative flex flex-col items-center justify-center overflow-hidden w-full"
      style={{
        minHeight: 520,
        background: '#050708',
        borderBottom: '1px solid rgba(34,224,200,0.1)',
      }}
    >
      {/* Dynamic CSS injections */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(var(--r, 0deg)); }
          50% { transform: translateY(-20px) rotate(calc(var(--r, 0deg) + 2deg)); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.3; transform: scale(1) translate(-50%, -50%); }
          50% { opacity: 0.5; transform: scale(1.1) translate(-50%, -50%); }
        }
        .hero-glass {
          background: rgba(14, 17, 19, 0.4);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.4);
        }
        .hero-grid {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: radial-gradient(circle at center, black 10%, transparent 80%);
          -webkit-mask-image: radial-gradient(circle at center, black 10%, transparent 80%);
          z-index: 0;
        }
        .text-glow {
          text-shadow: 0 0 40px rgba(34, 224, 200, 0.4);
        }
      `}</style>

      {/* Grid Background */}
      <div className="hero-grid" />

      {/* Massive Center Orbs */}
      <div
        className="absolute left-1/2 top-1/2 pointer-events-none"
        style={{
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,224,200,0.15) 0%, transparent 60%)',
          animation: 'pulseGlow 8s ease-in-out infinite',
          transformOrigin: 'top left',
          zIndex: 0,
        }}
      />
      <div
        className="absolute left-1/2 top-1/2 pointer-events-none"
        style={{
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(62,123,240,0.15) 0%, transparent 60%)',
          animation: 'pulseGlow 12s ease-in-out infinite reverse',
          transformOrigin: 'top left',
          zIndex: 0,
        }}
      />

      {/* ── Main Content Container ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl w-full mx-auto mt-8">
        
        {/* Subtle top badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-8"
          style={{
            background: 'linear-gradient(90deg, rgba(34,224,200,0.1), rgba(62,123,240,0.1))',
            border: '1px solid rgba(34,224,200,0.2)',
            color: '#22E0C8',
            boxShadow: '0 0 20px rgba(34,224,200,0.2)',
          }}
        >
          <div className="live-dot" style={{ width: 6, height: 6 }} />
          The New Standard of Memecoins
        </div>

        {/* Massive Headline */}
        <h1
          className="text-4xl sm:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tighter mb-6"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          <span style={{ color: '#E8EEF0' }}>Launch. Trade.</span>
          <br />
          <span
            className="text-glow"
            style={{
              background: 'linear-gradient(135deg, #22E0C8 0%, #2FC8E8 40%, #3E7BF0 72%, #7B5BE0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Dominate.
          </span>
        </h1>

        <p
          className="text-base sm:text-lg max-w-2xl mx-auto mb-10"
          style={{ color: '#8A99A8', lineHeight: 1.6 }}
        >
          Skip the presale. No team allocations. No rug pulls. 
          Azura is a decentralized launchpad powered by absolute fairness and pure bonding curves.
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center justify-center gap-4 flex-wrap w-full max-w-sm mx-auto">
          <Link href="/create" className="w-full sm:w-auto">
            <Button
              variant="primary"
              size="lg"
              className="w-full text-base"
              style={{
                boxShadow: '0 0 30px rgba(34,224,200,0.3)',
                padding: '0 32px',
                height: 56,
              }}
            >
              🚀 Launch Token Now
            </Button>
          </Link>
          <Link href="#explore" className="w-full sm:w-auto">
            <Button
              variant="ghost"
              size="lg"
              className="w-full text-base"
              style={{ height: 56, border: '1px solid #1F262A', background: 'rgba(21, 26, 29, 0.5)' }}
            >
              Explore Tokens
            </Button>
          </Link>
        </div>
      </div>

      {/* ── Glass Statistics Bar ── */}
      <div
        className="relative z-10 hero-glass w-[90%] max-w-5xl rounded-2xl mx-auto mt-16 p-6 mb-8 flex items-center justify-between flex-wrap gap-6"
      >
        <StatBlock label="Volume 24H" value="$48.2M" />
        <div className="hidden sm:block w-px h-10" style={{ background: 'rgba(255,255,255,0.1)' }} />
        <StatBlock label="Tokens Live" value="12,847" />
        <div className="hidden sm:block w-px h-10" style={{ background: 'rgba(255,255,255,0.1)' }} />
        <StatBlock label="Graduated" value="284" />
        <div className="hidden sm:block w-px h-10" style={{ background: 'rgba(255,255,255,0.1)' }} />
        <StatBlock label="Total Liquidity" value="$112.5M" highlight />
      </div>
    </section>
  );
}

function StatBlock({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex flex-col gap-1 text-center flex-1 min-w-[120px]">
      <span
        className="text-2xl sm:text-3xl font-bold tracking-tight"
        style={{
          color: highlight ? '#22E0C8' : '#E8EEF0',
          fontFamily: 'var(--font-mono)',
          textShadow: highlight ? '0 0 20px rgba(34,224,200,0.3)' : 'none',
        }}
      >
        {value}
      </span>
      <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#647079' }}>
        {label}
      </span>
    </div>
  );
}
