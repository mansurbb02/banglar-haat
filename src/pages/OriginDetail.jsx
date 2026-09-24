import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOriginDetail } from '../services/api';
import ProductCard from '../components/ProductCard';
import { IMG } from '../data/images';

export default function OriginDetail() {
  const { slug } = useParams();
  const [origin, setOrigin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getOriginDetail(slug).then((o) => {
      setOrigin(o);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="container" style={{ padding: 48, textAlign: 'center' }}>
        <p className="text-muted">লোড হচ্ছে…</p>
      </div>
    );
  }

  if (!origin) {
    return (
      <div className="empty-state">
        <h3>এই অঞ্চল পাওয়া যায়নি</h3>
        <Link to="/explore" className="btn btn-primary">সব পণ্য দেখুন</Link>
      </div>
    );
  }

  return (
    <main>
      <section
        className="photo-bleed photo-bleed--mid"
        style={{ backgroundImage: `url(${origin.coverImage || IMG.rural})`, minHeight: '45vh' }}
      >
        <div className="photo-overlay" />
        <div className="photo-content">
          <div className="container">
            <p className="section-label section-label--light">কোথা থেকে এসেছে</p>
            <h1 className="display-md" style={{ marginBottom: 8 }}>{origin.name}</h1>
            <p style={{ opacity: 0.9, maxWidth: 420, marginBottom: 8 }}>{origin.description}</p>
            {origin.division && (
              <p className="caption" style={{ color: 'rgba(255,255,255,0.7)' }}>{origin.division} বিভাগ</p>
            )}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <p className="section-label">এই জায়গা থেকে কী তৈরি হয়?</p>
          <h2 className="display-md" style={{ marginBottom: 20, fontSize: 22 }}>স্থানীয় কারুশিল্প</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {(origin.crafts || []).map((c) => (
              <span key={c} style={{ padding: '8px 14px', background: 'var(--white)', border: '1px solid var(--border)', fontSize: 14, fontFamily: 'var(--font-heading)' }}>{c}</span>
            ))}
          </div>
        </div>
      </section>

      {origin.makers?.length > 0 && (
        <section className="section" style={{ background: 'var(--warm-white)' }}>
          <div className="container">
            <p className="section-label">এখানকার কারিগর</p>
            <h2 className="display-md" style={{ marginBottom: 24, fontSize: 22 }}>যারা এখানে বানান</h2>
            <div style={{ display: 'grid', gap: 12 }}>
              {origin.makers.map((m) => (
                <Link key={m.id} to={`/creator/${m.id}`} style={{ display: 'flex', gap: 16, alignItems: 'center', padding: 16, background: 'var(--white)', border: '1px solid var(--border-soft)' }}>
                  <div style={{ width: 56, height: 56, borderRadius: 4, background: '#E8E4D9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 20, color: 'var(--muted)', flexShrink: 0 }}>{m.name?.[0]}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 16 }}>{m.name}</div>
                    <div className="caption" style={{ marginTop: 2 }}>{m.location} · {m.specialty}</div>
                    {m.verificationStatus === 'verified' && (
                      <span className="badge badge-verified" style={{ marginTop: 6 }}>✓ Authentic Maker</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {origin.haatProducts?.length > 0 && (
        <section className="section" style={{ background: 'var(--cream)' }}>
          <div className="container">
            <p className="section-label">শুক্রবারের হাট</p>
            <h2 className="display-md" style={{ marginBottom: 24, fontSize: 22 }}>এখান থেকে হাটে এসেছে</h2>
            <div className="grid-products">
              {origin.haatProducts.map((p) => (
                <ProductCard key={p.id} product={p} variant="tag" />
              ))}
            </div>
          </div>
        </section>
      )}

      {origin.products?.length > 0 && (
        <section className="section" style={{ background: 'var(--warm-white)' }}>
          <div className="container">
            <p className="section-label">সব সৃষ্টি</p>
            <h2 className="display-md" style={{ marginBottom: 24, fontSize: 22 }}>{origin.name} থেকে</h2>
            <div className="grid-products">
              {origin.products.map((p) => (
                <ProductCard key={p.id} product={p} variant="tag" />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
