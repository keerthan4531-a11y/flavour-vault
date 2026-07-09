// Gallery Page — Masonry gallery of all recipe images

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Image, Camera } from 'lucide-react';
import { useRecipeContext } from '../context/RecipeContext';
import { ImagePreview } from '../components/upload/ImagePreview';

export function GalleryPage() {
  const { recipes } = useRecipeContext();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);

  // Collect all recipe images with gradient fallbacks
  const PLACEHOLDER_GRADIENTS = [
    'linear-gradient(135deg, #e10600 0%, #4f0423 100%)',
    'linear-gradient(135deg, #4f0423 0%, #260212 100%)',
    'linear-gradient(135deg, #e10600 0%, #260212 100%)',
    'linear-gradient(135deg, #260212 0%, #e10600 50%, #4f0423 100%)',
    'linear-gradient(135deg, #4f0423 0%, #e10600 100%)',
  ];

  const CATEGORY_IMAGES: Record<string, string> = {
    Breakfast: '/images/cat-breakfast.png', Lunch: '/images/cat-lunch.png',
    Dinner: '/images/cat-dinner.png', Dessert: '/images/cat-dessert.png',
    Snacks: '/images/cat-snacks.png', Appetizer: '/images/cat-appetizer.png',
    Beverage: '/images/cat-beverage.png',
  };

  interface GalleryItem {
    image?: string;
    title: string;
    category: string;
    gradient: string;
    fallbackImage: string;
    height: number;
  }

  const galleryItems: GalleryItem[] = recipes.map((r, i) => ({
    image: r.coverImage || undefined,
    title: r.title,
    category: r.category,
    gradient: PLACEHOLDER_GRADIENTS[i % PLACEHOLDER_GRADIENTS.length],
    fallbackImage: CATEGORY_IMAGES[r.category] || '/images/cat-lunch.png',
    height: 200 + (i % 4) * 40,
  }));

  // Also add individual recipe images
  recipes.forEach((r) => {
    r.images.forEach((img, i) => {
      galleryItems.push({
        image: img.data,
        title: `${r.title} — Photo ${i + 1}`,
        category: r.category,
        gradient: PLACEHOLDER_GRADIENTS[i % PLACEHOLDER_GRADIENTS.length],
        fallbackImage: CATEGORY_IMAGES[r.category] || '/images/cat-lunch.png',
        height: 180 + (i % 3) * 50,
      });
    });
  });

  const allImages = galleryItems.map((item) => item.image).filter(Boolean) as string[];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ minHeight: '100vh' }}
    >
      <section style={{ padding: '40px 24px 80px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          {/* Header */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Camera size={16} color="#e10600" />
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
            <h1
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(36px, 6vw, 56px)',
                lineHeight: 0.9,
                textTransform: 'uppercase',
              }}
            >
              FOOD <span style={{ color: '#e10600' }}>GALLERY</span>
            </h1>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 12 }}>
              {galleryItems.length} photos from your recipe collection
            </p>
          </div>

          {/* Masonry Grid */}
          {galleryItems.length > 0 ? (
            <div className="masonry-grid">
              {galleryItems.map((item, i) => (
                <motion.div
                  key={i}
                  className="masonry-item"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 8) * 0.05 }}
                  whileHover={{ scale: 1.03 }}
                  onClick={() => {
                    if (item.image) {
                      setPreviewIndex(allImages.indexOf(item.image));
                      setPreviewOpen(true);
                    }
                  }}
                  style={{
                    height: item.height,
                    cursor: item.image ? 'pointer' : 'default',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      loading="lazy"
                    />
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                      }}
                    >
                      <img
                        src={item.fallbackImage}
                        alt={item.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        loading="lazy"
                      />
                      <div style={{ position: 'absolute', inset: 0, background: item.gradient, opacity: 0.3 }} />
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(transparent 60%, rgba(0,0,0,0.8))',
                      opacity: 0,
                      transition: 'opacity 300ms',
                      display: 'flex',
                      alignItems: 'flex-end',
                      padding: 14,
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}
                  >
                    <div>
                      <span
                        style={{
                          fontSize: 10,
                          fontFamily: "'Outfit', sans-serif",
                          fontWeight: 600,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: '#e10600',
                        }}
                      >
                        {item.category}
                      </span>
                      <h4
                        style={{
                          fontFamily: "'Outfit', sans-serif",
                          fontWeight: 700,
                          fontSize: 14,
                          color: '#fff',
                          textTransform: 'uppercase',
                        }}
                      >
                        {item.title}
                      </h4>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">
                <Image size={32} />
              </div>
              <h3>No Photos Yet</h3>
              <p>Upload photos to your recipes to see them here.</p>
            </div>
          )}
        </div>
      </section>

      <ImagePreview
        images={allImages}
        initialIndex={previewIndex}
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
      />
    </motion.div>
  );
}
