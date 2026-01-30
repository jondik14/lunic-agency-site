import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Play } from 'lucide-react';

interface FeaturedProjectProps {
  title: string;
  subtitle: string;
  summary: string;
  deliverables: string[];
  tracking: string[];
  caseStudyLink: string;
  liveLink?: string;
  macbookImage?: string;
  iphoneImage?: string;
  showcaseVideo?: string;
}

const FeaturedProjectCard: React.FC<FeaturedProjectProps> = ({
  title,
  subtitle,
  summary,
  deliverables,
  tracking,
  caseStudyLink,
  liveLink,
  macbookImage,
  iphoneImage,
  showcaseVideo
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Auto-play video when section comes into view
  useEffect(() => {
    if (!showcaseVideo || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoRef.current) {
            videoRef.current.play();
            setIsPlaying(true);
          } else if (videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [showcaseVideo]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="bg-white border border-studio-ink/5 rounded-3xl overflow-hidden"
    >
      {/* Video Showcase - Full Width */}
      {showcaseVideo && (
        <div className="relative bg-studio-ink overflow-hidden">
          <video
            ref={videoRef}
            src={showcaseVideo}
            muted
            loop
            playsInline
            className="w-full h-auto"
          />
          {/* Play indicator overlay */}
          <div className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-500 pointer-events-none ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Play className="w-6 h-6 text-white ml-1" />
            </div>
          </div>
        </div>
      )}

      <div className={`grid gap-0 ${showcaseVideo ? 'lg:grid-cols-1' : 'lg:grid-cols-2'}`}>
        {/* Device Mockups - Only show if no video */}
        {!showcaseVideo && (
          <div className="relative bg-gradient-to-br from-studio-ink to-studio-ink/90 p-8 lg:p-12 min-h-[400px] lg:min-h-[500px] flex items-center justify-center overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '32px 32px'
              }} />
            </div>
            
            {/* MacBook Mockup */}
            <div className="relative z-10">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative"
              >
                {macbookImage ? (
                  <img 
                    src={macbookImage} 
                    alt={`${title} on MacBook`}
                    className="w-full max-w-md drop-shadow-2xl"
                  />
                ) : (
                  <div className="w-full max-w-md aspect-[16/10] bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
                    <span className="text-white/40 text-sm">MacBook mockup</span>
                  </div>
                )}
              </motion.div>
              
              {/* iPhone Mockup - Positioned to overlap */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="absolute -bottom-8 -right-4 lg:-right-8 z-20"
              >
                {iphoneImage ? (
                  <img 
                    src={iphoneImage} 
                    alt={`${title} on iPhone`}
                    className="w-24 lg:w-32 drop-shadow-2xl"
                  />
                ) : (
                  <div className="w-24 lg:w-32 aspect-[9/19] bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                    <span className="text-white/40 text-[10px] text-center px-2">iPhone mockup</span>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        )}

        {/* Project Info */}
        <div className={`p-8 lg:p-12 flex flex-col justify-center ${showcaseVideo ? 'lg:flex-row lg:gap-12' : ''}`}>
          <span className="text-studio-accent font-bold tracking-[0.2em] uppercase text-[10px] mb-3">
            {subtitle}
          </span>
          <h3 className="font-serif font-bold text-3xl lg:text-4xl text-studio-ink mb-4">
            {title}
          </h3>
          <p className="text-studio-muted mb-8">
            {summary}
          </p>

          {/* Deliverables */}
          <div className="mb-6">
            <h4 className="text-xs font-bold tracking-wider uppercase text-studio-ink mb-3">
              What I delivered
            </h4>
            <ul className="space-y-2">
              {deliverables.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-studio-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-studio-accent mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Tracking */}
          <div className="mb-8">
            <h4 className="text-xs font-bold tracking-wider uppercase text-studio-ink mb-3">
              Tracking & conversion setup
            </h4>
            <ul className="space-y-2">
              {tracking.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-studio-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link
              to={caseStudyLink}
              className="inline-flex items-center gap-2 px-6 py-3 bg-studio-accent text-white text-xs font-bold tracking-widest uppercase rounded-xl hover:bg-studio-ink transition-colors"
            >
              View case study
              <ArrowRight className="w-4 h-4" />
            </Link>
            {liveLink && (
              <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-studio-ink/10 text-studio-ink text-xs font-bold tracking-widest uppercase rounded-xl hover:border-studio-accent hover:text-studio-accent transition-colors"
              >
                Live site
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedProjectCard;
