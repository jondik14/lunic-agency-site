import React from 'react';
import { motion } from 'motion/react';
import IntakeForm from './IntakeForm';

const ContactFormSection: React.FC = () => {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-white"
      style={{ paddingTop: 'clamp(3rem, 8vw, 8rem)', paddingBottom: 'clamp(3rem, 8vw, 8rem)' }}
      data-theme="light"
      aria-labelledby="intake-heading"
    >
      <div className="relative z-10 w-full max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center"
          style={{ marginBottom: 'clamp(2.5rem, 5vw, 3rem)' }}
        >
          <span className="text-studio-muted font-bold tracking-[0.2em] uppercase block" style={{ fontSize: 'clamp(0.625rem, 1.5vw, 0.75rem)', marginBottom: 'clamp(1rem, 2vw, 1.5rem)' }}>
            Get in touch
          </span>
          <h2
            id="intake-heading"
            className="font-serif font-bold text-studio-ink leading-[1.12] max-w-[800px] mx-auto"
            style={{ fontSize: 'clamp(1.875rem, 5vw, 2.75rem)', marginBottom: 'clamp(1.25rem, 3vw, 1.5rem)' }}
          >
            Book a quick chat
          </h2>
          <p className="text-studio-muted leading-relaxed max-w-2xl mx-auto" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.125rem)' }}>
            Share a few details. I’ll get back with next steps—no pressure, no obligation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <IntakeForm id="intake-form" />
        </motion.div>
      </div>
    </section>
  );
};

export default ContactFormSection;
