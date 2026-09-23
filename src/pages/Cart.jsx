import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLang } from '../context/LanguageContext';
import { formatPrice } from '../utils/haat';

export default function Cart() {
  const { items, subtotal, updateQty, removeFromCart, itemCount } = useCart();
  const { isBn } = useLang();

  if (itemCount === 0) {
    return (
      <div className="empty-state">
        <h3>{isBn ? 'আপনার হাটের ঝুড়ি এখনো খালি।' : 'Your Haat basket is still empty.'}</h3>
        <p>{isBn ? 'নতুন সৃষ্টিগুলো দেখতে হাটে ঘুরে আসুন।' : 'Visit the Haat to discover new creations.'}</p>
        <Link to="/friday-haat" className="btn btn-haat">{isBn ? 'হাটে ঘুরে আসুন' : 'Browse the Haat'}</Link>
      </div>
    );
  }

  return (
    <main className="container" style={{ paddingTop: 24, paddingBottom: 48 }}>
      <h1 style={{ fontSize: 24, marginBottom: 24 }}>{isBn ? 'ঝুড়ি' : 'Cart'} ({itemCount})</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
        {items.map(({ product, quantity, lockedPrice, isHaat }) => (
          <div key={product.id} className="card" style={{ padding: 12, display: 'flex', gap: 12 }}>
            <div style={{ width: 80, height: 80, background: '#E8E4D9', borderRadius: 6, flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 14 }}>
                {isBn ? product.name : product.nameEn}
              </div>
              <div className="caption">{product.origin}</div>
              <div style={{ marginTop: 4, display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span className={isHaat ? 'price-haat' : 'price-current'} style={{ fontSize: 15 }}>
                  {formatPrice(lockedPrice)}
                </span>
                {isHaat && (
                  <span className="caption" style={{ color: 'var(--haat-accent)' }}>Haat</span>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
                <button
                  onClick={() => updateQty(product.id, quantity - 1)}
                  style={{ width: 32, height: 32, border: '1px solid var(--border)', borderRadius: 6 }}
                >−</button>
                <span style={{ fontFamily: 'var(--font-en)', fontWeight: 600 }}>{quantity}</span>
                <button
                  onClick={() => updateQty(product.id, quantity + 1)}
                  style={{ width: 32, height: 32, border: '1px solid var(--border)', borderRadius: 6 }}
                  disabled={quantity >= product.availableQuantity}
                >+</button>
                <button onClick={() => removeFromCart(product.id)} className="caption" style={{ marginLeft: 'auto', color: 'var(--error)' }}>
                  {isBn ? 'সরান' : 'Remove'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: 20, marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span>{isBn ? 'সাবটোটাল' : 'Subtotal'}</span>
          <span style={{ fontFamily: 'var(--font-en)', fontWeight: 600 }}>{formatPrice(subtotal)}</span>
        </div>
        <p className="caption" style={{ marginBottom: 16 }}>
          Friday Haat price applies until Haat ends. Delivery calculated at checkout.
        </p>
        <Link to="/checkout" className="btn btn-primary btn-full">
          {isBn ? 'চেকআউট' : 'Checkout'}
        </Link>
      </div>
    </main>
  );
}
