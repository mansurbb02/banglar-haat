import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductBySlug, getProducts } from '../services/api';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/haat';
import ProductCard from '../components/ProductCard';
import { getProductImage, IMG } from '../data/images';

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    getProductBySlug(slug).then((p) => {
      setProduct(p);
      setLoading(false);
      if (p) {
        getProducts({ category: p.category }).then((list) => {
          setRelated(list.filter((x) => x.id !== p.id).slice(0, 4));
        });
      }
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="container" style={{ padding: '48px 16px', textAlign: 'center' }}>
        <p className="text-muted">লোড হচ্ছে…</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="empty-state">
        <h3>পণ্য পাওয়া যায়নি</h3>
        <Link to="/explore" className="btn btn-primary">সব পণ্য দেখুন</Link>
      </div>
    );
  }

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const qtyLabel =
    product.productType === 'one-of-one'
      ? 'মাত্র ১টি উপলব্ধ'
      : product.availableQuantity + 'টি উপলব্ধ';

  const creator = product.creator;
  const isAuthentic =
    creator?.verificationStatus === 'verified' || product.makerStatus === 'Authentic Maker';
  const originSlug = (product.originEn || product.origin || '').toLowerCase().replace(/\s+/g, '');

  return (
    <main style={{ paddingBottom: 80 }}>
      <div style={{ aspectRatio: '1', background: '#E8E4D9', position: 'relative', overflow: 'hidden' }}>
        <img src={getProductImage(product)} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      <div className="container" style={{ paddingTop: 24, paddingBottom: 32 }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
          {product.isHaatActive && <span className="badge badge-haat">শুক্রবারের হাট</span>}
          {product.isHaatActive && <span className="badge badge-discount">{product.haatDiscount}% ছাড়</span>}
          {product.productType === 'one-of-one' && <span className="badge badge-quantity">মাত্র ১টি</span>}
          {isAuthentic && <span className="badge badge-verified">✓ Authentic Maker</span>}
          {product.isFragile && <span className="badge badge-fragile">ভঙ্গুর</span>}
        </div>

        <h1 style={{ fontSize: 24, marginBottom: 8 }}>{product.name}</h1>
        <Link to={'/creator/' + product.creatorId} style={{ display: 'block', marginBottom: 4, fontSize: 14, color: 'var(--muted)' }}>
          {creator?.name} · {product.origin}
        </Link>
        <p className="caption" style={{ marginBottom: 16 }}>{qtyLabel}</p>

        <div style={{ marginBottom: 16 }}>
          {product.isHaatActive ? (
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                <span className="price-haat" style={{ fontSize: 28 }}>{formatPrice(product.haatPrice)}</span>
                <span className="price-regular" style={{ fontSize: 16 }}>{formatPrice(product.regularPrice)}</span>
              </div>
              <p className="caption" style={{ marginTop: 4, color: 'var(--haat-accent)' }}>শুক্রবারের হাট মূল্য</p>
            </div>
          ) : (
            <span className="price-current" style={{ fontSize: 28 }}>{formatPrice(product.regularPrice)}</span>
          )}
        </div>

        {product.isHaatActive && (
          <div className="bg-soft-haat" style={{ padding: '12px 16px', borderRadius: 8, marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--haat-accent)' }}>হাট শেষ হতে বাকি</span>
            <span className="countdown" style={{ color: 'var(--haat-accent)', fontSize: 18 }}>{product.countdown}</span>
          </div>
        )}

        <div className="card" style={{ padding: 20, marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, marginBottom: 16 }}>এই পণ্যটির পরিচয়</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 16px', fontSize: 14 }}>
            <div><div className="caption">নির্মাতা</div><div style={{ fontWeight: 500 }}>{creator?.name}</div></div>
            <div>
              <div className="caption">উৎস</div>
              <div style={{ fontWeight: 500 }}>
                <Link to={`/origins/${originSlug}`} style={{ borderBottom: '1px solid var(--border)' }}>{product.origin}, বাংলাদেশ</Link>
              </div>
            </div>
            <div><div className="caption">উপকরণ</div><div style={{ fontWeight: 500 }}>{product.material}</div></div>
            <div><div className="caption">পরিমাণ</div><div style={{ fontWeight: 500 }}>{product.productType === 'one-of-one' ? 'মাত্র ১টি' : product.availableQuantity + 'টি উপলব্ধ'}</div></div>
            {(product.craftTechnique || product.technique) && (
              <div><div className="caption">পদ্ধতি</div><div style={{ fontWeight: 500 }}>{product.craftTechnique || product.technique}</div></div>
            )}
            <div><div className="caption">Maker Status</div><div style={{ fontWeight: 500 }}>{isAuthentic ? '✓ Authentic Maker' : 'Maker'}</div></div>
          </div>
        </div>

        {creator && (
          <div className="card" style={{ padding: 20, marginBottom: 24 }}>
            <p className="section-label" style={{ marginBottom: 12 }}>যিনি বানিয়েছেন</p>
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{ width: 64, height: 64, borderRadius: 4, background: '#E8E4D9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 22, color: 'var(--muted)', flexShrink: 0 }}>{creator.name?.[0]}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 17 }}>{creator.name}</div>
                {isAuthentic && <span className="badge badge-verified" style={{ marginTop: 4 }}>✓ Authentic Maker</span>}
                <p className="caption" style={{ marginTop: 6 }}>{creator.location} · {creator.specialty}</p>
                {(creator.bio || creator.story) && (
                  <p style={{ marginTop: 10, fontSize: 14, color: 'var(--muted)', lineHeight: 1.6 }}>
                    {(creator.bio || creator.story).slice(0, 140)}{(creator.bio || creator.story).length > 140 ? '…' : ''}
                  </p>
                )}
                <Link to={`/creator/${creator.id}`} style={{ display: 'inline-block', marginTop: 12, fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 14, borderBottom: '1px solid var(--ink)' }}>
                  কারিগরকে দেখুন →
                </Link>
              </div>
            </div>
          </div>
        )}

        <div style={{ marginBottom: 24 }}>
          <p className="section-label" style={{ marginBottom: 8 }}>কীভাবে তৈরি হয়েছে?</p>
          <h3 style={{ fontSize: 18, marginBottom: 12 }}>তৈরির গল্প</h3>
          <button type="button" className="process-video" onClick={() => setVideoOpen(true)} aria-label="তৈরির ভিডিও দেখুন">
            <img src={product.processVideoPoster || IMG.handsClay} alt="" className="process-video-poster" />
            <div className="process-video-overlay">
              <span className="process-video-play">▶</span>
              <div>
                <div className="caption" style={{ color: 'rgba(255,255,255,0.75)', marginBottom: 4 }}>MAKING PROCESS · {product.processVideoDuration || '00:24'}</div>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 15 }}>{creator?.name}</div>
                <div style={{ fontSize: 13, opacity: 0.85 }}>{product.origin}</div>
              </div>
            </div>
          </button>
        </div>

        <div style={{ marginBottom: 24 }}>
          <p className="section-label" style={{ marginBottom: 10 }}>Authenticity</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 13 }}>
            <div style={{ padding: '10px 12px', background: 'var(--white)', border: '1px solid var(--border-soft)' }}>{isAuthentic ? '✓' : '·'} Maker verified</div>
            <div style={{ padding: '10px 12px', background: 'var(--white)', border: '1px solid var(--border-soft)' }}>✓ Origin verified</div>
            <div style={{ padding: '10px 12px', background: 'var(--white)', border: '1px solid var(--border-soft)' }}>✓ Process documented</div>
            <div style={{ padding: '10px 12px', background: 'var(--white)', border: '1px solid var(--border-soft)' }}>✓ Product details verified</div>
          </div>
        </div>

        {product.story && (
          <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 16, marginBottom: 8 }}>গল্প</h3>
            <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>{product.story}</p>
          </div>
        )}

        <div style={{ marginBottom: 32, padding: 20, background: 'var(--cream)', border: '1px solid var(--border-soft)' }}>
          <p className="section-label" style={{ marginBottom: 12 }}>জায়গা থেকে ঘরে</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, fontFamily: 'var(--font-heading)', fontSize: 13, fontWeight: 500 }}>
            <Link to={`/origins/${originSlug}`} style={{ borderBottom: '1px solid var(--ink)' }}>{product.origin}</Link>
            <span style={{ opacity: 0.4 }}>→</span><span>Workshop</span>
            <span style={{ opacity: 0.4 }}>→</span><span>Handmade</span>
            <span style={{ opacity: 0.4 }}>→</span>
            <Link to="/friday-haat" style={{ borderBottom: '1px solid var(--ink)' }}>Friday Haat</Link>
            <span style={{ opacity: 0.4 }}>→</span><span>আপনার ঘর</span>
          </div>
        </div>

        {related.length > 0 && (
          <div style={{ marginTop: 24 }}>
            <h3 style={{ marginBottom: 16 }}>আরও দেখুন</h3>
            <div className="grid-products">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="sticky-cta">
        <button className="btn btn-secondary" style={{ flex: 1 }} onClick={handleAdd}>{added ? '✓ যোগ হয়েছে' : 'ঝুড়িতে'}</button>
        <button className="btn btn-haat" style={{ flex: 2 }} onClick={handleAdd}>এখনই কিনুন</button>
      </div>

      {videoOpen && (
        <div className="process-modal" role="dialog" aria-modal="true" onClick={() => setVideoOpen(false)}>
          <div className="process-modal-inner" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="process-modal-close" onClick={() => setVideoOpen(false)} aria-label="বন্ধ">×</button>
            <div className="process-modal-media">
              <img src={product.processVideoPoster || IMG.handsClay} alt="Making process" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: 16 }}>
              <p className="caption" style={{ marginBottom: 4 }}>MAKING PROCESS · {product.processVideoDuration || '00:24'}</p>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600 }}>{creator?.name} · {product.origin}</p>
              <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 8 }}>
                প্রোটোটাইপে শর্ট ডকুমেন্টারি স্টাইল প্রসেস ভিডিও এখানে চলবে।
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
