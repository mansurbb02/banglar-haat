import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCreatorById } from '../services/api';
import ProductCard from '../components/ProductCard';

export default function CreatorProfile() {
  const { slug } = useParams();
  const [creator, setCreator] = useState(null);

  useEffect(() => {
    getCreatorById(slug).then(setCreator);
  }, [slug]);

  if (!creator) {
    return <div className="container" style={{ padding: 48, textAlign: 'center' }}><p className="text-muted">লোড হচ্ছে…</p></div>;
  }

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
            {creator.verified && <span className="badge badge-verified">যাচাইকৃত নির্মাতা</span>}
            <p style={{ marginTop: 12, fontSize: 14, color: 'var(--muted)', maxWidth: 480 }}>{creator.bio}</p>
            <button className="btn btn-secondary" style={{ marginTop: 16, height: 40, fontSize: 13 }}>
              এই নির্মাতাকে অনুসরণ করুন
            </button>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <h2 style={{ fontSize: 20, marginBottom: 8 }}>আমি যা বানাই</h2>
          {creator.story && <p className="text-muted" style={{ marginBottom: 24 }}>{creator.story}</p>}
          <div className="grid-products">
            {(creator.products || []).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
