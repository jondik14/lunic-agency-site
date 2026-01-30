import { useEffect, useRef, useCallback, useState } from 'react';

interface Hexagon {
  x: number;
  y: number;
  size: number;
  opacity: number;
  scale: number;
  phase: number;
}

const HexagonBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hexagonsRef = useRef<Hexagon[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number>();
  const timeRef = useRef(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  const baseHexSize = 80;
  const spotlightRadius = 800;
  const maxFPS = 60;
  const frameInterval = 1000 / maxFPS;
  const lastFrameTimeRef = useRef(0);

  const drawHexagon = useCallback((
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    opacity: number,
    scale: number,
    spotlightOpacity: number // New param for vignette
  ) => {
    const finalVisibility = opacity * spotlightOpacity;
    if (finalVisibility < 0.01) return;

    const angle = Math.PI / 6;
    const currentSize = size * scale;

    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const currAngle = angle + (i * Math.PI) / 3;
      const hx = x + currentSize * Math.cos(currAngle);
      const hy = y + currentSize * Math.sin(currAngle);
      if (i === 0) ctx.moveTo(hx, hy);
      else ctx.lineTo(hx, hy);
    }
    ctx.closePath();

    const baseOpacity = 0.2;
    const finalOpacity = Math.max(baseOpacity, opacity);
    const hue = 210;
    const sat = 10 + finalOpacity * 30;
    const light = 90 - finalOpacity * 10;
    ctx.fillStyle = `hsla(${hue}, ${sat}%, ${light}%, ${finalVisibility * 0.5})`;
    ctx.fill();
    ctx.strokeStyle = `hsla(210, 20%, 70%, ${finalVisibility * 0.4})`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }, []);

  const generateHexagons = useCallback((width: number, height: number, size: number, zoomLevel: number = 1): Hexagon[] => {
    const hexagons: Hexagon[] = [];
    const hSpacing = size * 2;
    const vSpacing = size * 1.8;
    
    // Reduce hexagon density when zoomed out to improve performance
    const densityMultiplier = Math.max(0.5, Math.min(1, zoomLevel));
    const effectiveCols = Math.ceil((width / hSpacing) * densityMultiplier) + 2;
    const effectiveRows = Math.ceil((height / vSpacing) * densityMultiplier) + 2;

    for (let row = -1; row < effectiveRows; row++) {
      for (let col = -1; col < effectiveCols; col++) {
        hexagons.push({
          x: col * hSpacing + (row % 2 === 0 ? 0 : hSpacing / 2),
          y: row * vSpacing,
          size,
          opacity: 0,
          scale: 1,
          phase: Math.random() * Math.PI * 2
        });
      }
    }
    return hexagons;
  }, []);

  const getZoomLevel = useCallback(() => {
    // Detect zoom level by comparing visual viewport to layout viewport
    if (window.visualViewport && window.visualViewport.scale) {
      return window.visualViewport.scale;
    }
    // Fallback: compare innerWidth to outerWidth (less accurate)
    return window.outerWidth / window.innerWidth;
  }, []);

  const initHexagons = useCallback((width: number, height: number) => {
    const zoomLevel = getZoomLevel();
    hexagonsRef.current = generateHexagons(width, height, baseHexSize, zoomLevel);
  }, [baseHexSize, generateHexagons, getZoomLevel]);

  const animate = useCallback((currentTime: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const elapsed = currentTime - lastFrameTimeRef.current;
    if (elapsed < frameInterval) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }
    lastFrameTimeRef.current = currentTime - (elapsed % frameInterval);

    const ctx = canvas.getContext('2d', {
      alpha: true,
      desynchronized: true,
      willReadFrequently: false
    });
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const displayWidth = canvas.clientWidth || window.innerWidth;
    const displayHeight = canvas.clientHeight || window.innerHeight;

    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      ctx.scale(dpr, dpr);
    }

    ctx.clearRect(0, 0, displayWidth, displayHeight);

    const zoom = 1.1;
    const canvasCenterX = displayWidth / 2;
    const canvasCenterY = displayHeight / 2;
    ctx.save();
    ctx.translate(canvasCenterX, canvasCenterY);
    ctx.scale(zoom, zoom);
    ctx.translate(-canvasCenterX, -canvasCenterY);

    const mouse = mouseRef.current;
    timeRef.current += 0.01;
    const time = timeRef.current;
    const rect = canvas.getBoundingClientRect();
    let centerX = mouse.x - rect.left;
    let centerY = mouse.y - rect.top;
    const out = mouse.x < 0 || centerX < 0 || centerX > displayWidth || centerY < 0 || centerY > displayHeight;
    if (out) {
      if (isMobile) {
        centerX = displayWidth / 2 + Math.sin(time * 0.3) * (displayWidth * 0.2);
        centerY = displayHeight / 2 + Math.cos(time * 0.2) * (displayHeight * 0.1);
      } else {
        centerX = displayWidth / 2;
        centerY = displayHeight / 2;
      }
    }
    const invZoom = 1 / zoom;
    const transformedCenterX = canvasCenterX + (centerX - canvasCenterX) * invZoom;
    const transformedCenterY = canvasCenterY + (centerY - canvasCenterY) * invZoom;
    const hexagons = hexagonsRef.current;
    const len = hexagons.length;
    const radiusSq = spotlightRadius * spotlightRadius;

    for (let i = 0; i < len; i++) {
      const hex = hexagons[i];
      let driftX = 0, driftY = 0, pulseOpacity = 0;
      if (isMobile) {
        driftX = Math.sin(time * 0.5 + hex.phase) * 5;
        driftY = Math.cos(time * 0.4 + hex.phase) * 5;
        pulseOpacity = Math.sin(time * 0.6 + hex.phase) * 0.05;
      }
      const dx = (hex.x + driftX) - transformedCenterX;
      const dy = (hex.y + driftY) - transformedCenterY;
      const distSq = dx * dx + dy * dy;
      if (distSq > radiusSq * 1.5) continue;
      const dist = Math.sqrt(distSq);
      const spotlightOpacity = dist < spotlightRadius ? Math.pow(1 - dist / spotlightRadius, 2) : 0;
      const hoverRadius = 500;
      const target = dist < hoverRadius ? (1 - dist / hoverRadius) : 0;
      if (target > hex.opacity) hex.opacity += (target - hex.opacity) * 0.15;
      else hex.opacity += (target - hex.opacity) * 0.02;
      const targetScale = 1 + target * 0.15;
      hex.scale += (targetScale - hex.scale) * 0.1;
      drawHexagon(ctx, hex.x + driftX, hex.y + driftY, hex.size, Math.max(0.2, hex.opacity + pulseOpacity), hex.scale, spotlightOpacity);
    }

    ctx.restore();
    animationRef.current = requestAnimationFrame(animate);
  }, [drawHexagon, spotlightRadius, isMobile, getZoomLevel]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const getSize = () => {
      const parent = canvas.parentElement;
      const w = parent && parent.clientWidth > 0 ? parent.clientWidth : window.innerWidth;
      const h = parent && parent.clientHeight > 0 ? parent.clientHeight : window.innerHeight;
      return { width: w, height: h };
    };

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const { width: displayWidth, height: displayHeight } = getSize();
      // Set canvas size accounting for device pixel ratio
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
      setIsMobile(window.innerWidth < 768);
      initHexagons(displayWidth, displayHeight);
    };

    const handleZoom = () => {
      const { width: displayWidth, height: displayHeight } = getSize();
      initHexagons(displayWidth, displayHeight);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    let resizeTimeout: NodeJS.Timeout;
    const throttledResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 100);
    };

    let zoomTimeout: NodeJS.Timeout;
    const throttledZoom = () => {
      clearTimeout(zoomTimeout);
      zoomTimeout = setTimeout(handleZoom, 150);
    };

    handleResize();

    window.addEventListener('resize', throttledResize, { passive: true });
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', throttledZoom);
      window.visualViewport.addEventListener('scroll', throttledZoom);
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    const parent = canvas.parentElement;
    let ro: ResizeObserver | undefined;
    if (parent) {
      ro = new ResizeObserver(throttledResize);
      ro.observe(parent);
    }

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      ro?.disconnect();
      window.removeEventListener('resize', throttledResize);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', throttledZoom);
        window.visualViewport.removeEventListener('scroll', throttledZoom);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      clearTimeout(resizeTimeout);
      clearTimeout(zoomTimeout);
    };
  }, [animate, initHexagons]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default HexagonBackground;
