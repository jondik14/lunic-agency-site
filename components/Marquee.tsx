import React from 'react';
import { motion } from 'motion/react';

interface MarqueeProps {
  items: string[];
  speed?: number;
  className?: string;
}

const Marquee: React.FC<MarqueeProps> = ({ items, speed = 40, className = "" }) => {
  // Triple the items to ensure it fills the width and scrolls smoothly
  const marqueeContent = items.join("  •  ") + "  •  ";

  return (
    <div className={`relative w-full overflow-hidden py-16 bg-studio-bg select-none ${className}`}>
      {/* Center highlight gradient - most saturated in the middle */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 100% at 50% 50%, rgba(43, 76, 126, 0.15) 0%, transparent 70%)'
        }}
      />
      
      {/* Gradient Overlays for Fading Edges */}
      <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-studio-bg to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-studio-bg to-transparent z-10 pointer-events-none" />
      
      <div className="flex w-max relative z-[1]">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: speed,
            ease: "linear",
            repeat: Infinity,
          }}
          className="flex whitespace-nowrap will-change-transform"
        >
          <div className="flex items-center gap-12 md:gap-24 px-12">
            {[...Array(6)].map((_, i) => (
              <span 
                key={i} 
                className="text-[6vw] md:text-[4vw] font-sans font-bold text-studio-accent/60 tracking-[0.05em] whitespace-nowrap"
              >
                {marqueeContent}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Marquee;

