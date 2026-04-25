export default function Hero() {
  return (
    <section className="hero-area">
      <div className="container">
        <div className="row">
          <div className="col-md-7">
            <div className="hero-text-area">
              <div className="section-header">
                <h1>Boost Your Social Media Marketing | High Quality</h1>
                <p>
                  <b>#1 SMM PANEL IN THE WORLD! </b>
                  Boost SMM is simply the fastest, cheapest, biggest panel in the SMM. The best social media marketing panel for resellers #1Top SMMPanel. We are providing an Opportunity to make handsome amount of money by reselling our social media services on your own social media marketing or by selling them on Various Marketplace.
                </p>
                <a href="/register" className="custom-btn2 mt-30 top-right-radius-0">
                  Start Boosting!
                </a>
                <br />
                <a
                  href="/storage/app/public/apprelease.apk"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://boostsmm.ng/assets/uploads/content/playstore.png"
                    alt="BoostSMM on Playstore"
                    style={{ width: '33%' }}
                  />
                </a>
                <a
                  href="https://www.youtube.com/watch?v=gSNg3mU7E1U"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tutorial-btn"
                >
                  <span style={{ fontSize: '18px', marginRight: '8px' }}>▶️</span> Watch Tutorial
                </a>
                <div id="google_translate_element"></div>
                <div className="hero-social-auth-buttons mt-3">
                  <a className="btn btn-social-hero btn-google-hero" href="/auth/google">
                    <span className="btn-social-icon-hero">
                      <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    </span>
                    Continue with Google
                  </a>
                  <a className="btn btn-social-hero btn-apple-hero" href="/auth/apple">
                    <span className="btn-social-icon-hero">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                      </svg>
                    </span>
                    Continue with Apple
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-5 d-md-block d-none">
            <div className="hero-image-area animation1">
              <img
                src="https://boostsmm.ng/assets/uploads/content/63133d45e73e21662205253.png"
                alt="Hero"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
      <svg className="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#fff"
          fillOpacity="1"
          d="M0,224L40,218.7C80,213,160,203,240,213.3C320,224,400,256,480,256C560,256,640,224,720,208C800,192,880,192,960,208C1040,224,1120,256,1200,272C1280,288,1360,288,1400,288L1440,288L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
        />
      </svg>
    </section>
  );
}
