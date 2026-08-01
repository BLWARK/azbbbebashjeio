'use client';

import React, { useRef, useState } from 'react';

interface ImageUploaderProps {
  onFileSelect?: (file: File) => void;
}

export default function ImageUploader({ onFileSelect }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    onFileSelect?.(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  return (
    <div
      className="flex flex-col items-center justify-center rounded-xl cursor-pointer transition-all duration-200 relative overflow-hidden"
      style={{
        width: 140,
        height: 140,
        background: isDragging
          ? 'rgba(34,224,200,0.08)'
          : preview
          ? 'transparent'
          : '#0E1113',
        border: `2px dashed ${isDragging ? '#22E0C8' : preview ? 'transparent' : '#1F262A'}`,
      }}
      onClick={() => inputRef.current?.click()}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      role="button"
      tabIndex={0}
      aria-label="Upload token image"
      onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/gif,image/webp"
        className="sr-only"
        onChange={handleChange}
      />

      {preview ? (
        <>
          {/* Preview image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt="Token image preview"
            className="w-full h-full object-cover"
          />
          {/* Overlay on hover */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-1 opacity-0 hover:opacity-100 transition-opacity duration-200"
            style={{ background: 'rgba(5,7,8,0.7)' }}
          >
            <span className="text-lg">✏️</span>
            <span className="text-xs font-medium" style={{ color: '#22E0C8' }}>
              Change
            </span>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center gap-2 p-4 text-center">
          <div
            className="flex items-center justify-center rounded-full"
            style={{
              width: 40,
              height: 40,
              background: 'rgba(34,224,200,0.08)',
              border: '1px solid rgba(34,224,200,0.2)',
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#22E0C8"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-semibold" style={{ color: '#22E0C8' }}>
              Upload Image
            </span>
            <span className="text-[10px]" style={{ color: '#647079' }}>
              PNG, JPG, GIF, WEBP
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
