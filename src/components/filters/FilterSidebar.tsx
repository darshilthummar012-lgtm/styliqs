'use client'

import { useMemo, useState, type ReactNode } from 'react'
import type { Product, ProductFilters } from '@/types/product'
import { getFacetCounts } from '@/utils/filter'

interface FilterSidebarProps {
  products: Product[]
  filters: ProductFilters
  onChange: (filters: ProductFilters) => void
  onClear: () => void
  catalogMin: number
  catalogMax: number
  hasRatings: boolean
  hasDiscounts: boolean
}

const CATEGORY_OPTIONS = [
  't-shirts',
  'shirts',
  'jeans',
  'trousers',
  'dresses',
  'skirts',
  'jackets',
  'hoodies',
  'sweaters',
  'activewear',
  'shoes',
  'accessories',
]

const CLOTHING_TYPES = [
  'casual',
  'formal',
  'partywear',
  'sportswear',
  'loungewear',
  'everyday',
  'seasonal',
]

const GENDERS = ['women', 'men', 'unisex']
const FITS = ['oversized', 'regular', 'slim', 'relaxed']
const OCCASIONS = [
  'everyday',
  'office',
  'vacation',
  'party',
  'wedding-guest',
  'streetwear',
  'minimalist',
  'seasonal',
]

const PRICE_PRESETS = [
  { label: 'Under ₹1,000', min: 0, max: 1000 },
  { label: '₹1,000 – ₹2,000', min: 1000, max: 2000 },
  { label: '₹2,000 – ₹3,500', min: 2000, max: 3500 },
  { label: 'Over ₹3,500', min: 3500, max: undefined },
]

function toggleValue(list: string[], value: string): string[] {
  return list.includes(value)
    ? list.filter((v) => v !== value)
    : [...list, value]
}

