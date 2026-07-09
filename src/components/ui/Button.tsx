// Reusable Button component

import { type ReactNode, type ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  icon?: ReactNode;
  loading?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  loading,
  className = '',
  ...props
}: ButtonProps) {
  const baseClass = variant === 'primary' ? 'btn-primary' : variant === 'ghost' ? 'btn-ghost' : '';

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { padding: '8px 16px', fontSize: '12px' },
    md: { padding: '12px 24px', fontSize: '14px' },
    lg: { padding: '16px 32px', fontSize: '16px' },
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`${baseClass} ${className}`}
      style={sizeStyles[size]}
      disabled={loading || props.disabled}
      {...(props as any)}
    >
      {loading ? (
        <span
          style={{
            width: 16,
            height: 16,
            border: '2px solid rgba(255,255,255,0.3)',
            borderTopColor: '#fff',
            borderRadius: '50%',
            animation: 'spin 600ms linear infinite',
            display: 'inline-block',
          }}
        />
      ) : icon ? (
        icon
      ) : null}
      {children}
    </motion.button>
  );
}
