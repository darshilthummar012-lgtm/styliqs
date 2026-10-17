import type { Product } from '@/types/product'

export function isValidExternalUrl(url: string | undefined | null): boolean {
  if (!url || typeof url !== 'string') return false
  try {
    const parsed = new URL(url.trim())
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

export function getAmazonDestination(product: Product): string | null {
  const candidate = product.affiliateUrl?.trim() || product.amazonUrl?.trim()
  return isValidExternalUrl(candidate) ? candidate! : null
}

export function openExternalUrl(url: string): void {
  if (!isValidExternalUrl(url)) return
  window.open(url, '_blank', 'noopener,noreferrer')
}