function labelize(value: string): string {
  return value
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export function FilterSidebar({
  products,
  filters,
  onChange,
  onClear,
  catalogMin,
  catalogMax,
  hasRatings,
  hasDiscounts,
}: FilterSidebarProps) {
  const [brandQuery, setBrandQuery] = useState('')
  const brandCounts = useMemo(() => getFacetCounts(products, 'brand'), [products])
  const sizeCounts = useMemo(() => getFacetCounts(products, 'size'), [products])
  const colorCounts = useMemo(() => getFacetCounts(products, 'color'), [products])
  const materialCounts = useMemo(
    () => getFacetCounts(products, 'material'),
    [products],
  )

  const brands = useMemo(() => {
    const all = [...brandCounts.keys()].sort()
    if (!brandQuery.trim()) return all
    const q = brandQuery.toLowerCase()
    return all.filter((b) => b.toLowerCase().includes(q))
  }, [brandCounts, brandQuery])

  const sizes = [...sizeCounts.keys()].sort((a, b) => {
    const order = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    const ai = order.indexOf(a)
    const bi = order.indexOf(b)
    if (ai !== -1 && bi !== -1) return ai - bi
    if (ai !== -1) return -1
    if (bi !== -1) return 1
    return a.localeCompare(b, undefined, { numeric: true })
  })

  const colors = [...colorCounts.keys()].sort()
  const materials = [...materialCounts.keys()].sort()

  const colorHex = useMemo(() => {
    const map = new Map<string, string>()
    for (const p of products) {
      for (const c of p.colors) {
        if (!map.has(c.name)) map.set(c.name, c.hex)
      }
    }
    return map
  }, [products])

  const set = (patch: Partial<ProductFilters>) =>
    onChange({ ...filters, ...patch })

  return (
    <aside className="space-y-7 text-sm" aria-label="Product filters">
      <div className="flex items-center justify-between">
        <h2 className="font-display font-semibold text-base">Filters</h2>
        <button
          type="button"
          onClick={onClear}
          className="text-xs text-text-secondary hover:text-text underline underline-offset-2"
        >
          Clear all
        </button>
      </div>

      <FilterGroup title="Category">
        {CATEGORY_OPTIONS.map((cat) => (
          <Checkbox
            key={cat}
            label={labelize(cat)}
            checked={filters.categories.includes(cat)}
            onChange={() =>
              set({ categories: toggleValue(filters.categories, cat) })
            }
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Price">
        <div className="flex gap-2 mb-3">
          <label className="flex-1">
            <span className="sr-only">Minimum price</span>
            <input
              type="number"
              min={0}
              placeholder="Min"
              value={filters.minPrice ?? ''}
              onChange={(e) => {
                const v = e.target.value
                set({
                  minPrice: v === '' ? undefined : Math.max(0, Number(v)),
                })
              }}
              className="w-full border border-border rounded-sm px-2 py-1.5 text-sm bg-bg"
            />
          </label>
          <label className="flex-1">
            <span className="sr-only">Maximum price</span>
            <input
              type="number"
              min={0}
              placeholder="Max"
              value={filters.maxPrice ?? ''}
              onChange={(e) => {
                const v = e.target.value
                set({
                  maxPrice: v === '' ? undefined : Math.max(0, Number(v)),
                })
              }}
              className="w-full border border-border rounded-sm px-2 py-1.5 text-sm bg-bg"
            />
          </label>
        </div>
        <label className="block mb-3">
          <span className="text-xs text-text-secondary mb-1 block">
            Up to ₹{filters.maxPrice ?? catalogMax}
          </span>
          <input
            type="range"
            min={catalogMin}
            max={catalogMax}
            value={filters.maxPrice ?? catalogMax}
            onChange={(e) => set({ maxPrice: Number(e.target.value) })}
            className="w-full accent-accent"
            aria-label="Maximum price slider"
          />
        </label>
        <div className="space-y-1.5">
          {PRICE_PRESETS.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() =>
                set({ minPrice: preset.min, maxPrice: preset.max })
              }
              className="block text-xs text-text-secondary hover:text-text"
            >
              {preset.label}
            </button>
          ))}
        </div>
        {filters.minPrice != null &&
          filters.maxPrice != null &&
          filters.minPrice > filters.maxPrice && (
            <p className="text-xs text-sale mt-2" role="alert">
              Minimum price cannot exceed maximum.
            </p>
          )}
      </FilterGroup>

      <FilterGroup title="Brand">
        {brands.length > 6 && (
          <input
            type="search"
            placeholder="Search brands"
            value={brandQuery}
            onChange={(e) => setBrandQuery(e.target.value)}
            className="w-full border border-border rounded-sm px-2 py-1.5 text-sm mb-2 bg-bg"
          />
        )}
        <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
          {brands.map((brand) => (
            <Checkbox
              key={brand}
              label={`${brand} (${brandCounts.get(brand) ?? 0})`}
              checked={filters.brands.includes(brand)}
              onChange={() =>
                set({ brands: toggleValue(filters.brands, brand) })
              }
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Size">
        <div className="flex flex-wrap gap-1.5">
          {sizes.map((size) => {
            const active = filters.sizes.includes(size)
            return (
              <button
                key={size}
                type="button"
                aria-pressed={active}
                onClick={() =>
                  set({ sizes: toggleValue(filters.sizes, size) })
                }
                className={`min-w-9 px-2 py-1.5 text-xs border rounded-sm ${
                  active
                    ? 'border-text bg-text text-white'
                    : 'border-border hover:border-text'
                }`}
              >
                {size}
              </button>
            )
          })}
        </div>
      </FilterGroup>

      <FilterGroup title="Color">
        <div className="space-y-1.5">
          {colors.map((color) => {
            const active = filters.colors.includes(color)
            return (
              <label
                key={color}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={active}
                  onChange={() =>
                    set({ colors: toggleValue(filters.colors, color) })
                  }
                  className="sr-only"
                />
                <span
                  className={`h-5 w-5 rounded-full border-2 ${active ? 'border-text' : 'border-border'}`}
                  style={{ backgroundColor: colorHex.get(color) ?? '#ccc' }}
                  aria-hidden="true"
                />
                <span className={active ? 'font-medium' : ''}>
                  {color} ({colorCounts.get(color) ?? 0})
                </span>
              </label>
            )
          })}
        </div>
      </FilterGroup>

      <FilterGroup title="Clothing type">
        {CLOTHING_TYPES.map((t) => (
          <Checkbox
            key={t}
            label={labelize(t)}
            checked={filters.clothingTypes.includes(t)}
            onChange={() =>
              set({ clothingTypes: toggleValue(filters.clothingTypes, t) })
            }
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Gender / fit">
        <p className="text-xs text-text-secondary mb-1.5">Gender</p>
        {GENDERS.map((g) => (
          <Checkbox
            key={g}
            label={labelize(g)}
            checked={filters.genders.includes(g)}
            onChange={() =>
              set({ genders: toggleValue(filters.genders, g) })
            }
          />
        ))}
        <p className="text-xs text-text-secondary mt-3 mb-1.5">Fit</p>
        {FITS.map((f) => (
          <Checkbox
            key={f}
            label={labelize(f)}
            checked={filters.fits.includes(f)}
            onChange={() => set({ fits: toggleValue(filters.fits, f) })}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Fabric and material">
        {materials.map((m) => (
          <Checkbox
            key={m}
            label={`${m} (${materialCounts.get(m) ?? 0})`}
            checked={filters.materials.includes(m)}
            onChange={() =>
              set({ materials: toggleValue(filters.materials, m) })
            }
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Availability">
        <Checkbox
          label="Available to view"
          checked={filters.availability.includes('available')}
          onChange={() =>
            set({
              availability: toggleValue(filters.availability, 'available'),
            })
          }
        />
        <p className="text-[11px] text-text-secondary mt-1">
          Based on last supplied catalog data — not live Amazon inventory.
        </p>
      </FilterGroup>

      {hasDiscounts && (
        <FilterGroup title="Discount">
          {[10, 20, 30].map((d) => (
            <Checkbox
              key={d}
              label={`${d}% or more`}
              checked={filters.minDiscount === d}
              onChange={() =>
                set({
                  minDiscount: filters.minDiscount === d ? undefined : d,
                })
              }
            />
          ))}
        </FilterGroup>
      )}

      {hasRatings && (
        <FilterGroup title="Rating">
          {[4, 3].map((r) => (
            <Checkbox
              key={r}
              label={`${r}★ & up`}
              checked={filters.minRating === r}
              onChange={() =>
                set({
                  minRating: filters.minRating === r ? undefined : r,
                })
              }
            />
          ))}
        </FilterGroup>
      )}

      <FilterGroup title="Style and occasion">
        {OCCASIONS.map((o) => (
          <Checkbox
            key={o}
            label={labelize(o)}
            checked={filters.occasions.includes(o)}
            onChange={() =>
              set({ occasions: toggleValue(filters.occasions, o) })
            }
          />
        ))}
      </FilterGroup>
    </aside>
  )
}

function FilterGroup({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <fieldset className="border-t border-border pt-5">
      <legend className="font-medium text-sm mb-3">{title}</legend>
      <div className="space-y-1.5">{children}</div>
    </fieldset>
  )
}

function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: () => void
}) {
  return (
    <label className="flex items-start gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="mt-0.5 accent-accent"
      />
      <span className="leading-snug">{label}</span>
    </label>
  )
}
