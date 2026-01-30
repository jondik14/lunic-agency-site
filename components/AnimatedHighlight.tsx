import React, { useRef, useEffect, useState } from 'react';

interface AnimatedHighlightProps {
  children: React.ReactNode;
  className?: string;
  /** 
   * Tailwind gradient colors. 
   * Default: Light Blue (primary-200). 
   * Example for Orange: "from-accent-500/30 to-accent-500/30" 
   */
  colorClass?: string; 
  delay?: number;
}

const AnimatedHighlight: React.FC<AnimatedHighlightProps> = ({ 
  children, 
  className = "", 
  colorClass = "from-primary-200/50 to-primary-200/50",
  delay = 0
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // Trigger when 40% of the element is visible
      if (entry.isIntersecting) {
        // Small delay to let the user settle their gaze
        setTimeout(() => {
          setIsVisible(true);
        }, delay);
        observer.disconnect(); // Only animate once
      }
    }, { 
      threshold: 0.4,
      rootMargin: "0px 0px -10% 0px" // Trigger slightly before it hits bottom of viewport
    });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <span
      ref={ref}
      className={`
        relative inline-block px-1 -mx-1 rounded-sm
        bg-gradient-to-r ${colorClass}
        bg-no-repeat 
        /* Start with 0 width, positioned at the bottom (underline style) */
        bg-[length:0%_35%] bg-[position:0_88%]
        /* Animate the width (background-size) */
        transition-[background-size] duration-700 ease-out
        /* When visible, expand width to 100% */
        ${isVisible ? 'bg-[length:100%_35%]' : ''}
        /* Respect user motion preferences */
        motion-reduce:bg-[length:100%_35%] motion-reduce:transition-none
        ${className}
      `}
    >
      {children}
    </span>
  );
};

export default AnimatedHighlight;