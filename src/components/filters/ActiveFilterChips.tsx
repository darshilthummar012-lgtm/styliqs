'use client'

import type { ProductFilters } from '@/types/product'
import { formatPrice } from '@/utils/price'

interface ActiveFilterChipsProps {
  filters: ProductFilters
  onChange: (filters: ProductFilters) => void
  onClear: () => void
}

function removeFrom(list: string[], value: string) {
  return list.filter((v) => v !== value)
}

export function ActiveFilterChips({
  filters,
  onChange,
  onClear,
}: ActiveFilterChipsProps) {
  const chips: { key: string; label: string; clear: () => void }[] = []

  const pushList = (
    values: string[],
    prefix: string,
    field: keyof ProductFilters,
  ) => {
    for (const v of values) {
      chips.push({
        key: `${field}-${v}`,
        label: `${prefix}: ${v}`,
        clear: () =>
          onChange({
            ...filters,
            [field]: removeFrom(values, v),
          }),
      })
    }
  }

  pushList(filters.categories, 'Category', 'categories')
  pushList(filters.brands, 'Brand', 'brands')
  pushList(filters.sizes, 'Size', 'sizes')
  pushList(filters.colors, 'Color', 'colors')
  pushList(filters.clothingTypes, 'Type', 'clothingTypes')
  pushList(filters.genders, 'Gender', 'genders')
  pushList(filters.fits, 'Fit', 'fits')
  pushList(filters.materials, 'Material', 'materials')
  pushList(filters.occasions, 'Occasion', 'occasions')
  pushList(filters.availability, 'Availability', 'availability')

  if (filters.minPrice != null) {
    chips.push({
      key: 'minPrice',
      label: `Min ${formatPrice(filters.minPrice)}`,
      clear: () => onChange({ ...filters, minPrice: undefined }),
    })
  }
  if (filters.maxPrice != null) {
    chips.push({
      key: 'maxPrice',
      label: `Max ${formatPrice(filters.maxPrice)}`,
      clear: () => onChange({ ...filters, maxPrice: undefined }),
    })
  }
  if (filters.minDiscount != null) {
    chips.push({
      key: 'minDiscount',
      label: `${filters.minDiscount}%+ off`,
      clear: () => onChange({ ...filters, minDiscount: undefined }),
    })
  }
  if (filters.minRating != null) {
    chips.push({
      key: 'minRating',
      label: `${filters.minRating}★+`,
      clear: () => onChange({ ...filters, minRating: undefined }),
    })
  }

  if (chips.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={chip.clear}
          className="inline-flex items-center gap-1.5 border border-border bg-bg-secondary px-2.5 py-1 text-xs hover:border-text"
        >
          {chip.label}
          <span aria-hidden="true">×</span>
          <span className="sr-only">Remove {chip.label}</span>
        </button>
      ))}
      <button
        type="button"
        onClick={onClear}
        className="text-xs underline underline-offset-2 text-text-secondary hover:text-text"
      >
        Clear all
      </button>
    </div>
  )
}
