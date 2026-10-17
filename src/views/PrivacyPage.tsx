'use client'

import { storeConfig } from '@/config/store'
import { Seo } from '@/components/ui/Seo'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'

export function PrivacyPage() {
  return (
    <>
      <Seo
        title="Privacy Policy"
        description="Privacy policy for Styliqs."
        canonicalPath="/privacy"
      />
      <div className="container-shop py-8 md:py-12 max-w-3xl">
        <Breadcrumbs
          items={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]}
        />
        <h1 className="text-3xl font-semibold tracking-tight mb-6">
          Privacy Policy
        </h1>
        <div className="space-y-4 text-text-secondary leading-relaxed text-sm">
          <p>
            {storeConfig.brandName} is a static product discovery website. We do
            not require accounts and do not operate a server-side database for
            user profiles.
          </p>
          <p>
            Certain features — wishlist, product comparison, and recently viewed
            products — store data in your browser&apos;s localStorage on your
            device. You can clear this data by clearing site data in your
            browser settings.
          </p>
          <p>
            When you follow a link to Amazon, Amazon&apos;s own privacy policy
            and practices apply. We may earn a commission from qualifying
            purchases as described in our Affiliate Disclosure.
          </p>
          <p>
            Questions:{' '}
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
