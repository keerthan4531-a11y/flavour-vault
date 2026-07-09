// About Page

import { motion } from 'framer-motion';
import { Heart, Code2, Sparkles, ChefHat } from 'lucide-react';

export function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ minHeight: '100vh' }}
    >
      <section style={{ padding: '60px 24px 80px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'center', marginBottom: 48 }}
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 5 }}
              style={{ width: 100, height: 100, borderRadius: '50%', overflow: 'hidden', marginBottom: 20, margin: '0 auto 20px', border: '3px solid rgba(225,6,0,0.3)' }}
            >
              <img src="/images/hero-food.png" alt="Food" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </motion.div>
            <h1
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(36px, 6vw, 56px)',
                lineHeight: 0.9,
                textTransform: 'uppercase',
                marginBottom: 16,
              }}
            >
              ABOUT <span style={{ color: '#e10600' }}>FLAVOUR VAULT</span>
            </h1>
            <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              A premium recipe collection app designed to make your culinary journey beautiful and organized.
            </p>
          </motion.div>

          {/* Features */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              { icon: ChefHat, title: 'Built for Food Lovers', desc: 'Every feature is crafted with the home cook in mind — from ingredient checklists to step-by-step mode.' },
              { icon: Sparkles, title: 'Premium Design', desc: 'Inspired by the boldest brands in food tech. Dark wine canvas, blood-red accents, and massive typography.' },
              { icon: Code2, title: 'Modern Tech Stack', desc: 'Built with React, TypeScript, Tailwind CSS v4, Framer Motion, and IndexedDB for offline-first storage.' },
              { icon: Heart, title: 'Made with Love', desc: 'This app is a passion project. All your recipes stay safely on your device — no servers, no tracking.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card"
                style={{
                  display: 'flex',
                  gap: 16,
                  padding: '24px',
                  cursor: 'default',
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: 'rgba(225,6,0,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <item.icon size={20} color="#e10600" />
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 700,
                      fontSize: 16,
                      textTransform: 'uppercase',
                      letterSpacing: '0.02em',
                      marginBottom: 4,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
