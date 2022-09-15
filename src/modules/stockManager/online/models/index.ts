import { OnlineProducts } from '../../../../lib/@types'
import { Annotation, onlineStockNumericInfo } from '../../types'

export const validation = (
  form: OnlineProducts
): {
  isShowAnnotations: {
    name: boolean
    price: boolean
    image_url: boolean
    online_stock: boolean
  }
  isValid: boolean
} => {
  const isShowAnnotations = {
    name: false,
    price: false,
    image_url: false,
    online_stock: false // FIXME: 型修正(本当はネストした中でboolを持ちたい)
  }
  if (!form.name.length) isShowAnnotations.name = true
  if (!form.price) isShowAnnotations.price = true
  if (!form.image_url?.length) isShowAnnotations.image_url = true
  if (!form.online_stock?.stock_quantity) isShowAnnotations.online_stock = true
  return {
    isShowAnnotations,
    isValid: !Object.values(isShowAnnotations).some(it => it)
  }
}

export const initAnnotation = (): Annotation => {
  return {
    name: false,
    price: false,
    image_url: false,
    online_stock: false // FIXME: 型修正(本当はネストした中でboolを持ちたい)
  }
}

export const initForm = (): OnlineProducts => {
  return {
    name: '',
    price: 0,
    image_url: '',
    online_stock: {
      stock_quantity: 0
    }
  }
}

/**
 *
 * @param delivered_quantity (手元にある在庫数 := 元の在庫数 - 引き渡し済み数)
 * @param sold_quantity (注文数)
 * @param stock_quantity (元の在庫数)
 * @returns {number} stock // 残り在庫数
 * @returns {number} ordersNum // 注文数(売上数)
 * @returns {number} deliveredNum // 受け渡し数
 * @returns {number} notDeliveredNum // 未受け渡し数 = 売上数 - すでに引き渡した数
 */
export const getStockNumerics = ({
  online_stock
}: Pick<OnlineProducts, 'online_stock'>): onlineStockNumericInfo => {
  if (online_stock) {
    // 注文数
    const ordersNum = online_stock.sold_quantity ?? 0
    // 残り在庫数(販売可能数)
    const stock = (online_stock.stock_quantity ?? 0) - ordersNum
    // 引き渡し数
    const deliveredNum =
      (online_stock.stock_quantity ?? 0) -
      (online_stock.delivered_quantity ?? 0)
    // 未受け渡し分
    const notDeliveredNum = ordersNum - deliveredNum
    return {
      stock,
      ordersNum,
      deliveredNum,
      notDeliveredNum
    }
  } else {
    return { stock: 0, ordersNum: 0, deliveredNum: 0, notDeliveredNum: 0 }
  }
}
