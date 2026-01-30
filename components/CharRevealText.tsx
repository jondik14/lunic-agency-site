import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import './CharRevealText.css';

interface CharRevealTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p';
  className?: string;
  stagger?: number;
  delayChildren?: number;
  /** Start chars at this opacity; on scroll they reveal to 1. If unset, uses fade-up from 0. */
  initialOpacity?: number;
}

const CharRevealText: React.FC<CharRevealTextProps> = ({
  text,
  as: Tag = 'h2',
  className = '',
  stagger = 0.018,
  delayChildren = 0.05,
  initialOpacity,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const chars = useMemo(() => text.split(''), [text]);

  const charVariants = useMemo(() => {
    if (prefersReducedMotion) {
      return { hidden: { opacity: initialOpacity ?? 0 }, visible: { opacity: 1 } };
    }
    if (typeof initialOpacity === 'number') {
      return { hidden: { opacity: initialOpacity }, visible: { opacity: 1 } };
    }
    return { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } };
  }, [prefersReducedMotion, initialOpacity]);

  const lineVariants = useMemo(
    () => ({
      hidden: {},
      visible: {
        transition: {
          staggerChildren: prefersReducedMotion ? 0 : stagger,
          delayChildren: prefersReducedMotion ? 0 : delayChildren,
        },
      },
    }),
    [stagger, delayChildren, prefersReducedMotion]
  );

  return (
    <Tag className={className}>
      <div className="line-mask">
        <motion.div
          className="line"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={lineVariants}
        >
          {chars.map((c, i) => (
            <motion.span
              key={i}
              className="char"
              variants={charVariants}
              transition={{
                duration: prefersReducedMotion ? 0.2 : 0.35,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {c === ' ' ? '\u00A0' : c}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </Tag>
  );
};

export default CharRevealText;
