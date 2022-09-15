import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Purchase } from '../../../../lib/@types'

import { apiClient } from '../../../../repos'
import { useFetch } from '../../../utils/api'
import { productsToGoodsInfo } from '../model'

export const useReceiptConfirm = () => {
  const route = useRoute()
  const router = useRouter()
  const purchaseId = computed(() => Number(route.params.purchaseId)) // FIXME: type check
  const alreadyHasReceipt = ref(false)
  const userData = ref<
    {
      key: 'name' | 'purchaseId' | 'email' | 'phoneNumber'
      data: string
      label: string
    }[]
  >([
    {
      key: 'name',
      data: 'データがありません',
      label: '氏名: '
    },
    {
      key: 'purchaseId',
      data: 'データがありません',
      label: '購入ID: '
    },
    {
      key: 'email',
      data: 'データがありません',
      label: 'email: '
    }
  ])
  // NOTE: BEから取れる値
  const goodsInfo = ref<
    {
      productId: number
      title: string
      count: number
      price: number
      image_url: string
      receive: string
      shopName: string
    }[]
  >([])
  // /**
  //  * @args: API response
  //  */
  // const productsToGoodsInfo = (item: Purchase) => {
  //   // FIXME: types
  //   const userinfoFromResponse: any = {
  //     name: item.name,
  //     purchaseId: item.id,
  //     email: item.mail_address
  //   }
  //   // NOTE: 左側表示のユーザーデータ
  //   userData.value.map(it => {
  //     it.data = userinfoFromResponse[it.key]
  //   })
  //   const goodsInfo = item.purchases_products?.map(it => ({
  //     productId: it.product_id
  //   }))
  //   return goodsInfo
  // }

  // FIXME: responseの購入物品種類数に応じて配列数は変化
  const isReceivedItems = ref<{ isReceived: false }[]>([{ isReceived: false }])

  /** 受け取り商品全てにチェックが付いたらtrue */
  const isReadyToDone = computed(
    () =>
      isReceivedItems.value.length &&
      isReceivedItems.value.every(it => it.isReceived)
  )
  const isLoading = ref(false)

  const done = async () => {
    if (!isReadyToDone.value) return
    if (!purchaseId.value) return
    try {
      // FIXME: promise all
      // purchase.patch , productIdを投げる仕様でした.  BEに変更リクエスト済み(purchase Idに変更)
      await apiClient.purchase.patch({ body: { id: Number(purchaseId.value) } })
      await apiClient.purchase.delivered.patch({
        body: { id: purchaseId.value }
      })
    } catch (e) {
      console.error(e)
    }
    isLoading.value = true
    // POST
    router.push({ name: 'online-receipt-done' })
  }

  /** QRリーダーに戻る */
  const backToQrReader = () => {
    alreadyHasReceipt.value = false
    router.push({ name: 'online-receipt-qr-reader' })
  }

  /** fetch products */
  useFetch(async () => {
    const products = await apiClient.purchase
      ._purchases_id(purchaseId.value)
      .get()

    alreadyHasReceipt.value = products.body.is_acceptance ?? false
    if (alreadyHasReceipt.value) return // 受け取り済み

    const goodsIds = productsToGoodsInfo(products.body, userData)

    //  FIXME: ロジック分離
    if (!goodsIds) return
    for (let i = 0; i < goodsIds?.length; i++) {
      const res = await apiClient.products
        ._product_id(Number(goodsIds[i].productId))
        .get()
      const t = ref(0)
      for (let it of goodsInfo.value) {
        if (it.productId === res.body.id) {
          t.value = res.body.id
          it.count++
        }
      }
      if (!t.value) {
        goodsInfo.value.push({
          productId: res.body.id ?? 0,
          title: res.body.name,
          count: 1,
          price: res.body.price ?? 0,
          image_url: res.body.image_url ?? '',
          receive: '現地',
          shopName: '決め打ち.com'
        })
      }
    }
    // FIXME: ロジック分離
    isReceivedItems.value = [...new Array(goodsInfo.value.length)].map(it => ({
      isReceived: false
    }))
  })

  return {
    purchaseId,
    userData,
    goodsInfo,
    isReceivedItems,
    isReadyToDone,
    isLoading,
    done,
    alreadyHasReceipt,
    backToQrReader
  }
}
