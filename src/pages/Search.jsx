import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { searchAll, getSuggestedSearches } from '../services/api';
import ProductCard from '../components/ProductCard';

export default function Search() {
  const [q, setQ] = useState('');
  const [results, setResults] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    getSuggestedSearches().then(setSuggestions);
  }, []);

  useEffect(() => {
    if (q.trim().length < 1) {
      setResults(null);
      return;
    }
    const t = setTimeout(() => {
      searchAll(q).then(setResults);
    }, 250);
    return () => clearTimeout(t);
  }, [q]);

  return (
    <main className="container" style={{ paddingTop: 24, paddingBottom: 48 }}>
      <input
        autoFocus
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="কিছু খুঁজছেন?"
        style={{
          width: '100%', height: 52, padding: '0 16px',
          border: '1px solid var(--border)', borderRadius: 10,
          fontSize: 16, background: 'var(--white)', marginBottom: 20,
        }}
      />

      {!results && (
        <div>
          <p className="caption" style={{ marginBottom: 12 }}>প্রস্তাবিত</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => setQ(s)}
                style={{
                  padding: '8px 14px', border: '1px solid var(--border)',
                  borderRadius: 8, background: 'var(--white)', fontSize: 13,
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {results && results.products.length === 0 && results.creators.length === 0 && (
        <div className="empty-state">
          <h3>আপনার খোঁজার মতো কিছু পাওয়া যায়নি।</h3>
          <Link to="/explore" className="btn btn-secondary">সব পণ্য দেখুন</Link>
        </div>
      )}

      {results && results.products.length > 0 && (
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: 16, marginBottom: 16 }}>পণ্য</h3>
          <div className="grid-products">
            {results.products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {results && results.creators.length > 0 && (
        <div>
          <h3 style={{ fontSize: 16, marginBottom: 16 }}>নির্মাতারা</h3>
          {results.creators.map((c) => (
            <Link key={c.id} to={'/creator/' + c.id} className="card" style={{ padding: 12, display: 'block', marginBottom: 8 }}>
              {c.name} · {c.location}
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
