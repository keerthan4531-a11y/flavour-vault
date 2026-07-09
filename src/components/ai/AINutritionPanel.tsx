// AI Nutrition Panel — Shows AI-estimated nutrition for a recipe

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Loader2, Sparkles, Heart, Flame, Wheat, Droplets } from 'lucide-react';
import { analyzeNutrition } from '../../services/ai/nutritionAnalyzer';
import type { NutritionData } from '../../services/ai/nutritionAnalyzer';

interface AINutritionPanelProps {
  ingredients: { name: string; quantity: string; unit: string }[];
  servings: number;
}

export function AINutritionPanel({ ingredients, servings }: AINutritionPanelProps) {
  const [data, setData] = useState<NutritionData | null>(null);
  const [loading, setLoading] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    const result = await analyzeNutrition(ingredients, servings);
    setData(result);
    setAnalyzed(true);
    setLoading(false);
  };

  if (!analyzed) {
    return (
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleAnalyze}
        disabled={loading}
        style={{
          width: '100%',
          padding: '14px 20px',
          borderRadius: 14,
          background: 'rgba(225,6,0,0.08)',
          border: '1px solid rgba(225,6,0,0.15)',
          color: '#e10600',
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
            Analyzing...
          </>
        ) : (
          <>
            <Activity size={14} />
            Analyze Nutrition with AI
          </>
        )}
      </motion.button>
    );
  }

  if (!data) {
    return (
      <div style={{ padding: 16, textAlign: 'center', color: 'var(--text-secondary)', fontSize: 13 }}>
        Could not analyze nutrition. Try again later.
      </div>
    );
  }

  const macros = [
    { label: 'Calories', value: `${data.calories}`, unit: 'kcal', icon: Flame, color: '#e10600' },
    { label: 'Protein', value: `${data.protein}`, unit: 'g', icon: Heart, color: '#f472b6' },
    { label: 'Carbs', value: `${data.carbs}`, unit: 'g', icon: Wheat, color: '#fbbf24' },
    { label: 'Fat', value: `${data.fat}`, unit: 'g', icon: Droplets, color: '#60a5fa' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
        <Sparkles size={14} color="#e10600" />
        <span style={{ fontSize: 11, fontFamily: "'Outfit', sans-serif", fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#e10600' }}>
          AI Nutrition Estimate (per serving)
        </span>
      </div>

      {/* Macro cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 16 }}>
        {macros.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            style={{
              padding: '12px 8px',
              borderRadius: 12,
              background: `${m.color}10`,
              border: `1px solid ${m.color}20`,
              textAlign: 'center',
            }}
          >
            <m.icon size={16} color={m.color} style={{ margin: '0 auto 4px' }} />
            <div style={{ fontSize: 18, fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: m.color }}>
              {m.value}
            </div>
            <div style={{ fontSize: 9, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {m.label} ({m.unit})
            </div>
          </motion.div>
        ))}
      </div>

      {/* Health score */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Health Score</span>
          <span style={{ fontSize: 12, fontWeight: 600, color: data.healthScore >= 7 ? '#4ade80' : data.healthScore >= 4 ? '#fbbf24' : '#e10600' }}>
            {data.healthScore}/10
          </span>
        </div>
        <div style={{ height: 6, borderRadius: 3, background: 'var(--bg-secondary)', overflow: 'hidden' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${data.healthScore * 10}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
              height: '100%',
              borderRadius: 3,
              background: data.healthScore >= 7 ? '#4ade80' : data.healthScore >= 4 ? '#fbbf24' : '#e10600',
            }}
          />
        </div>
      </div>

      {/* Health notes */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {data.healthNotes.map((note, i) => (
          <div key={i} style={{ fontSize: 12, color: 'var(--text-secondary)', padding: '4px 0', lineHeight: 1.4 }}>
            • {note}
          </div>
        ))}
      </div>

      {/* Extra macros */}
      <div style={{ display: 'flex', gap: 16, marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border-color)' }}>
        <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Fiber: <strong>{data.fiber}g</strong></span>
        <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Sugar: <strong>{data.sugar}g</strong></span>
        <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Sodium: <strong>{data.sodium}mg</strong></span>
      </div>
    </motion.div>
  );
}
