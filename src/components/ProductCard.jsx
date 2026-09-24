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

function creatorLine(product) {
  const name = product.creator?.name;
  const origin = product.origin;
  if (name && origin) return `${name} · ${origin}`;
  if (name) return name;
  if (origin) return origin;
  return '';
}

function isAuthenticMaker(product) {
  return (
    product.creator?.verificationStatus === 'verified' ||
    product.makerStatus === 'Authentic Maker' ||
    product.isVerified === true
  );
}

export default function ProductCard({ product, variant = 'tag', size = null }) {
  if (!product) return null;

  const img = getProductImage(product);
  const qtyLabel =
    product.productType === 'one-of-one'
      ? 'মাত্র ১টি'
      : `${product.availableQuantity}টি উপলব্ধ`;

  // Fixed width ONLY when size is passed (carousel / stall-scroll).
  // Grid usage must stay width:100% so CSS gap controls spacing.
  const widths = { sm: 200, md: 220, lg: 240, xl: 280 };
  const isCarousel = size != null && Object.prototype.hasOwnProperty.call(widths, size);
  const w = isCarousel ? widths[size] : undefined;

  if (variant === 'editorial') {
    return (
      <Link to={`/product/${product.slug}`} className="pcard pcard--editorial">
        <div className="pcard-img pcard-img--editorial" style={{ background: FALLBACK_BG }}>
          <SafeImg src={img} alt={product.name} />
          <div className="pcard-badges pcard-badges--tl">
            {product.isHaatActive && <span className="badge badge-haat">শুক্রবারের হাট</span>}
            {product.productType === 'one-of-one' && (
              <span className="badge badge-quantity">মাত্র ১টি</span>
            )}
          </div>
        </div>
        <div className="pcard-body pcard-body--editorial">
          <h4 className="pcard-title">{product.name}</h4>
          <p className="caption pcard-meta">{creatorLine(product)}</p>
          <div className="pcard-price-row">
            {product.isHaatActive ? (
              <>
                <span className="price-haat" style={{ fontSize: 18 }}>
                  {formatPrice(product.haatPrice)}
                </span>
                <span className="price-regular">{formatPrice(product.regularPrice)}</span>
              </>
            ) : (
              <span className="price-current" style={{ fontSize: 18 }}>
                {formatPrice(product.regularPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/product/${product.slug}`}
      className="pcard pcard--tag"
      style={isCarousel ? { width: w, minWidth: w } : { width: '100%', minWidth: 0 }}
    >
      <div className="pcard-img" style={{ background: FALLBACK_BG }}>
        <SafeImg src={img} alt={product.name} />
        <div className="pcard-badges pcard-badges--tl">
          {product.isHaatActive && <span className="badge badge-haat">হাট</span>}
          {product.isHaatActive && product.haatDiscount && (
            <span className="badge badge-discount">{product.haatDiscount}% ছাড়</span>
          )}
        </div>
        {product.productType === 'one-of-one' && (
          <div className="pcard-badges pcard-badges--tr">
            <span className="badge badge-quantity">১/১</span>
          </div>
        )}
      </div>
      <div className="pcard-body pcard-body--fixed">
        <h4 className="pcard-title pcard-title--clamp">{product.name}</h4>
        <p className="caption pcard-meta">{creatorLine(product)}</p>
        {isAuthenticMaker(product) && (
          <span className="badge badge-verified" style={{ marginTop: 6, alignSelf: 'flex-start' }}>
            ✓ Authentic
          </span>
        )}
        <div className="pcard-price-row">
          {product.isHaatActive ? (
            <>
              <span className="price-haat" style={{ fontSize: 16 }}>
                {formatPrice(product.haatPrice)}
              </span>
              <span className="price-regular">{formatPrice(product.regularPrice)}</span>
            </>
          ) : (
            <span className="price-current" style={{ fontSize: 16 }}>
              {formatPrice(product.regularPrice)}
            </span>
          )}
        </div>
        <div className="pcard-footer">
          <span className="caption">{qtyLabel}</span>
          {product.isHaatActive && product.countdown && (
            <span className="caption countdown" style={{ color: 'var(--haat-accent)' }}>
              {product.countdown}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
