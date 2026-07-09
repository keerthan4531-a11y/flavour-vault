// IngredientsList component

import { Check, Minus } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Ingredient } from '../../types/recipe';

interface IngredientsListProps {
  ingredients: Ingredient[];
  editable?: boolean;
}

export function IngredientsList({ ingredients, editable = false }: IngredientsListProps) {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggleCheck = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {ingredients.map((ing, i) => {
        const isChecked = checked.has(ing.id);
        return (
          <motion.div
            key={ing.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => toggleCheck(ing.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '10px 14px',
              borderRadius: 10,
              background: isChecked ? 'rgba(74,222,128,0.08)' : 'rgba(255,199,198,0.04)',
              cursor: 'pointer',
              transition: 'all 200ms',
              opacity: isChecked ? 0.6 : 1,
            }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 6,
                border: `2px solid ${isChecked ? '#4ade80' : 'rgba(255,199,198,0.2)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: isChecked ? 'rgba(74,222,128,0.2)' : 'transparent',
                transition: 'all 200ms',
                flexShrink: 0,
              }}
            >
              {isChecked && <Check size={12} color="#4ade80" />}
            </div>
            <div style={{ flex: 1 }}>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  textDecoration: isChecked ? 'line-through' : 'none',
                  color: 'var(--text-primary)',
                }}
              >
                {ing.name}
              </span>
              <span style={{ fontSize: 13, color: 'var(--text-secondary)', marginLeft: 8 }}>
                {ing.quantity} {ing.unit}
              </span>
            </div>
            {ing.isOptional && (
              <span
                style={{
                  fontSize: 10,
                  color: 'var(--text-secondary)',
                  fontStyle: 'italic',
                  opacity: 0.7,
                }}
              >
                optional
              </span>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
