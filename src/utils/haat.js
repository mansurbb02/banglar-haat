// Friday Haat utility — single source of truth for Haat state

export function calcHaatPrice(regularPrice, discountPercent) {
  if (!discountPercent || discountPercent <= 0) return regularPrice;
  return Math.round(regularPrice * (1 - discountPercent / 100));
}

export function getHaatStatus(haatEvent, now = new Date()) {
  if (!haatEvent) return { status: 'ENDED', remainingMs: 0 };
  const start = new Date(haatEvent.startTime);
  const end = new Date(haatEvent.endTime);
  const t = now.getTime();

  if (t >= start.getTime() && t < end.getTime()) {
    return { status: 'ACTIVE', remainingMs: end.getTime() - t, start, end };
  }
  if (t < start.getTime()) {
    return { status: 'UPCOMING', remainingMs: start.getTime() - t, start, end };
  }
  return { status: 'ENDED', remainingMs: 0, start, end };
}

export function formatCountdown(ms) {
  if (ms <= 0) return '00:00:00';
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return [h, m, s].map((n) => String(n).padStart(2, '0')).join(':');
}

export function enrichProductWithHaat(product, haatEvent, now = new Date()) {
  const { status, remainingMs } = getHaatStatus(haatEvent, now);
  const isHaatActive = status === 'ACTIVE';
  const haatPrice = calcHaatPrice(product.regularPrice, product.haatDiscount);

  return {
    ...product,
    haatStatus: status,
    isHaatActive,
    haatPrice: isHaatActive ? haatPrice : null,
    displayPrice: isHaatActive ? haatPrice : product.regularPrice,
    remainingMs: isHaatActive ? remainingMs : 0,
    countdown: isHaatActive ? formatCountdown(remainingMs) : null,
  };
}

export function formatPrice(amount) {
  return `৳${Number(amount).toLocaleString('en-BD')}`;
}
