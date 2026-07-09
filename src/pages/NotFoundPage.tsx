// 404 Page

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export function NotFoundPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '80px 24px',
      }}
    >
      <motion.div
        animate={{ rotate: [0, 3, -3, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
        style={{ width: 120, height: 120, borderRadius: '50%', overflow: 'hidden', marginBottom: 24, border: '3px solid rgba(225,6,0,0.3)' }}
      >
        <img src="/images/hero-food.png" alt="Food" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </motion.div>

      <h1
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(48px, 8vw, 120px)',
          lineHeight: 0.85,
          textTransform: 'uppercase',
          marginBottom: 16,
          color: '#e10600',
        }}
      >
        404
      </h1>
      <h2
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 700,
          fontSize: 24,
          textTransform: 'uppercase',
          marginBottom: 12,
        }}
      >
        PAGE NOT FOUND
      </h2>
      <p style={{ fontSize: 14, color: 'var(--text-secondary)', maxWidth: 400, marginBottom: 32 }}>
        Looks like this recipe got lost in the kitchen. Let's get you back on track.
      </p>

      <div style={{ display: 'flex', gap: 12 }}>
        <Link to="/">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="btn-primary">
            <Home size={14} /> Go Home
          </motion.button>
        </Link>
        <Link to="/recipes">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="btn-ghost">
            <ArrowLeft size={14} /> Browse Recipes
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}
