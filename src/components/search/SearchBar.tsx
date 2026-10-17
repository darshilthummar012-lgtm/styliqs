'use client'

import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react'
import { Link, useNavigate } from '@/lib/navigation'
import { getSearchSuggestions } from '@/utils/search'
import { formatPrice } from '@/utils/price'
import { useDebounce } from '@/hooks/useDebounce'
import { ProductImage } from '@/components/product/ProductImage'
import { useCatalog } from '@/context/CatalogContext'

interface SearchBarProps {
  compact?: boolean
  autoFocus?: boolean
  onClose?: () => void
}

export function SearchBar({ compact: _compact, autoFocus, onClose }: SearchBarProps) {
  const { products } = useCatalog()
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const debounced = useDebounce(query, 200)
  const navigate = useNavigate()
  const listId = useId()
  const containerRef = useRef<HTMLDivElement>(null)

  const suggestions =
    debounced.trim().length >= 2
      ? getSearchSuggestions(products, debounced, 6)
      : []

  useEffect(() => {
    setActiveIndex(-1)
    setOpen(debounced.trim().length >= 2)
  }, [debounced])

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  const goSearch = (q: string) => {
    const trimmed = q.trim()
    if (!trimmed) return
    setOpen(false)
    onClose?.()
    navigate(`/search?q=${encodeURIComponent(trimmed)}`)
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setOpen(false)
      onClose?.()
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setOpen(true)
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, -1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (activeIndex >= 0 && suggestions[activeIndex]) {
        setOpen(false)
        onClose?.()
        navigate(`/product/${suggestions[activeIndex].slug}`)
      } else {
        goSearch(query)
      }
    }
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">
          <SearchIcon />
        </span>
        <input
          type="search"
          value={query}
          autoFocus={autoFocus}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => debounced.trim().length >= 2 && setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder="Search shirts, dresses, jeans, brands..."
          aria-autocomplete="list"
          aria-controls={listId}
          aria-expanded={open && suggestions.length > 0}
          role="combobox"
          className="h-10 w-full border border-border bg-bg-secondary/60 py-0 pl-10 pr-16 text-[13px] leading-none text-text placeholder:text-text-secondary/90 transition-[border-color,background-color,box-shadow] hover:border-border hover:bg-bg focus:border-accent-deep focus:bg-bg focus:shadow-[0_0_0_3px_rgba(160,137,104,0.12)] focus:outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('')
              setOpen(false)
            }}
            className="absolute right-9 top-1/2 -translate-y-1/2 text-[11px] text-text-secondary transition-colors hover:text-text"
            aria-label="Clear search"
          >
            Clear
          </button>
        )}
        <button
          type="button"
          onClick={() => goSearch(query)}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 px-2 py-1 text-[11px] font-medium tracking-wide text-accent-deep transition-colors hover:text-text"
          aria-label="Search"
        >
          Go
        </button>
      </div>

      {open && suggestions.length > 0 && (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-50 mt-1.5 max-h-80 w-full overflow-y-auto border border-border bg-bg shadow-[0_16px_40px_rgba(26,26,26,0.1)]"
        >
          {suggestions.map((product, i) => (
            <li key={product.id} role="option" aria-selected={i === activeIndex}>
              <Link
                to={`/product/${product.slug}`}
                onClick={() => {
                  setOpen(false)
                  onClose?.()
                }}
                className={`flex items-center gap-3 px-3 py-2.5 hover:bg-bg-secondary ${
                  i === activeIndex ? 'bg-bg-secondary' : ''
                }`}
              >
                <div className="h-12 w-10 shrink-0 overflow-hidden bg-bg-secondary">
                  <ProductImage src={product.images[0]} alt="" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{product.title}</p>
                  <p className="text-xs text-text-secondary">
                    {product.brand} · {formatPrice(product.price)}
                  </p>
                </div>
              </Link>
            </li>
          ))}
          <li className="border-t border-border">
            <button
              type="button"
              onClick={() => goSearch(query)}
              className="w-full text-left px-3 py-2.5 text-sm font-medium hover:bg-bg-secondary"
            >
              View all results for “{query.trim()}”
            </button>
          </li>
        </ul>
      )}
    </div>
  )
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  )
}
