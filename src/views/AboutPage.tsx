'use client'

import { storeConfig } from '@/config/store'
import { Seo } from '@/components/ui/Seo'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { BrandLogo } from '@/components/ui/BrandLogo'

export function AboutPage() {
  return (
    <>
      <Seo
        title="About"
        description={`About ${storeConfig.brandName} — a fashion product discovery destination.`}
        canonicalPath="/about"
      />
      <div className="container-shop py-8 md:py-12 max-w-3xl">
        <Breadcrumbs
          items={[{ label: 'Home', href: '/' }, { label: 'About' }]}
        />
        <div className="mb-4">
          <BrandLogo size="lg" />
        </div>
        <h1 className="text-3xl font-semibold tracking-tight mb-6">
          About {storeConfig.brandName}
        </h1>
        <div className="space-y-4 text-text-secondary leading-relaxed">
          <p>{storeConfig.description}</p>
          <p>
            We research and curate clothing products into a local catalog so you
            can browse, filter, compare, and shortlist options. When you are
            ready to buy, we send you to Amazon — the external retailer — using
            the product&apos;s configured link.
          </p>
          <p>
            We do not process payments, manage inventory, or fulfill orders.
            Prices and availability shown here come from our catalog data and
            may differ on Amazon at the time of purchase.
          </p>
          <p>
            Contact:{' '}
            <a
              href={`mailto:${storeConfig.contactEmail}`}
              className="text-text underline"
            >
              {storeConfig.contactEmail}
            </a>
          </p>
        </div>
      </div>
    </>
  )
}
