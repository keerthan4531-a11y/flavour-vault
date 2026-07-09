// FeatureCards — Feature showcase section

import { motion } from 'framer-motion';
import { BookOpen, Camera, Search, Heart } from 'lucide-react';
import { FEATURES } from '../../utils/constants';

const ICONS: Record<string, React.ElementType> = {
  'book-open': BookOpen,
  'camera': Camera,
  'search': Search,
  'heart': Heart,
};

export function FeatureCards() {
  return (
    <section style={{ padding: '100px 24px', position: 'relative', overflow: 'hidden' }}>
      {/* Background accent */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80vw',
          height: '80vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(225,6,0,0.04) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Section header */}
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
            ◂ WHY FLAVOUR VAULT ▸
          </span>
          <h2
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(36px, 6vw, 64px)',
              lineHeight: 0.9,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
            }}
          >
            <span style={{ color: 'var(--text-primary)' }}>EVERYTHING </span>
            <span style={{ color: '#e10600' }}>YOU NEED</span>
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 20,
          }}
        >
          {FEATURES.map((feature, i) => {
            const Icon = ICONS[feature.icon] || BookOpen;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                whileHover={{ y: -8, boxShadow: '0 20px 60px rgba(225,6,0,0.15)' }}
                style={{
                  padding: 32,
                  borderRadius: 20,
                  background: 'var(--glass-bg)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid var(--glass-border)',
                  transition: 'all 300ms',
                  cursor: 'default',
                }}
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 16,
                    background: 'rgba(225,6,0,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 20,
                  }}
                >
                  <Icon size={24} color="#e10600" />
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
                  {feature.title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: 'var(--text-secondary)',
                  }}
                >
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
