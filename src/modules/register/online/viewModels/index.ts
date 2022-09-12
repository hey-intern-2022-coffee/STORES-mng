import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export const useReceiptConfirm = () => {
  const route = useRoute()
  const router = useRouter()
  const purchaseId = computed(() => route.params.id)

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
  const done = () => {
    if (!isReadyToDone.value) return
    isLoading.value = true
    // POST
    router.push({ name: 'online-receipt-done' })
  }
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
