import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import HaatCountdown from '../components/HaatCountdown';
import { getHaatProducts, getHaatEvent, getHaatOriginSummary } from '../services/api';
import { IMG } from '../data/images';

export default function FridayHaat() {
  const [products, setProducts] = useState([]);
  const [haat, setHaat] = useState(null);
  const [originSummary, setOriginSummary] = useState([]);

  useEffect(() => {
    getHaatEvent().then(setHaat);
    getHaatProducts().then(setProducts);
    getHaatOriginSummary().then(setOriginSummary);
  }, []);

  return (
    <main>
      <section
        className="photo-bleed photo-bleed--mid"
        style={{ backgroundImage: `url(${IMG.marketClose})`, minHeight: '50vh' }}
      >
        <div className="photo-overlay" />
        <div className="photo-content">
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span className="live-dot" />
              <span style={{ fontFamily: 'var(--font-en)', fontSize: 12, fontWeight: 600, letterSpacing: '0.06em' }}>লাইভ</span>
            </div>
            <h1 className="display-md" style={{ marginBottom: 8 }}>শুক্রবারের হাট</h1>
            <p style={{ opacity: 0.85, marginBottom: 24, maxWidth: 360 }}>
              নতুন সৃষ্টি, মাত্র ৫ ঘণ্টার জন্য। ১০–২০% হাট ছাড়।
            </p>
            {haat?.status === 'ACTIVE' && (
              <HaatCountdown endTime={haat.endTime} label="হাট শেষ হবে" light />
            )}
            <div style={{ marginTop: 20 }}>
              <Link to="/friday-haat/rules" style={{ fontSize: 13, textDecoration: 'underline', opacity: 0.8 }}>
                হাটের নিয়ম দেখুন
              </Link>
            </div>
          </div>
        </div>
      </section>

      {originSummary.length > 0 && (
        <section style={{ background: 'var(--cream)', padding: '32px 0' }}>
          <div className="container">
            <p className="section-label">এই সপ্তাহে কোথা থেকে?</p>
            <h2 style={{ fontSize: 20, marginBottom: 16, fontFamily: 'var(--font-heading)' }}>
              বাংলাদেশের বিভিন্ন জায়গা থেকে হাটে এসেছে
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {originSummary.map((o) => {
                const slug = (o.nameEn || o.name || '').toLowerCase().replace(/\s+/g, '');
                return (
                  <Link
                    key={o.nameEn || o.name}
                    to={`/origins/${slug}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '10px 16px',
                      background: 'var(--white)',
                      border: '1px solid var(--border)',
                      fontFamily: 'var(--font-heading)',
                      fontSize: 14,
                      fontWeight: 500,
                    }}
                  >
                    <span>📍</span>
                    <span>{o.name}</span>
                    <span className="caption" style={{ marginLeft: 4 }}>{o.count} সৃষ্টি</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="section" style={{ background: 'var(--warm-white)' }}>
        <div className="container">
          <p className="section-label">হাটের স্টল</p>
          <h2 className="display-md" style={{ marginBottom: 28 }}>এখন হাটে আছে</h2>
          {products.length === 0 ? (
            <div className="empty-state">
              <h3>এই সপ্তাহের হাটে এখনো কিছু আসেনি।</h3>
              <p>নতুন সৃষ্টিগুলো শুক্রবার আসছে।</p>
            </div>
          ) : (
            <div className="grid-products">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} variant="tag" />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
