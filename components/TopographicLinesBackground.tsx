import React, { useRef, useEffect, useCallback } from 'react';

interface TopographicLinesBackgroundProps {
  /** Line color (default: subtle blue-grey) */
  color?: string;
  /** Line opacity (default: 0.15) */
  opacity?: number;
  /** Animation speed (default: 0.5) */
  speed?: number;
  /** Number of contour levels (default: 8) */
  levels?: number;
  /** Grid resolution (default: 40) - lower = more detailed but slower */
  resolution?: number;
  /** Line thickness (default: 1) */
  lineWidth?: number;
  className?: string;
}

// Improved 2D noise function for smoother topographic lines
function noise(x: number, y: number, time: number): number {
  // Multiple octaves for more natural variation
  const scale1 = 0.08;
  const scale2 = 0.15;
  const scale3 = 0.25;
  
  const n1 = Math.sin(x * scale1 + time * 0.3) * 0.5 + 0.5;
  const n2 = Math.sin(y * scale1 + time * 0.4) * 0.5 + 0.5;
  const n3 = Math.sin((x + y) * scale2 + time * 0.2) * 0.5 + 0.5;
  const n4 = Math.sin((x - y * 0.7) * scale3 + time * 0.5) * 0.5 + 0.5;
  
  // Combine with weighted average for smoother result
  return (n1 * 0.3 + n2 * 0.3 + n3 * 0.25 + n4 * 0.15);
}

