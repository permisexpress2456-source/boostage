'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  content: string;
}

interface Stat {
  id: number;
  value: number;
  label: string;
  icon: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Alex K',
    role: 'Small Business Owner',
    image: 'https://boostsmm.ng/assets/uploads/content/6565d10e397ba1701171470.png',
    content: "I've been running a small boutique for years, and Boost SMM has truly transformed the way I approach social media. Their team took the time to understand my brand, and the results have been phenomenal. From curated content that perfectly aligns with my brand to targeted ad campaigns that drove traffic to my online store, Boost SMM's expertise is unmatched.",
  },
  {
    id: 2,
    name: 'Bose M.',
    role: 'Marketing Manager',
    image: 'https://boostsmm.ng/assets/uploads/content/6565d106bceee1701171462.png',
    content: "As a marketing manager overseeing multiple projects, integrating social media seamlessly into our strategy was a challenge. Enter Boost SMM. Their tailored solutions and strategic approach have been a game-changer for us. From managing our accounts to providing detailed analytics, Boost SMM has become an indispensable part of our marketing toolkit.",
  },
  {
    id: 3,
    name: 'Sola B.',
    role: 'E-commerce Entrepreneur',
    image: 'https://boostsmm.ng/assets/uploads/content/6565d0fd398441701171453.png',
    content: "In the competitive world of e-commerce, standing out on social media is non-negotiable. Boost SMM not only helped us stand out but propelled our brand into the spotlight. From running targeted ad campaigns that converted leads into customers to managing our social media calendar flawlessly, their services have been pivotal to our success.",
  },
  {
    id: 4,
    name: 'Emeka R.',
    role: 'Influencer and Content Creator',
    image: 'https://boostsmm.ng/assets/uploads/content/6565d0f144d6f1701171441.png',
    content: "Being an influencer, maintaining an authentic and engaging social media presence is key. Boost SMM understands this better than anyone. Their content creation team not only brings my vision to life but adds that extra spark that keeps my audience hooked. The growth in my followers and engagement is a testament to their expertise.",
  },
];

const stats: Stat[] = [
  { id: 1, value: 100000, label: 'HAPPY CLIENTS', icon: 'fa-users' },
  { id: 2, value: 500000, label: 'PROJECTS DONE', icon: 'fa-check-circle' },
  { id: 3, value: 50, label: 'TEAM ADVISORS', icon: 'fa-user-tie' },
  { id: 4, value: 5, label: 'GLORIOUS YEARS', icon: 'fa-trophy' },
];

