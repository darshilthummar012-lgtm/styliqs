'use client'

import { useEffect, useId, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, useLocation } from '@/lib/navigation'
import { mainNav } from '@/data/navigation'
import { SearchBar } from '@/components/search/SearchBar'
import { BrandLogo } from '@/components/ui/BrandLogo'
import { useWishlist } from '@/context/WishlistContext'
import { useRecentlyViewed } from '@/context/RecentlyViewedContext'
import { useCompare } from '@/context/CompareContext'

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSearch, setMobileSearch] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const { count: wishCount } = useWishlist()
  const { products: recent } = useRecentlyViewed()
  const { count: compareCount } = useCompare()
  const location = useLocation()
  const menuTitleId = useId()

  useEffect(() => {
    setMobileOpen(false)
    setMobileSearch(false)
    setOpenMenu(null)
  }, [location.pathname, location.search])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!mobileOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [mobileOpen])

  const closeMenu = () => setMobileOpen(false)

  const mobileMenu =
    mobileOpen &&
    createPortal(
      <div className="fixed inset-0 z-[100] lg:hidden" role="presentation">
        <button
          type="button"
          className="absolute inset-0 bg-text/40"
          aria-label="Close menu"
          onClick={closeMenu}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={menuTitleId}
          className="absolute left-0 top-0 bottom-0 flex w-[min(100%,20rem)] flex-col bg-bg shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <span id={menuTitleId} className="inline-flex items-center">
              <BrandLogo size="md" />
            </span>
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center text-xl leading-none text-text"
            >
              ×
            </button>
          </div>

          <nav
            className="flex-1 overflow-y-auto overscroll-contain px-5 py-4"
            aria-label="Mobile"
          >
            {mainNav.map((item) => (
              <div key={item.label} className="mb-1 border-b border-border/80 py-1">
                <Link
                  to={item.href}
                  className="block py-2.5 text-[15px] font-medium tracking-wide"
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="space-y-0.5 pb-2 pl-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className="block py-1.5 text-sm text-text-secondary hover:text-text"
                        onClick={closeMenu}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              to="/wishlist"
              className="block py-3 text-[15px]"
              onClick={closeMenu}
            >
              Wishlist ({wishCount})
            </Link>
            <Link
              to="/compare"
              className="block py-3 text-[15px]"
              onClick={closeMenu}
            >
              Compare ({compareCount})
            </Link>
            <Link to="/about" className="block py-3 text-[15px]" onClick={closeMenu}>
              About
            </Link>
          </nav>
        </div>
      </div>,
      document.body,
    )

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-bg/95 backdrop-blur-md transition-[border-color,box-shadow] duration-300 ${
        scrolled
          ? 'border-border shadow-[0_1px_0_rgba(26,26,26,0.04),0_8px_24px_rgba(26,26,26,0.04)]'
          : 'border-transparent shadow-none'
      }`}
    >
      <div className="container-shop">
        {/* Mobile / tablet header: menu | centered logo | search + wishlist */}
        <div className="relative flex h-14 items-center justify-between sm:h-16 lg:hidden">
          <button
            type="button"
            className="-ml-1 flex h-10 w-10 shrink-0 items-center justify-center text-text"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="pointer-events-auto">
              <BrandLogo link size="md" />
            </div>
          </div>

          <div className="relative z-10 flex shrink-0 items-center -mr-1">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center text-text-secondary transition-colors hover:text-text"
              aria-label="Search"
              onClick={() => setMobileSearch((v) => !v)}
            >
              <SearchIcon />
            </button>
            <Link
              to="/wishlist"
              className="relative flex h-10 w-10 items-center justify-center text-text-secondary transition-colors hover:text-text"
              aria-label={`Wishlist, ${wishCount} items`}
            >
              <HeartIcon />
              {wishCount > 0 && (
                <span className="absolute top-1 right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-text px-1 text-[10px] text-white">
                  {wishCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Desktop header */}
        <div className="hidden h-[4.25rem] items-center gap-6 lg:flex">
          <div className="flex h-full shrink-0 items-center">
            <BrandLogo link size="md" />
          </div>

          <nav
            className="flex h-full min-w-0 flex-1 items-center justify-center gap-0.5"
            aria-label="Main"
          >
            {mainNav.map((item) => (
              <div
                key={item.label}
                className="relative flex h-full items-center"
                onMouseEnter={() => setOpenMenu(item.label)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `relative inline-flex h-10 items-center px-3 text-[13px] font-medium leading-none tracking-[0.02em] transition-colors ${
                      isActive
                        ? 'text-text'
                        : 'text-text-secondary hover:text-text'
                    }`
                  }
                  onFocus={() => setOpenMenu(item.label)}
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      <span
                        className={`absolute bottom-1.5 left-3 right-3 h-px bg-accent-deep transition-opacity ${
                          isActive ? 'opacity-100' : 'opacity-0'
                        }`}
                        aria-hidden="true"
                      />
                    </>
                  )}
                </NavLink>
                {item.children && openMenu === item.label && (
                  <div className="absolute left-1/2 top-full z-50 min-w-[210px] -translate-x-1/2 pt-1">
                    <div className="border border-border bg-bg py-2.5 shadow-[0_12px_40px_rgba(26,26,26,0.08)]">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className="block px-4 py-2 text-[13px] text-text-secondary transition-colors hover:bg-bg-secondary hover:text-text"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex h-full min-w-0 w-[min(100%,300px)] items-center">
            <SearchBar />
          </div>

          <div className="flex h-full shrink-0 items-center justify-end gap-0.5">
            {recent.length > 0 && (
              <Link
                to={`/product/${recent[0].slug}`}
                className="inline-flex h-10 w-10 items-center justify-center text-text-secondary transition-colors hover:text-text"
                aria-label="Recently viewed"
                title="Recently viewed"
              >
                <ClockIcon />
              </Link>
            )}
            {compareCount > 0 && (
              <Link
                to="/compare"
                className="relative flex h-10 w-10 items-center justify-center text-text-secondary transition-colors hover:text-text"
                aria-label={`Compare ${compareCount} products`}
              >
                <CompareIcon />
                <span className="absolute top-1 right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent-deep px-1 text-[10px] text-white">
                  {compareCount}
                </span>
              </Link>
            )}
            <Link
              to="/wishlist"
              className="relative flex h-10 w-10 items-center justify-center text-text-secondary transition-colors hover:text-text"
              aria-label={`Wishlist, ${wishCount} items`}
            >
              <HeartIcon />
              {wishCount > 0 && (
                <span className="absolute top-1 right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-text px-1 text-[10px] text-white">
                  {wishCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {mobileSearch && (
          <div className="border-t border-border pb-3 pt-3 md:hidden">
            <SearchBar
              compact
              autoFocus
              onClose={() => setMobileSearch(false)}
            />
          </div>
        )}
      </div>

      {mobileMenu}
    </header>
  )
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  )
}

function HeartIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  )
}

function CompareIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M4 6h7v12H4zM13 6h7v12h-7z" />
    </svg>
  )
}
