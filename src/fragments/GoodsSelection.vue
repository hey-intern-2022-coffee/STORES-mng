<script setup lang="ts">
import { computed, ComputedRef, onMounted, PropType, ref } from 'vue'

const props = defineProps({
  choices: {
    type: Object as PropType<{ value: string; label: string }[]>,
    required: true
  },
  isAbleToIncrease: {
    type: Array<boolean>,
    required: true
  },
  delColumn: {
    type: Function,
    required: true
  },
  vals: {
    type: Object as PropType<{
      id: number
      index: number
      model: string | ComputedRef<string>
      count: number | ComputedRef<number>
    }>,
    required: true
  }
})
const value = ref('')
props.vals.model = computed(() => value.value)
const num = ref({
  count: 1,
  max: 10
})
props.vals.count = computed(() => num.value.count)

onMounted(() => {
  const inputDom = document.getElementsByClassName('el-input')
  for (let i = 0; i < inputDom.length; i++) {
    if (inputDom[i])
      inputDom[i].setAttribute('style', 'height:3rem; font-size:large;')
  }
})
</script>

<template>
  <div class="wrapper">
    <div class="select-wrapper">
      <el-select v-model="value" placeholder="Select" class="select">
        <el-option
          v-for="item in choices"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
          <span style="float: left">{{ item.label }}</span>
          <span
            style="
              float: right;
              color: var(--el-text-color-secondary);
              font-size: 13px;
            "
            >{{ item.value }}</span
          >
        </el-option>
      </el-select>
    </div>
    <div class="counter-wrapper">
      <el-input-number
        v-model="num.count"
        :min="0"
        :max="num.max"
        size="large"
        :disabled="!isAbleToIncrease[vals.index]"
      />
    </div>
  </div>
</template>
<style scoped>
.select {
  width: 40vw;
}
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.select-wrapper,
.counter-wrapper {
  margin: 1rem;
}
</style>
