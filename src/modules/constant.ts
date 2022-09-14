export const APP_NAME = 'STORESマネージャー'

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

export const pathNames = {
  authentication: 'authentication',
  home: 'home',
  onlineOffline: 'online-offline',
  online: 'online',
  offline: 'offline',
  register: 'register',
  onlineReceiptQrReader: 'online-receipt-qr-reader',
  onlineConfirmReceipt: 'online-confirm-receipt',
  onlineReceiptDone: 'online-receipt-done',
  offlineRegister: 'offline-register',
  NotFoundError: 'NotFoundError'
} as const
