<script setup lang="ts">
import { useOnlineStockManager } from '../../../modules/stockManager/online/viewModels/index'
import ButtonWithLoading from '@/components/ButtonWithLoading.vue'

const {
  openEditDialog,
  closeEditDialog,
  tableData,
  dialogVisible,
  form,
  formLabelWidth,
  cancelAddGoods,
  annotation,
  imgColumn
} = useOnlineStockManager()
</script>

<template>
  <div class="wrapper">
    <div class="btn">
      <ButtonWithLoading
        :text="'商品を追加'"
        :click-method="openEditDialog"
        :custom-style="'width:20vw;height:auto;'"
        class="btn"
      />
      <!-- :is-loading="isLoading" -->
    </div>
    <div class="table-wrapper">
      <el-table :data="tableData" style="width: 100%" ref="table">
        <el-table-column fixed prop="name" label="商品名" />
        <el-table-column prop="price" label="値段" />
        <!-- <el-table-column prop="image_url" label="画像" ref="imgColumn" /> -->
        <el-table-column prop="stock" label="残り在庫数" />
        <el-table-column prop="ordersNum" label="注文数" />
        <el-table-column prop="deliveredNum" label="受渡し済み数" />
        <el-table-column prop="notDeliveredNum" label="未受け渡し数" />
        <!-- <el-table-column fixed="right" label="">
          <template #default>
            <el-button link type="primary" size="small" @click="() => false"
              >編集</el-button
            >
            <el-button link type="primary" size="small">削除</el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
    <div class="dialog">
      <el-dialog
        v-model="dialogVisible"
        title="在庫管理: 商品を追加"
        :before-close="cancelAddGoods"
      >
        <el-form :model="form">
          <el-form-item label="商品名" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off" />
            <span v-if="annotation.name" class="required-annotation"
              >required</span
            >
          </el-form-item>
          <el-form-item label="値段" :label-width="formLabelWidth">
            <el-input v-model="form.price" autocomplete="off" type="number" />
            <span v-if="annotation.price" class="required-annotation"
              >required</span
            >
          </el-form-item>
          <el-form-item label="画像URL" :label-width="formLabelWidth">
            <el-input v-model="form.image_url" autocomplete="off" />
            <span v-if="annotation.image_url" class="required-annotation"
              >required</span
            >
          </el-form-item>
          <el-form-item
            v-if="form.online_stock"
            label="在庫数"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="form.online_stock.stock_quantity"
              autocomplete="off"
              type="number"
            />
            <span v-if="annotation.online_stock" class="required-annotation"
              >required</span
            >
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="white" @click="cancelAddGoods"
              >キャンセル</el-button
            >
          </span>
          <span class="dialog-footer">
            <el-button type="primary" @click="closeEditDialog">追加</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  margin-top: 1rem;
}
.btn {
  display: flex;
  justify-content: center;
  margin-left: auto;
  margin-right: 2vw;
}
.dialog-footer {
  margin-left: 1%;
  margin-right: 1%;
}
.required-annotation {
  color: red;
}
</style>
