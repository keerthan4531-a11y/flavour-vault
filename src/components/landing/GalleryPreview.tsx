// GalleryPreview — Masonry gallery preview with real food images

import { motion } from 'framer-motion';
import { ArrowRight, Image } from 'lucide-react';
import { Link } from 'react-router-dom';

const GALLERY_ITEMS = [
  { image: '/images/chicken-biryani.png', height: 260, label: 'Chicken Biryani' },
  { image: '/images/cat-breakfast.png', height: 200, label: 'Breakfast Spread' },
  { image: '/images/cat-dessert.png', height: 280, label: 'Sweet Treats' },
  { image: '/images/gallery-curry.png', height: 220, label: 'Rich Curries' },
  { image: '/images/cat-snacks.png', height: 240, label: 'Crispy Snacks' },
  { image: '/images/gallery-salad.png', height: 200, label: 'Fresh Salads' },
  { image: '/images/cat-beverage.png', height: 260, label: 'Cool Drinks' },
  { image: '/images/gallery-pasta.png', height: 230, label: 'Creamy Pasta' },
];

export function GalleryPreview() {
  return (
    <section style={{ padding: '100px 24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: 48,
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Image size={16} color="#e10600" />
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
                Visual Feast
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(32px, 5vw, 48px)',
                lineHeight: 0.9,
                textTransform: 'uppercase',
              }}
            >
              FOOD <span style={{ color: '#e10600' }}>GALLERY</span>
            </h2>
          </div>

          <Link to="/gallery">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="btn-ghost"
              style={{ padding: '10px 20px', fontSize: 12 }}
            >
              VIEW ALL
              <ArrowRight size={14} />
            </motion.button>
          </Link>
        </motion.div>

        {/* Masonry Grid */}
        <div className="masonry-grid">
          {GALLERY_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              className="masonry-item"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.03 }}
              style={{
                height: item.height,
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <img
                src={item.image}
                alt={item.label}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 500ms ease',
                }}
                loading="lazy"
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              />

              {/* Hover overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(transparent 50%, rgba(0,0,0,0.8))',
                  opacity: 0,
                  transition: 'opacity 300ms',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: 14,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}
              >
                <h4
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 700,
                    fontSize: 14,
                    color: '#fff',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  {item.label}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
