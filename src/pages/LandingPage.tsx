// Landing Page — Full premium landing experience

import { motion } from 'framer-motion';
import { Hero } from '../components/landing/Hero';
import { FeatureCards } from '../components/landing/FeatureCards';
import { CategoryShowcase } from '../components/landing/CategoryShowcase';
import { TrendingRecipes } from '../components/landing/TrendingRecipes';
import { HowItWorks } from '../components/landing/HowItWorks';
import { GalleryPreview } from '../components/landing/GalleryPreview';
import { STATS } from '../utils/constants';
import { BookOpen, Sparkles, Heart, Grid3X3 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const STAT_ICONS: Record<string, React.ElementType> = {
  'book-open': BookOpen,
  'sparkles': Sparkles,
  'heart': Heart,
  'grid-3x3': Grid3X3,
};

// Animated counter hook
function useCounter(target: string, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const numericTarget = parseInt(target.replace(/\D/g, '')) || 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started || numericTarget === 0) return;

    const steps = 60;
    const increment = numericTarget / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericTarget) {
        setCount(numericTarget);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [started, numericTarget, duration]);

  return { count, ref };
}

function StatCard({ stat, index }: { stat: typeof STATS[0]; index: number }) {
  const { count, ref } = useCounter(stat.value);
  const Icon = STAT_ICONS[stat.icon] || BookOpen;

  const displayValue = stat.value.includes('+')
    ? `${count}+`
    : stat.value.includes('%')
    ? `${count}%`
    : stat.value === 'Free'
    ? 'Free'
    : `${count}+`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      style={{
        textAlign: 'center',
        padding: '32px 20px',
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 14,
          background: 'rgba(225,6,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 14px',
        }}
      >
        <Icon size={22} color="#e10600" />
      </div>
      <div
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 900,
          fontSize: 36,
          color: '#e10600',
          lineHeight: 1,
          marginBottom: 4,
        }}
      >
        {displayValue}
      </div>
      <div
        style={{
          fontSize: 13,
          color: 'var(--text-secondary)',
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 500,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
        }}
      >
        {stat.label}
      </div>
    </motion.div>
  );
}

export function LandingPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />

      {/* Stats Section */}
      <section
        style={{
          padding: '60px 24px',
          background: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border-color)',
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: 16,
          }}
        >
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </section>

      <FeatureCards />
      <CategoryShowcase />
      <TrendingRecipes />
      <HowItWorks />
      <GalleryPreview />
    </motion.div>
  );
}
