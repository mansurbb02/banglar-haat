import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';

export default function HaatRules() {
  const { isBn } = useLang();
  return (
    <main className="container" style={{ paddingTop: 32, paddingBottom: 48, maxWidth: 560 }}>
      <h1 style={{ fontSize: 24, marginBottom: 16 }}>{isBn ? 'শুক্রবারের হাট — নিয়ম' : 'Friday Haat — Rules'}</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontSize: 15, lineHeight: 1.7 }}>
        <p>
          {isBn
            ? 'প্রতি শুক্রবার নতুন তালিকাভুক্ত পণ্যগুলো ঠিক ৫ ঘণ্টার জন্য Friday Haat-এ আসে।'
            : 'Every Friday, newly listed products enter Friday Haat for exactly 5 hours.'}
        </p>
        <p>
          {isBn
            ? 'এই সময় পণ্যে ১০%, ১৫% বা ২০% Haat ডিসকাউন্ট থাকে।'
            : 'During that time products receive a 10%, 15% or 20% Haat discount.'}
        </p>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ marginBottom: 8 }}><strong>{isBn ? 'নিয়মিত মূল্য' : 'Regular price'}</strong>: ৳2,000</div>
          <div style={{ marginBottom: 8, color: 'var(--haat-accent)' }}><strong>Friday Haat</strong>: ৳1,700 (15% OFF)</div>
          <div><strong>{isBn ? 'হাট শেষে' : 'After Haat'}</strong>: ৳2,000</div>
        </div>
        <p className="text-muted">
          {isBn
            ? 'Haat ডিসকাউন্ট অস্থায়ী। নিয়মিত মূল্যই নির্মাতার আসল বিক্রয়মূল্য।'
            : 'Haat discount is temporary. The regular price remains the creator\'s standard selling price.'}
        </p>
      </div>
      <Link to="/friday-haat" className="btn btn-haat" style={{ marginTop: 32 }}>
        {isBn ? 'হাটে ফিরুন' : 'Back to Haat'}
      </Link>
    </main>
  );
}
