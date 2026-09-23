import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/haat';

export default function Cart() {
  const { items, subtotal, updateQty, removeFromCart, itemCount } = useCart();

  if (itemCount === 0) {
    return (
      <div className="empty-state">
        <h3>আপনার হাটের ঝুড়ি এখনো খালি।</h3>
        <p>নতুন সৃষ্টিগুলো দেখতে হাটে ঘুরে আসুন।</p>
        <Link to="/friday-haat" className="btn btn-haat">হাটে ঘুরে আসুন</Link>
      </div>
    );
  }

  return (
    <main className="container" style={{ paddingTop: 24, paddingBottom: 48 }}>
      <h1 style={{ fontSize: 24, marginBottom: 24 }}>ঝুড়ি ({itemCount})</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
        {items.map(({ product, quantity, lockedPrice, isHaat }) => (
          <div key={product.id} className="card" style={{ padding: 12, display: 'flex', gap: 12 }}>
            <div style={{ width: 80, height: 80, background: '#E8E4D9', borderRadius: 6, flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 14 }}>
                {product.name}
              </div>
              <div className="caption">{product.origin}</div>
              <div style={{ marginTop: 4, display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span className={isHaat ? 'price-haat' : 'price-current'} style={{ fontSize: 15 }}>
                  {formatPrice(lockedPrice)}
                </span>
                {isHaat && (
                  <span className="caption" style={{ color: 'var(--haat-accent)' }}>হাট মূল্য</span>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
                <button
                  onClick={() => updateQty(product.id, quantity - 1)}
                  style={{ width: 32, height: 32, border: '1px solid var(--border)', borderRadius: 6 }}
                >−</button>
                <span style={{ fontWeight: 600 }}>{quantity}</span>
                <button
                  onClick={() => updateQty(product.id, quantity + 1)}
                  style={{ width: 32, height: 32, border: '1px solid var(--border)', borderRadius: 6 }}
                  disabled={quantity >= product.availableQuantity}
                >+</button>
                <button onClick={() => removeFromCart(product.id)} className="caption" style={{ marginLeft: 'auto', color: 'var(--error)' }}>
                  সরান
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: 20, marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span>সাবটোটাল</span>
          <span style={{ fontWeight: 600 }}>{formatPrice(subtotal)}</span>
        </div>
        <p className="caption" style={{ marginBottom: 16 }}>
          শুক্রবারের হাট মূল্য হাট শেষ পর্যন্ত প্রযোজ্য। ডেলিভারি চার্জ চেকআউটে হিসাব হবে।
        </p>
        <Link to="/checkout" className="btn btn-primary btn-full">চেকআউট</Link>
      </div>
    </main>
  );
}
