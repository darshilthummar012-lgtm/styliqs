import { storeConfig } from '@/config/store'
import type { Product } from '@/types/product'

export function formatPrice(amount: number, currency = storeConfig.currency.code): string {
  return new Intl.NumberFormat(storeConfig.currency.locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function getDiscountPercent(product: Product): number | null {
  if (
    product.originalPrice == null ||
    product.originalPrice <= product.price ||
    product.price <= 0
  ) {
    return null
  }
  return Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100,
  )
}

export function hasValidDiscount(product: Product): boolean {
  return getDiscountPercent(product) != null
}
