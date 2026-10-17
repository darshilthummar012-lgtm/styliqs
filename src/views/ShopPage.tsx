'use client'

import { useMemo } from 'react'
import { useSearchParams } from '@/lib/navigation'
import { getCollectionBySlug } from '@/data/collections'
import { getProductsForCollection } from '@/utils/category'
import { ProductListing } from '@/components/product/ProductListing'
import { Seo } from '@/components/ui/Seo'
import { useCatalog } from '@/context/CatalogContext'

export function ShopPage() {
  const { products } = useCatalog()
  const [params] = useSearchParams()
  const collectionSlug = params.get('collection')
  const collection = collectionSlug
    ? getCollectionBySlug(collectionSlug)
    : undefined

  const list = useMemo(() => {
    if (collection) return getProductsForCollection(collection.slug, products)
    return products
  }, [collection, products])

  const title = collection ? collection.name : 'All Clothing'
  const description = collection
    ? collection.description
    : 'Browse the full clothing catalog. Filter by size, color, brand, and more — then purchase on Amazon.'

  return (
    <>
      <Seo title={title} description={description} canonicalPath="/shop" />
      <ProductListing
        products={list}
        title={title}
        description={description}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: collection ? collection.name : 'Shop' },
        ]}
        preserveParams={collection ? ['collection'] : []}
      />
    </>
  )
}
