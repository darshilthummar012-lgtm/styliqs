'use client'

import { EmptyState } from '@/components/ui/EmptyState'
import { Seo } from '@/components/ui/Seo'

export function NotFoundPage() {
  return (
    <>
      <Seo title="Page not found" canonicalPath="/404" />
      <EmptyState
        title="Page not found"
        description="The page you are looking for does not exist or may have moved."
        action={{ label: 'Go home', href: '/' }}
      />
    </>
  )
}
