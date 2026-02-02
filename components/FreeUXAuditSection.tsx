import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Search, Target, TrendingUp, ArrowRight, CheckCircle2 } from 'lucide-react';

const FreeUXAuditSection: React.FC = () => {

  const benefits = [
    'Identify conversion barriers and friction points',
    'Get specific recommendations based on your goals',
    'Understand user behavior and pain points',
    'Prioritize improvements that drive results'
  ];

  return (
    <section className="relative py-20 md:py-32 bg-studio-bg overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="text-studio-accent font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
              Free quick look
            </span>
            <h2 className="font-serif font-bold text-4xl md:text-5xl lg:text-6xl text-studio-ink leading-[1.05] mb-6">
              Your site might be losing leads. Let's fix it.
            </h2>
            <p className="text-lg text-studio-muted mb-8 leading-relaxed">
              I’ll take a look and tell you what’s working, what’s not, and what to fix first. Simple, friendly, no jargon.
            </p>

            {/* Benefits List */}
            <ul className="space-y-3 mb-8">
              {[
                'Find the 3-5 things killing your conversions',
                'Get specific fixes-not generic advice',
                'See exactly where clients drop off',
                'Know what to fix first for maximum impact'
              ].map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-studio-accent flex-shrink-0 mt-0.5" />
                  <span className="text-studio-ink">{benefit}</span>
                </li>
              ))}
            </ul>

            {/* Icon Grid */}
            <div className="flex gap-6 mb-8">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-xl bg-studio-accent/10 flex items-center justify-center mb-2">
                  <Search className="w-6 h-6 text-studio-accent" />
                </div>
                <span className="text-xs text-studio-muted text-center">Deep Analysis</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-xl bg-studio-accent/10 flex items-center justify-center mb-2">
                  <Target className="w-6 h-6 text-studio-accent" />
                </div>
                <span className="text-xs text-studio-muted text-center">Goal-Focused</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-xl bg-studio-accent/10 flex items-center justify-center mb-2">
                  <TrendingUp className="w-6 h-6 text-studio-accent" />
                </div>
                <span className="text-xs text-studio-muted text-center">Actionable Insights</span>
              </div>
            </div>
          </motion.div>

          {/* Right: CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col justify-center"
          >
            <div className="bg-white border border-studio-ink/10 rounded-2xl p-8 md:p-10 text-center shadow-lg">
              <h3 className="font-bold text-2xl md:text-3xl text-studio-ink mb-4">
                Ready to see what’s going on?
              </h3>
              <p className="text-studio-muted mb-8 text-lg">
                Book a quick chat and I’ll get back with clear next steps.
              </p>
              
              <Link
                to="/#contact"
                className="inline-flex items-center justify-center gap-3 w-full font-sans font-bold bg-studio-accent text-white hover:bg-studio-accent/90 py-4 px-8 rounded-xl text-xs tracking-widest uppercase transition-all duration-300 group shadow-lg"
              >
                Book a quick chat
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              
              <p className="text-studio-muted text-xs mt-6">
                Free. No spam. I’ll get back within 48 hours.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FreeUXAuditSection;
