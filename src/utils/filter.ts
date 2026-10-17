import type { Product, ProductFilters } from '@/types/product'
import { getDiscountPercent } from './price'

export const emptyFilters = (): ProductFilters => ({
  categories: [],
  brands: [],
  sizes: [],
  colors: [],
  clothingTypes: [],
  genders: [],
  fits: [],
  materials: [],
  occasions: [],
  availability: [],
})

function matchesMulti(selected: string[], value: string | undefined): boolean {
  if (selected.length === 0) return true
  if (!value) return false
  return selected.some((s) => s.toLowerCase() === value.toLowerCase())
}

function matchesAny(
  selected: string[],
  values: string[] | undefined,
): boolean {
  if (selected.length === 0) return true
  if (!values || values.length === 0) return false
  const lower = values.map((v) => v.toLowerCase())
  return selected.some((s) => lower.includes(s.toLowerCase()))
}

export function filterProducts(
  products: Product[],
  filters: ProductFilters,
): Product[] {
  return products.filter((product) => {
    if (!matchesMulti(filters.categories, product.category)) return false
    if (!matchesMulti(filters.brands, product.brand)) return false
    if (!matchesAny(filters.sizes, product.sizes)) return false
    if (
      !matchesAny(
        filters.colors,
        product.colors.map((c) => c.name),
      )
    )
      return false
    if (!matchesMulti(filters.clothingTypes, product.clothingType)) return false
    if (!matchesMulti(filters.genders, product.gender)) return false
    if (!matchesMulti(filters.fits, product.fit)) return false
    if (!matchesMulti(filters.materials, product.material)) return false
    if (!matchesAny(filters.occasions, product.occasion)) return false
    if (!matchesMulti(filters.availability, product.availability)) return false

    if (filters.minPrice != null && product.price < filters.minPrice)
      return false
    if (filters.maxPrice != null && product.price > filters.maxPrice)
      return false

    if (filters.minDiscount != null) {
      const discount = getDiscountPercent(product)
      if (discount == null || discount < filters.minDiscount) return false
    }

    if (filters.minRating != null) {
      if (product.rating == null || product.rating < filters.minRating)
        return false
    }

    return true
  })
}

export function countActiveFilters(filters: ProductFilters): number {
  let count = 0
  const arrays: (keyof ProductFilters)[] = [
    'categories',
    'brands',
    'sizes',
    'colors',
    'clothingTypes',
    'genders',
    'fits',
    'materials',
    'occasions',
    'availability',
  ]
  for (const key of arrays) {
    const val = filters[key]
    if (Array.isArray(val)) count += val.length
  }
  if (filters.minPrice != null) count++
  if (filters.maxPrice != null) count++
  if (filters.minDiscount != null) count++
  if (filters.minRating != null) count++
  return count
}

export function getFacetCounts(
  products: Product[],
  key: 'brand' | 'category' | 'material' | 'size' | 'color' | 'gender' | 'fit' | 'clothingType',
): Map<string, number> {
  const map = new Map<string, number>()
  for (const p of products) {
    if (key === 'brand') {
      map.set(p.brand, (map.get(p.brand) ?? 0) + 1)
    } else if (key === 'category') {
      map.set(p.category, (map.get(p.category) ?? 0) + 1)
    } else if (key === 'material' && p.material) {
      map.set(p.material, (map.get(p.material) ?? 0) + 1)
    } else if (key === 'gender') {
      map.set(p.gender, (map.get(p.gender) ?? 0) + 1)
    } else if (key === 'fit' && p.fit) {
      map.set(p.fit, (map.get(p.fit) ?? 0) + 1)
    } else if (key === 'clothingType') {
      map.set(p.clothingType, (map.get(p.clothingType) ?? 0) + 1)
    } else if (key === 'size') {
      for (const s of p.sizes) map.set(s, (map.get(s) ?? 0) + 1)
    } else if (key === 'color') {
      for (const c of p.colors) map.set(c.name, (map.get(c.name) ?? 0) + 1)
    }
  }
  return map
}
