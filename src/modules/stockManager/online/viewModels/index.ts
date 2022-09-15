import { useDebounceFn, useEventListener } from '@vueuse/core'
import { nextTick, onMounted, Ref, ref, watch } from 'vue'
import { OnlineProducts } from '../../../../lib/@types'
import { apiClient } from '../../../../repos'
import { useFetch } from '../../../utils/api'
import { Annotation, TableDataForOnlineStock } from '../../types'
import {
  initAnnotation,
  initForm,
  validation,
  getStockNumerics
} from '../models'
import { useUiFix } from './uiFix'

export const useOnlineStockManager = () => {
  // const tableData = ref<OnlineProducts[]>()
  const allProducts = ref<OnlineProducts[]>()
  const tableData = ref<TableDataForOnlineStock[]>()

  const dialogVisible = ref(false)
  const {
    formLabelWidth,
    columnHeight,
    debouncedFixColumnHeight,
    imgColumn,
    suspend
  } = useUiFix()

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
    setDataToTable() // データを更新する
    debouncedFixColumnHeight() // UIの修正
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
  const fetchAllGoods = async (arg: Ref<OnlineProducts[] | undefined>) => {
    try {
      const res = await apiClient.onlinestore.allproducts.get()
      // tableData.value = res.body
      arg.value = res.body
    } catch (e) {
      console.error(e)
    }
  }
  const setDataToTable = async () => {
    await fetchAllGoods(allProducts)
    console.debug(allProducts)

    tableData.value = allProducts.value?.map(it => {
      const data = getStockNumerics({ online_stock: it.online_stock })
      return Object.assign(
        { productId: it.id, name: it.name, price: it.price },
        data
      )
    })
    console.debug(tableData.value)
  }
  useFetch(async () => {
    await setDataToTable()
  })

  return {
    openEditDialog,
    tableData,
    dialogVisible,
    closeEditDialog,
    form,
    formLabelWidth,
    cancelAddGoods,
    annotation,
    imgColumn
  }
}
