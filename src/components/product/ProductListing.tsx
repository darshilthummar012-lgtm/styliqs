'use client'

import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from '@/lib/navigation'
import type { Product, ProductFilters, SortOption } from '@/types/product'
import { filterProducts, emptyFilters, countActiveFilters } from '@/utils/filter'
import { sortProducts } from '@/utils/sort'
import { hasValidDiscount } from '@/utils/price'
import {
  filtersToSearchParams,
  searchParamsToFilters,
} from '@/utils/queryParams'
import { storeConfig } from '@/config/store'
import { Breadcrumbs, type Crumb } from '@/components/ui/Breadcrumbs'
import { FilterSidebar } from '@/components/filters/FilterSidebar'
import { ActiveFilterChips } from '@/components/filters/ActiveFilterChips'
import { SortSelect } from '@/components/filters/SortSelect'
import { ProductGrid } from '@/components/product/ProductGrid'
import { EmptyState } from '@/components/ui/EmptyState'
import { Button } from '@/components/ui/Button'

interface ProductListingProps {
  products: Product[]
  title: string
  description?: string
  breadcrumbs: Crumb[]
  bannerImage?: string
  subNav?: { label: string; href: string }[]
  preserveParams?: string[]
}

export function ProductListing({
  products: baseProducts,
  title,
  description,
  breadcrumbs,
  bannerImage,
  subNav,
  preserveParams = [],
}: ProductListingProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const parsed = useMemo(
    () => searchParamsToFilters(searchParams),
    [searchParams],
  )
  const [filters, setFilters] = useState<ProductFilters>(parsed.filters)
  const [sort, setSort] = useState<SortOption>(parsed.sort)
  const [page, setPage] = useState(parsed.page)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    const next = searchParamsToFilters(searchParams)
    setFilters(next.filters)
    setSort(next.sort)
    setPage(next.page)
  }, [searchParams])

  const syncUrl = (
    nextFilters: ProductFilters,
    nextSort: SortOption,
    nextPage: number,
  ) => {
    const params = filtersToSearchParams(nextFilters, nextSort, nextPage)
    for (const key of preserveParams) {
      const val = searchParams.get(key)
      if (val) params.set(key, val)
    }
    setSearchParams(params, { replace: true })
  }

  const updateFilters = (next: ProductFilters) => {
    setFilters(next)
    setPage(1)
    syncUrl(next, sort, 1)
  }

  const updateSort = (next: SortOption) => {
    setSort(next)
    setPage(1)
    syncUrl(filters, next, 1)
  }

  const clearFilters = () => {
    const empty = emptyFilters()
    setFilters(empty)
    setPage(1)
    syncUrl(empty, sort, 1)
  }

  const catalogMin = useMemo(
    () => Math.min(...baseProducts.map((p) => p.price), 0),
    [baseProducts],
  )
  const catalogMax = useMemo(
    () => Math.max(...baseProducts.map((p) => p.price), 10000),
    [baseProducts],
  )
  const hasRatings = baseProducts.some((p) => p.rating != null && p.ratingSource)
  const hasDiscounts = baseProducts.some(hasValidDiscount)

  const priceValid =
    filters.minPrice == null ||
    filters.maxPrice == null ||
    filters.minPrice <= filters.maxPrice

  const filtered = useMemo(() => {
    if (!priceValid) return []
    return filterProducts(baseProducts, filters)
  }, [baseProducts, filters, priceValid])

  const sorted = useMemo(() => sortProducts(filtered, sort), [filtered, sort])

  const pageSize = storeConfig.pageSize
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const pageItems = sorted.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  )

  const activeCount = countActiveFilters(filters)

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [drawerOpen])

  return (
    <div>
      {bannerImage && (
        <div className="h-36 md:h-48 overflow-hidden bg-bg-secondary">
          <img
            src={bannerImage}
            alt=""
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
      )}

      <div className="container-shop py-8 md:py-10">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="mt-2 text-text-secondary max-w-2xl">{description}</p>
        )}
        <p className="mt-2 text-sm text-text-secondary">
          {sorted.length} product{sorted.length === 1 ? '' : 's'}
          {activeCount > 0 ? ` · ${activeCount} filter${activeCount === 1 ? '' : 's'} applied` : ''}
        </p>

        {subNav && subNav.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {subNav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm border border-border px-3 py-1.5 hover:border-text"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}

        <div className="mt-8 flex gap-8 lg:gap-10">
          <div className="hidden lg:block w-[250px] shrink-0">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2">
              <FilterSidebar
                products={baseProducts}
                filters={filters}
                onChange={updateFilters}
                onClear={clearFilters}
                catalogMin={catalogMin}
                catalogMax={catalogMax}
                hasRatings={hasRatings}
                hasDiscounts={hasDiscounts}
              />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex gap-2 lg:hidden">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDrawerOpen(true)}
                >
                  Filters{activeCount > 0 ? ` (${activeCount})` : ''}
                </Button>
              </div>
              <div className="ml-auto">
                <SortSelect
                  value={sort}
                  onChange={updateSort}
                  hasRatings={hasRatings}
                  hasDiscounts={hasDiscounts}
                />
              </div>
            </div>

            <ActiveFilterChips
              filters={filters}
              onChange={updateFilters}
              onClear={clearFilters}
            />

            {pageItems.length === 0 ? (
              <EmptyState
                title="No products match"
                description="Try adjusting or clearing your filters to see more clothing options."
              >
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-2 text-sm font-medium underline underline-offset-2"
                >
                  Reset filters
                </button>
              </EmptyState>
            ) : (
              <>
                <ProductGrid products={pageItems} />
                {totalPages > 1 && (
                  <div className="mt-10 flex items-center justify-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage <= 1}
                      onClick={() => {
                        const next = currentPage - 1
                        setPage(next)
                        syncUrl(filters, sort, next)
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }}
                    >
                      Previous
                    </Button>
                    <span className="text-sm text-text-secondary">
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage >= totalPages}
                      onClick={() => {
                        const next = currentPage + 1
                        setPage(next)
                        syncUrl(filters, sort, next)
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-text/40"
            aria-label="Close filters"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute bottom-0 inset-x-0 max-h-[85vh] overflow-y-auto bg-bg rounded-t-lg p-5 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">Filters</h2>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="text-sm underline"
              >
                Done
              </button>
            </div>
            <FilterSidebar
              products={baseProducts}
              filters={filters}
              onChange={updateFilters}
              onClear={clearFilters}
              catalogMin={catalogMin}
              catalogMax={catalogMax}
              hasRatings={hasRatings}
              hasDiscounts={hasDiscounts}
            />
          </div>
        </div>
      )}
    </div>
  )
}
