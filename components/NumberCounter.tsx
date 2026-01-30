import React, { useEffect, useState, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'motion/react';

interface NumberCounterProps {
  value: string;
  className?: string;
}

const NumberCounter: React.FC<NumberCounterProps> = ({ value, className }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Extract number and suffix (e.g., "+40%" -> 40 and "%", "0.6s" -> 0.6 and "s")
  const numericValue = parseFloat(value.replace(/[^\d.-]/g, ''));
  const suffix = value.replace(/[\d.-]/g, '');
  const prefix = value.startsWith('+') ? '+' : value.startsWith('-') ? '-' : '';
  const absoluteValue = Math.abs(numericValue);

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(absoluteValue);
    }
  }, [isInView, absoluteValue, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(latest);
    });
  }, [springValue]);

  // Handle case where value is not a number (e.g. "High", "Premium")
  if (isNaN(numericValue)) {
    return <span className={className}>{value}</span>;
  }

  const isInteger = Number.isInteger(absoluteValue);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {isInteger ? Math.floor(displayValue) : displayValue.toFixed(1)}
      {suffix}
    </span>
  );
};

export default NumberCounter;


