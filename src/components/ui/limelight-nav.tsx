import React, { useState, useRef, useLayoutEffect, cloneElement, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// --- Internal Types and Defaults ---

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

/**
 * An adaptive-width navigation bar with a "limelight" effect that highlights the active item.
 */
export const LimelightNav = ({
  items,
  defaultActiveIndex = 0,
  onTabChange,
  className,
  limelightClassName,
  iconContainerClassName,
  iconClassName,
}: LimelightNavProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Find index based on current URL path
  const currentIndex = items.findIndex(item => item.path === location.pathname);
  const initialIndex = currentIndex >= 0 ? currentIndex : defaultActiveIndex;

  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [isReady, setIsReady] = useState(false);
  const navItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const limelightRef = useRef<HTMLDivElement | null>(null);

  // Sync active index with URL changes
  useEffect(() => {
    const idx = items.findIndex(item => item.path === location.pathname);
    if (idx >= 0 && idx !== activeIndex) {
      setActiveIndex(idx);
    }
  }, [location.pathname, items, activeIndex]);

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

  const handleItemClick = (index: number, item: NavItem) => {
    setActiveIndex(index);
    onTabChange?.(index);
    item.onClick?.();
    if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <nav className={`relative inline-flex items-center h-16 rounded-full bg-[rgba(255,255,255,0.02)] text-white border border-[rgba(255,255,255,0.05)] px-2 ${className}`}>
      {items.map((item, index) => (
          <a
            key={item.id}
            ref={el => { navItemRefs.current[index] = el; }}
            className={`relative z-20 flex h-full cursor-pointer items-center justify-center px-4 py-2 mx-1 gap-2 rounded-full transition-colors ${iconContainerClassName}`}
            onClick={() => handleItemClick(index, item)}
            aria-label={item.label}
          >
            {cloneElement(item.icon as React.ReactElement<any>, {
              className: `w-5 h-5 transition-all duration-300 ease-in-out ${
                activeIndex === index ? 'opacity-100 scale-110 text-[#e10600]' : 'opacity-60 hover:opacity-80 text-white'
              } ${(item.icon as React.ReactElement<any>).props.className || ''} ${iconClassName || ''}`,
            })}
            {item.label && (
              <span className={`text-sm font-['Outfit'] tracking-wider uppercase transition-all duration-300 ${
                activeIndex === index ? 'font-bold text-[#e10600]' : 'font-medium text-white/70'
              }`}>
                {item.label}
              </span>
            )}
          </a>
      ))}

      <div 
        ref={limelightRef}
        className={`absolute top-0 z-10 w-12 h-[3px] rounded-full bg-[#e10600] shadow-[0_20px_20px_#e10600] ${
          isReady ? 'transition-[left] duration-300 ease-in-out' : ''
        } ${limelightClassName}`}
        style={{ left: '-999px' }}
      >
        <div className="absolute left-[-50%] top-[3px] w-[200%] h-14 [clip-path:polygon(15%_100%,40%_0,60%_0,85%_100%)] bg-gradient-to-b from-[#e10600]/30 to-transparent pointer-events-none" />
      </div>
    </nav>
  );
};
