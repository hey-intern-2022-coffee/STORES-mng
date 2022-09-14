<script setup lang="ts">
import { ComputedRef, PropType } from 'vue'
import { bottomMenuElement, pathNameUnion } from '../types'

const props = defineProps({
  currentPathName: {
    type: String as PropType<pathNameUnion>,
    required: true
  },
  isActive: {
    type: Function as PropType<(path: pathNameUnion) => boolean>,
    required: true
  },
  toPath: {
    type: Function as PropType<(arg: pathNameUnion) => void>,
    required: true
  },
  menus: {
    type: Array<bottomMenuElement>,
    required: true
  }
})
</script>
<template>
  <div>
    <div class="navbar">
      <button
        v-for="item of menus"
        :key="item.id"
        @click="props.toPath(item.pathName)"
        class="btm-nav-btn"
      >
        <!-- <img
          v-show="isActive(item.pathName)"
          :alt="`${item.label}ページへ遷移`"
        /> -->
        <!-- :src="item.activeIconSrc" -->
        <div
          v-if="isActive(item.pathName)"
          class="btm-nav-label _label font-bold text-dark-blue"
          :class="{
            'text-opacity-40': !isActive(item.pathName)
          }"
        >
          {{ item.label }}
        </div>
        <div
          v-else
          class="btm-nav-label _label font-bold text-dark-blue"
          :class="{
            'text-opacity-40': !isActive(item.pathName)
          }"
        >
          {{ item.label }}
        </div>
      </button>
    </div>
  </div>
</template>
<style scoped>
.navbar {
  width: 100vw;
}
.btm-nav-btn {
  width: 33.3333vw;
  height: 4.5vh;
}
</style>
