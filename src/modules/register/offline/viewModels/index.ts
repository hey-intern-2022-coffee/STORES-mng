import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import { GoodsChoice } from '../../types'

export const useOfflinePos = () => {
  const goods = ref<GoodsChoice>([
    {
      value: 'Beijing',
      label: 'Beijing'
    },
    {
      value: 'Shanghai',
      label: 'Shanghai'
    },
    {
      value: 'Nanjing',
      label: 'Nanjing'
    },
    {
      value: 'Chengdu',
      label: 'Chengdu'
    },
    {
      value: 'Shenzhen',
      label: 'Shenzhen'
    },
    {
      value: 'Guangzhou',
      label: 'Guangzhou'
    }
  ])
  const inputValues = ref<
    { id: number; index: number; model: string; count: number }[]
  >([{ id: 0, index: 0, model: '', count: 0 }])
  const increaseElemOfInputValues = () => {
    inputValues.value.push({
      id: inputValues.value.length,
      index: inputValues.value.length,
      model: '',
      count: 1
    })
  }
  const increaseCount = (arg: number) => {
    inputValues.value[arg].count++
  }

  const setLengthOfBottomIncrements = () => {
    const btns = document.getElementsByClassName('el-button-')
    btns[0].setAttribute('style', 'width:80vw')
  }
  const isAbleToIncrease = computed(() =>
    inputValues.value.map(it => !!it.model)
  )
  const delColumn = (index: number) => {
    console.debug(index)
    inputValues.value.splice(index, 1)
    inputValues.value.forEach((val, index) => {
      val.id = val.index = index
    })
    console.debug(inputValues.value)
  }

  const isLoading = ref(false)

  const checkout = async () => {
    isLoading.value = true
    inputValues.value.forEach(it => console.debug(it.count, it.model))
    // TODO: 在庫編集API
    //「商品が購入されました」ダイアログ開く
  }
  return {
    goods,
    inputValues,
    increaseElemOfInputValues,
    increaseCount,
    setLengthOfBottomIncrements,
    isAbleToIncrease,
    delColumn,
    checkout,
    isLoading
  }
}
