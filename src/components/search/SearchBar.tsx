// SearchBar component

import { useState, useRef, useEffect } from 'react';
import { Search, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onSubmit?: () => void;
  suggestions?: string[];
  size?: 'sm' | 'md' | 'lg';
  autoFocus?: boolean;
}

export function SearchBar({
  value,
  onChange,
  placeholder = 'Search recipes, ingredients...',
  onSubmit,
  suggestions = [],
  size = 'md',
  autoFocus = false,
}: SearchBarProps) {
  const [focused, setFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const sizeStyles = {
    sm: { padding: '10px 16px 10px 40px', fontSize: 13 },
    md: { padding: '14px 20px 14px 48px', fontSize: 15 },
    lg: { padding: '18px 24px 18px 56px', fontSize: 17 },
  };

  const iconSizes = { sm: 14, md: 18, lg: 20 };
  const iconPositions = { sm: 14, md: 16, lg: 20 };

  const filteredSuggestions = suggestions.filter(
    (s) => s.toLowerCase().includes(value.toLowerCase()) && value.length > 0
  );

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <div style={{ position: 'relative' }}>
        <Search
          size={iconSizes[size]}
          style={{
            position: 'absolute',
            left: iconPositions[size],
            top: '50%',
            transform: 'translateY(-50%)',
            color: focused ? 'var(--color-impossible-red)' : 'var(--text-secondary)',
            opacity: focused ? 1 : 0.5,
            transition: 'all 200ms',
            pointerEvents: 'none',
          }}
        />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => {
            setFocused(true);
            setShowSuggestions(true);
          }}
          onBlur={() => {
            setFocused(false);
            setTimeout(() => setShowSuggestions(false), 200);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && onSubmit) onSubmit();
          }}
          placeholder={placeholder}
          style={{
            width: '100%',
            ...sizeStyles[size],
            background: 'var(--bg-secondary)',
            border: `1px solid ${focused ? 'var(--color-impossible-red)' : 'var(--border-color)'}`,
            borderRadius: size === 'lg' ? 20 : 15,
            color: 'var(--text-primary)',
            outline: 'none',
            fontFamily: "'Inter', sans-serif",
            transition: 'all 200ms',
            boxShadow: focused ? '0 0 0 3px rgba(225,6,0,0.12)' : 'none',
          }}
        />
        <AnimatePresence>
          {value && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => {
                onChange('');
                inputRef.current?.focus();
              }}
              style={{
                position: 'absolute',
                right: iconPositions[size],
                top: '50%',
                transform: 'translateY(-50%)',
                width: 24,
                height: 24,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255,199,198,0.1)',
                color: 'var(--text-secondary)',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <X size={12} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Suggestions dropdown */}
      <AnimatePresence>
        {showSuggestions && filteredSuggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              marginTop: 4,
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: 12,
              overflow: 'hidden',
              zIndex: 50,
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            }}
          >
            {filteredSuggestions.slice(0, 6).map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => {
                  onChange(suggestion);
                  setShowSuggestions(false);
                }}
                style={{
                  width: '100%',
                  padding: '10px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 13,
                  color: 'var(--text-primary)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 150ms',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(225,6,0,0.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <Sparkles size={12} color="var(--color-impossible-red)" />
                {suggestion}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
