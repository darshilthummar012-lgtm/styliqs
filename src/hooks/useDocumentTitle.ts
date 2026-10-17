import { useEffect } from 'react'
import { storeConfig } from '@/config/store'

export function useDocumentTitle(title?: string, description?: string) {
  useEffect(() => {
    document.title = title
      ? `${title} | ${storeConfig.brandName}`
      : `${storeConfig.brandName} — Fashion Product Discovery`

    if (description) {
      let meta = document.querySelector('meta[name="description"]')
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute('name', 'description')
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', description)
    }
  }, [title, description])
}
