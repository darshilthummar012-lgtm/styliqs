import { NextResponse } from 'next/server'
import { loadCatalog } from '@/lib/amazon/catalog'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** Returns full store catalog: live Amazon when configured, else local samples. */
export async function GET() {
  try {
    const { products, source } = await loadCatalog()
    return NextResponse.json({
      source,
      count: products.length,
      products,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
