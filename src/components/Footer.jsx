import { Link } from 'react-router-dom';

export default function Footer() {
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
          style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 32 }}
          className="footer-grid"
        >
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 20, marginBottom: 8 }}>
              LOCAL
            </div>
            <p className="small text-muted" style={{ maxWidth: 280 }}>
              বাংলাদেশের মানুষের তৈরি অনন্য সবকিছু। একটা বানালেও, বিক্রি করার জায়গা আছে।
            </p>
            <p className="caption" style={{ marginTop: 12 }}>বাংলাদেশে তৈরি</p>
          </div>

          <div>
            <h4 style={{ marginBottom: 12, fontSize: 14 }}>অন্বেষণ</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14 }}>
              <Link to="/friday-haat">শুক্রবারের হাট</Link>
              <Link to="/explore">সব পণ্য</Link>
              <Link to="/creators">নির্মাতারা</Link>
              <Link to="/become-a-creator">নির্মাতা হোন</Link>
            </div>
          </div>

          <div>
            <h4 style={{ marginBottom: 12, fontSize: 14 }}>সহায়তা</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14 }}>
              <Link to="/friday-haat/rules">হাটের নিয়ম</Link>
              <Link to="/about">আমাদের কথা</Link>
              <Link to="/help">সাহায্য</Link>
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
          }}
        >
          © ২০২৬ LOCAL · বাংলাদেশে তৈরি
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
