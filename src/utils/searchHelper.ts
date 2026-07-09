// Search and filter utilities

import type { Recipe } from '../types/recipe';
import type { FilterState } from '../types/filter';

/**
 * Filter and sort recipes based on filter state
 */
export function filterRecipes(recipes: Recipe[], filters: FilterState): Recipe[] {
  let result = [...recipes];

  // Text search
  if (filters.searchQuery.trim()) {
    const query = filters.searchQuery.toLowerCase().trim();
    result = result.filter(
      (r) =>
        r.title.toLowerCase().includes(query) ||
        r.description.toLowerCase().includes(query) ||
        r.tags.some((t) => t.toLowerCase().includes(query)) ||
        r.ingredients.some((i) => i.name.toLowerCase().includes(query))
    );
  }

  // Ingredient-based search
  if (filters.ingredientSearch.length > 0) {
    result = result.filter((r) =>
      filters.ingredientSearch.every((searchIngredient) =>
        r.ingredients.some((i) =>
          i.name.toLowerCase().includes(searchIngredient.toLowerCase())
        )
      )
    );
  }

  // Category filter
  if (filters.category !== 'All') {
    result = result.filter((r) => r.category === filters.category);
  }

  // Cuisine filter
  if (filters.cuisine !== 'All') {
    result = result.filter((r) => r.cuisine === filters.cuisine);
  }

  // Diet filter
  if (filters.diet !== 'All') {
    result = result.filter((r) => r.diet === filters.diet);
  }

  // Cooking time filter
  if (filters.maxCookingTime !== null) {
    result = result.filter((r) => r.cookingTime <= filters.maxCookingTime!);
  }

  // Difficulty filter
  if (filters.difficulty !== 'All') {
    result = result.filter((r) => r.difficulty === filters.difficulty);
  }

  // Tags filter
  if (filters.tags.length > 0) {
    result = result.filter((r) =>
      filters.tags.some((tag) => r.tags.includes(tag))
    );
  }

  // Sort
  switch (filters.sortBy) {
    case 'newest':
      result.sort((a, b) => b.createdAt - a.createdAt);
      break;
    case 'oldest':
      result.sort((a, b) => a.createdAt - b.createdAt);
      break;
    case 'name-asc':
      result.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'name-desc':
      result.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case 'time-asc':
      result.sort((a, b) => a.cookingTime - b.cookingTime);
      break;
    case 'time-desc':
      result.sort((a, b) => b.cookingTime - a.cookingTime);
      break;
    case 'rating':
      result.sort((a, b) => b.rating - a.rating);
      break;
  }

  return result;
}

/**
 * Get all unique tags from recipes
 */
export function getAllTags(recipes: Recipe[]): string[] {
  const tagSet = new Set<string>();
  recipes.forEach((r) => r.tags.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet).sort();
}

/**
 * Get recipe count by category
 */
export function getRecipeCountByCategory(recipes: Recipe[]): Record<string, number> {
  const counts: Record<string, number> = {};
  recipes.forEach((r) => {
    counts[r.category] = (counts[r.category] || 0) + 1;
  });
  return counts;
}

/**
 * Get a random recipe (for Recipe of the Day)
 */
export function getRandomRecipe(recipes: Recipe[]): Recipe | null {
  if (recipes.length === 0) return null;
  // Use date as seed for consistency within a day
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const index = seed % recipes.length;
  return recipes[index];
}

/**
 * Format cooking time display
 */
export function formatCookingTime(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
}

/**
 * Get difficulty color
 */
export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case 'Easy': return '#4ade80';
    case 'Medium': return '#fbbf24';
    case 'Hard': return '#e10600';
    default: return '#ffc7c6';
  }
}
