'use client'

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { products as localProducts } from '@/data/products'
import type { Product } from '@/types/product'

interface CatalogContextValue {
  products: Product[]
  source: 'amazon' | 'local' | 'loading'
  refresh: () => void
}

const CatalogContext = createContext<CatalogContextValue | null>(null)

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(localProducts)
  const [source, setSource] = useState<'amazon' | 'local' | 'loading'>('loading')

  const load = () => {
    setSource('loading')
    fetch('/api/amazon/catalog')
      .then(async (res) => {
        if (!res.ok) throw new Error('catalog failed')
        return res.json() as Promise<{
          products: Product[]
          source: 'amazon' | 'local'
        }>
      })
      .then((data) => {
        if (data.products?.length) {
          setProducts(data.products)
          setSource(data.source)
        } else {
          setProducts(localProducts)
          setSource('local')
        }
      })
      .catch(() => {
        setProducts(localProducts)
        setSource('local')
      })
  }

  useEffect(() => {
    load()
  }, [])

  const value = useMemo(
    () => ({ products, source, refresh: load }),
    [products, source],
  )

  return (
    <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
  )
}

export function useCatalog() {
  const ctx = useContext(CatalogContext)
  if (!ctx) throw new Error('useCatalog must be used within CatalogProvider')
  return ctx
}
