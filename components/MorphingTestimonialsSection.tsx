import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote, Play } from 'lucide-react';
import { TESTIMONIALS } from '../constants';

const MorphingTestimonialsSection: React.FC = () => {
  return (
    <section className="relative py-24 md:py-32 bg-studio-bg overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-12 md:mb-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="text-studio-accent font-bold text-xs uppercase tracking-[0.2em] mb-4 block">
              Client Success
            </span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight leading-[1.1] text-studio-ink">
              What Our Clients Say
            </h2>
          </div>
          <p className="text-studio-muted text-lg max-w-md">
            Don't just take our word for it. Here's what business owners say about working with us.
          </p>
        </div>
      </div>

      {/* Featured Video Testimonial Placeholder */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-studio-ink rounded-3xl overflow-hidden aspect-video md:aspect-[21/9]"
        >
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop"
            alt="Video testimonial"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="group flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 text-studio-ink ml-1" fill="currentColor" />
              </div>
              <span className="text-white text-sm font-bold tracking-wider uppercase">
                Watch Client Story
              </span>
            </button>
          </div>
          <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
            <p className="text-white font-sans text-xl md:text-2xl font-bold">Emma Thompson</p>
            <p className="text-white/60 text-sm">CEO, Titan Roof Systems</p>
          </div>
        </motion.div>
      </div>

      {/* Testimonials Grid */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.slice(0, 6).map((t, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="group relative bg-white border border-studio-ink/10 p-8 rounded-3xl hover:shadow-xl hover:shadow-studio-accent/5 transition-all duration-500"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 -left-2 w-12 h-12 bg-studio-accent rounded-2xl flex items-center justify-center shadow-lg">
                <Quote className="w-5 h-5 text-white fill-white" />
              </div>
              
              {/* Stars */}
              <div className="flex gap-1 mb-6 pt-4">
                {[...Array(t.stars || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-studio-accent text-studio-accent" />
                ))}
              </div>
              
              {/* Quote */}
              <p className="text-studio-ink/70 text-base leading-relaxed mb-8 font-medium">
                "{t.quote}"
              </p>

              {/* Author with Photo */}
              <div className="flex items-center gap-4 pt-6 border-t border-studio-ink/10">
                {t.image ? (
                  <img 
                    src={t.image} 
                    alt={t.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-studio-accent to-studio-accent/60 flex items-center justify-center text-white font-bold text-lg">
                    {t.author[0]}
                  </div>
                )}
                <div>
                  <p className="font-bold text-studio-ink">{t.author}</p>
                  <p className="text-studio-muted text-sm">
                    {t.role}, {t.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats Bar */}
      <div className="max-w-7xl mx-auto px-6 mt-16 md:mt-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-b border-studio-ink/10">
          {[
            { value: "50+", label: "Projects Delivered" },
            { value: "100%", label: "Client Satisfaction" },
            { value: "5.0", label: "Average Rating" },
            { value: "48h", label: "Response Time" },
          ].map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-center"
            >
              <p className="text-4xl md:text-5xl font-sans font-bold text-studio-accent mb-2">{stat.value}</p>
              <p className="text-studio-muted text-sm font-medium uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MorphingTestimonialsSection;
