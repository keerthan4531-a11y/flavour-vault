// Custom hook for recipe operations (thin wrapper around context)

import { useRecipeContext } from '../context/RecipeContext';

export function useRecipes() {
  return useRecipeContext();
}
