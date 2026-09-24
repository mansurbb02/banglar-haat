import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--ink)', color: 'rgba(255,255,255,0.7)', padding: '64px 0 40px' }}>
      <div className="container">
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(28px, 6vw, 48px)',
            fontWeight: 600,
            color: 'white',
            marginBottom: 8,
            lineHeight: 1.15,
          }}
        >
          আবার শুক্রবার দেখা হবে।
        </h2>
        <p style={{ fontFamily: 'var(--font-en)', fontSize: 13, letterSpacing: '0.04em', opacity: 0.5, marginBottom: 48 }}>
          See you at the next Haat.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 32,
            marginBottom: 48,
          }}
          className="footer-links"
        >
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, color: 'white', marginBottom: 16, fontSize: 14 }}>
              হাট
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
              <Link to="/friday-haat">শুক্রবারের হাট</Link>
              <Link to="/explore">অন্বেষণ</Link>
              <Link to="/creators">নির্মাতারা</Link>
              <Link to="/become-a-creator">নির্মাতা হোন</Link>
            </div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, color: 'white', marginBottom: 16, fontSize: 14 }}>
              LOCAL
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
              <Link to="/about">আমাদের কথা</Link>
              <Link to="/friday-haat/rules">হাটের নিয়ম</Link>
              <Link to="/help">সহায়তা</Link>
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.12)',
            paddingTop: 24,
            fontSize: 12,
            opacity: 0.45,
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 8,
          }}
        >
          <span>© ২০২৬ LOCAL · বাংলাদেশে তৈরি</span>
          <span style={{ fontFamily: 'var(--font-en)' }}>Made differently.</span>
        </div>
      </div>
      <style>{`
        @media (min-width: 640px) {
          .footer-links { grid-template-columns: 1fr 1fr 1fr 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
