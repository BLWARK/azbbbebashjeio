import React from 'react';
import { TokenTag, TokenType } from '@/lib/mock-data';

type BadgeVariant = TokenTag | TokenType | 'bnb' | 'live';

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const CONFIG: Record<BadgeVariant, { bg: string; color: string; border: string; emoji?: string }> = {
  trending:  { bg: 'rgba(34,224,200,0.1)',   color: '#22E0C8', border: 'rgba(34,224,200,0.25)',   emoji: '🔥' },
  new:       { bg: 'rgba(62,123,240,0.1)',   color: '#3E7BF0', border: 'rgba(62,123,240,0.25)',   emoji: '✨' },
  graduating:{ bg: 'rgba(123,91,224,0.1)',   color: '#7B5BE0', border: 'rgba(123,91,224,0.25)',   emoji: '🚀' },
  graduated: { bg: 'rgba(34,224,200,0.08)',  color: '#22E0C8', border: 'rgba(34,224,200,0.2)',    emoji: '✅' },
  kol:       { bg: 'rgba(255,92,77,0.1)',    color: '#FF5C4D', border: 'rgba(255,92,77,0.25)',    emoji: '👑' },
  normal:    { bg: 'rgba(100,112,121,0.12)', color: '#647079', border: 'rgba(100,112,121,0.2)',              },
  tax:       { bg: 'rgba(123,91,224,0.1)',   color: '#7B5BE0', border: 'rgba(123,91,224,0.2)',               },
  open:      { bg: 'rgba(47,200,232,0.1)',   color: '#2FC8E8', border: 'rgba(47,200,232,0.2)',               },
  bnb:       { bg: 'rgba(240,185,11,0.1)',   color: '#F0B90B', border: 'rgba(240,185,11,0.2)',               },
  live:      { bg: 'rgba(34,224,200,0.1)',   color: '#22E0C8', border: 'rgba(34,224,200,0.25)',   emoji: '●' },
};

export default function Badge({ variant, children, className = '' }: BadgeProps) {
  const { bg, color, border, emoji } = CONFIG[variant] ?? CONFIG.normal;
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${className}`}
      style={{
        background: bg,
        color,
        border: `1px solid ${border}`,
      }}
    >
      {emoji && <span style={{ fontSize: 10 }}>{emoji}</span>}
      {children}
    </span>
  );
}
