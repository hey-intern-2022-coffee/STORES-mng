import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { GoodsChoice } from '../../types'

export const useOfflinePos = () => {
  const router = useRouter()
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
  // inputValuesにchoicesも含めたい->重複を許さないように, filterする
  //   choices: Array<{ value: string; label: string }>
  const inputValues = ref<
    {
      id: number
      index: number
      model: string
      count: number
    }[]
  >([{ id: 0, index: 0, model: '', count: 0 }])
  const increaseElemOfInputValues = () => {
    inputValues.value.push({
      id: inputValues.value.length,
      index: inputValues.value.length,
      model: '',
      count: 1
    })
  }
  const initializeInputValues = () => {
    inputValues.value = [{ id: 0, index: 0, model: '', count: 0 }]
    console.debug(inputValues.value)
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
    inputValues.value.splice(index, 1)
    inputValues.value.forEach((val, index) => {
      val.id = val.index = index
    })
    console.debug(inputValues.value)
  }

  const dialogVisible = ref(false)
  const handleClose = () => {
    dialogVisible.value = false
    // initializeInputValues() // NOTE: Initialize input values
    // FIXME: 一番上の行だけ、fragments側でデータが残ってしまっている(更新されてない)
    router.go(0) // NOTE: reload
  }
  const isLoading = ref(false)

  const checkout = async () => {
    isLoading.value = true
    inputValues.value.forEach(it => console.debug(it.count, it.model))
    // TODO: 在庫編集API
    isLoading.value = false
    dialogVisible.value = true // NOTE: 「商品が購入されました」ダイアログ開く
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
    isLoading,
    dialogVisible,
    handleClose
  }
}
