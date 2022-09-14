<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ButtonWithLoading from '@/components/ButtonWithLoading.vue'

const router = useRouter()
const isLoading = ref(false)
const toOnline = () => {
  router.push({ name: 'online' })
}
const toOffline = () => {
  router.push({ name: 'offline' })
}
</script>
<template>
  <div class="wrapper">
    <!-- FIXME: アイコン！ -->
    <div class="btn-wrapper">
      <ButtonWithLoading
        :text="'オンライン在庫管理'"
        :click-method="toOnline"
        :custom-style="'width: 50vw;height: auto;'"
        :is-loading="isLoading"
        class="btn"
      />
    </div>
    <div class="btn-wrapper">
      <ButtonWithLoading
        :text="'オフライン在庫管理'"
        :click-method="toOffline"
        :custom-style="'width: 50vw;height: auto;'"
        :is-loading="isLoading"
        class="btn"
      />
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 80vh;
}
.btn-wrapper {
  margin: 1rem;
}
</style>
