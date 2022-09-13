<script setup lang="ts">
const handleClick = () => {
  console.log('click')
}

const tableData = [
  {
    name: '商品名1',
    price: 1000,
    image_url: 'https://hogehuga.com',
    stocks: 10
  }
]
</script>
<template>
  <div>online stock manager</div>
  <div>
    <div class="table-wrapper">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed prop="name" label="商品名" />
        <el-table-column prop="price" label="値段" />
        <el-table-column prop="image_url" label="画像" />
        <el-table-column prop="stocks" label="在庫数" />
        <el-table-column fixed="right" label="">
          <template #default>
            <el-button link type="primary" size="small" @click="handleClick"
              >編集</el-button
            >
            <!-- <el-button link type="primary" size="small">削除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<style scoped></style>