// Helper function to darken a hex color
function darkenColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, Math.min(255, ((num >> 16) & 0xFF) - amount));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0xFF) - amount));
  const b = Math.max(0, Math.min(255, (num & 0xFF) - amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

// Calculate vignette opacity based on distance from center
function getVignetteOpacity(x: number, y: number, width: number, height: number, vignetteStrength: number): number {
  const centerX = width / 2;
  const centerY = height / 2;
  const maxDist = Math.sqrt(centerX * centerX + centerY * centerY);
  const dist = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
  const normalizedDist = Math.min(dist / maxDist, 1);
  // Fade out towards edges - vignetteStrength controls how strong the fade is
  return 1 - (normalizedDist ** vignetteStrength);
}

// Draw contour lines using a simpler approach
function drawContourLines(
  ctx: CanvasRenderingContext2D,
  grid: number[][],
  threshold: number,
  width: number,
  height: number,
  cellSize: number,
  color: string,
  darkColor: string,
  opacity: number,
  lineWidth: number,
  isThick: boolean,
  vignetteStrength: number
) {
  // Use darker color for thick lines
  const useColor = isThick ? darkColor : color;
  
  // Convert hex color to rgba if needed
  let strokeColor = useColor;
  let useGlobalAlpha = true;
  
  if (useColor.startsWith('#')) {
    const hex = useColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    strokeColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;
    useGlobalAlpha = false;
  } else if (useColor.includes('rgba')) {
    useGlobalAlpha = false;
  }
  
  // Set line width - ensure thick lines are significantly thicker (6x for contrast)
  const actualLineWidth = isThick ? lineWidth * 6 : lineWidth;
  ctx.lineWidth = actualLineWidth;
  // Use 'butt' cap to avoid rounded endpoints that look like moving dots
  ctx.lineCap = 'butt';
  ctx.lineJoin = 'round';

  const rows = grid.length;
  const cols = grid[0]?.length || 0;

  // Find and draw contour lines
  for (let y = 0; y < rows - 1; y++) {
    for (let x = 0; x < cols - 1; x++) {
      const a = grid[y]?.[x] ?? 0;
      const b = grid[y]?.[x + 1] ?? 0;
      const c = grid[y + 1]?.[x + 1] ?? 0;
      const d = grid[y + 1]?.[x] ?? 0;

      const xPos = x * cellSize;
      const yPos = y * cellSize;

      // Check if threshold crosses any edge
      const edges: Array<{ x: number; y: number }> = [];

      // Top edge
      if ((a < threshold && b >= threshold) || (a >= threshold && b < threshold)) {
        const t = Math.abs(b - a) > 0.0001 ? (threshold - a) / (b - a) : 0.5;
        const edgeX = xPos + t * cellSize;
        const edgeY = yPos;
        edges.push({ x: edgeX, y: edgeY });
      }

      // Right edge
      if ((b < threshold && c >= threshold) || (b >= threshold && c < threshold)) {
        const t = Math.abs(c - b) > 0.0001 ? (threshold - b) / (c - b) : 0.5;
        const edgeX = xPos + cellSize;
        const edgeY = yPos + t * cellSize;
        edges.push({ x: edgeX, y: edgeY });
      }

      // Bottom edge
      if ((d < threshold && c >= threshold) || (d >= threshold && c < threshold)) {
        const t = Math.abs(c - d) > 0.0001 ? (threshold - d) / (c - d) : 0.5;
        const edgeX = xPos + t * cellSize;
        const edgeY = yPos + cellSize;
        edges.push({ x: edgeX, y: edgeY });
      }

      // Left edge
      if ((a < threshold && d >= threshold) || (a >= threshold && d < threshold)) {
        const t = Math.abs(d - a) > 0.0001 ? (threshold - a) / (d - a) : 0.5;
        const edgeX = xPos;
        const edgeY = yPos + t * cellSize;
        edges.push({ x: edgeX, y: edgeY });
      }

      // Draw line if we have 2 points, with vignette applied
      if (edges.length === 2) {
        const midX = (edges[0].x + edges[1].x) / 2;
        const midY = (edges[0].y + edges[1].y) / 2;
        const vignetteOp = getVignetteOpacity(midX, midY, width, height, vignetteStrength);
        const finalOpacity = opacity * vignetteOp;
        
        if (finalOpacity > 0.01) {
          // Rebuild color with vignette opacity
          if (useColor.startsWith('#')) {
            const hex = useColor.replace('#', '');
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${finalOpacity})`;
            ctx.globalAlpha = 1;
          } else {
            ctx.strokeStyle = strokeColor;
            ctx.globalAlpha = finalOpacity;
          }
          
          // Draw line only (no extension = no round caps that look like dots)
          ctx.beginPath();
          ctx.moveTo(edges[0].x, edges[0].y);
          ctx.lineTo(edges[1].x, edges[1].y);
          ctx.stroke();
        }
      } else if (edges.length === 4) {
        // Ambiguous case - draw two lines
        const midX1 = (edges[0].x + edges[1].x) / 2;
        const midY1 = (edges[0].y + edges[1].y) / 2;
        const midX2 = (edges[2].x + edges[3].x) / 2;
        const midY2 = (edges[2].y + edges[3].y) / 2;
        
        const vignetteOp1 = getVignetteOpacity(midX1, midY1, width, height, vignetteStrength);
        const vignetteOp2 = getVignetteOpacity(midX2, midY2, width, height, vignetteStrength);
        const finalOpacity1 = opacity * vignetteOp1;
        const finalOpacity2 = opacity * vignetteOp2;
        
        if (finalOpacity1 > 0.01) {
          if (useColor.startsWith('#')) {
            const hex = useColor.replace('#', '');
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${finalOpacity1})`;
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${finalOpacity1})`;
            ctx.globalAlpha = 1;
          } else {
            ctx.strokeStyle = strokeColor;
            ctx.globalAlpha = finalOpacity1;
          }
          ctx.beginPath();
          ctx.moveTo(edges[0].x, edges[0].y);
          ctx.lineTo(edges[1].x, edges[1].y);
          ctx.stroke();
        }
        
        if (finalOpacity2 > 0.01) {
          if (useColor.startsWith('#')) {
            const hex = useColor.replace('#', '');
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${finalOpacity2})`;
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${finalOpacity2})`;
            ctx.globalAlpha = 1;
          } else {
            ctx.strokeStyle = strokeColor;
            ctx.globalAlpha = finalOpacity2;
          }
          
          ctx.beginPath();
          ctx.moveTo(edges[2].x, edges[2].y);
          ctx.lineTo(edges[3].x, edges[3].y);
          ctx.stroke();
        }
      }
    }
  }
}

const TopographicLinesBackground: React.FC<TopographicLinesBackgroundProps> = ({
  color = 'rgba(69, 153, 254, 0.15)',
  opacity = 0.15,
  speed = 0.5,
  levels = 8,
  resolution = 40,
  lineWidth = 1,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', {
      alpha: true,
      // Avoid desynchronized on mobile where it can prevent drawing
      desynchronized: false,
    });
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const parent = canvas.parentElement;
    let displayWidth = parent?.clientWidth || canvas.clientWidth || 0;
    let displayHeight = parent?.clientHeight || canvas.clientHeight || 0;
    // Mobile: parent often has 0 size before layout; use viewport so background still draws
    if (displayWidth <= 0 || displayHeight <= 0) {
      displayWidth = window.innerWidth;
      displayHeight = window.innerHeight;
    }

    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }

    ctx.clearRect(0, 0, displayWidth, displayHeight);

    timeRef.current += speed * 0.005; // Slower animation
    const time = timeRef.current;

    // Generate noise grid
    const cols = Math.ceil(displayWidth / resolution) + 1;
    const rows = Math.ceil(displayHeight / resolution) + 1;
    const grid: number[][] = [];

    for (let y = 0; y < rows; y++) {
      grid[y] = [];
      for (let x = 0; x < cols; x++) {
        const nx = (x * resolution) / 100;
        const ny = (y * resolution) / 100;
        grid[y][x] = noise(nx, ny, time);
      }
    }

    // Create darker blue for thick lines
    const darkColor = color.startsWith('#') ? darkenColor(color, 50) : color;
    const vignetteStrength = 2.5; // Controls how strong the vignette fade is
    
    // Draw contour lines at different levels
    for (let i = 0; i < levels; i++) {
      const threshold = i / levels;
      // Vary opacity across levels - stronger lines at certain elevations
      const levelOpacity = opacity * (0.4 + Math.sin(i / levels * Math.PI) * 0.6);
      
      // Make every 3rd line thicker for contrast - much thicker
      const isThick = i % 3 === 0;
      
      drawContourLines(
        ctx,
        grid,
        threshold,
        displayWidth,
        displayHeight,
        resolution,
        color,
        darkColor,
        levelOpacity,
        lineWidth,
        isThick,
        vignetteStrength
      );
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [color, opacity, speed, levels, resolution, lineWidth]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  // ResizeObserver: on mobile, parent size can be 0 until layout; observe so we redraw when hero has real dimensions
  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!parent) return;

    const ro = new ResizeObserver(() => {
      if (canvasRef.current && animationRef.current != null) {
        // Force next frame to use new dimensions (animate already runs and reads parent size)
        requestAnimationFrame(() => {});
      }
    });
    ro.observe(parent);
    return () => ro.disconnect();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full min-h-[100%] pointer-events-none ${className}`}
      style={{ zIndex: 0, display: 'block' }}
      aria-hidden="true"
    />
  );
};

export default TopographicLinesBackground;
