// Hero Section — Full-screen hero with massive display type

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Search, ChevronDown, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';

export function Hero() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Transform values for scroll-driven animations
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const videoRadius = useTransform(scrollYProgress, [0, 1], ['0px', '40px']);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.25]);

  // Parallax translation for the text content
  const textY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Scroll indicator fade out
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '80px 24px 60px',
      }}
    >
      {/* Animated background elements */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {/* Hero food background video */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            scale: videoScale,
            borderRadius: videoRadius,
            opacity: videoOpacity,
          }}
        >
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
            }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            >
              <source src="/hero-video.mp4" type="video/mp4" />
            </video>
            {/* Dark overlay for text contrast (removes red tint while keeping text readable) */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.65))',
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          maxWidth: 900,
          y: textY,
          opacity: textOpacity,
        }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 16px',
            borderRadius: 20,
            background: 'rgba(225,6,0,0.1)',
            border: '1px solid rgba(225,6,0,0.15)',
            marginBottom: 24,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#e10600',
              animation: 'pulse 2s infinite',
            }}
          />
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
            Premium Recipe Collection
          </span>
        </motion.div>

        {/* Display headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(48px, 10vw, 120px)',
            lineHeight: 0.85,
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            marginBottom: 24,
          }}
        >
          <span style={{ color: 'var(--text-primary)' }}>YOUR </span>
          <span className="text-gradient">RECIPES</span>
          <br />
          <span style={{ color: '#e10600' }}>BEAUTIFULLY</span>
          <br />
          <span style={{ color: 'var(--text-primary)' }}>ORGANIZED</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          style={{
            fontSize: 'clamp(15px, 2vw, 18px)',
            color: 'var(--text-secondary)',
            maxWidth: 560,
            margin: '0 auto 40px',
            lineHeight: 1.6,
          }}
        >
          Save unlimited recipes, upload stunning photos, and discover your next masterpiece
          with smart ingredient search.
        </motion.p>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          style={{
            maxWidth: 520,
            margin: '0 auto 32px',
            position: 'relative',
          }}
        >
          <Search
            size={18}
            style={{
              position: 'absolute',
              left: 20,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-secondary)',
              opacity: 0.5,
              pointerEvents: 'none',
            }}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search recipes, ingredients..."
            style={{
              width: '100%',
              padding: '16px 120px 16px 52px',
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid var(--glass-border)',
              borderRadius: 20,
              color: 'var(--text-primary)',
              fontSize: 15,
              outline: 'none',
              transition: 'all 300ms',
            }}
          />
          <button
            onClick={handleSearch}
            className="btn-primary"
            style={{
              position: 'absolute',
              right: 6,
              top: '50%',
              transform: 'translateY(-50%)',
              padding: '10px 18px',
              fontSize: 12,
              borderRadius: 16,
            }}
          >
            Search
          </button>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          style={{
            display: 'flex',
            gap: 12,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Link to="/recipes">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 8px 32px rgba(225,6,0,0.4)' }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary"
              style={{ padding: '14px 28px', fontSize: 14 }}
            >
              EXPLORE RECIPES
              <ArrowRight size={16} />
            </motion.button>
          </Link>
          <Link to="/add-recipe">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="btn-ghost"
              style={{ padding: '14px 28px', fontSize: 14 }}
            >
              ADD YOUR RECIPE
            </motion.button>
          </Link>
          <Link to="/ai-kitchen">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 6px 24px rgba(225,6,0,0.3)' }}
              whileTap={{ scale: 0.97 }}
              className="btn-ghost"
              style={{ padding: '14px 28px', fontSize: 14, borderColor: 'rgba(225,6,0,0.3)' }}
            >
              <Sparkles size={14} />
              AI KITCHEN
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          position: 'absolute',
          bottom: 32,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
          opacity: indicatorOpacity,
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontFamily: "'Outfit', sans-serif",
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--text-secondary)',
            opacity: 0.5,
          }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown size={16} color="var(--text-secondary)" style={{ opacity: 0.5 }} />
        </motion.div>
      </motion.div>

      {/* Pulse animation keyframe */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}
