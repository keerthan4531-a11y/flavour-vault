// AI Recipe Generator — with real-time streaming thinking + response

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Wand2, ChefHat, Loader2, Plus, BookOpen, Brain, ChevronDown } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { callAIStream, parseThinkBlocks } from '../../services/ai/aiClient';
import type { ChatMessage } from '../../services/ai/aiClient';
import { useRecipeContext } from '../../context/RecipeContext';
import { useToast } from '../ui/Toast';
import { generateId } from '../../utils/imageHelper';

type TabMode = 'ingredients' | 'surprise' | 'writer';

interface GeneratedRecipe {
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

export function AIRecipeGenerator() {
  const [mode, setMode] = useState<TabMode>('ingredients');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GeneratedRecipe | null>(null);
  const [thinking, setThinking] = useState('');
  const [rawContent, setRawContent] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [showThinkBlock, setShowThinkBlock] = useState(true);

  const thinkScrollRef = useRef<HTMLDivElement>(null);
  const rawScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    thinkScrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [thinking]);

  useEffect(() => {
    rawScrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [rawContent]);
  const { addRecipe } = useRecipeContext();
  const { showToast } = useToast();
  const thinkingRef = useRef('');
  const contentRef = useRef('');

  const handleGenerate = async () => {
    if (mode === 'ingredients' && !input.trim()) return;
    if (mode === 'writer' && !input.trim()) return;

    setLoading(true);
    setResult(null);
    setThinking('');
    setRawContent('');
    setIsThinking(false);
    setShowThinkBlock(true);
    thinkingRef.current = '';
    contentRef.current = '';

    const themes = [
      'a quick 15-minute weeknight dinner', 'a festive Indian dessert', 'a healthy protein-packed lunch',
      'a spicy Indo-Chinese fusion dish', 'a comforting South Indian breakfast', 'a refreshing summer beverage',
      'a crispy party snack', 'a creamy North Indian curry', 'a street food classic', 'a one-pot meal',
    ];

    let userContent = '';
    if (mode === 'ingredients') {
      userContent = `Generate a delicious recipe using these ingredients: ${input}. Be creative and make it a restaurant-quality dish. Add any common pantry items (salt, oil, spices) as needed.`;
    } else if (mode === 'surprise') {
      const theme = themes[Math.floor(Math.random() * themes.length)];
      userContent = `Surprise me with ${theme}! Generate a creative, unique, and delicious recipe. Make it exciting and restaurant-worthy.`;
    } else {
      userContent = `Convert these rough cooking notes into a properly formatted professional recipe:\n\n"${input}"\n\nMake it detailed, well-structured, and professional. Infer any missing ingredients and add proper measurements.`;
    }

    const messages: ChatMessage[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userContent },
    ];

    const res = await callAIStream(
      messages,
      // onThinkChunk
      (chunk) => {
        setIsThinking(true);
        thinkingRef.current += chunk;
        setThinking(thinkingRef.current);
      },
      // onContentChunk
      (chunk) => {
        setIsThinking(false);
        contentRef.current += chunk;
        setRawContent(contentRef.current);
      },
      0.8
    );

    // Parse the final JSON
    if (res.success && contentRef.current) {
      try {
        let jsonStr = contentRef.current;
        const jsonMatch = jsonStr.match(/\{[\s\S]*\}/);
        if (jsonMatch) jsonStr = jsonMatch[0];
        const parsed = JSON.parse(jsonStr) as GeneratedRecipe;
        setResult(parsed);
      } catch {
        showToast('AI generated response but JSON parsing failed. Check the raw output.');
      }
    } else if (!res.success) {
      showToast('Failed to generate recipe. Try again!');
    }

    setLoading(false);
    setIsThinking(false);
  };

  const handleSaveRecipe = async () => {
    if (!result) return;
    const recipe = {
      id: generateId(),
      title: result.title,
      description: result.description,
      ingredients: result.ingredients.map((i) => ({ ...i, id: generateId(), isOptional: false })),
      steps: result.steps.map((s) => ({ ...s, id: generateId() })),
      cookingTime: result.cookingTime,
      prepTime: result.prepTime,
      servings: result.servings,
      category: result.category as any,
      cuisine: result.cuisine as any,
      diet: result.diet as any,
      difficulty: result.difficulty as any,
      tags: result.tags,
      images: [],
      coverImage: '',
      isFavorite: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      calories: result.calories,
      rating: 0,
      viewCount: 0,
    };
    await addRecipe(recipe);
    showToast('AI recipe saved successfully!');
  };

  const tabs: { key: TabMode; label: string; icon: React.ElementType }[] = [
    { key: 'ingredients', label: 'From Ingredients', icon: ChefHat },
    { key: 'surprise', label: 'Surprise Me', icon: Sparkles },
    { key: 'writer', label: 'Auto Writer', icon: BookOpen },
  ];

