'use client';

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface AppShellProps {
  children: React.ReactNode;
}

/**
 * AppShell — root layout wrapper.
 * Owns sidebar expanded/collapsed state and passes it to <Sidebar />.
 */
export default function AppShell({ children }: AppShellProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div
      className="flex h-full overflow-hidden"
      style={{ background: '#050708' }}
    >
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 md:hidden" 
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Left Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 md:relative md:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar
          isExpanded={isExpanded}
          onToggle={() => setIsExpanded((v) => !v)}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />
      </div>

      {/* Right: header + scrollable content */}
      <div className="flex flex-col flex-1 overflow-hidden" style={{ minWidth: 0 }}>
        <Header onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
        <main
          className="flex-1 overflow-y-auto"
          style={{ background: '#050708' }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
