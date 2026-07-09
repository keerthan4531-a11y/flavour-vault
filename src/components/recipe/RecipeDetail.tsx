// RecipeDetail component — Full recipe view

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Clock, Users, ChefHat, Star, Flame, Printer, ArrowLeft, Edit3, Trash2,
  Share2, BookOpen, UtensilsCrossed
} from 'lucide-react';
import type { Recipe } from '../../types/recipe';
import { IngredientsList } from './IngredientsList';
import { StepsList } from './StepsList';
import { FavoriteButton } from '../favorites/FavoriteButton';
import { Badge } from '../ui/Badge';
import { ImagePreview } from '../upload/ImagePreview';
import { formatCookingTime, getDifficultyColor } from '../../utils/searchHelper';
import { AINutritionPanel } from '../ai/AINutritionPanel';
import { AISuggestions } from '../ai/AISuggestions';

interface RecipeDetailProps {
  recipe: Recipe;
  onToggleFavorite: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onBack: () => void;
}

export function RecipeDetail({ recipe, onToggleFavorite, onEdit, onDelete, onBack }: RecipeDetailProps) {
  const [activeTab, setActiveTab] = useState<'ingredients' | 'steps'>('ingredients');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);

  const allImages = [recipe.coverImage, ...recipe.images.map(i => i.data)].filter(Boolean);

  const handlePrint = () => window.print();

  const PLACEHOLDER_GRADIENTS = [
    'linear-gradient(135deg, #e10600 0%, #4f0423 100%)',
    'linear-gradient(135deg, #4f0423 0%, #260212 100%)',
    'linear-gradient(135deg, #e10600 0%, #260212 100%)',
  ];

  const CATEGORY_IMAGES: Record<string, string> = {
    Breakfast: '/images/cat-breakfast.png', Lunch: '/images/cat-lunch.png',
    Dinner: '/images/cat-dinner.png', Dessert: '/images/cat-dessert.png',
    Snacks: '/images/cat-snacks.png', Appetizer: '/images/cat-appetizer.png',
    Beverage: '/images/cat-beverage.png',
  };

  const gradientIndex = Math.abs(recipe.title.charCodeAt(0)) % PLACEHOLDER_GRADIENTS.length;
  const fallbackImage = CATEGORY_IMAGES[recipe.category] || '/images/cat-lunch.png';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Hero Image */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 400,
          overflow: 'hidden',
          borderRadius: '0 0 24px 24px',
        }}
      >
        {recipe.coverImage ? (
          <img
            src={recipe.coverImage}
            alt={recipe.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onClick={() => { setPreviewIndex(0); setPreviewOpen(true); }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <img
              src={fallbackImage}
              alt={recipe.category}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: PLACEHOLDER_GRADIENTS[gradientIndex], opacity: 0.35 }} />
          </div>
        )}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(transparent 50%, rgba(0,0,0,0.8))',
          }}
        />

        {/* Top actions */}
        <div
          className="no-print"
          style={{
            position: 'absolute',
            top: 16,
            left: 16,
            right: 16,
            display: 'flex',
            justifyContent: 'space-between',
            zIndex: 10,
          }}
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            style={{
              width: 40, height: 40, borderRadius: '50%',
              background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)',
              color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: 'none', cursor: 'pointer',
            }}
          >
            <ArrowLeft size={18} />
          </motion.button>

          <div style={{ display: 'flex', gap: 8 }}>
            <FavoriteButton isFavorite={recipe.isFavorite} onToggle={onToggleFavorite} />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrint}
              style={{
                width: 40, height: 40, borderRadius: '50%',
                background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)',
                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: 'none', cursor: 'pointer',
              }}
            >
              <Printer size={16} />
            </motion.button>
          </div>
        </div>

        {/* Title overlay */}
        <div
          style={{
            position: 'absolute',
            bottom: 24,
            left: 24,
            right: 24,
            zIndex: 10,
          }}
        >
          <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
            <Badge variant={recipe.diet === 'Veg' || recipe.diet === 'Vegan' ? 'veg' : 'nonveg'}>
              {recipe.diet}
            </Badge>
            <Badge variant="blush">{recipe.cuisine}</Badge>
            <Badge variant="custom" color={getDifficultyColor(recipe.difficulty)} bgColor={`${getDifficultyColor(recipe.difficulty)}20`}>
              {recipe.difficulty}
            </Badge>
          </div>
          <h1
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(28px, 5vw, 44px)',
              lineHeight: 0.9,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              color: '#fff',
            }}
          >
            {recipe.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 24px' }}>
        {/* Description */}
        <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: 28 }}>
          {recipe.description}
        </p>

        {/* Meta cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
            gap: 12,
            marginBottom: 32,
          }}
        >
          {[
            { icon: Clock, label: 'Cook Time', value: formatCookingTime(recipe.cookingTime) },
            { icon: Clock, label: 'Prep Time', value: formatCookingTime(recipe.prepTime) },
            { icon: Users, label: 'Servings', value: `${recipe.servings}` },
            { icon: Star, label: 'Rating', value: `${recipe.rating}` },
            ...(recipe.calories ? [{ icon: Flame, label: 'Calories', value: `${recipe.calories}` }] : []),
          ].map((meta, i) => (
            <motion.div
              key={meta.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card"
              style={{
                padding: '16px',
                textAlign: 'center',
                cursor: 'default',
              }}
            >
              <meta.icon size={18} color="var(--color-impossible-red)" style={{ margin: '0 auto 6px' }} />
              <div style={{ fontSize: 18, fontWeight: 700, fontFamily: "'Outfit', sans-serif" }}>
                {meta.value}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {meta.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tags */}
        {recipe.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 32 }}>
            {recipe.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  padding: '5px 12px',
                  borderRadius: 10,
                  fontSize: 12,
                  fontWeight: 500,
                  background: 'rgba(255,199,198,0.08)',
                  color: 'var(--text-secondary)',
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Tabs */}
        <div
          style={{
            display: 'flex',
            gap: 4,
            marginBottom: 24,
            padding: 4,
            background: 'var(--bg-secondary)',
            borderRadius: 14,
          }}
        >
          {[
            { key: 'ingredients' as const, label: 'Ingredients', icon: BookOpen, count: recipe.ingredients.length },
            { key: 'steps' as const, label: 'Steps', icon: UtensilsCrossed, count: recipe.steps.length },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                fontSize: 13,
                fontFamily: "'Outfit', sans-serif",
                fontWeight: activeTab === tab.key ? 600 : 400,
                color: activeTab === tab.key ? '#fff' : 'var(--text-secondary)',
                background: activeTab === tab.key ? 'var(--color-impossible-red)' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 200ms',
              }}
            >
              <tab.icon size={14} />
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Tab content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'ingredients' ? (
            <IngredientsList ingredients={recipe.ingredients} />
          ) : (
            <StepsList steps={recipe.steps} />
          )}
        </motion.div>

        {/* Additional images */}
        {allImages.length > 1 && (
          <div style={{ marginTop: 40 }}>
            <h3
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                fontSize: 16,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: 16,
                color: 'var(--text-primary)',
              }}
            >
              Photos
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                gap: 8,
              }}
            >
              {allImages.map((img, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => { setPreviewIndex(i); setPreviewOpen(true); }}
                  style={{
                    aspectRatio: '1',
                    borderRadius: 10,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <img src={img} alt={`Photo ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* AI Features */}
        <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <AINutritionPanel
            ingredients={recipe.ingredients.map((i) => ({ name: i.name, quantity: i.quantity, unit: i.unit }))}
            servings={recipe.servings}
          />
          <AISuggestions
            recipeTitle={recipe.title}
            ingredients={recipe.ingredients.map((i) => i.name)}
            steps={recipe.steps.map((s) => s.instruction)}
          />
        </div>

        {/* Actions */}
        <div
          className="no-print"
          style={{
            display: 'flex',
            gap: 12,
            marginTop: 40,
            paddingTop: 24,
            borderTop: '1px solid var(--border-color)',
          }}
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onEdit}
            className="btn-ghost"
            style={{ flex: 1, justifyContent: 'center', padding: '12px 20px' }}
          >
            <Edit3 size={14} /> Edit Recipe
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onDelete}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '12px 20px',
              borderRadius: 15,
              background: 'rgba(225,6,0,0.1)',
              color: '#e10600',
              fontSize: 14,
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 500,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            <Trash2 size={14} /> Delete
          </motion.button>
        </div>
      </div>

      {/* Image Preview Modal */}
      <ImagePreview
        images={allImages}
        initialIndex={previewIndex}
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
      />
    </motion.div>
  );
}
