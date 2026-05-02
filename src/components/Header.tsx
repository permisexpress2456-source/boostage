'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    const onResize = () => { if (window.innerWidth >= 992) setMenuOpen(false); };
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onResize); };
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const links = [
    { href: '/',        label: 'Home'     },
    { href: '/services', label: 'Services' },
    { href: '/about',   label: 'About'    },
    { href: '/faq',     label: 'FAQ'      },
    { href: '/blog',    label: 'Blog'     },
    { href: '/contact', label: 'Contact'  },
  ];

  return (
    <>
      <style>{`
        .fb-nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          height: 68px;
          background: rgba(14, 23, 41, 0.92);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255,255,255,0.07);
          z-index: 999;
          transition: box-shadow .3s;
        }
        .fb-nav.scrolled {
          box-shadow: 0 4px 24px rgba(0,0,0,0.4);
        }
        .fb-nav-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        .fb-logo img { height: 38px; width: auto; display: block; }

        /* desktop links */
        .fb-links {
          display: flex;
          align-items: center;
          gap: 2px;
          list-style: none;
          margin: 0; padding: 0;
        }
        .fb-links a {
          display: block;
          padding: 8px 14px;
          border-radius: 8px;
          font-size: .875rem;
          font-weight: 500;
          color: #94a3b8;
          transition: color .2s, background .2s;
          white-space: nowrap;
        }
        .fb-links a:hover { color: #f1f5f9; background: rgba(255,255,255,.06); }
        .fb-links a.active { color: #f97316; }

        /* login button */
        .fb-login {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 22px;
          background: linear-gradient(135deg, #2563eb, #f97316);
          color: #fff !important;
          border-radius: 8px;
          font-size: .875rem;
          font-weight: 600;
          white-space: nowrap;
          transition: opacity .2s, transform .2s, box-shadow .2s;
        }
        .fb-login:hover {
          opacity: .9;
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(249,115,22,.4);
          color: #fff !important;
        }

        /* hamburger */
        .fb-burger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: 1px solid rgba(255,255,255,.1);
          border-radius: 8px;
          padding: 8px 10px;
          cursor: pointer;
        }
        .fb-burger span {
          display: block;
          width: 20px; height: 2px;
          background: #94a3b8;
          border-radius: 2px;
          transition: all .3s;
        }
        .fb-burger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .fb-burger.open span:nth-child(2) { opacity: 0; }
        .fb-burger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* mobile menu */
        .fb-mobile {
          display: none;
          position: fixed;
          top: 68px; left: 0; right: 0;
          background: rgba(8,14,26,.97);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-bottom: 1px solid rgba(255,255,255,.07);
          padding: 12px 16px 20px;
          z-index: 998;
          flex-direction: column;
          gap: 4px;
        }
        .fb-mobile.open { display: flex; }
        .fb-mobile a {
          padding: 12px 16px;
          border-radius: 10px;
          font-size: .95rem;
          font-weight: 500;
          color: #94a3b8;
          transition: color .2s, background .2s;
        }
        .fb-mobile a:hover,
        .fb-mobile a.active { color: #f1f5f9; background: rgba(255,255,255,.06); }
        .fb-mobile a.active { color: #f97316; }
        .fb-mobile .fb-login { margin-top: 8px; justify-content: center; }

        /* overlay */
        .fb-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,.5);
          z-index: 997;
        }
        .fb-overlay.open { display: block; }

        @media (max-width: 991px) {
          .fb-links, .fb-login { display: none; }
          .fb-burger { display: flex; }
        }
      `}</style>

      <header className={`fb-nav${scrolled ? ' scrolled' : ''}`}>
        <div className="fb-nav-inner">
          <Link href="/" className="fb-logo">
            <img src="/logo.png" alt="FLASH BOOSTAGE" />
          </Link>

          <ul className="fb-links">
            {links.map(l => (
              <li key={l.href}>
                <Link href={l.href} className={pathname === l.href ? 'active' : ''}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link href="/login" className="fb-login">
            <i className="fas fa-user-circle"></i>
            Login
          </Link>

          <button
            className={`fb-burger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* Mobile nav */}
      <div className={`fb-mobile${menuOpen ? ' open' : ''}`}>
        {links.map(l => (
          <Link key={l.href} href={l.href} className={pathname === l.href ? 'active' : ''}>
            {l.label}
          </Link>
        ))}
        <Link href="/login" className="fb-login">
          <i className="fas fa-user-circle"></i>
          Login
        </Link>
      </div>

      {/* Backdrop */}
      <div className={`fb-overlay${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(false)} />
    </>
  );
}
