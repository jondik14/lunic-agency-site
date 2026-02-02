import React from 'react';
import Section from '../components/Section';
import Button from '../components/Button';

const Thanks: React.FC = () => {
  return (
    <Section background="stone" className="min-h-[70vh] flex items-center justify-center text-center">
      <div className="max-w-lg">
        <div className="w-16 h-16 bg-studio-accent/10 text-studio-accent rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h1 className="font-serif font-bold text-4xl md:text-5xl text-studio-ink mb-6">Thanks—I’ll take a look and get back to you shortly.</h1>
        <p className="text-lg text-studio-muted mb-8 leading-relaxed">
          I’ll read through what you sent and follow up with next steps. No pressure, no obligation.
        </p>
        <Button to="/" variant="outline">Back to Home</Button>
      </div>
    </Section>
  );
};

export default Thanks;