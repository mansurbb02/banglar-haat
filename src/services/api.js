// Mock API service layer — replace with real fetch later
import {
  products,
  creators,
  haatEvent,
  categories,
  origins,
  suggestedSearches,
  withMakerFields,
} from '../data/mockData';
import { enrichProductWithHaat, getHaatStatus } from '../utils/haat';
import {
  originsDetail,
  getOriginBySlug as findOrigin,
  matchProductOrigin,
} from '../data/originsDetail';
import { IMG } from '../data/images';

const delay = (ms = 80) => new Promise((r) => setTimeout(r, ms));

/** Process video poster by craft category (prototype — no external video host) */
function processPosterFor(product) {
  if (product.processVideoPoster) return product.processVideoPoster;
  const m = (product.materialEn || product.material || '').toLowerCase();
  if (m.includes('terracotta') || m.includes('clay') || m.includes('মাটি')) return IMG.handsClay;
  if (m.includes('wood') || m.includes('কাঠ')) return IMG.workshop;
  if (m.includes('textile') || m.includes('fabric') || m.includes('kantha') || m.includes('কাপ')) return IMG.textile;
  if (m.includes('brass') || m.includes('কাংসা') || m.includes('কাঁসা')) return IMG.brass;
  return IMG.handsPottery;
}

/** Attach creator + Haat + authenticity fields to a product */
function enrich(product) {
  const enriched = enrichProductWithHaat(product, haatEvent);
  const rawCreator = creators.find((c) => c.id === product.creatorId) || null;
  const creator = withMakerFields(rawCreator);
  const isAuthentic = creator?.verificationStatus === 'verified' || product.isVerified;
  return {
    ...enriched,
    creator,
    makerStatus: isAuthentic ? 'Authentic Maker' : product.makerStatus || 'Maker',
    processVideo: product.processVideo || null,
    processVideoPoster: processPosterFor(product),
    processVideoDuration: product.processVideoDuration || '00:24',
    craftTechnique: product.technique || product.craftTechnique || product.productionMethod || null,
    productionLocation: product.productionLocation || product.origin,
    processDocumented: true,
  };
}

export async function getHaatEvent() {
  await delay();
  return { ...haatEvent, ...getHaatStatus(haatEvent) };
}

export async function getProducts(filters = {}) {
  await delay();
  let list = products.map(enrich);

  if (filters.category) {
    list = list.filter((p) => p.category === filters.category);
  }
  if (filters.origin) {
    list = list.filter(
      (p) =>
        p.originEn?.toLowerCase() === filters.origin.toLowerCase() ||
        p.origin === filters.origin
    );
  }
  if (filters.productType) {
    list = list.filter((p) => p.productType === filters.productType);
  }
  if (filters.haatOnly) {
    list = list.filter((p) => p.isHaatActive);
  }
  if (filters.oneOfOne) {
    list = list.filter((p) => p.productType === 'one-of-one');
  }
  if (filters.smallBatch) {
    list = list.filter((p) => p.productType === 'small-batch');
  }
  if (filters.material) {
    list = list.filter(
      (p) =>
        p.materialEn?.toLowerCase().includes(filters.material.toLowerCase()) ||
        p.material?.includes(filters.material)
    );
  }
  if (filters.q) {
    const q = filters.q.toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.nameEn?.toLowerCase().includes(q) ||
        p.material?.toLowerCase().includes(q) ||
        p.origin?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
    );
  }
  if (filters.minPrice != null) {
    list = list.filter((p) => p.displayPrice >= filters.minPrice);
  }
  if (filters.maxPrice != null) {
    list = list.filter((p) => p.displayPrice <= filters.maxPrice);
  }

  return list;
}

export async function getHaatProducts() {
  await delay();
  return products
    .map(enrich)
    .filter((p) => p.isHaatActive)
    .slice(0, 12);
}

export async function getProductBySlug(slug) {
  await delay();
  const product = products.find((p) => p.slug === slug);
  if (!product) return null;
  return enrich(product);
}

export async function getCreators() {
  await delay();
  return creators.map(withMakerFields);
}

export async function getCreatorById(id) {
  await delay();
  const creator = creators.find((c) => c.id === id);
  if (!creator) return null;
  const creatorProducts = products.filter((p) => p.creatorId === id).map(enrich);
  return { ...withMakerFields(creator), products: creatorProducts };
}

export async function getOriginDetail(slug) {
  await delay();
  const origin = findOrigin(slug);
  if (!origin) return null;
  const originProducts = products.map(enrich).filter((p) => matchProductOrigin(p, origin));
  const makerIds = [...new Set(originProducts.map((p) => p.creatorId).filter(Boolean))];
  const makers = makerIds
    .map((id) => creators.find((c) => c.id === id))
    .filter(Boolean)
    .map(withMakerFields);
  const haatProducts = originProducts.filter((p) => p.isHaatActive);
  return {
    ...origin,
    products: originProducts,
    makers,
    haatProducts,
  };
}

export async function getHaatOriginSummary() {
  await delay();
  const haatList = products.map(enrich).filter((p) => p.isHaatActive);
  const byOrigin = {};
  haatList.forEach((p) => {
    const key = p.originEn || p.origin || 'Other';
    if (!byOrigin[key]) {
      byOrigin[key] = { name: p.origin, nameEn: p.originEn || p.origin, count: 0 };
    }
    byOrigin[key].count += 1;
  });
  return Object.values(byOrigin).sort((a, b) => b.count - a.count);
}

export async function getOriginsDetail() {
  await delay();
  return originsDetail;
}

export async function getCreatorBySlug(slug) {
  return getCreatorById(slug);
}

export async function getCategories() {
  await delay();
  return categories;
}

export async function getOrigins() {
  await delay();
  return origins;
}

export async function getSuggestedSearches() {
  await delay();
  return suggestedSearches;
}

export async function getOneOfOneProducts() {
  await delay();
  return products.filter((p) => p.productType === 'one-of-one').map(enrich);
}

export async function getSmallBatchProducts() {
  await delay();
  return products.filter((p) => p.productType === 'small-batch').map(enrich);
}

export async function searchAll(query) {
  await delay();
  if (!query || query.trim().length < 1) {
    return { products: [], creators: [], categories: [], origins: [] };
  }
  const q = query.toLowerCase();
  const matchedProducts = products
    .map(enrich)
    .filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.nameEn?.toLowerCase().includes(q) ||
        p.material?.toLowerCase().includes(q) ||
        p.origin?.toLowerCase().includes(q)
    );
  const matchedCreators = creators.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.nameEn?.toLowerCase().includes(q) ||
      c.specialty?.toLowerCase().includes(q) ||
      c.location?.toLowerCase().includes(q)
  );
  const matchedCategories = categories.filter(
    (c) => c.name.toLowerCase().includes(q) || c.nameEn?.toLowerCase().includes(q)
  );
  const matchedOrigins = origins.filter(
    (o) => o.name.toLowerCase().includes(q) || o.nameEn?.toLowerCase().includes(q)
  );
  return {
    products: matchedProducts,
    creators: matchedCreators,
    categories: matchedCategories,
    origins: matchedOrigins,
  };
}
