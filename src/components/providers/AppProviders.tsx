'use client'

import type { ReactNode } from 'react'
import { WishlistProvider } from '@/context/WishlistContext'
import { CompareProvider } from '@/context/CompareContext'
import { RecentlyViewedProvider } from '@/context/RecentlyViewedContext'
import { CatalogProvider } from '@/context/CatalogContext'

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <CatalogProvider>
      <WishlistProvider>
        <CompareProvider>
          <RecentlyViewedProvider>{children}</RecentlyViewedProvider>
        </CompareProvider>
      </WishlistProvider>
    </CatalogProvider>
  )
}
