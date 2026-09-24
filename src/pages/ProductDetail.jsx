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
  const [qty, setQty] = useState(1);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setLoading(true);
    setQty(1);
    setAdded(false);
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
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const creator = product.creator;
  const isAuthentic =
    creator?.verificationStatus === 'verified' || product.makerStatus === 'Authentic Maker';
  const originSlug = (product.originEn || product.origin || '').toLowerCase().replace(/\s+/g, '');
  const isOneOfOne = product.productType === 'one-of-one';
  const maxQty = isOneOfOne ? 1 : Math.max(1, product.availableQuantity || 1);
  const qtyLabel = isOneOfOne
    ? 'মাত্র ১টি উপলব্ধ'
    : `${product.availableQuantity}টি উপলব্ধ`;

  const buyCard = (
    <div className="pd-buy-card">
      <div className="pd-buy-badges">
        {product.isHaatActive && <span className="badge badge-haat">শুক্রবারের হাট</span>}
        {product.isHaatActive && product.haatDiscount && (
          <span className="badge badge-discount">{product.haatDiscount}% ছাড়</span>
        )}
        {isOneOfOne && <span className="badge badge-quantity">মাত্র ১টি</span>}
        {isAuthentic && <span className="badge badge-verified">✓ Authentic</span>}
      </div>

      <h1 className="pd-buy-title">{product.name}</h1>
      <p className="pd-buy-meta">
        {[product.origin, isAuthentic ? 'Authentic Maker' : null].filter(Boolean).join(' · ')}
      </p>

      <div className="pd-buy-price">
        {product.isHaatActive ? (
          <>
            <div className="pd-buy-price-row">
              <span className="price-haat" style={{ fontSize: 28 }}>{formatPrice(product.haatPrice)}</span>
              <span className="price-regular" style={{ fontSize: 15 }}>{formatPrice(product.regularPrice)}</span>
            </div>
            <p className="caption" style={{ color: 'var(--haat-accent)', marginTop: 4 }}>শুক্রবারের হাট মূল্য</p>
          </>
        ) : (
          <span className="price-current" style={{ fontSize: 28 }}>{formatPrice(product.regularPrice)}</span>
        )}
      </div>

      {product.isHaatActive && (
        <div className="pd-buy-haat">
          <span className="caption" style={{ color: 'var(--haat-accent)' }}>FRIDAY HAAT</span>
          <span className="countdown" style={{ color: 'var(--haat-accent)', fontSize: 18 }}>{product.countdown}</span>
        </div>
      )}

      <p className="pd-buy-qty-label">{qtyLabel}</p>

      {!isOneOfOne && (
        <div className="pd-qty">
          <button type="button" className="pd-qty-btn" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="কমান">−</button>
          <span className="pd-qty-val">{qty}</span>
          <button type="button" className="pd-qty-btn" onClick={() => setQty((q) => Math.min(maxQty, q + 1))} aria-label="বাড়ান">+</button>
        </div>
      )}

      <div className="pd-buy-actions">
        <button type="button" className="btn btn-haat btn-full" onClick={handleAdd}>এখনই কিনুন</button>
        <button type="button" className="btn btn-secondary-dark btn-full" onClick={handleAdd}>{added ? '✓ যোগ হয়েছে' : 'ঝুড়িতে যোগ করুন'}</button>
        <button type="button" className="pd-fav" onClick={() => setSaved((s) => !s)} aria-label="Favorite">{saved ? '♥ সংরক্ষিত' : '♡ সংরক্ষণ করুন'}</button>
      </div>

      <div className="pd-buy-trust">
        {isAuthentic && <span>✓ Authentic Maker</span>}
        <span>✓ Origin Verified</span>
        <span>✓ Secure Checkout</span>
        <span>✓ Delivery Available</span>
      </div>

      {creator && (
        <Link to={`/creator/${creator.id}`} className="pd-buy-maker">{creator.name} · {creator.location}</Link>
      )}
    </div>
  );

  return (
    <main className="pd-page">
      <div className="container pd-layout">
        <div className="pd-buy-mobile">{buyCard}</div>

        <div className="pd-left">
          <div className="pd-hero">
            <img src={getProductImage(product)} alt={product.name} />
          </div>

          <section className="pd-section">
            <p className="section-label">পণ্যের পরিচয়</p>
            {product.description && <p className="pd-desc">{product.description}</p>}
            {product.story && <p className="pd-story">{product.story}</p>}
            <div className="pd-facts">
              {product.material && (<div><div className="caption">উপকরণ</div><div>{product.material}</div></div>)}
              {(product.craftTechnique || product.technique) && (<div><div className="caption">পদ্ধতি</div><div>{product.craftTechnique || product.technique}</div></div>)}
              {product.dimensions && (<div><div className="caption">আকার</div><div>{product.dimensions}</div></div>)}
              <div><div className="caption">পরিমাণ</div><div>{isOneOfOne ? 'মাত্র ১টি' : `${product.availableQuantity}টি`}</div></div>
            </div>
          </section>

          <section className="pd-section">
            <p className="section-label">কীভাবে তৈরি হয়েছে?</p>
            <h2 className="pd-section-title">তৈরির গল্প</h2>
            <p className="text-muted" style={{ marginBottom: 12, fontSize: 14 }}>এই product তৈরির কিছু মুহূর্ত দেখুন।</p>
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
          </section>

          {creator && (
            <section className="pd-section">
              <p className="section-label">যিনি বানিয়েছেন</p>
              <div className="pd-maker">
                <div className="pd-maker-avatar">{creator.name?.[0]}</div>
                <div>
                  <div className="pd-maker-name">{creator.name}</div>
                  {isAuthentic && <span className="badge badge-verified" style={{ marginTop: 4 }}>✓ Authentic Maker</span>}
                  <p className="caption" style={{ marginTop: 6 }}>{creator.location} · {creator.specialty}</p>
                  {(creator.bio || creator.story) && (
                    <p className="pd-maker-bio">{(creator.bio || creator.story).slice(0, 160)}{(creator.bio || creator.story).length > 160 ? '…' : ''}</p>
                  )}
                  <Link to={`/creator/${creator.id}`} className="pd-link">কারিগরকে দেখুন →</Link>
                </div>
              </div>
            </section>
          )}

          <section className="pd-section">
            <p className="section-label">কোথা থেকে এসেছে?</p>
            <h2 className="pd-section-title">{product.origin}, বাংলাদেশ</h2>
            <p className="text-muted" style={{ fontSize: 14, marginBottom: 12, maxWidth: 480 }}>
              এই সৃষ্টি {product.origin} থেকে এসেছে — স্থানীয় উপকরণ, হাতের কাজ, আর স্থানীয় কারিগরের গল্প নিয়ে।
            </p>
            <Link to={`/origins/${originSlug}`} className="pd-link">{product.origin}-এর আরও সৃষ্টি →</Link>
          </section>

          <section className="pd-section">
            <p className="section-label">Product Passport</p>
            <div className="pd-passport">
              <div><div className="caption">Made by</div><div>{creator?.name}</div></div>
              <div><div className="caption">Origin</div><div>{product.origin}</div></div>
              <div><div className="caption">Material</div><div>{product.material}</div></div>
              <div><div className="caption">Technique</div><div>{product.craftTechnique || product.technique || '—'}</div></div>
              <div><div className="caption">Quantity</div><div>{isOneOfOne ? '1 of 1' : `${product.availableQuantity}`}</div></div>
              <div><div className="caption">Maker Status</div><div>{isAuthentic ? '✓ Authentic Maker' : 'Maker'}</div></div>
              {product.createdAt && (<div><div className="caption">Created</div><div>{product.createdAt}</div></div>)}
            </div>
          </section>

          <section className="pd-section">
            <p className="section-label">Authenticity</p>
            <div className="pd-auth">
              <span>{isAuthentic ? '✓' : '·'} Maker verified</span>
              <span>✓ Origin verified</span>
              <span>✓ Process documented</span>
              <span>✓ Product details verified</span>
            </div>
          </section>

          <section className="pd-section">
            <p className="section-label">Delivery & Care</p>
            <ul className="pd-delivery">
              <li>ঢাকায় ২–৪ কর্মদিবস · দেশজুড়ে ৪–৭ কর্মদিবস</li>
              <li>ডেলিভারি চার্জ চেকআউটে দেখা যাবে</li>
              {product.isFragile && <li>ভঙ্গুর পণ্য — বিশেষ প্যাকেজিং</li>}
              {isOneOfOne && <li>One of One — একবারই পাঠানো হবে</li>}
              <li>হাতে তৈরি জিনিস — যত্নসহকারে ব্যবহার করুন</li>
            </ul>
          </section>

          {related.length > 0 && (
            <section className="pd-section">
              <p className="section-label">আরও দেখুন</p>
              <h2 className="pd-section-title">এই ধরনের সৃষ্টি</h2>
              <div className="grid-products">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="pd-right">
          <div className="pd-buy-sticky">{buyCard}</div>
        </aside>
      </div>

      <div className="pd-mobile-cta">
        <div className="pd-mobile-cta-price">
          {product.isHaatActive ? (
            <span className="price-haat">{formatPrice(product.haatPrice)}</span>
          ) : (
            <span className="price-current">{formatPrice(product.regularPrice)}</span>
          )}
        </div>
        <button type="button" className="btn btn-secondary-dark" onClick={handleAdd}>{added ? '✓' : 'ঝুড়িতে'}</button>
        <button type="button" className="btn btn-haat" onClick={handleAdd}>কিনুন</button>
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
              <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 8 }}>প্রোটোটাইপে শর্ট ডকুমেন্টারি স্টাইল প্রসেস ভিডিও এখানে চলবে।</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
