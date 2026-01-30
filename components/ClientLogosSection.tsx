import React from 'react';
import { motion } from 'motion/react';

// Since we don't have actual logos, we'll create placeholder logos with company initials
const clients = [
  { name: "Sutherland Group", initials: "SG" },
  { name: "Chen Logistics", initials: "CL" },
  { name: "Elite Contracting", initials: "EC" },
  { name: "Mitchell & Co", initials: "M&C" },
  { name: "Walker Construction", initials: "WC" },
  { name: "Titan Roof Systems", initials: "TRS" },
];

const ClientLogosSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-studio-bg border-y border-studio-ink/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-studio-muted text-sm font-medium tracking-wider uppercase mb-12"
        >
          Trusted by forward-thinking businesses
        </motion.p>
        
        <div className="grid grid-cols-3 md:grid-cols-6 gap-8 md:gap-12 items-center justify-items-center">
          {clients.map((client, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
              className="group flex flex-col items-center"
            >
              {/* Placeholder Logo */}
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-white border border-studio-ink/10 flex items-center justify-center text-studio-ink/30 font-sans font-bold text-lg md:text-xl group-hover:border-studio-accent/30 group-hover:text-studio-accent/50 transition-all duration-300">
                {client.initials}
              </div>
              <span className="mt-3 text-[10px] text-studio-muted font-medium tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                {client.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogosSection;
