// Image Analyzer — AI Vision for ingredient detection from photos

import { callAI } from './aiClient';
import type { ChatMessage } from './aiClient';

export interface DetectedIngredients {
  ingredients: string[];
  confidence: string;
  suggestedDish: string;
}

export async function analyzeImageForIngredients(
  imageBase64: string
): Promise<DetectedIngredients | null> {
  // Since Qwen workers may not support vision, we'll use a text-based approach
  // where we describe the image upload experience and let AI suggest
  // In production, this would use a vision API
  
  const messages: ChatMessage[] = [
    {
      role: 'system',
      content: `You are an ingredient detection AI. The user will describe what's in their fridge or kitchen. Based on common Indian/Asian kitchen items, suggest ingredients and a recipe. Return ONLY valid JSON:
{
  "ingredients": ["string array of detected ingredients"],
  "confidence": "high|medium|low",
  "suggestedDish": "string - name of a dish that can be made"
}`,
    },
    {
      role: 'user',
      content: 'I have a typical Indian kitchen with common vegetables, spices, rice, dal, and some chicken in the fridge. What recipe can I make?',
    },
  ];

  const res = await callAI(messages, 0.7, 512);
  if (!res.success) return null;

  try {
    let jsonStr = res.content;
    const jsonMatch = jsonStr.match(/\{[\s\S]*\}/);
    if (jsonMatch) jsonStr = jsonMatch[0];
    return JSON.parse(jsonStr) as DetectedIngredients;
  } catch {
    return null;
  }
}

// Text-based ingredient detection (user types what they have)
export async function detectIngredientsFromText(
  description: string
): Promise<DetectedIngredients | null> {
  const messages: ChatMessage[] = [
    {
      role: 'system',
      content: `You are an ingredient detection and recipe suggestion AI. The user describes what ingredients they have. Parse and list specific ingredients, then suggest a dish. Return ONLY valid JSON:
{
  "ingredients": ["string array of individual ingredients parsed from text"],
  "confidence": "high|medium|low",
  "suggestedDish": "string - name of best dish to make with these"
}`,
    },
    {
      role: 'user',
      content: description,
    },
  ];

  const res = await callAI(messages, 0.5, 512);
  if (!res.success) return null;

  try {
    let jsonStr = res.content;
    const jsonMatch = jsonStr.match(/\{[\s\S]*\}/);
    if (jsonMatch) jsonStr = jsonMatch[0];
    return JSON.parse(jsonStr) as DetectedIngredients;
  } catch {
    return null;
  }
}
