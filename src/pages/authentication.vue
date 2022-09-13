<script setup lang="ts">
import { useAuthentication } from '../modules/authentication'
import ButtonWithLoading from '@/components/ButtonWithLoading.vue'

const { userInfo, formatter, parser, auth, isLoading } = useAuthentication()
</script>

<template>
  <div>authentication</div>
  <div>
    <label for="userId"> ユーザーID: </label>
    <el-input
      id="userId"
      v-model="userInfo.nameOrId"
      type="id"
      placeholder="ユーザーID"
    />
    <label for="userPass"> パスワード： </label>
    <el-input
      id="userPass"
      v-model="userInfo.pass"
      type="password"
      placeholder="パスワード"
      show-password
      @keypress:enter="auth"
    />
  </div>
  <div>
    <ButtonWithLoading
      :text="'認証'"
      :click-method="auth"
      :custom-style="'width: 50vw;height: auto;'"
      :is-loading="isLoading"
      class="btn"
    />
  </div>
</template>

<style scoped></style>
