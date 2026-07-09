// Auto Tagger — AI-based recipe auto-tagging

import { callAI } from './aiClient';
import type { ChatMessage } from './aiClient';

export async function autoTagRecipe(
  title: string,
  ingredients: string[],
  category: string,
  diet: string,
  cookingTime: number
): Promise<string[]> {
  const messages: ChatMessage[] = [
    {
      role: 'system',
      content: `You are a recipe tagging expert. Given recipe details, generate relevant tags. Return ONLY a JSON array of strings, nothing else. Generate 5-8 tags from categories like: flavor profile (spicy, sweet, tangy, mild), speed (quick, slow-cooked), health (healthy, protein-rich, low-carb, keto), occasion (festive, party, comfort, weeknight), texture (crispy, creamy, crunchy), audience (kids-friendly, date-night, family). Keep tags lowercase.`,
    },
    {
      role: 'user',
      content: `Recipe: ${title}\nCategory: ${category}\nDiet: ${diet}\nCooking Time: ${cookingTime} min\nIngredients: ${ingredients.join(', ')}`,
    },
  ];

  const res = await callAI(messages, 0.5, 256);
  if (!res.success) return [];

  try {
    let jsonStr = res.content;
    const arrMatch = jsonStr.match(/\[[\s\S]*\]/);
    if (arrMatch) jsonStr = arrMatch[0];
    const tags = JSON.parse(jsonStr);
    return Array.isArray(tags) ? tags.filter((t: any) => typeof t === 'string') : [];
  } catch {
    return [];
  }
}
