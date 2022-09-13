import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({ authenticated: false, reAuth: false }),
  getters: {
    getAuthenticated: state => state.authenticated,
    getIsReAuth: state => state.reAuth
  },
  actions: {
    setIsAuthenticated() {
      this.authenticated = true
      this.reAuth = false // falseにしておく
    },
    setReAuthRequired() {
      // 再認証時はこちら。
      this.authenticated = false
      this.reAuth = true
    }
  },
  persist: {
    enabled: true
  }
})
