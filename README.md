# LOCAL — Made in Bangladesh / বাংলার হাট

Premium mobile-first marketplace for unique products by Bangladeshi creators, artisans & independent makers.

**একটা বানালেও, বিক্রি করার জায়গা আছে।**  
Made in Bangladesh. Made differently.

## Live on Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import this GitHub repo: `mansurbb02/banglar-haat`
3. Framework: **Vite** (auto-detected)
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Deploy

SPA routing is handled via `vercel.json` rewrites.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Stack

- React 19 + Vite
- React Router
- Lucide icons
- Mock data + service layer (API-ready)
- Bangla / English toggle

## Signature feature: Friday Haat

Every Friday, new listings enter a 5-hour digital Haat with 10–20% transparent discount, live countdown, and scarcity badges.

## Project structure

```
src/
  components/   Header, Footer, ProductCard, HaatCountdown
  context/      Cart, Language
  data/         mockData (24 products, 8 creators)
  pages/        Home, Explore, Product, Haat, Cart, Checkout…
  services/     mock API
  utils/        Haat pricing & countdown logic
```

## Design

Solid colors only · Anek Bangla + Tiro Bangla + Inter · No gradients / shadows / glassmorphism · Mobile-first editorial UI
