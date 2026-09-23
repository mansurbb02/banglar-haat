import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCreators } from '../services/api';
import { useLang } from '../context/LanguageContext';

export default function Creators() {
  const [creators, setCreators] = useState([]);
  const { isBn } = useLang();

  useEffect(() => {
    getCreators().then(setCreators);
  }, []);

  return (
    <main className="container" style={{ paddingTop: 24, paddingBottom: 48 }}>
      <h1 style={{ fontSize: 24, marginBottom: 8 }}>{isBn ? 'নির্মাতারা' : 'Creators'}</h1>
      <p className="text-muted" style={{ marginBottom: 24 }}>
        {isBn ? 'যিনি বানিয়েছেন, তার গল্পটাও জানুন।' : 'Know the story of the person who made it.'}
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }} className="c-grid">
        {creators.map((c) => (
          <Link key={c.id} to={'/creator/' + c.id} className="card" style={{ padding: 16, display: 'flex', gap: 16 }}>
            <div style={{ width: 64, height: 64, borderRadius: 8, background: '#E8E4D9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 22, color: 'var(--muted)', flexShrink: 0 }}>
              {(isBn ? c.name : c.nameEn)?.[0]}
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600 }}>{isBn ? c.name : c.nameEn}</div>
              <div className="caption">{(isBn ? c.location : c.locationEn) + ' · ' + (isBn ? c.specialty : c.specialtyEn)}</div>
              <div className="caption" style={{ marginTop: 4 }}>{c.creationsCount} {isBn ? 'সৃষ্টি' : 'creations'} · {c.followers} {isBn ? 'অনুসরণকারী' : 'followers'}</div>
              {c.verified && <span className="badge badge-verified" style={{ marginTop: 6 }}>{isBn ? 'যাচাইকৃত' : 'Verified'}</span>}
            </div>
          </Link>
        ))}
      </div>
      <style>{'@media (min-width: 640px) { .c-grid { grid-template-columns: repeat(2, 1fr) !important; } }'}</style>
    </main>
  );
}
