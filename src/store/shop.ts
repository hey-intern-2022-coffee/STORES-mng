import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useShopnStore = defineStore('shop', () => {
  type StoreInfo = {
    name: string
  }
  const shopInfo = ref<StoreInfo>({
    name: ''
  })
})
