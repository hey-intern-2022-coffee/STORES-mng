export type Annotation = Record<
  keyof Pick<OnlineProducts, 'name' | 'price' | 'image_url' | 'online_stock'>,
  boolean
>
