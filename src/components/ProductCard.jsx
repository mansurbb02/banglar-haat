import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/haat';

const PLACEHOLDER_COLORS = ['#E8E4D9', '#D4D0C4', '#EDE9DF', '#E0DCD2', '#F0EBE3'];

export default function ProductCard({ product, variant = 'default' }) {
  if (!product) return null;

  const color = PLACEHOLDER_COLORS[product.id.charCodeAt(1) % PLACEHOLDER_COLORS.length];
  const qtyLabel =
    product.productType === 'one-of-one'
      ? 'মাত্র ১টি'
      : `${product.availableQuantity}টি উপলব্ধ`;

  return (
    <Link
      to={`/product/${product.slug}`}
      className="card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: variant === 'carousel' ? 220 : '100%',
        minWidth: variant === 'carousel' ? 220 : undefined,
      }}
    >
      <div
        style={{
          aspectRatio: '1',
          background: color,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span style={{ fontSize: 13, color: 'var(--muted)', textAlign: 'center', padding: 12 }}>
          {product.name}
        </span>
        <div style={{ position: 'absolute', top: 8, left: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {product.isHaatActive && <span className="badge badge-haat">শুক্রবারের হাট</span>}
          {product.isHaatActive && product.haatDiscount && (
            <span className="badge badge-discount">{product.haatDiscount}% ছাড়</span>
          )}
        </div>
        {product.productType === 'one-of-one' && (
          <div style={{ position: 'absolute', top: 8, right: 8 }}>
            <span className="badge badge-quantity">মাত্র ১টি</span>
          </div>
        )}
      </div>

      <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.35, fontFamily: 'var(--font-heading)' }}>
          {product.name}
        </h4>
        <p className="caption" style={{ margin: 0 }}>
          {product.creator?.name || product.origin}
          {product.origin && ` · ${product.origin}`}
        </p>
        <div style={{ marginTop: 'auto', paddingTop: 8 }}>
          {product.isHaatActive ? (
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
              <span className="price-haat" style={{ fontSize: 16 }}>{formatPrice(product.haatPrice)}</span>
              <span className="price-regular">{formatPrice(product.regularPrice)}</span>
            </div>
          ) : (
            <span className="price-current" style={{ fontSize: 16 }}>{formatPrice(product.regularPrice)}</span>
          )}
          <div style={{ marginTop: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="caption">{qtyLabel}</span>
            {product.isHaatActive && product.countdown && (
              <span className="caption countdown" style={{ color: 'var(--haat-accent)' }}>
                {product.countdown}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
