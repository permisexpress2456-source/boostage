export default function Footer() {
  return (
    <footer className="footer-area">
      <div className="container">
        <div className="row gy-4 gy-sm-5">
          <div className="col-lg-4 col-sm-6">
            <div className="footer-widget">
              <div className="widget-logo">
                <h5>
                  <a href="/" className="site-logo">
                    <img
                      src="https://boostsmm.ng/assets/uploads/logo/logo.png"
                      alt="Logo"
                      className="img-fluid"
                      width="220"
                    />
                  </a>
                </h5>
                <p>
                  All user data is maintained with absolute confidentiality and will not be disclosed
                  to any third party. Rest assured, your security is our top priority at Boost SMM -
                  Your most reliable partner.
                </p>
              </div>
              <div className="social-area mt-50">
                <ul>
                  <li>
                    <a
                      href="https://www.facebook.com/profile.php?id=61554415183298&mibextid=LQQJ4d"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.tiktok.com/@boostsmmng?_t=8iLT6a9vZLS&_r=1"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-brands fa-tiktok"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/boostsmmsocialss"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://x.com/boostsmmng"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-twitter"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-sm-6">
            <div className="footer-widget">
              <h5>
                Quick Links<span className="highlight"> _</span>
              </h5>
              <ul>
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/about">About Us</a>
                </li>
                <li>
                  <a href="/blog">Blog</a>
                </li>
                <li>
                  <a href="/faq">FAQ</a>
                </li>
                <li>
                  <a href="/contact">Contact</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 pt-sm-0 pt-3 ps-lg-5">
            <div className="footer-widget">
              <h5>
                Support <span className="highlight"> _</span>
              </h5>
              <ul>
                <li>
                  <a href="/api-docs">API DOCS</a>
                </li>
                <li>
                  <a href="/terms">Terms of Service</a>
                </li>
                <li>
                  <a href="/privacy">Privacy Policy</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6">
            <div className="footer-widget">
              <h5>
                Contact <span className="highlight"> _</span>
              </h5>
              <ul className="contact-list">
                <li>
                  <i className="fas fa-envelope"></i> support@boostsmm.ng
                </li>
                <li>
                  <i className="fas fa-map-marker-alt"></i> Nigeria
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <p>&copy; {new Date().getFullYear()} Boost SMM. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
