import type { Product } from '@/types/product'
import { getAmazonDestination } from '@/utils/url'

interface AmazonButtonProps {
  product: Product
  size?: 'sm' | 'md' | 'lg'
  className?: string
  fullWidth?: boolean
  showHint?: boolean
}

const sizes = {
  sm: 'px-3 py-2 text-[11px]',
  md: 'px-4 py-2.5 text-[13px]',
  lg: 'px-6 py-3.5 text-sm',
}

export function AmazonButton({
  product,
  size = 'md',
  className = '',
  fullWidth,
  showHint = true,
}: AmazonButtonProps) {
  const url = getAmazonDestination(product)
  const label = 'View on Amazon'
  const base =
    'inline-flex items-center justify-center gap-2 font-medium tracking-[0.03em] transition-colors'

  if (!url) {
    return (
      <div className={fullWidth ? 'w-full' : ''}>
        <span
          className={`${base} ${sizes[size]} cursor-not-allowed bg-accent/35 text-white ${fullWidth ? 'w-full' : ''} ${className}`}
          aria-disabled="true"
        >
          Link unavailable
        </span>
        <p className="mt-1.5 text-xs text-sale">
          No valid Amazon URL configured for this product.
        </p>
      </div>
    )
  }

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} ${sizes[size]} bg-accent-deep text-white hover:bg-text ${fullWidth ? 'w-full' : ''} ${className}`}
      >
        {label}
      </a>
      {showHint && (
        <p className="mt-1.5 text-xs text-text-secondary">
          You&apos;ll be redirected to Amazon to view current purchasing options.
        </p>
      )}
    </div>
  )
}
