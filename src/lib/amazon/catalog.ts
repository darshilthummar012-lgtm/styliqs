import { products as localProducts } from '@/data/products'
import { catalogAsins } from '@/data/catalogAsins'
import type { Product } from '@/types/product'
import { getItemsBatched, isAmazonConfigured } from './client'
import { mapCreatorsItemToProduct } from './mapProduct'

export function useLiveAmazonCatalog(): boolean {
  return (
    process.env.AMAZON_LIVE_CATALOG !== 'false' &&
    isAmazonConfigured() &&
    catalogAsins.length > 0
  )
}

/** Server-side catalog: live Creators API when configured, else local sample data. */
export async function loadCatalog(): Promise<{
  products: Product[]
  source: 'amazon' | 'local'
}> {
  if (!useLiveAmazonCatalog()) {
    return { products: localProducts, source: 'local' }
  }

  try {
    const asins = catalogAsins.map((e) => e.asin)
    const items = await getItemsBatched(asins)
    const byAsin = new Map(items.map((i) => [i.asin.toUpperCase(), i]))

    const products = catalogAsins
      .map((entry) => {
        const item = byAsin.get(entry.asin.toUpperCase())
        if (!item) return null
        return mapCreatorsItemToProduct(item, entry)
      })
      .filter((p): p is Product => Boolean(p))

    if (products.length === 0) {
      return { products: localProducts, source: 'local' }
    }

    return { products, source: 'amazon' }
  } catch (error) {
    console.error('Amazon catalog load failed, using local fallback', error)
    return { products: localProducts, source: 'local' }
  }
}

export async function loadProductByAsin(asin: string): Promise<Product | null> {
  if (!isAmazonConfigured()) return null
  const { getItems } = await import('./client')
  const result = await getItems([asin])
  const item =
    result.itemsResult?.items?.[0] ?? result.itemResults?.items?.[0]
  if (!item) return null
  const meta = catalogAsins.find(
    (e) => e.asin.toUpperCase() === asin.toUpperCase(),
  )
  return mapCreatorsItemToProduct(item, meta)
}
