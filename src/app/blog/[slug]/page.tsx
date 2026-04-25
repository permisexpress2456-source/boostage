'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';

const blogPosts = {
  'instagram-marketing-2026': {
    title: 'Instagram Marketing Trends 2026: What You Need to Know',
    excerpt: 'Discover the latest Instagram marketing strategies that will dominate 2026. From Reels to AI-powered content, stay ahead of the competition.',
    content: `
      <p>Instagram continues to evolve as one of the most powerful marketing platforms in 2026. With over 2 billion monthly active users, businesses need to stay ahead of the curve to maximize their reach and engagement.</p>
      
      <h3>1. AI-Powered Content Creation</h3>
      <p>Artificial intelligence is revolutionizing how brands create content. From automated caption writing to AI-generated visuals, smart tools are helping marketers save time while maintaining quality.</p>
      
      <h3>2. Short-Form Video Dominance</h3>
      <p>Instagram Reels now account for over 50% of time spent on the platform. Brands that prioritize video content see 3x higher engagement rates compared to static posts.</p>
      
      <h3>3. Authentic Influencer Partnerships</h3>
      <p>Micro and nano-influencers are delivering better ROI than celebrity endorsements. Audiences crave authentic connections over polished advertisements.</p>
      
      <h3>4. Shopping Integration</h3>
      <p>Instagram Shopping features have matured, allowing seamless in-app purchases. Brands using shoppable posts report 25% higher conversion rates.</p>
      
      <h3>5. Community Building</h3>
      <p>Successful brands in 2026 focus on building engaged communities rather than just accumulating followers. Comments, saves, and shares matter more than likes.</p>
      
      <h3>Getting Started</h3>
      <p>Ready to elevate your Instagram marketing? Start by auditing your current strategy, identifying your target audience, and creating a content calendar that incorporates these trends.</p>
      
      <p>Need help growing your Instagram presence? Check out our <Link href="/services">Instagram services</Link> to boost your reach today.</p>
    `,
    author: 'Sarah Johnson',
    date: 'April 20, 2026',
    category: 'Marketing',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800',
    readTime: '5 min read'
  },
  'tiktok-growth-guide': {
    title: 'The Ultimate TikTok Growth Guide for Businesses',
    excerpt: 'Learn proven strategies to grow your TikTok following organically. Tips from experts who have helped brands reach millions.',
    content: `
      <p>TikTok has become an essential platform for businesses looking to reach younger audiences. With its unique algorithm, even new accounts can achieve viral success.</p>
      
      <h3>Understanding the TikTok Algorithm</h3>
      <p>Unlike other platforms, TikTok shows content based on interest rather than who you follow. This means every video has the potential to go viral, regardless of your follower count.</p>
      
      <h3>Content That Performs</h3>
      <p>Trending sounds, challenges, and educational content perform best. The key is to participate in trends while staying authentic to your brand voice.</p>
      
      <h3>Posting Schedule</h3>
      <p>Consistency matters more than frequency. Aim for 3-5 high-quality posts per week rather than daily mediocre content.</p>
      
      <h3>Engagement Strategies</h3>
      <p>Respond to comments, duet with followers, and engage with your niche community. TikTok rewards accounts that keep users on the platform.</p>
      
      <h3>Hashtag Strategy</h3>
      <p>Use a mix of trending, niche, and branded hashtags. 3-5 relevant hashtags perform better than stuffing your caption with tags.</p>
    `,
    author: 'Mike Chen',
    date: 'April 18, 2026',
    category: 'Social Media',
    image: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800',
    readTime: '6 min read'
  },
  'facebook-ads-roi': {
    title: 'Maximizing Facebook Ads ROI in 2026',
    excerpt: 'Facebook advertising has changed. Learn the new strategies that are delivering results and positive ROI for businesses.',
    content: `
      <p>Facebook Ads remain a powerful tool for businesses, but the landscape has changed significantly. Here's how to adapt your strategy for maximum ROI.</p>
      
      <h3>Targeting Changes</h3>
      <p>With iOS updates affecting tracking, broad targeting with strong creative often outperforms narrow audiences. Trust Facebook's AI to find your customers.</p>
      
      <h3>Creative Best Practices</h3>
      <p>Video ads under 15 seconds perform best. Hook viewers in the first 3 seconds and include clear calls-to-action.</p>
      
      <h3>Budget Optimization</h3>
      <p>Advantage+ campaigns automatically optimize across placements and audiences. Let Facebook's machine learning work for you.</p>
      
      <h3>Retargeting Strategies</h3>
      <p>Create custom audiences from website visitors, video viewers, and engaged users. Retargeting typically delivers 2-3x better conversion rates.</p>
    `,
    author: 'Emma Williams',
    date: 'April 15, 2026',
    category: 'Advertising',
    image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800',
    readTime: '4 min read'
  },
  'youtube-shorts-monetization': {
    title: 'YouTube Shorts: The Complete Monetization Guide',
    excerpt: 'YouTube Shorts can be a significant revenue stream. Learn how to create, optimize, and monetize short-form video content.',
    content: `
      <p>YouTube Shorts has exploded as a content format, with over 50 billion daily views. Here's how to turn Shorts into a profitable venture.</p>
      
      <h3>Shorts Fund & Revenue Sharing</h3>
      <p>YouTube now shares ad revenue from Shorts. Creators need 1,000 subscribers and 10M Shorts views in 90 days to qualify.</p>
      
      <h3>Content Strategy</h3>
      <p>Successful Shorts are under 60 seconds, have strong hooks, and encourage engagement. Vertical format is essential.</p>
      
      <h3>Cross-Promotion</h3>
      <p>Use Shorts to drive traffic to long-form content. Add "Related Video" links to convert Shorts viewers into subscribers.</p>
    `,
    author: 'Alex Turner',
    date: 'April 12, 2026',
    category: 'YouTube',
    image: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800',
    readTime: '5 min read'
  },
  'social-media-automation': {
    title: 'Social Media Automation Tools That Actually Work',
    excerpt: 'Save time and maintain consistency with these proven automation tools. A comprehensive review of the best options in 2026.',
    content: `
      <p>Automation can help maintain consistent posting schedules without sacrificing quality. Here are the tools we recommend in 2026.</p>
      
      <h3>Scheduling Tools</h3>
      <p>Buffer, Hootsuite, and Later allow you to schedule posts across multiple platforms. Plan weeks of content in advance.</p>
      
      <h3>Content Creation</h3>
      <p>Canva and Adobe Express streamline graphic design. Templates ensure brand consistency while saving time.</p>
      
      <h3>Analytics</h3>
      <p>Native platform insights combined with tools like Sprout Social provide comprehensive performance data.</p>
      
      <h3>What Not to Automate</h3>
      <p>Never automate engagement responses or use bots for followers. Authentic interaction is irreplaceable.</p>
    `,
    author: 'Lisa Park',
    date: 'April 10, 2026',
    category: 'Tools',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800',
    readTime: '4 min read'
  },
  'building-brand-authenticity': {
    title: 'Building Brand Authenticity on Social Media',
    excerpt: 'Authenticity wins in 2026. Learn how to build genuine connections with your audience and create a loyal community.',
    content: `
      <p>Today's consumers can spot inauthentic content from miles away. Building genuine connections is more important than ever.</p>
      
      <h3>Show Behind the Scenes</h3>
      <p>People connect with people, not logos. Share your team, your process, and your story.</p>
      
      <h3>Embrace Imperfection</h3>
      <p>Polished content has its place, but raw, authentic moments often perform better. Don't be afraid to show the real side of your business.</p>
      
      <h3>Listen and Respond</h3>
      <p>Social media is a two-way conversation. Respond to comments, ask questions, and show you value your community's input.</p>
      
      <h3>Stand for Something</h3>
      <p>Brands with clear values attract loyal followers. Be authentic about what you believe in and attract like-minded customers.</p>
    `,
    author: 'David Brown',
    date: 'April 8, 2026',
    category: 'Branding',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800',
    readTime: '5 min read'
  }
};

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const post = blogPosts[slug as keyof typeof blogPosts];

  if (!post) {
    return (
      <div className="blog-post-page">
        <div className="container">
          <div className="error-content text-center py-5">
            <h1>404</h1>
            <h2>Post Not Found</h2>
            <p>Sorry, the blog post you're looking for doesn't exist.</p>
            <Link href="/blog" className="btn custom_btn">
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-post-page">
      {/* Hero Section */}
      <section className="blog-post-hero">
        <div className="container">
          <div className="blog-post-hero-content">
            <span className="category-badge">{post.category}</span>
            <h1>{post.title}</h1>
            <div className="post-meta">
              <span className="author">
                <i className="fas fa-user"></i>
                {post.author}
              </span>
              <span className="date">
                <i className="fas fa-calendar"></i>
                {post.date}
              </span>
              <span className="read-time">
                <i className="fas fa-clock"></i>
                {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="blog-post-image">
        <div className="container">
          <img src={post.image} alt={post.title} />
        </div>
      </section>

      {/* Content */}
      <section className="blog-post-content">
        <div className="container">
          <div className="content-wrapper">
            <article dangerouslySetInnerHTML={{ __html: post.content }} />
            
            {/* Share Section */}
            <div className="share-section">
              <h4>Share this article</h4>
              <div className="share-buttons">
                <button className="share-btn facebook">
                  <i className="fab fa-facebook-f"></i>
                </button>
                <button className="share-btn twitter">
                  <i className="fab fa-twitter"></i>
                </button>
                <button className="share-btn linkedin">
                  <i className="fab fa-linkedin-in"></i>
                </button>
                <button className="share-btn whatsapp">
                  <i className="fab fa-whatsapp"></i>
                </button>
              </div>
            </div>

            {/* Author Box */}
            <div className="author-box">
              <div className="author-avatar">
                <i className="fas fa-user"></i>
              </div>
              <div className="author-info">
                <h4>{post.author}</h4>
                <p>Social media marketing expert with over 10 years of experience helping brands grow their online presence.</p>
              </div>
            </div>

            {/* Navigation */}
            <div className="post-navigation">
              <Link href="/blog" className="back-link">
                <i className="fas fa-arrow-left"></i>
                Back to Blog
              </Link>
            </div>
          </div>

          {/* Related Posts */}
          <div className="related-posts">
            <h3>Related Articles</h3>
            <div className="blog-grid">
              {Object.entries(blogPosts)
                .filter(([key]) => key !== slug)
                .slice(0, 3)
                .map(([key, relatedPost]) => (
                  <Link href={`/blog/${key}`} key={key} className="blog-card">
                    <div className="blog-image">
                      <img src={relatedPost.image} alt={relatedPost.title} />
                      <span className="category-badge">{relatedPost.category}</span>
                    </div>
                    <div className="blog-content">
                      <h4>{relatedPost.title}</h4>
                      <p>{relatedPost.excerpt}</p>
                      <div className="blog-meta">
                        <span>{relatedPost.date}</span>
                        <span>{relatedPost.readTime}</span>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
