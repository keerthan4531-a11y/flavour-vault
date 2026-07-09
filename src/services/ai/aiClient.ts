// AI Client — Qwen API via g4f workers
// Real-time streaming with thinking display

const API_URL = 'https://qwen.g4f-dev.workers.dev/v1/chat/completions';
const MODEL = 'qwen3.7-plus';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AIResponse {
  success: boolean;
  content: string;
  thinking?: string;
  error?: string;
}

// Standard (non-streaming) call
export async function callAI(
  messages: ChatMessage[],
  temperature: number = 0.7,
  maxTokens: number = 2048
): Promise<AIResponse> {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MODEL,
        messages,
        temperature,
        max_tokens: maxTokens,
      }),
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    const message = data.choices?.[0]?.message;
    const rawContent = message?.content || '';
    
    // Qwen returns reasoning in reasoning_content field
    const thinking = message?.reasoning_content || message?.reasoning || '';

    // If it still happens to return <think> tags in content, strip them
    const { thinking: fallbackThinking, content } = parseThinkBlocks(rawContent);

    return { success: true, content, thinking: thinking || fallbackThinking };
  } catch (err: any) {
    console.error('[AI Client] Error:', err);
    return { success: false, content: '', error: err.message || 'Unknown error' };
  }
}

// Parse <think>...</think> blocks from response
export function parseThinkBlocks(raw: string): { thinking: string; content: string } {
  const thinkMatch = raw.match(/<think>([\s\S]*?)<\/think>/);
  const thinking = thinkMatch ? thinkMatch[1].trim() : '';
  const content = raw.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
  return { thinking, content };
}

// Streaming call — fires callbacks for both thinking and content in real-time
export async function callAIStream(
  messages: ChatMessage[],
  onThinkChunk: (text: string) => void,
  onContentChunk: (text: string) => void,
  temperature: number = 0.7
): Promise<AIResponse> {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MODEL,
        messages,
        temperature,
        max_tokens: 2048,
        stream: true,
      }),
    });

    if (!res.ok) throw new Error(`API error: ${res.status}`);

    const reader = res.body?.getReader();
    if (!reader) throw new Error('No readable stream');

    const decoder = new TextDecoder();
    let fullThinking = '';
    let fullContent = '';
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      // Process complete lines from buffer
      const lines = buffer.split('\n');
      buffer = lines.pop() || ''; // Keep incomplete last line in buffer

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith('data: ')) continue;
        const jsonStr = trimmed.slice(6).trim();
        if (jsonStr === '[DONE]') continue;

        try {
          const parsed = JSON.parse(jsonStr);
          const delta = parsed.choices?.[0]?.delta;
          
          if (!delta) continue;

          // Check for reasoning chunk
          const reasoningChunk = delta.reasoning_content || delta.reasoning;
          if (reasoningChunk) {
            fullThinking += reasoningChunk;
            onThinkChunk(reasoningChunk);
          }

          // Check for standard content chunk
          const contentChunk = delta.content;
          if (contentChunk) {
            fullContent += contentChunk;
            onContentChunk(contentChunk);
          }
        } catch {}
      }
    }

    return { success: true, content: fullContent, thinking: fullThinking };
  } catch (err: any) {
    console.error('[AI Stream] Error:', err);
    return { success: false, content: '', error: err.message };
  }
}
