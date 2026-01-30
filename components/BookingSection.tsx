import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Calendar, Clock, Video } from 'lucide-react';

const BookingSection: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="relative py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Simple Container */}
        <div className="relative bg-studio-ink/90 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl overflow-hidden">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-studio-accent/10 via-transparent to-studio-ink/50 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row gap-10 items-start justify-between">
            {/* Left Content - Minimal */}
            <div className="flex flex-col gap-6 w-full lg:w-auto">
              <div>
                <span className="text-studio-accent font-bold tracking-[0.2em] uppercase text-xs mb-3 block">
                  Let's Talk
                </span>
                <h2 className="font-serif font-bold text-3xl md:text-4xl text-white leading-tight mb-3">
                  Got a project in mind?
                </h2>
                <p className="text-white/60 text-base max-w-md">
                  Book a free 30-minute call to discuss your goals.
                </p>
              </div>

              {/* Founder Info - Simple */}
              <div className="flex gap-4 items-center">
                <img 
                  src="/Assets/bw portait.png" 
                  alt="Luke Niccol" 
                  className="w-12 h-12 rounded-full object-cover border border-white/10"
                />
                <div>
                  <p className="font-medium text-white text-sm">Luke Niccol</p>
                  <div className="flex gap-2 items-center">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-white/50 text-xs">Available</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Calendar */}
            <div className="w-full lg:w-[400px]">
              {/* CTA Button */}
              <motion.button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full bg-white text-studio-ink p-6 rounded-2xl flex items-center justify-between group hover:bg-studio-accent hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-studio-ink/10 group-hover:bg-white/10 flex items-center justify-center transition-colors">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-lg">Book a Call</p>
                    <p className="text-studio-muted group-hover:text-white/60 text-xs transition-colors">30 min • Free</p>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </motion.button>

              {/* Expanded Calendar */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 bg-white rounded-2xl overflow-hidden shadow-xl">
                      {/* Info Bar */}
                      <div className="flex items-center gap-4 px-4 py-3 bg-studio-bg/50 border-b border-studio-ink/5">
                        <div className="flex items-center gap-2 text-studio-muted text-xs">
                          <Clock className="w-3 h-3" />
                          <span>30 min</span>
                        </div>
                        <div className="flex items-center gap-2 text-studio-muted text-xs">
                          <Video className="w-3 h-3" />
                          <span>Video call</span>
                        </div>
                      </div>

                      {/* Calendar Placeholder */}
                      <div className="p-6">
                        <div className="aspect-[4/3] bg-studio-bg/30 rounded-xl flex flex-col items-center justify-center text-center p-6">
                          <Calendar className="w-10 h-10 text-studio-accent mb-3" />
                          <p className="font-bold text-studio-ink mb-1">Calendar Integration</p>
                          <p className="text-studio-muted text-xs mb-4">
                            Connect Cal.com or Calendly here.
                          </p>
                          <a 
                            href="https://cal.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="px-5 py-2.5 bg-studio-accent text-white text-xs font-bold tracking-wider uppercase rounded-xl hover:bg-studio-ink transition-colors"
                          >
                            Open Scheduler
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Simple alternative */}
              <p className="text-white/40 text-xs text-center mt-4">
                Or email <a href="mailto:hello@lunic.studio" className="text-white/60 hover:text-white underline">hello@lunic.studio</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
