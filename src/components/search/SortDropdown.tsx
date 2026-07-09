// Sort Dropdown

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ArrowUpDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SortOption } from '../../types/recipe';

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'name-asc', label: 'Name A-Z' },
  { value: 'name-desc', label: 'Name Z-A' },
  { value: 'time-asc', label: 'Quick First' },
  { value: 'time-desc', label: 'Longest First' },
  { value: 'rating', label: 'Highest Rated' },
];

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const currentLabel = SORT_OPTIONS.find((o) => o.value === value)?.label || 'Sort';

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '8px 14px',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: 12,
          color: 'var(--text-primary)',
          fontSize: 13,
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 500,
          cursor: 'pointer',
          transition: 'all 200ms',
        }}
      >
        <ArrowUpDown size={14} color="var(--text-secondary)" />
        {currentLabel}
        <ChevronDown
          size={14}
          style={{
            transition: 'transform 200ms',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: 4,
              minWidth: 180,
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: 12,
              overflow: 'hidden',
              zIndex: 50,
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            }}
          >
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                style={{
                  width: '100%',
                  padding: '10px 16px',
                  fontSize: 13,
                  color: value === opt.value ? 'var(--color-impossible-red)' : 'var(--text-primary)',
                  fontWeight: value === opt.value ? 600 : 400,
                  background: value === opt.value ? 'rgba(225,6,0,0.05)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 150ms',
                }}
                onMouseEnter={(e) => {
                  if (value !== opt.value) e.currentTarget.style.background = 'rgba(255,199,198,0.05)';
                }}
                onMouseLeave={(e) => {
                  if (value !== opt.value) e.currentTarget.style.background = 'transparent';
                }}
              >
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
