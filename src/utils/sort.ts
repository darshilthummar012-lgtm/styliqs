import type { Product, SortOption } from '@/types/product'
import { getDiscountPercent } from './price'

export function sortProducts(
  products: Product[],
  sort: SortOption,
): Product[] {
  const list = [...products]
  switch (sort) {
    case 'newest':
      return list.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
    case 'price-asc':
      return list.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return list.sort((a, b) => b.price - a.price)
    case 'rating':
      return list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    case 'discount':
      return list.sort(
        (a, b) => (getDiscountPercent(b) ?? 0) - (getDiscountPercent(a) ?? 0),
      )
    case 'alphabetical':
      return list.sort((a, b) => a.title.localeCompare(b.title))
    case 'recommended':
    default:
      return list.sort((a, b) => {
        const score = (p: Product) =>
          (p.isFeatured ? 4 : 0) +
          (p.isEditorsPick ? 2 : 0) +
          (p.isNewArrival ? 1 : 0) +
          (p.rating ?? 0)
        return score(b) - score(a)
      })
  }
}

export const sortLabels: Record<SortOption, string> = {
  recommended: 'Recommended',
  newest: 'Newest first',
  'price-asc': 'Price: low to high',
  'price-desc': 'Price: high to low',
  rating: 'Highest rated',
  discount: 'Highest discount',
  alphabetical: 'Alphabetical',
}
