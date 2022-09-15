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
    <div class="btns">
      <div>
        <ButtonWithLoading
          :text="'オンライン在庫管理'"
          :click-method="toOnline"
          :custom-style="'width: 50vw;height: auto;'"
          :is-loading="isLoading"
          class="btn"
        />
      </div>
      <div>
        <ButtonWithLoading
          :text="'オフライン在庫管理'"
          :click-method="toOffline"
          :custom-style="'width: 50vw;height: auto;'"
          :is-loading="isLoading"
          class="btn"
        />
      </div>
    </div>
  </div>
</template>
<style scoped>
.btns,
.titles {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 3rem;
}
.btns {
  height: 70%;
}
.wrapper {
  height: 80vh;
}

.btn {
  margin-top: 7%;
  margin-bottom: 7%;
}
</style>
