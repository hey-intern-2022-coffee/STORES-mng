import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../store/auth'

export const useAuthentication = () => {
  const userInfo = ref({
    nameOrId: '',
    pass: ''
  })
  const isLoading = ref(false)
  const formatter = (value: string) => value
  // `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  const parser = (value: string) => value.replace(/\$\s?|(,*)/g, '')
  const store = useAuthStore()
  const router = useRouter()
  const isInvalids = ref({ name: false, pass: false })
  const auth = () => {
    const isValidNameOrId =
      import.meta.env.VITE_USER_ID == userInfo.value.nameOrId
    const isValidPass = import.meta.env.VITE_USER_PASS == userInfo.value.pass
    if (isValidNameOrId && isValidPass) {
      store.setIsAuthenticated() // 認証済
      router.push({ name: 'home' })
    }
    isInvalids.value.name = isValidNameOrId ? false : true
    isInvalids.value.pass = isValidPass ? false : true
  }
  return { userInfo, formatter, parser, auth, isLoading, isInvalids }
}
