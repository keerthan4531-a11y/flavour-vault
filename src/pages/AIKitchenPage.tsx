// AI Kitchen Page — Hub for all AI features

import { motion } from 'framer-motion';
import { Sparkles, Brain, ChefHat, Activity, Lightbulb, Wand2 } from 'lucide-react';
import { AIRecipeGenerator } from '../components/ai/AIRecipeGenerator';
import { TasteProfilePanel } from '../components/ai/TasteProfilePanel';
import { FridgeScannerMock } from '../components/ai/FridgeScannerMock';

export function AIKitchenPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ minHeight: '100vh' }}
    >
      <section style={{ padding: '40px 24px 80px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Header */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Brain size={16} color="#e10600" />
              <span
                style={{
                  fontSize: 12,
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#e10600',
                }}
              >
                Powered by AI
              </span>
            </div>
            <h1
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(36px, 6vw, 56px)',
                lineHeight: 0.9,
                textTransform: 'uppercase',
              }}
            >
              AI <span style={{ color: '#e10600' }}>KITCHEN</span>
            </h1>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 12, maxWidth: 500 }}>
              Let AI help you create, discover, and perfect your recipes. Just tell it what you have and watch the magic happen.
            </p>
          </div>

          {/* Feature highlights */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: 12,
              marginBottom: 40,
            }}
          >
            {[
              { icon: ChefHat, label: 'Generate from Ingredients', desc: 'Tell AI what you have' },
              { icon: Wand2, label: 'Surprise Recipe', desc: 'Random creative dish' },
              { icon: Lightbulb, label: 'Auto Writer', desc: 'Notes to recipe' },
              { icon: Activity, label: 'Nutrition Analysis', desc: 'On recipe detail page' },
            ].map((feat, i) => (
              <motion.div
                key={feat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{
                  padding: '16px',
                  borderRadius: 14,
                  background: 'rgba(225,6,0,0.04)',
                  border: '1px solid rgba(225,6,0,0.08)',
                  cursor: 'default',
                }}
              >
                <feat.icon size={18} color="#e10600" style={{ marginBottom: 8 }} />
                <h4 style={{ fontSize: 12, fontFamily: "'Outfit', sans-serif", fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>
                  {feat.label}
                </h4>
                <p style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{feat.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Taste Profile & Scanner Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 40 }}>
            <TasteProfilePanel />
            <FridgeScannerMock />
          </div>

          {/* AI Generator */}
          <div
            className="glass-card"
            style={{ padding: 28, borderRadius: 20, cursor: 'default' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <Sparkles size={18} color="#e10600" />
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 18, textTransform: 'uppercase' }}>
                AI Recipe <span style={{ color: '#e10600' }}>Generator</span>
              </h2>
            </div>
            <AIRecipeGenerator />
          </div>
        </div>
      </section>
    </motion.div>
  );
}
