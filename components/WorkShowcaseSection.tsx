import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Globe, Palette, Plus } from 'lucide-react';
import ServicesHexagonGrid from './ServicesHexagonGrid';
import LazyVideo from './LazyVideo';

interface CounterProps {
  end: number;
  suffix?: string;
  label: string;
  duration?: number;
}

const AnimatedCounter: React.FC<CounterProps> = ({ end, suffix = '', label, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return (
    <div ref={ref} className="text-center">
      <span className="text-3xl md:text-4xl font-sans font-bold text-studio-accent">
        {count.toLocaleString()}{suffix}
      </span>
      <span className="block text-[10px] font-bold tracking-wider uppercase text-studio-muted mt-1">
        {label}
      </span>
    </div>
  );
};

interface ProjectCardProps {
  title: string;
  industry?: string;
  outcome?: string;
  valueStatement?: string;
  services: string[];
  image?: string;
  video?: string;
  link?: string;
  liveLink?: string;
  isPlaceholder?: boolean;
  isFeatured?: boolean;
  isSupporting?: boolean;
  stats?: { value: number; suffix?: string; label: string }[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  title,
  industry,
  outcome,
  valueStatement,
  services, 
  image, 
  video, 
  link, 
  liveLink,
  isPlaceholder = false,
  isFeatured = false,
  isSupporting = false,
  stats = []
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-20%" });

  useEffect(() => {
    if (!video || !videoRef.current) return;
    
    if (isInView) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isInView, video]);

  if (isPlaceholder) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-studio-accent/30 transition-all duration-500"
      >
        <div className="aspect-[4/3] flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent">
          <div className="text-center p-8">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-white/40" />
            </div>
            <h3 className="font-bold text-lg text-white/60 mb-2">{title}</h3>
            <p className="text-sm text-white/40">Coming Soon</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={`group relative bg-white border-2 border-studio-ink/10 rounded-2xl overflow-hidden transition-[border-color,transform,shadow] duration-500 ${
        isSupporting ? 'pointer-events-none' : `hover:border-studio-accent/40 ${isFeatured ? '' : 'hover:shadow-xl'}`
      } ${isFeatured ? 'border-studio-ink/20 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)]' : 'shadow-lg'}`}
    >
      {/* Media */}
      <div className={`relative ${isFeatured ? 'aspect-[16/10]' : 'aspect-[4/3]'} overflow-hidden`}>
        {video ? (
          <LazyVideo
            ref={videoRef}
            src={video}
            muted
            loop
            playsInline
            autoPlay
            aria-label={`${title} project showcase video`}
            className="w-full h-full object-contain"
            onError={(e) => {
              console.error(`Video failed to load: ${video}`, e);
            }}
          />
        ) : image ? (
          <img src={image} alt={`${title} project showcase`} className="w-full h-full object-contain" loading="lazy" decoding="async" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-studio-accent/20 to-transparent" />
        )}
      </div>

      {/* Stats - moved below video */}
      {stats.length > 0 && (
        <div className="px-8 md:px-10 pt-6 pb-4">
          <div className="flex justify-center gap-8 md:gap-12">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <AnimatedCounter 
                  end={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info - Minimal clean layout */}
      <div className={isFeatured ? 'px-8 md:px-10 pb-8 md:pb-10' : 'px-6 pb-6'}>
        <h3 className={`font-bold text-studio-ink mb-2 ${isFeatured ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'}`}>{title}</h3>
        {isFeatured && (
          <p className="text-studio-muted text-sm md:text-base mb-6">
            Focused on performance, clarity, and enquiry flow.
          </p>
        )}
        
        {/* CTA and Live Site Link */}
        <div className="flex flex-col sm:flex-row gap-3 items-start">
          {link && (
            <Link
              to={link}
              className="inline-flex items-center gap-2 px-6 py-3 bg-studio-accent text-white hover:bg-studio-accent/90 text-xs font-bold tracking-wider uppercase rounded-xl transition-colors"
            >
              See how we did it
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-studio-muted hover:text-studio-accent text-sm font-medium transition-colors"
            >
              Live Site
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

type SitesGalleryItem = {
  title: string;
  media: 'video' | 'image';
  src: string;
  label?: string;
  alt?: string;
  description?: string;
  link?: string;
};

const SITES_GALLERY_DATA: SitesGalleryItem[] = [
  { title: 'Greenchain', media: 'video', src: '/Assets/greenchain-showcase.mp4', label: 'Greenchain project showcase' },
  { title: 'Nova Mesh', media: 'video', src: '/Assets/novemesh-showcase.mp4', label: 'Nova Mesh project showcase' },
];

const WorkShowcaseSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const featuredCardRef = useRef<HTMLDivElement>(null);
  
  // Scroll progress for the featured card
  const { scrollYProgress } = useScroll({
    target: featuredCardRef,
    offset: ["start end", "center center", "end start"]
  });

  // Video scale: starts at 1.3, zooms down to 1.0, then holds
  // Scroll progress 0-0.4: zoom from 1.3 to 1.0
  // Scroll progress 0.4-0.6: hold at 1.0 (pause zone)
  // Scroll progress 0.6-1.0: continue at 1.0
  const videoScale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [1.3, 1.0, 1.0, 1.0]);
  
  // Temporarily removed scroll zoom for other cards to fix loading issue
  const greenchainScale = 1;
  const novemeshScale = 1;

  return (
    <section 
      ref={sectionRef}
      id="work" 
      className="bg-white/95 backdrop-blur-sm relative overflow-visible md:overflow-hidden" 
      style={{ paddingTop: 'clamp(3rem, 8vw, 10rem)', paddingBottom: 'clamp(3rem, 8vw, 10rem)' }} 
      data-theme="light"
    >
      {/* Wide max-width, responsive gutters; 1920px cap so 1x3 previews scale up and are easier to see */}
      <div 
        className="w-full max-w-[1920px] mx-auto relative z-10 overflow-x-hidden" 
        style={{ 
          paddingLeft: 'clamp(1.25rem, 3vw, 5rem)', 
          paddingRight: 'clamp(1.25rem, 3vw, 5rem)'
        }}
      >
        {/* Heading above section with gradient */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center mb-12 md:mb-16"
        >
          <h2 
            className="font-serif font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-[1.15] tracking-tight"
            style={{
              background: 'linear-gradient(to bottom, #3b82f6, #2563ab, #1e40af)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            From fewer leads to more qualified enquiries. Here’s how.
          </h2>
        </motion.div>

        {/* Two-column layout: Hariz card and 2 sites - Bento grid (right column fills same height as left) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left: Hariz card - sets row height */}
          <div className="lg:col-span-7 flex justify-center">
            <div ref={featuredCardRef} className="w-full max-w-5xl h-full min-h-0 flex">
            <motion.div
              className="group relative bg-white border-2 border-studio-ink/20 rounded-2xl overflow-hidden shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] flex flex-col w-full min-h-[400px] lg:min-h-[600px]"
            >
              {/* Video: aspect-ratio box so it scales with width, no letterboxing */}
              <motion.div
                className="relative w-full flex-shrink-0 overflow-hidden bg-studio-ink/5"
                style={{ scale: videoScale }}
              >
                <div className="relative w-full aspect-[16/10] min-h-[200px] sm:min-h-[240px]">
                  <LazyVideo
                    src="/Assets/hariz-showcase.mp4"
                    muted
                    loop
                    playsInline
                    autoPlay
                    aria-label="Hariz Crane Trucks project showcase video"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                </div>
              </motion.div>

              {/* Content Section - Clean and always visible */}
              <div className="px-6 sm:px-8 md:px-10 pt-6 sm:pt-8 pb-6 sm:pb-8 md:pb-10 flex-1 flex flex-col justify-center min-w-0">
                <div className="mb-6">
                  <h3 className="font-bold text-studio-ink text-2xl md:text-3xl mb-3">
                    Hariz Crane Trucks
                  </h3>
                  <p className="text-studio-muted text-base md:text-lg leading-relaxed">
                    Focused on performance, clarity, and enquiry flow.
                  </p>
                </div>

                {/* Live Site link only (no case study for now) */}
                <a
                  href="https://hariz-crane-trucks.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-studio-accent text-white hover:bg-studio-accent/90 text-xs font-bold tracking-wider uppercase rounded-xl transition-colors"
                >
                  Live Site
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
            </div>
          </div>

          {/* Right: Bento grid - Greenchain & Nova Mesh; fill same height as Hariz card */}
          <div 
            className="lg:col-span-5 flex flex-col gap-4 md:gap-6 lg:h-full lg:min-h-[600px]"
            aria-label="Project gallery"
          >
            {SITES_GALLERY_DATA.map((item, idx) => (
              <div 
                key={idx} 
                className="group relative flex-1 min-h-[240px] md:min-h-[260px] lg:min-h-0 lg:flex-1 overflow-hidden rounded-xl border border-studio-ink/10 bg-studio-bg shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                {/* Media: fill height, crop by width */}
                <div className="absolute inset-0 overflow-hidden">
                  {item.media === 'video' ? (
                    <LazyVideo
                      src={item.src}
                      muted
                      loop
                      playsInline
                      autoPlay
                      aria-label={item.label ?? item.title}
                      className="absolute inset-0 w-full h-full object-cover object-center"
                      style={{ objectFit: 'cover', objectPosition: 'center' }}
                    />
                  ) : (
                    <img 
                      src={item.src} 
                      alt={item.alt ?? item.title} 
                      className="absolute inset-0 w-full h-full object-cover object-center" 
                      loading="lazy"
                      decoding="async"
                      style={{ objectFit: 'cover', objectPosition: 'center' }}
                    />
                  )}
                </div>
                {/* Project name bottom-left - always visible */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none flex items-end p-4 z-10">
                  <span className="text-white font-bold text-lg drop-shadow-md">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkShowcaseSection;
