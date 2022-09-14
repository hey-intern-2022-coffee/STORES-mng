import { OnlineProducts } from '../../../../lib/@types'
import { Annotation } from '../../types'

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
