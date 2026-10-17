'use client'

import { useEffect } from 'react'
import { storeConfig } from '@/config/store'

interface SeoProps {
  title?: string
  description?: string
  canonicalPath?: string
  image?: string
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export function Seo({ title, description, canonicalPath, image }: SeoProps) {
  useEffect(() => {
    const fullTitle = title
      ? `${title} | ${storeConfig.brandName}`
      : `${storeConfig.brandName} — Fashion Product Discovery`
    document.title = fullTitle

    const desc =
      description ??
      'Discover curated clothing and fashion essentials. Browse, filter, and shop via Amazon.'
    upsertMeta('name', 'description', desc)
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', desc)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:site_name', storeConfig.brandName)
    if (image) upsertMeta('property', 'og:image', image)

    const href = `${storeConfig.siteUrl}${canonicalPath ?? '/'}`
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = href
  }, [title, description, canonicalPath, image])

  return null
}
