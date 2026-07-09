// Footer component

import { Heart, Globe, MessageCircle, Camera, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { APP_NAME } from '../../utils/constants';

const FOOTER_LINKS = [
  { label: 'Recipes', path: '/recipes' },
  { label: 'Favorites', path: '/favorites' },
  { label: 'Add Recipe', path: '/add-recipe' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'About', path: '/about' },
];

const SOCIAL_LINKS = [
  { icon: Globe, label: 'Website', href: '#' },
  { icon: MessageCircle, label: 'Chat', href: '#' },
  { icon: Camera, label: 'Photos', href: '#' },
  { icon: Mail, label: 'Email', href: '#' },
];

export function Footer() {
  return (
    <footer
      style={{
        background: 'var(--color-butcher-black)',
        borderTop: '1px solid rgba(255,199,198,0.08)',
        padding: '64px 24px 32px',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* Top Section */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 48,
            marginBottom: 48,
          }}
        >
          {/* Brand */}
          <div>
            <h3
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 900,
                fontSize: 24,
                color: '#e10600',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: 16,
              }}
            >
              {APP_NAME}
            </h3>
            <p style={{ fontSize: 14, color: '#ffc7c6', lineHeight: 1.6, maxWidth: 280 }}>
              Your recipes, beautifully organized. Save, search, and discover culinary excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 600,
                fontSize: 13,
                color: '#fff',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: 16,
              }}
            >
              Quick Links
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {FOOTER_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    fontSize: 14,
                    color: '#ffc7c6',
                    transition: 'color 200ms',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#e10600')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#ffc7c6')}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter (dummy) */}
          <div>
            <h4
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 600,
                fontSize: 13,
                color: '#fff',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: 16,
              }}
            >
              Stay Updated
            </h4>
            <p style={{ fontSize: 13, color: '#ffc7c6', marginBottom: 12, lineHeight: 1.5 }}>
              Get notified about new recipes and features.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                type="email"
                placeholder="Your email"
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  background: 'rgba(255,199,198,0.08)',
                  border: '1px solid rgba(255,199,198,0.15)',
                  borderRadius: 10,
                  color: '#fff',
                  fontSize: 13,
                  outline: 'none',
                }}
              />
              <button
                className="btn-primary"
                style={{ padding: '10px 16px', fontSize: 12, whiteSpace: 'nowrap' }}
              >
                JOIN
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,199,198,0.08)', marginBottom: 24 }} />

        {/* Bottom Section */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <p style={{ fontSize: 12, color: 'rgba(255,199,198,0.5)', display: 'flex', alignItems: 'center', gap: 4 }}>
            Made with <Heart size={12} fill="#e10600" color="#e10600" /> by Flavour Vault
          </p>

          <div style={{ display: 'flex', gap: 12 }}>
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(255,199,198,0.08)',
                  color: '#ffc7c6',
                  transition: 'all 200ms',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(225,6,0,0.2)';
                  e.currentTarget.style.color = '#e10600';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,199,198,0.08)';
                  e.currentTarget.style.color = '#ffc7c6';
                }}
              >
                <social.icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
