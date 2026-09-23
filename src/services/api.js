// Mock API service layer — replace with real fetch later
import { products, creators, haatEvent, categories, origins, suggestedSearches } from '../data/mockData';
import { enrichProductWithHaat, getHaatStatus } from '../utils/haat';

const delay = (ms = 80) => new Promise((r) => setTimeout(r, ms));

export async function getHaatEvent() {
  await delay();
  return { ...haatEvent, ...getHaatStatus(haatEvent) };
}

export async function getProducts(filters = {}) {
  await delay();
  let list = products.map((p) => enrichProductWithHaat(p, haatEvent));

  if (filters.category) {
    list = list.filter((p) => p.category === filters.category);
  }
  if (filters.origin) {
    list = list.filter((p) => p.originEn?.toLowerCase() === filters.origin.toLowerCase() || p.origin === filters.origin);
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
    list = list.filter((p) => p.materialEn?.toLowerCase().includes(filters.material.toLowerCase()) || p.material?.includes(filters.material));
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
    .map((p) => enrichProductWithHaat(p, haatEvent))
    .filter((p) => p.isHaatActive)
    .slice(0, 12);
}

export async function getProductBySlug(slug) {
  await delay();
  const product = products.find((p) => p.slug === slug);
  if (!product) return null;
  const enriched = enrichProductWithHaat(product, haatEvent);
  const creator = creators.find((c) => c.id === product.creatorId);
  return { ...enriched, creator };
}

export async function getCreators() {
  await delay();
  return creators;
}

export async function getCreatorById(id) {
  await delay();
  const creator = creators.find((c) => c.id === id);
  if (!creator) return null;
  const creatorProducts = products
    .filter((p) => p.creatorId === id)
    .map((p) => enrichProductWithHaat(p, haatEvent));
  return { ...creator, products: creatorProducts };
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
  return products
    .filter((p) => p.productType === 'one-of-one')
    .map((p) => enrichProductWithHaat(p, haatEvent));
}

export async function getSmallBatchProducts() {
  await delay();
  return products
    .filter((p) => p.productType === 'small-batch')
    .map((p) => enrichProductWithHaat(p, haatEvent));
}

export async function searchAll(query) {
  await delay();
  if (!query || query.trim().length < 1) {
    return { products: [], creators: [], categories: [], origins: [] };
  }
  const q = query.toLowerCase();
  const matchedProducts = products
    .map((p) => enrichProductWithHaat(p, haatEvent))
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