export default function AboutPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                    <Link className="nav-link active" href="/about">About</Link>
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

      {/* Banner Area */}
      <div className="banner_area">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="breadcrumb_area">
                <h6>About Us</h6>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    About Us
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="feature_area mt-5 mt-md-0">
        <div className="container">
          <div className="row g-lg-5 justify-content-center position-relative">
            <div className="col-lg-4 col-md-6 mb-5">
              <div className="cmn_box box1 text-center shadow3">
                <div className="cmn_icon icon1">
                  <i className="fas fa-link fa-3x" style={{ color: '#fe5268' }}></i>
                </div>
                <h5 className="pt-30 mb-20">Link Building</h5>
                <p>We are providing an Opportunity to make handsome amount of money by reselling our social media services on your own social media marketing or by selling them on Various Marketplace.</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-5">
              <div className="cmn_box box1 text-center shadow3">
                <div className="cmn_icon icon1">
                  <i className="fas fa-headset fa-3x" style={{ color: '#fe5268' }}></i>
                </div>
                <h5 className="pt-30 mb-20">Customer Support</h5>
                <p>Boost SMM comes with a dedicated team to drive a world-class customer's support. we will Add Daily new service offer and improving support system for fast support</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-5">
              <div className="cmn_box box1 text-center shadow3">
                <div className="cmn_icon icon1">
                  <i className="fas fa-credit-card fa-3x" style={{ color: '#fe5268' }}></i>
                </div>
                <h5 className="pt-30 mb-20">Automatic Payments</h5>
                <p>Most SMM Panels make you input payment information every time you make an order. Set up an automatic payment method with Boost SMM.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about_area">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6 d-flex justify-content-center">
              <div className="image_area">
                <img
                  className="animation1"
                  src="https://boostsmm.ng/assets/uploads/content/631432858fec31662268037.png"
                  alt="About Boost SMM"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
                <div className="video_play_btn">
                  <i className="fas fa-play"></i>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="section_content">
                <div className="section_header">
                  <div className="section_subtitle">About Us</div>
                  <h2>WHO WE ARE.</h2>
                  <p>We help to grow your SMM business.</p>
                  <p>
                    Boost SMM is one of the renowned SMM reseller Panels existing on the internet.
                    We have been providing services for 5+ years and provide services for almost every kind of Social Media.
                    Our Social Media Marketing Services include SMM for Facebook, Instagram, Twitter, Youtube, Tiktok, LinkedIn, Shazam, and many more.
                  </p>
                  <p>
                    We are providing an Opportunity to make a handsome amount of money by reselling our social media services
                    on your own social media marketing or by selling them on Various Marketplace.
                  </p>
                </div>
                <div className="button_area">
                  <Link href="/services" className="custom_btn top-right-radius-0">
                    Explore Services
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="achivement_area">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="section_header mb-0 text-center text-lg-start">
                <h3 className="mb-0">We Complete 20+ Projects Yearly Successfully & Still Counting</h3>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row">
                {stats.map(stat => (
                  <div className="col-md-6" key={stat.id}>
                    <div className="cmn_box text-center">
                      <div className="image_area">
                        <i className={`fas ${stat.icon} fa-3x`} style={{ color: '#fe5268' }}></i>
                      </div>
                      <div className="text_area">
                        <h4>
                          <span className="achivement_counter">{stat.value.toLocaleString()}</span> +
                        </h4>
                        <h5>{stat.label}</h5>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonial_area">
        <div className="container">
          <div className="row">
            <div className="section_header mb-50 text-center">
              <div className="section_subtitle">Testimonial</div>
              <h2>What Clients Say</h2>
              <p className="para_text m-auto">
                Boost SMM: Transforming Lives and Businesses Through Social Media Excellence
              </p>
            </div>
          </div>

          <div className="row">
            {testimonials.map(testimonial => (
              <div className="col-lg-3 col-md-6 mb-4" key={testimonial.id}>
                <div className="cmn_box box1 custom_zindex shadow2">
                  <div className="cmn_icon icon1">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="img-fluid"
                      style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="text_area text-center">
                    <h4 className="mt-20">{testimonial.name}</h4>
                    <h6>{testimonial.role}</h6>
                    <div className="quote_area">
                      <i className="fas fa-quote-left fa-2x" style={{ color: '#fe5268', opacity: 0.3 }}></i>
                    </div>
                    <p>{testimonial.content}</p>
                    <div className="quote_area ms-auto">
                      <i className="fas fa-quote-right fa-2x" style={{ color: '#fe5268', opacity: 0.3 }}></i>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Section */}
      <section className="payment_area">
        <div className="container">
          <div className="row">
            <div className="section_header text-center mb-50">
              <div className="section_subtitle mx-auto">PAYMENTS</div>
              <h2>Our Payment Partners</h2>
            </div>
            <div className="col-12">
              <div className="payment_slider text-center">
                <div className="d-flex flex-wrap justify-content-center gap-4">
                  <div className="image_area">
                    <img src="https://boostsmm.ng/assets/uploads/gateway/678ffea23a2ec1737490082.jpg" alt="KoraPay" style={{ maxHeight: '50px' }} />
                  </div>
                  <div className="image_area">
                    <img src="https://boostsmm.ng/assets/uploads/gateway/67ab83e9a40331739293673.jpg" alt="Credo" style={{ maxHeight: '50px' }} />
                  </div>
                  <div className="image_area">
                    <img src="https://boostsmm.ng/assets/uploads/gateway/5f637d069177e.jpg" alt="PayPal" style={{ maxHeight: '50px' }} />
                  </div>
                  <div className="image_area">
                    <img src="https://boostsmm.ng/assets/uploads/gateway/684fffbe864e21750073278.jpg" alt="Crypto" style={{ maxHeight: '50px' }} />
                  </div>
                </div>
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
