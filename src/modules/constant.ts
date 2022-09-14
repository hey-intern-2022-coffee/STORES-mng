import { bottomMenuElement, pathNameUnion } from '../types'

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
  /** 在庫管理 */
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

export const menus: bottomMenuElement[] = [
  {
    id: 0,
    label: 'ホーム',
    pathName: 'home'
    // iconSrc: HomeSvg,
    // activeIconSrc: ActiveHomeSvg
  } as const,
  {
    id: 1,
    label: 'レジ',
    pathName: 'register'
    // iconSrc: SearchSvg,
    // activeIconSrc: SearchSvg
  } as const,
  {
    id: 2,
    label: '在庫管理',
    pathName: 'online-offline'
    // iconSrc: GoOutSvg,
    // activeIconSrc: GoOutSvg
  } as const
  // {
  //   id: 3,
  //   label: 'やりとり',
  //   path: '/message-list'
  //   // iconSrc: MessageSvg,
  //   // activeIconSrc: ActiveMessageSvg
  // } as const,
  // {
  //   id: 4,
  //   label: 'マイページ',
  //   path: '/my-page'
  //   // iconSrc: MyPageSvg,
  //   // activeIconSrc: ActiveMyPageSvg
  // } as const
]
