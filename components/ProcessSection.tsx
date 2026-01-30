import React from 'react';
import { motion } from 'motion/react';
import Button from './Button';
import DiscoveryCtaCarousels from './DiscoveryCtaCarousels';
import LazyImage from './LazyImage';

const ProcessSection: React.FC = () => {
  return (
    <section id="process" className="process-section relative overflow-x-hidden bg-black flex flex-col justify-center items-center" style={{ paddingTop: 'clamp(3rem, 7vw, 8rem)', paddingBottom: 'clamp(3rem, 7vw, 8rem)', minHeight: 'clamp(600px, 90vw, 1350px)' }} data-theme="dark">
      {/* Background */}
      <div id="bgLayers_comp-process" data-hook="bgLayers" className="absolute inset-0 z-0">
        <div data-testid="colorUnderlay" className="absolute inset-0 bg-black" />
        <div id="bgMedia_comp-process" className="absolute inset-0" />
      </div>

      <div className="relative z-10 max-w-[1436px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
        {/* Header: 2-col on desktop */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-16 md:mb-20"
        >
          {/* Left: label */}
          <div className="md:col-span-2 flex md:block">
            <span className="text-white/80 font-bold tracking-[0.2em] uppercase text-xs">
              Our Process
            </span>
          </div>

          {/* Right: headline, paragraph, CTA */}
          <div className="md:col-span-10">
            <h2 className="font-serif font-normal text-white leading-[1.1] tracking-tight max-w-[800px]" style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)', marginBottom: 'clamp(1.5rem, 3vw, 2rem)' }}>
              No guesswork. A clear path to a site that <span className="text-studio-accent">converts.</span>
            </h2>
            <p className="text-white/60 leading-relaxed max-w-[640px]" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.125rem)', lineHeight: 1.6, marginBottom: 'clamp(2rem, 4vw, 2.5rem)' }}>
              We learn your business first. Then we design a site that turns visitors into enquiries. No endless revisions.
            </p>
            <Button to="/#contact" variant="primary" className="px-6 py-3 text-xs">
              Request a website review
            </Button>
          </div>
        </motion.header>

        {/* Cards row: 3 equal-height cards, same inner structure (top: icon+heading+text, bottom: CTA or image). */}
        <div className="process-section-floor process-cards-row grid grid-cols-1 md:grid-cols-3 gap-6 md:items-end pb-8 md:pb-[200px]">
          <div className="process-card-wrap">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative"
            >
              <div className="process-card relative overflow-hidden group hover:border-studio-accent/30 transition-all duration-500">
                <div className="process-card-top">
                  <h3 className="font-serif font-bold text-2xl md:text-3xl text-white mb-2">
                    Discovery First
                  </h3>
                <p className="text-white/60 text-sm md:text-base max-w-md">
                  So we don’t build the wrong thing. <span className="text-white font-semibold">Clear goals and audience first</span>-then a site that fits.
                </p>
              </div>
              <div className="process-card-bottom">
                <DiscoveryCtaCarousels />
              </div>
              </div>
              <div className="process-card-reflection hidden md:block absolute top-full -mt-px left-0 right-0 h-[200px] overflow-hidden pointer-events-none rounded-b-3xl" style={{ opacity: 0.6 }} aria-hidden>
                <LazyImage src="/Assets/discovery-first-reflection.png" alt="" className="w-full h-full object-cover object-top" rootMargin="400px" />
              </div>
            </motion.div>
          </div>

          <div className="process-card-wrap">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative"
            >
              <div className="mobileCard process-card relative overflow-hidden group hover:border-studio-accent/30 transition-all duration-500">
                <div className="process-card-top">
                  <h3 className="font-serif font-bold text-2xl md:text-3xl text-white mb-2">
                    Mobile-First Design
                  </h3>
                  <p className="text-white/60 text-sm md:text-base max-w-md">
                    Most of your visitors are on mobile. <span className="text-white font-semibold">Your site works for them first</span> - fewer bounces, more enquiries.
                  </p>
                </div>
                <div className="process-card-bottom">
                  <div className="phoneStage">
                    <LazyImage className="phone phoneLeft" src="/Assets/mobile-shot-1.png" alt="" rootMargin="400px" />
                    <LazyImage className="phone phoneRight" src="/Assets/mobile-shot-2.png" alt="" rootMargin="400px" />
                  </div>
                </div>
              </div>
              <div className="process-card-reflection hidden md:block absolute top-full -mt-px left-0 right-0 h-[200px] overflow-hidden pointer-events-none rounded-b-3xl" style={{ opacity: 0.6 }} aria-hidden>
                <LazyImage src="/Assets/mobile-first-design-reflection.png" alt="" className="w-full h-full object-cover object-top" rootMargin="400px" />
              </div>
            </motion.div>
          </div>

          <div className="process-card-wrap">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.16, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative"
            >
              <div className="process-card relative overflow-hidden group hover:border-studio-accent/30 transition-all duration-500">
                <div className="process-card-top">
                  <h3 className="font-serif font-bold text-2xl md:text-3xl text-white mb-2">
                    Conversion-Driven
                  </h3>
                  <p className="text-white/60 text-sm md:text-base max-w-md">
                    Every page has a job: <span className="text-white font-semibold">get more enquiries.</span> No dead ends, no wasted clicks.
                  </p>
                </div>
                <div className="process-card-bottom">
                  <div className="flex flex-wrap items-center justify-center w-full md:w-[538px] h-auto md:h-[300px]">
                    <LazyImage src="/Assets/mcbook-google-data.png" alt="MacBook with analytics" className="w-full max-w-full md:max-w-[770px] h-auto object-contain" rootMargin="400px" />
                  </div>
                </div>
              </div>
              <div className="process-card-reflection hidden md:block absolute top-full -mt-px left-0 right-0 h-[200px] overflow-hidden pointer-events-none rounded-b-3xl" style={{ opacity: 0.6 }} aria-hidden>
                <LazyImage src="/Assets/conversion-driven-reflection.png" alt="" className="w-full h-full object-cover object-top object-[right_top]" rootMargin="400px" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
