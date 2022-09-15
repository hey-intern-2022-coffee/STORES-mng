import { useDebounceFn, useEventListener } from '@vueuse/core'
import { nextTick, onMounted, ref, watch } from 'vue'
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

  const formLabelWidth = '140px'
  const columnHeight = () => {
    const elems = document.getElementsByClassName('el-table__cell')
    for (let i = 0; i < elems.length; i++) {
      for (let j = 0; j < elems[i].children.length; j++) {
        elems[i].children[j].setAttribute(
          'style',
          'max-height: 5rem;overflow: scroll;'
        )
      }
    }
  }

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

  // FIXME: 秒数撲滅のため, tableUIを自前実装にする必要あり.
  const debouncedFixColumnHeight = useDebounceFn(
    () => {
      columnHeight()
    },
    1000,
    { maxWait: 5000 } // NOTE: debouncedFixColumnHeightの実行を5000secまで待つ(watchの発火を5000secまで待つ)
  )
  const imgColumn = ref<HTMLElement>()
  const suspend = watch(
    imgColumn,
    () => {
      debouncedFixColumnHeight()
      suspend()
    },
    { deep: true }
  )

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
