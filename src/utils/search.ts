import type { Product } from '@/types/product'

function tokenize(query: string): string[] {
  return query
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter((t) => t.length > 0)
}

function productSearchBlob(product: Product): string {
  return [
    product.title,
    product.brand,
    product.category,
    product.subcategory,
    product.description,
    product.clothingType,
    product.material,
    product.fit,
    product.gender,
    ...product.colors.map((c) => c.name),
    ...product.styleTags,
    ...product.occasion,
    ...(product.keywords ?? []),
    ...product.features,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
}

function scoreProduct(product: Product, tokens: string[]): number {
  if (tokens.length === 0) return 0
  const blob = productSearchBlob(product)
  const title = product.title.toLowerCase()
  const brand = product.brand.toLowerCase()
  let score = 0

  for (const token of tokens) {
    if (title === token) score += 100
    else if (title.startsWith(token)) score += 50
    else if (title.includes(token)) score += 30
    else if (brand.includes(token)) score += 25
    else if (blob.includes(token)) score += 10
    else return -1
  }

  if (product.isFeatured) score += 5
  if (product.rating) score += product.rating
  return score
}

export function searchProducts(
  products: Product[],
  query: string,
): Product[] {
  const tokens = tokenize(query)
  if (tokens.length === 0) return []

  return products
    .map((product) => ({ product, score: scoreProduct(product, tokens) }))
    .filter((r) => r.score >= 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.product)
}

export function getSearchSuggestions(
  products: Product[],
  query: string,
  limit = 6,
): Product[] {
  return searchProducts(products, query).slice(0, limit)
}
