'use client'

import { Link } from '@/lib/navigation'
import { storeConfig } from '@/config/store'

interface BrandLogoProps {
  className?: string
  /** default = original colors; light = white for dark backgrounds */
  variant?: 'default' | 'light'
  /** Render as a link to home */
  link?: boolean
  /** Accessible label / img alt */
  label?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

/** Balanced wordmark sizes — wide logo, so width is capped carefully. */
const sizeClasses = {
  sm: 'h-7 w-auto max-w-[130px]',
  md: 'h-8 w-auto max-w-[150px] sm:h-9 sm:max-w-[165px]',
  lg: 'h-9 w-auto max-w-[170px] sm:h-10 sm:max-w-[185px]',
  xl: 'h-11 w-auto max-w-[200px] sm:h-12 sm:max-w-[230px]',
} as const

export function BrandLogo({
  className = '',
  variant = 'default',
  link = false,
  label = storeConfig.brandName,
  size = 'md',
}: BrandLogoProps) {
  const img = (
    <img
      src={storeConfig.logoSrc}
      alt={label}
      width={320}
      height={106}
      className={`block object-contain object-left ${sizeClasses[size]} ${
        variant === 'light' ? 'brightness-0 invert' : ''
      } ${className}`}
      decoding="async"
    />
  )

  if (link) {
    return (
      <Link
        to="/"
        className="inline-flex h-10 shrink-0 items-center transition-opacity hover:opacity-80"
        aria-label={label}
      >
        {img}
      </Link>
    )
  }

  return img
}
