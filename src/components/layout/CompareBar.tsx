'use client'

import { Link } from '@/lib/navigation'
import { useCompare } from '@/context/CompareContext'
import { ProductImage } from '@/components/product/ProductImage'

export function CompareBar() {
  const { products, count, remove, clear, max } = useCompare()
  if (count === 0) return null

  return (
    <div className="fixed bottom-0 inset-x-0 z-30 border-t border-border bg-bg shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <div className="container-shop py-3 flex items-center gap-4 overflow-x-auto">
        <p className="text-sm font-medium whitespace-nowrap">
          Compare ({count}/{max})
        </p>
        <div className="flex gap-2">
          {products.map((p) => (
            <div
              key={p.id}
              className="relative h-12 w-10 shrink-0 overflow-hidden border border-border"
            >
              <ProductImage src={p.images[0]} alt={p.title} />
              <button
                type="button"
                onClick={() => remove(p.id)}
                className="absolute -top-1 -right-1 h-4 w-4 bg-text text-white text-[10px] rounded-full"
                aria-label={`Remove ${p.title}`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={clear}
            className="text-xs text-text-secondary underline"
          >
            Clear
          </button>
          <Link
            to="/compare"
            className="text-sm font-medium bg-text text-white px-4 py-2 rounded-sm"
          >
            Compare
          </Link>
        </div>
      </div>
    </div>
  )
}
