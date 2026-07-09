// Search Page — Full search with results

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { Search, X, Plus } from 'lucide-react';
import { useRecipeContext } from '../context/RecipeContext';
import { useSearch } from '../hooks/useSearch';
import { SearchBar } from '../components/search/SearchBar';
import { RecipeGrid } from '../components/recipe/RecipeGrid';
import { SortDropdown } from '../components/search/SortDropdown';

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const { recipes, toggleFavorite, loading } = useRecipeContext();
  const {
    filters,
    filteredRecipes,
    updateFilter,
    setSearchQuery,
    addIngredientSearch,
    removeIngredientSearch,
  } = useSearch(recipes);
  const [ingredientInput, setIngredientInput] = useState('');

  // Get initial query from URL
  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setSearchQuery(q);
  }, [searchParams, setSearchQuery]);

  const allIngredients = Array.from(
    new Set(recipes.flatMap((r) => r.ingredients.map((i) => i.name)))
  );

  const handleAddIngredient = () => {
    if (ingredientInput.trim()) {
      addIngredientSearch(ingredientInput);
      setIngredientInput('');
    }
  };

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
          <div style={{ marginBottom: 32 }}>
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
              Find Your Next Dish
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
              SEARCH <span style={{ color: '#e10600' }}>RECIPES</span>
            </h1>
          </div>

          {/* Search */}
          <div style={{ marginBottom: 24 }}>
            <SearchBar
              value={filters.searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by name, ingredient, or tag..."
              suggestions={allIngredients}
              size="lg"
              autoFocus
            />
          </div>

          {/* Ingredient search */}
          <div
            className="glass-card"
            style={{
              padding: '20px 24px',
              marginBottom: 24,
              borderRadius: 16,
              cursor: 'default',
            }}
          >
            <h3
              style={{
                fontSize: 12,
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--text-secondary)',
                marginBottom: 12,
              }}
            >
              🧅 Search by Ingredients (what do you have?)
            </h3>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              <input
                type="text"
                value={ingredientInput}
                onChange={(e) => setIngredientInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddIngredient()}
                placeholder="Type an ingredient..."
                className="input-field"
                style={{ flex: 1 }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddIngredient}
                className="btn-primary"
                style={{ padding: '10px 18px', fontSize: 12 }}
              >
                <Plus size={14} /> Add
              </motion.button>
            </div>
            {filters.ingredientSearch.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {filters.ingredientSearch.map((ing) => (
                  <motion.span
                    key={ing}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '6px 12px',
                      borderRadius: 10,
                      background: 'rgba(225,6,0,0.1)',
                      color: '#e10600',
                      fontSize: 13,
                      fontWeight: 500,
                    }}
                  >
                    {ing}
                    <button
                      onClick={() => removeIngredientSearch(ing)}
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        background: 'rgba(225,6,0,0.2)',
                        color: '#e10600',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        border: 'none',
                      }}
                    >
                      <X size={8} />
                    </button>
                  </motion.span>
                ))}
              </div>
            )}
          </div>

          {/* Sort + Count */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 24,
            }}
          >
            <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              {filteredRecipes.length} result{filteredRecipes.length !== 1 ? 's' : ''}
            </span>
            <SortDropdown
              value={filters.sortBy}
              onChange={(v) => updateFilter('sortBy', v)}
            />
          </div>

          {/* Results */}
          <RecipeGrid
            recipes={filteredRecipes}
            onToggleFavorite={toggleFavorite}
            loading={loading}
            emptyMessage="No recipes found — try different ingredients"
          />
        </div>
      </section>
    </motion.div>
  );
}
