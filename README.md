# Styliqs — Fashion Product Discovery (Next.js)

Amazon affiliate-style clothing discovery storefront.

- **UI:** React + Tailwind (App Router)
- **Server APIs:** Next.js Route Handlers (no separate backend)
- **Catalog:** Local sample data by default; live Amazon Creators API when configured

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Amazon Creators API (live products)

Secrets stay on the **Next.js server only** — never in the browser.

### 1. Requirements

1. Amazon Associates account (India: [affiliate-program.amazon.in](https://affiliate-program.amazon.in/))
2. Creators API access approved
3. `client_id`, `client_secret`, and Partner Tag (e.g. `yoursite-21`)

### 2. Configure `.env.local`

```bash
AMAZON_CLIENT_ID=...
AMAZON_CLIENT_SECRET=...
AMAZON_PARTNER_TAG=yoursite-21
AMAZON_MARKETPLACE=www.amazon.in
AMAZON_TOKEN_URL=https://api.amazon.co.uk/auth/o2/token
AMAZON_LIVE_CATALOG=true
```

### 3. Add products by ASIN

Edit `src/data/catalogAsins.ts` — add one entry per product:

```ts
{
  asin: 'B0XXXXXXXX',
  category: 't-shirts',
  gender: 'men',
  styleTags: ['casual', 'everyday'],
  clothingType: 'casual',
  isFeatured: true,
}
```

When credentials + ASINs are set, `/api/amazon/catalog` fetches live title, images, price, and affiliate `detailPageURL` from Amazon. “View on Amazon” uses that URL.

If API is not configured (or ASINs empty), the site uses the local catalog in `src/data/products.ts`.

### Server API routes

| Route | Purpose |
|---|---|
| `GET /api/amazon/catalog` | Full curated catalog (batched GetItems) |
| `POST /api/amazon/get-items` | Body: `{ asins: string[] }` (max 10) |
| `POST /api/amazon/search-items` | Body: `{ keywords, brand, searchIndex, ... }` |

Docs: [Using cURL](https://affiliate-program.amazon.in/creatorsapi/docs/en-us/get-started/using-curl) · [GetItems](https://affiliate-program.amazon.in/creatorsapi/docs/en-us/api-reference/operations/get-items) · [SearchItems](https://affiliate-program.amazon.in/creatorsapi/docs/en-us/api-reference/operations/search-items)

## Scripts

```bash
npm run dev      # development
npm run build    # production build
npm run start    # serve production build
```

## Manual catalog (no API)

You can still add products by editing `src/data/products.ts` and setting `amazonUrl` / `affiliateUrl` yourself.
# styliqs
