<script setup lang="ts">
import { PropType } from 'vue'
import { pathNameUnion } from '../types'

const props = defineProps({
  currentPathName: {
    type: String as PropType<pathNameUnion>,
    required: true
  },
  toPath: {
    type: Function as PropType<(arg: pathNameUnion) => void>,
    required: true
  }
})
</script>
<template>
  <div></div>
</template>
<style scoped></style>
