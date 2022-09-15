<script setup lang="ts">
import GoodsCardForReceiveView from '@/components/GoodsCardForReceiveView.vue'
import ButtonWithLoading from '@/components/ButtonWithLoading.vue'
import { ONLINE_RECEIVED_VIEW } from '../../../modules/register/constant'
import { useReceiptConfirm } from '../../../modules/register/online/viewModels/confirm'
import AnnotationDialog from '../../../components/AnnotationDialog.vue'

const {
  purchaseId,
  userData,
  goodsInfo,
  isReceivedItems,
  isReadyToDone,
  isLoading,
  done,
  alreadyHasReceipt,
  backToQrReader
} = useReceiptConfirm()
</script>

<template>
  <div class="title">
    <h1>{{ ONLINE_RECEIVED_VIEW.TITLE }}</h1>
  </div>
  <div class="description">
    <ul>
      <li v-for="item in ONLINE_RECEIVED_VIEW.DESCRIPTION_POINTS">
        {{ item }}
      </li>
    </ul>
  </div>
  <!-- <div class="wrapper"> -->
  <div class="user-infos">
    <div class="table">
      <table>
        <tr v-for="item in userData">
          <td>{{ item.label }}</td>
          <td>{{ item.data }}</td>
        </tr>
      </table>
    </div>
  </div>
  <div class="goods-info">
    <span v-for="(item, index) in goodsInfo">
      <GoodsCardForReceiveView
        :item="item"
        :style="'width: 100%;'"
        class="each-goods"
        v-model="isReceivedItems[index].isReceived"
      />
    </span>
    <div class="btn">
      <ButtonWithLoading
        :text="'受け取り完了'"
        :click-method="done"
        :custom-style="
          isReadyToDone
            ? 'width: 25vw;height: 5vh;'
            : 'width: 25vw;height: 5vh;background-color:gray;'
        "
        :is-loading="isLoading"
      />
    </div>
  </div>
  <AnnotationDialog
    :dialog-visible="alreadyHasReceipt"
    :handle-close="backToQrReader"
    :cancel="backToQrReader"
    :title="'すでに受け取り済みのユーザーです。'"
    :continue-btn-text="'戻る'"
  />
  <!-- </div> -->
</template>
<style scoped>
.wrapper,
.user-infos,
.title,
.description,
.goods-infos {
  display: flex;
  align-items: center;
}
.wrapper {
  justify-content: space-between;
}
.user-infos,
.goods-infos,
.title,
.description {
  justify-content: center;
}
.title,
.description {
  margin-top: 1%;
  margin-bottom: 1%;
}
.user-infos {
  /* width: 35vw; */
  /* align-items: flex-start; */
  /* justify-items: start; */
}
.table {
  /* margin-bottom: auto; */
  overflow-wrap: break-word;
}
.goods-infos {
  width: 100%;
}
.each-goods {
}
table {
  border-collapse: collapse;
  text-align: center;
}
th,
td {
  padding: 5px;
  /* border: 1px solid #333; */
  overflow-wrap: break-word;
}

.btn {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}
</style>
