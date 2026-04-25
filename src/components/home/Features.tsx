const features = [
  {
    icon: 'https://boostsmm.ng/assets/uploads/content/63134ea09b4661662209696.png',
    title: 'Link Building',
    description:
      'We are providing an Opportunity to make handsome amount of money by reselling our social media services on your own social media marketing or by selling them on Various Marketplace.',
  },
  {
    icon: 'https://boostsmm.ng/assets/uploads/content/63134ee86a5e41662209768.png',
    title: 'Customer Support',
    description:
      "Boost SMM comes with a dedicated team to drive a world-class customer's support. we will Add Daily new service offer and improving support system for fast support",
  },
  {
    icon: 'https://boostsmm.ng/assets/uploads/content/63134f11eb2271662209809.png',
    title: 'Automatic Payments',
    description:
      'Most SMM Panels make you input payment information every time you make an order. Set up an automatic payment method with Boost SMM.',
  },
];

export default function Features() {
  return (
    <section className="feature-area mt-5 mt-md-0">
      <div className="container">
        <div className="row g-lg-5 justify-content-center position-relative">
          <img className="shape1" src="https://boostsmm.ng/assets/themes/lightorange/img/shape1.png" alt="" />
          {features.map((feature, index) => (
            <div key={index} className="col-lg-4 col-md-6 mb-5">
              <div className="cmn-box box1 text-center shadow3">
                <div className="cmn-icon icon1">
                  <img src={feature.icon} alt="feature icon" />
                </div>
                <h5 className="pt-30 mb-20">{feature.title}</h5>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
