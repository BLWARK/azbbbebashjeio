'use client';

import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  /** Placed before the input text area (inside the border) */
  prefix?: React.ReactNode;
  /** Placed after the input text area (inside the border) */
  suffix?: React.ReactNode;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, prefix, suffix, fullWidth = false, className = '', style, ...props }, ref) => {
    return (
      <div className={`flex flex-col gap-1 ${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label className="text-xs font-medium" style={{ color: '#647079' }}>
            {label}
          </label>
        )}
        <div
          className="flex items-center gap-2 rounded-lg transition-all duration-200"
          style={{
            background: '#0E1113',
            border: `1px solid ${error ? '#FF5C4D' : '#1F262A'}`,
            minHeight: 40,
            padding: '0 12px',
          }}
          onFocusCapture={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor = error ? '#FF5C4D' : '#22E0C8';
            (e.currentTarget as HTMLDivElement).style.boxShadow = error
              ? '0 0 0 3px rgba(255,92,77,0.12)'
              : '0 0 0 3px rgba(34,224,200,0.1)';
          }}
          onBlurCapture={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor = error ? '#FF5C4D' : '#1F262A';
            (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
          }}
        >
          {prefix && (
            <span className="flex-shrink-0 text-sm" style={{ color: '#647079' }}>
              {prefix}
            </span>
          )}
          <input
            ref={ref}
            className={`flex-1 bg-transparent text-sm outline-none min-w-0 ${className}`}
            style={{
              color: '#E8EEF0',
              caretColor: '#22E0C8',
              ...style,
            }}
            {...props}
          />
          {suffix && (
            <span className="flex-shrink-0 text-sm" style={{ color: '#647079' }}>
              {suffix}
            </span>
          )}
        </div>
        {(hint || error) && (
          <p className="text-xs" style={{ color: error ? '#FF5C4D' : '#647079' }}>
            {error ?? hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
