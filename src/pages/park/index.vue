<template>
  <div class="page">
    <div :class="{'filter' : isShowDialog}">
      <img class="icon-park" src="../../static/images/icon-park.svg">
      <div class="page-title">输入车牌</div>

      <div class="input-panel">

      </div>

      <div class="button" @click="confirm">确认</div>
    </div>

    <Dialog
      :visible.sync="isShowDialog"
      :has-slot.sync="isShowSlot"
      :tipText="tipText">
      <div class="dialog-btn" v-if="isShowSlot">重新输入</div>
    </Dialog>
  </div>
</template>

<script>
import Dialog from "@/components/Dialog"

export default {
  components: {
    Dialog,
  },
  data() {
    return {
      tipText: '未满足优惠条件，无法减免',
      isShowDialog: true,
      isShowSlot: false
    }
  },

  onShow() {
	},

  methods: {
    confirm() {
      // this.isShowDialog = true
      uni.navigateTo({
        url: '/pages/park/info'
      })
    }
  },
}
</script>

<style>
.dialog-btn {
  margin-top: 120rpx;
  width: 450rpx;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  border-radius: 40rpx;
  background: #4d5da8;
  color: #fff;
  font-size: 28rpx;
  font-weight: bold;
}
</style>

<style lang="scss">
.page {
  background: #dbe2ef;
  width: 100%;
  height: 100%;

  .icon-park {
    margin: 0 auto ;
    display: block;
    padding-top: 130rpx;
    width: 120rpx;
  }

  .page-title {
    margin-top: 20rpx;
    color: #4d5da8;
    font-weight: bold;
    font-size: 32rpx;
    text-align: center;
  }

  .input-panel {
    margin: 150rpx auto 0;
    width: 710rpx;
    height: 260rpx;
    background: #4d5da8;
    border-radius: 40rpx;
  }

  .button {
    width: 600rpx;
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    font-size: 26rpx;
    color: #fff;
    border-radius: 40rpx;
    background: #4d5da8;
    margin: 250rpx auto 0;
  }
}
</style>