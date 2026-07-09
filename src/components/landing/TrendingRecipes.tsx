// TrendingRecipes — Trending recipe cards on landing page

import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRecipeContext } from '../../context/RecipeContext';
import { RecipeCard } from '../recipe/RecipeCard';

export function TrendingRecipes() {
  const { recipes, toggleFavorite } = useRecipeContext();

  // Get top recipes by viewCount or rating
  const trending = [...recipes]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  if (trending.length === 0) return null;

  return (
    <section style={{ padding: '100px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: 48,
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <TrendingUp size={16} color="#e10600" />
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
                Popular Now
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(32px, 5vw, 48px)',
                lineHeight: 0.9,
                textTransform: 'uppercase',
              }}
            >
              TRENDING <span style={{ color: '#e10600' }}>RECIPES</span>
            </h2>
          </div>

          <Link to="/recipes">
            <motion.button
              whileHover={{ scale: 1.05, x: 4 }}
              className="btn-ghost"
              style={{ padding: '10px 20px', fontSize: 12 }}
            >
              VIEW ALL
              <ArrowRight size={14} />
            </motion.button>
          </Link>
        </motion.div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 24,
          }}
        >
          {trending.map((recipe, i) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onToggleFavorite={toggleFavorite}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
