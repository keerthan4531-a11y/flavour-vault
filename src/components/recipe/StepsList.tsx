// StepsList component — cooking steps with optional timer

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Lightbulb, ChevronRight } from 'lucide-react';
import type { CookingStep } from '../../types/recipe';

interface StepsListProps {
  steps: CookingStep[];
}

export function StepsList({ steps }: StepsListProps) {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {steps.map((step, i) => {
        const isActive = activeStep === step.stepNumber;
        return (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            onClick={() => setActiveStep(isActive ? null : step.stepNumber)}
            style={{
              display: 'flex',
              gap: 16,
              padding: '16px 18px',
              borderRadius: 12,
              background: isActive ? 'rgba(225,6,0,0.06)' : 'rgba(255,199,198,0.03)',
              border: `1px solid ${isActive ? 'rgba(225,6,0,0.2)' : 'transparent'}`,
              cursor: 'pointer',
              transition: 'all 200ms',
            }}
          >
            {/* Step number */}
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: isActive ? 'var(--color-impossible-red)' : 'var(--bg-secondary)',
                color: isActive ? '#fff' : 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                fontSize: 14,
                flexShrink: 0,
                transition: 'all 200ms',
              }}
            >
              {step.stepNumber}
            </div>

            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text-primary)' }}>
                {step.instruction}
              </p>

              {/* Duration */}
              {step.duration && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    marginTop: 8,
                    fontSize: 12,
                    color: 'var(--color-impossible-red)',
                    fontWeight: 500,
                  }}
                >
                  <Clock size={12} />
                  {step.duration} min
                </div>
              )}

              {/* Tip */}
              {step.tip && isActive && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 8,
                    marginTop: 10,
                    padding: '10px 12px',
                    borderRadius: 8,
                    background: 'rgba(251,191,36,0.08)',
                    fontSize: 12,
                    color: '#fbbf24',
                    lineHeight: 1.5,
                  }}
                >
                  <Lightbulb size={14} style={{ flexShrink: 0, marginTop: 1 }} />
                  {step.tip}
                </motion.div>
              )}
            </div>

            <ChevronRight
              size={16}
              style={{
                color: 'var(--text-secondary)',
                opacity: 0.3,
                transition: 'transform 200ms',
                transform: isActive ? 'rotate(90deg)' : 'rotate(0deg)',
                flexShrink: 0,
                marginTop: 2,
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
