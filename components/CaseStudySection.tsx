import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import NumberCounter from './NumberCounter';

const projects = [
  {
    name: "Titan Roof Systems",
    tagline: "Premium roofing contractor",
    challenge: "Outdated website failing to capture high-value commercial leads",
    solution: "Complete redesign with conversion-focused UX and trust signals",
    desktopAsset: "/Assets/macbook-air-13-4th-gen-midnight-1.png",
    mobileAsset: "/Assets/iphone-16-pro-max-black-titanium-portrait-1.png",
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop",
    metrics: [
      { label: "Conversion Rate", value: "+38%", color: "text-studio-accent" },
      { label: "Enquiry Quality", value: "High", color: "text-studio-ink" },
      { label: "Bounce Rate", value: "-41%", color: "text-studio-accent" }
    ],
    services: ["UI/UX Design", "Web Development", "SEO"]
  },
  {
    name: "Swift Fix Roofing",
    tagline: "Emergency repair specialists",
    challenge: "Text-heavy site not reflecting operational scale or reliability",
    solution: "Minimalist UI overhaul focused on speed and trust building",
    desktopAsset: "/Assets/macbook-air-13-4th-gen-midnight-1.png",
    mobileAsset: "/Assets/iphone-16-pro-max-black-titanium-portrait-1.png",
    coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop",
    metrics: [
      { label: "User Engagement", value: "+52%", color: "text-orange-500" },
      { label: "Load Time", value: "0.6s", color: "text-studio-ink" },
      { label: "B2B Trust", value: "Verified", color: "text-orange-500" }
    ],
    services: ["Brand Identity", "Web Development"]
  },
  {
    name: "Heritage Restorations",
    tagline: "Architectural preservation experts",
    challenge: "Exceptional work hidden behind an amateur digital presence",
    solution: "Portfolio-focused approach emphasizing precision and detail",
    desktopAsset: "/Assets/macbook-air-13-4th-gen-midnight-1.png",
    mobileAsset: "/Assets/iphone-16-pro-max-black-titanium-portrait-1.png",
    coverImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1600&auto=format&fit=crop",
    metrics: [
      { label: "Lead Quality", value: "Premium", color: "text-emerald-500" },
      { label: "Time on Site", value: "+45%", color: "text-studio-ink" },
      { label: "Contract Value", value: "+60%", color: "text-emerald-500" }
    ],
    services: ["UI/UX Design", "Brand Identity", "Web Development"]
  }
];

const DeviceModel: React.FC<{ desktopAsset: string; mobileAsset: string; progress: any }> = ({ desktopAsset, mobileAsset, progress }) => {
  // Laptop swivel animation
  const laptopSwivel = useTransform(progress, [0, 0.35, 0.65, 1], [30, 0, 0, -30]);
  const laptopRotateX = useTransform(progress, [0, 0.35, 0.65], [20, 0, -5]);
  
  // Phone swivel animation (offset timing for staggered effect)
  const phoneSwivel = useTransform(progress, [0, 0.35, 0.65, 1], [-15, 5, 5, 15]);
  const phoneRotateX = useTransform(progress, [0, 0.35], [10, 0]);

  const scale = useTransform(progress, [0, 0.35], [0.85, 1]);
  const y = useTransform(progress, [0, 0.35], [30, 0]);

  return (
    <div className="relative w-full h-full flex items-center justify-center p-4 md:p-8 perspective-2000">
      <motion.div
        style={{
          scale,
          y,
          transformStyle: "preserve-3d"
        }}
        className="relative z-10 w-full h-full flex items-center justify-center"
      >
        {/* MacBook - positioned left/center */}
        <motion.div
          style={{
            rotateY: laptopSwivel,
            rotateX: laptopRotateX,
            transformStyle: "preserve-3d"
          }}
          className="relative z-10"
        >
          <img 
            src={desktopAsset} 
            alt="MacBook" 
            className="w-[85%] md:w-[90%] h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
          />
        </motion.div>
        
        {/* iPhone - positioned right/overlapping */}
        <motion.div
          style={{
            rotateY: phoneSwivel,
            rotateX: phoneRotateX,
            transformStyle: "preserve-3d"
          }}
          className="absolute right-4 md:right-8 bottom-8 md:bottom-12 z-20"
        >
          <img 
            src={mobileAsset} 
            alt="iPhone" 
            className="h-[45%] md:h-[55%] w-auto object-contain drop-shadow-[0_15px_40px_rgba(0,0,0,0.2)]"
            style={{ maxHeight: "280px" }}
          />
        </motion.div>
        
        {/* Subtle shadow underneath */}
        <motion.div 
          style={{ rotateX: 90, translateZ: -40, scale: 0.7 }}
          className="absolute bottom-2 md:bottom-6 w-3/4 h-6 md:h-8 bg-black/10 blur-2xl rounded-full"
        />
      </motion.div>
    </div>
  );
};

