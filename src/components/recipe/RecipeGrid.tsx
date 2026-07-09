// RecipeGrid — Responsive grid layout for recipe cards

import { AnimatePresence, motion } from 'framer-motion';
import type { Recipe } from '../../types/recipe';
import { RecipeCard } from './RecipeCard';
import { RecipeCardSkeleton } from '../ui/Loader';
import { BookOpen } from 'lucide-react';

interface RecipeGridProps {
  recipes: Recipe[];
  onToggleFavorite: (id: string) => void;
  loading?: boolean;
  emptyMessage?: string;
  columns?: number;
}

export function RecipeGrid({
  recipes,
  onToggleFavorite,
  loading = false,
  emptyMessage = 'No recipes found',
  columns = 3,
}: RecipeGridProps) {
  if (loading) {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fill, minmax(300px, 1fr))`,
          gap: 24,
        }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <RecipeCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">
          <BookOpen size={32} />
        </div>
        <h3>{emptyMessage}</h3>
        <p>Try adjusting your filters or add a new recipe to get started.</p>
      </div>
    );
  }

  return (
    <motion.div
      layout
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, minmax(300px, 1fr))`,
        gap: 24,
      }}
    >
      <AnimatePresence mode="popLayout">
        {recipes.map((recipe, i) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onToggleFavorite={onToggleFavorite}
            index={i}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
