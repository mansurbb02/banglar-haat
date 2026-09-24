// Editorial photography for LOCAL Digital Haat
// Documentary + tactile + South Asian craft aesthetic

export const IMG = {
  // Hero — market / haat atmosphere
  hero: 'https://images.unsplash.com/photo-1555529902-526109615282?w=1600&q=80',
  // Hands / craft process
  handsClay: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=1200&q=80',
  handsPottery: 'https://images.unsplash.com/photo-1493106641515-6ad81aba2a0c?w=1200&q=80',
  // Product still life
  terracotta: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=1000&q=80',
  ceramics: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe511?w=1000&q=80',
  wood: 'https://images.unsplash.com/photo-1611486212557-88be5ff6f941?w=1000&q=80',
  textile: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=1000&q=80',
  fabric: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1000&q=80',
  bamboo: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=1000&q=80',
  baskets: 'https://images.unsplash.com/photo-1488459716781-31db52582b45?w=1000&q=80',
  brass: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=1000&q=80',
  // Workshop / artisan
  workshop: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=1400&q=80',
  artisan: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe511?w=1400&q=80',
  // Landscape
  rural: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1400&q=80',
  hills: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&q=80',
  // Market detail
  marketClose: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=1200&q=80',
  textilesMarket: 'https://images.unsplash.com/photo-1555529902-526109615282?w=1200&q=80',
};

// Map product id → image for consistency
export const productImages = {
  p1: IMG.terracotta,
  p2: IMG.brass,
  p3: IMG.textile,
  p4: IMG.ceramics,
  p5: IMG.fabric,
  p6: IMG.ceramics,
  p7: IMG.baskets,
  p8: IMG.bamboo,
  p9: IMG.terracotta,
  p10: IMG.wood,
  p11: IMG.textile,
  p12: IMG.bamboo,
};

export function getProductImage(product) {
  if (!product) return IMG.terracotta;
  return productImages[product.id] || IMG.terracotta;
}
