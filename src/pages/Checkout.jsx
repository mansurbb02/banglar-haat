import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/haat';

export default function Checkout() {
  const { items, subtotal, clearCart, itemCount } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', phone: '', address: '', area: '', city: 'ঢাকা', notes: '' });

  if (itemCount === 0) {
    return (
      <div className="empty-state">
        <h3>ঝুড়ি খালি</h3>
        <Link to="/explore" className="btn btn-primary">পণ্য দেখুন</Link>
      </div>
    );
  }

  const deliveryFee = 80;
  const total = subtotal + deliveryFee;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 4) {
      setStep(step + 1);
      return;
    }
    clearCart();
    navigate('/order-success');
  };

  const labels = { name: 'পূর্ণ নাম', phone: 'মোবাইল নম্বর', address: 'ঠিকানা', area: 'এলাকা' };

  return (
    <main className="container" style={{ paddingTop: 24, paddingBottom: 48, maxWidth: 560 }}>
      <h1 style={{ fontSize: 24, marginBottom: 8 }}>চেকআউট</h1>
      <p className="caption" style={{ marginBottom: 24 }}>ধাপ {step} / ৪</p>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h3 style={{ fontSize: 16 }}>ডেলিভারি তথ্য</h3>
            {['name', 'phone', 'address', 'area'].map((field) => (
              <div key={field}>
                <label className="caption" style={{ display: 'block', marginBottom: 4 }}>{labels[field]}</label>
                <input
                  required
                  value={form[field]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  style={{ width: '100%', height: 48, padding: '0 12px', border: '1px solid var(--border)', borderRadius: 8, fontSize: 15, background: 'var(--white)' }}
                />
              </div>
            ))}
            <div>
              <label className="caption" style={{ display: 'block', marginBottom: 4 }}>শহর</label>
              <select
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                style={{ width: '100%', height: 48, padding: '0 12px', border: '1px solid var(--border)', borderRadius: 8, fontSize: 15, background: 'var(--white)' }}
              >
                {['ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'খুলনা', 'সিলেট', 'অন্যান্য'].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 style={{ fontSize: 16, marginBottom: 16 }}>ডেলিভারি পদ্ধতি</h3>
            <label className="card" style={{ padding: 16, display: 'block', marginBottom: 12, cursor: 'pointer' }}>
              <input type="radio" name="delivery" defaultChecked style={{ marginRight: 8 }} />
              স্ট্যান্ডার্ড ডেলিভারি — ৳৮০
            </label>
            <label className="card" style={{ padding: 16, display: 'block', cursor: 'pointer' }}>
              <input type="radio" name="delivery" style={{ marginRight: 8 }} />
              কেয়ার ডেলিভারি (ভঙ্গুর পণ্য) — ৳১৫০
            </label>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 style={{ fontSize: 16, marginBottom: 16 }}>অর্ডার সারাংশ</h3>
            {items.map(({ product, quantity, lockedPrice }) => (
              <div key={product.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14 }}>
                <span>{product.name} × {quantity}</span>
                <span>{formatPrice(lockedPrice * quantity)}</span>
              </div>
            ))}
            <div style={{ borderTop: '1px solid var(--border)', marginTop: 12, paddingTop: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span>সাবটোটাল</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span>ডেলিভারি</span>
                <span>{formatPrice(deliveryFee)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, marginTop: 8 }}>
                <span>মোট</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h3 style={{ fontSize: 16, marginBottom: 16 }}>পেমেন্ট</h3>
            <p className="text-muted" style={{ marginBottom: 16, fontSize: 14 }}>
              প্রোটোটাইপ — আসল পেমেন্ট সংযুক্ত নয়।
            </p>
            <label className="card" style={{ padding: 16, display: 'block', marginBottom: 12 }}>
              <input type="radio" name="pay" defaultChecked style={{ marginRight: 8 }} /> বিকাশ
            </label>
            <label className="card" style={{ padding: 16, display: 'block', marginBottom: 12 }}>
              <input type="radio" name="pay" style={{ marginRight: 8 }} /> নগদ
            </label>
            <label className="card" style={{ padding: 16, display: 'block' }}>
              <input type="radio" name="pay" style={{ marginRight: 8 }} /> ক্যাশ অন ডেলিভারি
            </label>
          </div>
        )}

        <button type="submit" className="btn btn-primary btn-full" style={{ marginTop: 28 }}>
          {step < 4 ? 'পরবর্তী' : 'অর্ডার নিশ্চিত করুন'}
        </button>
        {step > 1 && (
          <button type="button" onClick={() => setStep(step - 1)} className="btn btn-tertiary btn-full" style={{ marginTop: 8 }}>
            পেছনে
          </button>
        )}
      </form>
    </main>
  );
}
