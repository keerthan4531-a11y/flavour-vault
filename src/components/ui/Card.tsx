// Card component with glassmorphism

import type { ReactNode, CSSProperties } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  glass?: boolean;
  hover?: boolean;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

export function Card({ children, glass = false, hover = true, className = '', style, onClick }: CardProps) {
  return (
    <motion.div
      className={`${glass ? 'glass-card' : 'recipe-card'} ${className}`}
      style={style}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      whileHover={hover ? { y: -6 } : undefined}
    >
      {children}
    </motion.div>
  );
}
