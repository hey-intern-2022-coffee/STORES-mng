<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ButtonWithLoading from '@/components/ButtonWithLoading.vue'

const router = useRouter()
const isLoadingToOffline = ref(false)
const toOnline = () => {
  isLoadingToOnline.value = true
  router.push({ name: 'online' })
}
const isLoadingToOnline = ref(false)
const toOffline = () => {
  isLoadingToOffline.value = true
  router.push({ name: 'offline' })
}
const isLoadingToOrder = ref(false)
const toOrder = () => {
  isLoadingToOrder.value = true
  router.push({ name: 'order' })
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
          :is-loading="isLoadingToOnline"
          class="btn"
        />
      </div>
      <div>
        <ButtonWithLoading
          :text="'オフライン在庫管理'"
          :click-method="toOffline"
          :custom-style="'width: 50vw;height: auto;'"
          :is-loading="isLoadingToOffline"
          class="btn"
        />
      </div>
      <div>
        <ButtonWithLoading
          :text="'注文情報'"
          :click-method="toOrder"
          :custom-style="'width: 50vw;height: auto;'"
          :is-loading="isLoadingToOrder"
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
