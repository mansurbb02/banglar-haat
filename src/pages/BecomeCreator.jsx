import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';

export default function BecomeCreator() {
  const { isBn } = useLang();
  const steps = isBn
    ? ['প্রোফাইল তৈরি করুন', 'আপনার সৃষ্টি যোগ করুন', 'নিয়মিত মূল্য নির্ধারণ করুন', 'পরিমাণ বেছে নিন', 'রিভিউয়ের জন্য জমা দিন', 'আপনার পণ্য Friday Haat-এ আসতে পারে', 'অর্ডার ফ্লো আমরা সামলাই']
    : ['Create your profile', 'Add your creation', 'Set your regular price', 'Choose quantity', 'Submit for review', 'Your product can enter Friday Haat', 'We handle the order flow'];

  return (
    <main>
      <section style={{ background: 'var(--primary-green)', color: 'white', padding: '48px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ color: 'white', marginBottom: 12, fontSize: 28 }}>
            {isBn ? 'আপনি একটা বানিয়েছেন? সেটাও বিক্রি হবে।' : 'Made one piece? It can be sold too.'}
          </h1>
          <p style={{ opacity: 0.85, maxWidth: 440, margin: '0 auto 28px' }}>
            {isBn
              ? 'বড় factory নেই? সমস্যা নেই। ১০০টা বানাতে পারেন না? তাও সমস্যা নেই।'
              : "No big factory? No problem. Can't make a hundred? Still no problem."}
          </p>
          <button className="btn" style={{ background: 'white', color: 'var(--primary-green)' }}>
            {isBn ? 'Creator হিসেবে শুরু করুন' : 'Start as a Creator'}
          </button>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 560 }}>
          <h2 style={{ fontSize: 20, marginBottom: 24 }}>{isBn ? 'কীভাবে কাজ করে' : 'How it works'}</h2>
          <ol style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {steps.map((s, i) => (
              <li key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <span style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--ink)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontFamily: 'var(--font-en)', fontWeight: 600, flexShrink: 0 }}>
                  {i + 1}
                </span>
                <span style={{ paddingTop: 4 }}>{s}</span>
              </li>
            ))}
          </ol>

          <div className="card" style={{ padding: 20, marginTop: 40 }}>
            <h3 style={{ fontSize: 16, marginBottom: 8 }}>{isBn ? 'Friday Haat ডিসকাউন্ট' : 'Friday Haat discount'}</h3>
            <p className="text-muted" style={{ fontSize: 14, marginBottom: 12 }}>
              {isBn
                ? 'নির্মাতা আসল নিয়মিত বিক্রয়মূল্য নির্ধারণ করেন। Haat ডিসকাউন্ট শুধু ১০%, ১৫% বা ২০%।'
                : 'Creator sets a genuine regular selling price. Haat discount is only 10%, 15% or 20%.'}
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              {['10%', '15%', '20%'].map((d) => (
                <span key={d} className="badge badge-discount">{d}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
