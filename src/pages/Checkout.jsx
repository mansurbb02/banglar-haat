import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLang } from '../context/LanguageContext';
import { formatPrice } from '../utils/haat';

export default function Checkout() {
  const { items, subtotal, clearCart, itemCount } = useCart();
  const { isBn } = useLang();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', phone: '', address: '', area: '', city: 'Dhaka', notes: '' });

  if (itemCount === 0) {
    return (
      <div className="empty-state">
        <h3>{isBn ? 'ঝুড়ি খালি' : 'Cart is empty'}</h3>
        <Link to="/explore" className="btn btn-primary">{isBn ? 'পণ্য দেখুন' : 'Browse products'}</Link>
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

  return (
    <main className="container" style={{ paddingTop: 24, paddingBottom: 48, maxWidth: 560 }}>
      <h1 style={{ fontSize: 24, marginBottom: 8 }}>{isBn ? 'চেকআউট' : 'Checkout'}</h1>
      <p className="caption" style={{ marginBottom: 24 }}>
        {isBn ? 'ধাপ ' + step + ' / ৪' : 'Step ' + step + ' of 4'}
      </p>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h3 style={{ fontSize: 16 }}>{isBn ? 'ডেলিভারি তথ্য' : 'Delivery information'}</h3>
            {['name', 'phone', 'address', 'area'].map((field) => (
              <div key={field}>
                <label className="caption" style={{ display: 'block', marginBottom: 4 }}>
                  {field === 'name' ? (isBn ? 'পূর্ণ নাম' : 'Full name') :
                   field === 'phone' ? (isBn ? 'মোবাইল নম্বর' : 'Mobile number') :
                   field === 'address' ? (isBn ? 'ঠিকানা' : 'Address') :
                   (isBn ? 'এলাকা' : 'Area')}
                </label>
                <input
                  required
                  value={form[field]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  style={{ width: '100%', height: 48, padding: '0 12px', border: '1px solid var(--border)', borderRadius: 8, fontSize: 15, background: 'var(--white)' }}
                />
              </div>
            ))}
            <div>
              <label className="caption" style={{ display: 'block', marginBottom: 4 }}>{isBn ? 'শহর' : 'City'}</label>
              <select
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                style={{ width: '100%', height: 48, padding: '0 12px', border: '1px solid var(--border)', borderRadius: 8, fontSize: 15, background: 'var(--white)' }}
              >
                {['Dhaka', 'Chattogram', 'Rajshahi', 'Khulna', 'Sylhet', 'Other'].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 style={{ fontSize: 16, marginBottom: 16 }}>{isBn ? 'ডেলিভারি পদ্ধতি' : 'Delivery method'}</h3>
            <label className="card" style={{ padding: 16, display: 'block', marginBottom: 12, cursor: 'pointer' }}>
              <input type="radio" name="delivery" defaultChecked style={{ marginRight: 8 }} />
              {isBn ? 'স্ট্যান্ডার্ড ডেলিভারি' : 'Standard Delivery'} — ৳80
            </label>
            <label className="card" style={{ padding: 16, display: 'block', cursor: 'pointer' }}>
              <input type="radio" name="delivery" style={{ marginRight: 8 }} />
              {isBn ? 'কেয়ার ডেলিভারি (ভঙ্গুর পণ্য)' : 'Care Delivery (fragile)'} — ৳150
            </label>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 style={{ fontSize: 16, marginBottom: 16 }}>{isBn ? 'অর্ডার সারাংশ' : 'Order summary'}</h3>
            {items.map(({ product, quantity, lockedPrice }) => (
              <div key={product.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14 }}>
                <span>{(isBn ? product.name : product.nameEn)} × {quantity}</span>
                <span style={{ fontFamily: 'var(--font-en)' }}>{formatPrice(lockedPrice * quantity)}</span>
              </div>
            ))}
            <div style={{ borderTop: '1px solid var(--border)', marginTop: 12, paddingTop: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span>{isBn ? 'সাবটোটাল' : 'Subtotal'}</span>
                <span style={{ fontFamily: 'var(--font-en)' }}>{formatPrice(subtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span>{isBn ? 'ডেলিভারি' : 'Delivery'}</span>
                <span style={{ fontFamily: 'var(--font-en)' }}>{formatPrice(deliveryFee)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, marginTop: 8 }}>
                <span>{isBn ? 'মোট' : 'Total'}</span>
                <span style={{ fontFamily: 'var(--font-en)' }}>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h3 style={{ fontSize: 16, marginBottom: 16 }}>{isBn ? 'পেমেন্ট' : 'Payment'}</h3>
            <p className="text-muted" style={{ marginBottom: 16, fontSize: 14 }}>
              {isBn ? 'প্রোটোটাইপ — আসল পেমেন্ট সংযুক্ত নয়।' : 'Prototype — no real payment integration.'}
            </p>
            <label className="card" style={{ padding: 16, display: 'block', marginBottom: 12 }}>
              <input type="radio" name="pay" defaultChecked style={{ marginRight: 8 }} /> bKash
            </label>
            <label className="card" style={{ padding: 16, display: 'block', marginBottom: 12 }}>
              <input type="radio" name="pay" style={{ marginRight: 8 }} /> Nagad
            </label>
            <label className="card" style={{ padding: 16, display: 'block' }}>
              <input type="radio" name="pay" style={{ marginRight: 8 }} /> {isBn ? 'ক্যাশ অন ডেলিভারি' : 'Cash on delivery'}
            </label>
          </div>
        )}

        <button type="submit" className="btn btn-primary btn-full" style={{ marginTop: 28 }}>
          {step < 4 ? (isBn ? 'পরবর্তী' : 'Continue') : (isBn ? 'অর্ডার নিশ্চিত করুন' : 'Confirm order')}
        </button>
        {step > 1 && (
          <button type="button" onClick={() => setStep(step - 1)} className="btn btn-tertiary btn-full" style={{ marginTop: 8 }}>
            {isBn ? 'পেছনে' : 'Back'}
          </button>
        )}
      </form>
    </main>
  );
}
