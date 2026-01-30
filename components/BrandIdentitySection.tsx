import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const BrandIdentitySection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-studio-bg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <span className="text-studio-accent font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
            Brand Direction
          </span>
          <h2 className="font-serif font-bold text-4xl md:text-5xl text-studio-ink mb-4">
            Logo & Identity Work
          </h2>
          <p className="text-studio-muted text-lg max-w-xl">
            When your brand needs more than just a website, I help with logo design and visual direction.
          </p>
        </div>

        {/* Featured Client Logo - Hariz */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="bg-white border border-studio-ink/5 rounded-3xl overflow-hidden mb-8"
        >
          <div className="grid md:grid-cols-2 gap-0">
            {/* Logo Display */}
            <div className="bg-studio-ink p-12 md:p-16 flex items-center justify-center min-h-[300px]">
              <motion.img
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                src="/Assets/hariz-logo-lines.svg"
                alt="Hariz Crane Trucks Logo"
                className="w-full max-w-xs h-auto"
              />
            </div>
            
            {/* Context */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <span className="text-studio-accent font-bold tracking-[0.2em] uppercase text-[10px] mb-3">
                Client Work
              </span>
              <h3 className="font-serif font-bold text-2xl md:text-3xl text-studio-ink mb-4">
                Hariz Crane Trucks
              </h3>
              <p className="text-studio-muted mb-6">
                Logo direction and refinement for a Sydney-based crane hire company. Focused on creating a mark that feels professional, trustworthy, and works at any size.
              </p>
              
              <ul className="space-y-2 mb-6">
                {["Logo refinement & cleanup", "Multiple format exports", "Brand color guidance"].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-studio-muted">
                    <span className="w-1.5 h-1.5 rounded-full bg-studio-accent" />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                to="/work/hariz"
                className="inline-flex items-center gap-2 text-studio-accent font-bold tracking-widest uppercase text-xs group"
              >
                View full project
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Additional context */}
        <p className="text-studio-muted text-sm">
          Need logo work alongside your website? <Link to="/contact" className="text-studio-accent hover:underline">Let's talk</Link>.
        </p>
      </div>
    </section>
  );
};

export default BrandIdentitySection;
