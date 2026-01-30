import React from 'react';
import { motion } from 'motion/react';
import { Search, Smartphone, Target, Code } from 'lucide-react';
import CtaCluster from './CtaCluster';

const ProcessBentoGrid: React.FC = () => {
  return (
    <section id="process" className="py-20 md:py-32 bg-studio-ink relative overflow-hidden" data-theme="dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bento Grid — items-start so Discovery First fits content without extra gap below */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 md:gap-y-3 items-start">
          {/* Discovery First — tighter padding to fit icon, copy, and carousel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 pb-5 md:pb-6 overflow-hidden group hover:border-studio-accent/30 transition-all duration-500"
          >
            {/* Icon */}
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-4 group-hover:bg-studio-accent/20 transition-colors">
              <Search className="w-6 h-6 text-white" />
            </div>
            
            <h3 className="font-serif font-bold text-2xl md:text-3xl text-white mb-2">
              Discovery First
            </h3>
            <p className="text-white/60 mb-4 max-w-sm">
              We begin by <span className="text-white font-semibold">defining clear goals,</span> understanding your audience, and aligning with your brand voice to set a strong foundation.
            </p>

            <CtaCluster />
          </motion.div>

          {/* Mobile-First Design - Large Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 overflow-hidden group hover:border-studio-accent/30 transition-all duration-500"
          >
            {/* Icon */}
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6 group-hover:bg-studio-accent/20 transition-colors">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            
            <h3 className="font-serif font-bold text-2xl md:text-3xl text-white mb-3">
              Mobile-First Design
            </h3>
            <p className="text-white/60 mb-8 max-w-sm">
              Every layout is designed for <span className="text-white font-semibold">seamless mobile-first experiences,</span> ensuring performance across all devices.
            </p>

            {/* Device Mockups */}
            <div className="flex items-end justify-center gap-4 mt-auto">
              <div className="w-20 aspect-[9/16] bg-gradient-to-br from-white/10 to-white/5 rounded-xl border border-white/10 flex items-center justify-center">
                <span className="text-white/20 text-[8px]">Mobile</span>
              </div>
              <div className="w-32 aspect-[3/4] bg-gradient-to-br from-white/10 to-white/5 rounded-xl border border-white/10 flex items-center justify-center">
                <span className="text-white/20 text-xs">Desktop</span>
              </div>
            </div>
          </motion.div>

          {/* Conversion-Driven - Wide Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 overflow-hidden group hover:border-studio-accent/30 transition-all duration-500"
          >
            {/* Icon */}
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6 group-hover:bg-studio-accent/20 transition-colors">
              <Target className="w-6 h-6 text-white" />
            </div>
            
            <h3 className="font-serif font-bold text-2xl md:text-3xl text-white mb-3">
              Conversion-Driven
            </h3>
            <p className="text-white/60 max-w-md">
              Websites built with strategy, designed to engage audiences, and crafted to <span className="text-white font-semibold">turn visitors into customers.</span>
            </p>

            {/* Analytics Preview */}
            <div className="mt-8 bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-4 mb-3">
                <div className="flex-1">
                  <div className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Conversions</div>
                  <div className="text-2xl font-bold text-studio-accent">+147%</div>
                </div>
                <div className="flex-1">
                  <div className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Bounce Rate</div>
                  <div className="text-2xl font-bold text-green-400">-32%</div>
                </div>
              </div>
              {/* Mini chart bars */}
              <div className="flex items-end gap-1 h-12">
                {[40, 55, 45, 70, 60, 85, 75, 90, 80, 95].map((h, i) => (
                  <div 
                    key={i} 
                    className="flex-1 bg-studio-accent/60 rounded-t"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Pixel-Perfect Development - Wide Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 overflow-hidden group hover:border-studio-accent/30 transition-all duration-500"
          >
            {/* Icon */}
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6 group-hover:bg-studio-accent/20 transition-colors">
              <Code className="w-6 h-6 text-white" />
            </div>
            
            <h3 className="font-serif font-bold text-2xl md:text-3xl text-white mb-3">
              Pixel-Perfect Development
            </h3>
            <p className="text-white/60 max-w-md">
              Designed and developed with <span className="text-white font-semibold">pixel-perfect precision,</span> delivering high performance and easy updates.
            </p>

            {/* Code/Design Preview */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                  <div className="w-2 h-2 rounded-full bg-yellow-400" />
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                </div>
                <div className="space-y-1.5">
                  <div className="h-2 bg-white/20 rounded w-3/4" />
                  <div className="h-2 bg-studio-accent/40 rounded w-1/2" />
                  <div className="h-2 bg-white/10 rounded w-2/3" />
                  <div className="h-2 bg-white/20 rounded w-1/3" />
                </div>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-studio-accent mb-1">100</div>
                  <div className="text-[10px] text-white/40 uppercase tracking-wider">Lighthouse</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProcessBentoGrid;
