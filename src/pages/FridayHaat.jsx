import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import HaatCountdown from '../components/HaatCountdown';
import { getHaatProducts, getHaatEvent } from '../services/api';
import { IMG } from '../data/images';

export default function FridayHaat() {
  const [products, setProducts] = useState([]);
  const [haat, setHaat] = useState(null);

  useEffect(() => {
    getHaatEvent().then(setHaat);
    getHaatProducts().then(setProducts);
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

      <section className="section" style={{ background: 'var(--cream)' }}>
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
              {products.map((p, i) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  variant={i % 3 === 0 ? 'overlay' : i % 3 === 1 ? 'creator' : 'tag'}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
