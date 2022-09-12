export const APP_NAME = 'STORESマネージャー'

// import { CheckoutInfoUnion } from './onlineShop/types/checkout'

// export const INPUTS_FOR_ORDER: Array<{
//   name: CheckoutInfoUnion
//   model: string
//   placeholder: string
// }> = [
//   {
//     name: 'zipCode',
//     model: '',
//     placeholder: 'ハイフン(-)なし　郵便番号'
//   },
//   {
//     name: 'address',
//     model: '',
//     placeholder: '住所'
//   },
//   {
//     name: 'name',
//     model: '',
//     placeholder: '宛名'
//   },
//   {
//     name: 'phoneNumber',
//     model: '',
//     placeholder: '電話番号'
//   },
//   {
//     name: 'email',
//     model: '',
//     placeholder: 'e-mail アドレス'
//   }
// ]

export const checkoutInfosEnum = {
  zipCode: 'zipCode',
  address: 'address',
  name: 'name',
  phoneNumber: 'phoneNumber',
  email: 'email'
} as const

export const INVALID_PURCHASE_ID =
  '購入IDが正しくありません。\nメールを再度ご確認の上、もう一度アクセスしてください。'

export const MENU = {
  REGISTER: 'STORESレジ',
  STOCK_MANAGER: 'STORES在庫管理'
}
