const steps = [
  {
    number: '1',
    icon: 'far fa-address-book',
    title: 'Register & Log in',
    description: 'Creating an account is the first step. then you need to log in',
  },
  {
    number: '2',
    icon: 'fas fa-hand-holding-usd',
    title: 'Add Fund',
    description: 'Next, pick a payment method and add funds to your account',
  },
  {
    number: '3',
    icon: 'far fa-paper-plane',
    title: 'Select a service',
    description: 'Select the services you want and get ready to receive more publicity',
  },
  {
    number: '4',
    icon: 'fab fa-angellist',
    title: 'Enjoy Super Results',
    description: 'You can enjoy incredible results when your order is complete',
  },
];

export default function HowItWorks() {
  return (
    <section className="how-it-work-area">
      <div className="container">
        <div className="row">
          <div className="section-header mb-50 text-center">
            <div className="section-subtitle">HOW IT WORKS</div>
            <h2>How We Are Helping</h2>
            <p className="para-text m-auto">
              At Boost SMM, we understand the power of Social Media Marketing (SMM) in today's digital landscape.
              With a decade of expertise in the field, we have been at the forefront of transforming businesses through strategic and impactful social media campaigns.
              Elevate your social media presence with Boost SMM. Our track record speaks for itself, and our commitment to your success is unwavering.
              Join us on the journey to social media success – where visibility meets influence.
            </p>
          </div>
        </div>
        <div className="row align-items-center">
          {steps.map((step, index) => (
            <div key={index} className="col-md-6">
              <div className="cmn-box2 box1 d-flex shadow3 flex-column flex-sm-row">
                <span className="number">{step.number}</span>
                <div className="image-area">
                  <i className={step.icon}></i>
                </div>
                <div className="text-area">
                  <h5>{step.title}</h5>
                  <p>{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
