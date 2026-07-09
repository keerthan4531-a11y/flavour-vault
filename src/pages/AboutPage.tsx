// About Page

import { motion } from 'framer-motion';
import { Heart, Code2, Sparkles, ChefHat, Book, Search, Camera, Brain, CheckCircle2 } from 'lucide-react';

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

          {/* Core Features */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 24, fontWeight: 800, textTransform: 'uppercase', marginBottom: 24, color: 'var(--text-primary)' }}>
              Core Features
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
              {[
                { icon: ChefHat, title: 'Recipe Management', desc: 'Add, edit, and organize your recipes with a beautiful interface.' },
                { icon: Brain, title: 'AI Kitchen (INIXA)', desc: 'Generate recipes from ingredients, analyze nutrition, and chat with your AI assistant.' },
                { icon: Camera, title: 'Direct Camera & Gallery', desc: 'Snap photos directly from the app or upload them to your visual recipe gallery.' },
                { icon: Search, title: 'Smart Search & Filters', desc: 'Find recipes instantly by cuisine, diet, time, or specific ingredients.' },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card"
                  style={{ display: 'flex', gap: 16, padding: '20px', cursor: 'default' }}
                >
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(225,6,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <item.icon size={20} color="#e10600" />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 15, textTransform: 'uppercase', marginBottom: 4 }}>{item.title}</h3>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* How to Use Guide */}
          <div>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 24, fontWeight: 800, textTransform: 'uppercase', marginBottom: 24, color: 'var(--text-primary)' }}>
              How to Use Flavour Vault
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { step: '1', title: 'Add a Recipe', text: 'Click the "+" button in the top right to manually add a recipe or capture an image. Fill in the ingredients, steps, and tags.' },
                { step: '2', title: 'Explore AI Kitchen', text: 'Navigate to "AI Kitchen". Type your available ingredients into the generator or use the "Fridge Scanner" mock to build a recipe automatically.' },
                { step: '3', title: 'Chat with INIXA', text: 'Open any recipe and use the floating chat widget on the bottom right to ask for ingredient substitutes or cooking tips.' },
                { step: '4', title: 'Save Favorites', text: 'Click the heart icon on any recipe to add it to your favorites. The AI will learn your taste profile over time!' },
                { step: '5', title: 'Browse Gallery', text: 'Head over to the "Gallery" to view all your recipe photos in a beautiful masonry layout.' }
              ].map((guide, i) => (
                <motion.div
                  key={guide.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}
                >
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#e10600', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontFamily: "'Outfit', sans-serif", flexShrink: 0, marginTop: 2 }}>
                    {guide.step}
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{guide.title}</h3>
                    <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{guide.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
