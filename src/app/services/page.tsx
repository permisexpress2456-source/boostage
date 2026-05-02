'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Service {
  id: number;
  name: string;
  category: string;
  price: number;
  min: number;
  max: number;
  description: string;
}

const serviceCategories = [
  { value: '', label: 'All Category' },
  { value: 'instagram', label: '❤️ Instagram Services' },
  { value: 'facebook', label: '❤️ Facebook Services' },
  { value: 'tiktok', label: '🎵 TikTok Services' },
  { value: 'youtube', label: '▶️ YouTube Services' },
  { value: 'twitter', label: '🐦 Twitter/X Services' },
  { value: 'telegram', label: '📦 Telegram Services' },
  { value: 'spotify', label: '🎧 Spotify Services' },
  { value: 'website', label: '🌍 Website Traffic' },
  { value: 'other', label: '📦 Other Services' },
];

const servicesData: Service[] = [
  { id: 1, name: 'Instagram Followers [Real HQ]', category: 'instagram', price: 0.50, min: 10, max: 100000, description: 'High quality real Instagram followers' },
  { id: 2, name: 'Instagram Likes [Instant]', category: 'instagram', price: 0.10, min: 10, max: 50000, description: 'Instant delivery Instagram likes' },
  { id: 3, name: 'Instagram Views [Unlimited]', category: 'instagram', price: 0.05, min: 100, max: 1000000, description: 'Unlimited Instagram video views' },
  { id: 4, name: 'Instagram Comments [Custom]', category: 'instagram', price: 2.00, min: 5, max: 1000, description: 'Custom comments on Instagram' },
  { id: 5, name: 'Facebook Page Likes', category: 'facebook', price: 3.50, min: 100, max: 50000, description: 'Real Facebook page likes' },
  { id: 6, name: 'Facebook Post Likes', category: 'facebook', price: 1.00, min: 50, max: 10000, description: 'Facebook post reaction likes' },
  { id: 7, name: 'Facebook Followers', category: 'facebook', price: 2.50, min: 100, max: 100000, description: 'Facebook profile followers' },
  { id: 8, name: 'TikTok Followers', category: 'tiktok', price: 1.20, min: 50, max: 100000, description: 'Real TikTok followers' },
  { id: 9, name: 'TikTok Likes', category: 'tiktok', price: 0.30, min: 50, max: 50000, description: 'TikTok video likes instant' },
  { id: 10, name: 'TikTok Views', category: 'tiktok', price: 0.02, min: 100, max: 1000000, description: 'TikTok video views cheap' },
  { id: 11, name: 'YouTube Subscribers', category: 'youtube', price: 5.00, min: 50, max: 10000, description: 'Real YouTube subscribers' },
  { id: 12, name: 'YouTube Views', category: 'youtube', price: 1.50, min: 100, max: 100000, description: 'YouTube video views monetizable' },
  { id: 13, name: 'YouTube Likes', category: 'youtube', price: 2.00, min: 50, max: 10000, description: 'YouTube video likes' },
  { id: 14, name: 'Twitter Followers', category: 'twitter', price: 2.00, min: 50, max: 50000, description: 'Real Twitter/X followers' },
  { id: 15, name: 'Twitter Likes', category: 'twitter', price: 0.50, min: 50, max: 10000, description: 'Twitter/X post likes' },
  { id: 16, name: 'Telegram Members', category: 'telegram', price: 1.80, min: 100, max: 100000, description: 'Telegram channel members' },
  { id: 17, name: 'Telegram Views', category: 'telegram', price: 0.10, min: 100, max: 1000000, description: 'Telegram post views' },
  { id: 18, name: 'Spotify Followers', category: 'spotify', price: 3.00, min: 50, max: 10000, description: 'Spotify playlist followers' },
  { id: 19, name: 'Spotify Plays', category: 'spotify', price: 2.50, min: 100, max: 100000, description: 'Spotify song plays' },
  { id: 20, name: 'Website Traffic [USA]', category: 'website', price: 4.00, min: 100, max: 100000, description: 'USA targeted website traffic' },
  { id: 21, name: 'Website Traffic [Global]', category: 'website', price: 1.00, min: 100, max: 100000, description: 'Worldwide website traffic' },
  { id: 22, name: 'Instagram Story Views', category: 'instagram', price: 0.15, min: 50, max: 10000, description: 'Instagram story views' },
  { id: 23, name: 'Instagram Saves', category: 'instagram', price: 0.20, min: 50, max: 10000, description: 'Instagram post saves' },
  { id: 24, name: 'TikTok Shares', category: 'tiktok', price: 0.40, min: 50, max: 10000, description: 'TikTok video shares' },
  { id: 25, name: 'YouTube Shorts Views', category: 'youtube', price: 0.80, min: 100, max: 100000, description: 'YouTube Shorts views' },
];

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const filteredServices = servicesData.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? service.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

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
                  style={{ maxHeight: '40px', width: 'auto' }}
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
                    <Link className="nav-link" href="/about">About</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" href="/services">Services</Link>
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

      {/* Banner Area */}
      <div className="banner_area">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="breadcrumb_area">
                <h6>Services</h6>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Services
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section className="service_page_area">
        <div className="container">
          {/* Section Header */}
          <div className="section_header_services">
            <h6>Our Services</h6>
            <h2>Choose Your Package</h2>
            <p>Browse our extensive list of social media marketing services at the best prices</p>
          </div>

          <div className="row">
            <div className="col">
              <div className="search_area shadow3">
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="input_box">
                      <label>Search Services</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g., Instagram Followers"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input_box">
                      <label>Category</label>
                      <select
                        className="form-select"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                      >
                        {serviceCategories.map(cat => (
                          <option key={cat.value} value={cat.value}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="input_box">
                      <label>&nbsp;</label>
                      <button className="btn custom_btn w-100">
                        <i className="fas fa-search me-2"></i>
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Services Table */}
          <div className="row mt-5">
            <div className="col-12">
              <div className="table-responsive">
                <table className="table table-hover services_table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Service Name</th>
                      <th>Price per 1000</th>
                      <th>Min - Max</th>
                      <th>Description</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredServices.map(service => (
                      <tr key={service.id}>
                        <td data-label="ID">
                          <span className="service_id">{service.id}</span>
                        </td>
                        <td data-label="Service">
                          <strong>{service.name}</strong>
                        </td>
                        <td data-label="Price">
                          <span className="price_badge">
                            ${service.price.toFixed(2)}
                          </span>
                        </td>
                        <td data-label="Min - Max">
                          <span className="min_max">
                            {service.min} - {service.max.toLocaleString('en-US')}
                          </span>
                        </td>
                        <td data-label="Description">
                          <p className="service_desc mb-0">{service.description}</p>
                        </td>
                        <td data-label="Action">
                          <Link href="/login" className="btn custom_btn btn-sm">
                            <i className="fas fa-shopping-cart me-2"></i>
                            Order Now
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredServices.length === 0 && (
                <div className="text-center py-5">
                  <i className="fas fa-search fa-3x text-muted mb-3"></i>
                  <h5>No services found</h5>
                  <p className="text-muted">Try adjusting your search or filter</p>
                </div>
              )}
            </div>
          </div>

          {/* Services Info Cards */}
          <div className="row mt-5 gy-4">
            <div className="col-12">
              <div className="section_header_services">
                <h6>Special Offers</h6>
                <h2>Why Choose Us</h2>
                <p>Discover our premium service categories designed for your success</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="cmn-box shadow3 text-center">
                <div className="cmn-icon mb-3">
                  <i className="fas fa-bolt fa-3x" style={{ color: '#fe5268' }}></i>
                </div>
                <h5>⚡️ Today's Fastest Services</h5>
                <p className="mt-3">Get instant delivery on our fastest services with automatic processing.</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="cmn-box shadow3 text-center">
                <div className="cmn-icon mb-3">
                  <i className="fas fa-tag fa-3x" style={{ color: '#fe5268' }}></i>
                </div>
                <h5>📉 Cheapest Services</h5>
                <p className="mt-3">Best prices in the market with guaranteed quality and support.</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="cmn-box shadow3 text-center">
                <div className="cmn-icon mb-3">
                  <i className="fas fa-gift fa-3x" style={{ color: '#fe5268' }}></i>
                </div>
                <h5>🎁 Free Services</h5>
                <p className="mt-3">Try our free services to test our quality before ordering.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-area">
        <div className="container">
          <div className="row gy-4 gy-sm-5">
            <div className="col-lg-4 col-sm-6">
              <div className="footer_widget">
                <div className="widget_logo">
                  <h5>
                    <Link href="/" className="site_logo">
                      <img
                        src="/logo.png"
                        alt="FLASH BOOSTAGE Logo"
                        style={{ maxWidth: '220px', height: 'auto' }}
                        className="img-fluid"
                      />
                    </Link>
                  </h5>
                  <p className="mt-3">
                    All user data is maintained with absolute confidentiality and will not be
                    disclosed to any third party. Your security is our top priority.
                  </p>
                </div>
                <div className="social_area mt-4">
                  <ul>
                    <li>
                      <a href="https://www.facebook.com/profile.php?id=61554415183298" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.tiktok.com/@boostsmmng" target="_blank" rel="noopener noreferrer">
                        <i className="fa-brands fa-tiktok"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/boostsmmsocialss" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-instagram"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://x.com/boostsmmng" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-twitter"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-sm-6">
              <div className="footer_widget">
                <h5>Quick Links<span className="highlight"> _</span></h5>
                <ul>
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="/about">About Us</Link></li>
                  <li><Link href="/services">Services</Link></li>
                  <li><Link href="/blog">Blog</Link></li>
                  <li><Link href="/faq">FAQ</Link></li>
                  <li><Link href="/contact">Contact</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 pt-sm-0 pt-3 ps-lg-5">
              <div className="footer_widget">
                <h5>Support <span className="highlight"> _</span></h5>
                <ul>
                  <li><Link href="/api-docs">API DOCS</Link></li>
                  <li><Link href="/terms-conditions">Terms & Conditions</Link></li>
                  <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                  <li><Link href="/general">General</Link></li>
                  <li><Link href="/disclaimer">Disclaimer</Link></li>
                  <li><Link href="/refund-policy">Refund Policy</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 pt-sm-0 pt-3">
              <div className="footer_widget">
                <h5>Contact Info <span className="highlight"> _</span></h5>
                <ul className="contact-list">
                  <li>
                    <i className="fas fa-map-marker-alt"></i>
                    <span>123 SMM Street, Digital City</span>
                  </li>
                  <li>
                    <i className="fas fa-envelope"></i>
                    <span>support@boostsmm.ng</span>
                  </li>
                  <li>
                    <i className="fas fa-phone"></i>
                    <span>+1 234 567 8900</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Copyright */}
      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <p className="text-center mb-0">
                Copyright &copy; {new Date().getFullYear()} FLASH BOOSTAGE. All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


