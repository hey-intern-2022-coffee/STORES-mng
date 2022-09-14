import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Purchase } from '../../../../lib/@types'

import { apiClient } from '../../../../repos'
import { useFetch } from '../../../utils/api'

export const useReceiptConfirm = () => {
  const route = useRoute()
  const router = useRouter()
  const purchaseId = computed(() => Number(route.params.purchaseId)) // FIXME: type check

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
      title: string
      count: number
      price: number
      image_url: string
      receive: string
      shopName: string
    }[]
  >([])
  /**
   * @args: API response
   */
  const apiResponseToRef = (item: Purchase) => {
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
    return goodsInfo
  }

  // FIXME: responseの購入物品種類数に応じて配列数は変化
  const isReceivedItems = ref<
    {
      isReceived: false
    }[]
  >([
    {
      isReceived: false
    }
  ])

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
      await apiClient.purchase.patch({ body: { id: purchaseId.value } })
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
  /** fetch products */
  useFetch(async () => {
    const products = await apiClient.purchase
      ._purchases_id(purchaseId.value)
      .get()

    const goodsIds = apiResponseToRef(products.body)
    // FIXME: productIdを投げてproduct情報を返すGETのアクセスパターンが欲しい
    if (!goodsIds) return
    for (let i = 0; i < goodsIds?.length; i++) {
      const res = await apiClient.products
        ._product_id(Number(goodsIds[i].productId))
        .get()
      goodsInfo.value.push({
        title: res.body.name,
        count: 1,
        price: res.body.price ?? 0,
        image_url: res.body.image_url ?? '',
        receive: '現地',
        shopName: '決め打ち.com'
      })
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
    done
  }
}
