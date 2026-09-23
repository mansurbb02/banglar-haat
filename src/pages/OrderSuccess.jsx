import { Link } from 'react-router-dom';

export default function OrderSuccess() {
  return (
    <div className="empty-state">
      <h2 style={{ marginBottom: 12 }}>অর্ডার সম্পন্ন!</h2>
      <p className="text-muted" style={{ marginBottom: 24 }}>
        আপনার অর্ডার গ্রহণ করা হয়েছে। নির্মাতা শীঘ্রই প্রস্তুত করবেন।
      </p>
      <Link to="/" className="btn btn-primary">হোমে ফিরুন</Link>
    </div>
  );
}
