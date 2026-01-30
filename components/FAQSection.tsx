import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FAQS } from '../constants';

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left Column - Header */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <span className="text-studio-accent font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
                FAQ
              </span>
              <h2 className="font-serif font-bold text-4xl md:text-5xl text-studio-ink tracking-tight leading-[1.1] mb-6">
                Common Questions
              </h2>
              <p className="text-studio-muted text-lg leading-relaxed mb-8">
                Everything you need to know about working with us. Can't find what you're looking for?
              </p>
              
              <Link 
                to="/contact"
                className="group inline-flex items-center gap-4 px-6 py-4 bg-studio-bg text-studio-ink text-xs font-bold tracking-widest uppercase rounded-xl hover:bg-studio-accent hover:text-white transition-colors duration-300"
              >
                <MessageCircle className="w-4 h-4" />
                Get in Touch
              </Link>
            </div>
          </div>

          {/* Right Column - FAQ Items */}
          <div className="lg:col-span-7">
            <div className="space-y-4">
              {FAQS.map((faq, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.4, delay: idx * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
                  className="border border-studio-ink/10 rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-6 md:p-8 text-left hover:bg-studio-bg/50 transition-colors"
                  >
                    <h3 className="font-serif font-bold text-lg md:text-xl text-studio-ink pr-8">
                      {faq.question}
                    </h3>
                    <div className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center transition-colors ${
                      openIndex === idx ? 'bg-studio-accent text-white' : 'bg-studio-bg text-studio-ink'
                    }`}>
                      {openIndex === idx ? (
                        <Minus className="w-4 h-4" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {openIndex === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      >
                        <div className="px-6 md:px-8 pb-6 md:pb-8">
                          <p className="text-studio-muted leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
