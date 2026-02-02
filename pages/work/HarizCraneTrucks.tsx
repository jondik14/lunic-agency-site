import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import BlurText from '../../components/BlurText';
import Button from '../../components/Button';

const HarizCraneTrucks: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-8 pb-12 md:pt-16 md:pb-20 bg-white border-b border-studio-ink/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to="/#work" 
            className="inline-flex items-center gap-2 text-studio-muted hover:text-studio-accent text-sm font-medium transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to work
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-12"
          >
            <span className="text-studio-muted font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
              Case Study
            </span>
            <h1 className="sr-only">Hariz Crane Trucks - Sydney</h1>
            <BlurText 
              text="Hariz Crane Trucks - Sydney"
              className="font-serif font-bold text-4xl md:text-5xl lg:text-6xl text-studio-ink mb-6 leading-[1.08] tracking-tight"
              delay={100}
              aria-hidden="true"
            />
            <p className="text-xl md:text-2xl text-studio-muted max-w-3xl leading-relaxed">
              A website rebuild focused on clarity, trust, and making it easy for potential clients to request quotes.
            </p>
          </motion.div>

          {/* Hero Visual - Desktop and Mobile */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative bg-studio-ink/5 rounded-3xl overflow-hidden"
          >
            <div className="aspect-[16/10] flex items-center justify-center p-8 lg:p-16">
              <div className="relative flex items-end justify-center gap-6 w-full max-w-6xl">
                {/* Desktop Mockup */}
                <img 
                  src="/Assets/macbook-air-13-4th-gen-midnight-1.png" 
                  alt="Hariz Crane Trucks website on desktop"
                  className="w-full max-w-4xl drop-shadow-2xl"
                  loading="lazy"
                  decoding="async"
                />
                {/* Mobile Mockup */}
                <img 
                  src="/Assets/iphone-16-pro-max-black-titanium-portrait-1.png" 
                  alt="Hariz Crane Trucks website on mobile"
                  className="absolute -right-8 -bottom-8 w-32 md:w-40 lg:w-48 drop-shadow-2xl"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-8"
          >
            <div>
              <h2 className="font-serif font-bold text-3xl md:text-4xl text-studio-ink mb-6">
                Project Overview
              </h2>
              <p className="text-lg text-studio-muted leading-relaxed mb-8">
                Hariz Crane Trucks is a Sydney-based crane hire company serving construction and industrial clients. The website needed to establish credibility, clearly communicate services, and make it straightforward for potential clients to request quotes.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 pt-8 border-t border-studio-ink/5">
              <div>
                <p className="text-xs font-bold tracking-wider uppercase text-studio-muted mb-2">Industry</p>
                <p className="text-studio-ink font-medium">Construction / Equipment Hire</p>
              </div>
              <div>
                <p className="text-xs font-bold tracking-wider uppercase text-studio-muted mb-2">Project Type</p>
                <p className="text-studio-ink font-medium">Website Rebuild</p>
              </div>
              <div>
                <p className="text-xs font-bold tracking-wider uppercase text-studio-muted mb-2">Primary Goal</p>
                <p className="text-studio-ink font-medium">Clarity, Trust, Enquiries</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-16 md:py-24 bg-studio-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-8"
          >
            <div>
              <h2 className="font-serif font-bold text-3xl md:text-4xl text-studio-ink mb-6">
                The Problem
              </h2>
              <p className="text-lg text-studio-muted leading-relaxed mb-6">
                The previous website had several issues that were likely impacting first impressions and enquiry rates:
              </p>
              <ul className="space-y-4 text-studio-muted">
                <li className="flex items-start gap-3">
                  <span className="text-studio-accent mt-1">•</span>
                  <span><strong className="text-studio-ink">Outdated design:</strong> The visual style didn't reflect the professional, reliable service the company provides.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-studio-accent mt-1">•</span>
                  <span><strong className="text-studio-ink">Slow performance:</strong> Pages took too long to load, especially on mobile devices.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-studio-accent mt-1">•</span>
                  <span><strong className="text-studio-ink">Poor mobile experience:</strong> The site wasn't optimized for mobile, where many potential clients would be browsing on-site.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-studio-accent mt-1">•</span>
                  <span><strong className="text-studio-ink">Weak first impression:</strong> The overall presentation didn't build trust or clearly communicate value.</span>
                </li>
              </ul>
            </div>

            {/* Before Screenshot */}
            <div className="pt-8">
              <p className="text-sm font-bold tracking-wider uppercase text-studio-muted mb-4">Before</p>
              <div className="bg-white rounded-2xl overflow-hidden border border-studio-ink/10 shadow-lg">
                <div className="aspect-video bg-studio-ink/5 flex items-center justify-center">
                  <p className="text-studio-muted text-sm">Legacy website screenshot</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Solution */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-8"
          >
            <div>
              <h2 className="font-serif font-bold text-3xl md:text-4xl text-studio-ink mb-6">
                The Solution
              </h2>
              <p className="text-lg text-studio-muted leading-relaxed mb-6">
                The rebuild focused on creating a clear, trustworthy foundation:
              </p>
              <ul className="space-y-4 text-studio-muted">
                <li className="flex items-start gap-3">
                  <span className="text-studio-accent mt-1">•</span>
                  <span><strong className="text-studio-ink">Clear messaging and hierarchy:</strong> Services and value propositions are immediately visible, with a logical flow that guides visitors toward enquiry.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-studio-accent mt-1">•</span>
                  <span><strong className="text-studio-ink">Conversion-focused layout:</strong> Strategic placement of contact forms and call-to-action buttons throughout the site.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-studio-accent mt-1">•</span>
                  <span><strong className="text-studio-ink">Mobile-first design:</strong> Built to perform well on all devices, with particular attention to mobile usability.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-studio-accent mt-1">•</span>
                  <span><strong className="text-studio-ink">Simplified enquiry flow:</strong> Reduced friction in the quote request process.</span>
                </li>
              </ul>
            </div>

            {/* After Screenshot */}
            <div className="pt-8">
              <p className="text-sm font-bold tracking-wider uppercase text-studio-muted mb-4">After</p>
              <div className="bg-white rounded-2xl overflow-hidden border border-studio-ink/10 shadow-lg">
                <div className="aspect-video bg-studio-ink/5 flex items-center justify-center">
                  <p className="text-studio-muted text-sm">Rebuilt website screenshot</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Performance & Technical Foundation */}
      <section className="py-16 md:py-24 bg-studio-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-8"
          >
            <div>
              <h2 className="font-serif font-bold text-3xl md:text-4xl text-studio-ink mb-6">
                Performance & Technical Foundation
              </h2>
              <p className="text-lg text-studio-muted leading-relaxed mb-6">
                Before launch, the site was optimized for performance, accessibility, best practices, and SEO fundamentals. These scores represent a strong technical baseline that supports better user experience and search visibility.
              </p>
              <p className="text-base text-studio-muted leading-relaxed mb-8 italic">
                Note: These are technical performance metrics, not business results. As this is an early-stage project, long-term conversion and revenue data will be tracked over time.
              </p>
            </div>

            {/* Lighthouse Scores */}
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-sm font-bold tracking-wider uppercase text-studio-muted mb-4">Before</p>
                <div className="bg-white rounded-2xl overflow-hidden border border-studio-ink/10 shadow-lg">
                  <div className="aspect-video bg-studio-ink/5 flex items-center justify-center">
                    <p className="text-studio-muted text-sm">Lighthouse scores (before)</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm font-bold tracking-wider uppercase text-studio-muted mb-4">After</p>
                <div className="bg-white rounded-2xl overflow-hidden border border-studio-ink/10 shadow-lg">
                  <div className="aspect-video bg-studio-ink/5 flex items-center justify-center">
                    <p className="text-studio-muted text-sm">Lighthouse scores (after)</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Screens */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h2 className="font-serif font-bold text-3xl md:text-4xl text-studio-ink mb-12 text-center">
              Key Screens
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              {/* Hero Screen */}
              <div className="space-y-4">
                <div className="bg-studio-ink/5 rounded-2xl overflow-hidden border border-studio-ink/10 shadow-lg">
                  <div className="aspect-video bg-studio-ink/5 flex items-center justify-center">
                    <p className="text-studio-muted text-sm">Hero section</p>
                  </div>
                </div>
                <p className="text-sm text-studio-muted leading-relaxed">
                  <strong className="text-studio-ink">Hero:</strong> Clear value proposition and immediate call-to-action to capture attention and guide visitors toward enquiry.
                </p>
              </div>

              {/* Enquiry Form */}
              <div className="space-y-4">
                <div className="bg-studio-ink/5 rounded-2xl overflow-hidden border border-studio-ink/10 shadow-lg">
                  <div className="aspect-video bg-studio-ink/5 flex items-center justify-center">
                    <p className="text-studio-muted text-sm">Enquiry form</p>
                  </div>
                </div>
                <p className="text-sm text-studio-muted leading-relaxed">
                  <strong className="text-studio-ink">Enquiry Form:</strong> Streamlined form with minimal fields to reduce friction and increase completion rates.
                </p>
              </div>

              {/* Service Section */}
              <div className="space-y-4">
                <div className="bg-studio-ink/5 rounded-2xl overflow-hidden border border-studio-ink/10 shadow-lg">
                  <div className="aspect-video bg-studio-ink/5 flex items-center justify-center">
                    <p className="text-studio-muted text-sm">Service section</p>
                  </div>
                </div>
                <p className="text-sm text-studio-muted leading-relaxed">
                  <strong className="text-studio-ink">Service Section:</strong> Clear presentation of services with trust signals to help visitors understand what's offered and build confidence.
                </p>
              </div>

              {/* Mobile Navigation */}
              <div className="space-y-4">
                <div className="bg-studio-ink/5 rounded-2xl overflow-hidden border border-studio-ink/10 shadow-lg">
                  <div className="aspect-video bg-studio-ink/5 flex items-center justify-center">
                    <p className="text-studio-muted text-sm">Mobile navigation</p>
                  </div>
                </div>
                <p className="text-sm text-studio-muted leading-relaxed">
                  <strong className="text-studio-ink">Mobile Navigation:</strong> Intuitive mobile menu ensuring easy access to key pages and contact options for on-the-go users.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reflection */}
      <section className="py-16 md:py-24 bg-studio-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-6"
          >
            <h2 className="font-serif font-bold text-3xl md:text-4xl text-studio-ink mb-6">
              Reflection
            </h2>
            <p className="text-lg text-studio-muted leading-relaxed">
              This rebuild establishes a solid foundation for Hariz Crane Trucks' digital presence. The new site is positioned to:
            </p>
            <ul className="space-y-4 text-studio-muted">
              <li className="flex items-start gap-3">
                <span className="text-studio-accent mt-1">•</span>
                <span>Create better first impressions that reflect the company's professionalism and reliability</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-studio-accent mt-1">•</span>
                <span>Build stronger trust signals through clear messaging and modern design</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-studio-accent mt-1">•</span>
                <span>Deliver faster load times that improve user experience and support SEO performance</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-studio-accent mt-1">•</span>
                <span>Provide a site that's ready to support business growth as enquiry volumes increase</span>
              </li>
            </ul>
            <p className="text-lg text-studio-muted leading-relaxed pt-4">
              While it's too early to report long-term conversion metrics, the technical and design improvements create the conditions for better performance over time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Soft CTA */}
      <section className="py-16 md:py-24 bg-white border-t border-studio-ink/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-6"
          >
            <p className="text-xl text-studio-muted leading-relaxed max-w-2xl mx-auto">
              Whether you need a new site or your current one isn’t pulling its weight—let’s chat and figure out the next step.
            </p>
            <div className="pt-4">
              <Button to="/#contact" variant="primary">
                Book a quick chat
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HarizCraneTrucks;
