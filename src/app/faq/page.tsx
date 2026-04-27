'use client';

import { useState } from 'react';
import Link from 'next/link';

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    id: 0,
    question: 'How do I use mass order?',
    answer: `You put the service ID followed by | followed by the link followed by | followed by quantity on each line. To get the service ID of a service please check here: https://boostsmm.ng/services

Let's say you want to use the Mass Order to add Instagram Followers to your 3 accounts: abcd, asdf, qwer

From the Services List, the service ID for this service "Instagram Followers [15K] [REAL]" is 102

Let's say you want to add 1000 followers for each account, the output will be like this:
ID|Link|Quantity or in this example:
102|abcd|1000
102|asdf|1000
102|qwer|1000`,
  },
  {
    id: 1,
    question: 'I want a panel like yours / I want to resell your services how?',
    answer: `To get a panel like ours, please check jap to rent a panel, and then you can connect to us via API easily!

Contact us at support@boostsmm.ng for more info.`,
  },
  {
    id: 2,
    question: 'How to get youtube comment link?',
    answer: `Find the timestamp that is located next to your username above your comment (for example: "3 days ago") and hover over it then right click and "Copy Link Address". 

The link will be something like this: 
https://www.youtube.com/watch?v=12345&lc=a1b21etc 
instead of just 
https://www.youtube.com/watch?v=12345

To be sure that you got the correct link, paste it in your browser's address bar and you will see that the comment is now the first one below the video and it says "Highlighted Comment".`,
  },
  {
    id: 3,
    question: 'Which youtube view service can be used with monetizable video?',
    answer: 'The one that has "Monetized" in its service\' name.',
  },
  {
    id: 4,
    question: 'Is it safe to use FLASH BOOSTAGE?',
    answer: "Yes it's safe, no bans or block on your account for using our services.",
  },
  {
    id: 5,
    question: 'What is SMM Panel?',
    answer: 'Social Media Marketing (SMM) panel is a social media marketing service online store that lets people buy likes, followers, views, website traffic, and more.',
  },
  {
    id: 6,
    question: 'How do I know the correct link to use?',
    answer: `If you are buying:
• Followers - Profile link (We don't accept Invite links or private account)
• Likes - Post link (Make sure your account is NOT on private)
• Comments - Post link (Make sure your account is NOT on private)
• Youtube Subscribers - Channel link
• Youtube Views - Video link`,
  },
  {
    id: 7,
    question: 'How long does it take for my order to be completed?',
    answer: 'Most orders are completed within 24-72 hours. However, some services may take longer depending on the quantity and service type. You can check the estimated delivery time on each service description.',
  },
  {
    id: 8,
    question: 'What payment methods do you accept?',
    answer: 'We accept various payment methods including PayPal, Credit Cards (Visa, Mastercard), Bitcoin, Ethereum, and other cryptocurrencies. Check our payment page for the complete list.',
  },
  {
    id: 9,
    question: 'Do you offer refunds?',
    answer: 'Yes, we offer refunds if the service is not delivered as described. Please check our Refund Policy page for more details. Refunds are processed within 3-5 business days.',
  },
  {
    id: 10,
    question: 'Can I cancel my order?',
    answer: 'You can cancel your order if it has not been processed yet. Once the order status changes to "In Progress" or "Completed", cancellation is not possible. Contact our support team for assistance.',
  },
  {
    id: 11,
    question: 'How do I contact support?',
    answer: 'You can contact our support team via email at support@boostsmm.ng, through our live chat feature, or by submitting a ticket from your dashboard. We typically respond within 24 hours.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
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
                    <Link className="nav-link" href="/services">Services</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" href="/faq">FAQ</Link>
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
                <h6>Frequently Asked Questions</h6>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Frequently Asked Questions
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="faq_area">
        <div className="container">
          <div className="row">
            <div className="section_header text-center text-sm-start">
              <h2>Frequently Asked Questions</h2>
              <p className="para_text">
                FLASH BOOSTAGE gives you the best marketing tool so you can topple the Competition.
              </p>
            </div>
          </div>

          <div className="row">
            <div className="col-md-10 col-12">
              <div className="accordion" id="accordionExample">
                {faqs.map((faq, index) => (
                  <div className="accordion-item" key={faq.id}>
                    <h2 className="accordion-header" id={`heading${faq.id}`}>
                      <button
                        className={`accordion-button ${openIndex !== index ? 'collapsed' : ''}`}
                        type="button"
                        onClick={() => toggleAccordion(index)}
                        aria-expanded={openIndex === index}
                        aria-controls={`collapse${faq.id}`}
                      >
                        {faq.question}
                      </button>
                    </h2>
                    <div
                      id={`collapse${faq.id}`}
                      className={`accordion-collapse collapse ${openIndex === index ? 'show' : ''}`}
                      aria-labelledby={`heading${faq.id}`}
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <div className="table-responsive">
                          <p style={{ whiteSpace: 'pre-line' }}>{faq.answer}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Support CTA */}
          <div className="row mt-5">
            <div className="col-12">
              <div className="support_cta text-center">
                <h3>Still have questions?</h3>
                <p>Our support team is here to help you with any questions or concerns.</p>
                <div className="button_area mt-4">
                  <Link href="/contact" className="custom_btn">
                    <i className="fas fa-envelope me-2"></i>
                    Contact Support
                  </Link>
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


