import { useEffect, useRef } from 'react';

interface ServicesHexagonGridProps {
  variant?: 'dark' | 'light';
}

const ServicesHexagonGrid: React.FC<ServicesHexagonGridProps> = ({ variant = 'dark' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);
  const hexagonsRef = useRef<{ x: number; y: number }[]>([]);
  const lastSizeRef = useRef({ width: 0, height: 0 });

  const baseHexSize = 80; // Same size as hero section
  const hexColor = variant === 'light' ? '#E5E7EB' : '#1E3A5F'; // Light gray for white bg, dark blue for black bg

  const drawHexagonOutline = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number
  ) => {
    // Draw hexagon outline (perspective applied globally)
    const angle = Math.PI / 6;
    
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const currAngle = angle + (i * Math.PI) / 3;
      const hx = x + size * Math.cos(currAngle);
      const hy = y + size * Math.sin(currAngle);
      
      if (i === 0) ctx.moveTo(hx, hy);
      else ctx.lineTo(hx, hy);
    }
    ctx.closePath();

    // Draw outline with subtle opacity
    ctx.strokeStyle = hexColor;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  };

  const generateHexagons = (width: number, height: number, size: number) => {
    const hexagons: { x: number; y: number }[] = [];
    const hSpacing = size * 1.8;
    const vSpacing = size * 1.6;
    // Increase padding significantly to ensure full edge coverage
    const padding = size * 4;
    const cols = Math.ceil((width + padding * 2) / hSpacing) + 8;
    const rows = Math.ceil((height + padding * 2) / vSpacing) + 8;
    const startX = -padding;
    const startY = -padding;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        hexagons.push({
          x: startX + col * hSpacing + (row % 2 === 0 ? 0 : hSpacing / 2),
          y: startY + row * vSpacing
        });
      }
    }
    return hexagons;
  };

  const animate = (currentTime: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { 
      alpha: true,
      desynchronized: true
    });
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const displayWidth = canvas.clientWidth || window.innerWidth;
    const displayHeight = canvas.clientHeight || window.innerHeight;

    // Set canvas size with device pixel ratio
    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      ctx.scale(dpr, dpr);
    }

    // Regenerate hexagons only if size changed
    if (lastSizeRef.current.width !== displayWidth || lastSizeRef.current.height !== displayHeight) {
      hexagonsRef.current = generateHexagons(displayWidth, displayHeight, baseHexSize);
      lastSizeRef.current = { width: displayWidth, height: displayHeight };
    }

    ctx.clearRect(0, 0, displayWidth, displayHeight);

    // Update time for subtle shine animation
    timeRef.current = currentTime * 0.001;

    // Apply global 3D perspective transform (isometric/oblique view)
    ctx.save();
    // Transform for 3D perspective: skew Y-axis and compress
    // This creates the "looking down at an angle" effect like the reference
    const skewY = 0.5; // Skew factor for 3D effect
    const scaleY = 0.6; // Vertical compression
    ctx.transform(1, skewY, 0, scaleY, 0, 0);
    
    // Draw all hexagons
    hexagonsRef.current.forEach(hex => {
      drawHexagonOutline(ctx, hex.x, hex.y, baseHexSize);
    });
    
    ctx.restore();

    // Add subtle animated shine gradient overlay
    ctx.save();
    const shineOffset = (Math.sin(timeRef.current * 0.2) + 1) * 0.5;
    const shineGradient = ctx.createLinearGradient(
      displayWidth * (shineOffset - 0.3), 0,
      displayWidth * (shineOffset + 0.3), displayHeight
    );
    shineGradient.addColorStop(0, 'rgba(100, 150, 255, 0)');
    shineGradient.addColorStop(0.5, 'rgba(100, 150, 255, 0.03)');
    shineGradient.addColorStop(1, 'rgba(100, 150, 255, 0)');
    
    ctx.fillStyle = shineGradient;
    ctx.fillRect(0, 0, displayWidth, displayHeight);
    ctx.restore();

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      // Canvas will resize in animate loop
    };

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, opacity: variant === 'light' ? 0.3 : 0.6 }}
    />
  );
};

export default ServicesHexagonGrid;
