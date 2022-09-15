import { useDebounceFn, useEventListener } from '@vueuse/core'
import { ref, watch } from 'vue'
export const useUiFix = () => {
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
    formLabelWidth,
    columnHeight,
    debouncedFixColumnHeight,
    imgColumn,
    suspend
  }
}
