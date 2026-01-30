import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, ArrowLeft, Clock } from 'lucide-react';
import { loadBlogPost, BlogPost as BlogPostType } from '../../utils/blogLoader';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      loadBlogPost(slug).then(loadedPost => {
        setPost(loadedPost);
        setLoading(false);
      });
    }
  }, [slug]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (loading) {
    return (
      <article className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-studio-muted">Loading post...</p>
      </article>
    );
  }

  if (!post) {
    return (
      <article className="min-h-screen bg-white">
        <section className="pt-32 pb-12 md:pt-48 md:pb-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-studio-accent hover:text-studio-ink mb-8 transition-colors text-sm font-bold uppercase tracking-wider"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
            <h1 className="font-serif font-bold text-4xl text-studio-ink mb-6">
              Post Not Found
            </h1>
            <p className="text-studio-muted">The blog post you're looking for doesn't exist.</p>
          </div>
        </section>
      </article>
    );
  }

  return (
    <article className="min-h-screen bg-white">
      {/* Header */}
      <section className="pt-32 pb-12 md:pt-48 md:pb-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-studio-accent hover:text-studio-ink mb-8 transition-colors text-sm font-bold uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="flex items-center gap-4 mb-6 text-xs text-studio-muted">
              <span className="font-bold uppercase tracking-wider text-studio-accent">
                {post.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readTime}
              </span>
            </div>

            <h1 className="font-serif font-bold text-4xl md:text-5xl lg:text-6xl text-studio-ink leading-[1.05] mb-6">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="text-lg md:text-xl text-studio-muted leading-relaxed max-w-3xl">
                {post.excerpt}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 md:py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-studio-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h2 className="font-serif font-bold text-3xl md:text-4xl text-studio-ink mb-4">
              Ready to improve your website?
            </h2>
            <p className="text-lg text-studio-muted mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help optimize your site for better conversions.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 font-sans font-bold bg-studio-accent text-white hover:bg-studio-accent/90 px-8 py-4 text-sm tracking-widest uppercase rounded-xl transition-all shadow-lg"
            >
              Get Started
            </Link>
          </motion.div>
        </div>
      </section>
    </article>
  );
};

export default BlogPost;
