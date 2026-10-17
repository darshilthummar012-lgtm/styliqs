'use client'

import { storeConfig } from '@/config/store'
import { Seo } from '@/components/ui/Seo'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'

export function TermsPage() {
  return (
    <>
      <Seo
        title="Terms and Conditions"
        description="Terms and conditions for using Styliqs."
        canonicalPath="/terms"
      />
      <div className="container-shop py-8 md:py-12 max-w-3xl">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Terms and Conditions' },
          ]}
        />
        <h1 className="text-3xl font-semibold tracking-tight mb-6">
          Terms and Conditions
        </h1>
        <div className="space-y-4 text-text-secondary leading-relaxed text-sm">
          <p>
            By using {storeConfig.brandName}, you agree that this website is a
            product discovery and information platform. Purchases are completed
            on third-party retailer sites such as Amazon, not on{' '}
            {storeConfig.brandName}.
          </p>
          <p>
            Catalog information — including prices, availability, ratings, and
            images — is provided as supplied in local data and may be outdated
            or inaccurate relative to the retailer. Always confirm details on
            Amazon before buying.
          </p>
          <p>
            We are not responsible for Amazon&apos;s products, pricing, shipping,
            returns, or customer service.
          </p>
        </div>
      </div>
    </>
  )
}
