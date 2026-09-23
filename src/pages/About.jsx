export default function About() {
  return (
    <main className="container" style={{ paddingTop: 32, paddingBottom: 48, maxWidth: 640 }}>
      <h1 style={{ fontSize: 28, marginBottom: 16 }}>LOCAL</h1>
      <p style={{ fontSize: 18, marginBottom: 24, lineHeight: 1.5 }}>
        বাংলাদেশের মানুষের তৈরি অনন্য সবকিছু।
      </p>
      <p className="text-muted" style={{ marginBottom: 16, lineHeight: 1.7 }}>
        LOCAL একটি curated ডিজিটাল মার্কেটপ্লেস — বাংলাদেশের creator, artisan, maker ও independent craftspeople-দের তৈরি অনন্য পণ্যের জন্য। একটা বানালেও, বিক্রি করার জায়গা আছে।
      </p>
      <p className="text-muted" style={{ lineHeight: 1.7 }}>
        যা সবাই বানায় না, তাই LOCAL-এ আসে। একটা, কয়েকটা, অথবা ছোট্ট একটা ব্যাচ। আপনার সৃষ্টির জন্য বড় factory দরকার নেই।
      </p>
      <p style={{ marginTop: 32, fontSize: 13, color: 'var(--muted)' }}>
        বাংলাদেশে তৈরি। আলাদাভাবে তৈরি।
      </p>
    </main>
  );
}
