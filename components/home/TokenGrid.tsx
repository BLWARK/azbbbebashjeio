'use client';

import React, { useState, useEffect } from 'react';
import type { Token } from '@/lib/mock-data';
import TokenCard from './TokenCard';
import { motion, AnimatePresence } from 'framer-motion';

interface TokenGridProps {
  tokens: Token[];
}

export default function TokenGrid({ tokens: initialTokens }: TokenGridProps) {
  const [tokens, setTokens] = useState<Token[]>(initialTokens);

  // Sync with props if they change (e.g., from search/filter)
  useEffect(() => {
    setTokens(initialTokens);
  }, [initialTokens]);

  // Simulate tokens pumping to #1 or #2 periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setTokens(prev => {
        if (prev.length < 3) return prev;
        const newTokens = [...prev];
        
        // Pick a random token that isn't currently in the top 2
        const sourceIndex = Math.floor(Math.random() * (newTokens.length - 2)) + 2;
        
        // Decide randomly if it should jump to rank #1 (index 0) or rank #2 (index 1)
        const targetIndex = Math.random() > 0.5 ? 0 : 1;
        
        // Extract the token and insert it at the new top position
        const [pumpedToken] = newTokens.splice(sourceIndex, 1);
        newTokens.splice(targetIndex, 0, pumpedToken);
        
        return newTokens;
      });
    }, 8000); // Trigger every 8 seconds
    
    return () => clearInterval(interval);
  }, []);

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
    <motion.div 
      layout
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 sm:p-6"
    >
      <AnimatePresence mode="popLayout">
        {tokens.map((token) => (
          <motion.div
            key={token.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              layout: { type: 'spring', stiffness: 300, damping: 25 },
              opacity: { duration: 0.3 }
            }}
          >
            <TokenCard token={token} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
