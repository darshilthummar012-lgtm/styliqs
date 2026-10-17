'use client'

import { useEffect, useState } from 'react'
import { Link, useParams } from '@/lib/navigation'
import {
  brandToSlug,
  getBrandProducts,
  getProductBySlug,
  getSimilarProducts,
} from '@/utils/category'
import { useCatalog } from '@/context/CatalogContext'
import { formatPrice, getDiscountPercent } from '@/utils/price'
import { useWishlist } from '@/context/WishlistContext'
import { useCompare } from '@/context/CompareContext'
import { useRecentlyViewed } from '@/context/RecentlyViewedContext'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Seo } from '@/components/ui/Seo'
import { EmptyState } from '@/components/ui/EmptyState'
import { ProductImage } from '@/components/product/ProductImage'
import { AmazonButton } from '@/components/product/AmazonButton'
import { ProductSection } from '@/components/product/ProductSection'
import { Button } from '@/components/ui/Button'

export function ProductPage() {
  const { slug = '' } = useParams()
  const { products: catalog } = useCatalog()
  const product = getProductBySlug(slug, catalog)
  const { isWishlisted, toggle } = useWishlist()
  const { isCompared, toggle: toggleCompare, max } = useCompare()
  const { track, products: recent } = useRecentlyViewed()
  const [activeImage, setActiveImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false)
  const [compareMsg, setCompareMsg] = useState('')

  useEffect(() => {
    if (product) {
      track(product.id)
      setActiveImage(0)
      setSelectedSize(null)
    }
  }, [product, track])

  if (!product) {
    return (
      <EmptyState
        title="Product not found"
        description="This product is not in the catalog or may have been removed."
        action={{ label: 'Browse shop', href: '/shop' }}
      />
    )
  }

  const discount = getDiscountPercent(product)
  const similar = getSimilarProducts(product, 4, catalog)
  const moreBrand = getBrandProducts(brandToSlug(product.brand), catalog).filter(
    (p) => p.id !== product.id,
  )
  const recentOthers = recent.filter((p) => p.id !== product.id)

  return (
    <>
      <Seo
        title={product.title}
        description={product.description}
        canonicalPath={`/product/${product.slug}`}
        image={product.images[0]}
      />

      <div className="container-shop py-8 md:py-10">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            {
              label: product.category,
              href: `/category/${product.category}`,
            },
            { label: product.title },
          ]}
        />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <div className="aspect-[3/4] bg-bg-secondary overflow-hidden mb-3">
              <ProductImage
                src={product.images[activeImage] ?? product.images[0]}
                alt={product.title}
                loading="eager"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((img, i) => (
                  <button
                    key={img + i}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    className={`h-20 w-16 shrink-0 overflow-hidden border ${
                      i === activeImage ? 'border-text' : 'border-border'
                    }`}
                    aria-label={`View image ${i + 1}`}
                  >
                    <ProductImage src={img} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <Link
              to={`/brands/${brandToSlug(product.brand)}`}
              className="text-xs uppercase tracking-wider text-text-secondary hover:text-text"
            >
              {product.brand}
            </Link>
            <h1 className="mt-1 text-2xl md:text-3xl font-semibold tracking-tight">
              {product.title}
            </h1>

            <div className="mt-4 flex items-baseline gap-3 flex-wrap">
              <span className="text-xl font-semibold">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice != null &&
                product.originalPrice > product.price && (
                  <span className="text-text-secondary line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              {discount != null && (
                <span className="text-sale text-sm font-medium">
                  {discount}% off
                </span>
              )}
            </div>

            {product.rating != null && product.ratingSource && (
              <p className="mt-2 text-sm text-text-secondary">
                ★ {product.rating.toFixed(1)}
                {product.reviewCount != null
                  ? ` · ${product.reviewCount} reviews`
                  : ''}{' '}
                <span className="text-xs">({product.ratingSource})</span>
              </p>
            )}

            <p className="mt-5 text-text-secondary leading-relaxed">
              {product.description}
            </p>

            {product.isDemo && (
              <p className="mt-3 text-xs border border-border bg-bg-secondary px-3 py-2">
                Sample product for demonstration. Prices and Amazon links are
                placeholders — replace with researched data before publishing.
              </p>
            )}

            {product.colors.length > 0 && (
              <div className="mt-6">
                <p className="text-sm font-medium mb-2">Colors</p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((c) => (
                    <span
                      key={c.name}
                      className="inline-flex items-center gap-2 text-sm border border-border px-2.5 py-1.5"
                    >
                      <span
                        className="h-3.5 w-3.5 rounded-full border border-border"
                        style={{ backgroundColor: c.hex }}
                      />
                      {c.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {product.sizes.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium">
                    Size{selectedSize ? `: ${selectedSize}` : ''}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSizeGuideOpen(true)}
                    className="text-xs underline text-text-secondary"
                  >
                    Size guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-11 px-3 py-2 text-sm border rounded-sm ${
                        selectedSize === size
                          ? 'border-text bg-text text-white'
                          : 'border-border hover:border-text'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-xs text-text-secondary">
                  Size selection is for reference on this site. Amazon may offer
                  its own size options at checkout.
                </p>
              </div>
            )}

            <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
              {product.material && (
                <>
                  <dt className="text-text-secondary">Material</dt>
                  <dd>{product.material}</dd>
                </>
              )}
              {product.fit && (
                <>
                  <dt className="text-text-secondary">Fit</dt>
                  <dd className="capitalize">{product.fit}</dd>
                </>
              )}
              <dt className="text-text-secondary">Style</dt>
              <dd className="capitalize">
                {product.styleTags.slice(0, 3).join(', ')}
              </dd>
              <dt className="text-text-secondary">Retailer</dt>
              <dd>Amazon (external)</dd>
              {product.lastVerifiedAt && (
                <>
                  <dt className="text-text-secondary">Last verified</dt>
                  <dd>{product.lastVerifiedAt}</dd>
                </>
              )}
            </dl>

            <div className="mt-8 space-y-3">
              <AmazonButton product={product} size="lg" fullWidth />
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  onClick={() => toggle(product.id)}
                  className="flex-1"
                >
                  {isWishlisted(product.id)
                    ? 'Remove from wishlist'
                    : 'Add to wishlist'}
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    const ok = toggleCompare(product.id)
                    setCompareMsg(
                      ok
                        ? ''
                        : `You can compare up to ${max} products.`,
                    )
                  }}
                  className="flex-1"
                >
                  {isCompared(product.id)
                    ? 'Remove from compare'
                    : 'Add to compare'}
                </Button>
              </div>
              {compareMsg && (
                <p className="text-xs text-sale" role="status">
                  {compareMsg}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-10 border-t border-border pt-10">
          <section>
            <h2 className="text-lg font-semibold mb-3">Overview</h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              {product.description}
            </p>
            {product.features.length > 0 && (
              <>
                <h3 className="text-sm font-semibold mt-6 mb-2">Features</h3>
                <ul className="list-disc pl-5 text-sm text-text-secondary space-y-1">
                  {product.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </>
            )}
          </section>
          <section>
            <h2 className="text-lg font-semibold mb-3">Material & care</h2>
            <p className="text-sm text-text-secondary">
              {product.material
                ? `Material: ${product.material}.`
                : 'Material details not supplied for this product.'}
            </p>
            {product.care && (
              <p className="text-sm text-text-secondary mt-2">{product.care}</p>
            )}
            <h3 className="text-sm font-semibold mt-6 mb-2">Size information</h3>
            <p className="text-sm text-text-secondary">
              Available sizes in catalog:{' '}
              {product.sizes.length ? product.sizes.join(', ') : 'Not specified'}.
              Confirm fit and availability on Amazon before purchasing.
            </p>
          </section>
        </div>
      </div>

      <ProductSection title="Similar products" products={similar} />
      {moreBrand.length > 0 && (
        <ProductSection
          title={`More from ${product.brand}`}
          products={moreBrand}
          viewAllHref={`/brands/${brandToSlug(product.brand)}`}
        />
      )}
      {recentOthers.length > 0 && (
        <ProductSection title="Recently viewed" products={recentOthers} />
      )}

      <div className="container-shop pb-12">
        <h2 className="text-sm font-semibold mb-3">Related categories</h2>
        <div className="flex flex-wrap gap-2">
          <Link
            to={`/category/${product.category}`}
            className="text-sm border border-border px-3 py-1.5 capitalize hover:border-text"
          >
            {product.category}
          </Link>
          <Link
            to={
              product.gender === 'unisex'
                ? '/shop'
                : `/category/${product.gender}`
            }
            className="text-sm border border-border px-3 py-1.5 capitalize hover:border-text"
          >
            {product.gender === 'unisex' ? 'All clothing' : product.gender}
          </Link>
        </div>
      </div>

      {sizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-text/40"
            aria-label="Close size guide"
            onClick={() => setSizeGuideOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="size-guide-title"
            className="relative bg-bg border border-border max-w-md w-full p-6 shadow-xl"
          >
            <h2 id="size-guide-title" className="text-lg font-semibold mb-3">
              Size guide
            </h2>
            <p className="text-sm text-text-secondary mb-4">
              Fit can vary by brand. Use the sizes listed for this product as a
              guide, and check Amazon&apos;s size chart on the product page
              before purchasing.
            </p>
            <ul className="text-sm space-y-1 mb-4">
              {product.sizes.map((s) => (
                <li key={s}>• {s}</li>
              ))}
            </ul>
            <Button variant="primary" onClick={() => setSizeGuideOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
