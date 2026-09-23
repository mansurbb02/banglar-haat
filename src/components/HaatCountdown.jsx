import { useState, useEffect } from 'react';
import { formatCountdown } from '../utils/haat';

export default function HaatCountdown({ endTime, label }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    if (!endTime) return;
    const tick = () => {
      const ms = new Date(endTime).getTime() - Date.now();
      setTime(formatCountdown(ms));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endTime]);

  if (!endTime) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
      {label && <span className="caption" style={{ color: 'inherit', opacity: 0.8 }}>{label}</span>}
      <span className="countdown" style={{ fontSize: 28, letterSpacing: '0.08em' }}>{time}</span>
    </div>
  );
}
