// Smart Recipe Generator — Generate recipes from ingredients

import { callAI } from './aiClient';
import type { ChatMessage } from './aiClient';

export interface GeneratedRecipe {
  title: string;
  description: string;
  ingredients: { name: string; quantity: string; unit: string }[];
  steps: { stepNumber: number; instruction: string; duration?: number; tip?: string }[];
  cookingTime: number;
  prepTime: number;
  servings: number;
  category: string;
  cuisine: string;
  diet: string;
  difficulty: string;
  calories?: number;
  tags: string[];
}

const SYSTEM_PROMPT = `You are a world-class chef and recipe expert. When given a list of ingredients, generate a complete, detailed recipe in JSON format.

IMPORTANT: Your response must be ONLY valid JSON, no extra text, no markdown code blocks. Just pure JSON.

JSON Schema:
{
  "title": "string (recipe name in UPPERCASE)",
  "description": "string (2-3 sentence appetizing description)",
  "ingredients": [{"name": "string", "quantity": "string", "unit": "string"}],
  "steps": [{"stepNumber": number, "instruction": "string (detailed step)", "duration": number_or_null, "tip": "string_or_empty"}],
  "cookingTime": number (total minutes),
  "prepTime": number (minutes),
  "servings": number,
  "category": "Breakfast|Lunch|Dinner|Dessert|Snacks|Appetizer|Beverage",
  "cuisine": "Tamil|North Indian|Chinese|Continental|Italian|Mexican|Japanese|Korean|Thai|Other",
  "diet": "Veg|Non-Veg|Vegan",
  "difficulty": "Easy|Medium|Hard",
  "calories": number_or_null,
  "tags": ["string"]
}`;

export async function generateRecipeFromIngredients(ingredients: string): Promise<GeneratedRecipe | null> {
  const messages: ChatMessage[] = [
    { role: 'system', content: SYSTEM_PROMPT },
    { role: 'user', content: `Generate a delicious recipe using these ingredients: ${ingredients}. Be creative and make it a restaurant-quality dish. Add any common pantry items (salt, oil, spices) as needed.` },
  ];

  const res = await callAI(messages, 0.8, 2048);
  if (!res.success) return null;

  try {
    // Try to extract JSON from the response
    let jsonStr = res.content;
    const jsonMatch = jsonStr.match(/\{[\s\S]*\}/);
    if (jsonMatch) jsonStr = jsonMatch[0];
    return JSON.parse(jsonStr) as GeneratedRecipe;
  } catch (err) {
    console.error('[RecipeGenerator] Failed to parse JSON:', err);
    return null;
  }
}

export async function generateSurpriseRecipe(): Promise<GeneratedRecipe | null> {
  const themes = [
    'a quick 15-minute weeknight dinner', 'a festive Indian dessert', 'a healthy protein-packed lunch',
    'a spicy Indo-Chinese fusion dish', 'a comforting South Indian breakfast', 'a refreshing summer beverage',
    'a crispy party snack', 'a creamy North Indian curry', 'a street food classic', 'a one-pot meal',
  ];
  const theme = themes[Math.floor(Math.random() * themes.length)];

  const messages: ChatMessage[] = [
    { role: 'system', content: SYSTEM_PROMPT },
    { role: 'user', content: `Surprise me with ${theme}! Generate a creative, unique, and delicious recipe. Make it exciting and restaurant-worthy.` },
  ];

  const res = await callAI(messages, 0.9, 2048);
  if (!res.success) return null;

  try {
    let jsonStr = res.content;
    const jsonMatch = jsonStr.match(/\{[\s\S]*\}/);
    if (jsonMatch) jsonStr = jsonMatch[0];
    return JSON.parse(jsonStr) as GeneratedRecipe;
  } catch (err) {
    console.error('[SurpriseRecipe] Failed to parse JSON:', err);
    return null;
  }
}

export async function improveRecipe(recipeTitle: string, ingredients: string[], steps: string[]): Promise<string | null> {
  const messages: ChatMessage[] = [
    {
      role: 'system',
      content: 'You are a professional chef giving improvement tips. Be concise. Give 3-5 specific, actionable tips to make the recipe better. Format as bullet points.',
    },
    {
      role: 'user',
      content: `Improve this recipe:\nTitle: ${recipeTitle}\nIngredients: ${ingredients.join(', ')}\nSteps: ${steps.join('. ')}\n\nGive specific tips to enhance flavor, texture, and presentation.`,
    },
  ];

  const res = await callAI(messages, 0.7, 1024);
  return res.success ? res.content : null;
}

export async function autoWriteRecipe(roughNotes: string): Promise<GeneratedRecipe | null> {
  const messages: ChatMessage[] = [
    { role: 'system', content: SYSTEM_PROMPT },
    {
      role: 'user',
      content: `Convert these rough cooking notes into a properly formatted professional recipe:\n\n"${roughNotes}"\n\nMake it detailed, well-structured, and professional. Infer any missing ingredients and add proper measurements.`,
    },
  ];

  const res = await callAI(messages, 0.7, 2048);
  if (!res.success) return null;

  try {
    let jsonStr = res.content;
    const jsonMatch = jsonStr.match(/\{[\s\S]*\}/);
    if (jsonMatch) jsonStr = jsonMatch[0];
    return JSON.parse(jsonStr) as GeneratedRecipe;
  } catch {
    return null;
  }
}
