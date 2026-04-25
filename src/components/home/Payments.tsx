const paymentMethods = [
  {
    image: 'https://boostsmm.ng/assets/uploads/gateway/678ffea23a2ec1737490082.jpg',
    name: 'KoraPay',
  },
  {
    image: 'https://boostsmm.ng/assets/uploads/gateway/67ab83e9a40331739293673.jpg',
    name: 'Credo',
  },
  {
    image: 'https://boostsmm.ng/assets/uploads/gateway/5f637d069177e.jpg',
    name: 'paymentco',
  },
  {
    image: 'https://boostsmm.ng/assets/uploads/gateway/684fffbe864e21750073278.jpg',
    name: 'Crypto',
  },
];

export default function Payments() {
  return (
    <section className="payment-area">
      <div className="container">
        <div className="row">
          <div className="section-header text-center mb-50">
            <div className="section-subtitle">PAYMENTS</div>
            <h2>Our Payment Partners</h2>
          </div>
          <div className="owl-carousel owl-theme payment-slider text-center">
            {paymentMethods.map((method, index) => (
              <div key={index} className="item">
                <div className="image-area">
                  <img src={method.image} alt={method.name} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
