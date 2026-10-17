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

interface CompareContextValue {
  ids: string[]
  products: Product[]
  count: number
  isCompared: (id: string) => boolean
  toggle: (id: string) => boolean
  remove: (id: string) => void
  clear: () => void
  max: number
}

const CompareContext = createContext<CompareContextValue | null>(null)

export function CompareProvider({ children }: { children: ReactNode }) {
  const { products: catalog } = useCatalog()
  const [ids, setIds] = useState<string[]>(() =>
    readJson<string[]>(storeConfig.compareKey, []),
  )

  useEffect(() => {
    writeJson(storeConfig.compareKey, ids)
  }, [ids])

  const products = useMemo(
    () =>
      ids
        .map((id) => catalog.find((p) => p.id === id))
        .filter((p): p is Product => Boolean(p)),
    [ids, catalog],
  )

  const isCompared = useCallback((id: string) => ids.includes(id), [ids])

  const toggle = useCallback((id: string) => {
    let ok = true
    setIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id)
      if (prev.length >= storeConfig.compareMax) {
        ok = false
        return prev
      }
      return [...prev, id]
    })
    return ok
  }, [])

  const remove = useCallback((id: string) => {
    setIds((prev) => prev.filter((x) => x !== id))
  }, [])

  const clear = useCallback(() => setIds([]), [])

  const value = useMemo(
    () => ({
      ids,
      products,
      count: products.length,
      isCompared,
      toggle,
      remove,
      clear,
      max: storeConfig.compareMax,
    }),
    [ids, products, isCompared, toggle, remove, clear],
  )

  return (
    <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
  )
}

export function useCompare() {
  const ctx = useContext(CompareContext)
  if (!ctx) throw new Error('useCompare must be used within CompareProvider')
  return ctx
}
