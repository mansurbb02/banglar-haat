import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';

export default function Footer() {
  const { isBn } = useLang();
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        padding: '48px 0 32px',
        marginTop: 'auto',
        background: 'var(--white)',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 32,
          }}
          className="footer-grid"
        >
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 20, marginBottom: 8 }}>
              LOCAL
            </div>
            <p className="small text-muted" style={{ maxWidth: 280 }}>
              {isBn
                ? 'বাংলাদেশের মানুষের তৈরি অনন্য সবকিছু। একটা বানালেও, বিক্রি করার জায়গা আছে।'
                : 'Unique things made by people of Bangladesh. Even one piece has a place to sell.'}
            </p>
            <p className="caption" style={{ marginTop: 12 }}>Made in Bangladesh</p>
          </div>

          <div>
            <h4 style={{ marginBottom: 12, fontSize: 14 }}>{isBn ? 'অন্বেষণ' : 'Explore'}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14 }}>
              <Link to="/friday-haat">{isBn ? 'শুক্রবারের হাট' : 'Friday Haat'}</Link>
              <Link to="/explore">{isBn ? 'সব পণ্য' : 'All products'}</Link>
              <Link to="/creators">{isBn ? 'নির্মাতারা' : 'Creators'}</Link>
              <Link to="/become-a-creator">{isBn ? 'নির্মাতা হোন' : 'Become a Creator'}</Link>
            </div>
          </div>

          <div>
            <h4 style={{ marginBottom: 12, fontSize: 14 }}>{isBn ? 'সহায়তা' : 'Help'}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14 }}>
              <Link to="/friday-haat/rules">{isBn ? 'হাটের নিয়ম' : 'Haat Rules'}</Link>
              <Link to="/about">{isBn ? 'আমাদের কথা' : 'About'}</Link>
              <Link to="/help">{isBn ? 'সাহায্য' : 'Help'}</Link>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: 40,
            paddingTop: 24,
            borderTop: '1px solid var(--border)',
            fontSize: 12,
            color: 'var(--muted)',
            fontFamily: 'var(--font-en)',
          }}
        >
          © 2026 LOCAL · Made in Bangladesh
        </div>
      </div>
      <style>{`
        @media (min-width: 640px) {
          .footer-grid { grid-template-columns: 2fr 1fr 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
