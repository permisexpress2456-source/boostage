'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('success');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setFormStatus('idle'), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
                    <Link className="nav-link" href="/">Home</Link>
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
                    <Link className="nav-link active" href="/contact">Contact</Link>
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
                <h6>Contact Us</h6>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Contact Us
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <section className="contact_area">
        <div className="container">
          <div className="row">
            <div className="section_header text-center mb-5">
              <div className="section_subtitle">Get In Touch</div>
              <h2>Contact Us</h2>
              <p className="para_text m-auto">
                Have questions? We're here to help! Reach out to us and we'll respond as soon as possible.
              </p>
            </div>
          </div>

          <div className="row g-5">
            {/* Contact Info */}
            <div className="col-lg-5">
              <div className="contact_info_wrapper">
                <h3 className="mb-4">Contact Information</h3>
                <p className="text-muted mb-4">
                  Fill up the form and our team will get back to you within 24 hours.
                </p>

                <div className="contact_info_item mb-4">
                  <div className="icon">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div className="content">
                    <h5>Phone</h5>
                    <p className="mb-0">+1 234 567 8900</p>
                  </div>
                </div>

                <div className="contact_info_item mb-4">
                  <div className="icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="content">
                    <h5>Email</h5>
                    <p className="mb-0">support@boostsmm.ng</p>
                  </div>
                </div>

                <div className="contact_info_item mb-4">
                  <div className="icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="content">
                    <h5>Address</h5>
                    <p className="mb-0">123 SMM Street, Digital City</p>
                  </div>
                </div>

                <div className="contact_info_item mb-4">
                  <div className="icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className="content">
                    <h5>Business Hours</h5>
                    <p className="mb-0">Monday - Friday: 9am - 6pm</p>
                  </div>
                </div>

                {/* Social Links */}
                <div className="social_links mt-5">
                  <h5 className="mb-3">Follow Us</h5>
                  <div className="social_icons">
                    <a href="https://www.facebook.com/profile.php?id=61554415183298" target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="https://www.tiktok.com/@boostsmmng" target="_blank" rel="noopener noreferrer">
                      <i className="fa-brands fa-tiktok"></i>
                    </a>
                    <a href="https://www.instagram.com/boostsmmsocialss" target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a href="https://x.com/boostsmmng" target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-twitter"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="col-lg-7">
              <div className="contact_form_wrapper">
                <form onSubmit={handleSubmit}>
                  <div className="row g-4">
                    <div className="col-md-6">
                      <div className="form_group">
                        <label htmlFor="name">Your Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form_control"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form_group">
                        <label htmlFor="email">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="form_control"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form_group">
                        <label htmlFor="subject">Subject</label>
                        <select
                          id="subject"
                          name="subject"
                          className="form_control"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select a subject</option>
                          <option value="general">General Inquiry</option>
                          <option value="support">Technical Support</option>
                          <option value="billing">Billing Question</option>
                          <option value="partnership">Partnership</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form_group">
                        <label htmlFor="message">Your Message</label>
                        <textarea
                          id="message"
                          name="message"
                          className="form_control"
                          rows={5}
                          placeholder="Write your message here..."
                          value={formData.message}
                          onChange={handleChange}
                          required
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn custom_btn w-100">
                        <i className="fas fa-paper-plane me-2"></i>
                        Send Message
                      </button>
                    </div>
                  </div>
                </form>

                {formStatus === 'success' && (
                  <div className="alert alert-success mt-4">
                    <i className="fas fa-check-circle me-2"></i>
                    Thank you! Your message has been sent successfully. We'll get back to you soon.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map_area">
        <div className="container-fluid p-0">
          <div className="map_wrapper">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537353153169!3d-37.817323442021134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sEnvato!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Boost SMM Location"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FAQ CTA Section */}
      <section className="faq_cta_area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="faq_cta_wrapper text-center">
                <h3>Have Questions?</h3>
                <p>Check out our FAQ page for quick answers to common questions.</p>
                <Link href="/faq" className="btn custom_btn mt-3">
                  <i className="fas fa-question-circle me-2"></i>
                  View FAQ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter_area">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-8 mx-auto">
              <div className="newsletter_inner top-right-radius-0 bottom-left-radius-0">
                <h3 className="text-center pb-30">
                  <i className="far fa-paper-plane"></i>
                  Join our newsletter
                </h3>
                <form className="subscribe-form subscribe_form" onSubmit={(e) => e.preventDefault()}>
                  <input type="email" name="email" placeholder="Email Address" required />
                  <button type="submit">SUBSCRIBE</button>
                </form>
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
