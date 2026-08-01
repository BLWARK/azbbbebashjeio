import React from 'react';
import type { Token } from '@/lib/mock-data';
import TokenCard from './TokenCard';

interface TokenGridProps {
  tokens: Token[];
}

export default function TokenGrid({ tokens }: TokenGridProps) {
  if (tokens.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div
          className="text-4xl"
          style={{ filter: 'grayscale(1)', opacity: 0.3 }}
        >
          🪙
        </div>
        <p className="text-sm" style={{ color: '#647079' }}>
          No tokens found
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 sm:p-6">
      {tokens.map((token, i) => (
        <div
          key={token.id}
          className="animate-fade-in"
          style={{ animationDelay: `${i * 30}ms` }}
        >
          <TokenCard token={token} />
        </div>
      ))}
    </div>
  );
}
