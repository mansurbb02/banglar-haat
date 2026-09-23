export default function BecomeCreator() {
  const steps = [
    'প্রোফাইল তৈরি করুন',
    'আপনার সৃষ্টি যোগ করুন',
    'নিয়মিত মূল্য নির্ধারণ করুন',
    'পরিমাণ বেছে নিন',
    'রিভিউয়ের জন্য জমা দিন',
    'আপনার পণ্য শুক্রবারের হাটে আসতে পারে',
    'অর্ডার ফ্লো আমরা সামলাই',
  ];

  return (
    <main>
      <section style={{ background: 'var(--primary-green)', color: 'white', padding: '48px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ color: 'white', marginBottom: 12, fontSize: 28 }}>
            আপনি একটা বানিয়েছেন? সেটাও বিক্রি হবে।
          </h1>
          <p style={{ opacity: 0.85, maxWidth: 440, margin: '0 auto 28px' }}>
            বড় factory নেই? সমস্যা নেই। ১০০টা বানাতে পারেন না? তাও সমস্যা নেই।
          </p>
          <button className="btn" style={{ background: 'white', color: 'var(--primary-green)' }}>
            নির্মাতা হিসেবে শুরু করুন
          </button>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 560 }}>
          <h2 style={{ fontSize: 20, marginBottom: 24 }}>কীভাবে কাজ করে</h2>
          <ol style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {steps.map((s, i) => (
              <li key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <span style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--ink)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600, flexShrink: 0 }}>
                  {i + 1}
                </span>
                <span style={{ paddingTop: 4 }}>{s}</span>
              </li>
            ))}
          </ol>

          <div className="card" style={{ padding: 20, marginTop: 40 }}>
            <h3 style={{ fontSize: 16, marginBottom: 8 }}>শুক্রবারের হাট ছাড়</h3>
            <p className="text-muted" style={{ fontSize: 14, marginBottom: 12 }}>
              নির্মাতা আসল নিয়মিত বিক্রয়মূল্য নির্ধারণ করেন। হাট ছাড় শুধু ১০%, ১৫% বা ২০%।
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              {['১০%', '১৫%', '২০%'].map((d) => (
                <span key={d} className="badge badge-discount">{d}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
