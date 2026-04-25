export default function About() {
  return (
    <section id="about-area" className="about-area">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6 d-flex justify-content-center">
            <div className="image-area">
              <img
                className="animation1"
                src="https://boostsmm.ng/assets/uploads/content/631432858fec31662268037.png"
                alt="About"
              />
              <a
                data-fancybox
                data-width="1000"
                data-height="600"
                href="https://www.youtube.com/embed/esWcM5voyzw"
              >
                <div className="video-play-btn">
                  <i className="fas fa-play"></i>
                </div>
              </a>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="section-content">
              <div className="section-header">
                <div className="section-subtitle">About Us</div>
                <h2>WHO WE ARE.</h2>
                <p>We help to grow your see Smm business.</p>
                <p>
                  Boost SMM is one of the renowned SMM reseller Panel existing on the internet.
                  We have been providing services for 1+ years and provide services for almost every kind of Social Media.
                  Our Social Media Marketing Services include SMM for Facebook, Instagram, Twitter, Youtube, Tiktok, LinkedIn, Shazam, and many more.
                  We are providing an Opportunity to make a handsome amount of money by reselling our social media services on your own social media marketing or by selling them on Various Marketplace.
                </p>
              </div>
              <div className="button-area">
                <a className="custom-btn top-right-radius-0" href="/about">
                  More About
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
