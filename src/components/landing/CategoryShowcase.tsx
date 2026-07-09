// CategoryShowcase — Horizontal scrolling category cards with real images

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CATEGORIES = [
  { name: 'Breakfast', image: '/images/cat-breakfast.png', gradient: 'linear-gradient(135deg, #e10600, #ff6b35)', desc: 'Start your day right' },
  { name: 'Lunch', image: '/images/cat-lunch.png', gradient: 'linear-gradient(135deg, #4f0423, #e10600)', desc: 'Midday feasts' },
  { name: 'Dinner', image: '/images/cat-dinner.png', gradient: 'linear-gradient(135deg, #260212, #4f0423)', desc: 'Evening delights' },
  { name: 'Dessert', image: '/images/cat-dessert.png', gradient: 'linear-gradient(135deg, #e10600, #ffc7c6)', desc: 'Sweet endings' },
  { name: 'Snacks', image: '/images/cat-snacks.png', gradient: 'linear-gradient(135deg, #4f0423, #260212)', desc: 'Quick bites' },
  { name: 'Appetizer', image: '/images/cat-appetizer.png', gradient: 'linear-gradient(135deg, #260212, #e10600)', desc: 'First impressions' },
  { name: 'Beverage', image: '/images/cat-beverage.png', gradient: 'linear-gradient(135deg, #e10600, #4f0423)', desc: 'Refreshing sips' },
];

export function CategoryShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      style={{
        padding: '80px 0',
        background: 'var(--bg-secondary)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: 40,
          }}
        >
          <div>
            <span
              style={{
                fontSize: 12,
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#e10600',
                display: 'block',
                marginBottom: 8,
              }}
            >
              Browse By Category
            </span>
            <h2
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(32px, 5vw, 48px)',
                lineHeight: 0.9,
                textTransform: 'uppercase',
              }}
            >
              WHAT ARE YOU <span style={{ color: '#e10600' }}>CRAVING?</span>
            </h2>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scroll('left')}
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'rgba(255,199,198,0.08)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <ChevronLeft size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scroll('right')}
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'rgba(225,6,0,0.15)',
                border: '1px solid rgba(225,6,0,0.2)',
                color: '#e10600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <ChevronRight size={18} />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Scrolling cards */}
      <div
        ref={scrollRef}
        style={{
          display: 'flex',
          gap: 16,
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          paddingLeft: 'max(24px, calc((100vw - 1280px) / 2 + 24px))',
          paddingRight: 24,
          paddingBottom: 8,
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {CATEGORIES.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <Link to={`/recipes?category=${cat.name}`}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                style={{
                  width: 200,
                  height: 260,
                  borderRadius: 20,
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  scrollSnapAlign: 'start',
                  flexShrink: 0,
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                {/* Background image */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                  loading="lazy"
                />
                {/* Dark overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(transparent 20%, rgba(0,0,0,0.75) 100%)',
                    zIndex: 1,
                  }}
                />
                {/* Content */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 20,
                    left: 0,
                    right: 0,
                    textAlign: 'center',
                    zIndex: 2,
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 700,
                      fontSize: 16,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: '#fff',
                    }}
                  >
                    {cat.name}
                  </h3>
                  <p
                    style={{
                      fontSize: 12,
                      color: 'rgba(255,255,255,0.7)',
                    }}
                  >
                    {cat.desc}
                  </p>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
