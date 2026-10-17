import type { Metadata } from 'next'
import { Suspense } from 'react'
import { AppProviders } from '@/components/providers/AppProviders'
import { SiteShell } from '@/components/layout/SiteShell'
import { storeConfig } from '@/config/store'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: `${storeConfig.brandName} — Fashion Product Discovery`,
    template: `%s | ${storeConfig.brandName}`,
  },
  description: storeConfig.description,
  icons: {
    icon: '/styliqs-logo.png',
    apple: '/styliqs-logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Manrope:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AppProviders>
          <Suspense
            fallback={
              <div className="flex min-h-screen items-center justify-center text-sm text-text-secondary">
                Loading Styliqs…
              </div>
            }
          >
            <SiteShell>{children}</SiteShell>
          </Suspense>
        </AppProviders>
      </body>
    </html>
  )
}
