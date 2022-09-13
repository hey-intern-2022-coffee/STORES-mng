<script setup lang="ts">
import GoodsSelection from '@/fragments/GoodsSelection.vue'
import { onMounted, onUpdated, ref, watch } from 'vue'
import { useOfflinePos } from '../../../modules/register/offline/viewModels/index'
import ButtonWithLoading from '@/components/ButtonWithLoading.vue'

const {
  goods,
  inputValues,
  increaseElemOfInputValues,
  increaseCount,
  isAbleToIncrease,
  delColumn,
  checkout,
  isLoading,
  dialogVisible,
  handleClose
} = useOfflinePos()
</script>
<template>
  <div>
    <div v-for="vals in inputValues" class="selections">
      <GoodsSelection
        :choices="goods"
        @countChange="increaseCount"
        :is-able-to-increase="isAbleToIncrease"
        :vals="vals"
        :del-column="delColumn"
      />
    </div>
    <div class="btn">
      <el-button
        @click="increaseElemOfInputValues"
        class="el-button-"
        style="width: 80vw"
        >+</el-button
      >
    </div>
    <div class="submit">
      <ButtonWithLoading
        :text="'購入'"
        :click-method="checkout"
        :custom-style="'width: 50vw;height: auto;'"
        :is-loading="isLoading"
        class="btn"
      />
    </div>
    <div class="dialog">
      <el-dialog
        v-model="dialogVisible"
        title="POSレジ"
        width="30%"
        :before-close="handleClose"
      >
        <span>商品が購入されました。</span>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="handleClose">完了</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>
<style scoped>
.selections {
  display: flex;
  justify-content: center;
  /* width: 80vw; */
}
.btn,
.del {
  display: flex;
  justify-content: center;
}
.submit {
  margin-top: 3rem;
}
</style>
