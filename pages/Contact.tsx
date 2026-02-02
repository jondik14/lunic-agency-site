import React from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin } from 'lucide-react';
import Section from '../components/Section';
import Button from '../components/Button';
import BlurText from '../components/BlurText';
import SimpleContactForm from '../components/SimpleContactForm';

const Contact: React.FC = () => {
  return (
    <>
      <Section background="white" className="pt-32 pb-16 md:pt-48 md:pb-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-studio-accent font-bold tracking-[0.2em] uppercase text-xs mb-6 block"
          >
            Get in touch
          </motion.span>
          <div style={{ fontSize: 'clamp(2.5rem, 8vw, 8rem)', marginBottom: 'clamp(2rem, 4vw, 2.5rem)' }}>
            <BlurText
              text="Contact"
              className="font-serif text-studio-ink leading-[1] justify-center tracking-tight"
              delay={100}
            />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-xl md:text-2xl text-studio-muted leading-relaxed max-w-2xl mx-auto mb-8"
          >
            Whether you’re starting from scratch or already have a site—tell me a bit about your business and I’ll get back with next steps.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Button to="/#contact" variant="primary" className="px-6 py-3 text-sm">
              Book a quick chat
            </Button>
          </motion.div>
        </div>
      </Section>

      <Section background="white" style={{ paddingTop: '0', paddingBottom: 'clamp(4rem, 8vw, 8rem)' }}>
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5" style={{ gap: 'clamp(2rem, 5vw, 5rem)' }}>
            <div className="lg:col-span-2 space-y-10">
              <div className="bg-studio-bg rounded-3xl p-8">
                <h3 className="font-serif font-bold text-xl text-studio-ink mb-6">
                  Quick contact
                </h3>
                <p className="text-studio-muted leading-relaxed mb-6">
                  For general inquiries or if you just want to get in touch, you can email directly or use the simple form.
                </p>
                <p className="text-studio-muted text-sm">
                  For project enquiries, the website review form is the best starting point as it helps me understand your business context and provide tailored recommendations.
                </p>
              </div>

              <div className="space-y-6">
                <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-studio-muted">
                  Email
                </h3>
                <a 
                  href="mailto:hello@lunic.studio" 
                  className="flex items-center gap-4 group"
                  aria-label="Email hello@lunic.studio"
                >
                  <div className="w-12 h-12 rounded-2xl bg-studio-bg flex items-center justify-center group-hover:bg-studio-accent transition-colors">
                    <Mail className="w-5 h-5 text-studio-ink group-hover:text-white transition-colors" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-medium text-studio-ink">hello@lunic.studio</p>
                    <p className="text-sm text-studio-muted">Email directly</p>
                  </div>
                </a>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-studio-bg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-studio-ink" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-medium text-studio-ink">Sydney, Australia</p>
                    <p className="text-sm text-studio-muted">Working globally</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                className="bg-white border border-studio-ink/10 rounded-3xl p-8 md:p-12 shadow-xl"
              >
                <h3 className="font-serif font-bold text-xl text-studio-ink mb-4">
                  Send a message
                </h3>
                <p className="text-studio-muted text-sm mb-6">
                  Optional short message. For a quick chat about your site or getting online, use the main form on the home page.
                </p>
                <SimpleContactForm />
              </motion.div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Contact;
