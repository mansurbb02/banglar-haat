import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/haat';
import { getProductImage, FALLBACK_BG } from '../data/images';

function SafeImg({ src, alt, style }) {
  return (
    <img
      src={src}
      alt={alt || ''}
      loading="lazy"
      style={style}
      onError={(e) => {
        e.currentTarget.style.display = 'none';
        if (e.currentTarget.parentElement) {
          e.currentTarget.parentElement.style.background = FALLBACK_BG;
        }
      }}
    />
  );
}

export default function ProductCard({ product, variant = 'tag', size = 'md' }) {
  if (!product) return null;

  const img = getProductImage(product);
  const qtyLabel =
    product.productType === 'one-of-one'
      ? 'মাত্র ১টি'
      : `${product.availableQuantity}টি উপলব্ধ`;

  const widths = { sm: 160, md: 220, lg: 280, xl: 340 };
  const w = widths[size] || 220;
  const isCarousel = ['carousel', 'sm', 'md', 'lg', 'xl'].includes(size);

  if (variant === 'overlay') {
    return (
      <Link
        to={`/product/${product.slug}`}
        className="pcard pcard--overlay"
        style={{ width: isCarousel ? w : '100%', minWidth: isCarousel ? w : undefined }}
      >
        <div className="pcard-img" style={{ aspectRatio: '1', background: FALLBACK_BG }}>
          <SafeImg src={img} alt={product.name} />
          <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', gap: 4, flexWrap: 'wrap', zIndex: 1 }}>
            {product.isHaatActive && <span className="badge badge-haat">হাট</span>}
            {product.productType === 'one-of-one' && <span className="badge badge-quantity">১/১</span>}
          </div>
        </div>
        <div className="pcard-body">
          <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 15, marginBottom: 4 }}>
            {product.name}
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            {product.isHaatActive ? (
              <>
                <span className="price-haat" style={{ fontSize: 16, color: '#FF9F5A' }}>{formatPrice(product.haatPrice)}</span>
                <span className="price-regular" style={{ color: 'rgba(255,255,255,0.5)' }}>{formatPrice(product.regularPrice)}</span>
              </>
            ) : (
              <span style={{ fontWeight: 600, fontSize: 16 }}>{formatPrice(product.regularPrice)}</span>
            )}
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'editorial') {
    return (
      <Link to={`/product/${product.slug}`} className="pcard pcard--editorial" style={{ width: '100%' }}>
        <div className="pcard-img" style={{ aspectRatio: '3/4', background: FALLBACK_BG }}>
          <SafeImg src={img} alt={product.name} />
          <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', gap: 4, zIndex: 1 }}>
            {product.isHaatActive && <span className="badge badge-haat">শুক্রবারের হাট</span>}
            {product.productType === 'one-of-one' && <span className="badge badge-quantity">মাত্র ১টি</span>}
          </div>
        </div>
        <div className="pcard-body">
          <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{product.name}</h4>
          <p className="caption" style={{ marginBottom: 8 }}>{product.origin} · {product.creator?.name || ''}</p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            {product.isHaatActive ? (
              <>
                <span className="price-haat" style={{ fontSize: 18 }}>{formatPrice(product.haatPrice)}</span>
                <span className="price-regular">{formatPrice(product.regularPrice)}</span>
              </>
            ) : (
              <span className="price-current" style={{ fontSize: 18 }}>{formatPrice(product.regularPrice)}</span>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/product/${product.slug}`}
      className={`pcard pcard--${variant === 'creator' ? 'creator' : 'tag'}`}
      style={{ width: isCarousel ? w : '100%', minWidth: isCarousel ? w : undefined }}
    >
      <div
        className="pcard-img"
        style={{ aspectRatio: variant === 'creator' ? '4/5' : '1', background: FALLBACK_BG }}
      >
        <SafeImg src={img} alt={product.name} />
        <div style={{ position: 'absolute', top: 8, left: 8, display: 'flex', flexDirection: 'column', gap: 4, zIndex: 1 }}>
          {product.isHaatActive && <span className="badge badge-haat">হাট</span>}
          {product.isHaatActive && product.haatDiscount && (
            <span className="badge badge-discount">{product.haatDiscount}% ছাড়</span>
          )}
        </div>
        {product.productType === 'one-of-one' && (
          <div style={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}>
            <span className="badge badge-quantity">১/১</span>
          </div>
        )}
      </div>
      <div className="pcard-body">
        <h4 style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.3, fontFamily: 'var(--font-heading)' }}>
          {product.name}
        </h4>
        <p className="caption" style={{ margin: '4px 0 0' }}>
          {product.creator?.name || product.origin}
          {product.origin && ` · ${product.origin}`}
        </p>
        <div style={{ marginTop: 8 }}>
          {product.isHaatActive ? (
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
              <span className="price-haat" style={{ fontSize: 16 }}>{formatPrice(product.haatPrice)}</span>
              <span className="price-regular">{formatPrice(product.regularPrice)}</span>
            </div>
          ) : (
            <span className="price-current" style={{ fontSize: 16 }}>{formatPrice(product.regularPrice)}</span>
          )}
          <div style={{ marginTop: 4, display: 'flex', justifyContent: 'space-between' }}>
            <span className="caption">{qtyLabel}</span>
            {product.isHaatActive && product.countdown && (
              <span className="caption countdown" style={{ color: 'var(--haat-accent)' }}>{product.countdown}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
