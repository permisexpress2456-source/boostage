const testimonials = [
  {
    image: 'https://boostsmm.ng/assets/uploads/content/6565d10e397ba1701171470.png',
    name: 'Alex K',
    role: 'Small Business Owner',
    text: "I've been running a small boutique for years, and Boost SMM has truly transformed the way I approach social media. Their team took the time to understand my brand, and the results have been phenomenal. From curated content that perfectly aligns with my brand to targeted ad campaigns that drove traffic to my online store, Boost SMM's expertise is unmatched. My social media presence has not only expanded but has become a significant revenue driver for my business. I can't recommend them enough!",
  },
  {
    image: 'https://boostsmm.ng/assets/uploads/content/6565d106bceee1701171462.png',
    name: 'Bose M.',
    role: 'Marketing Manager',
    text: "As a marketing manager overseeing multiple projects, integrating social media seamlessly into our strategy was a challenge. Enter Boost SMM. Their tailored solutions and strategic approach have been a game-changer for us. From managing our accounts to providing detailed analytics, Boost SMM has become an indispensable part of our marketing toolkit. Their team's responsiveness and commitment to our success make them more than a service provider – they're true partners in our growth.",
  },
  {
    image: 'https://boostsmm.ng/assets/uploads/content/6565d0fd398441701171453.png',
    name: 'Sola B.',
    role: 'E-commerce Entrepreneur',
    text: "In the competitive world of e-commerce, standing out on social media is non-negotiable. Boost SMM not only helped us stand out but propelled our brand into the spotlight. From running targeted ad campaigns that converted leads into customers to managing our social media calendar flawlessly, their services have been pivotal to our success. If you're serious about leveraging social media for your business, Boost SMM is the partner you need.",
  },
  {
    image: 'https://boostsmm.ng/assets/uploads/content/6565d0f144d6f1701171441.png',
    name: 'Emeka R.',
    role: 'Influencer and Content Creator',
    text: "Being an influencer, maintaining an authentic and engaging social media presence is key. Boost SMM understands this better than anyone. Their content creation team not only brings my vision to life but adds that extra spark that keeps my audience hooked. The growth in my followers and engagement is a testament to their expertise. Working with Boost SMM has allowed me to focus more on what I love – creating content – while they handle the rest.",
  },
];

export default function Testimonials() {
  return (
    <section className="testimonial-area">
      <div className="container">
        <div className="row">
          <div className="section-header mb-50 text-center">
            <div className="section-subtitle">Testimonial</div>
            <h2>What Clients Say</h2>
            <p className="para-text m-auto">
              Boost SMM: Transforming Lives and Businesses Through Social Media Excellence
            </p>
          </div>
        </div>
        <div className="row">
          <div className="owl-carousel owl-theme testimonial-carousel">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="item">
                <div className="cmn-box box1 custom-zindex shadow2">
                  <div className="cmn-icon icon1">
                    <img src={testimonial.image} alt={testimonial.name} className="img-fluid" />
                  </div>
                  <div className="text-area text-center">
                    <h4 className="mt-20">{testimonial.name}</h4>
                    <h6>{testimonial.role}</h6>
                    <div className="quote-area">
                      <img src="https://boostsmm.ng/assets/themes/lightorange/img/quote.png" alt="" />
                    </div>
                    <p>{testimonial.text}</p>
                    <div className="quote-area ms-auto">
                      <img src="https://boostsmm.ng/assets/themes/lightorange/img/quote2.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
