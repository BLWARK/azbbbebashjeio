'use client';

import { useState, useEffect } from 'react';
import type { Token } from '@/lib/mock-data';

export function useLiveToken(initialToken: Token): Token {
  const [token, setToken] = useState<Token>(initialToken);

  useEffect(() => {
    // Generate a random interval between 1.5s and 6s
    // This ensures that different tokens update at completely different times on the screen
    const updateInterval = Math.floor(Math.random() * 4500) + 1500;

    const timer = setInterval(() => {
      setToken((prev) => {
        // Small random price movement between -1.5% and +1.5%
        const volatility = (Math.random() * 0.03) - 0.015;
        const multiplier = 1 + volatility;

        const newMcap = prev.mcap * multiplier;
        const newPrice = prev.price * multiplier;
        
        // Bonding progress moves slightly (-0.1% to +0.2%)
        const progressDelta = (Math.random() * 0.3) - 0.1;
        const newProgress = Math.min(100, Math.max(0, prev.bondingProgress + progressDelta));

        // Update the 24h percentage slightly
        const changeDelta = (Math.random() * 2.0) - 1.0;
        const newChange = prev.priceChange24h + changeDelta;

        return {
          ...prev,
          mcap: newMcap,
          price: newPrice,
          bondingProgress: newProgress,
          priceChange24h: newChange,
        };
      });
    }, updateInterval);

    return () => clearInterval(timer);
  }, []);

  return token;
}
