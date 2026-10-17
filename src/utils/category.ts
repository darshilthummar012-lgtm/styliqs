import { products as defaultProducts } from '@/data/products'
import { getCategoryBySlug } from '@/data/categories'
import { getCollectionBySlug } from '@/data/collections'
import type { Product } from '@/types/product'

export function getProductsForCategory(
  slug: string,
  subSlug?: string,
  genderParam?: string | null,
  catalog: Product[] = defaultProducts,
): Product[] {
  if (slug === 'new-arrivals') {
    return catalog.filter((p) => p.isNewArrival)
  }

  if (slug === 'women' || slug === 'men') {
    let list = catalog.filter(
      (p) => p.gender === slug || p.gender === 'unisex',
    )
    if (subSlug) {
      list = list.filter((p) => p.category === subSlug)
    }
    return list
  }

  let list = catalog.filter((p) => p.category === slug)
  if (subSlug) {
    list = list.filter((p) => p.subcategory === subSlug)
  }
  if (genderParam === 'women' || genderParam === 'men') {
    list = list.filter(
      (p) => p.gender === genderParam || p.gender === 'unisex',
    )
  }
  return list
}

export function getProductsForCollection(
  slug: string,
  catalog: Product[] = defaultProducts,
): Product[] {
  const collection = getCollectionBySlug(slug)
  if (!collection) return []
  return catalog.filter((p) =>
    collection.tags.some(
      (tag) =>
        p.styleTags.some((t) => t.toLowerCase() === tag.toLowerCase()) ||
        p.occasion.some((o) => o.toLowerCase() === tag.toLowerCase()) ||
        p.category.toLowerCase() === tag.toLowerCase() ||
        p.clothingType.toLowerCase() === tag.toLowerCase(),
    ),
  )
}

export function getCategoryTitle(slug: string, subSlug?: string): string {
  if (subSlug) {
    const sub = getCategoryBySlug(subSlug)
    const parent = getCategoryBySlug(slug)
    if (sub && parent)
      return `${parent.name.replace(/'s Clothing/, '')}'s ${sub.name}`
    if (sub) return sub.name
  }
  return getCategoryBySlug(slug)?.name ?? 'Shop'
}

export function getCategoryDescription(slug: string, subSlug?: string): string {
  if (subSlug) {
    return (
      getCategoryBySlug(subSlug)?.description ??
      'Explore curated clothing from our local catalog.'
    )
  }
  return (
    getCategoryBySlug(slug)?.description ??
    'Browse clothing selected for style, fit, and everyday wear.'
  )
}

export function getDealProducts(catalog: Product[] = defaultProducts): Product[] {
  return catalog.filter(
    (p) =>
      p.originalPrice != null &&
      p.originalPrice > p.price &&
      p.availability === 'available',
  )
}

export function getFeaturedProducts(
  catalog: Product[] = defaultProducts,
): Product[] {
  return catalog.filter((p) => p.isFeatured)
}

export function getEditorsPicks(
  catalog: Product[] = defaultProducts,
): Product[] {
  return catalog.filter((p) => p.isEditorsPick)
}

export function getNewArrivals(catalog: Product[] = defaultProducts): Product[] {
  return catalog
    .filter((p) => p.isNewArrival)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
}

export function getSimilarProducts(
  product: Product,
  limit = 4,
  catalog: Product[] = defaultProducts,
): Product[] {
  return catalog
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.category === product.category ||
          p.brand === product.brand ||
          p.styleTags.some((t) => product.styleTags.includes(t))),
    )
    .slice(0, limit)
}

export function getBrandProducts(
  brandSlug: string,
  catalog: Product[] = defaultProducts,
): Product[] {
  return catalog.filter((p) => brandToSlug(p.brand) === brandSlug)
}

export function brandToSlug(brand: string): string {
  return brand
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function getProductBySlug(
  slug: string,
  catalog: Product[] = defaultProducts,
): Product | undefined {
  return catalog.find((p) => p.slug === slug)
}
