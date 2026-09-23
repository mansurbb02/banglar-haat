// LOCAL Marketplace — Mock Data Layer

export const creators = [
  { id: 'c1', name: 'রাহিম উদ্দিন', nameEn: 'Rahim Uddin', avatar: null, location: 'কুষ্টিয়া', locationEn: 'Kushtia', specialty: 'মাটির কাজ', specialtyEn: 'Terracotta', bio: 'বাবার কাছ থেকে মাটির কাজ শিখেছেন।', story: 'একটা জিনিস বানাতে চার দিন লেগেছে।', verified: true, creationsCount: 12, followers: 340 },
  { id: 'c2', name: 'আব্দুল করিম', nameEn: 'Abdul Karim', avatar: null, location: 'বগুড়া', locationEn: 'Bogura', specialty: 'কাঁসা ও পিতল', specialtyEn: 'Brass & Copper', bio: 'তিন প্রজন্মের কাঁসার কারিগর।', story: 'প্রতিটি বাটিতে নিজের নাম খোদাই করেন।', verified: true, creationsCount: 8, followers: 210 },
  { id: 'c3', name: 'ফাতেমা বেগম', nameEn: 'Fatema Begum', avatar: null, location: 'সিলেট', locationEn: 'Sylhet', specialty: 'শীতল পাটি', specialtyEn: 'Shital Pati', bio: 'শীতল পাটি বোনার পুরনো কৌশল ধরে রেখেছেন।', story: 'মায়ের কাছ থেকে শিখেছেন।', verified: true, creationsCount: 15, followers: 520 },
  { id: 'c4', name: 'রাশেদুল ইসলাম', nameEn: 'Rashedul Islam', avatar: null, location: 'কুষ্টিয়া', locationEn: 'Kushtia', specialty: 'কাঠের কাজ', specialtyEn: 'Woodwork', bio: 'বাবার কাছ থেকে কাঠের কাজ শিখেছেন।', story: 'একটা জিনিস বানাতে চার দিন লেগেছে।', verified: true, creationsCount: 9, followers: 180 },
  { id: 'c5', name: 'নাজমা আক্তার', nameEn: 'Nazma Akter', avatar: null, location: 'টাঙ্গাইল', locationEn: 'Tangail', specialty: 'নকশিকাঁথা', specialtyEn: 'Nakshi Kantha', bio: 'ঐতিহ্যবাহী নকশিকাঁথা আধুনিক ডিজাইনে তৈরি করেন।', story: 'প্রতিটি কাঁথায় গল্প আঁকা থাকে।', verified: true, creationsCount: 22, followers: 890 },
  { id: 'c6', name: 'করিম মিয়া', nameEn: 'Karim Mia', avatar: null, location: 'ঢাকা', locationEn: 'Dhaka', specialty: 'সিরামিক', specialtyEn: 'Ceramic', bio: 'সমকালীন সিরামিক অবজেক্ট তৈরি করেন।', story: 'ঐতিহ্যের রূপ নিয়ে নতুন ভাবনা।', verified: false, creationsCount: 6, followers: 95 },
  { id: 'c7', name: 'সালমা খাতুন', nameEn: 'Salma Khatun', avatar: null, location: 'রাজশাহী', locationEn: 'Rajshahi', specialty: 'জুট ও টেক্সটাইল', specialtyEn: 'Jute & Textile', bio: 'পাটের সুতা দিয়ে হস্তশিল্প তৈরি করেন।', story: 'প্রকৃতির উপকরণ দিয়ে নতুন রূপ।', verified: true, creationsCount: 18, followers: 410 },
  { id: 'c8', name: 'ইমরান হোসেন', nameEn: 'Imran Hossain', avatar: null, location: 'চট্টগ্রাম', locationEn: 'Chattogram', specialty: 'বাঁশ ও বেত', specialtyEn: 'Bamboo & Cane', bio: 'বাঁশের আধুনিক ফার্নিচার ও ল্যাম্প তৈরি করেন।', story: 'গ্রামের বাঁশকে শহরের ঘরে নিয়ে আসা।', verified: true, creationsCount: 11, followers: 270 },
];

