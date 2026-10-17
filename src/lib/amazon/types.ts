export interface CreatorsImageSize {
  height?: number
  width?: number
  url?: string
}

export interface CreatorsItem {
  asin: string
  detailPageURL?: string
  parentASIN?: string
  images?: {
    primary?: {
      small?: CreatorsImageSize
      medium?: CreatorsImageSize
      large?: CreatorsImageSize
    }
    variants?: Array<{
      small?: CreatorsImageSize
      medium?: CreatorsImageSize
      large?: CreatorsImageSize
    }>
  }
  itemInfo?: {
    title?: { displayValue?: string }
    features?: { displayValues?: string[] }
    byLineInfo?: {
      brand?: { displayValue?: string }
      manufacturer?: { displayValue?: string }
    }
    classifications?: {
      binding?: { displayValue?: string }
      productGroup?: { displayValue?: string }
    }
    productInfo?: {
      color?: { displayValue?: string }
      size?: { displayValue?: string }
    }
  }
  offersV2?: {
    listings?: Array<{
      price?: {
        money?: { amount?: number; currency?: string; displayAmount?: string }
        savingBasis?: {
          money?: { amount?: number; currency?: string; displayAmount?: string }
        }
        savingBasisPercent?: number
      }
      availability?: { type?: string; message?: string }
      condition?: { value?: string }
      isBuyBoxWinner?: boolean
    }>
  }
  customerReviews?: {
    starRating?: { value?: number }
    count?: number
  }
}

export interface GetItemsResponse {
  itemsResult?: { items?: CreatorsItem[] }
  itemResults?: { items?: CreatorsItem[] }
  errors?: Array<{ code?: string; message?: string }>
}

export interface SearchItemsResponse {
  searchResult?: {
    items?: CreatorsItem[]
    totalResultCount?: number
  }
  errors?: Array<{ code?: string; message?: string }>
}
