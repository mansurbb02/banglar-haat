import { useEffect, useState } from 'react';

export default function HaatCountdown({ endTime, label = 'হাট শেষ হবে', light = false }) {
  const [t, setT] = useState({ h: '00', m: '00', s: '00' });

  useEffect(() => {
    if (!endTime) return;
    const tick = () => {
      const ms = Math.max(0, new Date(endTime).getTime() - Date.now());
      const total = Math.floor(ms / 1000);
      setT({
        h: String(Math.floor(total / 3600)).padStart(2, '0'),
        m: String(Math.floor((total % 3600) / 60)).padStart(2, '0'),
        s: String(total % 60).padStart(2, '0'),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endTime]);

  const color = light ? 'white' : 'var(--haat-accent)';

  return (
    <div>
      {label && (
        <div
          style={{
            fontFamily: 'var(--font-en)',
            fontSize: 11,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            opacity: 0.7,
            marginBottom: 8,
            color: light ? 'rgba(255,255,255,0.7)' : 'var(--muted)',
          }}
        >
          {label}
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, color }}>
        <span style={{ fontFamily: 'var(--font-en)', fontSize: 28, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
          {t.h}
        </span>
        <span style={{ opacity: 0.4, fontSize: 22 }}>:</span>
        <span style={{ fontFamily: 'var(--font-en)', fontSize: 28, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
          {t.m}
        </span>
        <span style={{ opacity: 0.4, fontSize: 22 }}>:</span>
        <span style={{ fontFamily: 'var(--font-en)', fontSize: 28, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
          {t.s}
        </span>
      </div>
      <div style={{ display: 'flex', gap: 6, marginTop: 2 }}>
        {['ঘণ্টা', 'মিনিট', 'সেকেন্ড'].map((l, i) => (
          <span
            key={l}
            style={{
              fontFamily: 'var(--font-en)',
              fontSize: 9,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              opacity: 0.5,
              width: 36,
              textAlign: i === 0 ? 'left' : 'center',
              marginLeft: i > 0 ? 8 : 0,
              color: light ? 'rgba(255,255,255,0.6)' : undefined,
            }}
          >
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}
