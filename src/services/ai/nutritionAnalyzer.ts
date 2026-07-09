// Nutrition Analyzer — AI-based calorie/macro estimation

import { callAI } from './aiClient';
import type { ChatMessage } from './aiClient';

export interface NutritionData {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  healthScore: number; // 1-10
  healthNotes: string[];
}

export async function analyzeNutrition(
  ingredients: { name: string; quantity: string; unit: string }[],
  servings: number
): Promise<NutritionData | null> {
  const ingredientList = ingredients
    .map((i) => `${i.quantity} ${i.unit} ${i.name}`)
    .join(', ');

  const messages: ChatMessage[] = [
    {
      role: 'system',
      content: `You are a nutrition expert. Estimate nutritional values for a recipe based on ingredients. Return ONLY valid JSON, no extra text.

JSON Schema:
{
  "calories": number (per serving),
  "protein": number (grams per serving),
  "carbs": number (grams per serving),
  "fat": number (grams per serving),
  "fiber": number (grams per serving),
  "sugar": number (grams per serving),
  "sodium": number (mg per serving),
  "healthScore": number (1-10, 10 being healthiest),
  "healthNotes": ["string (2-3 brief health observations)"]
}`,
    },
    {
      role: 'user',
      content: `Estimate nutrition per serving for this recipe (${servings} servings total):\nIngredients: ${ingredientList}`,
    },
  ];

  const res = await callAI(messages, 0.3, 512);
  if (!res.success) return null;

  try {
    let jsonStr = res.content;
    const jsonMatch = jsonStr.match(/\{[\s\S]*\}/);
    if (jsonMatch) jsonStr = jsonMatch[0];
    return JSON.parse(jsonStr) as NutritionData;
  } catch {
    return null;
  }
}
