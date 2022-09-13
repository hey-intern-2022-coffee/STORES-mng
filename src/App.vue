<script setup lang="ts">
import { middleware } from './middleware/index'

middleware()
</script>

<template>
  <div><router-view></router-view></div>
</template>

<style scoped></style>
