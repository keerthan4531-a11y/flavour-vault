// AI Cooking Assistant Chat — with real-time thinking + response streaming

import { callAIStream } from './aiClient';
import type { ChatMessage } from './aiClient';

const SYSTEM_PROMPT = `You are INIXA, a friendly and expert AI cooking assistant built into the Flavour Vault recipe app. You speak in a warm, helpful tone.

Your capabilities:
- Answer cooking questions (substitutions, techniques, timing)
- Suggest recipes based on what user has
- Give spiciness/flavor adjustments
- Explain cooking terms
- Help with meal planning
- Give dietary advice related to recipes

Rules:
- Keep responses concise (2-4 short paragraphs max)
- Use bullet points for lists
- Be enthusiastic about food!
- If asked about non-food topics, politely redirect to cooking
- Include practical tips when relevant`;

export interface ChatSession {
  messages: ChatMessage[];
}

export function createChatSession(recipeContext?: string): ChatSession {
  const messages: ChatMessage[] = [{ role: 'system', content: SYSTEM_PROMPT }];

  if (recipeContext) {
    messages.push({
      role: 'system',
      content: `The user is currently viewing this recipe:\n${recipeContext}\n\nHelp them with questions about this recipe.`,
    });
  }

  return { messages };
}

export async function sendChatMessage(
  session: ChatSession,
  userMessage: string,
  onThinkChunk: (text: string) => void,
  onContentChunk: (text: string) => void
): Promise<{ content: string; thinking: string }> {
  session.messages.push({ role: 'user', content: userMessage });

  const res = await callAIStream(session.messages, onThinkChunk, onContentChunk, 0.7);

  if (res.success) {
    session.messages.push({ role: 'assistant', content: res.content });
    return { content: res.content, thinking: res.thinking || '' };
  }

  const errMsg = 'Sorry, I had trouble processing that. Please try again!';
  session.messages.push({ role: 'assistant', content: errMsg });
  return { content: errMsg, thinking: '' };
}
