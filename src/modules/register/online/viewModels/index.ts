import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { apiClient } from '../../../../repos'
import { useFetch } from '../../../utils/api'

export const useReceiptConfirm = () => {
  const route = useRoute()
  const router = useRouter()
  const purchaseId = computed(() => Number(route.params.purchaseId)) // FIXME: type check

  const userData = ref([
    {
      key: 'name',
      data: '金本知憲',
      label: '氏名'
    },
    {
      key: 'id',
      data: '123456',
      label: 'ユーザーID: '
    }
  ])
  // NOTE: BEから取れる値
  const goodsInfo = ref([
    {
      title: '商品名うちわ',
      count: 1,
      price: 10000,
      img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
      receive: '現地',
      shopName: 'amazon.com'
    },
    {
      title: '商品名うちわ',
      count: 1,
      price: 10000,
      img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
      receive: '現地',
      shopName: 'amazon.com'
    },
    {
      title: '商品名うちわ',
      count: 1,
      price: 10000,
      img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
      receive: '現地',
      shopName: 'amazon.com'
    }
  ])
  const isReceivedItems = ref([
    {
      isReceived: false
    },
    {
      isReceived: false
    },
    {
      isReceived: false
    }
  ])
  const isReadyToDone = computed(() =>
    isReceivedItems.value.every(it => it.isReceived)
  )
  const isLoading = ref(false)

  const done = async () => {
    if (!isReadyToDone.value) return
    console.debug(purchaseId.value)
    if (purchaseId.value)
      await apiClient.purchase.put({ body: purchaseId.value })
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
