import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { searchAll, getSuggestedSearches } from '../services/api';
import ProductCard from '../components/ProductCard';
import { useLang } from '../context/LanguageContext';

export default function Search() {
  const [q, setQ] = useState('');
  const [results, setResults] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const { isBn } = useLang();

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
        placeholder={isBn ? 'কিছু খুঁজছেন?' : 'What are you looking for?'}
        style={{
          width: '100%',
          height: 52,
          padding: '0 16px',
          border: '1px solid var(--border)',
          borderRadius: 10,
          fontSize: 16,
          background: 'var(--white)',
          marginBottom: 20,
        }}
      />

      {!results && (
        <div>
          <p className="caption" style={{ marginBottom: 12 }}>{isBn ? 'প্রস্তাবিত' : 'Suggested'}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => setQ(s)}
                style={{
                  padding: '8px 14px',
                  border: '1px solid var(--border)',
                  borderRadius: 8,
                  background: 'var(--white)',
                  fontSize: 13,
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
          <h3>{isBn ? 'আপনার খোঁজার মতো কিছু পাওয়া যায়নি।' : 'Nothing found.'}</h3>
          <Link to="/explore" className="btn btn-secondary">{isBn ? 'সব পণ্য দেখুন' : 'View all products'}</Link>
        </div>
      )}

      {results && results.products.length > 0 && (
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: 16, marginBottom: 16 }}>{isBn ? 'পণ্য' : 'Products'}</h3>
          <div className="grid-products">
            {results.products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {results && results.creators.length > 0 && (
        <div>
          <h3 style={{ fontSize: 16, marginBottom: 16 }}>{isBn ? 'নির্মাতারা' : 'Creators'}</h3>
          {results.creators.map((c) => (
            <Link key={c.id} to={'/creator/' + c.id} className="card" style={{ padding: 12, display: 'block', marginBottom: 8 }}>
              {isBn ? c.name : c.nameEn} · {isBn ? c.location : c.locationEn}
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
