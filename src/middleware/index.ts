import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'

export const middleware = () => {
  const store = useAuthStore()
  const isAuthenticated = computed(() => store.getAuthenticated)
  console.debug(store.getAuthenticated)
  if (isAuthenticated.value) return
  // TODO: pathを見て再認証かどうか判断
  const router = useRouter()
  router.push({ name: 'authentication' })
}
