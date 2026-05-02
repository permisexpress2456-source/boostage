'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Header */}
      <header className="header-area position-fixed">
        <div className="nav-area">
          <nav className="navbar navbar-expand-lg">
            <div className="container custom_nav">
              <Link className="logo" href="/">
                <img
                  src="/logo.png"
                  alt="FLASH BOOSTAGE Logo"
                  style={{ maxHeight: '50px', width: 'auto' }}
                />
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-expanded={isMenuOpen}
                aria-label="Toggle navigation"
              >
                <span className="bars">
                  <i className="fal fa-bars"></i>
                </span>
              </button>
              <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNavDropdown">
                <ul className="navbar-nav ms-auto text-center align-items-center">
                  <li className="nav-item">
                    <Link className="nav-link" href="/">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/services">Services</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/about">About</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/faq">FAQ</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/blog">Blog</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/contact">Contact</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link login_btn" href="/login">
                      <i className="fas fa-user-circle me-2"></i>
                      Login
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Overlay */}
      {isMenuOpen && (
        <div 
          className="navbar-overlay" 
          onClick={() => setIsMenuOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 998
          }}
        />
      )}
    </>
  );
}
