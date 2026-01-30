import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const ProjectFilterCTA: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    projectType: '',
    budget: '',
    timeline: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to contact page with form data
    navigate('/contact', { state: formData });
  };

  return (
    <section className="relative py-20 md:py-32 bg-studio-ink overflow-hidden" style={{ colorScheme: 'dark' }}>
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '48px 48px'
        }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
          {/* Left: Large Heading & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:sticky lg:top-32"
          >
            <span className="text-studio-accent font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
              Get Started
            </span>
            <h2 className="font-serif font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] mb-6">
              Ready to stop losing leads to competitors?
            </h2>
            <p className="text-lg text-white/70 mb-8 max-w-md leading-relaxed">
              Get a website that makes clients choose you. Stand out. Win quality leads. Close more deals. Let's talk.
            </p>

            {/* Primary CTA */}
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-3 px-8 py-4 font-sans font-bold bg-studio-accent text-white hover:bg-studio-accent/90 text-xs tracking-widest uppercase rounded-xl transition-all duration-300 mb-6 group shadow-lg"
                  >
                    Start Your Project
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>

            {/* Location */}
            <div className="flex items-center gap-2 text-white/50 text-sm">
              <MapPin className="w-4 h-4" />
              <span>Sydney, Australia</span>
            </div>
          </motion.div>

          {/* Right: Filtering Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8"
          >
            <div className="mb-6">
              <h3 className="font-bold text-xl text-white mb-2">Get Your Free Estimate</h3>
              <p className="text-white/60 text-sm">Tell us about your project. We'll send a custom quote.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-white/80 text-sm font-medium mb-2">
                  My name is
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="First & last name…"
                  autoComplete="name"
                  spellCheck="false"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-studio-accent focus-visible:border-transparent transition-[border-color,background-color]"
                />
              </div>

              {/* Company */}
              <div>
                <label htmlFor="company" className="block text-white/80 text-sm font-medium mb-2">
                  From
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Company name…"
                  autoComplete="organization"
                  spellCheck="false"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-studio-accent focus-visible:border-transparent transition-[border-color,background-color]"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-white/80 text-sm font-medium mb-2">
                  You can reach me at
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@address.com…"
                  autoComplete="email"
                  inputMode="email"
                  spellCheck="false"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-studio-accent focus-visible:border-transparent transition-[border-color,background-color]"
                />
              </div>

              {/* Project Type */}
              <div>
                <label htmlFor="projectType" className="block text-white/80 text-sm font-medium mb-2">
                  I want to chat about
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-studio-accent focus-visible:border-transparent transition-[border-color,background-color]"
                >
                  <option value="" className="bg-studio-ink">Select project type</option>
                  <option value="website" className="bg-studio-ink">Website</option>
                  <option value="web-app" className="bg-studio-ink">Web App</option>
                  <option value="branding" className="bg-studio-ink">Branding</option>
                  <option value="redesign" className="bg-studio-ink">Website Redesign</option>
                  <option value="other" className="bg-studio-ink">Other</option>
                </select>
              </div>

              {/* Budget Range */}
              <div>
                <label htmlFor="budget" className="block text-white/80 text-sm font-medium mb-2">
                  Budget range
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-studio-accent focus-visible:border-transparent transition-[border-color,background-color]"
                >
                  <option value="" className="bg-studio-ink">Select budget</option>
                  <option value="under-5k" className="bg-studio-ink">Under $5,000</option>
                  <option value="5k-10k" className="bg-studio-ink">$5,000 - $10,000</option>
                  <option value="10k-25k" className="bg-studio-ink">$10,000 - $25,000</option>
                  <option value="25k-plus" className="bg-studio-ink">$25,000+</option>
                </select>
              </div>

              {/* Timeline */}
              <div>
                <label htmlFor="timeline" className="block text-white/80 text-sm font-medium mb-2">
                  Timeline
                </label>
                <select
                  id="timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-studio-accent focus-visible:border-transparent transition-[border-color,background-color]"
                >
                  <option value="" className="bg-studio-ink">Select timeline</option>
                  <option value="asap" className="bg-studio-ink">ASAP</option>
                  <option value="1-month" className="bg-studio-ink">Within 1 month</option>
                  <option value="2-3-months" className="bg-studio-ink">2-3 months</option>
                  <option value="3-plus-months" className="bg-studio-ink">3+ months</option>
                  <option value="exploring" className="bg-studio-ink">Just exploring</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full font-sans font-bold bg-studio-accent text-white hover:bg-studio-accent/90 py-4 rounded-xl text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg"
              >
                Submit
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProjectFilterCTA;
