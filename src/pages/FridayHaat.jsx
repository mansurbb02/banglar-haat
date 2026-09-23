import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import HaatCountdown from '../components/HaatCountdown';
import { getHaatProducts, getHaatEvent } from '../services/api';

export default function FridayHaat() {
  const [products, setProducts] = useState([]);
  const [haat, setHaat] = useState(null);

  useEffect(() => {
    getHaatEvent().then(setHaat);
    getHaatProducts().then(setProducts);
  }, []);

  return (
    <main>
      <section style={{ background: 'var(--ink)', color: 'white', padding: '32px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span className="live-dot" />
            <span style={{ fontSize: 12, fontWeight: 600 }}>লাইভ</span>
          </div>
          <h1 style={{ fontSize: 28, marginBottom: 8, color: 'white' }}>শুক্রবারের হাট</h1>
          <p style={{ opacity: 0.8, marginBottom: 20 }}>নতুন সৃষ্টি, মাত্র ৫ ঘণ্টার জন্য।</p>
          {haat?.status === 'ACTIVE' && (
            <HaatCountdown endTime={haat.endTime} label="হাট শেষ হবে" />
          )}
          <div style={{ marginTop: 20 }}>
            <Link to="/friday-haat/rules" style={{ fontSize: 13, textDecoration: 'underline', opacity: 0.8 }}>
              হাটের নিয়ম দেখুন
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {products.length === 0 ? (
            <div className="empty-state">
              <h3>এই সপ্তাহের হাটে এখনো কিছু আসেনি।</h3>
              <p>নতুন সৃষ্টিগুলো শুক্রবার আসছে।</p>
            </div>
          ) : (
            <div className="grid-products">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
