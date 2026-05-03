'use client';

import '../dashboard/dashboard.css';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
  { icon: 'fa-home',          label: 'Overview',    href: '/dashboard' },
  { icon: 'fa-shopping-cart', label: 'New Order',   href: '/user/new-order' },
  { icon: 'fa-layer-group',   label: 'Mass Order',  href: '/user/mass-order' },
  { icon: 'fa-list',          label: 'All Orders',  href: '/user/all-order' },
  { icon: 'fa-redo',          label: 'Refill',      href: '/user/refill-order' },
  { icon: 'fa-tint',          label: 'Drip Feed',   href: '/user/drip-feed' },
  { icon: 'fa-th-large',      label: 'Services',    href: '/user/services' },
  { icon: 'fa-wallet',        label: 'Add Funds',   href: '/user/add-funds' },
  { icon: 'fa-headset',       label: 'Support',     href: 'https://wa.me/2348131654957' },
  { icon: 'fa-code',          label: 'API',         href: '/user/api' },
];

const PAGE_TITLES: Record<string, string> = {
  '/user/new-order':    'New Order',
  '/user/mass-order':   'Mass Order',
  '/user/all-order':    'All Orders',
  '/user/refill-order': 'Refill Order',
  '/user/drip-feed':    'Drip Feed',
  '/user/services':     'Services',
  '/user/add-funds':    'Add Funds',
  '/user/api':          'API Documentation',
};

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();
  const title = PAGE_TITLES[pathname] ?? 'Panel';

  return (
    <>
      {/* ── Sidebar ── */}
      <aside className={`sidebar ${open ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <Link href="/dashboard" className="logo">
            <img src="/logo.png" alt="FLASH BOOSTAGE" />
          </Link>
          <button className="sidebar-toggle" onClick={() => setOpen(v => !v)} aria-label="Toggle sidebar">
            <i className="fas fa-bars"></i>
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul>
            {NAV.map(item => (
              <li key={item.href}>
                <button
                  className={pathname === item.href ? 'active' : ''}
                  onClick={() => { if (!item.href.startsWith('http')) window.location.href = item.href; else window.open(item.href, '_blank'); }}
                >
                  <i className={`fas ${item.icon}`}></i>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <Link href="/login" className="logout-btn">
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="main-content">
        {/* Top bar */}
        <header className="top-bar">
          <div className="top-bar-left">
            <button className="mobile-toggle" onClick={() => setOpen(v => !v)} aria-label="Toggle sidebar">
              <i className="fas fa-bars"></i>
            </button>
            <h1 className="page-title">{title}</h1>
          </div>
          <div className="top-bar-right">
            <div className="user-balance">
              <i className="fas fa-wallet"></i>
              <span>$1,250.50</span>
            </div>
            <div className="user-info">
              <div className="user-avatar"><i className="fas fa-user"></i></div>
              <div className="user-details">
                <span className="user-name">John Doe</span>
                <span className="user-email">john@example.com</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="dashboard-content">
          {children}
        </div>
      </main>
    </>
  );
}