const now = new Date();
const haatStart = new Date(now.getTime() - 30 * 60 * 1000);
const haatEnd = new Date(now.getTime() + 4.5 * 60 * 60 * 1000);

export const haatEvent = {
  id: 'haat-1',
  title: 'শুক্রবারের হাট',
  titleEn: 'Friday Haat',
  startTime: haatStart.toISOString(),
  endTime: haatEnd.toISOString(),
  status: 'ACTIVE',
};

export const products = [
  { id: 'p1', creatorId: 'c1', name: 'হাতে গড়া মাটির প্রদীপ', nameEn: 'Handcrafted Terracotta Lamp', slug: 'hath-e-gora-matir-prodip', description: 'হাতে গড়া টেরাকোটা প্রদীপ।', story: 'রাহিম উদ্দিন চার দিন ধরে এই প্রদীপটি গড়েছেন।', category: 'craft', material: 'টেরাকোটা', materialEn: 'Terracotta', origin: 'কুষ্টিয়া', originEn: 'Kushtia', images: [], regularPrice: 1800, haatDiscount: 15, quantity: 1, availableQuantity: 1, productType: 'one-of-one', isFragile: true, isVerified: true, technique: 'Handcrafted', createdAt: '2026-09-15', dimensions: '১২ × ৮ সেমি', productionMethod: 'হাতে গড়া' },
  { id: 'p2', creatorId: 'c2', name: 'কাঁসার হাতে খোদাই করা বাটি', nameEn: 'Hand-Engraved Brass Bowl', slug: 'kansar-hate-khodai-kora-bati', description: 'হাতে খোদাই করা খাঁটি কাঁসার বাটি।', story: 'আব্দুল করিম সাত দিন ধরে খোদাই করেছেন।', category: 'home', material: 'কাঁসা', materialEn: 'Brass', origin: 'বগুড়া', originEn: 'Bogura', images: [], regularPrice: 2400, haatDiscount: 15, quantity: 1, availableQuantity: 1, productType: 'one-of-one', isFragile: false, isVerified: true, technique: 'Hand Engraved', createdAt: '2026-09-18', dimensions: '১৮ সেমি ব্যাস', productionMethod: 'হাতে খোদাই' },
  { id: 'p3', creatorId: 'c3', name: 'হাতের বোনা শীতল পাটি', nameEn: 'Handwoven Shital Pati', slug: 'hater-bona-shital-pati', description: 'ঐতিহ্যবাহী শীতল পাটি।', story: 'ফাতেমা বেগম সিলেটের মুর্তা দিয়ে বুনেছেন।', category: 'heritage', material: 'মুর্তা', materialEn: 'Murta', origin: 'সিলেট', originEn: 'Sylhet', images: [], regularPrice: 1500, haatDiscount: 15, quantity: 7, availableQuantity: 7, productType: 'small-batch', isFragile: false, isVerified: true, technique: 'Handwoven', createdAt: '2026-09-10', dimensions: '৬ × ৪ ফুট', productionMethod: 'হাতে বোনা' },
  { id: 'p4', creatorId: 'c4', name: 'হাতে গড়া টেরাকোটা ঘোড়া', nameEn: 'Handcrafted Terracotta Horse', slug: 'hath-e-gora-terracotta-ghora', description: 'ঐতিহ্যবাহী টেরাকোটা ঘোড়ার সমকালীন রূপ।', story: 'রাশেদুল ইসলাম চার দিনে তৈরি করেছেন।', category: 'art', material: 'টেরাকোটা', materialEn: 'Terracotta', origin: 'কুষ্টিয়া', originEn: 'Kushtia', images: [], regularPrice: 3500, haatDiscount: 15, quantity: 1, availableQuantity: 1, productType: 'one-of-one', isFragile: true, isVerified: true, technique: 'Handcrafted', createdAt: '2026-09-20', dimensions: '২৫ × ১৮ সেমি', productionMethod: 'হাতে গড়া' },
  { id: 'p5', creatorId: 'c5', name: 'সমকালীন নকশিকাঁথা কুশন', nameEn: 'Contemporary Nakshi Kantha Cushion', slug: 'samakalin-nakshi-kantha-cushion', description: 'ঐতিহ্যবাহী নকশিকাঁথা সেলাইয়ে আধুনিক কুশন।', story: 'নাজমা আক্তার প্রতিটি সেলাইয়ে গল্প আঁকেন।', category: 'home', material: 'তুলা', materialEn: 'Cotton', origin: 'টাঙ্গাইল', originEn: 'Tangail', images: [], regularPrice: 2200, haatDiscount: 10, quantity: 5, availableQuantity: 5, productType: 'small-batch', isFragile: false, isVerified: true, technique: 'Hand Embroidery', createdAt: '2026-09-12', dimensions: '৪৫ × ৪৫ সেমি', productionMethod: 'হাতে সেলাই' },
  { id: 'p6', creatorId: 'c6', name: 'হাতে তৈরি সিরামিক কাপ', nameEn: 'Handmade Ceramic Cup', slug: 'hath-e-toiri-ceramic-cup', description: 'সমকালীন সিরামিক কাপ।', story: 'করিম মিয়া ঢাকার স্টুডিওতে তৈরি করেছেন।', category: 'home', material: 'সিরামিক', materialEn: 'Ceramic', origin: 'ঢাকা', originEn: 'Dhaka', images: [], regularPrice: 950, haatDiscount: 20, quantity: 8, availableQuantity: 8, productType: 'small-batch', isFragile: true, isVerified: false, technique: 'Wheel Thrown', createdAt: '2026-09-19', dimensions: '৮ × ৯ সেমি', productionMethod: 'হাতে তৈরি' },
  { id: 'p7', creatorId: 'c7', name: 'পাটের দেয়াল শিল্প', nameEn: 'Jute Wall Art', slug: 'pater-deyal-shilpo', description: 'পাটের সুতা দিয়ে তৈরি আধুনিক দেয়াল শিল্প।', story: 'সালমা খাতুনের সৃষ্টি।', category: 'art', material: 'পাট', materialEn: 'Jute', origin: 'রাজশাহী', originEn: 'Rajshahi', images: [], regularPrice: 2800, haatDiscount: 10, quantity: 3, availableQuantity: 3, productType: 'small-batch', isFragile: false, isVerified: true, technique: 'Handwoven', createdAt: '2026-09-08', dimensions: '৬০ × ৪০ সেমি', productionMethod: 'হাতে বোনা' },
  { id: 'p8', creatorId: 'c8', name: 'বাঁশের ল্যাম্প', nameEn: 'Bamboo Lamp', slug: 'bansher-lamp', description: 'বাঁশের তৈরি সমকালীন টেবিল ল্যাম্প।', story: 'ইমরান হোসেন চট্টগ্রামের বাঁশ দিয়ে তৈরি করেছেন।', category: 'home', material: 'বাঁশ', materialEn: 'Bamboo', origin: 'চট্টগ্রাম', originEn: 'Chattogram', images: [], regularPrice: 3200, haatDiscount: 15, quantity: 4, availableQuantity: 4, productType: 'small-batch', isFragile: false, isVerified: true, technique: 'Handcrafted', createdAt: '2026-09-14', dimensions: '৩৫ × ১৫ সেমি', productionMethod: 'হাতে তৈরি' },
  { id: 'p9', creatorId: 'c1', name: 'মাটির ফুলদানি', nameEn: 'Clay Vase', slug: 'matir-phuldani', description: 'হাতে গড়া মাটির ফুলদানি।', story: 'রাহিম উদ্দিনের নতুন সৃষ্টি।', category: 'home', material: 'টেরাকোটা', materialEn: 'Terracotta', origin: 'কুষ্টিয়া', originEn: 'Kushtia', images: [], regularPrice: 1200, haatDiscount: 10, quantity: 5, availableQuantity: 5, productType: 'small-batch', isFragile: true, isVerified: true, technique: 'Handcrafted', createdAt: '2026-09-17', dimensions: '২০ × ১২ সেমি', productionMethod: 'হাতে গড়া' },
  { id: 'p10', creatorId: 'c4', name: 'কাঠের খোদাই করা বাটি', nameEn: 'Hand-Carved Wooden Bowl', slug: 'kather-khodai-kora-bati', description: 'মেহগনি কাঠে হাতে খোদাই করা বাটি।', story: 'রাশেদুল ইসলামের ওয়ার্কশপ থেকে।', category: 'home', material: 'মেহগনি', materialEn: 'Mahogany', origin: 'কুষ্টিয়া', originEn: 'Kushtia', images: [], regularPrice: 2600, haatDiscount: 20, quantity: 1, availableQuantity: 1, productType: 'one-of-one', isFragile: false, isVerified: true, technique: 'Hand Carved', createdAt: '2026-09-21', dimensions: '২২ সেমি ব্যাস', productionMethod: 'হাতে খোদাই' },
  { id: 'p11', creatorId: 'c5', name: 'নকশিকাঁথা ওয়াল হ্যাঙ্গিং', nameEn: 'Nakshi Kantha Wall Hanging', slug: 'nakshi-kantha-wall-hanging', description: 'দেয়াল সাজানোর জন্য নকশিকাঁথা।', story: 'নাজমা আক্তারের গল্প সেলাই।', category: 'art', material: 'তুলা', materialEn: 'Cotton', origin: 'টাঙ্গাইল', originEn: 'Tangail', images: [], regularPrice: 4500, haatDiscount: 10, quantity: 1, availableQuantity: 1, productType: 'one-of-one', isFragile: false, isVerified: true, technique: 'Hand Embroidery', createdAt: '2026-09-22', dimensions: '৮০ × ৬০ সেমি', productionMethod: 'হাতে সেলাই' },
  { id: 'p12', creatorId: 'c8', name: 'বাঁশের ট্রে', nameEn: 'Bamboo Tray', slug: 'bansher-tray', description: 'হাতে তৈরি বাঁশের সার্ভিং ট্রে।', story: 'ইমরান হোসেনের ওয়ার্কশপ থেকে।', category: 'home', material: 'বাঁশ', materialEn: 'Bamboo', origin: 'চট্টগ্রাম', originEn: 'Chattogram', images: [], regularPrice: 1350, haatDiscount: 20, quantity: 6, availableQuantity: 6, productType: 'small-batch', isFragile: false, isVerified: true, technique: 'Handcrafted', createdAt: '2026-09-15', dimensions: '৪০ × ২৫ সেমি', productionMethod: 'হাতে তৈরি' },
];

