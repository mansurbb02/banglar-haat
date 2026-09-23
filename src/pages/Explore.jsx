import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getProducts, getCategories } from '../services/api';

export default function Explore() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [params, setParams] = useSearchParams();
  const category = params.get('category') || '';

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    getProducts({ category: category || undefined }).then(setProducts);
  }, [category]);

  return (
    <main className="container" style={{ paddingTop: 24, paddingBottom: 48 }}>
      <h1 style={{ fontSize: 24, marginBottom: 8 }}>অন্বেষণ</h1>
      <p className="text-muted" style={{ marginBottom: 20 }}>
        যা প্রতিদিন দেখা যায় না, সেগুলোই খুঁজে দেখুন।
      </p>

      <div className="carousel" style={{ marginBottom: 24, gap: 8 }}>
        <button
          onClick={() => setParams({})}
          className="btn"
          style={{
            height: 36, padding: '0 14px', fontSize: 13,
            background: !category ? 'var(--ink)' : 'var(--white)',
            color: !category ? 'white' : 'var(--ink)',
            border: '1px solid var(--border)',
          }}
        >
          সব
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setParams({ category: c.id })}
            className="btn"
            style={{
              height: 36, padding: '0 14px', fontSize: 13,
              background: category === c.id ? 'var(--ink)' : 'var(--white)',
              color: category === c.id ? 'white' : 'var(--ink)',
              border: '1px solid var(--border)',
            }}
          >
            {c.name}
          </button>
        ))}
      </div>

      {products.length === 0 ? (
        <div className="empty-state">
          <h3>আপনার খোঁজার মতো কিছু পাওয়া যায়নি।</h3>
          <button onClick={() => setParams({})} className="btn btn-secondary">সব পণ্য দেখুন</button>
        </div>
      ) : (
        <div className="grid-products">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </main>
  );
}
