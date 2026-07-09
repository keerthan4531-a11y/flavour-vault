// FilterPanel — horizontal filter pills

import { CATEGORIES, CUISINES, DIETS } from '../../types/filter';
import type { FilterState } from '../../types/filter';

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
}

export function FilterPanel({ filters, onFilterChange }: FilterPanelProps) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
      {(CATEGORIES as string[]).map((cat) => (
        <button
          key={cat}
          className={`pill-toggle ${filters.category === cat ? 'active' : ''}`}
          onClick={() => onFilterChange('category', cat as any)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
