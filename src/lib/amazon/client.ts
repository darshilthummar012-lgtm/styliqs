import type { GetItemsResponse, SearchItemsResponse } from './types'

const API_BASE = 'https://creatorsapi.amazon'

function requireEnv(name: string): string {
  const value = process.env[name]?.trim()
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`)
  }
  return value
}

export function isAmazonConfigured(): boolean {
  return Boolean(
    process.env.AMAZON_CLIENT_ID &&
      process.env.AMAZON_CLIENT_SECRET &&
      process.env.AMAZON_PARTNER_TAG,
  )
}

export function getMarketplace(): string {
  return process.env.AMAZON_MARKETPLACE?.trim() || 'www.amazon.in'
}

export function getPartnerTag(): string {
  return requireEnv('AMAZON_PARTNER_TAG')
}

let cachedToken: { value: string; expiresAt: number } | null = null

/** Server-only: fetch OAuth token for Creators API (cached until near expiry). */
export async function getAccessToken(): Promise<string> {
  const now = Date.now()
  if (cachedToken && cachedToken.expiresAt > now + 60_000) {
    return cachedToken.value
  }

  const tokenUrl =
    process.env.AMAZON_TOKEN_URL?.trim() ||
    'https://api.amazon.co.uk/auth/o2/token'

  const res = await fetch(tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: requireEnv('AMAZON_CLIENT_ID'),
      client_secret: requireEnv('AMAZON_CLIENT_SECRET'),
      scope: 'creatorsapi::default',
    }),
    cache: 'no-store',
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Amazon token error (${res.status}): ${text}`)
  }

  const data = (await res.json()) as {
    access_token: string
    expires_in?: number
  }

  cachedToken = {
    value: data.access_token,
    expiresAt: now + (data.expires_in ?? 3600) * 1000,
  }

  return data.access_token
}

const DEFAULT_RESOURCES = [
  'images.primary.large',
  'images.primary.medium',
  'images.variants.large',
  'itemInfo.title',
  'itemInfo.features',
  'itemInfo.byLineInfo',
  'itemInfo.classifications',
  'itemInfo.productInfo',
  'offersV2.listings.price',
  'offersV2.listings.availability',
  'offersV2.listings.condition',
  'parentASIN',
]

async function creatorsPost<T>(
  path: string,
  body: Record<string, unknown>,
): Promise<T> {
  const token = await getAccessToken()
  const marketplace = getMarketplace()

  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'x-marketplace': marketplace,
    },
    body: JSON.stringify({
      marketplace,
      partnerTag: getPartnerTag(),
      ...body,
    }),
    cache: 'no-store',
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Creators API error (${res.status}): ${text}`)
  }

  return (await res.json()) as T
}

/** Look up up to 10 ASINs at a time. */
export async function getItems(asins: string[]): Promise<GetItemsResponse> {
  const itemIds = [...new Set(asins.map((a) => a.trim()).filter(Boolean))].slice(
    0,
    10,
  )
  if (itemIds.length === 0) {
    return { itemsResult: { items: [] } }
  }

  return creatorsPost<GetItemsResponse>('/catalog/v1/getItems', {
    itemIds,
    itemIdType: 'ASIN',
    resources: DEFAULT_RESOURCES,
  })
}

/** Search Amazon catalog (max 10 items per page). */
export async function searchItems(input: {
  keywords?: string
  searchIndex?: string
  itemPage?: number
  itemCount?: number
  brand?: string
  minPrice?: number
  maxPrice?: number
  sortBy?: string
}): Promise<SearchItemsResponse> {
  if (
    !input.keywords?.trim() &&
    !input.brand?.trim()
  ) {
    throw new Error('Search requires keywords or brand')
  }

  return creatorsPost<SearchItemsResponse>('/catalog/v1/searchItems', {
    keywords: input.keywords?.trim() || undefined,
    brand: input.brand?.trim() || undefined,
    searchIndex: input.searchIndex || 'Fashion',
    itemPage: input.itemPage ?? 1,
    itemCount: Math.min(input.itemCount ?? 10, 10),
    minPrice: input.minPrice,
    maxPrice: input.maxPrice,
    sortBy: input.sortBy,
    resources: DEFAULT_RESOURCES,
  })
}

/** Fetch many ASINs in batches of 10. */
export async function getItemsBatched(asins: string[]) {
  const unique = [...new Set(asins.map((a) => a.trim()).filter(Boolean))]
  const items = []
  for (let i = 0; i < unique.length; i += 10) {
    const chunk = unique.slice(i, i + 10)
    const result = await getItems(chunk)
    const list =
      result.itemsResult?.items ?? result.itemResults?.items ?? []
    items.push(...list)
  }
  return items
}
