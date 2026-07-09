// Favorites Page

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useRecipeContext } from '../context/RecipeContext';
import { RecipeGrid } from '../components/recipe/RecipeGrid';

export function FavoritesPage() {
  const { favorites, toggleFavorite, loading } = useRecipeContext();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ minHeight: '100vh' }}
    >
      <section style={{ padding: '40px 24px 80px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          {/* Header */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Heart size={16} color="#e10600" fill="#e10600" />
              <span
                style={{
                  fontSize: 12,
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#e10600',
                }}
              >
                Your Collection
              </span>
            </div>
            <h1
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(36px, 6vw, 56px)',
                lineHeight: 0.9,
                textTransform: 'uppercase',
              }}
            >
              MY <span style={{ color: '#e10600' }}>FAVORITES</span>
            </h1>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 12 }}>
              {favorites.length} recipe{favorites.length !== 1 ? 's' : ''} saved
            </p>
          </div>

          <RecipeGrid
            recipes={favorites}
            onToggleFavorite={toggleFavorite}
            loading={loading}
            emptyMessage="No favorites yet — heart the recipes you love!"
          />
        </div>
      </section>
    </motion.div>
  );
}
