import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";

interface AnimatedGridPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeDasharray?: number;
  numSquares?: number;
  className?: string;
  maxOpacity?: number;
  duration?: number;
  repeatDelay?: number;
}

// Helper function to create hexagon path
const createHexagonPath = (size: number, x: number, y: number): string => {
  const points: { x: number; y: number }[] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i;
    points.push({
      x: x + size * Math.cos(angle),
      y: y + size * Math.sin(angle),
    });
  }
  return `M ${points[0].x} ${points[0].y} ${points
    .slice(1)
    .map((p) => `L ${p.x} ${p.y}`)
    .join(" ")} Z`;
};

export function AnimatedGridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 50,
  className,
  maxOpacity = 0.5,
  duration = 4,
  repeatDelay = 0,
  ...props
}: AnimatedGridPatternProps) {
  const id = useRef<string | null>(null);
  const [patternId, setPatternId] = useState<string>("");

  useEffect(() => {
    // Generate a unique ID for this pattern instance
    const uniqueId = `grid-pattern-${Math.random().toString(36).substr(2, 9)}`;
    id.current = uniqueId;
    setPatternId(uniqueId);
  }, []);

  // Calculate hexagon size based on width/height - larger for wire mesh effect
  const hexSize = Math.min(width, height) * 0.35;
  const hexSpacing = width * 0.866; // Horizontal spacing for hexagons (√3/2)

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full text-studio-accent",
        className
      )}
      {...props}
    >
      <defs>
        {/* Radial gradient mask for fade effect - white in center, transparent at edges */}
        <radialGradient id={`${patternId}-mask-gradient`} cx="50%" cy="50%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="40%" stopColor="white" stopOpacity="0.8" />
          <stop offset="70%" stopColor="white" stopOpacity="0.3" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        
        {/* Pattern for hexagon grid base - wire mesh */}
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          {/* Hexagon outline in pattern - wire mesh style */}
          <path
            d={createHexagonPath(hexSize, width / 2, height / 2)}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            opacity={0.6}
          />
        </pattern>
        
        {/* Mask for radial fade */}
        <mask id={`${patternId}-mask`}>
          <rect width="100%" height="100%" fill="url(#${patternId}-mask-gradient)" />
        </mask>
      </defs>
      
      {/* Base hexagon grid pattern - wire mesh */}
      <rect 
        width="100%" 
        height="100%" 
        fill={`url(#${patternId})`}
        mask={`url(#${patternId}-mask)`}
        opacity={0.8}
      />
      
      {/* Animated hexagons with individual opacity animations - wire mesh style */}
      <g fill="none" stroke="currentColor" strokeWidth="2" mask={`url(#${patternId}-mask)`}>
        {Array.from({ length: numSquares }, (_, i) => {
          const delay = Math.random() * duration;
          const colsPerRow = Math.ceil(Math.sqrt(numSquares * 1.2)); // Account for hexagon spacing
          const row = Math.floor(i / colsPerRow);
          const col = i % colsPerRow;
          const offsetX = row % 2 === 0 ? 0 : hexSpacing / 2;
          const hexX = (col * hexSpacing) + offsetX;
          const hexY = (row * height * 0.866); // √3/2 for proper hexagon tiling
          
          return (
            <path
              key={i}
              d={createHexagonPath(hexSize * 0.65, hexX, hexY)}
              fill="none"
              stroke="currentColor"
              opacity={maxOpacity * 0.6}
              style={{
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
                animationIterationCount: "infinite",
              }}
            >
              <animate
                attributeName="opacity"
                from={0}
                to={maxOpacity * 0.8}
                dur={`${duration}s`}
                begin={`${delay}s`}
                repeatCount="indefinite"
                values={`0;${maxOpacity * 0.8};0`}
                keyTimes="0;0.5;1"
              />
            </path>
          );
        })}
      </g>
    </svg>
  );
}
