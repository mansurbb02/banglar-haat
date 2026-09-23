import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import HaatCountdown from '../components/HaatCountdown';
import { getHaatProducts, getHaatEvent } from '../services/api';
import { useLang } from '../context/LanguageContext';

export default function FridayHaat() {
  const [products, setProducts] = useState([]);
  const [haat, setHaat] = useState(null);
  const { isBn } = useLang();

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
            <span style={{ fontFamily: 'var(--font-en)', fontSize: 12, fontWeight: 600 }}>LIVE</span>
          </div>
          <h1 style={{ fontSize: 28, marginBottom: 8, color: 'white' }}>
            {isBn ? 'শুক্রবারের হাট' : 'Friday Haat'}
          </h1>
          <p style={{ opacity: 0.8, marginBottom: 20 }}>
            {isBn ? 'নতুন সৃষ্টি, মাত্র ৫ ঘণ্টার জন্য।' : 'New creations. 5 hours only.'}
          </p>
          {haat?.status === 'ACTIVE' && (
            <HaatCountdown endTime={haat.endTime} label={isBn ? 'হাট শেষ হবে' : 'Ends in'} />
          )}
          <div style={{ marginTop: 20 }}>
            <Link to="/friday-haat/rules" style={{ fontSize: 13, textDecoration: 'underline', opacity: 0.8 }}>
              {isBn ? 'হাটের নিয়ম দেখুন' : 'Haat rules'}
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {products.length === 0 ? (
            <div className="empty-state">
              <h3>{isBn ? 'এই সপ্তাহের হাটে এখনো কিছু আসেনি।' : 'Nothing in this week\'s Haat yet.'}</h3>
              <p>{isBn ? 'নতুন সৃষ্টিগুলো শুক্রবার আসছে।' : 'New creations arrive on Friday.'}</p>
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
