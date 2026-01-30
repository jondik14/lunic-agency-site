import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  background?: 'white' | 'stone' | 'dark' | 'texture' | 'blue' | 'navy';
  isGlassy?: boolean;
}

const Section: React.FC<SectionProps> = ({ 
  children, 
  id, 
  className = '', 
  background = 'white',
  isGlassy = false
}) => {
  const backgrounds = {
    white: isGlassy ? 'bg-transparent' : 'bg-studio-bg',
    stone: isGlassy ? 'bg-transparent' : 'bg-stone-50',
    texture: 'bg-studio-bg bg-noise',
    blue: 'bg-studio-slate text-white',
    dark: 'bg-studio-ink text-studio-bg',
    navy: 'bg-[#0A0F1A] text-white',
  };

  const isTextured = background === 'texture';

  const theme = ['dark', 'blue', 'navy'].includes(background) ? 'dark' : 'light';
  return (
    <section id={id} className={`py-16 md:py-32 relative overflow-hidden ${backgrounds[background]} ${className}`} data-theme={theme}>
      {/* Noise Overlay Layer */}
      {isTextured && (
        <div className="absolute inset-0 bg-noise opacity-[0.05] mix-blend-overlay pointer-events-none z-0"></div>
      )}
      
      {/* Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isGlassy ? (
          <div className="bg-white/40 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-16 shadow-xl overflow-hidden">
            {children}
          </div>
        ) : (
          children
        )}
      </div>
    </section>
  );
};

export default Section;
