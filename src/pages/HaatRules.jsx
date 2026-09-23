import { Link } from 'react-router-dom';

export default function HaatRules() {
  return (
    <main className="container" style={{ paddingTop: 32, paddingBottom: 48, maxWidth: 560 }}>
      <h1 style={{ fontSize: 24, marginBottom: 16 }}>শুক্রবারের হাট — নিয়ম</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontSize: 15, lineHeight: 1.7 }}>
        <p>প্রতি শুক্রবার নতুন তালিকাভুক্ত পণ্যগুলো ঠিক ৫ ঘণ্টার জন্য শুক্রবারের হাটে আসে।</p>
        <p>এই সময় পণ্যে ১০%, ১৫% বা ২০% হাট ছাড় থাকে।</p>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ marginBottom: 8 }}><strong>নিয়মিত মূল্য</strong>: ৳২,০০০</div>
          <div style={{ marginBottom: 8, color: 'var(--haat-accent)' }}><strong>শুক্রবারের হাট</strong>: ৳১,৭০০ (১৫% ছাড়)</div>
          <div><strong>হাট শেষে</strong>: ৳২,০০০</div>
        </div>
        <p className="text-muted">
          হাট ছাড় অস্থায়ী। নিয়মিত মূল্যই নির্মাতার আসল বিক্রয়মূল্য।
        </p>
      </div>
      <Link to="/friday-haat" className="btn btn-haat" style={{ marginTop: 32 }}>
        হাটে ফিরুন
      </Link>
    </main>
  );
}
