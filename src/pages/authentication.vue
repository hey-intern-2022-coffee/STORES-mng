<script setup lang="ts">
import { useAuthentication } from '../modules/authentication'
import ButtonWithLoading from '@/components/ButtonWithLoading.vue'

const { userInfo, formatter, parser, auth, isLoading, isInvalids } =
  useAuthentication()
</script>

<template>
  <div>authentication</div>
  <div class="wrapper">
    <div class="username">
      <div>
        <label for="userId"> ユーザーID: </label>
        <el-input
          id="userId"
          v-model="userInfo.nameOrId"
          type="text"
          placeholder="ユーザーID"
        />
      </div>
      <template v-if="isInvalids.name">
        <span class="invalid-name"> invalid </span>
      </template>
    </div>
    <div class="pass">
      <div>
        <label for="userPass"> パスワード： </label>
        <el-input
          id="userPass"
          v-model="userInfo.pass"
          type="password"
          placeholder="パスワード"
          show-password
          @keypress.enter="auth"
        />
      </div>
      <template v-if="isInvalids.pass">
        <span class="invalid-pass">invalid</span></template
      >
    </div>
    <div class="btn">
      <ButtonWithLoading
        :text="'認証'"
        :click-method="auth"
        :custom-style="'width: 50vw;height: auto;'"
        :is-loading="isLoading"
        class="btn"
      />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.username,
.pass,
.btn {
  /* width: 50vw; */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
}

.invalid-name,
.invalid-pass {
  color: red;
  font-size: small;
  margin-top: auto;
}
</style>
