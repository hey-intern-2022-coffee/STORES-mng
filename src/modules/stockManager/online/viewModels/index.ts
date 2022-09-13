import { ref } from 'vue'
import { OnlineProducts } from '../../../../lib/@types'
import { apiClient } from '../../../../repos'
import { useFetch } from '../../../utils/api'

export const useOnlineStockManager = () => {
  const dialogVisible = ref(false)
  const openEditDialog = () => {
    dialogVisible.value = true
  }

  // 追加
  const closeEditDialog = () => {
    initAnnotation()
    console.debug(validation(), annotation.value)
    if (!validation()) return
    //追加する
    initForm()
    dialogVisible.value = false
  }
  const cancelAddGoods = () => {
    initAnnotation()
    dialogVisible.value = false
  }
  const form = ref<
    Pick<OnlineProducts, 'name' | 'price' | 'image_url' | 'online_stock'>
  >({
    name: '',
    price: 0,
    image_url: '',
    online_stock: {
      stock_quantity: 0
    }
  })
  const initForm = () => {
    form.value = {
      name: '',
      price: 0,
      image_url: '',
      online_stock: {
        stock_quantity: 0
      }
    }
  }
  const annotation = ref<
    Record<
      keyof Pick<
        OnlineProducts,
        'name' | 'price' | 'image_url' | 'online_stock'
      >,
      boolean
    >
  >({
    name: false,
    price: false,
    image_url: false,
    online_stock: false // FIXME: 型修正(本当はネストした中でboolを持ちたい)
  })
  const initAnnotation = () => {
    annotation.value = {
      name: false,
      price: false,
      image_url: false,
      online_stock: false // FIXME: 型修正(本当はネストした中でboolを持ちたい)
    }
  }
  const validation = () => {
    if (!form.value.name.length) annotation.value.name = true
    if (!form.value.price) annotation.value.price = true
    if (!form.value.image_url?.length) annotation.value.image_url = true
    if (!form.value.online_stock?.stock_quantity)
      annotation.value.online_stock = true
    return !Object.values(annotation.value).some(it => it)
  }

  const formLabelWidth = '140px'

  const tableData = ref<OnlineProducts[]>()
  useFetch(async () => {
    const res = await apiClient.onlinestore.allproducts.get()
    tableData.value = res.body
  })

  return {
    openEditDialog,
    tableData,
    dialogVisible,
    closeEditDialog,
    form,
    formLabelWidth,
    cancelAddGoods,
    annotation
  }
}
