import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Button from './Button';

/* ——— COPY: Option A — Strong + minimal (recommended) ——— */
const HEADLINE = 'Your website is deciding for your clients — before you ever speak to them.';
const BODY_1 = "If it's clear, fast, and credible, it earns enquiries.";
const BODY_2 = "If it's not, they move on.";
const SUPPORTING_LINE = 'Small changes here often make the biggest difference.';
const CTA_LABEL = 'Request a website review';

const TrustCTASection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const contentY = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -40]);

  return (
    <section
      ref={sectionRef}
      className="TrustCTASection relative py-16 md:py-24 overflow-x-hidden"
      data-theme="dark"
      aria-labelledby="speed-cta-heading"
    >
      {/* Full‑bleed blue gradient, viewport width, angled top — no box. */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-screen z-0 overflow-hidden">
        <motion.div
          initial={{ clipPath: 'polygon(100% 4%, 100% 0, 100% 100%, 100% 100%)' }}
          animate={{ clipPath: 'polygon(0 4%, 100% 0, 100% 100%, 0 100%)' }}
          transition={{ 
            duration: 1.2, 
            ease: [0.25, 0.1, 0.25, 1] // Custom cubic-bezier for smooth easing at start and end
          }}
          className="absolute inset-0"
        >
          <motion.div
            className="trust-cta-gradient-layer absolute inset-0"
            animate={{
              backgroundPosition: ['100% 50%', '0% 50%', '100% 50%'],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              backgroundImage: 'linear-gradient(135deg, #0f3460 0%, #134078 12%, #1C4E97 25%, #215ba3 35%, #2563ab 45%, #3b82f6 58%, #2563ab 70%, #1C4E97 82%, #134078 92%, #0f3460 100%)',
              backgroundSize: '400% 400%',
              backgroundPosition: '100% 50%',
            }}
            aria-hidden
          />
          <motion.div
            className="trust-cta-gradient-layer-2 absolute inset-0 pointer-events-none"
            animate={{
              backgroundPosition: ['100% 50%', '0% 50%', '100% 50%'],
            }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              backgroundImage: 'linear-gradient(315deg, transparent 0%, rgba(59,130,246,0.25) 35%, rgba(96,165,250,0.2) 55%, transparent 100%)',
              backgroundSize: '300% 300%',
              backgroundPosition: '100% 50%',
            }}
            aria-hidden
          />
          {/* Dynamic dark overlay - smooth, subtle movement */}
          <motion.div
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 25%, rgba(0,0,0,0.1) 50%, transparent 75%)',
              backgroundSize: '150% 150%',
              backgroundPosition: '0% 50%',
            }}
            aria-hidden
          />
          {/* Additional subtle dark layer for depth */}
          <motion.div
            animate={{
              backgroundPosition: ['100% 50%', '0% 50%', '100% 50%'],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 30%, transparent 60%)',
              backgroundSize: '200% 100%',
              backgroundPosition: '100% 50%',
            }}
            aria-hidden
          />
        </motion.div>
      </div>

      {/* Content — editorial layout, generous spacing, calm and narrative-led */}
      <motion.div
        style={{ 
          y: contentY,
          paddingTop: 'clamp(6rem, 12vw, 10rem)', 
          paddingBottom: 'clamp(6rem, 12vw, 10rem)',
          paddingLeft: 'clamp(1rem, 3vw, 2.5rem)',
          paddingRight: 'clamp(1rem, 3vw, 2.5rem)'
        }}
        className="relative z-10 w-full max-w-3xl mx-auto"
      >
        <div className="text-center">
          {/* Headline: large, calm, confident */}
          <h2
            id="speed-cta-heading"
            className="font-serif font-bold text-white leading-[1.1] tracking-tight mb-8 md:mb-12"
            style={{ fontSize: 'clamp(2rem, 5.5vw, 4rem)' }}
          >
            {HEADLINE}
          </h2>
          
          {/* Short pause / spacing */}
          <div className="mb-8 md:mb-10" aria-hidden />
          
          {/* Body copy: max 2 short lines, increased line spacing */}
          <div className="mb-4 max-w-xl mx-auto" style={{ lineHeight: 1.8 }}>
            <p className="text-white/95 mb-3" style={{ fontSize: 'clamp(1.125rem, 2.5vw, 1.25rem)' }}>
              {BODY_1}
            </p>
            <p className="text-white/95" style={{ fontSize: 'clamp(1.125rem, 2.5vw, 1.25rem)' }}>
              {BODY_2}
            </p>
          </div>

          {/* Optional small line - lighter weight */}
          <p className="text-white/80 text-base md:text-lg leading-relaxed italic mb-10 md:mb-12 max-w-lg mx-auto" style={{ fontWeight: 300 }}>
            {SUPPORTING_LINE}
          </p>

          {/* CTA - visually dominant */}
          <div>
            <Button
              to="/#contact"
              variant="primary"
              className="!bg-white !text-studio-ink hover:!bg-gray-100 !rounded-lg px-8 md:px-10 py-4 md:py-5 text-base md:text-lg font-bold shadow-xl shadow-black/25 focus-visible:!ring-2 focus-visible:!ring-white focus-visible:!ring-offset-2 focus-visible:!ring-offset-[#1C4E97]"
            >
              {CTA_LABEL}
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default TrustCTASection;
