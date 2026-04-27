'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    remember: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      console.log('Login submitted:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {/* Header */}
      <div className="header_area position-fixed">
        <div className="nav_area">
          <nav className="navbar navbar-expand-lg">
            <div className="container custom_nav">
              <Link className="logo" href="/">
                <img
                  src="https://boostsmm.ng/assets/uploads/logo/logo.png"
                  alt="FLASH BOOSTAGE Logo"
                  style={{ maxHeight: '40px', width: 'auto' }}
                />
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="bars">
                  <i className="fal fa-bars"></i>
                </span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavDropdown">
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
                    <Link className="nav-link" href="/contact">Contact</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link login_btn top-right-radius-0 active" href="/login">
                      Login
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Banner Area */}
      <div className="banner_area">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="breadcrumb_area">
                <h6>Login</h6>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Login
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Login Form Section */}
      <section className="login_signup_page">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-6">
              <div className="contact_area">
                <div className="section_header mb-0">
                  <h4>Welcome back!</h4>
                </div>
                <p className="mt-30">
                  Sign in to access your FLASH BOOSTAGE panel and manage your social media marketing campaigns.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="login_signup_form p-4">
                <form onSubmit={handleSubmit} method="POST" action="/login">
                  <div className="form_title pb-2">
                    <h4>Login Here</h4>
                  </div>

                  {/* Social Auth Buttons */}
                  <div className="social-auth-buttons mb-3">
                    <Link
                      href="/auth/google"
                      className="btn btn-social btn-google w-100 mb-2"
                      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                    >
                      <span className="btn-social-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                      </span>
                      Continue with Google
                    </Link>
                    <Link
                      href="/auth/apple"
                      className="btn btn-social btn-apple w-100"
                      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                    >
                      <span className="btn-social-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                        </svg>
                      </span>
                      Continue with Apple
                    </Link>
                  </div>

                  <div className="auth-divider">
                    <span className="auth-divider-line"></span>
                    <span className="auth-divider-text">OR</span>
                    <span className="auth-divider-line"></span>
                  </div>

                  <div className="mb-4">
                    <input
                      className="form-control"
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      placeholder="Email Or Username"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label className="text-dark" htmlFor="password">Password</label>
                      <div className="input-group">
                        <input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          className="form-control"
                          name="password"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          required
                          autoComplete="current-password"
                          disabled={isLoading}
                        />
                        <div className="input-group-append">
                          <span
                            className="input-group-text bg-transparent"
                            style={{ cursor: 'pointer' }}
                            onClick={togglePasswordVisibility}
                          >
                            <svg
                              id="eye-icon"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              style={{ display: showPassword ? 'none' : 'block' }}
                            >
                              <path
                                d="M12 5C5.63636 5 2 12 2 12C2 12 5.63636 19 12 19C18.3636 19 22 12 22 12C22 12 18.3636 5 12 5Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <svg
                              id="eye-slash-icon"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              style={{ display: showPassword ? 'block' : 'none' }}
                            >
                              <path
                                d="M6.87301 17.129C5.02899 15.819 3.36801 13.999 2.00001 12C3.36801 10.001 5.02899 8.181 6.87301 6.871M12.0005 5C18.364 5 22.0005 12 22.0005 12C22.0005 12 21.1325 13.91 19.1415 15.74M9.88001 9.879C10.4215 9.3375 11.1715 9 12.0005 9C13.6574 9 15.0005 10.343 15.0005 12C15.0005 12.829 14.663 13.579 14.1215 14.12M4.00001 4L20.0005 20"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3 form-check d-flex justify-content-between">
                    <div className="check">
                      <input
                        type="checkbox"
                        name="remember"
                        className="form-check-input"
                        id="exampleCheck1"
                        checked={formData.remember}
                        onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                        disabled={isLoading}
                      />
                      <label className="form-check-label" htmlFor="exampleCheck1">
                        Remember me
                      </label>
                    </div>
                    <div className="forgot highlight">
                      <Link href="/password/reset">Forgot Password?</Link>
                    </div>
                  </div>

                  <button type="submit" className="btn custom_btn mt-30 w-100" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Log In'}
                  </button>

                  {error && (
                    <div className="alert alert-danger mt-3" role="alert">
                      {error}
                    </div>
                  )}

                  <div className="pt-20 text-center login-link-block">
                    Don&apos;t have an account?{' '}
                    <p className="mb-0 highlight">
                      <Link href="/register">Create an account</Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="footer_area">
        <div className="container">
          <div className="row gy-4 gy-sm-5">
            <div className="col-lg-4 col-sm-6">
              <div className="footer_widget">
                <div className="widget_logo">
                  <h5>
                    <Link href="/" className="site_logo">
                      <img
                        src="https://boostsmm.ng/assets/uploads/logo/logo.png"
                        alt="FLASH BOOSTAGE Logo"
                        style={{ maxWidth: '220px', height: 'auto' }}
                        className="img-fluid"
                      />
                    </Link>
                  </h5>
                  <p>
                    All user data is maintained with absolute confidentiality and will not be
                    disclosed to any third party. Rest assured, your security is our top priority
                    at FLASH BOOSTAGE - Your most reliable partner.
                  </p>
                </div>
                <div className="social_area mt-50">
                  <ul className="">
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
                <h5>
                  Quick Links<span className="highlight"> _</span>
                </h5>
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
                <h5>
                  Support <span className="highlight"> _</span>
                </h5>
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
                <h5>
                  Language<span className="highlight"> _</span>
                </h5>
                <ul>
                  <li><Link href="/language/en" className="language">English</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="copy_right_area text-center">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <p>Copyright &copy; {new Date().getFullYear()} FLASH BOOSTAGE. All Rights Reserved</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

