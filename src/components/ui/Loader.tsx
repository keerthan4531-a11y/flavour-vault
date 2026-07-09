// Skeleton Loader component

interface LoaderProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  count?: number;
  className?: string;
}

export function Loader({ width = '100%', height = 20, borderRadius = 8, count = 1, className = '' }: LoaderProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`skeleton ${className}`}
          style={{
            width,
            height,
            borderRadius,
            marginBottom: i < count - 1 ? 8 : 0,
          }}
        />
      ))}
    </>
  );
}

// Recipe Card Skeleton
export function RecipeCardSkeleton() {
  return (
    <div className="recipe-card" style={{ pointerEvents: 'none' }}>
      <div className="card-image">
        <div className="skeleton" style={{ width: '100%', height: '100%', borderRadius: 0 }} />
      </div>
      <div className="card-body">
        <Loader width="70%" height={20} />
        <div style={{ marginTop: 8 }}>
          <Loader width="100%" height={14} count={2} />
        </div>
        <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
          <Loader width={60} height={24} borderRadius={15} />
          <Loader width={60} height={24} borderRadius={15} />
          <Loader width={60} height={24} borderRadius={15} />
        </div>
      </div>
    </div>
  );
}
