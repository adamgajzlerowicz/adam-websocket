export type PriceSizeItem = [number, number]

export type PriceSize = Array<PriceSizeItem>

export type ApiData = {
    feed: string,
    product_id: string,
    bids: PriceSize
    asks: PriceSize
}
