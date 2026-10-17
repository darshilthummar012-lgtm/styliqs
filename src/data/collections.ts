import type { Collection } from '@/types/product'

export const collections: Collection[] = [
  {
    slug: 'everyday-essentials',
    name: 'Everyday Essentials',
    description: 'Reliable pieces you’ll reach for again and again.',
    image:
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80',
    tags: ['everyday', 'essentials'],
  },
  {
    slug: 'minimalist-wardrobe',
    name: 'Minimalist Wardrobe',
    description: 'Clean silhouettes and considered neutrals.',
    image:
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
    tags: ['minimalist'],
  },
  {
    slug: 'casual-streetwear',
    name: 'Casual Streetwear',
    description: 'Relaxed fits with an urban edge.',
    image:
      'https://images.unsplash.com/photo-1523398002811-799652a710ee?w=800&q=80',
    tags: ['streetwear', 'casual'],
  },
  {
    slug: 'office-wear',
    name: 'Office Wear',
    description: 'Polished looks for the workweek.',
    image:
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80',
    tags: ['office', 'formal'],
  },
  {
    slug: 'summer-style',
    name: 'Summer Style',
    description: 'Light fabrics and warm-weather ease.',
    image:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
    tags: ['summer', 'seasonal'],
  },
  {
    slug: 'winter-layers',
    name: 'Winter Layers',
    description: 'Coats, knits, and cold-weather layering.',
    image:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80',
    tags: ['winter', 'layers'],
  },
  {
    slug: 'trending-denim',
    name: 'Trending Denim',
    description: 'Jeans and denim pieces with modern fits.',
    image:
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80',
    tags: ['denim', 'jeans'],
  },
]

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug)
}
