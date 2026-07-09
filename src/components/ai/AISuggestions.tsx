// AI Suggestions — Smart recommendations and recipe improvement tips

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Loader2, Sparkles, RefreshCw } from 'lucide-react';
import { improveRecipe } from '../../services/ai/recipeGenerator';

interface AISuggestionsProps {
  recipeTitle: string;
  ingredients: string[];
  steps: string[];
}

export function AISuggestions({ recipeTitle, ingredients, steps }: AISuggestionsProps) {
  const [tips, setTips] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetTips = async () => {
    setLoading(true);
    const result = await improveRecipe(recipeTitle, ingredients, steps);
    setTips(result);
    setLoading(false);
  };

  if (!tips) {
    return (
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleGetTips}
        disabled={loading}
        style={{
          width: '100%',
          padding: '14px 20px',
          borderRadius: 14,
          background: 'rgba(251,191,36,0.08)',
          border: '1px solid rgba(251,191,36,0.15)',
          color: '#fbbf24',
          fontSize: 13,
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          cursor: loading ? 'wait' : 'pointer',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}
      >
        {loading ? (
          <>
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
              <Loader2 size={14} />
            </motion.div>
            AI is thinking...
          </>
        ) : (
          <>
            <Lightbulb size={14} />
            Get AI Improvement Tips
          </>
        )}
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Sparkles size={14} color="#fbbf24" />
          <span style={{ fontSize: 11, fontFamily: "'Outfit', sans-serif", fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#fbbf24' }}>
            AI Chef Tips
          </span>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => { setTips(null); handleGetTips(); }}
          style={{
            width: 28, height: 28, borderRadius: '50%',
            background: 'rgba(251,191,36,0.1)', color: '#fbbf24',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: 'none', cursor: 'pointer',
          }}
        >
          <RefreshCw size={12} />
        </motion.button>
      </div>

      <div
        style={{
          padding: '14px 16px',
          borderRadius: 12,
          background: 'rgba(251,191,36,0.05)',
          border: '1px solid rgba(251,191,36,0.1)',
          fontSize: 13,
          lineHeight: 1.7,
          color: 'var(--text-primary)',
          whiteSpace: 'pre-wrap',
        }}
      >
        {tips}
      </div>
    </motion.div>
  );
}
