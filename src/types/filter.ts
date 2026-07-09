// Filter type definitions

import type { RecipeCategory, CuisineType, DietType, SortOption } from './recipe';

export interface FilterState {
  searchQuery: string;
  category: RecipeCategory | 'All';
  cuisine: CuisineType | 'All';
  diet: DietType | 'All';
  maxCookingTime: number | null; // null means no limit
  sortBy: SortOption;
  tags: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'All';
  ingredientSearch: string[];
}

export const DEFAULT_FILTERS: FilterState = {
  searchQuery: '',
  category: 'All',
  cuisine: 'All',
  diet: 'All',
  maxCookingTime: null,
  sortBy: 'newest',
  tags: [],
  difficulty: 'All',
  ingredientSearch: [],
};

export const COOKING_TIME_OPTIONS = [
  { label: 'Under 15 min', value: 15 },
  { label: 'Under 30 min', value: 30 },
  { label: 'Under 45 min', value: 45 },
  { label: 'Under 1 hour', value: 60 },
  { label: '1+ hours', value: 120 },
  { label: 'Any', value: null },
];

export const CATEGORIES: (RecipeCategory | 'All')[] = [
  'All', 'Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snacks', 'Appetizer', 'Beverage'
];

export const CUISINES: (CuisineType | 'All')[] = [
  'All', 'Tamil', 'North Indian', 'South Indian', 'Chinese', 'Continental', 'Italian', 'Mexican', 'Thai', 'Japanese', 'Other'
];

export const DIETS: (DietType | 'All')[] = [
  'All', 'Veg', 'Non-Veg', 'Vegan', 'Egg-Free', 'Gluten-Free'
];
