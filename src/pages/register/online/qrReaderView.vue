<script setup lang="ts">
import { useQrReader } from '../../../modules/register/online/viewModels/qrReader'
import ButtonWithLoading from '@/components/ButtonWithLoading.vue'
import { QR_READER } from '../../../modules/register/constant'

const {
  purchaseId,
  isLoading,
  isReadyToGoBtnBg,
  isReadyToGoBtnColor,
  autoPushToConfirmationView,
  pushToConfirmationView,
  isLoadingToGoConfirmView
} = useQrReader()
</script>

<template>
  <div>
    <div class="header">
      <h1 class="title">QR reader</h1>
      <h2>{{ QR_READER.ANNOTATION }}</h2>
    </div>

    <div class="reader">
      <canvas id="canvas" class="canvas"></canvas>
      <div v-show="isLoading" id="loading">{{ QR_READER.LOADING_MESSAGE }}</div>
      <div class="btn btn--orange" @click="pushToConfirmationView">
        遷移しない場合はこちらから
      </div>
    </div>

    <div class="manual">
      読み取られない場合は以下から。
      <div>
        <label for="userId"> 購入ID: </label>
        <el-input
          id="userId"
          v-model="purchaseId"
          type="text"
          placeholder="購入ID"
        />
      </div>
      <div class="btn-with-loading">
        <ButtonWithLoading
          :text="'次へ'"
          :click-method="pushToConfirmationView"
          :custom-style="'width: 50vw;height: auto;'"
          :is-loading="isLoadingToGoConfirmView"
          class="btn"
        />
      </div>
    </div>
  </div>
</template>
<style scoped>
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-left: 10%;
  padding-right: 10%;
  white-space: pre-wrap;
  /* background-color: #d9d9d9; */
}
.header .title {
  padding-top: 2rem;
  padding-bottom: 2rem;
}
.reader {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.canvas {
  width: 50vw;
  height: auto;
  max-height: 90vh;
  margin: 5rem;
}
.btn--orange,
.btn--orange {
  color: v-bind(isReadyToGoBtnColor);
  background-color: v-bind(isReadyToGoBtnBg);
}
.btn--orange:hover,
.btn--orange:hover {
  color: v-bind(isReadyToGoBtnColor);
  background-color: v-bind(isReadyToGoBtnBg);
}

.btn {
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: bold;
  line-height: 1.5;
  position: relative;
  display: inline-block;
  padding: 0.5rem 1rem;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  text-align: center;
  vertical-align: middle;
  text-decoration: none;
  letter-spacing: 0.1em;
  border-radius: 0.5rem;
}

.manual,
.btn-with-loading {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>
