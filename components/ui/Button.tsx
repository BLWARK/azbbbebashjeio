'use client';

import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline-teal';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

const sizeMap: Record<ButtonSize, string> = {
  xs: 'px-2.5 py-1 text-xs gap-1',
  sm: 'px-3 py-1.5 text-xs gap-1.5',
  md: 'px-4 py-2 text-sm gap-2',
  lg: 'px-5 py-2.5 text-base gap-2',
};

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    background: 'linear-gradient(120deg, #22E0C8, #3E7BF0)',
    color: '#050708',
    fontWeight: 700,
    border: 'none',
  },
  secondary: {
    background: '#0E1113',
    color: '#E8EEF0',
    border: '1px solid #1F262A',
    fontWeight: 500,
  },
  ghost: {
    background: 'transparent',
    color: '#647079',
    border: 'none',
    fontWeight: 500,
  },
  danger: {
    background: 'rgba(255, 92, 77, 0.1)',
    border: '1px solid rgba(255, 92, 77, 0.35)',
    color: '#FF5C4D',
    fontWeight: 500,
  },
  'outline-teal': {
    background: 'transparent',
    border: '1px solid #22E0C8',
    color: '#22E0C8',
    fontWeight: 500,
  },
};

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  className = '',
  children,
  style,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center font-medium rounded-lg
        transition-all duration-200 cursor-pointer select-none
        active:scale-[0.97] hover:opacity-90
        disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
        ${sizeMap[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      style={{ ...variantStyles[variant], ...style }}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin"
          style={{ width: 14, height: 14 }}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      ) : null}
      {children}
    </button>
  );
}
