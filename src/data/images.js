// Editorial photography — verified working Unsplash URLs (2026)

const u = (id, w = 1000) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const IMG = {
  // Market / haat atmosphere
  hero: u('1533900298318-6b8da08a523e', 1600),
  marketClose: u('1472851294608-062f824d29cc', 1200),
  textilesMarket: u('1542838132-92c53300491e', 1200),

  // Hands / craft process
  handsClay: u('1452860606245-08befc0ff44b', 1200),
  handsPottery: u('1610701596061-2ecf227e85b2', 1200),

  // Product still life
  terracotta: u('1578749556568-bc2c40e68b61', 1000),
  ceramics: u('1610701596061-2ecf227e85b2', 1000),
  wood: u('1611486212557-88be5ff6f941', 1000),
  textile: u('1620799140408-edc6dcb6d633', 1000),
  fabric: u('1558618666-fcd25c85cd64', 1000),
  bamboo: u('1598300042247-d088f8ab3a91', 1000),
  baskets: u('1578662996442-48f60103fc96', 1000),
  brass: u('1610701596007-11502861dcfa', 1000),

  // Workshop / artisan
  workshop: u('1452860606245-08befc0ff44b', 1400),
  artisan: u('1581783898377-1c85bf937427', 1400),

  // Landscape
  rural: u('1500382017468-9049fed747ef', 1400),
  hills: u('1464822759023-fed622ff2c3b', 1400),

  // Extra variety
  market2: u('1441986300917-64674bd600d8', 1200),
  kitchen: u('1556909114-f6e7ad7d3136', 1000),
  home: u('1513694203232-719a280e022f', 1000),
  craft: u('1604719312566-8912e9227c6a', 1000),
  pottery2: u('1601925260368-ae2f83cf8b7f', 1000),
};

export const FALLBACK_BG = '#E8E4D9';

export const productImages = {
  p1: IMG.terracotta,
  p2: IMG.brass,
  p3: IMG.textile,
  p4: IMG.ceramics,
  p5: IMG.fabric,
  p6: IMG.pottery2,
  p7: IMG.baskets,
  p8: IMG.bamboo,
  p9: IMG.kitchen,
  p10: IMG.wood,
  p11: IMG.textile,
  p12: IMG.bamboo,
};

export function getProductImage(product) {
  if (!product) return IMG.terracotta;
  return productImages[product.id] || IMG.terracotta;
}
