// Badge component

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'red' | 'blush' | 'veg' | 'nonveg' | 'custom';
  color?: string;
  bgColor?: string;
  className?: string;
}

export function Badge({ children, variant = 'blush', color, bgColor, className = '' }: BadgeProps) {
  const variantClass = variant !== 'custom' ? `badge-${variant}` : '';

  const customStyle = variant === 'custom'
    ? { color, background: bgColor }
    : undefined;

  return (
    <span className={`badge ${variantClass} ${className}`} style={customStyle}>
      {children}
    </span>
  );
}
