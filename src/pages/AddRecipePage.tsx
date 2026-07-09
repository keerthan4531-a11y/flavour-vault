// Add Recipe Page

import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useRecipeContext } from '../context/RecipeContext';
import { RecipeForm } from '../components/recipe/RecipeForm';
import { useToast } from '../components/ui/Toast';
import type { Recipe } from '../types/recipe';

export function AddRecipePage() {
  const navigate = useNavigate();
  const { addRecipe } = useRecipeContext();
  const { showToast } = useToast();

  const handleSubmit = async (recipe: Recipe) => {
    await addRecipe(recipe);
    showToast('Recipe added successfully! 🎉');
    navigate(`/recipes/${recipe.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px 80px' }}
    >
      <div style={{ marginBottom: 40 }}>
        <span
          style={{
            fontSize: 12,
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#e10600',
            display: 'block',
            marginBottom: 8,
          }}
        >
          Create New
        </span>
        <h1
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(36px, 6vw, 56px)',
            lineHeight: 0.9,
            textTransform: 'uppercase',
          }}
        >
          ADD <span style={{ color: '#e10600' }}>RECIPE</span>
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 12 }}>
          Share your culinary masterpiece with the world.
        </p>
      </div>

      <div
        className="glass-card"
        style={{
          padding: '32px',
          borderRadius: 20,
          cursor: 'default',
        }}
      >
        <RecipeForm onSubmit={handleSubmit} onCancel={() => navigate(-1)} />
      </div>
    </motion.div>
  );
}
