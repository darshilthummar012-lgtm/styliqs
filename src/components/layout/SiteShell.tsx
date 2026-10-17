'use client'

import type { ReactNode } from 'react'
import { AnnouncementBar } from './AnnouncementBar'
import { Header } from './Header'
import { Footer } from './Footer'
import { CompareBar } from './CompareBar'

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <AnnouncementBar />
      <Header />
      <main className="flex-1 pb-20">{children}</main>
      <Footer />
      <CompareBar />
    </div>
  )
}
