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

        {/* Bento Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {FEATURES.map((feature, i) => {
            const Icon = ICONS[feature.icon] || BookOpen;
            const isLarge = i === 0 || i === 3;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover="hover"
                variants={{
                  hover: {
                    y: -8,
                    boxShadow: '0 20px 45px rgba(225,6,0,0.18)',
                    borderColor: 'rgba(225,6,0,0.3)',
                    backgroundColor: 'rgba(79,4,35,0.7)',
                  }
                }}
                className={`col-span-1 ${isLarge ? 'md:col-span-2' : 'md:col-span-1'} relative overflow-hidden`}
                style={{
                  padding: isLarge ? '40px 36px' : '32px 28px',
                  borderRadius: 24,
                  background: 'var(--glass-bg)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid var(--glass-border)',
                  transition: 'background-color 300ms, border-color 300ms, box-shadow 300ms',
                  cursor: 'default',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: isLarge ? 240 : 260,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: isLarge ? 'row' : 'column',
                    alignItems: isLarge ? 'center' : 'flex-start',
                    gap: isLarge ? 28 : 20,
                    height: '100%',
                  }}
                >
                  {/* Icon */}
                  <motion.div
                    variants={{
                      hover: { rotate: 10, scale: 1.15 }
                    }}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 18,
                      background: 'rgba(225,6,0,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      border: '1px solid rgba(225,6,0,0.15)',
                    }}
                  >
                    <Icon size={26} color="#e10600" />
                  </motion.div>

                  <div>
                    <h3
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 800,
                        fontSize: isLarge ? 20 : 18,
                        textTransform: 'uppercase',
                        letterSpacing: '0.03em',
                        marginBottom: 8,
                        color: 'var(--text-primary)',
                      }}
                    >
                      {feature.title}
                    </h3>
                    <p
                      style={{
                        fontSize: isLarge ? 15 : 14,
                        lineHeight: 1.6,
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Ambient glow in hover */}
                <motion.div
                  variants={{
                    hover: { scale: 1.4, opacity: 0.8 }
                  }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  style={{
                    position: 'absolute',
                    bottom: '-25%',
                    right: '-15%',
                    width: 140,
                    height: 140,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(225,6,0,0.15) 0%, transparent 70%)',
                    filter: 'blur(30px)',
                    pointerEvents: 'none',
                    opacity: 0,
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
