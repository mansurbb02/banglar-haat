import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import HaatCountdown from '../components/HaatCountdown';
import { getHaatProducts, getOneOfOneProducts, getSmallBatchProducts, getCreators, getHaatEvent } from '../services/api';
import { formatPrice } from '../utils/haat';

export default function Home() {
  const [haatProducts, setHaatProducts] = useState([]);
  const [oneOfOne, setOneOfOne] = useState([]);
  const [smallBatch, setSmallBatch] = useState([]);
  const [creators, setCreators] = useState([]);
  const [haat, setHaat] = useState(null);
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    getHaatEvent().then(setHaat);
    getHaatProducts().then(setHaatProducts);
    getOneOfOneProducts().then((p) => setOneOfOne(p.slice(0, 4)));
    getSmallBatchProducts().then((p) => setSmallBatch(p.slice(0, 4)));
    getCreators().then((c) => setCreators(c.slice(0, 4)));
  }, []);

  const heroProduct = haatProducts[heroIndex] || haatProducts[0];

  useEffect(() => {
    if (haatProducts.length < 2) return;
    const id = setInterval(() => {
      setHeroIndex((i) => (i + 1) % Math.min(haatProducts.length, 5));
    }, 6000);
    return () => clearInterval(id);
  }, [haatProducts]);

  return (
    <main>
      <section style={{ background: 'var(--ink)', color: 'var(--white)', padding: '40px 0 48px' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <span className="live-dot" />
            <span style={{ fontSize: 12, fontWeight: 600 }}>লাইভ · শুক্রবারের হাট</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px, 7vw, 52px)', fontWeight: 600, lineHeight: 1.15, marginBottom: 12, maxWidth: 640 }}>
            শুক্রবারের হাট বসেছে।
          </h1>
          <p style={{ fontSize: 16, opacity: 0.85, marginBottom: 24, maxWidth: 480 }}>
            নতুন কিছু, মাত্র ৫ ঘণ্টার জন্য। ১০–২০% হাট ছাড়।
          </p>
          {haat?.status === 'ACTIVE' && (
            <div style={{ marginBottom: 28 }}>
              <HaatCountdown endTime={haat.endTime} label="হাট শেষ হবে" />
            </div>
          )}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 40 }}>
            <Link to="/friday-haat" className="btn btn-haat">হাটে ঢুকুন</Link>
            <Link to="/explore" className="btn btn-secondary" style={{ background: 'transparent', color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}>
              সব পণ্য দেখুন
            </Link>
          </div>
          {heroProduct && (
            <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, padding: 16 }}>
              <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                <span className="badge badge-haat">শুক্রবারের হাট</span>
                <span className="badge badge-discount">{heroProduct.haatDiscount}% ছাড়</span>
              </div>
              <h3 style={{ fontSize: 20, marginBottom: 4, color: 'white' }}>{heroProduct.name}</h3>
              <p className="small" style={{ opacity: 0.7, marginBottom: 12 }}>{heroProduct.origin}</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 16 }}>
                <span style={{ fontSize: 22, fontWeight: 600, color: 'var(--haat-accent)' }}>
                  {formatPrice(heroProduct.haatPrice)}
                </span>
                <span style={{ fontSize: 14, textDecoration: 'line-through', opacity: 0.5 }}>
                  {formatPrice(heroProduct.regularPrice)}
                </span>
              </div>
              <Link to={`/product/${heroProduct.slug}`} className="btn btn-secondary" style={{ height: 44 }}>
                দেখুন
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 style={{ marginBottom: 8 }}>এই সপ্তাহের হাট</h2>
          <p className="text-muted" style={{ marginBottom: 24 }}>মাত্র ৫ ঘণ্টার জন্য, নতুন সৃষ্টিগুলো ১০–২০% কম দামে।</p>
          <div className="carousel">
            {haatProducts.map((p) => (
              <ProductCard key={p.id} product={p} variant="carousel" />
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <h2 style={{ marginBottom: 8 }}>একটাই তৈরি হয়েছে।</h2>
          <p className="text-muted" style={{ marginBottom: 24 }}>একই জিনিস আবার পাওয়া নাও যেতে পারে।</p>
          <div className="grid-products">
            {oneOfOne.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 style={{ marginBottom: 8 }}>অল্প করে বানানো। মন দিয়ে বানানো।</h2>
          <p className="text-muted" style={{ marginBottom: 24 }}>১০০টা নয়। ৫টা হলেও যথেষ্ট।</p>
          <div className="grid-products">
            {smallBatch.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <h2 style={{ marginBottom: 8 }}>বাংলাদেশের নতুন নির্মাতারা।</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
            {creators.map((c) => (
              <Link key={c.id} to={`/creator/${c.id}`} className="card" style={{ padding: 16, display: 'flex', gap: 16, alignItems: 'center' }}>
                <div style={{ width: 64, height: 64, borderRadius: 8, background: '#E8E4D9', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 20, color: 'var(--muted)' }}>
                  {c.name?.[0]}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600 }}>{c.name}</div>
                  <div className="caption">{c.location} · {c.specialty}</div>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ marginTop: 24 }}>
            <Link to="/creators" className="btn btn-secondary">সব নির্মাতা দেখুন</Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--primary-green)', color: 'white' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ color: 'white', marginBottom: 12 }}>আপনি একটা বানিয়েছেন? সেটাও বিক্রি হবে।</h2>
          <p style={{ opacity: 0.85, marginBottom: 28, maxWidth: 420, marginLeft: 'auto', marginRight: 'auto' }}>
            বড় factory নেই? সমস্যা নেই।
          </p>
          <Link to="/become-a-creator" className="btn" style={{ background: 'white', color: 'var(--primary-green)' }}>
            নির্মাতা হিসেবে শুরু করুন
          </Link>
        </div>
      </section>
    </main>
  );
}
