// Custom hook for favorites

import { useRecipeContext } from '../context/RecipeContext';

export function useFavorites() {
  const { favorites, toggleFavorite } = useRecipeContext();
  return { favorites, toggleFavorite };
}
