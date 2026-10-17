import { useState } from 'react'

interface SafeImageProps {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  loading?: 'lazy' | 'eager'
  fetchPriority?: 'high' | 'low' | 'auto'
}

/** Reliable image with a warm, non-gray fallback when loading fails. */
export function SafeImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  loading = 'lazy',
  fetchPriority,
}: SafeImageProps) {
  const [failed, setFailed] = useState(false)

  if (failed || !src) {
    return (
      <div
        className={`flex items-center justify-center bg-bg-secondary ${className}`}
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
    <div className={`overflow-hidden bg-bg-secondary ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        onError={() => setFailed(true)}
        className={`h-full w-full object-cover ${imgClassName}`}
      />
    </div>
  )
}
