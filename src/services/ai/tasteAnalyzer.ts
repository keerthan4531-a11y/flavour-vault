import type { Recipe } from '../../types/recipe';

export interface TasteProfile {
  topCuisines: string[];
  topDiets: string[];
  topTags: string[];
  persona: string;
}

export function generateTasteProfile(favorites: Recipe[]): TasteProfile | null {
  if (favorites.length === 0) return null;

  const cuisineCount: Record<string, number> = {};
  const dietCount: Record<string, number> = {};
  const tagCount: Record<string, number> = {};

  favorites.forEach((recipe) => {
    cuisineCount[recipe.cuisine] = (cuisineCount[recipe.cuisine] || 0) + 1;
    dietCount[recipe.diet] = (dietCount[recipe.diet] || 0) + 1;
    
    recipe.tags.forEach(tag => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });

  const getTop = (counts: Record<string, number>, limit: number = 2) => 
    Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(entry => entry[0]);

  const topCuisines = getTop(cuisineCount);
  const topDiets = getTop(dietCount);
  const topTags = getTop(tagCount, 3);

  // Generate a fun persona based on the top attributes
  let persona = 'The Culinary Explorer';
  
  if (topTags.includes('Spicy') || topTags.includes('spicy')) {
    persona = 'The Spice Fiend 🔥';
  } else if (topDiets.includes('Vegan')) {
    persona = 'The Plant-Based Pioneer 🌿';
  } else if (topTags.includes('Sweet') || topTags.includes('Dessert')) {
    persona = 'The Sweet Tooth 🍰';
  } else if (topCuisines.includes('Italian')) {
    persona = 'The Pasta Lover 🍝';
  } else if (topCuisines.includes('Tamil') || topCuisines.includes('South Indian')) {
    persona = 'The South Indian Soul 🍛';
  } else if (topDiets.includes('Non-Veg') && topTags.includes('Chicken')) {
    persona = 'The Protein Master 🍗';
  } else if (favorites.every(r => r.cookingTime < 30)) {
    persona = 'The Speed Chef ⚡';
  }

  return {
    topCuisines,
    topDiets,
    topTags,
    persona
  };
}
