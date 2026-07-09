import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

export type NavItem = {
  id: string | number;
  icon: React.ReactElement;
  label?: string;
  onClick?: () => void;
  path?: string;
};

type LimelightNavProps = {
  items: NavItem[];
  defaultActiveIndex?: number;
  onTabChange?: (index: number) => void;
  className?: string;
  limelightClassName?: string;
  iconContainerClassName?: string;
  iconClassName?: string;
};

export const LimelightNav = ({
  items,
  className,
  limelightClassName,
  iconContainerClassName,
  iconClassName,
}: LimelightNavProps) => {
  const location = useLocation();
  
  // Pure derived state! No useState or useEffect needed for syncing!
  let activeIndex = items.findIndex(item => item.path === location.pathname);
  if (activeIndex === -1) {
    activeIndex = 0; // fallback if current path is not in nav
  }

  const [isReady, setIsReady] = useState(false);
  const navItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const limelightRef = useRef<HTMLDivElement | null>(null);

  // No useEffect needed to sync activeIndex!

  useLayoutEffect(() => {
    if (items.length === 0) return;

    const limelight = limelightRef.current;
    const activeItem = navItemRefs.current[activeIndex];
    
    if (limelight && activeItem) {
      const newLeft = activeItem.offsetLeft + activeItem.offsetWidth / 2 - limelight.offsetWidth / 2;
      limelight.style.left = `${newLeft}px`;

      if (!isReady) {
        setTimeout(() => setIsReady(true), 50);
      }
    }
  }, [activeIndex, isReady, items]);

  if (items.length === 0) {
    return null; 
  }

  return (
    <nav 
      className={className}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        height: 64,
        borderRadius: 9999,
        backgroundColor: 'rgba(255,255,255,0.02)',
        color: 'white',
        border: '1px solid rgba(255,255,255,0.05)',
        padding: '0 8px'
      }}
    >
      {items.map((item, index) => (
          <Link
            key={item.id}
            to={item.path || '#'}
            ref={el => { navItemRefs.current[index] = el; }}
            className={iconContainerClassName}
            style={{
              position: 'relative',
              zIndex: 20,
              display: 'flex',
              height: '100%',
              cursor: 'pointer',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px 16px',
              margin: '0 4px',
              gap: 8,
              borderRadius: 9999,
              textDecoration: 'none',
              transition: 'background-color 300ms'
            }}
            onClick={() => {
              if (item.onClick) item.onClick();
            }}
            aria-label={item.label}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 20,
                height: 20,
                transition: 'all 300ms ease-in-out',
                opacity: activeIndex === index ? 1 : 0.6,
                transform: activeIndex === index ? 'scale(1.1)' : 'scale(1)',
                color: activeIndex === index ? '#e10600' : 'white',
              }}
              className={iconClassName}
            >
              {item.icon}
            </div>
            {item.label && (
              <span 
                style={{
                  fontSize: 14,
                  fontFamily: "'Outfit', sans-serif",
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  transition: 'all 300ms',
                  fontWeight: activeIndex === index ? 700 : 500,
                  color: activeIndex === index ? '#e10600' : 'rgba(255,255,255,0.7)'
                }}
              >
                {item.label}
              </span>
            )}
          </Link>
      ))}

      <div 
        ref={limelightRef}
        className={limelightClassName}
        style={{
          position: 'absolute',
          top: 0,
          zIndex: 10,
          width: 48,
          height: 3,
          borderRadius: 9999,
          backgroundColor: '#e10600',
          boxShadow: '0 20px 20px #e10600',
          left: -999,
          transition: isReady ? 'left 300ms ease-in-out' : 'none'
        }}
      >
        <div 
          style={{
            position: 'absolute',
            left: '-50%',
            top: 3,
            width: '200%',
            height: 56,
            clipPath: 'polygon(15% 100%, 40% 0, 60% 0, 85% 100%)',
            background: 'linear-gradient(to bottom, rgba(225, 6, 0, 0.3), transparent)',
            pointerEvents: 'none'
          }}
        />
      </div>
    </nav>
  );
};
