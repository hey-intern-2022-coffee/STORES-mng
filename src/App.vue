<script setup lang="ts">
import { middleware } from './middleware/index'
import FooterBar from './fragments/FooterBar.vue'

middleware()
</script>

<template>
  <div>
    <div class="root-wrapper">
      <router-view></router-view>
    </div>
    <footer>
      <footer-bar></footer-bar>
    </footer>
  </div>
</template>

<style scoped>
footer {
  position: absolute; /*←絶対位置*/
  bottom: 0; /*下に固定*/
}
.root-wrapper {
  width: 100%; /*ブロックの幅*/
  height: auto; /*ブロックの高さ*/
  overflow: scroll; /*スクロール*/
}
</style>
