import { useState } from 'react'

interface ProductImageProps {
  src: string
  alt: string
  className?: string
  loading?: 'lazy' | 'eager'
}

export function ProductImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
}: ProductImageProps) {
  const [failed, setFailed] = useState(false)

  if (failed || !src) {
    return (
      <div
        className={`flex h-full w-full items-center justify-center bg-bg-secondary ${className}`}
        role="img"
        aria-label={alt || 'Image unavailable'}
      >
        <img
          src="/styliqs-logo.png"
          alt=""
          className="h-5 w-auto max-w-[72px] object-contain opacity-35"
        />
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      onError={() => setFailed(true)}
      className={`h-full w-full object-cover ${className}`}
    />
  )
}
