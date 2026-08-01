import React from 'react';

interface FormSectionProps {
  /** Section number e.g. "01" */
  number: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  optional?: boolean;
}

export default function FormSection({
  number,
  title,
  description,
  children,
  optional = false,
}: FormSectionProps) {
  return (
    <section className="flex flex-col gap-4">
      {/* Section header */}
      <div className="flex items-start gap-3">
        {/* Number pill */}
        <span
          className="flex-shrink-0 flex items-center justify-center text-xs font-black rounded-lg"
          style={{
            width: 28,
            height: 28,
            background: 'linear-gradient(120deg, #22E0C8, #3E7BF0)',
            color: '#050708',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {number}
        </span>

        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <h2
              className="text-base font-bold"
              style={{ color: '#E8EEF0', fontFamily: 'var(--font-display)' }}
            >
              {title}
            </h2>
            {optional && (
              <span
                className="text-[10px] px-1.5 py-0.5 rounded font-medium"
                style={{
                  background: 'rgba(100,112,121,0.12)',
                  border: '1px solid rgba(100,112,121,0.2)',
                  color: '#647079',
                }}
              >
                Optional
              </span>
            )}
          </div>
          {description && (
            <p className="text-xs" style={{ color: '#647079' }}>
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="pl-10">{children}</div>
    </section>
  );
}
