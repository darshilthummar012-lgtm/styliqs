import { NextResponse } from 'next/server'
import { isAmazonConfigured, searchItems } from '@/lib/amazon/client'
import { mapCreatorsItemToProduct } from '@/lib/amazon/mapProduct'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    if (!isAmazonConfigured()) {
      return NextResponse.json(
        {
          error:
            'Amazon Creators API is not configured. Set AMAZON_CLIENT_ID, AMAZON_CLIENT_SECRET, and AMAZON_PARTNER_TAG in .env.local',
        },
        { status: 503 },
      )
    }

    const body = (await request.json()) as {
      keywords?: string
      brand?: string
      searchIndex?: string
      itemPage?: number
      itemCount?: number
      minPrice?: number
      maxPrice?: number
      sortBy?: string
    }

    const result = await searchItems(body)
    const items = result.searchResult?.items ?? []
    const products = items
      .map((item) => mapCreatorsItemToProduct(item))
      .filter(Boolean)

    return NextResponse.json({
      source: 'amazon',
      products,
      totalResultCount: result.searchResult?.totalResultCount,
      errors: result.errors ?? [],
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
