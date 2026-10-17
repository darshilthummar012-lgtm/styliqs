'use client'

import { Link } from '@/lib/navigation'
import { storeConfig } from '@/config/store'
import { BrandLogo } from '@/components/ui/BrandLogo'

const COPYRIGHT_YEAR = 2026

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-secondary mt-auto">
      <div className="container-shop py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="mb-4">
              <BrandLogo link size="xl" />
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              {storeConfig.description}
            </p>
            <p className="text-xs text-text-secondary mt-4">
              {storeConfig.affiliate.disclosureShort}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3">Shop</h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><Link to="/shop" className="hover:text-text">All Clothing</Link></li>
              <li><Link to="/category/women" className="hover:text-text">Women</Link></li>
              <li><Link to="/category/men" className="hover:text-text">Men</Link></li>
              <li><Link to="/category/new-arrivals" className="hover:text-text">New Arrivals</Link></li>
              <li><Link to="/deals" className="hover:text-text">Deals</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3">About</h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><Link to="/about" className="hover:text-text">About Us</Link></li>
              <li><Link to="/disclosure" className="hover:text-text">Affiliate Disclosure</Link></li>
              <li><Link to="/privacy" className="hover:text-text">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-text">Terms</Link></li>
              <li>
                <a
                  href={`mailto:${storeConfig.contactEmail}`}
                  className="hover:text-text"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3">Connect</h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>
                <a
                  href={storeConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-text"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={storeConfig.social.pinterest}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-text"
                >
                  Pinterest
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row gap-3 justify-between text-xs text-text-secondary">
          <p>
            © {COPYRIGHT_YEAR} {storeConfig.brandName}. All rights reserved.
          </p>
          <p>
            Purchases are completed on Amazon. We do not process payments or
            orders on this website.
          </p>
        </div>
      </div>
    </footer>
  )
}
