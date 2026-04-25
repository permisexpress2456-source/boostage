const stats = [
  {
    icon: 'https://boostsmm.ng/assets/uploads/content/63145979ed8b41662278009.png',
    value: '10',
    label: 'HAPPY CLIENTS',
  },
  {
    icon: 'https://boostsmm.ng/assets/uploads/content/631459b36bc6e1662278067.png',
    value: '15',
    label: 'PROJECTS DONE',
  },
  {
    icon: 'https://boostsmm.ng/assets/uploads/content/631459c382cb11662278083.png',
    value: '5',
    label: 'TEAM ADVISORS',
  },
  {
    icon: 'https://boostsmm.ng/assets/uploads/content/631459d0e4ab91662278096.png',
    value: '0',
    label: 'GLORIOUS YEARS',
  },
];

export default function Achievements() {
  return (
    <section className="achivement-area">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <div className="section-header mb-0 text-center text-lg-start">
              <h3 className="mb-0">
                We Complete 20+ Project Yearly Successfully &amp; Still Counting
              </h3>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="row">
              {stats.map((stat, index) => (
                <div key={index} className="col-md-6">
                  <div className="cmn-box text-center">
                    <div className="image-area">
                      <img src={stat.icon} alt="counter image" />
                    </div>
                    <div className="text-area">
                      <h4>
                        <span className="achivement-counter">{stat.value}</span> +
                      </h4>
                      <h5>{stat.label}</h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
