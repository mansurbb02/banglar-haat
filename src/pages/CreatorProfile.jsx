import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCreatorById } from '../services/api';
import ProductCard from '../components/ProductCard';
import { IMG } from '../data/images';

export default function CreatorProfile() {
  const { slug } = useParams();
  const [creator, setCreator] = useState(null);

  useEffect(() => {
    getCreatorById(slug).then(setCreator);
  }, [slug]);

  if (!creator) {
    return (
      <div className="container" style={{ padding: 48, textAlign: 'center' }}>
        <p className="text-muted">লোড হচ্ছে…</p>
      </div>
    );
  }

  const isAuthentic = creator.verificationStatus === 'verified';
  const haatProducts = (creator.products || []).filter((p) => p.isHaatActive);
  const originSlug = (creator.locationEn || creator.location || '').toLowerCase().replace(/\s+/g, '');

  return (
    <main>
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)', padding: '32px 0' }}>
        <div className="container" style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
          <div style={{ width: 80, height: 80, borderRadius: 12, background: '#E8E4D9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 28, color: 'var(--muted)', flexShrink: 0 }}>
            {creator.name?.[0]}
          </div>
          <div>
            <h1 style={{ fontSize: 22, marginBottom: 4 }}>{creator.name}</h1>
            <p className="caption" style={{ marginBottom: 8 }}>{creator.location} · {creator.specialty}</p>
            {isAuthentic ? (
              <span className="badge badge-verified">✓ Authentic Maker</span>
            ) : (
              <span className="badge" style={{ background: 'var(--border-soft)', color: 'var(--muted)' }}>Maker</span>
            )}
            <p style={{ marginTop: 12, fontSize: 14, color: 'var(--muted)', maxWidth: 480 }}>{creator.bio}</p>
            <div style={{ marginTop: 12 }}>
              <Link to={`/origins/${originSlug}`} style={{ fontSize: 13, borderBottom: '1px solid var(--ink)', fontFamily: 'var(--font-heading)' }}>
                {creator.location} দেখুন →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {creator.story && (
        <section style={{ background: 'var(--cream)', padding: '32px 0' }}>
          <div className="container">
            <p className="section-label">গল্প</p>
            <blockquote className="quote-block" style={{ fontSize: 18, maxWidth: 520 }}>“{creator.story}”</blockquote>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <h2 style={{ fontSize: 20, marginBottom: 8 }}>আমার তৈরি</h2>
          <p className="text-muted" style={{ marginBottom: 24 }}>{creator.creationsCount || (creator.products || []).length} সৃষ্টি</p>
          <div className="grid-products">
            {(creator.products || []).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <p className="section-label">Making Process</p>
          <h2 style={{ fontSize: 20, marginBottom: 16 }}>কীভাবে বানান</h2>
          <div style={{ position: 'relative', aspectRatio: '16/10', maxWidth: 480, borderRadius: 4, overflow: 'hidden', background: '#E8E4D9' }}>
            <img src={IMG.workshop} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 40%, rgba(0,0,0,0.55))', display: 'flex', alignItems: 'flex-end', padding: 16, color: 'white' }}>
              <div>
                <div className="caption" style={{ color: 'rgba(255,255,255,0.7)' }}>PROCESS · {creator.processVideoDuration || '00:24'}</div>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600 }}>{creator.name} · {creator.location}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {haatProducts.length > 0 && (
        <section className="section" style={{ background: 'var(--warm-white)' }}>
          <div className="container">
            <p className="section-label">শুক্রবারের হাট</p>
            <h2 style={{ fontSize: 20, marginBottom: 24 }}>এই সপ্তাহে হাটে</h2>
            <div className="grid-products">
              {haatProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
