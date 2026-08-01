import React from 'react';

interface AvatarProps {
  /** CSS gradient string for the background */
  gradient: string;
  /** Token symbol or initials */
  symbol: string;
  size?: number;
  className?: string;
  /** If provided, renders an img instead of the gradient+symbol */
  src?: string;
  alt?: string;
}

export default function Avatar({
  gradient,
  symbol,
  size = 48,
  className = '',
  src,
  alt,
}: AvatarProps) {
  const initials = symbol.slice(0, 2).toUpperCase();
  const fontSize = Math.max(10, Math.floor(size * 0.35));
  const borderRadius = Math.floor(size * 0.2);

  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt ?? symbol}
        className={`object-cover flex-shrink-0 ${className}`}
        style={{ width: size, height: size, borderRadius }}
      />
    );
  }

  return (
    <div
      className={`flex items-center justify-center flex-shrink-0 font-bold select-none ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius,
        background: gradient,
        fontSize,
        color: 'rgba(5, 7, 8, 0.85)',
        fontFamily: 'var(--font-display)',
        letterSpacing: '-0.5px',
      }}
    >
      {initials}
    </div>
  );
}