  return (
    <div>
      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, padding: 4, background: 'var(--bg-secondary)', borderRadius: 14, marginBottom: 24 }}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => { setMode(tab.key); setResult(null); setRawContent(''); setThinking(''); }}
            style={{
              flex: 1, padding: '10px 16px', borderRadius: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              fontSize: 13, fontFamily: "'Outfit', sans-serif",
              fontWeight: mode === tab.key ? 600 : 400,
              color: mode === tab.key ? '#fff' : 'var(--text-secondary)',
              background: mode === tab.key ? 'var(--color-impossible-red)' : 'transparent',
              border: 'none', cursor: 'pointer', transition: 'all 200ms',
            }}
          >
            <tab.icon size={14} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Input area */}
      {mode !== 'surprise' && (
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', fontSize: 12, fontFamily: "'Outfit', sans-serif", fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 8 }}>
            {mode === 'ingredients' ? 'What ingredients do you have?' : 'Write your rough recipe notes'}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'ingredients' ? 'e.g., chicken, tomato, onion, garlic, rice...' : 'e.g., chicken fry panren, marinate panni oil la vidrom...'}
            className="input-field"
            rows={4}
            style={{ resize: 'vertical' }}
          />
        </div>
      )}

      {mode === 'surprise' && (
        <div style={{ textAlign: 'center', padding: '32px 24px', borderRadius: 16, background: 'rgba(225,6,0,0.05)', border: '1px solid rgba(225,6,0,0.1)', marginBottom: 20 }}>
          <Wand2 size={32} color="#e10600" style={{ margin: '0 auto 12px' }} />
          <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
            Click generate and AI will create a random creative recipe for you!
          </p>
        </div>
      )}

      {/* Generate button */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleGenerate}
        disabled={loading}
        className="btn-primary"
        style={{ width: '100%', padding: '14px', fontSize: 14, justifyContent: 'center', opacity: loading ? 0.7 : 1 }}
      >
        {loading ? (
          <>
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
              <Loader2 size={16} />
            </motion.div>
            {isThinking ? 'AI is thinking...' : 'AI is cooking...'}
          </>
        ) : (
          <>
            <Sparkles size={16} />
            {mode === 'surprise' ? 'SURPRISE ME!' : 'GENERATE RECIPE'}
          </>
        )}
      </motion.button>

      {/* Real-time thinking block */}
      <AnimatePresence>
        {(thinking || isThinking) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ marginTop: 16, overflow: 'hidden' }}
          >
            <button
              onClick={() => setShowThinkBlock(!showThinkBlock)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px',
                borderRadius: 8, background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)',
                color: '#a78bfa', fontSize: 11, fontWeight: 600, cursor: 'pointer',
                fontFamily: "'Outfit', sans-serif", letterSpacing: '0.04em', marginBottom: 6, width: '100%',
              }}
            >
              <Brain size={12} />
              {isThinking ? (
                <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 1.2 }}>
                  AI is thinking...
                </motion.span>
              ) : (
                <span>Thought Process</span>
              )}
              <ChevronDown
                size={12}
                style={{ marginLeft: 'auto', transform: showThinkBlock ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 200ms' }}
              />
            </button>
            {showThinkBlock && (
              <div
                style={{
                  maxHeight: 200, overflowY: 'auto', padding: '12px 14px', borderRadius: 12,
                  background: 'rgba(139,92,246,0.05)', border: '1px solid rgba(139,92,246,0.1)',
                  fontSize: 12, lineHeight: 1.6, color: '#a78bfa', fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                  whiteSpace: 'pre-wrap', wordBreak: 'break-word', scrollbarWidth: 'thin',
                }}
              >
                <ReactMarkdown
                  components={{
                    p: ({ node, ...props }) => <p style={{ margin: '0 0 8px 0', padding: 0 }} {...props} />,
                    ul: ({ node, ...props }) => <ul style={{ margin: '0 0 8px 0', paddingLeft: 20 }} {...props} />,
                    ol: ({ node, ...props }) => <ol style={{ margin: '0 0 8px 0', paddingLeft: 20 }} {...props} />,
                    li: ({ node, ...props }) => <li style={{ marginBottom: 4 }} {...props} />,
                    strong: ({ node, ...props }) => <strong style={{ fontWeight: 700 }} {...props} />,
                  }}
                >
                  {thinking}
                </ReactMarkdown>
                {isThinking && (
                  <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.8 }}>▊</motion.span>
                )}
                <div ref={thinkScrollRef} />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Raw streaming content */}
      <AnimatePresence>
        {rawContent && !result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{ marginTop: 16 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
              <Sparkles size={12} color="#e10600" />
              <span style={{ fontSize: 11, fontFamily: "'Outfit', sans-serif", fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#e10600' }}>
                {loading ? 'Streaming Response...' : 'Raw AI Output'}
              </span>
            </div>
            <div
              style={{
                maxHeight: 300, overflowY: 'auto', padding: '14px 16px', borderRadius: 12,
                background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
                fontSize: 12, lineHeight: 1.6, color: 'var(--text-primary)', fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                whiteSpace: 'pre-wrap', wordBreak: 'break-word', scrollbarWidth: 'thin',
              }}
            >
              <ReactMarkdown
                components={{
                  p: ({ node, ...props }) => <p style={{ margin: '0 0 8px 0', padding: 0 }} {...props} />,
                  ul: ({ node, ...props }) => <ul style={{ margin: '0 0 8px 0', paddingLeft: 20 }} {...props} />,
                  ol: ({ node, ...props }) => <ol style={{ margin: '0 0 8px 0', paddingLeft: 20 }} {...props} />,
                  li: ({ node, ...props }) => <li style={{ marginBottom: 4 }} {...props} />,
                  strong: ({ node, ...props }) => <strong style={{ fontWeight: 700 }} {...props} />,
                }}
              >
                {rawContent}
              </ReactMarkdown>
              {loading && (
                <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.8 }}>▊</motion.span>
              )}
              <div ref={rawScrollRef} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Parsed Result */}
      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} style={{ marginTop: 24 }}>
            <div className="glass-card" style={{ padding: 24, borderRadius: 16, cursor: 'default' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div>
                  <span style={{ fontSize: 10, fontFamily: "'Outfit', sans-serif", fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#e10600' }}>
                    AI Generated
                  </span>
                  <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 22, textTransform: 'uppercase', letterSpacing: '-0.01em', marginTop: 4 }}>
                    {result.title}
                  </h3>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <span style={{ padding: '4px 10px', borderRadius: 8, fontSize: 11, fontWeight: 600, background: 'rgba(225,6,0,0.1)', color: '#e10600' }}>{result.category}</span>
                  <span style={{ padding: '4px 10px', borderRadius: 8, fontSize: 11, fontWeight: 600, background: 'rgba(74,222,128,0.1)', color: '#4ade80' }}>{result.diet}</span>
                </div>
              </div>

              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 16 }}>{result.description}</p>

              {/* Meta */}
              <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
                {[
                  { label: 'Cook', value: `${result.cookingTime} min` },
                  { label: 'Prep', value: `${result.prepTime} min` },
                  { label: 'Serves', value: `${result.servings}` },
                  { label: 'Level', value: result.difficulty },
                  ...(result.calories ? [{ label: 'Cal', value: `${result.calories}` }] : []),
                ].map((m) => (
                  <div key={m.label} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: 'var(--text-primary)' }}>{m.value}</div>
                    <div style={{ fontSize: 10, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Ingredients */}
              <h4 style={{ fontSize: 13, fontFamily: "'Outfit', sans-serif", fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-secondary)', marginBottom: 8 }}>
                Ingredients ({result.ingredients.length})
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 16 }}>
                {result.ingredients.map((ing, i) => (
                  <div key={i} style={{ fontSize: 13, color: 'var(--text-primary)', padding: '6px 0', borderBottom: '1px solid var(--border-color)' }}>
                    <span style={{ fontWeight: 500 }}>{ing.name}</span>
                    <span style={{ color: 'var(--text-secondary)', marginLeft: 8 }}>{ing.quantity} {ing.unit}</span>
                  </div>
                ))}
              </div>

              {/* Steps */}
              <h4 style={{ fontSize: 13, fontFamily: "'Outfit', sans-serif", fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-secondary)', marginBottom: 8 }}>
                Steps ({result.steps.length})
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
                {result.steps.map((step) => (
                  <div key={step.stepNumber} style={{ display: 'flex', gap: 10 }}>
                    <span style={{ width: 24, height: 24, borderRadius: '50%', background: '#e10600', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                      {step.stepNumber}
                    </span>
                    <div>
                      <p style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--text-primary)' }}>{step.instruction}</p>
                      {step.tip && <p style={{ fontSize: 11, color: '#fbbf24', marginTop: 4, fontStyle: 'italic' }}>Tip: {step.tip}</p>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 16 }}>
                {result.tags.map((tag) => (
                  <span key={tag} style={{ padding: '3px 8px', borderRadius: 8, fontSize: 10, fontWeight: 500, background: 'rgba(255,199,198,0.08)', color: 'var(--text-secondary)' }}>
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Save button */}
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={handleSaveRecipe} className="btn-primary" style={{ width: '100%', padding: '12px', fontSize: 14, justifyContent: 'center' }}>
                <Plus size={14} /> SAVE TO MY RECIPES
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
