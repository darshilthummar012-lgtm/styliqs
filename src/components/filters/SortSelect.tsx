'use client'

import type { SortOption } from '@/types/product'
import { sortLabels } from '@/utils/sort'

interface SortSelectProps {
  value: SortOption
  onChange: (value: SortOption) => void
  hasRatings: boolean
  hasDiscounts: boolean
}

export function SortSelect({
  value,
  onChange,
  hasRatings,
  hasDiscounts,
}: SortSelectProps) {
  const options = (Object.keys(sortLabels) as SortOption[]).filter((opt) => {
    if (opt === 'rating' && !hasRatings) return false
    if (opt === 'discount' && !hasDiscounts) return false
    return true
  })

  return (
    <label className="inline-flex items-center gap-2 text-sm">
      <span className="text-text-secondary whitespace-nowrap">Sort by</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="border border-border rounded-sm bg-bg px-3 py-2 text-sm"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {sortLabels[opt]}
          </option>
        ))}
      </select>
    </label>
  )
}
