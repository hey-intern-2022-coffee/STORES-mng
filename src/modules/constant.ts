export const APP_NAME = 'STORES'

export const LABELS_ON_CHECKOUT_FORM = {
  title: { title: '注文情報の入力' },
  addressForm: { title: 'お届け先', clearBtn: '全て消す' },
  orderInfo: { title: '注文情報', warning: '必須項目です。' },
  bottom: { btn: '注文を確定する' }
}

export const checkoutInfosEnum = {
  zipCode: 'zipCode',
  address: 'address',
  name: 'name',
  phoneNumber: 'phoneNumber',
  email: 'email'
} as const

export const QR_CODE_VIEW_TEXT_IN_ONLINE_STORE = {
  annotation: {
    top: '商品受け取りの際に下記のQRコードをご提示ください。',
    bottom:
      '本ページのURLはメールにも送信しておりますのでそちらも合わせてご確認ください。'
  }
}
export const COMPLETE_CHECKOUT_VIEW_TEXT_IN_ONLINE_STORE = {
  thanks: 'お買い上げありがとうございます。',
  annotation: {
    top: '商品受け取りの際に下記から表示されるQRコードをご提示ください。',
    bottom:
      'URLはメールにも送信しておりますのでそちらも合わせてご確認ください。'
  }
}

export const SAVE_QR_CODE = 'QRコードを保存する'
export const INVALID_PURCHASE_ID =
  '購入IDが正しくありません。\nメールを再度ご確認の上、もう一度アクセスしてください。'
