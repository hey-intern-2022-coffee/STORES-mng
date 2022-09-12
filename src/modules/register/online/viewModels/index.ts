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
      data: '金本知憲',
      label: '氏名: '
    },
    {
      key: 'purchaseId',
      data: '123456',
      label: '購入ID: '
    },
    {
      key: 'email',
      data: 'hoge@ddmail.com',
      label: 'email: '
    }
  ])
  // NOTE: BEから取れる値
  const goodsInfo = ref([
    {
      title: '商品名うちわ',
      count: 1,
      price: 10000,
      image_url:
        'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
      receive: '現地',
      shopName: 'amazon.com'
    }
  ])
  const apiResponseToRef = (item: Purchase) => {
    // FIXME: types
    const userinfoFromResponse: any = {
      name: item.name,
      purchaseId: item.id,
      email: item.mail_address
    }
    userData.value.map(it => {
      it.data = userinfoFromResponse[it.key]
    })
    const goodsInfo = item.purchases_products?.map(it => ({
      productId: it.product_id
    }))
    // FIXME: productIdを投げてproduct情報を返すGETのアクセスパターンが欲しい
  }

  // FIXME: responseの購入物品種類数に応じて配列数は変化
  const isReceivedItems = ref(
    [...new Array(goodsInfo.value.length)].map(
      it =>
        (it = {
          isReceived: false
        })
    )
  )
  const isReadyToDone = computed(() =>
    isReceivedItems.value.every(it => it.isReceived)
  )
  const isLoading = ref(false)

  const done = async () => {
    if (!isReadyToDone.value) return
    if (!purchaseId.value) return
    try {
      await apiClient.purchase.put({ body: purchaseId.value })
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
    console.debug(products)
    apiResponseToRef(products.body)
    // userData.value =
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
