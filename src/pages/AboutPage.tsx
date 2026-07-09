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
              How to Use Flavour Vault (Step-by-Step)
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {[
                { 
                  step: '1', 
                  title: 'Adding a New Recipe manually or via Camera 📸', 
                  text: 'Click the "+" button or go to "Add Recipe". You can manually type your ingredients and steps, or use the "Take Photo" button to directly capture a photo of your dish using your device camera. Our app will automatically format and save your recipe.' 
                },
                { 
                  step: '2', 
                  title: 'Using the AI Fridge Scanner 🥒', 
                  text: 'Don\'t know what to cook? Go to the "AI Kitchen" tab and find the Fridge Scanner. Click "Open Camera" to take a photo of your fridge or ingredients. Our AI will scan the image, detect the ingredients, and automatically generate a custom recipe for you!' 
                },
                { 
                  step: '3', 
                  title: 'AI Recipe Generator & Auto Writer ✍️', 
                  text: 'In the AI Kitchen, you can also manually type a few ingredients you have (e.g., "Chicken, Onion, Tomato") and hit Generate. The AI will stream a professional, formatted recipe in real-time, complete with cooking times and step-by-step instructions. You can even type rough cooking notes and the "Auto Writer" will format it beautifully.' 
                },
                { 
                  step: '4', 
                  title: 'Building your Personal AI Taste Profile 📊', 
                  text: 'As you browse recipes, click the Heart icon to add them to your Favorites. The AI analyzes your favorite dishes to build a "Taste Profile" (e.g., "The Spice Fiend" or "The Vegan Explorer"). Once your profile is built, the "Surprise Me" button will generate recipes tailored exactly to your taste preferences!' 
                },
                { 
                  step: '5', 
                  title: 'Chatting with INIXA (AI Assistant) 💬', 
                  text: 'Need a substitute for an ingredient? Want to know how to make a dish less spicy? Open any recipe and click the floating AI chat icon at the bottom right. INIXA, your personal AI sous-chef, will answer your questions instantly.' 
                },
                { 
                  step: '6', 
                  title: 'Nutrition Analysis & Cloud Sync 🥗☁️', 
                  text: 'Every generated recipe includes AI-estimated nutrition facts (Calories, Protein, etc.). Plus, your recipes are safely stored. Watch the top-right corner of the navigation bar to see the "Syncing..." status, ensuring your data is always backed up and ready to go.' 
                }
              ].map((guide, i) => (
                <motion.div
                  key={guide.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  style={{ display: 'flex', gap: 16, alignItems: 'flex-start', background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#e10600', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontFamily: "'Outfit', sans-serif", fontSize: 18, flexShrink: 0 }}>
                    {guide.step}
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 8, color: 'var(--text-primary)' }}>{guide.title}</h3>
                    <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{guide.text}</p>
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
