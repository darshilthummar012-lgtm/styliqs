'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { storeConfig } from '@/config/store'
import type { Product } from '@/types/product'
import { readJson, writeJson } from '@/utils/storage'
import { useCatalog } from '@/context/CatalogContext'

interface RecentlyViewedContextValue {
  products: Product[]
  track: (id: string) => void
}

const RecentlyViewedContext =
  createContext<RecentlyViewedContextValue | null>(null)

export function RecentlyViewedProvider({ children }: { children: ReactNode }) {
  const { products: catalog } = useCatalog()
  const [ids, setIds] = useState<string[]>(() =>
    readJson<string[]>(storeConfig.recentlyViewedKey, []),
  )

  useEffect(() => {
    writeJson(storeConfig.recentlyViewedKey, ids)
  }, [ids])

  const products = useMemo(
    () =>
      ids
        .map((id) => catalog.find((p) => p.id === id))
        .filter((p): p is Product => Boolean(p)),
    [ids, catalog],
  )

  const track = useCallback((id: string) => {
    setIds((prev) => {
      const next = [id, ...prev.filter((x) => x !== id)]
      return next.slice(0, storeConfig.recentlyViewedMax)
    })
  }, [])

  const value = useMemo(() => ({ products, track }), [products, track])

  return (
    <RecentlyViewedContext.Provider value={value}>
      {children}
    </RecentlyViewedContext.Provider>
  )
}

export function useRecentlyViewed() {
  const ctx = useContext(RecentlyViewedContext)
  if (!ctx)
    throw new Error(
      'useRecentlyViewed must be used within RecentlyViewedProvider',
    )
  return ctx
}
