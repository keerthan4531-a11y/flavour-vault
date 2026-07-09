// HowItWorks — Step-by-step guide section

import { motion } from 'framer-motion';
import { PlusCircle, Image, UtensilsCrossed, ArrowRight } from 'lucide-react';
import { HOW_IT_WORKS } from '../../utils/constants';

const ICONS: Record<string, React.ElementType> = {
  'plus-circle': PlusCircle,
  'image': Image,
  'utensils-crossed': UtensilsCrossed,
};

export function HowItWorks() {
  return (
    <section
      style={{
        padding: '100px 24px',
        background: 'var(--bg-secondary)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <span
            style={{
              fontSize: 12,
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#e10600',
              display: 'block',
              marginBottom: 12,
            }}
          >
            Simple & Powerful
          </span>
          <h2
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(36px, 6vw, 64px)',
              lineHeight: 0.9,
              textTransform: 'uppercase',
            }}
          >
            HOW IT <span style={{ color: '#e10600' }}>WORKS</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 32,
            position: 'relative',
          }}
        >
          {HOW_IT_WORKS.map((step, i) => {
            const Icon = ICONS[step.icon] || PlusCircle;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                style={{
                  textAlign: 'center',
                  position: 'relative',
                }}
              >
                {/* Step number */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: 'rgba(225,6,0,0.1)',
                    border: '2px solid rgba(225,6,0,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    position: 'relative',
                  }}
                >
                  <Icon size={28} color="#e10600" />
                  <div
                    style={{
                      position: 'absolute',
                      top: -4,
                      right: -4,
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      background: '#e10600',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 700,
                      fontSize: 12,
                    }}
                  >
                    {step.step}
                  </div>
                </motion.div>

                <h3
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 700,
                    fontSize: 18,
                    textTransform: 'uppercase',
                    letterSpacing: '0.02em',
                    marginBottom: 8,
                    color: 'var(--text-primary)',
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: 'var(--text-secondary)',
                    maxWidth: 280,
                    margin: '0 auto',
                  }}
                >
                  {step.description}
                </p>

                {/* Arrow connector (not on last item) */}
                {i < HOW_IT_WORKS.length - 1 && (
                  <div
                    className="hidden lg:block"
                    style={{
                      position: 'absolute',
                      top: 40,
                      right: -16,
                      color: 'rgba(225,6,0,0.3)',
                    }}
                  >
                    <ArrowRight size={32} />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
