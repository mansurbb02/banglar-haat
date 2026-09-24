import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getHaatProducts, getOneOfOneProducts, getSmallBatchProducts, getCreators, getHaatEvent } from '../services/api';
import { formatPrice } from '../utils/haat';
import { IMG, getProductImage } from '../data/images';

export default function Home() {
  const [haatProducts, setHaatProducts] = useState([]);
  const [oneOfOne, setOneOfOne] = useState([]);
  const [smallBatch, setSmallBatch] = useState([]);
  const [creators, setCreators] = useState([]);
  const [haat, setHaat] = useState(null);
  const [remaining, setRemaining] = useState({ h: '00', m: '00', s: '00' });
  const [featureIdx, setFeatureIdx] = useState(0);

  useEffect(() => {
    getHaatEvent().then(setHaat);
    getHaatProducts().then(setHaatProducts);
    getOneOfOneProducts().then((p) => setOneOfOne(p.slice(0, 4)));
    getSmallBatchProducts().then((p) => setSmallBatch(p.slice(0, 6)));
    getCreators().then((c) => setCreators(c.slice(0, 4)));
  }, []);

  useEffect(() => {
    if (!haat || haat.status !== 'ACTIVE') return;
    const tick = () => {
      const ms = Math.max(0, new Date(haat.endTime).getTime() - Date.now());
      const total = Math.floor(ms / 1000);
      setRemaining({
        h: String(Math.floor(total / 3600)).padStart(2, '0'),
        m: String(Math.floor((total % 3600) / 60)).padStart(2, '0'),
        s: String(total % 60).padStart(2, '0'),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [haat]);

  useEffect(() => {
    if (haatProducts.length < 2) return;
    const id = setInterval(() => {
      setFeatureIdx((i) => (i + 1) % Math.min(haatProducts.length, 4));
    }, 7000);
    return () => clearInterval(id);
  }, [haatProducts]);

  const feature = haatProducts[featureIdx] || haatProducts[0];
  const featuredCreator = creators[1] || creators[0];

  return (
    <main>
      <section className="photo-bleed photo-bleed--tall" style={{ backgroundImage: `url(${IMG.hero})` }}>
        <div className="photo-overlay" />
        <div className="photo-content">
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <span className="live-dot" />
              <span style={{ fontFamily: 'var(--font-en)', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em' }}>
                লাইভ · শুক্রবারের হাট
              </span>
            </div>
            <h1 className="display-xl" style={{ marginBottom: 16, maxWidth: 700 }}>হাট বসেছে।</h1>
            <p className="lead" style={{ marginBottom: 32, maxWidth: 420, opacity: 0.9 }}>
              বাংলাদেশের মানুষের হাতে তৈরি জিনিস, এখন এক জায়গায়।
            </p>
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontFamily: 'var(--font-en)', fontSize: 11, letterSpacing: '0.1em', opacity: 0.7, marginBottom: 8 }}>
                FRIDAY HAAT · ৫ ঘণ্টা · ১০–২০% কম
              </div>
              <div className="timer-blocks">
                <span className="timer-block">{remaining.h}</span>
                <span className="timer-sep">:</span>
                <span className="timer-block">{remaining.m}</span>
                <span className="timer-sep">:</span>
                <span className="timer-block">{remaining.s}</span>
              </div>
              <div className="timer-labels">
                <span>ঘণ্টা</span><span style={{ width: 12 }} /><span>মিনিট</span><span style={{ width: 12 }} /><span>সেকেন্ড</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/friday-haat" className="btn btn-haat">হাটে ঢুকুন</Link>
              <Link to="/explore" className="btn btn-secondary">সব পণ্য</Link>
            </div>
          </div>
        </div>
      </section>

      {feature && (
        <section style={{ background: 'var(--cream)', padding: 0 }}>
          <div className="container" style={{ paddingTop: 48, paddingBottom: 16 }}>
            <p className="section-label">আজকের স্টল</p>
            <h2 className="display-md" style={{ marginBottom: 24 }}>শুক্রবারের হাট</h2>
          </div>
          <div className="container" style={{ paddingBottom: 48 }}>
            <div className="stall-feature">
              <div className="stall-feature-img">
                <img src={getProductImage(feature)} alt={feature.name} />
                <div style={{ position: 'absolute', top: 16, left: 16 }}>
                  <span className="badge badge-haat">শুক্রবারের হাট</span>
                </div>
              </div>
              <div className="stall-feature-panel">
                <div style={{ marginBottom: 8 }}>
                  {feature.productType === 'one-of-one' && <span className="badge badge-quantity" style={{ marginRight: 6 }}>মাত্র ১টি</span>}
                  <span className="badge badge-discount">{feature.haatDiscount}% ছাড়</span>
                </div>
                <h3 style={{ fontSize: 22, marginBottom: 6 }}>{feature.name}</h3>
                <p className="caption" style={{ marginBottom: 16 }}>{feature.creator?.name} · {feature.origin}</p>
                <div style={{ marginBottom: 8 }}>
                  <div style={{ fontSize: 11, fontFamily: 'var(--font-en)', letterSpacing: '0.06em', color: 'var(--muted)', marginBottom: 4 }}>হাটের দাম</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                    <span className="price-haat" style={{ fontSize: 32 }}>{formatPrice(feature.haatPrice)}</span>
                    <span className="price-regular" style={{ fontSize: 16 }}>{formatPrice(feature.regularPrice)}</span>
                  </div>
                </div>
                <div style={{ marginTop: 16, marginBottom: 24 }}>
                  <span className="countdown" style={{ color: 'var(--haat-accent)', fontSize: 14 }}>{remaining.h}:{remaining.m}:{remaining.s} বাকি</span>
                </div>
                <Link to={`/product/${feature.slug}`} className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>দেখুন</Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <section style={{ background: 'var(--warm-white)', padding: '48px 0 32px' }}>
        <div className="container" style={{ marginBottom: 16 }}>
          <p className="section-label">এই সপ্তাহে হাটে এসেছে</p>
          <h2 className="display-md">নতুন স্টল</h2>
        </div>
        <div className="stall-scroll">
          {haatProducts.map((p, i) => (
            <ProductCard key={p.id} product={p} variant={i % 3 === 0 ? 'overlay' : 'tag'} size={i === 0 ? 'lg' : i === 1 ? 'md' : 'sm'} />
          ))}
        </div>
        <div className="container" style={{ paddingTop: 8 }}>
          <Link to="/friday-haat" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 15, borderBottom: '1px solid var(--ink)' }}>পুরো হাট দেখুন →</Link>
        </div>
      </section>

      <section className="photo-bleed photo-bleed--mid" style={{ backgroundImage: `url(${IMG.ceramics})` }}>
        <div className="photo-overlay--heavy" />
        <div className="photo-content">
          <div className="container">
            <p className="section-label section-label--light">1 OF 1</p>
            <h2 className="display-lg" style={{ marginBottom: 12 }}>একটাই।</h2>
            <p className="lead" style={{ maxWidth: 360, marginBottom: 28 }}>একইভাবে আরেকটা বানানো হবে না।</p>
            <Link to="/explore" className="btn btn-secondary">একক সৃষ্টি দেখুন</Link>
          </div>
        </div>
      </section>

      {oneOfOne.length > 0 && (
        <section className="section" style={{ background: 'var(--cream)', paddingTop: 48 }}>
          <div className="container">
            <div className="masonry">
              {oneOfOne.map((p, i) => (
                <div key={p.id} style={{ gridColumn: i === 0 ? 'span 2' : undefined }}>
                  <ProductCard product={p} variant={i === 0 ? 'editorial' : 'tag'} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {featuredCreator && (
        <section className="photo-bleed photo-bleed--tall" style={{ backgroundImage: `url(${IMG.workshop})` }}>
          <div className="photo-overlay" />
          <div className="photo-content">
            <div className="container">
              <p className="section-label section-label--light">নির্মাতার গল্প</p>
              <h2 className="display-md" style={{ marginBottom: 4 }}>{featuredCreator.name}</h2>
              <p style={{ opacity: 0.75, marginBottom: 24, fontSize: 14 }}>{featuredCreator.location} · {featuredCreator.specialty}</p>
              <blockquote className="quote-block" style={{ marginBottom: 28 }}>
                “একটা কাজ শেষ করতে সময় লাগে। তাই একসাথে অনেক বানাতে পারি না।”
              </blockquote>
              <p style={{ opacity: 0.8, maxWidth: 400, marginBottom: 28, fontSize: 15 }}>
                LOCAL দেয় ছোট নির্মাতাদের — অল্প কয়েকটা জিনিস বিক্রি করার জায়গা।
              </p>
              <Link to={`/creator/${featuredCreator.id}`} className="btn btn-secondary">তার কাজ দেখুন</Link>
            </div>
          </div>
        </section>
      )}

      <section className="photo-bleed photo-bleed--mid" style={{ backgroundImage: `url(${IMG.rural})` }}>
        <div className="photo-overlay--light" />
        <div className="photo-content" style={{ textAlign: 'center' }}>
          <div className="container">
            <h2 className="display-md" style={{ marginBottom: 12 }}>গ্রামের হাট থেকে আপনার ঘরে।</h2>
            <p className="lead" style={{ maxWidth: 440, margin: '0 auto 36px', opacity: 0.9 }}>
              একজনের হাতে তৈরি জিনিস, আরেকজনের ঘরের অংশ হয়ে যায়।
            </p>
            <div className="journey">
              <span className="journey-step">নির্মাতা</span>
              <span className="journey-arrow">→</span>
              <span className="journey-step">হাট</span>
              <span className="journey-arrow">→</span>
              <span className="journey-step">আপনি</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--warm-white)' }}>
        <div className="container">
          <p className="section-label">কোথা থেকে এসেছে</p>
          <h2 className="display-md" style={{ marginBottom: 32 }}>বাংলাদেশের কোণে কোণে</h2>
          <div className="origin-grid">
            {[
              { name: 'কুষ্টিয়া', craft: 'কাঠ ও টেরাকোটা', img: IMG.wood },
              { name: 'টাঙ্গাইল', craft: 'নকশিকাঁথা', img: IMG.textile },
              { name: 'সিলেট', craft: 'শীতল পাটি', img: IMG.fabric },
              { name: 'রাজশাহী', craft: 'পাট ও মাটি', img: IMG.baskets },
            ].map((o) => (
              <Link key={o.name} to="/explore" className="origin-card">
                <img src={o.img} alt={o.name} loading="lazy" />
                <div className="origin-card-label">
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 18 }}>{o.name}</div>
                  <div style={{ fontSize: 12, opacity: 0.8, marginTop: 2 }}>{o.craft}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--ink)', padding: '64px 0 0' }}>
        <div className="container" style={{ marginBottom: 32 }}>
          <p className="section-label section-label--light">ঐতিহ্য</p>
          <h2 className="display-md" style={{ color: 'white', marginBottom: 8 }}>পুরোনো কাজ। নতুন করে দেখা।</h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 400 }}>বাংলার পুরোনো কারুশিল্প আজকের ঘরে নতুনভাবে ফিরে আসছে।</p>
        </div>
        <div className="heritage-strip">
          {[
            { label: 'মাটি', img: IMG.terracotta },
            { label: 'বাঁশ', img: IMG.bamboo },
            { label: 'কাঠ', img: IMG.wood },
            { label: 'কাপড়', img: IMG.textile },
            { label: 'কাঁসা', img: IMG.brass },
            { label: 'পাটি', img: IMG.fabric },
          ].map((h) => (
            <div key={h.label} className="heritage-item">
              <img src={h.img} alt={h.label} loading="lazy" />
              <span>{h.label}</span>
            </div>
          ))}
        </div>
        <div style={{ height: 48 }} />
      </section>

      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <p className="section-label">হাটের গলি ০২</p>
          <h2 className="display-md" style={{ marginBottom: 8 }}>অল্প করে বানানো।</h2>
          <p className="text-muted" style={{ marginBottom: 32, maxWidth: 360 }}>১০০টা নয়। ৫টা হলেও যথেষ্ট।</p>
          <div className="stall-scroll" style={{ paddingLeft: 0, paddingRight: 0, margin: '0 -16px' }}>
            <div style={{ width: 16, flexShrink: 0 }} />
            {smallBatch.map((p, i) => (
              <ProductCard key={p.id} product={p} variant={i % 2 === 0 ? 'creator' : 'tag'} size="md" />
            ))}
            <div style={{ width: 16, flexShrink: 0 }} />
          </div>
        </div>
      </section>

      <section className="section-green">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="display-lg" style={{ marginBottom: 16 }}>যা সবাই বানায় না।</h2>
          <p style={{ fontSize: 18, opacity: 0.85, maxWidth: 400, margin: '0 auto 40px' }}>তাই LOCAL-এ আসে।</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 40 }}>
            {haatProducts.slice(0, 4).map((p) => (
              <Link key={p.id} to={`/product/${p.slug}`} style={{ width: 80, height: 80, borderRadius: 8, overflow: 'hidden', border: '2px solid rgba(245,242,235,0.3)' }}>
                <img src={getProductImage(p)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Link>
            ))}
          </div>
          <Link to="/explore" className="btn btn-on-green">অন্বেষণ করুন</Link>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--warm-white)' }}>
        <div className="container">
          <p className="section-label">নতুন সৃষ্টি</p>
          <h2 className="display-md" style={{ marginBottom: 8 }}>বাংলাদেশ শুধু ঐতিহ্য বানায় না।</h2>
          <p className="text-muted" style={{ marginBottom: 32 }}>নতুন জিনিসও বানায়।</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
            {creators.map((c) => (
              <Link key={c.id} to={`/creator/${c.id}`} style={{ display: 'flex', gap: 16, alignItems: 'center', padding: 16, background: 'var(--white)', border: '1px solid var(--border-soft)' }}>
                <div style={{ width: 72, height: 72, borderRadius: 4, overflow: 'hidden', flexShrink: 0, background: '#E8E4D9' }}>
                  <img src={IMG.artisan} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 17 }}>{c.name}</div>
                  <div className="caption" style={{ marginTop: 2 }}>{c.location} · {c.specialty}</div>
                  <div className="caption" style={{ marginTop: 4 }}>{c.creationsCount} সৃষ্টি</div>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ marginTop: 28 }}>
            <Link to="/creators" className="btn btn-secondary-dark">সব নির্মাতা</Link>
          </div>
        </div>
      </section>

      <section className="photo-bleed photo-bleed--short" style={{ backgroundImage: `url(${IMG.handsClay})` }}>
        <div className="photo-overlay" />
        <div className="photo-content" style={{ textAlign: 'center' }}>
          <div className="container">
            <h2 className="display-md" style={{ marginBottom: 12 }}>আপনি একটা বানিয়েছেন?</h2>
            <p style={{ opacity: 0.85, marginBottom: 28, maxWidth: 360, marginLeft: 'auto', marginRight: 'auto' }}>
              সেটাও বিক্রি হবে। বড় factory দরকার নেই।
            </p>
            <Link to="/become-a-creator" className="btn btn-haat">নির্মাতা হিসেবে শুরু করুন</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
