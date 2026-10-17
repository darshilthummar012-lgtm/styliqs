'use client'

import { useWishlist } from '@/context/WishlistContext'
import { ProductGrid } from '@/components/product/ProductGrid'
import { EmptyState } from '@/components/ui/EmptyState'
import { Seo } from '@/components/ui/Seo'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Button } from '@/components/ui/Button'

export function WishlistPage() {
  const { products, count, clear } = useWishlist()

  return (
    <>
      <Seo
        title="Wishlist"
        description="Your saved clothing favorites, stored on this device."
        canonicalPath="/wishlist"
      />
      <div className="container-shop py-8 md:py-10">
        <Breadcrumbs
          items={[{ label: 'Home', href: '/' }, { label: 'Wishlist' }]}
        />
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Wishlist</h1>
            <p className="mt-1 text-sm text-text-secondary">
              {count} saved product{count === 1 ? '' : 's'} · Stored locally on
              this device
            </p>
          </div>
          {count > 0 && (
            <Button variant="ghost" size="sm" onClick={clear}>
              Clear wishlist
            </Button>
          )}
        </div>

        {count === 0 ? (
          <EmptyState
            title="Your wishlist is empty"
            description="Tap the heart on product cards to save clothing you want to revisit."
            action={{ label: 'Browse clothing', href: '/shop' }}
          />
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
    </>
  )
}
