import { ref } from 'vue'
import { OnlineProducts } from '../../../../lib/@types'
import { apiClient } from '../../../../repos'
import { useFetch } from '../../../utils/api'
import { Annotation } from '../../types'
import { initAnnotation, initForm, validation } from '../models'

export const useOnlineStockManager = () => {
  const tableData = ref<OnlineProducts[]>()
  const dialogVisible = ref(false)
  const openEditDialog = () => {
    dialogVisible.value = true
  }

  const sendGoodsInfo = async () => {
    //追加する
    await addGoods(form.value)
  }

  // 追加
  const closeEditDialog = async () => {
    const { isShowAnnotations, isValid } = validation(form.value)
    annotation.value = isShowAnnotations
    if (!isValid) return // validation
    await sendGoodsInfo()
    form.value = initForm() // 送信後にformをクリア
    dialogVisible.value = false // Dialogを閉じる
    fetchAllGoods() // データを更新する
  }
  const cancelAddGoods = () => {
    annotation.value = initAnnotation()
    dialogVisible.value = false
  }

  const form = ref<OnlineProducts>({
    name: '',
    price: 0,
    image_url: '',
    online_stock: {
      stock_quantity: 0
    }
  })

  const annotation = ref<Annotation>({
    name: false,
    price: false,
    image_url: false,
    online_stock: false // FIXME: 型修正(本当はネストした中でboolを持ちたい)
  })

  const formLabelWidth = '140px'

  const addGoods = async (arg: OnlineProducts) => {
    try {
      await apiClient.products.post({
        body: {
          name: arg.name,
          price: Number(arg.price),
          image_url: arg.image_url,
          online_stock: {
            stock_quantity: Number(arg.online_stock?.stock_quantity) ?? 1
          }
        }
      })
    } catch (e) {
      console.error(e)
    }
  }
  const fetchAllGoods = async () => {
    try {
      const res = await apiClient.onlinestore.allproducts.get()
      tableData.value = res.body
    } catch (e) {
      console.error(e)
    }
  }
  useFetch(async () => {
    await fetchAllGoods()
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
