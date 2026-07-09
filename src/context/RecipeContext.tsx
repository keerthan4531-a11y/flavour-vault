// Recipe Context — Global recipe state management

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import type { Recipe } from '../types/recipe';
import * as db from '../utils/db';
import { SAMPLE_RECIPES } from '../utils/constants';

interface RecipeContextType {
  recipes: Recipe[];
  favorites: Recipe[];
  recentlyViewed: Recipe[];
  loading: boolean;
  error: string | null;
  addRecipe: (recipe: Recipe) => Promise<void>;
  updateRecipe: (recipe: Recipe) => Promise<void>;
  deleteRecipe: (id: string) => Promise<void>;
  toggleFavorite: (id: string) => Promise<void>;
  getRecipeById: (id: string) => Recipe | undefined;
  recordView: (id: string) => void;
  refreshRecipes: () => Promise<void>;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export function RecipeProvider({ children }: { children: ReactNode }) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRecipes = useCallback(async () => {
    try {
      setLoading(true);
      // Seed sample recipes on first load
      await db.seedSampleRecipes(SAMPLE_RECIPES as Recipe[]);
      const all = await db.getAllRecipes();
      setRecipes(all);
      setError(null);
    } catch (err) {
      setError('Failed to load recipes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRecipes();
  }, [loadRecipes]);

  const addRecipe = async (recipe: Recipe) => {
    await db.addRecipe(recipe);
    setRecipes((prev) => [recipe, ...prev]);
  };

  const updateRecipe = async (recipe: Recipe) => {
    await db.updateRecipe(recipe);
    setRecipes((prev) => prev.map((r) => (r.id === recipe.id ? recipe : r)));
  };

  const deleteRecipeHandler = async (id: string) => {
    await db.deleteRecipe(id);
    setRecipes((prev) => prev.filter((r) => r.id !== id));
  };

  const toggleFavorite = async (id: string) => {
    const newState = await db.toggleFavorite(id);
    setRecipes((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isFavorite: newState } : r))
    );
  };

  const getRecipeById = (id: string) => recipes.find((r) => r.id === id);

  const recordView = (id: string) => {
    const recipe = recipes.find((r) => r.id === id);
    if (recipe) {
      db.incrementViewCount(id);
      setRecentlyViewed((prev) => {
        const filtered = prev.filter((r) => r.id !== id);
        return [recipe, ...filtered].slice(0, 10);
      });
    }
  };

  const favorites = recipes.filter((r) => r.isFavorite);

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        favorites,
        recentlyViewed,
        loading,
        error,
        addRecipe,
        updateRecipe,
        deleteRecipe: deleteRecipeHandler,
        toggleFavorite,
        getRecipeById,
        recordView,
        refreshRecipes: loadRecipes,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}

export function useRecipeContext(): RecipeContextType {
  const context = useContext(RecipeContext);
  if (!context) throw new Error('useRecipeContext must be used within RecipeProvider');
  return context;
}
