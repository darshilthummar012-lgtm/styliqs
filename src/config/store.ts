export const storeConfig = {
  brandName: 'Velora',
  logoSrc: '/velora-logo.png',
  tagline: 'Discover your next favorite look.',
  announcement: 'Discover your next favorite look.',
  description:
    'Velora is a fashion product discovery destination. Browse curated clothing, compare options, and purchase on Amazon.',
  currency: {
    code: 'INR',
    symbol: '₹',
    locale: 'en-IN',
  },
  siteUrl: 'https://velora.example.com',
  contactEmail: 'hello@velora.example.com',
  social: {
    instagram: 'https://instagram.com',
    pinterest: 'https://pinterest.com',
  },
  affiliate: {
    programName: 'Amazon Associates',
    disclosureShort:
      'As an Amazon Associate we may earn from qualifying purchases.',
    disclosureFull:
      'Velora participates in the Amazon Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon. When you click a “View on Amazon” link and make a qualifying purchase, we may earn a commission at no additional cost to you. Product prices, availability, and ratings shown on this site are demonstration or last-verified values from our local catalog and may differ on Amazon.',
  },
  demo: {
    notice:
      'Sample catalog for demonstration. Prices and Amazon links are placeholders — replace with your researched products before going live.',
  },
  wishlistKey: 'velora-wishlist',
  compareKey: 'velora-compare',
  recentlyViewedKey: 'velora-recently-viewed',
  recentlyViewedMax: 10,
  compareMax: 4,
  pageSize: 12,
} as const
