// Recipes Page — Browse all recipes with search, filter, and sort

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, LayoutGrid, List } from 'lucide-react';
import { useRecipeContext } from '../context/RecipeContext';
import { useSearch } from '../hooks/useSearch';
import { SearchBar } from '../components/search/SearchBar';
import { FilterPanel } from '../components/search/FilterPanel';
import { SortDropdown } from '../components/search/SortDropdown';
import { RecipeGrid } from '../components/recipe/RecipeGrid';
import { Sidebar } from '../components/layout/Sidebar';

export function RecipesPage() {
  const { recipes, toggleFavorite, loading } = useRecipeContext();
  const {
    filters,
    filteredRecipes,
    updateFilter,
    resetFilters,
    setSearchQuery,
    hasActiveFilters,
  } = useSearch(recipes);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Get all unique ingredient names for search suggestions
  const allIngredients = Array.from(
    new Set(recipes.flatMap((r) => r.ingredients.map((i) => i.name)))
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ minHeight: '100vh' }}
    >
      {/* Header */}
      <section style={{ padding: '40px 24px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ marginBottom: 32 }}
          >
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
              Recipe Collection
            </span>
            <h1
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(36px, 6vw, 56px)',
                lineHeight: 0.9,
                textTransform: 'uppercase',
              }}
            >
              ALL <span style={{ color: '#e10600' }}>RECIPES</span>
            </h1>
          </motion.div>

          {/* Search & Controls */}
          <div
            style={{
              display: 'flex',
              gap: 12,
              alignItems: 'center',
              marginBottom: 20,
              flexWrap: 'wrap',
            }}
          >
            <div style={{ flex: 1, minWidth: 250 }}>
              <SearchBar
                value={filters.searchQuery}
                onChange={setSearchQuery}
                suggestions={allIngredients}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSidebarOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '12px 18px',
                borderRadius: 12,
                background: hasActiveFilters ? 'rgba(225,6,0,0.1)' : 'var(--bg-secondary)',
                border: `1px solid ${hasActiveFilters ? 'rgba(225,6,0,0.2)' : 'var(--border-color)'}`,
                color: hasActiveFilters ? '#e10600' : 'var(--text-primary)',
                fontSize: 13,
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              <SlidersHorizontal size={14} />
              Filters
              {hasActiveFilters && (
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#e10600',
                  }}
                />
              )}
            </motion.button>

            <SortDropdown
              value={filters.sortBy}
              onChange={(v) => updateFilter('sortBy', v)}
            />
          </div>

          {/* Category pills */}
          <FilterPanel filters={filters} onFilterChange={updateFilter} />

          {/* Results count */}
          <div style={{ marginTop: 16, marginBottom: 24, fontSize: 13, color: 'var(--text-secondary)' }}>
            {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''} found
          </div>
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding: '0 24px 80px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <RecipeGrid
            recipes={filteredRecipes}
            onToggleFavorite={toggleFavorite}
            loading={loading}
            emptyMessage={hasActiveFilters ? 'No recipes match your filters' : 'No recipes yet'}
          />
        </div>
      </section>

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        filters={filters}
        onFilterChange={updateFilter}
        onReset={resetFilters}
        hasActiveFilters={hasActiveFilters}
      />
    </motion.div>
  );
}
