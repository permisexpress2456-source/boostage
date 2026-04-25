export default function Newsletter() {
  return (
    <section className="newsletter-area">
      <div className="container">
        <div className="row align-items-center g-4">
          <div className="col-lg-8 mx-auto">
            <div className="newsletter-inner top-right-radius-0 bottom-left-radius-0">
              <h3 className="text-center pb-30">
                <i className="far fa-paper-plane"></i> Join our newsletter
              </h3>
              <form className="subscribe-form subscribe_form" action="/subscribe" method="post">
                <input type="hidden" name="_token" value="" />
                <input type="email" name="email" placeholder="Email Address" required />
                <button type="submit">SUBSCRIBE</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
