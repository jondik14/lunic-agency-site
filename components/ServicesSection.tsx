import React from 'react';
import { motion } from 'motion/react';
import { Globe, RefreshCw, Smartphone, MessageCircle } from 'lucide-react';
import GlassSurface from './GlassSurface';

const SITUATIONS = [
  {
    icon: <Globe className="w-6 h-6 text-white" aria-hidden />,
    title: 'No website yet',
    description: "You're ready to look credible online and catch enquiries you're missing.",
  },
  {
    icon: <RefreshCw className="w-6 h-6 text-white" aria-hidden />,
    title: 'Outdated site',
    description: 'Your site no longer reflects your business or feels old and slow.',
  },
  {
    icon: <Smartphone className="w-6 h-6 text-white" aria-hidden />,
    title: 'Poor mobile experience',
    description: 'It works on desktop but struggles on phones - where most people look.',
  },
  {
    icon: <MessageCircle className="w-6 h-6 text-white" aria-hidden />,
    title: 'Low enquiries',
    description: 'Traffic is there, but few visitors take the next step or get in touch.',
  },
];

const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="relative z-20 bg-black overflow-hidden mt-0 md:mt-[clamp(-5rem,-10vw,-10rem)]" style={{ colorScheme: 'dark', paddingTop: 'clamp(3rem, 8vw, 10rem)', paddingBottom: 'clamp(3rem, 8vw, 10rem)' }} data-theme="dark">
      <div className="services-bg-video-layer absolute inset-0 z-0 overflow-hidden">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label="Ambient background video"
          style={{ willChange: 'auto' }}
        >
          <source src="/Assets/updated-magentic-videop.mp4" type="video/mp4" />
        </video>
        {/* Blur overlay: fades in from top (mask) so no harsh line; video clear at top, more blurred/dark toward bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 z-[1] pointer-events-none"
          style={{
            height: '70%',
            background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 12%, rgba(0, 0, 0, 0.06) 28%, rgba(0, 0, 0, 0.15) 45%, rgba(0, 0, 0, 0.35) 65%, rgba(0, 0, 0, 0.65) 85%, rgba(0, 0, 0, 0.95) 100%)',
            backdropFilter: 'blur(clamp(20px, 5vw, 60px))',
            WebkitBackdropFilter: 'blur(clamp(20px, 5vw, 60px))',
            maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.25) 12%, rgba(0,0,0,0.6) 28%, black 45%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.25) 12%, rgba(0,0,0,0.6) 28%, black 45%, black 100%)',
          }}
          aria-hidden
        />
      </div>
      {/* Single full-height overlay: smooth fade from top (no line), then gradual darken to bottom */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.01) 5%, rgba(0, 0, 0, 0.03) 12%, rgba(0, 0, 0, 0.06) 22%, rgba(0, 0, 0, 0.1) 32%, rgba(0, 0, 0, 0.14) 42%, rgba(0, 0, 0, 0.18) 50%, rgba(0, 0, 0, 0.22) 58%, rgba(0, 0, 0, 0.26) 65%, rgba(0, 0, 0, 0.3) 75%, rgba(0, 0, 0, 0.33) 88%, rgba(0, 0, 0, 0.35) 100%)',
        }}
        aria-hidden
      />
      {/* Smooth gradient transition to ProcessSection - very gradual and seamless */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[3] pointer-events-none"
        style={{
          height: 'clamp(20rem, 50vw, 40rem)',
          background: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.02) 10%, rgba(0, 0, 0, 0.05) 20%, rgba(0, 0, 0, 0.1) 30%, rgba(0, 0, 0, 0.18) 40%, rgba(0, 0, 0, 0.28) 50%, rgba(0, 0, 0, 0.4) 60%, rgba(0, 0, 0, 0.55) 70%, rgba(0, 0, 0, 0.7) 80%, rgba(0, 0, 0, 0.85) 90%, rgba(0, 0, 0, 0.95) 95%, rgb(0, 0, 0) 100%)',
        }}
        aria-hidden
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-20"
        >
          <h2 className="font-serif font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] mb-6 max-w-[800px] mx-auto">
            Common situations we help with
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {SITUATIONS.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
              className="group h-full"
            >
              <GlassSurface
                width="100%"
                height="100%"
                borderRadius={16}
                opacity={0.88}
                blur={32}
                displace={20}
                saturation={0.9}
                backgroundOpacity={0.2}
                distortionScale={-450}
                contentClassName="!p-6 md:!p-7 !items-start !justify-start !flex-col !text-left"
              >
                <div className="mb-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                  {item.title}
                </h3>
                <p className="text-white/95 text-sm md:text-base leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
                  {item.description}
                </p>
              </GlassSurface>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