const CaseStudyCard: React.FC<{ project: typeof projects[0]; index: number; total: number }> = ({ project, index, total }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.5,
    restDelta: 0.001
  });

  const scale = useTransform(smoothProgress, [0, 0.35, 1], [0.9, 1, 1]);
  const borderRadius = useTransform(smoothProgress, [0, 0.35, 1], ["100px", "40px", "40px"]);
  const opacity = useTransform(smoothProgress, [0, 0.15, 1], [0, 1, 1]);
  const cardRotateX = useTransform(smoothProgress, [0, 0.35, 1], [15, 0, 0]);
  const cardY = useTransform(smoothProgress, [0, 0.35], [60, 0]);
  
  const clipPath = useTransform(
    smoothProgress,
    [0, 0.35, 1],
    [
      "inset(8% 5% 0% 5% round 120px 120px 60px 60px)",
      "inset(0% 0% 0% 0% round 40px)",
      "inset(0% 0% 0% 0% round 40px)"
    ]
  );

  const stickyTop = `${40 + index * 40}px`;

  return (
    <div 
      ref={containerRef}
      className="sticky top-0 h-[70vh] md:h-[60vh] flex items-center justify-center pointer-events-none mb-[5vh] md:mb-[2vh]"
      style={{ top: stickyTop, perspective: "1200px" }}
    >
      <motion.div 
        style={{ 
          scale, 
          borderRadius, 
          opacity, 
          rotateX: cardRotateX, 
          y: cardY,
          clipPath,
        }}
        className="w-[94vw] max-w-6xl bg-white shadow-[0_0_80px_rgba(0,0,0,0.1)] overflow-hidden pointer-events-auto flex flex-col md:flex-row h-auto min-h-[600px] md:h-[60vh] max-h-[750px] will-change-transform"
      >
        {/* Device Model Section */}
        <div className="relative flex-1 bg-studio-bg/30 overflow-hidden min-h-[280px] md:min-h-0">
          <DeviceModel 
            desktopAsset={project.desktopAsset}
            mobileAsset={project.mobileAsset}
            progress={smoothProgress} 
          />
        </div>

        {/* Info Section - Enhanced */}
        <div className="w-full md:w-[45%] p-6 md:p-10 flex flex-col justify-between bg-white border-t md:border-t-0 md:border-l border-studio-ink/5 relative z-10">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-studio-accent font-bold tracking-[0.2em] uppercase text-[10px]">
                Case Study 0{index + 1}
              </span>
              <div className="flex gap-2">
                {project.services.slice(0, 2).map((s, i) => (
                  <span key={i} className="px-2 py-1 bg-studio-bg text-studio-muted text-[9px] font-bold tracking-wider uppercase rounded">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            
            <h3 className="font-serif font-bold text-3xl md:text-4xl text-studio-ink leading-tight mb-2">
              {project.name}
            </h3>
            <p className="text-studio-muted text-sm mb-6">{project.tagline}</p>
            
            {/* Challenge & Solution */}
            <div className="space-y-4 mb-6 pb-6 border-b border-studio-ink/10">
              <div>
                <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-studio-muted block mb-1">Challenge</span>
                <p className="text-studio-ink text-sm leading-relaxed">{project.challenge}</p>
              </div>
              <div>
                <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-studio-muted block mb-1">Solution</span>
                <p className="text-studio-ink text-sm leading-relaxed">{project.solution}</p>
              </div>
            </div>
            
            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4">
              {project.metrics.map((m, midx) => (
                <div key={midx} className="text-center">
                  <NumberCounter 
                    value={m.value} 
                    className={`text-2xl md:text-3xl font-bold tracking-tight ${m.color}`}
                  />
                  <span className="text-[9px] font-bold tracking-wider uppercase text-studio-muted block mt-1">{m.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-6 pt-6 border-t border-studio-ink/10">
            <button className="group w-full flex items-center justify-between p-4 bg-studio-bg rounded-2xl hover:bg-studio-accent transition-colors duration-300">
              <span className="text-xs font-bold tracking-widest uppercase text-studio-ink group-hover:text-white transition-colors">
                View Full Case Study
              </span>
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <ArrowUpRight className="w-4 h-4 text-studio-ink group-hover:text-white transition-colors" />
              </div>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const CaseStudySection: React.FC = () => {
  return (
    <section id="work" className="relative py-32 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <span className="text-studio-accent font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Selected Projects</span>
        <h2 className="font-serif font-bold text-6xl md:text-8xl text-studio-ink tracking-tight leading-none">
          Case Studies
        </h2>
      </div>

      <div className="relative">
        {projects.map((project, idx) => (
          <CaseStudyCard 
            key={idx} 
            project={project} 
            index={idx} 
            total={projects.length} 
          />
        ))}
      </div>
    </section>
  );
};

export default CaseStudySection;


