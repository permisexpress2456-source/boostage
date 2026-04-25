'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function HomePage() {
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
                  src="https://boostsmm.ng/assets/uploads/logo/logo.png"
                  alt="Boost SMM Logo"
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
                    <Link className="nav-link active" href="/">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/about">About</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/services">Services</Link>
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

      {/* Hero Section */}
      <section className="hero-area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="hero-text-area">
                <h1>#1 SMM Panel In The World</h1>
                <p>
                  Boost SMM is an online social media marketing tool. This software includes 
                  almost everything you need to do a social media marketing business. It has 
                  services lined up for every social media platform.
                </p>
                <div className="button-area">
                  <Link href="/login" className="custom-btn">
                    Get Started
                  </Link>
                  <Link href="/register" className="custom-btn2 ms-3">
                    Sign Up
                  </Link>
                </div>
                <div className="hero-social-auth-buttons mt-4">
                  <Link href="/auth/google" className="btn-social-hero btn-google-hero">
                    <span className="btn-social-icon-hero">
                      <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    </span>
                    Continue with Google
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-image-area text-center">
                <img
                  src="https://boostsmm.ng/assets/themes/lightorange/img/hero.png"
                  alt="Hero"
                  className="img-fluid animation1"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="wave">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L48 66.7C96 73.3 192 86.7 288 83.3C384 80 480 60 576 53.3C672 46.7 768 53.3 864 60C960 66.7 1056 73.3 1152 73.3C1248 73.3 1344 66.7 1392 63.3L1440 60V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V60Z" fill="#f8f9fa"/>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="feature-area">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-4 col-md-6">
              <div className="cmn-box shadow3 text-center">
                <div className="cmn-icon mb-3">
                  <i className="fas fa-rocket fa-3x" style={{ color: '#fe5268' }}></i>
                </div>
                <h5>Instant Delivery</h5>
                <p className="mt-3">Get your orders delivered instantly with our automated system.</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="cmn-box shadow3 text-center">
                <div className="cmn-icon mb-3">
                  <i className="fas fa-shield-alt fa-3x" style={{ color: '#fe5268' }}></i>
                </div>
                <h5>Secure & Safe</h5>
                <p className="mt-3">Your data is protected with advanced encryption technology.</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="cmn-box shadow3 text-center">
                <div className="cmn-icon mb-3">
                  <i className="fas fa-headset fa-3x" style={{ color: '#fe5268' }}></i>
                </div>
                <h5>24/7 Support</h5>
                <p className="mt-3">Our support team is available around the clock to help you.</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="cmn-box shadow3 text-center">
                <div className="cmn-icon mb-3">
                  <i className="fas fa-wallet fa-3x" style={{ color: '#fe5268' }}></i>
                </div>
                <h5>Cheapest Prices</h5>
                <p className="mt-3">Get the best services at the most competitive prices.</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="cmn-box shadow3 text-center">
                <div className="cmn-icon mb-3">
                  <i className="fas fa-chart-line fa-3x" style={{ color: '#fe5268' }}></i>
                </div>
                <h5>Quality Services</h5>
                <p className="mt-3">High-quality services that boost your social media presence.</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="cmn-box shadow3 text-center">
                <div className="cmn-icon mb-3">
                  <i className="fas fa-sync fa-3x" style={{ color: '#fe5268' }}></i>
                </div>
                <h5>Auto Refill</h5>
                <p className="mt-3">Automatic refill guarantee if you lose any followers or likes.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="image-area position-relative">
                <img
                  src="https://boostsmm.ng/assets/themes/lightorange/img/about.png"
                  alt="About Boost SMM"
                  className="img-fluid"
                  style={{ borderRadius: '12px' }}
                />
                <div className="video-play-btn">
                  <i className="fas fa-play"></i>
                </div>
              </div>
            </div>
            <div className="col-lg-6 ps-lg-5 mt-4 mt-lg-0">
              <div className="section-content">
                <div className="section-header">
                  <h6 className="section-subtitle">About Us</h6>
                  <h2>We Are The Best SMM Panel</h2>
                  <p>
                    Boost SMM is the #1 SMM panel in the world. We provide the best services 
                    for all major social media platforms including Facebook, Instagram, YouTube, 
                    Twitter, TikTok, and more.
                  </p>
                  <p className="mt-3">
                    Our platform is designed to help businesses, influencers, and individuals 
                    grow their social media presence quickly and affordably.
                  </p>
                </div>
                <div className="button-area mt-4">
                  <Link href="/about" className="custom-btn">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="service-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-header text-center mb-5">
                <h6 className="section-subtitle">Our Services</h6>
                <h2>What We Offer</h2>
                <p className="para-text mx-auto">
                  We offer a wide range of services for all major social media platforms
                </p>
              </div>
            </div>
          </div>
          <div className="row gy-4">
            <div className="col-lg-3 col-md-6">
              <div className="cmn-box shadow3 text-center">
                <div className="cmn-icon mb-3">
                  <i className="fab fa-facebook-f fa-3x" style={{ color: '#1877F2' }}></i>
                </div>
                <h5>Facebook</h5>
                <p className="mt-2">Likes, Followers, Post Engagement</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="cmn-box shadow3 text-center">
                <div className="cmn-icon mb-3">
                  <i className="fab fa-instagram fa-3x" style={{ color: '#E4405F' }}></i>
                </div>
                <h5>Instagram</h5>
                <p className="mt-2">Followers, Likes, Views, Reels</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="cmn-box shadow3 text-center">
                <div className="cmn-icon mb-3">
                  <i className="fab fa-youtube fa-3x" style={{ color: '#FF0000' }}></i>
                </div>
                <h5>YouTube</h5>
                <p className="mt-2">Subscribers, Views, Likes, Comments</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="cmn-box shadow3 text-center">
                <div className="cmn-icon mb-3">
                  <i className="fab fa-tiktok fa-3x" style={{ color: '#000000' }}></i>
                </div>
                <h5>TikTok</h5>
                <p className="mt-2">Followers, Likes, Views, Shares</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="cmn-box shadow3 text-center">
                <div className="cmn-icon mb-3">
                  <i className="fab fa-twitter fa-3x" style={{ color: '#1DA1F2' }}></i>
                </div>
                <h5>Twitter</h5>
                <p className="mt-2">Followers, Retweets, Likes</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="cmn-box shadow3 text-center">
                <div className="cmn-icon mb-3">
                  <i className="fab fa-telegram fa-3x" style={{ color: '#0088cc' }}></i>
                </div>
                <h5>Telegram</h5>
                <p className="mt-2">Members, Views, Post Forward</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="cmn-box shadow3 text-center">
                <div className="cmn-icon mb-3">
                  <i className="fab fa-linkedin fa-3x" style={{ color: '#0A66C2' }}></i>
                </div>
                <h5>LinkedIn</h5>
                <p className="mt-2">Connections, Post Engagement</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="cmn-box shadow3 text-center">
                <div className="cmn-icon mb-3">
                  <i className="fas fa-globe fa-3x" style={{ color: '#fe5268' }}></i>
                </div>
                <h5>Website Traffic</h5>
                <p className="mt-2">Organic Traffic, SEO Services</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-work-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-header text-center mb-5">
                <h6 className="section-subtitle">How It Works</h6>
                <h2>Get Started In 3 Easy Steps</h2>
              </div>
            </div>
          </div>
          <div className="row gy-4">
            <div className="col-lg-4">
              <div className="cmn-box2 d-flex align-items-center">
                <div className="number">01</div>
                <div className="image-area me-3">
                  <i className="fas fa-user-plus fa-2x"></i>
                </div>
                <div className="text-area">
                  <h5>Create Account</h5>
                  <p className="mb-0">Sign up for free in less than 1 minute</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="cmn-box2 d-flex align-items-center">
                <div className="number">02</div>
                <div className="image-area me-3">
                  <i className="fas fa-wallet fa-2x"></i>
                </div>
                <div className="text-area">
                  <h5>Add Funds</h5>
                  <p className="mb-0">Deposit funds using various payment methods</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="cmn-box2 d-flex align-items-center">
                <div className="number">03</div>
                <div className="image-area me-3">
                  <i className="fas fa-shopping-cart fa-2x"></i>
                </div>
                <div className="text-area">
                  <h5>Place Order</h5>
                  <p className="mb-0">Select service and watch your growth</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="achivement-area">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-3 col-md-6">
              <div className="cmn-box text-center">
                <h4>5M+</h4>
                <h5>Orders Completed</h5>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="cmn-box text-center">
                <h4>100K+</h4>
                <h5>Happy Customers</h5>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="cmn-box text-center">
                <h4>50+</h4>
                <h5>Services Available</h5>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="cmn-box text-center">
                <h4>24/7</h4>
                <h5>Customer Support</h5>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonial-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-header text-center mb-5">
                <h6 className="section-subtitle">Testimonials</h6>
                <h2>What Our Customers Say</h2>
              </div>
            </div>
          </div>
          <div className="row gy-4">
            <div className="col-lg-4 col-md-6">
              <div className="cmn-box shadow2">
                <div className="text-area">
                  <div className="quote-area mb-3">
                    <i className="fas fa-quote-left fa-2x" style={{ color: '#fe5268', opacity: 0.3 }}></i>
                  </div>
                  <p>
                    "Best SMM panel I've ever used! Fast delivery and excellent customer support. 
                    Highly recommended for anyone looking to grow their social media."
                  </p>
                  <div className="cmn-icon mt-4">
                    <img
                      src="https://boostsmm.ng/assets/themes/lightorange/img/testimonial/1.png"
                      alt="Customer"
                      style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                  </div>
                  <h4 className="mt-3">John Doe</h4>
                  <h6>Digital Marketer</h6>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="cmn-box shadow2">
                <div className="text-area">
                  <div className="quote-area mb-3">
                    <i className="fas fa-quote-left fa-2x" style={{ color: '#fe5268', opacity: 0.3 }}></i>
                  </div>
                  <p>
                    "Amazing prices and quality! I've been using Boost SMM for 6 months and my 
                    Instagram has grown from 0 to 50K followers. Thank you!"
                  </p>
                  <div className="cmn-icon mt-4">
                    <img
                      src="https://boostsmm.ng/assets/themes/lightorange/img/testimonial/2.png"
                      alt="Customer"
                      style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                  </div>
                  <h4 className="mt-3">Sarah Smith</h4>
                  <h6>Influencer</h6>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="cmn-box shadow2">
                <div className="text-area">
                  <div className="quote-area mb-3">
                    <i className="fas fa-quote-left fa-2x" style={{ color: '#fe5268', opacity: 0.3 }}></i>
                  </div>
                  <p>
                    "The API integration is seamless. As a reseller, this platform has helped me 
                    scale my business. Great work Boost SMM team!"
                  </p>
                  <div className="cmn-icon mt-4">
                    <img
                      src="https://boostsmm.ng/assets/themes/lightorange/img/testimonial/3.png"
                      alt="Customer"
                      style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                  </div>
                  <h4 className="mt-3">Mike Johnson</h4>
                  <h6>Reseller</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="blog-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-header text-center mb-5">
                <h6 className="section-subtitle">Latest News</h6>
                <h2>From Our Blog</h2>
              </div>
            </div>
          </div>
          <div className="row gy-4">
            <div className="col-lg-4 col-md-6">
              <div className="blog-box">
                <div className="image-area">
                  <img
                    src="https://boostsmm.ng/assets/themes/lightorange/img/blog/1.jpg"
                    alt="Blog Post"
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  />
                </div>
                <div className="text-area">
                  <div className="date-author mb-2">
                    <i className="far fa-calendar-alt me-2"></i>
                    <span>Jan 15, 2026</span>
                    <span className="ms-3">
                      <i className="far fa-user me-2"></i>
                      Admin
                    </span>
                  </div>
                  <h5>
                    <Link href="/blog/post-1">
                      How to Grow Your Instagram Organically in 2026
                    </Link>
                  </h5>
                  <p className="mt-3">
                    Learn the latest strategies to grow your Instagram following...
                  </p>
                  <Link href="/blog/post-1" className="custom-btn2 mt-3" style={{ fontSize: '0.9rem', padding: '8px 20px' }}>
                    Read More
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="blog-box">
                <div className="image-area">
                  <img
                    src="https://boostsmm.ng/assets/themes/lightorange/img/blog/2.jpg"
                    alt="Blog Post"
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  />
                </div>
                <div className="text-area">
                  <div className="date-author mb-2">
                    <i className="far fa-calendar-alt me-2"></i>
                    <span>Jan 10, 2026</span>
                    <span className="ms-3">
                      <i className="far fa-user me-2"></i>
                      Admin
                    </span>
                  </div>
                  <h5>
                    <Link href="/blog/post-2">
                      TikTok Marketing Tips for Businesses
                    </Link>
                  </h5>
                  <p className="mt-3">
                    Discover how to leverage TikTok for your business growth...
                  </p>
                  <Link href="/blog/post-2" className="custom-btn2 mt-3" style={{ fontSize: '0.9rem', padding: '8px 20px' }}>
                    Read More
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="blog-box">
                <div className="image-area">
                  <img
                    src="https://boostsmm.ng/assets/themes/lightorange/img/blog/3.jpg"
                    alt="Blog Post"
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  />
                </div>
                <div className="text-area">
                  <div className="date-author mb-2">
                    <i className="far fa-calendar-alt me-2"></i>
                    <span>Jan 05, 2026</span>
                    <span className="ms-3">
                      <i className="far fa-user me-2"></i>
                      Admin
                    </span>
                  </div>
                  <h5>
                    <Link href="/blog/post-3">
                      YouTube SEO: Rank Your Videos Higher
                    </Link>
                  </h5>
                  <p className="mt-3">
                    Master YouTube SEO and get more views on your videos...
                  </p>
                  <Link href="/blog/post-3" className="custom-btn2 mt-3" style={{ fontSize: '0.9rem', padding: '8px 20px' }}>
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Section */}
      <section className="payment-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-header text-center mb-5">
                <h2>Accepted Payment Methods</h2>
                <p className="para-text mx-auto">
                  We accept various payment methods for your convenience
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="payment-slider text-center">
                <div className="d-flex flex-wrap justify-content-center gap-4">
                  <div className="image-area">
                    <img src="https://boostsmm.ng/assets/themes/lightorange/img/payment/paypal.png" alt="PayPal" style={{ maxHeight: '50px' }} />
                  </div>
                  <div className="image-area">
                    <img src="https://boostsmm.ng/assets/themes/lightorange/img/payment/visa.png" alt="Visa" style={{ maxHeight: '50px' }} />
                  </div>
                  <div className="image-area">
                    <img src="https://boostsmm.ng/assets/themes/lightorange/img/payment/mastercard.png" alt="Mastercard" style={{ maxHeight: '50px' }} />
                  </div>
                  <div className="image-area">
                    <img src="https://boostsmm.ng/assets/themes/lightorange/img/payment/bitcoin.png" alt="Bitcoin" style={{ maxHeight: '50px' }} />
                  </div>
                  <div className="image-area">
                    <img src="https://boostsmm.ng/assets/themes/lightorange/img/payment/ethereum.png" alt="Ethereum" style={{ maxHeight: '50px' }} />
                  </div>
                  <div className="image-area">
                    <img src="https://boostsmm.ng/assets/themes/lightorange/img/payment/payeer.png" alt="Payeer" style={{ maxHeight: '50px' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-area">
        <div className="container">
          <div className="newsletter-inner text-center">
            <h3>Subscribe to Our Newsletter</h3>
            <p className="text-white mt-3">Get latest updates and offers directly to your inbox</p>
            <form className="subscribe-form mx-auto mt-4" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" required />
              <button type="submit">Subscribe</button>
            </form>
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
                        src="https://boostsmm.ng/assets/uploads/logo/logo.png"
                        alt="Boost SMM Logo"
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
                Copyright &copy; {new Date().getFullYear()} Boost SMM. All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
