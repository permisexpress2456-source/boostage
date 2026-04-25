const services = [
  {
    icon: 'https://boostsmm.ng/assets/uploads/content/631441e6e50fe1662271974.png',
    title: 'Best SMM Panel',
    description:
      'Boost SMM provides the highest quality of promotions. We are one of the best SMM reseller panels including some special services out there online.',
  },
  {
    icon: 'https://boostsmm.ng/assets/uploads/content/631441f0426b71662271984.png',
    title: 'Website Growth',
    description:
      'Boost SMM is a modern and efficient wholesale panel. We try to provide you with instant promotions on different social media platforms.',
  },
  {
    icon: 'https://boostsmm.ng/assets/uploads/content/631441f845c581662271992.png',
    title: 'SMM Ranking',
    description: 'We provide guaranteed service on our website SMM server.',
  },
];

export default function Services() {
  return (
    <section className="service-area">
      <div className="container">
        <div className="row">
          <div className="section-header text-center">
            <div className="section-subtitle">Services</div>
            <h2>What We Provide</h2>
            <p className="para-text m-auto">
              Boost SMM is your one-stop solution for all things social media. Our services are designed to enhance your visibility, engage your audience, and drive measurable results.
            </p>
          </div>
        </div>
        <div className="row g-5 justify-content-center position-relative">
          <img className="shape1" src="https://boostsmm.ng/assets/themes/lightorange/img/shape1.png" alt="" />
          {services.map((service, index) => (
            <div key={index} className="col-lg-4 col-md-6 mb-5">
              <div className="cmn-box box1 text-center shadow3">
                <div className="cmn-icon icon1">
                  <img src={service.icon} alt="service image" />
                </div>
                <h5 className="pt-30 mb-20">{service.title}</h5>
                <p>{service.description}</p>
                <a href="/services" className="custom-btn mt-30 top-right-radius-0">
                  Services
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
