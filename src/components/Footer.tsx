import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-area">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <div className="footer-widget">
              <img 
                src="/logo.png" 
                alt="FLASH BOOSTAGE" 
                style={{ maxHeight: '50px', marginBottom: '20px' }}
              />
              <p>
                FLASH BOOSTAGE is the #1 SMM panel in the world. 
                We provide the best services for social media marketing.
              </p>
              <div className="social-links mt-3">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="footer-widget">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/services">Services</Link></li>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="footer-widget">
              <h4>Services</h4>
              <ul className="footer-links">
                <li><Link href="/services">Instagram Services</Link></li>
                <li><Link href="/services">Facebook Services</Link></li>
                <li><Link href="/services">TikTok Services</Link></li>
                <li><Link href="/services">YouTube Services</Link></li>
                <li><Link href="/services">Twitter Services</Link></li>
              </ul>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="footer-widget">
              <h4>Contact Info</h4>
              <ul className="contact-list">
                <li>
                  <i className="fas fa-map-marker-alt"></i>
                  <span>123 Social Media St, Digital City</span>
                </li>
                <li>
                  <i className="fas fa-envelope"></i>
                  <a href="mailto:support@flashboostage.com">support@flashboostage.com</a>
                </li>
                <li>
                  <i className="fas fa-phone"></i>
                  <a href="tel:+1234567890">+1 234 567 890</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="copyright-area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p>
                Copyright &copy; {currentYear} FLASH BOOSTAGE. All Rights Reserved
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <div className="copyright-links">
                <Link href="/faq">FAQ</Link>
                <Link href="/contact">Support</Link>
                <Link href="/login">Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
