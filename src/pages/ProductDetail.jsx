import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductBySlug, getProducts } from '../services/api';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/haat';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

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

  return (
    <main style={{ paddingBottom: 80 }}>
      <div style={{ aspectRatio: '1', background: '#E8E4D9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', fontSize: 14 }}>
        {product.name}
      </div>

      <div className="container" style={{ paddingTop: 24, paddingBottom: 32 }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
          {product.isHaatActive && <span className="badge badge-haat">শুক্রবারের হাট</span>}
          {product.isHaatActive && <span className="badge badge-discount">{product.haatDiscount}% ছাড়</span>}
          {product.productType === 'one-of-one' && <span className="badge badge-quantity">মাত্র ১টি</span>}
          {product.isFragile && <span className="badge badge-fragile">ভঙ্গুর</span>}
        </div>

        <h1 style={{ fontSize: 24, marginBottom: 8 }}>{product.name}</h1>
        <Link to={'/creator/' + product.creatorId} style={{ display: 'block', marginBottom: 4, fontSize: 14, color: 'var(--muted)' }}>
          {product.creator?.name} · {product.origin}
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
            <div><div className="caption">নির্মাতা</div><div style={{ fontWeight: 500 }}>{product.creator?.name}</div></div>
            <div><div className="caption">উৎস</div><div style={{ fontWeight: 500 }}>{product.origin}, বাংলাদেশ</div></div>
            <div><div className="caption">উপকরণ</div><div style={{ fontWeight: 500 }}>{product.material}</div></div>
            <div><div className="caption">পরিমাণ</div><div style={{ fontWeight: 500 }}>{product.productType === 'one-of-one' ? 'মাত্র ১টি' : product.availableQuantity + 'টি উপলব্ধ'}</div></div>
          </div>
        </div>

        {product.story && (
          <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 16, marginBottom: 8 }}>গল্প</h3>
            <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>{product.story}</p>
          </div>
        )}

        {related.length > 0 && (
          <div style={{ marginTop: 40 }}>
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
        <button className="btn btn-secondary" style={{ flex: 1 }} onClick={handleAdd}>
          {added ? '✓ যোগ হয়েছে' : 'ঝুড়িতে'}
        </button>
        <button className="btn btn-haat" style={{ flex: 2 }} onClick={handleAdd}>
          এখনই কিনুন
        </button>
      </div>
    </main>
  );
}
