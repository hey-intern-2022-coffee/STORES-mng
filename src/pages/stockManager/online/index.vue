<script setup lang="ts">
import { useOnlineStockManager } from '../../../modules/stockManager/online/viewModels/index'

const { openEditDialog, tableData, isOpenDialog } = useOnlineStockManager()
</script>

<template>
  <div class="wrapper">
    <div class="table-wrapper">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed prop="name" label="商品名" />
        <el-table-column prop="price" label="値段" />
        <el-table-column prop="image_url" label="画像" />
        <el-table-column prop="stocks" label="在庫数" />
        <el-table-column fixed="right" label="">
          <template #default>
            <el-button link type="primary" size="small" @click="openEditDialog"
              >編集</el-button
            >
            <!-- <el-button link type="primary" size="small">削除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  margin-top: 1rem;
}
</style>
