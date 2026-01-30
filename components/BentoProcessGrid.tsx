import React from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  FileText, 
  Palette, 
  Rocket, 
  BarChart3, 
  RefreshCw 
} from 'lucide-react';

interface ProcessTile {
  title: string;
  description: string;
  deliverable: string;
  icon: React.ReactNode;
  span?: string;
}

const processTiles: ProcessTile[] = [
  {
    title: "Audit & Discovery",
    description: "Understand your goals, audience, and current pain points.",
    deliverable: "Audit doc",
    icon: <Search className="w-5 h-5" />,
    span: "col-span-1 md:col-span-2"
  },
  {
    title: "Structure & Copy",
    description: "Map out pages, user flows, and messaging.",
    deliverable: "Wireframes",
    icon: <FileText className="w-5 h-5" />,
    span: "col-span-1"
  },
  {
    title: "UI & Components",
    description: "Design a cohesive visual system.",
    deliverable: "Design system",
    icon: <Palette className="w-5 h-5" />,
    span: "col-span-1"
  },
  {
    title: "Build & Handoff",
    description: "Develop, test, and launch.",
    deliverable: "Shipped site",
    icon: <Rocket className="w-5 h-5" />,
    span: "col-span-1 md:col-span-2"
  },
  {
    title: "Analytics Setup",
    description: "Track what matters for growth.",
    deliverable: "Event plan",
    icon: <BarChart3 className="w-5 h-5" />,
    span: "col-span-1"
  },
  {
    title: "Iterate & Improve",
    description: "Review data, refine, repeat.",
    deliverable: "Monthly insights",
    icon: <RefreshCw className="w-5 h-5" />,
    span: "col-span-1"
  }
];

const BentoProcessGrid: React.FC = () => {
  return (
    <section id="process" className="py-16 md:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="text-studio-accent font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
            Process
          </span>
          <h2 className="font-serif font-bold text-4xl md:text-5xl text-studio-ink">
            How I Work
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {processTiles.map((tile, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
              className={`${tile.span} bg-studio-bg border border-studio-ink/5 rounded-2xl p-6 hover:border-studio-accent/20 hover:shadow-lg transition-all duration-300 group`}
            >
              <div className="flex flex-col h-full">
                {/* Icon */}
                <div className="w-10 h-10 rounded-xl bg-studio-accent/10 flex items-center justify-center text-studio-accent mb-4 group-hover:bg-studio-accent group-hover:text-white transition-colors">
                  {tile.icon}
                </div>
                
                {/* Content */}
                <h3 className="font-bold text-lg text-studio-ink mb-2">
                  {tile.title}
                </h3>
                <p className="text-studio-muted text-sm mb-4 flex-grow">
                  {tile.description}
                </p>
                
                {/* Deliverable chip */}
                <div className="mt-auto">
                  <span className="inline-block px-3 py-1.5 bg-studio-ink/5 text-studio-ink text-[10px] font-bold tracking-wider uppercase rounded-lg">
                    Deliverable: {tile.deliverable}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BentoProcessGrid;
