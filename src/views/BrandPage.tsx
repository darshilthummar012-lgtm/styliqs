'use client'

import { useParams } from '@/lib/navigation'
import { getBrandProducts } from '@/utils/category'
import { ProductListing } from '@/components/product/ProductListing'
import { Seo } from '@/components/ui/Seo'
import { EmptyState } from '@/components/ui/EmptyState'
import { useCatalog } from '@/context/CatalogContext'

export function BrandPage() {
  const { products } = useCatalog()
  const { slug = '' } = useParams()
  const list = getBrandProducts(slug, products)
  const brandName = list[0]?.brand ?? slug.replace(/-/g, ' ')

  if (list.length === 0) {
    return (
      <EmptyState
        title="Brand not found"
        description="No products match this brand in the catalog."
        action={{ label: 'Browse shop', href: '/shop' }}
      />
    )
  }

  return (
    <>
      <Seo
        title={brandName}
        description={`Shop ${brandName} clothing from the Styliqs catalog.`}
        canonicalPath={`/brands/${slug}`}
      />
      <ProductListing
        products={list}
        title={brandName}
        description={`Clothing from ${brandName} in our curated catalog.`}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Brands', href: '/shop' },
          { label: brandName },
        ]}
      />
    </>
  )
}
