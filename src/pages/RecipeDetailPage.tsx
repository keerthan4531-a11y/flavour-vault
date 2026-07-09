// Recipe Detail Page — Wrapper for RecipeDetail component

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useRecipeContext } from '../context/RecipeContext';
import { RecipeDetail } from '../components/recipe/RecipeDetail';
import { RecipeForm } from '../components/recipe/RecipeForm';
import { Modal } from '../components/ui/Modal';
import { useToast } from '../components/ui/Toast';
import { Loader } from '../components/ui/Loader';
import type { Recipe } from '../types/recipe';

export function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getRecipeById, toggleFavorite, updateRecipe, deleteRecipe, recordView, loading } = useRecipeContext();
  const { showToast } = useToast();
  const [editing, setEditing] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const recipe = id ? getRecipeById(id) : undefined;

  useEffect(() => {
    if (id) recordView(id);
  }, [id]);

  if (loading) {
    return (
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '80px 24px' }}>
        <Loader height={400} borderRadius={24} />
        <div style={{ marginTop: 32 }}>
          <Loader width="60%" height={40} />
          <div style={{ marginTop: 16 }}>
            <Loader height={20} count={3} />
          </div>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="empty-state" style={{ minHeight: '60vh' }}>
        <h3>Recipe Not Found</h3>
        <p>This recipe doesn't exist or has been deleted.</p>
        <button onClick={() => navigate('/recipes')} className="btn-primary" style={{ marginTop: 16 }}>
          Browse Recipes
        </button>
      </div>
    );
  }

  if (editing) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px 80px' }}
      >
        <h1
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 900,
            fontSize: 32,
            textTransform: 'uppercase',
            marginBottom: 32,
          }}
        >
          EDIT <span style={{ color: '#e10600' }}>RECIPE</span>
        </h1>
        <RecipeForm
          initialData={recipe}
          onSubmit={async (updated: Recipe) => {
            await updateRecipe(updated);
            showToast('Recipe updated successfully!');
            setEditing(false);
          }}
          onCancel={() => setEditing(false)}
        />
      </motion.div>
    );
  }

  return (
    <>
      <RecipeDetail
        recipe={recipe}
        onToggleFavorite={() => {
          toggleFavorite(recipe.id);
          showToast(recipe.isFavorite ? 'Removed from favorites' : 'Added to favorites!');
        }}
        onEdit={() => setEditing(true)}
        onDelete={() => setDeleteConfirm(true)}
        onBack={() => navigate(-1)}
      />

      {/* Delete confirmation modal */}
      <Modal
        isOpen={deleteConfirm}
        onClose={() => setDeleteConfirm(false)}
        title="Delete Recipe"
        maxWidth="400px"
      >
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 24 }}>
          Are you sure you want to delete <strong style={{ color: 'var(--text-primary)' }}>{recipe.title}</strong>? This action cannot be undone.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <button onClick={() => setDeleteConfirm(false)} className="btn-ghost" style={{ padding: '10px 20px' }}>
            Cancel
          </button>
          <button
            onClick={async () => {
              await deleteRecipe(recipe.id);
              showToast('Recipe deleted');
              navigate('/recipes');
            }}
            className="btn-primary"
            style={{ padding: '10px 20px', background: '#e10600' }}
          >
            Delete
          </button>
        </div>
      </Modal>
    </>
  );
}
