import React from 'react';
import CharRevealText from './CharRevealText';

const WhatIDoSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-white" data-theme="light">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <CharRevealText
            text="A site that works as hard as you do-and brings in enquiries while you sleep."
            as="h2"
            className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-studio-ink leading-[1.15] tracking-tight"
            stagger={0.018}
            delayChildren={0.05}
            initialOpacity={0.4}
          />
        </div>
      </div>
    </section>
  );
};

export default WhatIDoSection;
