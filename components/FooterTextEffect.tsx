import React, { useEffect, useRef, useState, useCallback } from 'react';

interface Hexagon {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  scale: number;
  opacity: number;
}

const FooterTextEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hexagonsRef = useRef<Hexagon[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number>();
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const startTimeRef = useRef<number>(0);

  const text = "LUNIC Studio";
  const hexSize = 4.5;
  const spacing = 8;
  const interactionRadius = 320; 

  useEffect(() => {
    document.fonts.ready.then(() => setIsFontLoaded(true));
  }, []);

  // Intersection Observer to trigger scroll animation
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          startTimeRef.current = performance.now();
          observer.unobserve(containerRef.current!);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const initHexagons = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isFontLoaded) return;

    const width = canvas.width;
    const height = canvas.height;
    if (width === 0 || height === 0) {
      hexagonsRef.current = [];
      return;
    }

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const offscreen = document.createElement('canvas');
    offscreen.width = width;
    offscreen.height = height;
    const offCtx = offscreen.getContext('2d');
    if (!offCtx) return;

    const fontSize = width * 0.185;
    offCtx.font = `bold ${fontSize}px Cirka, serif`;
    offCtx.textAlign = 'center';
    offCtx.textBaseline = 'middle';
    offCtx.fillStyle = 'white';
    offCtx.fillText(text, width / 2, height / 2);

    const imageData = offCtx.getImageData(0, 0, width, height).data;

    const hexagons: Hexagon[] = [];
    for (let y = 0; y < height; y += spacing) {
      const offset = (Math.floor(y / spacing) % 2 === 0) ? 0 : spacing / 2;
      for (let x = 0; x < width; x += spacing) {
        const posX = x + offset;
        const posY = y;
        const pixelIdx = (Math.floor(posY) * width + Math.floor(posX)) * 4;
        if (imageData[pixelIdx + 3] > 128) {
          hexagons.push({
            x: posX,
            y: posY,
            baseX: posX,
            baseY: posY,
            vx: 0,
            vy: 0,
            vz: 0,
            size: hexSize,
            scale: 1,
            opacity: 0.85
          });
        }
      }
    }
    hexagonsRef.current = hexagons;
  }, [isFontLoaded, spacing, hexSize]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const currentTime = performance.now();
    const timeElapsed = inView ? (currentTime - startTimeRef.current) / 1000 : 0;

    const mouse = mouseRef.current;
    const hexagons = hexagonsRef.current;
    const radiusSq = interactionRadius * interactionRadius;
    
    const angle60 = Math.PI / 3;
    const angle30 = Math.PI / 6;

    for (let i = 0; i < hexagons.length; i++) {
      const h = hexagons[i];
      const dxMouse = mouse.x - h.x;
      const dyMouse = mouse.y - h.y;
      const distSq = dxMouse * dxMouse + dyMouse * dyMouse;

      // MUCH SNAPPIER staggered entry animation logic (slide up)
      const staggerDelay = h.baseX / 2500; // Faster staggering
      const entryProgress = Math.max(0, Math.min(1, (timeElapsed - staggerDelay) / 0.4)); // Faster duration (0.4s)
      const entryEase = 1 - Math.pow(1 - entryProgress, 4); // Quartic out for more "snap"
      const entryYOffset = (1 - entryEase) * 80; // Shorter distance for quicker arrival
      const entryOpacity = Math.max(0, Math.min(1, entryProgress * 3)); // Faster opacity reveal

      // Always white color
      const r = 255, g = 255, b = 255;
      
      if (distSq < radiusSq && inView && entryProgress > 0.8) {
        const dist = Math.sqrt(distSq);
        const force = Math.pow((interactionRadius - dist) / interactionRadius, 1.8);
        
        // MORE DRAMATIC displacement towards the center of mouse hover
        const pullX = dxMouse * force * 0.65; 
        const pullY = dyMouse * force * 0.65;
        
        // Perspective displacement for depth simulation
        const canvasCenterX = canvas.width / 2;
        const perspectiveX = (h.baseX - canvasCenterX) * 0.45; 
        const perspectiveY = (h.baseY - (canvas.height / 2)) * 0.35;
        
        const targetX = h.baseX + pullX + perspectiveX * force;
        const targetY = (h.baseY + entryYOffset) + pullY + perspectiveY * force;
        
        h.x += (targetX - h.x) * 0.3; // Snappier response
        h.y += (targetY - h.y) * 0.3;
      } else {
        h.x += (h.baseX - h.x) * 0.2;
        h.y += ((h.baseY + entryYOffset) - h.y) * 0.2;
      }

      h.vx *= 0.7; 
      h.vy *= 0.7;
      
      h.x += h.vx;
      h.y += h.vy;

      // Draw
      const s = h.size;
      
      ctx.beginPath();
      for (let j = 0; j < 6; j++) {
        const currAngle = angle30 + j * angle60;
        ctx.lineTo(
          h.x + s * Math.cos(currAngle),
          h.y + s * Math.sin(currAngle)
        );
      }
      ctx.closePath();
      
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.85 * entryOpacity})`;
      ctx.fill();

      // Sharp clean edge ONLY on interaction to save memory
      if (distSq < radiusSq && entryProgress > 0.8) {
        ctx.strokeStyle = `rgba(26, 26, 26, ${0.3 * entryOpacity})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [inView, interactionRadius]);

  useEffect(() => {
    const handleResize = () => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (!container || !canvas) return;
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      canvas.width = w;
      canvas.height = h;
      if (w > 0 && h > 0) initHexagons();
      else hexagonsRef.current = [];
    };

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (container && canvas && container.offsetWidth > 0 && container.offsetHeight > 0) {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      initHexagons();
    } else if (canvas) {
      canvas.width = 0;
      canvas.height = 0;
      hexagonsRef.current = [];
    }
    window.addEventListener('resize', handleResize);
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [initHexagons, animate]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: -1000, y: -1000 };
  };

  return (
    <div 
      ref={containerRef} 
      className="hidden md:flex relative w-full h-[25vw] items-center justify-center overflow-hidden cursor-default bg-studio-ink"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
      <h2 className="sr-only">LUNIC Studio</h2>
    </div>
  );
};

export default FooterTextEffect;
