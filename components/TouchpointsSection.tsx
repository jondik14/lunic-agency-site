import React from 'react';
import { motion } from 'motion/react';
import { 
  Globe, 
  RefreshCw, 
  ShoppingCart, 
  Database, 
  FileText, 
  Layers,
  Zap,
  Smartphone,
  BarChart3,
  Wrench,
  Palette,
  MousePointer
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface TouchpointItem {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
}

const touchpoints: TouchpointItem[] = [
  { icon: <Globe className="w-6 h-6" />, title: "Crafted", subtitle: "Websites" },
  { icon: <RefreshCw className="w-6 h-6" />, title: "Website", subtitle: "Redesign" },
  { icon: <ShoppingCart className="w-6 h-6" />, title: "eCommerce", subtitle: "Website Design" },
  { icon: <Database className="w-6 h-6" />, title: "CMS &", subtitle: "Dynamic Websites" },
  { icon: <FileText className="w-6 h-6" />, title: "Landing Pages", subtitle: "& Microsites" },
  { icon: <Layers className="w-6 h-6" />, title: "Consistent", subtitle: "Identity" },
  { icon: <Zap className="w-6 h-6" />, title: "Motion &", subtitle: "Interaction Design" },
  { icon: <MousePointer className="w-6 h-6" />, title: "UX Centric", subtitle: "Strategy" },
  { icon: <BarChart3 className="w-6 h-6" />, title: "Performance", subtitle: "Optimization" },
  { icon: <Wrench className="w-6 h-6" />, title: "Maintenance &", subtitle: "Ongoing Support" }
];

// Platform logos as text (can be replaced with actual SVGs)
const platforms = [
  { name: "Webflow", icon: "W" },
  { name: "WordPress", icon: "WP" },
  { name: "Wix", icon: "Wix" },
  { name: "Framer", icon: "F" },
  { name: "Hostinger", icon: "H" },
  { name: "Squarespace", icon: "Sq" },
  { name: "Shopify", icon: "S" },
  { name: "Custom", icon: "</>" }
];

const TouchpointsSection: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-studio-ink relative overflow-hidden">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h2 className="font-serif font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05]">
              Elevate your
              <br />
              <span className="text-white/60">digital footprint.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex gap-3"
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-transparent border border-white/20 text-white text-xs font-bold tracking-widest uppercase rounded-full hover:bg-white hover:text-studio-ink transition-all duration-300"
            >
              Start a project
            </Link>
            <Link
              to="/#work"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-studio-ink text-xs font-bold tracking-widest uppercase rounded-full hover:bg-studio-accent hover:text-white transition-all duration-300"
            >
              See our work
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Touchpoints Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {touchpoints.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
              className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-studio-accent/40 hover:bg-white/10 transition-all duration-300 cursor-default"
            >
              <div className="flex flex-col items-center text-center">
                <div className="text-white/80 mb-4 group-hover:text-studio-accent transition-colors">
                  {item.icon}
                </div>
                <h3 className="font-bold text-sm text-white leading-tight">
                  {item.title}
                </h3>
                {item.subtitle && (
                  <span className="text-white/60 text-sm">
                    {item.subtitle}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Platform Flexibility Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left: Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative bg-gradient-to-br from-studio-accent/20 via-studio-ink to-studio-ink rounded-2xl p-8 md:p-12 overflow-hidden"
          >
            {/* Stars/dots decoration */}
            <div className="absolute inset-0 opacity-30">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    opacity: Math.random() * 0.5 + 0.2
                  }}
                />
              ))}
            </div>

            <div className="relative z-10">
              <h3 className="font-serif font-bold text-3xl md:text-4xl text-white leading-[1.1] mb-4">
                Platform flexibility.
                <br />
                Design consistency.
              </h3>
              <p className="text-white/70 mb-6 max-w-md">
                No matter the platform, the design language stays <span className="text-white font-semibold">consistent, refined, responsive,</span> and built to perform.
              </p>
              <Link
                to="/#work"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-studio-ink text-xs font-bold tracking-widest uppercase rounded-full hover:bg-studio-accent hover:text-white transition-all duration-300"
              >
                See our work
              </Link>
            </div>
          </motion.div>

          {/* Right: Platform Logos Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-4 gap-3"
          >
            {platforms.map((platform, idx) => (
              <div
                key={idx}
                className="aspect-square bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:border-white/20 transition-colors group"
              >
                <span className="text-white/60 font-bold text-lg group-hover:text-white transition-colors">
                  {platform.icon}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TouchpointsSection;
