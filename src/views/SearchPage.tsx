'use client'

import { useMemo } from 'react'
import { useSearchParams, Link } from '@/lib/navigation'
import { searchProducts } from '@/utils/search'
import { ProductListing } from '@/components/product/ProductListing'
import { Seo } from '@/components/ui/Seo'
import { EmptyState } from '@/components/ui/EmptyState'
import { useCatalog } from '@/context/CatalogContext'

export function SearchPage() {
  const { products } = useCatalog()
  const [params] = useSearchParams()
  const q = (params.get('q') ?? '').trim()

  const results = useMemo(
    () => (q ? searchProducts(products, q) : []),
    [q, products],
  )

  if (!q) {
    return (
      <>
        <Seo title="Search" canonicalPath="/search" />
        <EmptyState
          title="Search the catalog"
          description="Enter a query such as “black cotton shirt” to find matching clothing."
          action={{ label: 'Browse shop', href: '/shop' }}
        />
      </>
    )
  }

  if (results.length === 0) {
    return (
      <>
        <Seo title={`Search: ${q}`} canonicalPath={`/search?q=${encodeURIComponent(q)}`} />
        <div className="container-shop py-12">
          <EmptyState
            title={`No results for “${q}”`}
            description="Try fewer keywords, a brand name, or browse categories below."
            action={{ label: 'Browse all clothing', href: '/shop' }}
          >
            <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
              <Link to="/category/shirts" className="underline">
                Shirts
              </Link>
              <Link to="/category/dresses" className="underline">
                Dresses
              </Link>
              <Link to="/category/jeans" className="underline">
                Jeans
              </Link>
              <Link to="/deals" className="underline">
                Deals
              </Link>
            </div>
          </EmptyState>
        </div>
      </>
    )
  }

  return (
    <>
      <Seo
        title={`Search: ${q}`}
        description={`Search results for ${q} in the Velora clothing catalog.`}
        canonicalPath={`/search?q=${encodeURIComponent(q)}`}
      />
      <ProductListing
        products={results}
        title={`Results for “${q}”`}
        description="Matches across title, brand, category, color, material, and style tags."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: `Search: ${q}` },
        ]}
        preserveParams={['q']}
      />
    </>
  )
}
