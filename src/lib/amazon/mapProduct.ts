import type { Product } from '@/types/product'
import type { CreatorsItem } from './types'
import type { CatalogEntry } from '@/data/catalogAsins'

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80)
}

function pickImages(item: CreatorsItem): string[] {
  const primary =
    item.images?.primary?.large?.url ||
    item.images?.primary?.medium?.url ||
    item.images?.primary?.small?.url
  const variants =
    item.images?.variants
      ?.map((v) => v.large?.url || v.medium?.url || v.small?.url)
      .filter((u): u is string => Boolean(u)) ?? []
  return [...new Set([primary, ...variants].filter(Boolean))] as string[]
}

function pickListing(item: CreatorsItem) {
  const listings = item.offersV2?.listings ?? []
  return (
    listings.find((l) => l.isBuyBoxWinner) ||
    listings[0] ||
    undefined
  )
}

/** Map a Creators API item into Styliqs Product shape. */
export function mapCreatorsItemToProduct(
  item: CreatorsItem,
  meta?: CatalogEntry,
): Product | null {
  const title = item.itemInfo?.title?.displayValue?.trim()
  if (!item.asin || !title) return null

  const listing = pickListing(item)
  const price = listing?.price?.money?.amount
  const original = listing?.price?.savingBasis?.money?.amount
  const currency =
    listing?.price?.money?.currency ||
    meta?.currency ||
    'INR'
  const images = pickImages(item)
  const brand =
    item.itemInfo?.byLineInfo?.brand?.displayValue ||
    item.itemInfo?.byLineInfo?.manufacturer?.displayValue ||
    meta?.brand ||
    'Amazon'
  const colorName = item.itemInfo?.productInfo?.color?.displayValue
  const sizeName = item.itemInfo?.productInfo?.size?.displayValue
  const features = item.itemInfo?.features?.displayValues ?? []
  const affiliateUrl = item.detailPageURL
  const today = new Date().toISOString().slice(0, 10)

  return {
    id: `asin-${item.asin}`,
    slug: meta?.slug || `${slugify(title)}-${item.asin.toLowerCase()}`,
    title,
    brand,
    category: meta?.category || 'clothing',
    subcategory: meta?.subcategory,
    gender: meta?.gender || 'unisex',
    description:
      meta?.description ||
      features.slice(0, 2).join(' ') ||
      title,
    price: typeof price === 'number' ? price : meta?.fallbackPrice || 0,
    originalPrice:
      typeof original === 'number' && original > (price ?? 0)
        ? original
        : undefined,
    currency,
    images: images.length
      ? images
      : meta?.fallbackImages || [],
    sizes: sizeName ? [sizeName] : meta?.sizes || [],
    colors: colorName
      ? [{ name: colorName, hex: meta?.colorHex || '#737373' }]
      : meta?.colors || [],
    material: meta?.material,
    fit: meta?.fit,
    styleTags: meta?.styleTags || ['everyday'],
    occasion: meta?.occasion || ['everyday'],
    clothingType: meta?.clothingType || 'everyday',
    rating: item.customerReviews?.starRating?.value,
    reviewCount: item.customerReviews?.count,
    ratingSource: item.customerReviews?.starRating?.value
      ? 'Amazon Creators API'
      : undefined,
    features,
    availability:
      listing?.availability?.type === 'OUT_OF_STOCK'
        ? 'unavailable'
        : 'available',
    amazonUrl: affiliateUrl || `https://www.amazon.in/dp/${item.asin}`,
    affiliateUrl: affiliateUrl,
    lastVerifiedAt: today,
    createdAt: meta?.createdAt || today,
    isFeatured: meta?.isFeatured,
    isNewArrival: meta?.isNewArrival,
    isEditorsPick: meta?.isEditorsPick,
    keywords: meta?.keywords || [title, brand, item.asin],
    care: meta?.care,
  }
}
