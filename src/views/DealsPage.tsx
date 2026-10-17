'use client'

import { getDealProducts } from '@/utils/category'
import { ProductListing } from '@/components/product/ProductListing'
import { Seo } from '@/components/ui/Seo'
import { EmptyState } from '@/components/ui/EmptyState'
import { useCatalog } from '@/context/CatalogContext'

export function DealsPage() {
  const { products } = useCatalog()
  const deals = getDealProducts(products)

  if (deals.length === 0) {
    return (
      <>
        <Seo title="Deals" canonicalPath="/deals" />
        <EmptyState
          title="No deals right now"
          description="Deals appear when products have both a current and original price in the catalog."
          action={{ label: 'Browse shop', href: '/shop' }}
        />
      </>
    )
  }

  return (
    <>
      <Seo
        title="Deals"
        description="Catalog discounts based on supplied original and current prices."
        canonicalPath="/deals"
      />
      <ProductListing
        products={deals}
        title="Deals"
        description="Discounts shown only when original and current prices are supplied in the catalog. Live Amazon pricing may differ."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Deals' },
        ]}
      />
    </>
  )
}
