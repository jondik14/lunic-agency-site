import React from 'react';
import { motion } from 'motion/react';

/* ——— Replace with your copy; put your portrait at public/Assets/bw-portrait.png (or update path) ——— */
const FOUNDER_HEADING = 'The face behind the studio.';
const FOUNDER_INTRO = [
  "I started LUNIC because too many good businesses get let down by slow, unclear websites. What you do matters - your site should help, not hide it.",
  "I've worked across product and web design in startups and service-based businesses, giving me a strong understanding of how websites support real workflows, enquiries, and business decisions.",
  "I focus on one thing: sites that turn visitors into enquiries. Clear messaging, fast load times, and design that's built around how people actually behave.",
  "Solo-founded, direct collaboration. No account managers or long chains - you work with the person doing the work.",
];
const FOUNDER_NAME = 'Luke Niccol';
const FOUNDER_TITLE = 'Founder, LUNIC Studio';
const PORTRAIT_SRC = '/Assets/bw-portrait.png';

const TrustSection: React.FC = () => {

  return (
    <section className="relative py-24 md:py-40 bg-white overflow-hidden" data-theme="light">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Central heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-serif font-bold text-studio-ink text-center leading-[1.05] max-w-[800px] mx-auto"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)', marginBottom: 'clamp(3rem, 6vw, 4rem)' }}
        >
          {FOUNDER_HEADING}
        </motion.h2>

        {/* Two columns: portrait (left) + copy (right) — aligned at top */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Portrait — fixed aspect so grid stays aligned */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:col-span-5 w-full"
          >
            <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-studio-bg aspect-[3/4] max-h-[520px] w-full shadow-lg">
              <img
                src={PORTRAIT_SRC}
                alt=""
                className="w-full h-full object-cover object-top"
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>

          {/* Copy + signature — aligns to top of portrait */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:col-span-7 relative pt-0 flex flex-col"
          >
            {/* Subtle background initialism / accent */}
            <span
              className="absolute -top-4 -right-4 md:right-0 text-[clamp(6rem,18vw,12rem)] font-serif font-bold text-studio-ink/[0.04] select-none pointer-events-none leading-none"
              aria-hidden
            >
              L
            </span>

            <div className="space-y-5 md:space-y-6 max-w-2xl relative z-10">
              {FOUNDER_INTRO.map((p, i) => (
                <p key={i} className="text-studio-ink text-base md:text-lg leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            {/* Name + location — clean, personal treatment */}
            <div className="mt-8 md:mt-10 flex flex-col">
              <span className="font-sans font-semibold text-lg text-studio-accent">
                {FOUNDER_NAME}
              </span>
              <span className="font-sans text-sm text-studio-muted mt-1">
                Sydney / Remote
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
