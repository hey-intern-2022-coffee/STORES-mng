<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ButtonWithLoading from '@/components/ButtonWithLoading.vue'
// @ts-ignore
import { MENU } from '@/modules/constant'

const router = useRouter()

const toRegister = () => {
  router.push({ name: 'register' })
}
const toStockManager = () => {
  router.push({ name: 'online-offline' })
}
const isLoading = ref({ online: false, offline: false })
</script>
<template>
  <div class="wrapper">
    <div class="titles">
      <!-- <h1>register</h1> -->
    </div>
    <div class="btns">
      <div>
        <ButtonWithLoading
          :text="MENU.REGISTER"
          :click-method="toRegister"
          :custom-style="'width: 50vw;height: auto;'"
          :is-loading="isLoading.online"
          class="btn"
        />
      </div>
      <div>
        <ButtonWithLoading
          :text="MENU.STOCK_MANAGER"
          :click-method="toStockManager"
          :custom-style="'width: 50vw;height: auto;'"
          :is-loading="isLoading.offline"
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
.btn {
  margin-top: 7%;
  margin-bottom: 7%;
}
.wrapper {
  height: 80vh;
  /* display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: stretch; */
}
</style>
