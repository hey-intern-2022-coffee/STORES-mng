import { ref } from 'vue'
import { OnlineProducts } from '../../../../lib/@types'
import { apiClient } from '../../../../repos'
import { useFetch } from '../../../utils/api'

export const useOnlineStockManager = () => {
  const isOpenDialog = ref(false)
  const openEditDialog = () => {}

  const tableData = ref<OnlineProducts[]>()
  useFetch(async () => {
    const res = await apiClient.onlinestore.allproducts.get()
    tableData.value = res.body
  })
  return { openEditDialog, tableData, isOpenDialog }
}
