// Rich origin discovery data — connects Place → Craft → Makers → Products
import { IMG } from './images';

export const originsDetail = [
  {
    id: 'kushtia',
    slug: 'kushtia',
    name: 'কুষ্টিয়া',
    nameEn: 'Kushtia',
    division: 'খুলনা',
    description:
      'মাটি, কাঠ আর হাতের কাজের জায়গা। এখানকার কারিগররা ছোট workshop-এ একবারে কয়েকটা করেই বানান।',
    coverImage: IMG.rural,
    crafts: ['টেরাকোটা', 'কাঠের কাজ', 'মাটির প্রদীপ'],
    craftsEn: ['Terracotta', 'Woodwork', 'Clay lamps'],
  },
  {
    id: 'tangail',
    slug: 'tangail',
    name: 'টাঙ্গাইল',
    nameEn: 'Tangail',
    division: 'ঢাকা',
    description:
      'নকশিকাঁথা আর তাঁতের ঐতিহ্য। প্রতিটি কাঁথায় গল্প আঁকা থাকে।',
    coverImage: IMG.textile,
    crafts: ['নকশিকাঁথা', 'তাঁতের কাপড়', 'হাতে সেলাই'],
    craftsEn: ['Nakshi Kantha', 'Handloom', 'Hand stitching'],
  },
  {
    id: 'sylhet',
    slug: 'sylhet',
    name: 'সিলেট',
    nameEn: 'Sylhet',
    division: 'সিলেট',
    description:
      'শীতল পাটি আর বাঁশের কাজ। পাহাড়ি আবহাওয়ায় তৈরি হয় হালকা, টেকসই জিনিস।',
    coverImage: IMG.fabric,
    crafts: ['শীতল পাটি', 'বাঁশ', 'হাতে বোনা'],
    craftsEn: ['Shital Pati', 'Bamboo', 'Handwoven'],
  },
  {
    id: 'bogura',
    slug: 'bogura',
    name: 'বগুড়া',
    nameEn: 'Bogura',
    division: 'রাজশাহী',
    description:
      'কাঁসা ও পিতলের কারিগরি। তিন প্রজন্মের হাতে খোদাই।',
    coverImage: IMG.brass,
    crafts: ['কাঁসা', 'পিতল', 'হাতে খোদাই'],
    craftsEn: ['Brass', 'Copper', 'Hand engraving'],
  },
  {
    id: 'rajshahi',
    slug: 'rajshahi',
    name: 'রাজশাহী',
    nameEn: 'Rajshahi',
    division: 'রাজশাহী',
    description:
      'পাট, মাটি আর স্থানীয় উপকরণে তৈরি আধুনিক ও ঐতিহ্যবাহী বস্তু।',
    coverImage: IMG.baskets,
    crafts: ['পাট', 'মাটির শিল্প', 'হাতে তৈরি'],
    craftsEn: ['Jute', 'Clay craft', 'Handmade'],
  },
  {
    id: 'chattogram',
    slug: 'chattogram',
    name: 'চট্টগ্রাম',
    nameEn: 'Chattogram',
    division: 'চট্টগ্রাম',
    description:
      'বাঁশ, কাঠ আর উপকূলীয় উপকরণে তৈরি সমকালীন সৃষ্টি।',
    coverImage: IMG.bamboo,
    crafts: ['বাঁশের ল্যাম্প', 'কাঠ', 'হস্তশিল্প'],
    craftsEn: ['Bamboo lamps', 'Wood', 'Handicraft'],
  },
  {
    id: 'dhaka',
    slug: 'dhaka',
    name: 'ঢাকা',
    nameEn: 'Dhaka',
    division: 'ঢাকা',
    description:
      'সমকালীন সিরামিক ও নগরের ছোট নির্মাতাদের স্টুডিও।',
    coverImage: IMG.ceramics,
    crafts: ['সিরামিক', 'সমকালীন ডিজাইন'],
    craftsEn: ['Ceramic', 'Contemporary design'],
  },
  {
    id: 'rangamati',
    slug: 'rangamati',
    name: 'রাঙামাটি',
    nameEn: 'Rangamati',
    division: 'চট্টগ্রাম',
    description:
      'পাহাড়, তাঁত, বুনন আর স্থানীয় কারুশিল্পের গল্প।',
    coverImage: IMG.hills,
    crafts: ['হাতে বোনা কাপড়', 'বাঁশ', 'কাঠের কাজ'],
    craftsEn: ['Handwoven textile', 'Bamboo', 'Woodcraft'],
  },
];

export function getOriginBySlug(slug) {
  if (!slug) return null;
  const s = slug.toLowerCase();
  return (
    originsDetail.find(
      (o) =>
        o.slug === s ||
        o.id === s ||
        o.nameEn.toLowerCase() === s ||
        o.name === slug
    ) || null
  );
}

export function matchProductOrigin(product, origin) {
  if (!product || !origin) return false;
  const o = origin.name;
  const oe = origin.nameEn?.toLowerCase();
  return (
    product.origin === o ||
    product.originEn?.toLowerCase() === oe ||
    product.district === o
  );
}
