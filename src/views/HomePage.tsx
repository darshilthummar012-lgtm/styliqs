'use client'

import { Link } from '@/lib/navigation'
import { categories } from '@/data/categories'
import { collections } from '@/data/collections'
import { storeConfig } from '@/config/store'
import {
  getDealProducts,
  getEditorsPicks,
  getFeaturedProducts,
  getNewArrivals,
  getProductsForCollection,
} from '@/utils/category'
import { ProductSection } from '@/components/product/ProductSection'
import { Seo } from '@/components/ui/Seo'
import { SafeImage } from '@/components/ui/SafeImage'
import { BrandLogo } from '@/components/ui/BrandLogo'
import { useRecentlyViewed } from '@/context/RecentlyViewedContext'
import { useCatalog } from '@/context/CatalogContext'

const homeCategories = [
  'women',
  'men',
  't-shirts',
  'shirts',
  'jeans',
  'dresses',
  'jackets',
  'hoodies',
  'activewear',
  'shoes',
  'accessories',
]

export function HomePage() {
  const { products } = useCatalog()
  const featured = getFeaturedProducts(products)
  const newest = getNewArrivals(products)
  const editors = getEditorsPicks(products)
  const deals = getDealProducts(products).slice(0, 8)
  const { products: recent } = useRecentlyViewed()

  const styleCollections = collections.filter(
    (c) => getProductsForCollection(c.slug, products).length > 0,
  )

  return (
    <>
      <Seo
        title="Discover Fashion"
        description={storeConfig.description}
        canonicalPath="/"
      />

      <section className="relative isolate overflow-hidden text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=2000&q=85"
            alt=""
            className="h-full w-full object-cover object-[68%_22%] sm:object-[60%_20%] lg:object-[center_18%]"
            fetchPriority="high"
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(105deg,rgba(18,16,14,0.72)_0%,rgba(18,16,14,0.42)_48%,rgba(18,16,14,0.18)_100%)]"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(to_top,rgba(18,16,14,0.45)_0%,transparent_42%)]"
            aria-hidden="true"
          />
        </div>

        <div className="relative container-shop flex min-h-[52vh] items-end pb-12 pt-16 sm:min-h-[56vh] sm:items-center sm:pb-16 sm:pt-20 md:min-h-[520px] md:max-h-[580px] lg:pb-20">
          <div className="hero-content max-w-lg">
            <BrandLogo variant="light" size="lg" className="opacity-95" />
            <h1 className="mt-5 font-display text-[2rem] font-semibold leading-[1.12] tracking-tight text-white sm:text-[2.5rem] md:text-[2.85rem]">
              Discover Your Next Favorite Look.
            </h1>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/82">
              Curated fashion finds. Explore your style and shop on Amazon.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center bg-white px-7 py-3.5 text-[13px] font-semibold tracking-[0.04em] text-text transition-colors hover:bg-bg-secondary"
              >
                Explore Clothing
              </Link>
              <Link
                to="/category/new-arrivals"
                className="inline-flex items-center justify-center border border-white/65 px-7 py-3.5 text-[13px] font-medium tracking-[0.04em] text-white transition-colors hover:border-white hover:bg-white/10"
              >
                New Arrivals
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bg py-10 md:py-14">
        <div className="container-shop">
          <div className="mb-7 flex items-end justify-between gap-4 md:mb-9">
            <div>
              <p className="section-kicker">Browse</p>
              <h2 className="section-heading mt-2">Shop by category</h2>
            </div>
            <Link
              to="/shop"
              className="shrink-0 text-[13px] font-medium tracking-wide text-text underline decoration-border underline-offset-4 transition-colors hover:decoration-text"
            >
              View all
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {homeCategories.map((slug) => {
              const cat = categories.find((c) => c.slug === slug)
              if (!cat) return null
              return (
                <Link
                  key={slug}
                  to={`/category/${slug}`}
                  className="group relative block aspect-[3/4] overflow-hidden"
                >
                  <SafeImage
                    src={cat.image}
                    alt=""
                    className="absolute inset-0 h-full w-full"
                    imgClassName="transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                  <div
                    className="absolute inset-0 bg-[linear-gradient(to_top,rgba(18,16,14,0.72)_0%,rgba(18,16,14,0.12)_45%,transparent_70%)] transition-opacity duration-300 group-hover:opacity-95"
                    aria-hidden="true"
                  />
                  <span className="absolute inset-x-0 bottom-0 p-3.5 text-[13px] font-medium tracking-wide text-white sm:p-4 sm:text-sm">
                    {cat.name}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <ProductSection
        title="Featured products"
        kicker="Curated"
        products={featured}
        viewAllHref="/shop"
        description="Hand-picked pieces from the catalog."
        tone="muted"
      />

      {styleCollections.length > 0 && (
        <section className="border-t border-border bg-bg py-10 md:py-14">
          <div className="container-shop">
            <div className="mb-7 md:mb-9">
              <p className="section-kicker">Collections</p>
              <h2 className="section-heading mt-2">Shop by style</h2>
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-6 md:grid-cols-3 md:gap-x-5 lg:grid-cols-4">
              {styleCollections.map((col) => (
                <Link key={col.slug} to={`/shop?collection=${col.slug}`} className="group">
                  <SafeImage
                    src={col.image}
                    alt=""
                    className="mb-3 aspect-[3/2] w-full"
                    imgClassName="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                  <h3 className="text-sm font-medium tracking-wide text-text">
                    {col.name}
                  </h3>
                  <p className="mt-0.5 line-clamp-2 text-xs text-text-secondary">
                    {col.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <ProductSection
        title="Recently added"
        kicker="New"
        products={newest}
        viewAllHref="/category/new-arrivals"
      />

      <ProductSection
        title="Editor's picks"
        kicker="Selected"
        products={editors}
        viewAllHref="/shop"
        description="Curated selections from the catalog."
        tone="muted"
      />

      {deals.length > 0 && (
        <ProductSection
          title="Deals"
          kicker="Offers"
          products={deals}
          viewAllHref="/deals"
          description="Based on supplied original and current prices in the catalog."
        />
      )}

      {recent.length > 0 && (
        <ProductSection
          title="Recently viewed"
          kicker="For you"
          products={recent}
          description="Picks you looked at recently on this device."
          tone="muted"
        />
      )}
    </>
  )
}
