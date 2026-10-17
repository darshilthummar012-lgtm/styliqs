'use client'

import { Link } from '@/lib/navigation'
import { useState } from 'react'
import type { Product } from '@/types/product'
import { formatPrice, getDiscountPercent } from '@/utils/price'
import { useWishlist } from '@/context/WishlistContext'
import { useCompare } from '@/context/CompareContext'
import { ProductImage } from './ProductImage'
import { AmazonButton } from './AmazonButton'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { isWishlisted, toggle } = useWishlist()
  const { isCompared, toggle: toggleCompare, max } = useCompare()
  const [compareMsg, setCompareMsg] = useState('')
  const discount = getDiscountPercent(product)
  const wished = isWishlisted(product.id)
  const compared = isCompared(product.id)
  const secondary = product.images[1]

  return (
    <article className="group flex h-full flex-col">
      <div className="relative mb-3 aspect-[3/4] overflow-hidden bg-bg-secondary">
        <Link to={`/product/${product.slug}`} className="block h-full w-full">
          <div className="relative h-full w-full">
            <ProductImage
              src={product.images[0]}
              alt={product.title}
              className={`transition-transform duration-500 ease-out group-hover:scale-[1.03] ${
                secondary ? 'group-hover:opacity-0' : ''
              }`}
            />
            {secondary && (
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <ProductImage
                  src={secondary}
                  alt={`${product.title} alternate view`}
                />
              </div>
            )}
          </div>
        </Link>

        {discount != null && (
          <span className="absolute left-2 top-2 bg-sale px-2 py-1 text-[10px] font-semibold tracking-wide text-white">
            -{discount}%
          </span>
        )}

        {product.isDemo && (
          <span className="absolute bottom-2 left-2 border border-border bg-bg/95 px-1.5 py-0.5 text-[10px] text-text-secondary">
            Sample
          </span>
        )}

        <button
          type="button"
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
          onClick={() => toggle(product.id)}
          className={`absolute right-2 top-2 flex h-8 w-8 items-center justify-center border border-border/80 bg-bg/95 transition-colors ${
            wished ? 'text-sale' : 'text-text hover:border-text'
          }`}
        >
          <HeartIcon filled={wished} />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-1">
        <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-text-secondary">
          {product.brand}
        </p>
        <Link
          to={`/product/${product.slug}`}
          className="line-clamp-2 text-[13px] font-medium leading-snug text-text transition-colors hover:text-accent-deep"
        >
          {product.title}
        </Link>

        <div className="mt-0.5 flex flex-wrap items-baseline gap-2">
          <span className="text-sm font-semibold tracking-tight">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice != null &&
            product.originalPrice > product.price && (
              <span className="text-xs text-text-secondary line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
        </div>

        {product.rating != null && product.ratingSource && (
          <p className="text-[11px] text-text-secondary">
            <span className="text-accent-deep">★</span>{' '}
            {product.rating.toFixed(1)}
            {product.reviewCount != null ? ` (${product.reviewCount})` : ''}
          </p>
        )}

        {product.colors.length > 0 && (
          <div className="mt-1.5 flex gap-1.5" aria-label="Available colors">
            {product.colors.slice(0, 4).map((c) => (
              <span
                key={c.name}
                title={c.name}
                className="h-2.5 w-2.5 border border-border"
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        )}

        <div className="mt-auto flex flex-col gap-2 pt-3">
          <div className="flex items-center justify-between gap-2">
            <Link
              to={`/product/${product.slug}`}
              className="text-[11px] font-medium tracking-wide text-text-secondary underline decoration-border underline-offset-2 transition-colors hover:text-text hover:decoration-text"
            >
              View Details
            </Link>
            <button
              type="button"
              onClick={() => {
                const ok = toggleCompare(product.id)
                if (!ok) setCompareMsg(`Compare up to ${max} products.`)
                else setCompareMsg('')
              }}
              className={`text-[11px] tracking-wide transition-colors ${
                compared
                  ? 'text-accent-deep'
                  : 'text-text-secondary hover:text-text'
              }`}
            >
              {compared ? 'Compared' : 'Compare'}
            </button>
          </div>
          <AmazonButton product={product} size="sm" fullWidth showHint={false} />
          {compareMsg && (
            <p className="text-[11px] text-sale" role="status">
              {compareMsg}
            </p>
          )}
        </div>
      </div>
    </article>
  )
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}
