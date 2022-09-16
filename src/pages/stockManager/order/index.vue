<script setup lang="ts">
import { ref } from 'vue'
import { Purchase } from '../../../lib/@types'
import { useFetch } from '../../../modules/utils/api'
import { apiClient } from '../../../repos'

const purchaseInfos = ref<Purchase[]>()
useFetch(async () => {
  const res = await apiClient.purchase.all.get()
  console.debug(res.body)
  purchaseInfos.value = res.body
})
</script>
<template>
  <div>
    <div v-for="item in purchaseInfos" class="card">
      <el-card :body-style="{ padding: '0px', width: '100%' }" class="el-card">
        <div class="card-content">
          <div class="center">
            <div>氏名: {{ item.name }}</div>
            <div>購入ID: {{ item.id }}</div>
            <div>受け渡し:{{ item.is_acceptance ? '済' : '未' }}</div>
            <div>メールアドレス: {{ item.mail_address }}</div>
            <!-- <div>購入情報: {{ item.purchases_products }}</div> -->
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<style scoped>
.card {
  margin: 1rem;
}
</style>
