// Custom hook for search and filtering

import { useState, useMemo, useCallback } from 'react';
import type { Recipe } from '../types/recipe';
import type { FilterState } from '../types/filter';
import { DEFAULT_FILTERS } from '../types/filter';
import { filterRecipes } from '../utils/searchHelper';

export function useSearch(recipes: Recipe[]) {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  const filteredRecipes = useMemo(
    () => filterRecipes(recipes, filters),
    [recipes, filters]
  );

  const updateFilter = useCallback(<K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  const setSearchQuery = useCallback((query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  }, []);

  const addIngredientSearch = useCallback((ingredient: string) => {
    setFilters((prev) => ({
      ...prev,
      ingredientSearch: [...prev.ingredientSearch, ingredient.trim()],
    }));
  }, []);

  const removeIngredientSearch = useCallback((ingredient: string) => {
    setFilters((prev) => ({
      ...prev,
      ingredientSearch: prev.ingredientSearch.filter((i) => i !== ingredient),
    }));
  }, []);

  const hasActiveFilters = useMemo(() => {
    return (
      filters.searchQuery !== '' ||
      filters.category !== 'All' ||
      filters.cuisine !== 'All' ||
      filters.diet !== 'All' ||
      filters.maxCookingTime !== null ||
      filters.difficulty !== 'All' ||
      filters.tags.length > 0 ||
      filters.ingredientSearch.length > 0
    );
  }, [filters]);

  return {
    filters,
    filteredRecipes,
    updateFilter,
    resetFilters,
    setSearchQuery,
    addIngredientSearch,
    removeIngredientSearch,
    hasActiveFilters,
    resultCount: filteredRecipes.length,
  };
}
