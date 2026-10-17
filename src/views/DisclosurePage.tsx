'use client'

import { storeConfig } from '@/config/store'
import { Seo } from '@/components/ui/Seo'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'

export function DisclosurePage() {
  return (
    <>
      <Seo
        title="Affiliate Disclosure"
        description="Affiliate disclosure for Velora and Amazon Associates."
        canonicalPath="/disclosure"
      />
      <div className="container-shop py-8 md:py-12 max-w-3xl">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Affiliate Disclosure' },
          ]}
        />
        <h1 className="text-3xl font-semibold tracking-tight mb-6">
          Affiliate Disclosure
        </h1>
        <div className="space-y-4 text-text-secondary leading-relaxed">
          <p>{storeConfig.affiliate.disclosureFull}</p>
          <p>
            Product information on this website is maintained in local data
            files. We do not claim real-time Amazon pricing, stock, or review
            accuracy. Always verify details on Amazon before purchasing.
          </p>
          <p>
            Affiliate tracking IDs, if used, are configured by the site owner
            in product URLs — they are not invented or hardcoded by default.
          </p>
        </div>
      </div>
    </>
  )
}
