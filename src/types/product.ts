export type Gender = 'women' | 'men' | 'unisex'

export type Fit = 'oversized' | 'regular' | 'slim' | 'relaxed'

export type Availability = 'available' | 'unavailable'

export type ClothingType =
  | 'casual'
  | 'formal'
  | 'partywear'
  | 'sportswear'
  | 'loungewear'
  | 'everyday'
  | 'seasonal'

export type Occasion =
  | 'everyday'
  | 'office'
  | 'vacation'
  | 'party'
  | 'wedding-guest'
  | 'streetwear'
  | 'minimalist'
  | 'seasonal'

export interface ProductColor {
  name: string
  hex: string
}

export interface Product {
  id: string
  slug: string
  title: string
  brand: string
  category: string
  subcategory?: string
  gender: Gender
  description: string
  price: number
  originalPrice?: number
  currency: string
  images: string[]
  sizes: string[]
  colors: ProductColor[]
  material?: string
  fit?: Fit
  styleTags: string[]
  occasion: Occasion[]
  clothingType: ClothingType
  rating?: number
  reviewCount?: number
  ratingSource?: string
  features: string[]
  availability: Availability
  amazonUrl: string
  affiliateUrl?: string
  sourceUrl?: string
  lastVerifiedAt?: string
  createdAt: string
  isFeatured?: boolean
  isNewArrival?: boolean
  isEditorsPick?: boolean
  isDemo?: boolean
  keywords?: string[]
  care?: string
}

export interface Category {
  slug: string
  name: string
  description: string
  image: string
  parent?: string
  gender?: Gender | 'all'
  filterKey?: string
}

export interface Collection {
  slug: string
  name: string
  description: string
  image: string
  tags: string[]
}

export interface NavItem {
  label: string
  href: string
  children?: { label: string; href: string }[]
}

export type SortOption =
  | 'recommended'
  | 'newest'
  | 'price-asc'
  | 'price-desc'
  | 'rating'
  | 'discount'
  | 'alphabetical'

export interface ProductFilters {
  categories: string[]
  brands: string[]
  sizes: string[]
  colors: string[]
  clothingTypes: string[]
  genders: string[]
  fits: string[]
  materials: string[]
  occasions: string[]
  availability: string[]
  minPrice?: number
  maxPrice?: number
  minDiscount?: number
  minRating?: number
}
