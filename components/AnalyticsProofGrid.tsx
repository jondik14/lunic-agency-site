import React from 'react';
import { motion } from 'motion/react';
import { 
  MousePointerClick, 
  TrendingUp, 
  Search, 
  Timer, 
  Users, 
  Target 
} from 'lucide-react';

const trackingPoints = [
  { icon: <MousePointerClick className="w-4 h-4" />, text: "Click-through rates" },
  { icon: <TrendingUp className="w-4 h-4" />, text: "Conversion events" },
  { icon: <Search className="w-4 h-4" />, text: "Search rankings" },
  { icon: <Timer className="w-4 h-4" />, text: "Page load speed" },
  { icon: <Users className="w-4 h-4" />, text: "User behavior flows" },
  { icon: <Target className="w-4 h-4" />, text: "Goal completions" }
];

const analyticsScreenshots = [
  { 
    label: "Google Analytics", 
    tool: "GA4 Dashboard", 
    image: "/Assets/google-analytics-page.png",
    description: "Track conversions, user behavior, and performance metrics"
  },
  { 
    label: "Search Console", 
    tool: "Google Search Console", 
    image: "/Assets/google-search-console-page.png",
    description: "Monitor search performance and indexing"
  }
];

const AnalyticsProofGrid: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="text-studio-accent font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
            Analytics
          </span>
          <h2 className="font-serif font-bold text-4xl md:text-5xl text-studio-ink mb-4">
            Data-Driven Improvements
          </h2>
          <p className="text-studio-muted text-lg max-w-xl">
            Every project includes proper tracking setup. No guessing-just data.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: What I Track */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h3 className="text-xs font-bold tracking-wider uppercase text-studio-ink mb-6">
              What I track
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {trackingPoints.map((point, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-3 p-4 bg-studio-bg rounded-xl border border-studio-ink/5"
                >
                  <div className="w-8 h-8 rounded-lg bg-studio-accent/10 flex items-center justify-center text-studio-accent">
                    {point.icon}
                  </div>
                  <span className="text-sm text-studio-ink font-medium">{point.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Analytics Screenshots */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xs font-bold tracking-wider uppercase text-studio-ink mb-6">
              Conversion tracking
            </h3>
            <div className="space-y-6">
              {analyticsScreenshots.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * idx, ease: [0.25, 0.1, 0.25, 1] }}
                  className="group"
                >
                  <div className="bg-studio-bg rounded-xl border border-studio-ink/10 overflow-hidden hover:border-studio-accent/30 transition-[border-color] duration-300">
                    {/* Screenshot */}
                    <div className="aspect-[16/10] bg-white overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={`${item.label} dashboard showing ${item.description}`}
                        className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    {/* Label */}
                    <div className="p-4 border-t border-studio-ink/5">
                      <p className="text-studio-ink text-sm font-bold mb-1">{item.label}</p>
                      <p className="text-studio-muted text-xs">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="text-studio-muted text-xs mt-6 text-center">
              Real analytics from client projects. Every site includes proper tracking setup.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsProofGrid;
