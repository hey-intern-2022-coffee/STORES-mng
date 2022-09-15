<script setup lang="ts">
const props = defineProps({
  dialogVisible: {
    type: Boolean,
    required: true
  },
  handleClose: {
    type: Function,
    required: true
  },
  cancel: {
    type: Function,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  continueBtnText: {
    type: String,
    required: true
  }
})
</script>
<template>
  <div>
    <div class="dialog">
      <el-dialog v-model="dialogVisible" :title="title" :before-close="cancel">
        <span></span>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="handleClose">{{
              continueBtnText
            }}</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>
<style scoped></style>
