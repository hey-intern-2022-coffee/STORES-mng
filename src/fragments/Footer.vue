<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { pathNameUnion } from '../types'

const router = useRouter()
const route = useRoute()
const currentPathName = computed(() => route.name)
// const isActive = computed(
//   () => (path: pathNameUnion) => [path].includes(currentPathName.value)
// )
</script>
<template>
  <div>
    <div>
      <div></div>
    </div>
  </div>
</template>
<style scoped></style>
