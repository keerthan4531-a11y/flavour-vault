// Recipe type definitions

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: Ingredient[];
  steps: CookingStep[];
  cookingTime: number; // in minutes
  prepTime: number;
  servings: number;
  category: RecipeCategory;
  cuisine: CuisineType;
  diet: DietType;
  tags: string[];
  images: RecipeImage[];
  coverImage: string; // base64 or blob URL
  isFavorite: boolean;
  createdAt: number;
  updatedAt: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  calories?: number;
  rating: number;
  viewCount: number;
}

export interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  isOptional: boolean;
}

export interface CookingStep {
  id: string;
  stepNumber: number;
  instruction: string;
  image?: string; // base64
  duration?: number; // minutes
  tip?: string;
}

export interface RecipeImage {
  id: string;
  data: string; // base64
  caption: string;
  isStepImage: boolean;
  stepNumber?: number;
}

export type RecipeCategory = 'Breakfast' | 'Lunch' | 'Dinner' | 'Dessert' | 'Snacks' | 'Appetizer' | 'Beverage';

export type CuisineType = 'Tamil' | 'North Indian' | 'South Indian' | 'Chinese' | 'Continental' | 'Italian' | 'Mexican' | 'Thai' | 'Japanese' | 'Other';

export type DietType = 'Veg' | 'Non-Veg' | 'Vegan' | 'Egg-Free' | 'Gluten-Free';

export type SortOption = 'newest' | 'oldest' | 'name-asc' | 'name-desc' | 'time-asc' | 'time-desc' | 'rating';

export interface RecipeFormData {
  title: string;
  description: string;
  ingredients: Omit<Ingredient, 'id'>[];
  steps: Omit<CookingStep, 'id'>[];
  cookingTime: number;
  prepTime: number;
  servings: number;
  category: RecipeCategory;
  cuisine: CuisineType;
  diet: DietType;
  tags: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  calories?: number;
}
