'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// ── SVG Icon helpers ──────────────────────────────────────────────
const IconHome = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
    <path d="M9 21V12h6v9" />
  </svg>
);

const IconExplore = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

const IconRankings = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const IconCampaigns = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M15.54 8.46a5 5 0 010 7.07" />
    <path d="M19.07 4.93a10 10 0 010 14.14" />
  </svg>
);

const IconAnnouncements = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 01-3.46 0" />
  </svg>
);

const IconSettings = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
);

const IconDoubleChevronRight = ({ flipped }: { flipped?: boolean }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      transform: flipped ? 'rotate(180deg)' : 'none',
      transition: 'transform 0.25s ease',
      flexShrink: 0,
    }}
  >
    <polyline points="13 17 18 12 13 7" />
    <polyline points="6 17 11 12 6 7" />
  </svg>
);

// ── Nav item config ───────────────────────────────────────────────
const NAV_ITEMS = [
  { href: '/',              Icon: IconHome,          label: 'Home'          },
  { href: '/explore',       Icon: IconExplore,       label: 'Explore'       },
  { href: '/rankings',      Icon: IconRankings,      label: 'Rankings'      },
  { href: '/campaigns',     Icon: IconCampaigns,     label: 'Campaigns'     },
  { href: '/announcements', Icon: IconAnnouncements, label: 'Announcements' },
];

// ── Logo mark ─────────────────────────────────────────────────────
function LogoMark({ isExpanded }: { isExpanded: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={isExpanded ? "/Azura logo.png" : "/Azura_icons.png"}
      alt="Azura Logo"
      className="flex-shrink-0"
      style={{
        height: 36,
        width: 'auto',
        objectFit: 'contain',
        transition: 'all 0.2s ease',
      }}
    />
  );
}

// ── Collapsed nav item (icon only + tooltip) ──────────────────────
function CollapsedNavItem({
  href,
  Icon,
  label,
  isActive,
}: {
  href: string;
  Icon: React.FC;
  label: string;
  isActive: boolean;
}) {
  return (
    <div className="relative group">
      <Link
        href={href}
        className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
        aria-label={label}
        title={label}
      >
        <Icon />
      </Link>
      {/* Tooltip */}
      <div
        className="absolute left-14 top-1/2 -translate-y-1/2 px-2 py-1 rounded
                   pointer-events-none opacity-0 group-hover:opacity-100
                   transition-opacity duration-150 whitespace-nowrap z-50 text-xs font-medium"
        style={{
          background: '#151A1D',
          border: '1px solid #1F262A',
          color: '#E8EEF0',
        }}
      >
        {label}
      </div>
    </div>
  );
}

// ── Expanded nav item (icon + label) ─────────────────────────────
function ExpandedNavItem({
  href,
  Icon,
  label,
  isActive,
}: {
  href: string;
  Icon: React.FC;
  label: string;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                 transition-all duration-150 w-full relative"
      style={{
        color: isActive ? '#22E0C8' : '#647079',
        background: isActive ? 'rgba(34,224,200,0.07)' : 'transparent',
        borderLeft: isActive ? '2px solid #22E0C8' : '2px solid transparent',
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          (e.currentTarget as HTMLAnchorElement).style.color = '#E8EEF0';
          (e.currentTarget as HTMLAnchorElement).style.background = '#151A1D';
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          (e.currentTarget as HTMLAnchorElement).style.color = '#647079';
          (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
        }
      }}
      aria-current={isActive ? 'page' : undefined}
    >
      <Icon />
      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>{label}</span>
    </Link>
  );
}

// ── Sidebar ───────────────────────────────────────────────────────
interface SidebarProps {
  isExpanded: boolean;
  onToggle: () => void;
  onCloseMobile?: () => void;
}

export default function Sidebar({ isExpanded, onToggle, onCloseMobile }: SidebarProps) {
  const pathname = usePathname();
  const width = isExpanded ? 220 : 64;

  return (
    <aside
      className="flex flex-col py-4 flex-shrink-0"
      style={{
        width,
        minWidth: width,
        background: '#0E1113',
        borderRight: '1px solid #1F262A',
        height: '100%',
        transition: 'width 0.25s cubic-bezier(0.4, 0, 0.2, 1), min-width 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden',
      }}
    >
      {/* ── Toggle button row ── */}
      <div
        className="flex mb-2 mt-2 px-3"
        style={{ justifyContent: isExpanded ? 'flex-end' : 'center' }}
      >
        <button
          onClick={onToggle}
          className="flex items-center justify-center rounded-lg transition-all duration-150"
          style={{
            width: 32,
            height: 32,
            background: 'transparent',
            color: '#647079',
          }}
          aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = '#22E0C8';
            (e.currentTarget as HTMLButtonElement).style.background = '#151A1D';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = '#647079';
            (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
          }}
        >
          <IconDoubleChevronRight flipped={isExpanded} />
        </button>
      </div>

      {/* ── Logo row ── */}
      <div
        className="flex items-center mb-4 mt-1 px-3"
        style={{ height: 38 }}
      >
        <Link href="/" aria-label="Azura.finance Home" style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
          <LogoMark isExpanded={isExpanded} />
        </Link>
      </div>

      {/* Divider */}
      <div className="mx-3 mb-3" style={{ height: 1, background: '#1F262A' }} />

      {/* ── Main navigation ── */}
      <nav
        className="flex flex-col flex-1 gap-0.5"
        style={{ padding: isExpanded ? '0 8px' : '0', alignItems: isExpanded ? 'stretch' : 'center' }}
      >
        {NAV_ITEMS.map(({ href, Icon, label }) => {
          const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
          return isExpanded ? (
            <ExpandedNavItem key={href} href={href} Icon={Icon} label={label} isActive={isActive} />
          ) : (
            <CollapsedNavItem key={href} href={href} Icon={Icon} label={label} isActive={isActive} />
          );
        })}
      </nav>

      {/* ── Bottom: settings + toggle ── */}
      <div
        className="flex flex-col gap-1 mt-2"
        style={{ padding: isExpanded ? '0 8px' : '0', alignItems: isExpanded ? 'stretch' : 'center' }}
      >
        {/* Divider */}
        <div className="mx-1 mb-2" style={{ height: 1, background: '#1F262A' }} />

        {/* Settings */}
        {isExpanded ? (
          <ExpandedNavItem
            href="/settings"
            Icon={IconSettings}
            label="Settings"
            isActive={pathname.startsWith('/settings')}
          />
        ) : (
          <CollapsedNavItem
            href="/settings"
            Icon={IconSettings}
            label="Settings"
            isActive={pathname.startsWith('/settings')}
          />
        )}

      </div>
    </aside>
  );
}
