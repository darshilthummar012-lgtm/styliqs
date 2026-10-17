import { NextResponse } from 'next/server'
import { getItems, isAmazonConfigured } from '@/lib/amazon/client'
import { mapCreatorsItemToProduct } from '@/lib/amazon/mapProduct'
import { getCatalogEntry } from '@/data/catalogAsins'

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

    const body = (await request.json()) as { asins?: string[] }
    const asins = body.asins ?? []
    if (!Array.isArray(asins) || asins.length === 0) {
      return NextResponse.json(
        { error: 'asins array is required (max 10)' },
        { status: 400 },
      )
    }

    const result = await getItems(asins)
    const items =
      result.itemsResult?.items ?? result.itemResults?.items ?? []
    const products = items
      .map((item) =>
        mapCreatorsItemToProduct(item, getCatalogEntry(item.asin)),
      )
      .filter(Boolean)

    return NextResponse.json({
      source: 'amazon',
      products,
      errors: result.errors ?? [],
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
