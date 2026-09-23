import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';

export default function OrderSuccess() {
  const { isBn } = useLang();
  return (
    <div className="empty-state">
      <h2 style={{ marginBottom: 12 }}>{isBn ? 'অর্ডার সম্পন্ন!' : 'Order confirmed!'}</h2>
      <p className="text-muted" style={{ marginBottom: 24 }}>
        {isBn
          ? 'আপনার অর্ডার গ্রহণ করা হয়েছে। নির্মাতা শীঘ্রই প্রস্তুত করবেন।'
          : 'Your order has been received. The creator will prepare it soon.'}
      </p>
      <Link to="/" className="btn btn-primary">{isBn ? 'হোমে ফিরুন' : 'Back to home'}</Link>
    </div>
  );
}
