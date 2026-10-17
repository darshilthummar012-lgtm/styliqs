'use client'

import { useMemo } from 'react'
import { Link, useParams, useSearchParams } from '@/lib/navigation'
import { getCategoryBySlug, getSubcategories } from '@/data/categories'
import {
  getCategoryDescription,
  getCategoryTitle,
  getProductsForCategory,
} from '@/utils/category'
import { ProductListing } from '@/components/product/ProductListing'
import { Seo } from '@/components/ui/Seo'
import { EmptyState } from '@/components/ui/EmptyState'
import { useCatalog } from '@/context/CatalogContext'

export function CategoryPage() {
  const { products } = useCatalog()
  const { slug = '', subSlug } = useParams()
  const [params] = useSearchParams()
  const gender = params.get('gender')

  const category = getCategoryBySlug(slug)
  const subCategory = subSlug ? getCategoryBySlug(subSlug) : undefined

  const list = useMemo(
    () => getProductsForCategory(slug, subSlug, gender, products),
    [slug, subSlug, gender, products],
  )

  if (!category && slug !== 'new-arrivals') {
    return (
      <EmptyState
        title="Category not found"
        description="This category does not exist in our catalog."
        action={{ label: 'Browse shop', href: '/shop' }}
      />
    )
  }

  const title = getCategoryTitle(slug, subSlug)
  const description = getCategoryDescription(slug, subSlug)
  const banner = subCategory?.image ?? category?.image
  const subs = getSubcategories(slug)

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    ...(subSlug
      ? [
          { label: category?.name ?? slug, href: `/category/${slug}` },
          { label: subCategory?.name ?? subSlug },
        ]
      : [{ label: category?.name ?? title }]),
  ]

  return (
    <>
      <Seo
        title={title}
        description={description}
        canonicalPath={
          subSlug ? `/category/${slug}/${subSlug}` : `/category/${slug}`
        }
        image={banner}
      />
      <ProductListing
        products={list}
        title={title}
        description={description}
        breadcrumbs={breadcrumbs}
        bannerImage={banner}
        subNav={
          !subSlug && subs.length > 0
            ? subs.map((s) => ({
                label: s.name,
                href: `/category/${slug}/${s.slug}`,
              }))
            : undefined
        }
        preserveParams={gender ? ['gender'] : []}
      />
      {list.length === 0 && (
        <div className="container-shop pb-8 -mt-8">
          <p className="text-sm text-text-secondary">
            Looking for something else?{' '}
            <Link to="/shop" className="underline">
              Browse all clothing
            </Link>
          </p>
        </div>
      )}
    </>
  )
}
