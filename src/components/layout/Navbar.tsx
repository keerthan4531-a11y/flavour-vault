// Navbar — Sticky top navigation with Impossible Foods aesthetic

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Heart, Plus, Search, BookOpen, Home, Image, Sparkles, Cloud, CloudLightning, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { APP_NAME } from '../../utils/constants';
import { LimelightNav } from '../ui/limelight-nav';

const NAV_LINKS = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/recipes', label: 'Recipes', icon: BookOpen },
  { path: '/search', label: 'Search', icon: Search },
  { path: '/favorites', label: 'Favorites', icon: Heart },
  { path: '/gallery', label: 'Gallery', icon: Image },
  { path: '/ai-kitchen', label: 'AI Kitchen', icon: Sparkles },
  { path: '/about', label: 'About', icon: Heart },
];

const LIMELIGHT_ITEMS = NAV_LINKS.map(link => ({
  id: link.path,
  path: link.path,
  label: link.label,
  icon: <link.icon />
}));

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [syncState, setSyncState] = useState<'synced' | 'syncing' | 'offline'>('syncing');
  const { theme, toggleTheme, isDark } = useTheme();
  const location = useLocation();

  useEffect(() => {
    // Mock Cloud Sync Simulation
    const syncInterval = setInterval(() => {
      setSyncState('syncing');
      setTimeout(() => setSyncState('synced'), 2500);
    }, 30000); // sync every 30 seconds
    
    // Initial sync
    setTimeout(() => setSyncState('synced'), 2000);

    return () => clearInterval(syncInterval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: scrolled ? 'rgba(0,0,0,0.92)' : 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: scrolled ? '1px solid rgba(255,199,198,0.08)' : '1px solid transparent',
          transition: 'all 300ms ease',
        }}
      >
        <div
          style={{
            maxWidth: 1600,
            margin: '0 auto',
            padding: '0 32px',
            height: 72,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <motion.span
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 900,
                fontSize: 20,
                color: '#e10600',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
              whileHover={{ scale: 1.05 }}
            >
              {APP_NAME}
            </motion.span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:block">
            <LimelightNav items={LIMELIGHT_ITEMS} />
          </div>

          {/* Right Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            {/* Mock Sync UI */}
            <div
              style={{
                display: window.innerWidth > 768 ? 'flex' : 'none',
                alignItems: 'center',
                gap: 6,
                padding: '6px 12px',
                borderRadius: 20,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
              title="Mock Cloud Sync Status"
            >
              {syncState === 'syncing' ? (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
                  <CloudLightning size={14} color="#a78bfa" />
                </motion.div>
              ) : (
                <CheckCircle2 size={14} color="#22c55e" />
              )}
              <span style={{ fontSize: 11, fontFamily: "'Outfit', sans-serif", fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                {syncState === 'syncing' ? 'Syncing...' : 'Synced'}
              </span>
            </div>

            <Link to="/add-recipe">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary hidden sm:flex"
                style={{ padding: '8px 16px', fontSize: 12, gap: 6 }}
              >
                <Plus size={14} />
                ADD RECIPE
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255,199,198,0.1)',
                color: '#ffc7c6',
                border: 'none',
                cursor: 'pointer',
              }}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </motion.button>

            {/* Mobile menu toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden"
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255,199,198,0.1)',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
              }}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              top: 64,
              zIndex: 90,
              background: 'rgba(0,0,0,0.95)',
              backdropFilter: 'blur(20px)',
            }}
            className="md:hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.1 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '32px 24px',
                gap: 8,
              }}
            >
              {NAV_LINKS.map((link, i) => {
                const isActive = location.pathname === link.path;
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <Link
                      to={link.path}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        padding: '16px 20px',
                        borderRadius: 12,
                        fontSize: 16,
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: isActive ? 700 : 500,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        color: isActive ? '#e10600' : '#fff',
                        background: isActive ? 'rgba(225,6,0,0.1)' : 'transparent',
                      }}
                    >
                      <link.icon size={20} />
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                style={{ marginTop: 16 }}
              >
                <Link to="/add-recipe">
                  <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px 24px' }}>
                    <Plus size={18} />
                    ADD NEW RECIPE
                  </button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div style={{ height: 64 }} />
    </>
  );
}
