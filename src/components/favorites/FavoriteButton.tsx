// Favorite Button with heart animation

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
  size?: number;
  className?: string;
}

export function FavoriteButton({ isFavorite, onToggle, size = 18, className = '' }: FavoriteButtonProps) {
  const [pulse, setPulse] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setPulse(true);
    onToggle();
    setTimeout(() => setPulse(false), 400);
  };

  return (
    <motion.button
      className={`favorite-btn ${isFavorite ? 'active' : ''} ${pulse ? 'pulse' : ''} ${className}`}
      onClick={handleClick}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.85 }}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart
        size={size}
        fill={isFavorite ? '#fff' : 'transparent'}
        color={isFavorite ? '#fff' : '#ffc7c6'}
        strokeWidth={2}
      />
    </motion.button>
  );
}
