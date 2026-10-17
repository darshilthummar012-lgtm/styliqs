export const storeConfig = {
  brandName: 'Styliqs',
  logoSrc: '/styliqs-logo.png',
  tagline: 'Discover your next favorite look.',
  announcement: 'Discover your next favorite look.',
  description:
    'Styliqs is a fashion product discovery destination. Browse curated clothing, compare options, and purchase on Amazon.',
  currency: {
    code: 'INR',
    symbol: '₹',
    locale: 'en-IN',
  },
  siteUrl: 'https://styliqs.example.com',
  contactEmail: 'hello@styliqs.example.com',
  social: {
    instagram: 'https://instagram.com',
    pinterest: 'https://pinterest.com',
  },
  affiliate: {
    programName: 'Amazon Associates',
    disclosureShort:
      'As an Amazon Associate we may earn from qualifying purchases.',
    disclosureFull:
      'Styliqs participates in the Amazon Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon. When you click a “View on Amazon” link and make a qualifying purchase, we may earn a commission at no additional cost to you. Product prices, availability, and ratings shown on this site are based on our catalog and may differ on Amazon at the time of purchase.',
  },
  wishlistKey: 'styliqs-wishlist',
  compareKey: 'styliqs-compare',
  recentlyViewedKey: 'styliqs-recently-viewed',
  recentlyViewedMax: 10,
  compareMax: 4,
  pageSize: 12,
} as const
