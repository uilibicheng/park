<template>
  <div class="page">
    <div :class="{'filter' : isShowDialog}">
      <img class="icon-park" src="../../static/images/icon-park.svg">
      <div class="page-title">支付出场</div>

      <div class="info-box">
        <div class="info-box-title">优惠出场信息</div>
        <div class="info-list">
          <div class="info-item">
            <div class="info-item-label">超市购物单：</div>
            <div class="info-item-value">31321321321321</div>
          </div>
          <div class="info-item">
            <div class="info-item-label">停车场：</div>
            <div class="info-item-value">xxxxxxxx</div>
          </div>
          <div class="info-item">
            <div class="info-item-label">入场时间：</div>
            <div class="info-item-value">2022.02.24 12:24:30</div>
          </div>
          <div class="info-item">
            <div class="info-item-label">车牌号码</div>
            <div class="info-item-value">xx-xxxxxxx</div>
          </div>
          <div class="info-item">
            <div class="info-item-label">计费时长：</div>
            <div class="info-item-value">xxx分钟</div>
          </div>
          <div class="info-item">
            <div class="info-item-label">停车费：</div>
            <div class="info-item-value">￥xxxx</div>
          </div>
          <div class="info-item">
            <div class="info-item-label">优惠抵扣：</div>
            <div class="info-item-value">￥xxxx</div>
          </div>
        </div>
        <div class="info-item infp-active-item">
          <div class="info-item-label">应付：</div>
          <div class="info-item-value">￥xxxx</div>
        </div>
      </div>


      <div class="button" @click="confirm">前往支付</div>

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
      this.isShowDialog = true
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

<style lang="scss" scoped>
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

  .info-box {
    position: relative;
    margin: 100rpx auto;
    width: 650rpx;
    background: #fff;
    border-radius: 50rpx;
    padding: 80rpx 50rpx 40rpx;
    box-sizing: border-box;

    .info-box-title {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 0 50rpx;
      height: 80rpx;
      line-height: 80rpx;
      background: #4d5da8;
      border-radius: 40rpx;
      color: #fff;
      font-size: 30rpx;
    }

    .info-list {
      border-bottom: 1rpx dashed #4d5da8;
      margin-bottom: 30rpx;
    }

    .info-item {
      font-size: 28rpx;
      color: #000;
      padding-bottom: 30rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .infp-active-item {
      padding-bottom: 0;
      color: #d72323;
    }
  }


  .button {
    width: 600rpx;
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    font-size: 30rpx;
    color: #fff;
    border-radius: 40rpx;
    background: #4d5da8;
    margin: 50rpx auto 0;
  }
}
</style>