export const categories = [
  { id: 'craft', name: 'কারুশিল্প', nameEn: 'Craft' },
  { id: 'home', name: 'ঘর', nameEn: 'Home' },
  { id: 'art', name: 'শিল্প', nameEn: 'Art' },
  { id: 'fashion', name: 'ফ্যাশন', nameEn: 'Fashion' },
  { id: 'heritage', name: 'ঐতিহ্য', nameEn: 'Heritage' },
  { id: 'lifestyle', name: 'লাইফস্টাইল', nameEn: 'Lifestyle' },
  { id: 'experimental', name: 'এক্সপেরিমেন্টাল', nameEn: 'Experimental' },
];

export const origins = [
  { id: 'dhaka', name: 'ঢাকা', nameEn: 'Dhaka' },
  { id: 'rajshahi', name: 'রাজশাহী', nameEn: 'Rajshahi' },
  { id: 'kushtia', name: 'কুষ্টিয়া', nameEn: 'Kushtia' },
  { id: 'tangail', name: 'টাঙ্গাইল', nameEn: 'Tangail' },
  { id: 'sylhet', name: 'সিলেট', nameEn: 'Sylhet' },
  { id: 'chattogram', name: 'চট্টগ্রাম', nameEn: 'Chattogram' },
  { id: 'bogura', name: 'বগুড়া', nameEn: 'Bogura' },
];

export const suggestedSearches = [
  'মাটির কাজ',
  'unique gift',
  'handmade lamp',
  'শীতল পাটি',
  'কাঠের কাজ',
  'one of one',
  'কুষ্টিয়ার কারুশিল্প',
];
