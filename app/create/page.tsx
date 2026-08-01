'use client';

import React, { useState } from 'react';
import type { Metadata } from 'next';
import ModeSelector from '@/components/create/ModeSelector';
import FormSection from '@/components/create/FormSection';
import ImageUploader from '@/components/create/ImageUploader';
import TaxSettings from '@/components/create/TaxSettings';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

type Mode = 'classic' | 'open';

// ── Tag categories ────────────────────────────────────────────────
const CATEGORIES = [
  'Meme', 'DeFi', 'Gaming', 'NFT', 'AI', 'Animal', 'Sport',
  'Music', 'Science', 'Metaverse', 'DAO', 'Infrastructure',
];

export default function CreateTokenPage() {
  const [mode, setMode]         = useState<Mode>('classic');
  const [name, setName]         = useState('');
  const [symbol, setSymbol]     = useState('');
  const [desc, setDesc]         = useState('');
  const [website, setWebsite]   = useState('');
  const [twitter, setTwitter]   = useState('');
  const [telegram, setTelegram] = useState('');
  const [tags, setTags]         = useState<string[]>([]);
  const [initBuy, setInitBuy]   = useState('');
  const [agree, setAgree]       = useState(false);

  const toggleTag = (tag: string) =>
    setTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);

  const symbolPreview = symbol ? symbol.toUpperCase().slice(0, 8) : '???';
  const namePreview = name || 'My Token';

  return (
    <div className="flex flex-col min-h-full" style={{ background: '#050708' }}>
      {/* Page header */}
      <div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-8 py-5 gap-4 sm:gap-0"
        style={{ borderBottom: '1px solid #1F262A' }}
      >
        <div className="flex flex-col gap-1">
          <h1
            className="text-xl font-black"
            style={{
              background: 'linear-gradient(120deg, #22E0C8 0%, #2FC8E8 40%, #3E7BF0 72%, #7B5BE0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontFamily: 'var(--font-display)',
            }}
          >
            Create Token
          </h1>
          <p className="text-xs" style={{ color: '#647079' }}>
            Fair launch — no presale, no team allocation, community-owned from day one.
          </p>
        </div>

        {/* Token preview pill */}
        <div
          className="flex items-center gap-3 px-4 py-2 rounded-xl w-full sm:w-auto"
          style={{
            background: '#0E1113',
            border: '1px solid #1F262A',
          }}
        >
          <div
            className="flex items-center justify-center text-xs font-black rounded-lg"
            style={{
              width: 32,
              height: 32,
              background: 'linear-gradient(135deg, #22E0C8, #3E7BF0)',
              color: '#050708',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {symbolPreview.slice(0, 2)}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold" style={{ color: '#E8EEF0' }}>
              {namePreview}
            </span>
            <span
              className="text-xs"
              style={{ color: '#647079', fontFamily: 'var(--font-mono)' }}
            >
              ${symbolPreview}
            </span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col lg:flex-row gap-8 px-4 sm:px-8 py-6" style={{ alignItems: 'flex-start' }}>
        {/* Left — Mode selector */}
        <div className="flex-shrink-0 w-full lg:w-[220px]">
          <ModeSelector mode={mode} onChange={setMode} />

          {/* Cost info */}
          <div
            className="flex flex-col gap-2 mt-6 p-4 rounded-xl"
            style={{ background: '#0E1113', border: '1px solid #1F262A' }}
          >
            <span className="text-xs font-semibold" style={{ color: '#647079' }}>
              Estimated Cost
            </span>
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-xs">
                <span style={{ color: '#647079' }}>Deploy fee</span>
                <span style={{ color: '#E8EEF0', fontFamily: 'var(--font-mono)' }}>0.005 BNB</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span style={{ color: '#647079' }}>Initial buy</span>
                <span style={{ color: '#E8EEF0', fontFamily: 'var(--font-mono)' }}>
                  {initBuy ? `${initBuy} BNB` : '—'}
                </span>
              </div>
              <div
                className="flex items-center justify-between text-xs pt-2"
                style={{ borderTop: '1px solid #1F262A', marginTop: 4 }}
              >
                <span style={{ color: '#E8EEF0', fontWeight: 600 }}>Total</span>
                <span
                  style={{
                    color: '#22E0C8',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                  }}
                >
                  {(0.005 + parseFloat(initBuy || '0')).toFixed(3)} BNB
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right — Form */}
        <div className="flex-1 min-w-0 flex flex-col gap-8">

          {/* 01 Identity */}
          <FormSection
            number="01"
            title="Token Identity"
            description="Basic information about your token."
          >
            <div className="flex gap-4">
              {/* Image uploader */}
              <ImageUploader />

              {/* Name / Symbol / Description */}
              <div className="flex-1 flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="Token Name *"
                    placeholder="e.g. AzuraSwap"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    id="create-name"
                  />
                  <Input
                    label="Symbol *"
                    placeholder="e.g. AZURA"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                    fullWidth
                    hint="Max 8 characters"
                    id="create-symbol"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium block mb-1" style={{ color: '#647079' }}>
                    Description
                  </label>
                  <textarea
                    placeholder="Tell the community what your token is about..."
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 rounded-lg text-xs resize-none outline-none transition-all duration-200"
                    style={{
                      background: '#0E1113',
                      border: '1px solid #1F262A',
                      color: '#E8EEF0',
                      caretColor: '#22E0C8',
                      fontFamily: 'var(--font-display)',
                    }}
                    onFocus={(e) => {
                      (e.target as HTMLTextAreaElement).style.borderColor = '#22E0C8';
                    }}
                    onBlur={(e) => {
                      (e.target as HTMLTextAreaElement).style.borderColor = '#1F262A';
                    }}
                    maxLength={500}
                    id="create-description"
                  />
                  <div className="text-right mt-1">
                    <span className="text-[10px]" style={{ color: '#647079' }}>
                      {desc.length}/500
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </FormSection>

          {/* 02 Socials */}
          <FormSection
            number="02"
            title="Social Links"
            description="Help your community find you."
            optional
          >
            <div className="grid gap-3">
              <Input
                label="Website"
                placeholder="https://yourtoken.com"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                prefix="🌐"
                fullWidth
                id="create-website"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  label="Twitter / X"
                  placeholder="https://twitter.com/..."
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                  prefix="𝕏"
                  fullWidth
                  id="create-twitter"
                />
                <Input
                  label="Telegram"
                  placeholder="https://t.me/..."
                  value={telegram}
                  onChange={(e) => setTelegram(e.target.value)}
                  prefix="✈️"
                  fullWidth
                  id="create-telegram"
                />
              </div>
            </div>
          </FormSection>

          {/* 03 Classification */}
          <FormSection
            number="03"
            title="Classification"
            description="Choose categories so traders can find your token."
            optional
          >
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => {
                const isSelected = tags.includes(cat);
                return (
                  <button
                    key={cat}
                    onClick={() => toggleTag(cat)}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-150"
                    style={{
                      background: isSelected ? 'rgba(34,224,200,0.1)' : '#0E1113',
                      border: `1px solid ${isSelected ? 'rgba(34,224,200,0.35)' : '#1F262A'}`,
                      color: isSelected ? '#22E0C8' : '#647079',
                    }}
                    aria-pressed={isSelected}
                    id={`tag-${cat}`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </FormSection>

          {/* 04 Tax Settings */}
          <FormSection
            number="04"
            title="Tax Settings"
            description="Configure optional buy/sell taxes."
            optional
          >
            <TaxSettings />
          </FormSection>

          {/* 05 Launch Settings */}
          <FormSection
            number="05"
            title="Launch Settings"
            description="Set your initial token purchase."
          >
            <div className="flex flex-col gap-4">
              <Input
                label="Initial Buy Amount (BNB)"
                placeholder="0.5"
                type="number"
                min="0"
                step="0.01"
                value={initBuy}
                onChange={(e) => setInitBuy(e.target.value)}
                suffix="BNB"
                hint="Optional. Buy tokens immediately at launch for a head start."
                fullWidth
                id="create-init-buy"
              />

              {/* Quick amounts */}
              <div className="flex gap-2">
                {[0.1, 0.5, 1, 2].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setInitBuy(String(amt))}
                    className="flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150"
                    style={{
                      background: initBuy === String(amt) ? 'rgba(34,224,200,0.1)' : '#0E1113',
                      border: `1px solid ${initBuy === String(amt) ? 'rgba(34,224,200,0.35)' : '#1F262A'}`,
                      color: initBuy === String(amt) ? '#22E0C8' : '#647079',
                    }}
                    id={`create-buy-${amt}`}
                  >
                    {amt} BNB
                  </button>
                ))}
              </div>
            </div>
          </FormSection>

          {/* Terms + Launch Button */}
          <div className="flex flex-col gap-4 pb-8">
            {/* Disclaimer */}
            <div
              className="flex items-start gap-3 p-4 rounded-xl"
              style={{
                background: 'rgba(62,123,240,0.06)',
                border: '1px solid rgba(62,123,240,0.2)',
              }}
            >
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="mt-0.5"
                  style={{ accentColor: '#22E0C8' }}
                  id="create-agree"
                />
                <span className="text-xs leading-relaxed" style={{ color: '#647079' }}>
                  I understand that token launches are irreversible. I confirm I have read the{' '}
                  <span style={{ color: '#22E0C8', cursor: 'pointer' }}>Terms of Service</span>{' '}
                  and that I am responsible for this token&apos;s compliance with local regulations. This
                  is not financial advice.
                </span>
              </label>
            </div>

            {/* Launch CTA */}
            <Button
              variant="primary"
              size="lg"
              fullWidth
              disabled={!name || !symbol || !agree}
              id="create-launch-btn"
            >
              🚀 Launch Token
            </Button>

            {(!name || !symbol) && (
              <p className="text-xs text-center" style={{ color: '#647079' }}>
                Complete Token Name and Symbol to continue
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
