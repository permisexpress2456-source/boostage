'use client';

import { useState } from 'react';
import Link from 'next/link';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Social Media Marketing Platforms to Boost Your Sales',
    excerpt: 'Social media marketing platforms are really important and they play vital role in boosting your brand awareness, engagement, and sales. Learn which platforms work best...',
    image: 'https://boostsmm.ng/assets/uploads/content/thumb_63184eab8f7f81662537387.jpg',
    author: 'Admin',
    date: '03 Feb 2021',
    slug: 'social-media-marketing-platforms-to-boost-your-sales',
  },
  {
    id: 2,
    title: 'Mastering the Art of Social Media Advertising',
    excerpt: 'Social media advertising is a powerful tool, but mastering it requires finesse. Our latest blog post unveils the playbook for success in digital advertising...',
    image: 'https://boostsmm.ng/assets/uploads/content/thumb_63184eb333c7c1662537395.jpg',
    author: 'Admin',
    date: '03 Feb 2021',
    slug: 'mastering-the-art-of-social-media-advertising',
  },
  {
    id: 3,
    title: 'Navigating the Social Media Landscape: Expert Guide',
    excerpt: 'In a digital age where social media is the heartbeat of online presence, businesses must navigate the landscape strategically to succeed...',
    image: 'https://boostsmm.ng/assets/uploads/content/thumb_63184ea0eb2e31662537376.jpg',
    author: 'Admin',
    date: '03 Feb 2021',
    slug: 'navigating-the-social-media-landscape',
  },
  {
    id: 4,
    title: '10 Tips for Growing Your Instagram Following',
    excerpt: 'Want to grow your Instagram following organically? Discover proven strategies to increase your followers, engagement, and reach on Instagram...',
    image: 'https://boostsmm.ng/assets/themes/lightorange/img/blog/1.jpg',
    author: 'Admin',
    date: '15 Jan 2026',
    slug: '10-tips-for-growing-instagram-following',
  },
  {
    id: 5,
    title: 'TikTok Marketing Tips for Businesses',
    excerpt: 'Discover how to leverage TikTok for your business growth. Learn about trending content, hashtag strategies, and advertising on TikTok...',
    image: 'https://boostsmm.ng/assets/themes/lightorange/img/blog/2.jpg',
    author: 'Admin',
    date: '10 Jan 2026',
    slug: 'tiktok-marketing-tips-for-businesses',
  },
  {
    id: 6,
    title: 'YouTube SEO: Rank Your Videos Higher',
    excerpt: 'Master YouTube SEO and get more views on your videos. Learn about keywords, thumbnails, tags, and optimization techniques...',
    image: 'https://boostsmm.ng/assets/themes/lightorange/img/blog/3.jpg',
    author: 'Admin',
    date: '05 Jan 2026',
    slug: 'youtube-seo-rank-videos-higher',
  },
];

export default function BlogPage() {
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
                    <Link className="nav-link" href="/about">About</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/services">Services</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/faq">FAQ</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" href="/blog">Blog</Link>
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
                <h6>Blog</h6>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Blog
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Section */}
      <section className="blog_area">
        <div className="container">
          <div className="row">
            <div className="section_header text-center mb-5">
              <div className="section_subtitle">Our Blog</div>
              <h2>Latest News & Articles</h2>
              <p className="para_text m-auto">
                Stay updated with the latest social media marketing tips, trends, and strategies
              </p>
            </div>
          </div>

          <div className="row justify-content-center g-lg-4 gy-5">
            {blogPosts.map(post => (
              <div className="col-lg-4 col-sm-6" key={post.id}>
                <div className="blog_box box1">
                  <div className="image_area">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="img-fluid"
                      style={{ width: '100%', height: '220px', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="text_area">
                    <div className="date_author d-flex justify-content-between">
                      <span>
                        <i className="far fa-user me-2"></i>
                        {post.author}
                      </span>
                      <span>
                        <i className="far fa-calendar-alt me-2"></i>
                        {post.date}
                      </span>
                    </div>
                    <h5 className="pt-3">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title.length > 50 ? post.title.substring(0, 50) + '...' : post.title}
                      </Link>
                    </h5>
                    <p className="pb-20">{post.excerpt}</p>
                    <Link href={`/blog/${post.slug}`} className="custom_btn btn-sm">
                      Read More <i className="fas fa-arrow-right ms-2"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="row mt-5">
            <div className="col-12">
              <nav aria-label="Blog pagination">
                <ul className="pagination justify-content-center">
                  <li className="page-item disabled">
                    <span className="page-link">Previous</span>
                  </li>
                  <li className="page-item active">
                    <span className="page-link">1</span>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="/blog?page=2">2</Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="/blog?page=3">3</Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="/blog?page=2">Next</Link>
                  </li>
                </ul>
              </nav>
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
