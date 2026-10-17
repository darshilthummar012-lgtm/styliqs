'use client'

import { Link } from '@/lib/navigation'
import { useCompare } from '@/context/CompareContext'
import { formatPrice, getDiscountPercent } from '@/utils/price'
import { getAmazonDestination } from '@/utils/url'
import { EmptyState } from '@/components/ui/EmptyState'
import { Seo } from '@/components/ui/Seo'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { ProductImage } from '@/components/product/ProductImage'
import { Button } from '@/components/ui/Button'

export function ComparePage() {
  const { products, count, remove, clear } = useCompare()

  if (count === 0) {
    return (
      <>
        <Seo title="Compare" canonicalPath="/compare" />
        <EmptyState
          title="Nothing to compare"
          description="Add up to four products from product cards or detail pages."
          action={{ label: 'Browse clothing', href: '/shop' }}
        />
      </>
    )
  }

  const rows: { label: string; get: (i: number) => string }[] = [
    {
      label: 'Brand',
      get: (i) => products[i]?.brand ?? '—',
    },
    {
      label: 'Title',
      get: (i) => products[i]?.title ?? '—',
    },
    {
      label: 'Price',
      get: (i) =>
        products[i] ? formatPrice(products[i].price) : '—',
    },
    {
      label: 'Original price',
      get: (i) =>
        products[i]?.originalPrice != null
          ? formatPrice(products[i].originalPrice!)
          : '—',
    },
    {
      label: 'Discount',
      get: (i) => {
        if (!products[i]) return '—'
        const d = getDiscountPercent(products[i])
        return d != null ? `${d}%` : '—'
      },
    },
    {
      label: 'Sizes',
      get: (i) => products[i]?.sizes.join(', ') || '—',
    },
    {
      label: 'Colors',
      get: (i) =>
        products[i]?.colors.map((c) => c.name).join(', ') || '—',
    },
    {
      label: 'Material',
      get: (i) => products[i]?.material ?? '—',
    },
    {
      label: 'Fit',
      get: (i) => products[i]?.fit ?? '—',
    },
    {
      label: 'Rating',
      get: (i) =>
        products[i]?.rating != null && products[i]?.ratingSource
          ? String(products[i].rating)
          : '—',
    },
  ]

  return (
    <>
      <Seo
        title="Compare products"
        description="Side-by-side clothing comparison from your local selection."
        canonicalPath="/compare"
      />
      <div className="container-shop py-8 md:py-10">
        <Breadcrumbs
          items={[{ label: 'Home', href: '/' }, { label: 'Compare' }]}
        />
        <div className="flex items-end justify-between gap-4 mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">
            Compare ({count})
          </h1>
          <Button variant="ghost" size="sm" onClick={clear}>
            Clear all
          </Button>
        </div>

        <div className="overflow-x-auto border border-border">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-border bg-bg-secondary">
                <th className="p-3 text-left font-medium w-36"> </th>
                {products.map((p) => (
                  <th key={p.id} className="p-3 text-left font-medium align-top">
                    <div className="aspect-[3/4] w-28 mb-2 overflow-hidden bg-bg">
                      <ProductImage src={p.images[0]} alt={p.title} />
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(p.id)}
                      className="text-xs text-text-secondary underline"
                    >
                      Remove
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-b border-border">
                  <th className="p-3 text-left text-text-secondary font-medium align-top">
                    {row.label}
                  </th>
                  {products.map((_, i) => (
                    <td key={i} className="p-3 align-top capitalize">
                      {row.get(i)}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <th className="p-3 text-left text-text-secondary font-medium">
                  Links
                </th>
                {products.map((p) => {
                  const url = getAmazonDestination(p)
                  return (
                    <td key={p.id} className="p-3 space-y-2">
                      <Link
                        to={`/product/${p.slug}`}
                        className="block text-sm underline"
                      >
                        View details
                      </Link>
                      {url ? (
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-sm text-accent underline"
                        >
                          View on Amazon
                        </a>
                      ) : (
                        <span className="text-xs text-sale">
                          Link unavailable
                        </span>
                      )}
                    </td>
                  )
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
