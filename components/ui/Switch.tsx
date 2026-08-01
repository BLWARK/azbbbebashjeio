'use client';

import React from 'react';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  id?: string;
}

export default function Switch({ checked, onChange, label, disabled = false, id }: SwitchProps) {
  const switchId = id ?? `switch-${Math.random().toString(36).slice(2)}`;

  return (
    <label
      htmlFor={switchId}
      className="inline-flex items-center gap-2 cursor-pointer select-none"
      style={{ opacity: disabled ? 0.5 : 1, pointerEvents: disabled ? 'none' : 'auto' }}
    >
      <div
        className="relative transition-all duration-200"
        style={{
          width: 36,
          height: 20,
          borderRadius: 10,
          background: checked
            ? 'linear-gradient(120deg, #22E0C8, #3E7BF0)'
            : '#1F262A',
          boxShadow: checked ? '0 0 8px rgba(34, 224, 200, 0.35)' : 'none',
          flexShrink: 0,
        }}
      >
        <input
          type="checkbox"
          id={switchId}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only"
        />
        <div
          className="absolute top-0.5 transition-transform duration-200"
          style={{
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: checked ? '#050708' : '#647079',
            transform: `translateX(${checked ? 18 : 2}px)`,
          }}
        />
      </div>
      {label && (
        <span className="text-sm" style={{ color: checked ? '#E8EEF0' : '#647079' }}>
          {label}
        </span>
      )}
    </label>
  );
}
