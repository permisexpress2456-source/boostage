'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header-area position-fixed">
      <div className="nav-area">
        <nav className="navbar navbar-expand-lg">
          <div className="container custom-nav">
            <Link className="logo" href="/">
              <img src="https://boostsmm.ng/assets/uploads/logo/logo.png" alt="Logo" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label="Toggle navigation"
            >
              <span className="bars">
                <i className="fal fa-bars"></i>
              </span>
            </button>
            <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNavDropdown">
              <ul className="navbar-nav ms-auto text-center align-items-center">
                <li className="nav-item">
                  <Link className="nav-link active" href="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/about">
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/services">
                    Services
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/faq">
                    FAQ
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/blog">
                    Blog
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/contact">
                    Contact
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link login-btn top-right-radius-0" href="/login">
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
