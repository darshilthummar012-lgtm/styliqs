import type {
  ClothingType,
  Fit,
  Gender,
  Occasion,
  ProductColor,
} from '@/types/product'

/**
 * Curated Amazon catalog for live Creators API mode.
 * Add products by ASIN (+ optional category metadata).
 * When AMAZON_* credentials are set, the server fetches live title/price/images.
 *
 * Find ASIN on any Amazon product URL: /dp/B0XXXXXXXX or /gp/product/B0XXXXXXXX
 */
export interface CatalogEntry {
  asin: string
  slug?: string
  category: string
  subcategory?: string
  gender?: Gender
  brand?: string
  description?: string
  styleTags?: string[]
  occasion?: Occasion[]
  clothingType?: ClothingType
  material?: string
  fit?: Fit
  sizes?: string[]
  colors?: ProductColor[]
  colorHex?: string
  keywords?: string[]
  care?: string
  currency?: string
  fallbackPrice?: number
  fallbackImages?: string[]
  createdAt?: string
  isFeatured?: boolean
  isNewArrival?: boolean
  isEditorsPick?: boolean
}

/**
 * Start with real ASINs from amazon.in once you have Creators API access.
 * Leave empty to use the local catalog in products.ts as fallback.
 */
export const catalogAsins: CatalogEntry[] = [
  // Example (replace with your researched clothing ASINs):
  // {
  //   asin: 'B0XXXXXXXX',
  //   category: 't-shirts',
  //   gender: 'men',
  //   styleTags: ['casual', 'everyday'],
  //   clothingType: 'casual',
  //   isFeatured: true,
  // },
]

export function getCatalogEntry(asin: string): CatalogEntry | undefined {
  return catalogAsins.find(
    (e) => e.asin.toUpperCase() === asin.toUpperCase(),
  )
}
