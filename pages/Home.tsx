import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import Button from '../components/Button';
import BlurText from '../components/BlurText';
import TopographicLinesBackground from '../components/TopographicLinesBackground';
import TrustCTASection from '../components/TrustCTASection';
import WorkShowcaseSection from '../components/WorkShowcaseSection';
import ServicesSection from '../components/ServicesSection';
import ProcessSection from '../components/ProcessSection';
import TrustSection from '../components/TrustSection';
import BlogPreviewSection from '../components/BlogPreviewSection';
import ContactFormSection from '../components/ContactFormSection';

// Honest credentials
const credentials = [
  { value: "4+", label: "Years Experience" },
  { value: "Solo", label: "Founder-Led" }
];

const Home: React.FC = () => {
  return (
    <>
      <div className="relative z-10 w-full">
        {/* Hero Section — conversion-focused. Tweak copy in BlurText, motion.p, and CTA blocks. */}
        <section className="relative flex flex-col items-center justify-center overflow-hidden" style={{ paddingTop: 'clamp(3rem, 8vw, 7rem)', paddingBottom: 'clamp(3rem, 8vw, 7rem)', minHeight: 'clamp(70vh, 80vw, 85vh)' }} data-theme="light">
          {/* Topographic Lines Background */}
          <TopographicLinesBackground 
            color="#328FFF"
            opacity={0.25}
            speed={0.15}
            levels={12}
            resolution={20}
            lineWidth={2.5}
          />
          
          {/* Centered Content */}
          <div className="relative z-10 w-full max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
            <h1 className="sr-only">Stop losing high-value clients to bad first impressions.</h1>
            <div style={{ fontSize: 'clamp(2.25rem, 7vw, 4.5rem)' }} className="mb-8 md:mb-12 flex justify-center">
              <BlurText
                text="Stop losing high-value clients to bad first impressions."
                className="font-serif font-bold leading-[1.08] text-studio-ink tracking-tight text-center"
                delay={100}
                animateBy="words"
                direction="top"
                aria-hidden="true"
              />
            </div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-sans text-studio-muted mb-10 md:mb-12 max-w-2xl mx-auto text-center"
              style={{ 
                fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                lineHeight: '1.75',
                letterSpacing: '0.01em'
              }}
            >
              I help service-based businesses upgrade their websites and digital presence so they earn trust faster, convert enquiries, and grow revenue.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
            >
              <Button to="/#contact" variant="primary">
                Request a website review
              </Button>
              <Button to="/#work" variant="outline">
                View work
              </Button>
            </motion.div>
          </div>

          {/* Bottom fade-away gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-20 pointer-events-none" aria-hidden />

          {/* Scroll cue: subtle. prefers-reduced-motion handled globally. Tweak bottom-* or remove to hide. */}
          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5 opacity-50 z-30"
            aria-hidden
          >
            <span className="text-[10px] uppercase tracking-widest text-studio-muted">Scroll</span>
            <ChevronDown className="w-5 h-5 text-studio-muted animate-bounce [animation-duration:2.5s]" />
          </div>
        </section>

        {/* Trust + clarity CTA — before case studies */}
        <TrustCTASection />

        {/* Work Showcase / Case Studies */}
        <WorkShowcaseSection />

        {/* Services Section */}
        <ServicesSection />

        {/* Process Section */}
        <ProcessSection />

        {/* Trust Section */}
        <TrustSection />

        {/* Blog Preview Section */}
        <BlogPreviewSection />

        {/* Contact Form Section */}
        <ContactFormSection />
      </div>
    </>
  );
};

export default Home;
