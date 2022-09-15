export type Annotation = Record<
  keyof Pick<OnlineProducts, 'name' | 'price' | 'image_url' | 'online_stock'>,
  boolean
>

export type onlineStockNumericInfo = {
  stock: number
  ordersNum: number
  deliveredNum: number
  notDeliveredNum: number
}

export type TableDataForOnlineStock = {
  productId: number | undefined
  name: string | undefined
  price: number | undefined
} & onlineStockNumericInfo
