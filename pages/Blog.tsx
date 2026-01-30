import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, ArrowRight } from 'lucide-react';
import { loadAllBlogPosts, BlogPostMetadata } from '../utils/blogLoader';

const Blog: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPostMetadata[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllBlogPosts().then(posts => {
      setBlogPosts(posts);
      setLoading(false);
    });
  }, []);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-24 bg-white" data-theme="light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center"
          >
            <span className="text-studio-accent font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
              Blog
            </span>
            <h1 className="font-serif font-bold text-4xl md:text-5xl lg:text-6xl text-studio-ink leading-[1.05] mb-6">
              Insights & Strategies
            </h1>
            <p className="text-xl text-studio-muted max-w-2xl mx-auto">
              Practical advice on web design, conversion optimization, and growing your service business online.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">
              <p className="text-studio-muted">Loading blog posts...</p>
            </div>
          ) : blogPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-studio-muted">No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, idx) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                className="group"
              >
                <Link to={`/blog/${post.slug}`} className="block h-full">
                  <div className="bg-white border-2 border-studio-ink/10 rounded-2xl overflow-hidden hover:border-studio-accent/40 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                    {/* Image */}
                    {post.image && (
                      <div className="aspect-[16/9] overflow-hidden bg-studio-bg">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    
                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      {/* Category & Date */}
                      <div className="flex items-center gap-4 mb-3 text-xs text-studio-muted">
                        <span className="font-bold uppercase tracking-wider text-studio-accent">
                          {post.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(post.date)}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="font-serif font-bold text-xl md:text-2xl text-studio-ink mb-3 group-hover:text-studio-accent transition-colors">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-studio-muted mb-4 flex-1">
                        {post.excerpt}
                      </p>

                      {/* Read More */}
                      <div className="flex items-center justify-between pt-4 border-t border-studio-ink/10">
                        <span className="text-xs text-studio-muted">{post.readTime}</span>
                        <span className="text-studio-accent font-bold text-xs uppercase tracking-wider flex items-center gap-2 group-hover:gap-3 transition-all">
                          Read More
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
