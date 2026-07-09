// RecipeCard component — the star card for recipe display

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Users, ChefHat, Star, Flame } from 'lucide-react';
import type { Recipe } from '../../types/recipe';
import { FavoriteButton } from '../favorites/FavoriteButton';
import { Badge } from '../ui/Badge';
import { formatCookingTime, getDifficultyColor } from '../../utils/searchHelper';

interface RecipeCardProps {
  recipe: Recipe;
  onToggleFavorite: (id: string) => void;
  index?: number;
}

// Placeholder gradient backgrounds for recipes without images
const PLACEHOLDER_GRADIENTS = [
  'linear-gradient(135deg, #e10600 0%, #4f0423 100%)',
  'linear-gradient(135deg, #4f0423 0%, #260212 100%)',
  'linear-gradient(135deg, #e10600 0%, #260212 100%)',
  'linear-gradient(135deg, #260212 0%, #e10600 50%, #4f0423 100%)',
  'linear-gradient(135deg, #4f0423 0%, #e10600 100%)',
  'linear-gradient(135deg, #260212 0%, #4f0423 50%, #e10600 100%)',
];

const CATEGORY_IMAGES: Record<string, string> = {
  Breakfast: '/images/cat-breakfast.png',
  Lunch: '/images/cat-lunch.png',
  Dinner: '/images/cat-dinner.png',
  Dessert: '/images/cat-dessert.png',
  Snacks: '/images/cat-snacks.png',
  Appetizer: '/images/cat-appetizer.png',
  Beverage: '/images/cat-beverage.png',
};

export function RecipeCard({ recipe, onToggleFavorite, index = 0 }: RecipeCardProps) {
  const navigate = useNavigate();

  const gradientIndex = Math.abs(recipe.title.charCodeAt(0)) % PLACEHOLDER_GRADIENTS.length;
  const fallbackImage = CATEGORY_IMAGES[recipe.category] || '/images/cat-lunch.png';

  return (
    <motion.div
      className="recipe-card"
      onClick={() => navigate(`/recipes/${recipe.id}`)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.4, 0, 0.2, 1] }}
      layout
    >
      {/* Image / Placeholder */}
      <div className="card-image">
        {recipe.coverImage ? (
          <img src={recipe.coverImage} alt={recipe.title} loading="lazy" />
        ) : (
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <img
              src={fallbackImage}
              alt={recipe.category}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              loading="lazy"
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: PLACEHOLDER_GRADIENTS[gradientIndex],
                opacity: 0.4,
              }}
            />
          </div>
        )}

        {/* Overlay badges */}
        <div
          style={{
            position: 'absolute',
            top: 12,
            left: 12,
            display: 'flex',
            gap: 6,
          }}
        >
          <Badge variant={recipe.diet === 'Veg' || recipe.diet === 'Vegan' ? 'veg' : 'nonveg'}>
            {recipe.diet}
          </Badge>
          <Badge
            variant="custom"
            color={getDifficultyColor(recipe.difficulty)}
            bgColor={`${getDifficultyColor(recipe.difficulty)}20`}
          >
            {recipe.difficulty}
          </Badge>
        </div>

        {/* Favorite button */}
        <div style={{ position: 'absolute', top: 12, right: 12 }}>
          <FavoriteButton
            isFavorite={recipe.isFavorite}
            onToggle={() => onToggleFavorite(recipe.id)}
          />
        </div>

        {/* Category tag */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
            padding: '32px 16px 12px',
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-impossible-red)',
            }}
          >
            {recipe.category} • {recipe.cuisine}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="card-body">
        <h3 className="card-title">{recipe.title}</h3>
        <p className="card-desc">{recipe.description}</p>

        {/* Meta */}
        <div className="card-meta">
          <span className="meta-item">
            <Clock size={13} />
            {formatCookingTime(recipe.cookingTime)}
          </span>
          <span className="meta-item">
            <Users size={13} />
            {recipe.servings} servings
          </span>
          <span className="meta-item">
            <Star size={13} fill="#fbbf24" color="#fbbf24" />
            {recipe.rating}
          </span>
          {recipe.calories && (
            <span className="meta-item">
              <Flame size={13} />
              {recipe.calories} cal
            </span>
          )}
        </div>

        {/* Tags */}
        {recipe.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 10 }}>
            {recipe.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                style={{
                  padding: '3px 8px',
                  borderRadius: 8,
                  fontSize: 10,
                  fontWeight: 500,
                  background: 'rgba(255,199,198,0.08)',
                  color: 'var(--text-secondary)',
                  textTransform: 'lowercase',
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
