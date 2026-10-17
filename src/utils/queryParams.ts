import type { ProductFilters, SortOption } from '@/types/product'
import { emptyFilters } from './filter'

function split(value: string | null): string[] {
  if (!value) return []
  return value.split(',').map((s) => s.trim()).filter(Boolean)
}

export function filtersToSearchParams(
  filters: ProductFilters,
  sort: SortOption,
  page: number,
): URLSearchParams {
  const params = new URLSearchParams()
  const setList = (key: string, values: string[]) => {
    if (values.length) params.set(key, values.join(','))
  }

  setList('category', filters.categories)
  setList('brand', filters.brands)
  setList('size', filters.sizes)
  setList('color', filters.colors)
  setList('type', filters.clothingTypes)
  setList('gender', filters.genders)
  setList('fit', filters.fits)
  setList('material', filters.materials)
  setList('occasion', filters.occasions)
  setList('availability', filters.availability)

  if (filters.minPrice != null) params.set('minPrice', String(filters.minPrice))
  if (filters.maxPrice != null) params.set('maxPrice', String(filters.maxPrice))
  if (filters.minDiscount != null)
    params.set('minDiscount', String(filters.minDiscount))
  if (filters.minRating != null)
    params.set('minRating', String(filters.minRating))
  if (sort !== 'recommended') params.set('sort', sort)
  if (page > 1) params.set('page', String(page))

  return params
}

export function searchParamsToFilters(
  params: { get: (name: string) => string | null },
): { filters: ProductFilters; sort: SortOption; page: number } {
  const filters = emptyFilters()
  filters.categories = split(params.get('category'))
  filters.brands = split(params.get('brand'))
  filters.sizes = split(params.get('size'))
  filters.colors = split(params.get('color'))
  filters.clothingTypes = split(params.get('type'))
  filters.genders = split(params.get('gender'))
  filters.fits = split(params.get('fit'))
  filters.materials = split(params.get('material'))
  filters.occasions = split(params.get('occasion'))
  filters.availability = split(params.get('availability'))

  const minPrice = params.get('minPrice')
  const maxPrice = params.get('maxPrice')
  const minDiscount = params.get('minDiscount')
  const minRating = params.get('minRating')

  if (minPrice != null && minPrice !== '') filters.minPrice = Number(minPrice)
  if (maxPrice != null && maxPrice !== '') filters.maxPrice = Number(maxPrice)
  if (minDiscount != null && minDiscount !== '')
    filters.minDiscount = Number(minDiscount)
  if (minRating != null && minRating !== '')
    filters.minRating = Number(minRating)

  const sort = (params.get('sort') as SortOption) || 'recommended'
  const page = Math.max(1, Number(params.get('page') || '1') || 1)

  return { filters, sort, page }
}
