import { useState } from 'react';
import { Link } from 'react-router-dom';

const ORIGINS = [
  { name: 'কুষ্টিয়া', slug: 'kushtia' },
  { name: 'টাঙ্গাইল', slug: 'tangail' },
  { name: 'সিলেট', slug: 'sylhet' },
  { name: 'রাজশাহী', slug: 'rajshahi' },
  { name: 'বগুড়া', slug: 'bogura' },
  { name: 'চট্টগ্রাম', slug: 'chattogram' },
  { name: 'রাঙামাটি', slug: 'rangamati' },
  { name: 'ঢাকা', slug: 'dhaka' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-brand">
          <div className="footer-logo">LOCAL</div>
          <p className="footer-brand-lead">
            বাংলাদেশের মানুষের হাতে তৈরি অনন্য জিনিস, তাদের গল্প আর জায়গার পরিচয় এক জায়গায়।
          </p>
          <p className="footer-brand-sub">
            LOCAL একটি digital haat, যেখানে একজন মানুষ একটা জিনিস বানালেও সেটার জন্য জায়গা আছে।
          </p>
          <p className="footer-brand-tag">
            <span>Made in Bangladesh.</span>
            <span>Made by People.</span>
          </p>
        </div>

        <div className="footer-newsletter">
          <h3 className="footer-newsletter-title">হাট বসলে খবর পাবেন।</h3>
          <p className="footer-newsletter-copy">
            প্রতি শুক্রবার নতুন কী এসেছে, কোন কারিগর নতুন কিছু বানিয়েছেন এবং এই সপ্তাহের Haat-এর
            বিশেষ সৃষ্টি জানতে আমাদের সাথে থাকুন।
          </p>
          {subscribed ? (
            <p className="footer-newsletter-done">✓ সাবস্ক্রাইব হয়েছে। শুক্রবার দেখা হবে।</p>
          ) : (
            <form className="footer-newsletter-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                required
                placeholder="আপনার ইমেইল লিখুন"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="ইমেইল"
              />
              <button type="submit" className="btn btn-haat">
                Subscribe
              </button>
            </form>
          )}
          <p className="footer-newsletter-note">সপ্তাহে সর্বোচ্চ একটি আপডেট। Spam নয়।</p>
        </div>

        <div className="footer-grid">
          <div className="footer-col">
            <h4>LOCAL</h4>
            <Link to="/about">আমাদের সম্পর্কে</Link>
            <Link to="/about">কীভাবে কাজ করে</Link>
            <Link to="/friday-haat">Friday Haat</Link>
            <Link to="/creators">Authentic Makers</Link>
            <Link to="/explore">Local Origins</Link>
            <Link to="/explore">নতুন সৃষ্টি</Link>
            <Link to="/explore?type=one-of-one">One of One</Link>
            <Link to="/explore?type=small-batch">Small Batch</Link>
            <Link to="/become-a-creator">Become a Creator</Link>
          </div>

          <div className="footer-col">
            <h4>বাংলাদেশের বিভিন্ন জায়গা</h4>
            {ORIGINS.map((o) => (
              <Link key={o.slug} to={`/origins/${o.slug}`}>
                {o.name}
              </Link>
            ))}
            <Link to="/explore" className="footer-view-all">
              সব জায়গা দেখুন →
            </Link>
          </div>

          <div className="footer-col">
            <h4>কারিগর ও Creator</h4>
            <p className="footer-col-note">একটা বানিয়েছেন? সেটাও বিক্রি হবে।</p>
            <Link to="/become-a-creator">Creator হিসেবে যোগ দিন</Link>
            <Link to="/become-a-creator">কীভাবে বিক্রি করবেন</Link>
            <Link to="/about">Maker Verification</Link>
            <Link to="/about">Creator Guidelines</Link>
            <Link to="/help">Creator FAQ</Link>
          </div>

          <div className="footer-col">
            <h4>সাহায্য</h4>
            <Link to="/help">Help Center</Link>
            <Link to="/help">Order Tracking</Link>
            <Link to="/help">Delivery</Link>
            <Link to="/help">Returns & Refunds</Link>
            <Link to="/friday-haat/rules">Friday Haat Rules</Link>
            <Link to="/about">Product Authenticity</Link>
            <Link to="/help">Contact Us</Link>
          </div>
        </div>

        <div className="footer-contact-row">
          <div className="footer-contact">
            <h4>যোগাযোগ</h4>
            <p>
              <span className="footer-label">Email</span>
              <a href="mailto:hello@local.bd">hello@local.bd</a>
            </p>
            <p>
              <span className="footer-label">Customer Support</span>
              <a href="tel:+8801700000000">+880 1700-000000</a>
            </p>
            <p>
              <span className="footer-label">Location</span>
              Dhaka, Bangladesh
            </p>
            <p>
              <span className="footer-label">Support Hours</span>
              Saturday – Thursday · 10:00 AM – 8:00 PM
            </p>
          </div>
          <div className="footer-social">
            <h4>সাথে থাকুন</h4>
            <div className="footer-social-links">
              <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer">YouTube</a>
            </div>
          </div>
        </div>

        <div className="footer-close">
          <h2 className="footer-close-title">আবার শুক্রবার দেখা হবে।</h2>
          <p className="footer-close-en">See you at the next Haat.</p>
          <div className="footer-legal">
            <span>© 2026 LOCAL — Made in Bangladesh</span>
            <span className="footer-legal-links">
              <Link to="/about">Privacy</Link>
              <span>·</span>
              <Link to="/about">Terms</Link>
              <span>·</span>
              <Link to="/help">Shipping</Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
