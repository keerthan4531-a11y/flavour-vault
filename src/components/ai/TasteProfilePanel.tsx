import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Star, Tag, Utensils } from 'lucide-react';
import { useRecipeContext } from '../../context/RecipeContext';
import { generateTasteProfile, type TasteProfile } from '../../services/ai/tasteAnalyzer';

export function TasteProfilePanel() {
  const { recipes } = useRecipeContext();
  const [profile, setProfile] = useState<TasteProfile | null>(null);

  useEffect(() => {
    const favorites = recipes.filter(r => r.isFavorite);
    setProfile(generateTasteProfile(favorites));
  }, [recipes]);

  if (!profile) {
    return (
      <div style={{ padding: 24, textAlign: 'center', background: 'var(--bg-secondary)', borderRadius: 16 }}>
        <Star size={32} color="var(--text-muted)" style={{ margin: '0 auto 12px' }} />
        <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
          Favorite some recipes to build your personal AI Taste Profile!
        </p>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--bg-secondary)', borderRadius: 16, padding: 24, border: '1px solid var(--border-color)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(225,6,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Activity size={24} color="#e10600" />
        </div>
        <div>
          <h3 style={{ fontSize: 12, textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>
            Your AI Persona
          </h3>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 24, fontWeight: 800, color: '#e10600', margin: 0 }}>
            {profile.persona}
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 16 }}>
        <div className="glass-card" style={{ padding: 16, cursor: 'default' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
            <Utensils size={14} color="var(--text-secondary)" />
            <span style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>Top Cuisines</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {profile.topCuisines.map(c => (
              <span key={c} style={{ fontSize: 12, padding: '4px 8px', background: 'rgba(255,255,255,0.05)', borderRadius: 4 }}>{c}</span>
            ))}
          </div>
        </div>

        <div className="glass-card" style={{ padding: 16, cursor: 'default' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
            <Star size={14} color="var(--text-secondary)" />
            <span style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>Top Diets</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {profile.topDiets.map(d => (
              <span key={d} style={{ fontSize: 12, padding: '4px 8px', background: 'rgba(255,255,255,0.05)', borderRadius: 4 }}>{d}</span>
            ))}
          </div>
        </div>

        <div className="glass-card" style={{ padding: 16, cursor: 'default' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
            <Tag size={14} color="var(--text-secondary)" />
            <span style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>Loved Ingredients</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {profile.topTags.map(t => (
              <span key={t} style={{ fontSize: 12, padding: '4px 8px', background: 'rgba(255,255,255,0.05)', borderRadius: 4 }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
