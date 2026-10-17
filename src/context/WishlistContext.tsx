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

interface WishlistContextValue {
  ids: string[]
  products: Product[]
  count: number
  isWishlisted: (id: string) => boolean
  toggle: (id: string) => void
  add: (id: string) => void
  remove: (id: string) => void
  clear: () => void
}

const WishlistContext = createContext<WishlistContextValue | null>(null)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { products: catalog } = useCatalog()
  const [ids, setIds] = useState<string[]>(() =>
    readJson<string[]>(storeConfig.wishlistKey, []),
  )

  useEffect(() => {
    writeJson(storeConfig.wishlistKey, ids)
  }, [ids])

  const products = useMemo(
    () =>
      ids
        .map((id) => catalog.find((p) => p.id === id))
        .filter((p): p is Product => Boolean(p)),
    [ids, catalog],
  )

  const isWishlisted = useCallback((id: string) => ids.includes(id), [ids])

  const add = useCallback((id: string) => {
    setIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }, [])

  const remove = useCallback((id: string) => {
    setIds((prev) => prev.filter((x) => x !== id))
  }, [])

  const toggle = useCallback((id: string) => {
    setIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }, [])

  const clear = useCallback(() => setIds([]), [])

  const value = useMemo(
    () => ({
      ids,
      products,
      count: products.length,
      isWishlisted,
      toggle,
      add,
      remove,
      clear,
    }),
    [ids, products, isWishlisted, toggle, add, remove, clear],
  )

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}
