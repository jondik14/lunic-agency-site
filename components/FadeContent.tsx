import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface FadeContentProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  yOffset?: number;
}

const FadeContent: React.FC<FadeContentProps> = ({ 
  children, 
  delay = 0.5, 
  duration = 0.8,
  className = '',
  yOffset = 20
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: duration,
        delay: delay,
        ease: [0.21, 0.47, 0.32, 0.98] 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeContent;










