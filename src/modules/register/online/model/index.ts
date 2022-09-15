import { Purchase } from '../../../../lib/@types'
import { Ref } from 'vue'

// FIXME: 型修正
export const getBaseUri = (fullPath: string) =>
  document.baseURI.replaceAll(fullPath, '')

type UserDataForReceipt = {
  key: 'name' | 'purchaseId' | 'email' | 'phoneNumber'
  data: string
  label: string
}[]

// FIXME: userDataの副作用を分離
/**
 * @args: API response
 */
export const productsToGoodsInfo = (
  item: Purchase,
  userData: Ref<UserDataForReceipt>
) => {
  // FIXME: types
  const userinfoFromResponse: any = {
    name: item.name,
    purchaseId: item.id,
    email: item.mail_address
  }
  // NOTE: 左側表示のユーザーデータ
  userData.value.map(it => {
    it.data = userinfoFromResponse[it.key]
  })
  const goodsInfo = item.purchases_products?.map(it => ({
    productId: it.product_id
  }))
  // const ret: { productId: number }[] = []
  // goodsInfo?.forEach(el => {
  //   if (ret.every(it => it.productId !== el.productId))
  //     ret.push({ productId: el.productId ?? 0 })
  //   else{
  //     ret.some(it=>{
  //       if(it.productId===el.productId){
  //         it.productId
  //       }
  //     })
  //   }
  // })
  return goodsInfo
}
