import { storeConfig } from '@/config/store'

export function AnnouncementBar() {
  return (
    <div className="border-b border-white/10 bg-text px-4 py-2 text-center text-[11px] tracking-[0.08em] text-white/90 sm:text-xs">
      {storeConfig.announcement}
    </div>
  )
}
