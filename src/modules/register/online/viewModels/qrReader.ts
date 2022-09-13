import jsQR from 'jsqr'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export const useQrReader = () => {
  const purchaseId = ref('')
  const isLoading = ref(true)
  const isReadyToGoBtnBg = computed(() =>
    !!purchaseId.value ? '#eb6100' : '#BBBBBB'
  )
  const isReadyToGoBtnColor = computed(() =>
    !!purchaseId.value ? '#ffffff' : '#dddddd'
  )
  const route = useRoute()
  const router = useRouter()

  const autoPushToConfirmationView = (_purchaseId: string) => {
    if (!_purchaseId) return
    purchaseId.value = ''
    router.push({
      name: 'online-confirm-receipt',
      params: { purchaseId: _purchaseId }
    })
    // window.open(url) // NOTE:'_blank'しない。
  }

  const pushToConfirmationView = () => {
    if (!purchaseId.value) return
    router.push({
      name: 'online-confirm-receipt',
      params: { purchaseId: purchaseId.value }
    })
    // window.open(url) // NOTE: '_blank'しない。
  }

  onMounted(() => {
    const video = document.createElement('video')
    const canvasElement = document.getElementById('canvas') as HTMLCanvasElement // FIXME: type assertion
    const canvas = canvasElement.getContext('2d')
    const loading = document.getElementById('loading')
    //   const output = document.getElementById('output')
    let isReadQR = false
    if (loading) loading.innerText = 'ロード中...'

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment' } })
      .then(stream => {
        video.srcObject = stream
        video.setAttribute('playsinline', 'true')
        video.play()
        requestAnimationFrame(tick)
      })

    function tick() {
      if (loading) loading.innerText = 'ロード中...'
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        if (loading) loading.hidden = true
        if (!canvasElement) return
        canvasElement.hidden = false
        canvasElement.height = video.videoHeight
        canvasElement.width = video.videoWidth
        if (!canvas) return
        canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height)
        var imageData = canvas.getImageData(
          0,
          0,
          canvasElement.width,
          canvasElement.height
        )
        if (!imageData) return
        var code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'dontInvert'
        })
        if (code && !isReadQR) {
          purchaseId.value = code.data
          autoPushToConfirmationView(code.data)
          isReadQR = true
          isLoading.value = false
        }
      }
      requestAnimationFrame(tick)
    }
  })
  const pushToConfirmationViewByInputs = () => {
    if (!purchaseId.value) return
    isLoadingToGoConfirmView.value = true
    router.push({
      name: 'online-confirm-receipt',
      params: { purchaseId: purchaseId.value }
    })
    // window.open(url) // NOTE: '_blank'しない。
  }

  const isLoadingToGoConfirmView = ref(false)
  return {
    purchaseId,
    isLoading,
    isReadyToGoBtnBg,
    isReadyToGoBtnColor,
    autoPushToConfirmationView,
    pushToConfirmationView,
    isLoadingToGoConfirmView,
    pushToConfirmationViewByInputs
  }
}
