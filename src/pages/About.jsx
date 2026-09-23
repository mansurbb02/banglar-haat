import { useLang } from '../context/LanguageContext';

export default function About() {
  const { isBn } = useLang();
  return (
    <main className="container" style={{ paddingTop: 32, paddingBottom: 48, maxWidth: 640 }}>
      <h1 style={{ fontSize: 28, marginBottom: 16 }}>LOCAL</h1>
      <p style={{ fontSize: 18, marginBottom: 24, lineHeight: 1.5 }}>
        {isBn ? 'বাংলাদেশের মানুষের তৈরি অনন্য সবকিছু।' : 'Unique things made by people of Bangladesh.'}
      </p>
      <p className="text-muted" style={{ marginBottom: 16, lineHeight: 1.7 }}>
        {isBn
          ? 'LOCAL একটি curated ডিজিটাল মার্কেটপ্লেস — বাংলাদেশের creator, artisan, maker ও independent craftspeople-দের তৈরি অনন্য পণ্যের জন্য। একটা বানালেও, বিক্রি করার জায়গা আছে।'
          : 'LOCAL is a curated digital marketplace for unique products made by Bangladeshi creators, artisans, makers and independent craftspeople. Even one piece has a place to sell.'}
      </p>
      <p className="text-muted" style={{ lineHeight: 1.7 }}>
        {isBn
          ? 'যা সবাই বানায় না, তাই LOCAL-এ আসে। একটা, কয়েকটা, অথবা ছোট্ট একটা ব্যাচ। আপনার সৃষ্টির জন্য বড় factory দরকার নেই।'
          : "What everyone doesn't make — that comes to LOCAL. One, a few, or a small batch. You don't need a big factory for your creation."}
      </p>
      <p style={{ marginTop: 32, fontFamily: 'var(--font-en)', fontSize: 13, color: 'var(--muted)' }}>
        Made in Bangladesh. Made differently.
      </p>
    </main>
  );
}
