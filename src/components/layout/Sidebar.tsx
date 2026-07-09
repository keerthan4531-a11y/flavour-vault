// Sidebar component (used for filtering on recipe pages)

import { motion, AnimatePresence } from 'framer-motion';
import { X, SlidersHorizontal } from 'lucide-react';
import { CATEGORIES, CUISINES, DIETS, COOKING_TIME_OPTIONS } from '../../types/filter';
import type { FilterState } from '../../types/filter';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFilterChange: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onReset: () => void;
  hasActiveFilters: boolean;
}

export function Sidebar({ isOpen, onClose, filters, onFilterChange, onReset, hasActiveFilters }: SidebarProps) {
  const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div style={{ marginBottom: 24 }}>
      <h4
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 600,
          fontSize: 11,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--text-secondary)',
          marginBottom: 10,
        }}
      >
        {title}
      </h4>
      {children}
    </div>
  );

  const PillGroup = ({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
      {options.map((opt) => (
        <button
          key={opt}
          className={`pill-toggle ${value === opt ? 'active' : ''}`}
          onClick={() => onChange(opt)}
          style={{ fontSize: 11, padding: '6px 12px' }}
        >
          {opt}
        </button>
      ))}
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 80,
              background: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(4px)',
            }}
            className="lg:hidden"
          />

          {/* Sidebar Panel */}
          <motion.aside
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              top: 64,
              left: 0,
              bottom: 0,
              width: 300,
              zIndex: 85,
              background: 'var(--bg-secondary)',
              borderRight: '1px solid var(--border-color)',
              overflowY: 'auto',
              padding: '24px 20px',
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 24,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <SlidersHorizontal size={16} color="var(--color-impossible-red)" />
                <h3
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 700,
                    fontSize: 16,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  Filters
                </h3>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {hasActiveFilters && (
                  <button
                    onClick={onReset}
                    style={{
                      fontSize: 11,
                      color: 'var(--color-impossible-red)',
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      cursor: 'pointer',
                    }}
                  >
                    Reset
                  </button>
                )}
                <button
                  onClick={onClose}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(255,199,198,0.08)',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                  }}
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            <FilterSection title="Category">
              <PillGroup
                options={CATEGORIES as string[]}
                value={filters.category}
                onChange={(v) => onFilterChange('category', v as any)}
              />
            </FilterSection>

            <FilterSection title="Cuisine">
              <PillGroup
                options={CUISINES as string[]}
                value={filters.cuisine}
                onChange={(v) => onFilterChange('cuisine', v as any)}
              />
            </FilterSection>

            <FilterSection title="Diet">
              <PillGroup
                options={DIETS as string[]}
                value={filters.diet}
                onChange={(v) => onFilterChange('diet', v as any)}
              />
            </FilterSection>

            <FilterSection title="Difficulty">
              <PillGroup
                options={['All', 'Easy', 'Medium', 'Hard']}
                value={filters.difficulty}
                onChange={(v) => onFilterChange('difficulty', v as any)}
              />
            </FilterSection>

            <FilterSection title="Cooking Time">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {COOKING_TIME_OPTIONS.map((opt) => (
                  <button
                    key={opt.label}
                    className={`pill-toggle ${filters.maxCookingTime === opt.value ? 'active' : ''}`}
                    onClick={() => onFilterChange('maxCookingTime', opt.value)}
                    style={{ fontSize: 11, padding: '6px 12px', justifyContent: 'flex-start' }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </FilterSection>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
