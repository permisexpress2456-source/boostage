const blogPosts = [
  {
    image: 'https://boostsmm.ng/assets/uploads/content/thumb_63184eb333c7c1662537395.jpg',
    title: 'Mastering the Art of Social Media Advert...',
    date: '03 Feb 2021',
    excerpt:
      'Social media advertising is a powerful tool, but mastering it requires finesse. Our latest blog post unveils the pla...',
    slug: 'mastering-the-art-of-social-media-advertising-boost-smms-playbook/63',
  },
  {
    image: 'https://boostsmm.ng/assets/uploads/content/thumb_63184eab8f7f81662537387.jpg',
    title: 'Social Media Marketing Platforms to boos...',
    date: '03 Feb 2021',
    excerpt:
      'Social media marketing platforms are really very important and they play vital role in boosting your brand awareness,...',
    slug: 'social-media-marketing-platforms-to-boost-your-sales/62',
  },
  {
    image: 'https://boostsmm.ng/assets/uploads/content/thumb_63184ea0eb2e31662537376.jpg',
    title: 'Navigating the Social Media Landscape: B...',
    date: '03 Feb 2021',
    excerpt:
      'In a digital age where social media is the heartbeat of online presence, businesses must navigate the landscape stra...',
    slug: 'navigating-the-social-media-landscape-boost-smms-expert-guide/61',
  },
];

export default function Blog() {
  return (
    <section className="blog-area">
      <div className="container">
        <div className="row">
          <div className="section-header mb-50 text-center">
            <div className="section-subtitle">READ OUR BLOG</div>
            <h2>Latest News From Blog</h2>
          </div>
        </div>
        <div className="row justify-content-center g-lg-4 gy-5">
          {blogPosts.map((post, index) => (
            <div key={index} className="col-lg-4 col-sm-6">
              <div className="blog-box box1">
                <div className="image-area">
                  <img src={post.image} alt={post.title} className="img-fluid" />
                </div>
                <div className="text-area">
                  <div className="date-author d-flex justify-content-between">
                    <span>
                      <a href="">
                        <i className="far fa-user"></i> Admin
                      </a>
                    </span>
                    <span>
                      <i className="far fa-calendar-alt"></i> {post.date}
                    </span>
                  </div>
                  <h5 className="pt-3">
                    <a href={`/blog-details/${post.slug}`}>{post.title}</a>
                  </h5>
                  <p className="pb-20">{post.excerpt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
