import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLang } from '../context/LanguageContext';
import { getHaatEvent } from '../services/api';
import { formatCountdown } from '../utils/haat';

export default function Header() {
  const { itemCount } = useCart();
  const { lang, toggle, isBn } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [haat, setHaat] = useState(null);
  const [remaining, setRemaining] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getHaatEvent().then(setHaat);
  }, []);

  useEffect(() => {
    if (!haat || haat.status !== 'ACTIVE') return;
    const tick = () => {
      const ms = new Date(haat.endTime).getTime() - Date.now();
      setRemaining(formatCountdown(ms));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [haat]);

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 30,
          background: 'var(--warm-white)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        {haat?.status === 'ACTIVE' && (
          <div
            style={{
              background: 'var(--ink)',
              color: 'var(--white)',
              padding: '6px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              fontSize: 12,
              fontFamily: 'var(--font-en)',
            }}
          >
            <span className="live-dot" />
            <span style={{ fontWeight: 600 }}>LIVE</span>
            <span>·</span>
            <span>{isBn ? 'শুক্রবারের হাট' : 'Friday Haat'}</span>
            <span>·</span>
            <span className="countdown">{remaining}</span>
          </div>
        )}

        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 56,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Menu"
              style={{ display: 'flex', padding: 8 }}
              className="md-hide"
            >
              <Menu size={22} />
            </button>
            <Link to="/" style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 22, letterSpacing: '-0.02em' }}>
              LOCAL
            </Link>
            <span style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--font-en)', display: 'none' }} className="desktop-only">
              Made in Bangladesh
            </span>
          </div>

          <nav
            className="desktop-nav"
            style={{ display: 'none', gap: 28, fontFamily: 'var(--font-heading)', fontSize: 15, fontWeight: 500 }}
          >
            <Link to="/explore">{isBn ? 'অন্বেষণ' : 'Explore'}</Link>
            <Link to="/friday-haat" style={{ color: 'var(--haat-accent)' }}>
              {isBn ? 'শুক্রবারের হাট' : 'Friday Haat'}
            </Link>
            <Link to="/creators">{isBn ? 'নির্মাতারা' : 'Creators'}</Link>
            <Link to="/become-a-creator">{isBn ? 'নির্মাতা হোন' : 'Become a Creator'}</Link>
            <Link to="/about">{isBn ? 'আমাদের কথা' : 'About'}</Link>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <button
              onClick={toggle}
              style={{
                fontSize: 12,
                fontFamily: 'var(--font-en)',
                color: 'var(--muted)',
                padding: '6px 8px',
              }}
              aria-label="Switch language"
            >
              {lang === 'bn' ? 'EN' : 'বাং'}
            </button>
            <button
              onClick={() => navigate('/search')}
              aria-label="Search"
              style={{ padding: 8 }}
            >
              <Search size={20} />
            </button>
            <Link to="/cart" style={{ padding: 8, position: 'relative' }} aria-label="Cart">
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: 2,
                    right: 2,
                    background: 'var(--haat-accent)',
                    color: 'white',
                    fontSize: 10,
                    fontWeight: 700,
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-en)',
                  }}
                >
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'var(--warm-white)',
            zIndex: 50,
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 40 }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 22 }}>LOCAL</span>
            <button onClick={() => setMenuOpen(false)} aria-label="Close">
              <X size={24} />
            </button>
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 500 }}>
            <Link to="/" onClick={() => setMenuOpen(false)}>{isBn ? 'হোম' : 'Home'}</Link>
            <Link to="/explore" onClick={() => setMenuOpen(false)}>{isBn ? 'অন্বেষণ' : 'Explore'}</Link>
            <Link to="/friday-haat" onClick={() => setMenuOpen(false)} style={{ color: 'var(--haat-accent)' }}>
              {isBn ? 'শুক্রবারের হাট' : 'Friday Haat'}
            </Link>
            <Link to="/creators" onClick={() => setMenuOpen(false)}>{isBn ? 'নির্মাতারা' : 'Creators'}</Link>
            <Link to="/become-a-creator" onClick={() => setMenuOpen(false)}>{isBn ? 'নির্মাতা হোন' : 'Become a Creator'}</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)}>{isBn ? 'আমাদের কথা' : 'About'}</Link>
            <Link to="/friday-haat/rules" onClick={() => setMenuOpen(false)}>{isBn ? 'হাটের নিয়ম' : 'Haat Rules'}</Link>
          </nav>
          <div style={{ marginTop: 'auto', fontSize: 13, color: 'var(--muted)' }}>
            Made in Bangladesh
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 900px) {
          .desktop-nav { display: flex !important; }
          .md-hide { display: none !important; }
          .desktop-only { display: inline !important; }
        }
      `}</style>
    </>
  );
}
