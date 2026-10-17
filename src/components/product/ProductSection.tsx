'use client'

import { Link } from '@/lib/navigation'
import type { Product } from '@/types/product'
import { ProductGrid } from './ProductGrid'

interface ProductSectionProps {
  title: string
  products: Product[]
  viewAllHref?: string
  description?: string
  kicker?: string
  tone?: 'default' | 'muted'
}

export function ProductSection({
  title,
  products,
  viewAllHref,
  description,
  kicker,
  tone = 'default',
}: ProductSectionProps) {
  if (products.length === 0) return null

  return (
    <section
      className={`border-t border-border py-10 md:py-14 ${
        tone === 'muted' ? 'bg-bg-secondary/50' : 'bg-bg'
      }`}
    >
      <div className="container-shop">
        <div className="mb-7 flex items-end justify-between gap-4 md:mb-9">
          <div>
            {kicker && <p className="section-kicker">{kicker}</p>}
            <h2 className={`section-heading ${kicker ? 'mt-2' : ''}`}>{title}</h2>
            {description && (
              <p className="mt-1.5 max-w-xl text-sm text-text-secondary">
                {description}
              </p>
            )}
            <p className="mt-1 text-xs text-text-secondary">
              {products.length} product{products.length === 1 ? '' : 's'}
            </p>
          </div>
          {viewAllHref && (
            <Link
              to={viewAllHref}
              className="shrink-0 text-[13px] font-medium tracking-wide text-text underline decoration-border underline-offset-4 transition-colors hover:decoration-text"
            >
              View all
            </Link>
          )}
        </div>
        <ProductGrid products={products.slice(0, 8)} />
      </div>
    </section>
  )
}
