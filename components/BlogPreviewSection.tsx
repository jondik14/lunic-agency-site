import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { loadAllBlogPosts, BlogPostMetadata } from '../utils/blogLoader';

interface ComingSoonCard {
  slug: string;
  title: string;
  excerpt: string;
  comingSoon: true;
}

const COMING_SOON_CARDS: ComingSoonCard[] = [
  {
    slug: 'coming-soon-1',
    title: 'Why Clear Messaging Beats More Features',
    excerpt: 'Most service businesses try to say everything. Here\'s why saying less actually converts better.',
    comingSoon: true,
  },
  {
    slug: 'coming-soon-2',
    title: 'The #1 Reason Enquiry Forms Don\'t Convert',
    excerpt: 'It\'s not the design. It\'s not the placement. It\'s something most businesses overlook entirely.',
    comingSoon: true,
  },
];

const BlogPreviewSection: React.FC = () => {
  const [featuredPosts, setFeaturedPosts] = useState<(BlogPostMetadata | ComingSoonCard)[]>([]);

  useEffect(() => {
    loadAllBlogPosts().then(posts => {
      const actualPosts = posts.slice(0, 3);
      const comingSoonNeeded = Math.max(0, 3 - actualPosts.length);
      const comingSoonCards = COMING_SOON_CARDS.slice(0, comingSoonNeeded);
      setFeaturedPosts([...actualPosts, ...comingSoonCards]);
    });
  }, []);

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden" data-theme="light">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-10 md:mb-12"
        >
          <span className="text-studio-muted font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
            INSIGHTS
          </span>
          <h2 className="font-serif font-bold text-studio-ink leading-[1.05] max-w-[800px] mx-auto" style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)', marginBottom: 'clamp(1rem, 2vw, 1.5rem)' }}>
            How I help service businesses get more enquiries
          </h2>
          <p className="text-studio-muted max-w-2xl mx-auto" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.125rem)' }}>
            Clear, practical thinking I use when reviewing real client websites.
          </p>
        </motion.div>

        {/* Featured Posts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10">
          {featuredPosts.map((post, idx) => {
            const isComingSoon = 'comingSoon' in post && post.comingSoon;
            
            return (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                className="group"
              >
                {isComingSoon ? (
                  <div className="bg-studio-bg border-2 border-studio-ink/10 rounded-2xl p-6 md:p-8 h-full opacity-75">
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-studio-muted/20 text-studio-muted text-xs font-bold uppercase tracking-wider rounded-full">
                        Coming soon
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-xl md:text-2xl text-studio-ink/80 mb-4">
                      {post.title}
                    </h3>
                    <p className="text-studio-muted/80 text-sm md:text-base">
                      {post.excerpt}
                    </p>
                  </div>
                ) : (
                  <Link to={`/blog/${post.slug}`} className="block">
                    <div className="bg-studio-bg border-2 border-studio-ink/10 rounded-2xl p-6 md:p-8 hover:border-studio-accent/40 hover:shadow-xl transition-all duration-300 h-full">
                      <h3 className="font-serif font-bold text-xl md:text-2xl text-studio-ink mb-4 group-hover:text-studio-accent transition-colors" style={{ color: '#1A1A1A' }}>
                        {post.title}
                      </h3>

                      <p className="text-studio-muted mb-6 text-sm md:text-base">
                        {post.excerpt}
                      </p>

                      <span className="inline-flex items-center gap-2 text-studio-accent hover:text-studio-accent font-semibold text-sm uppercase tracking-wider group-hover:gap-3 transition-all">
                        Read the full guide
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BlogPreviewSection;
