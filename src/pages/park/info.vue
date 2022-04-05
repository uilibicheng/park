<template>
  <div class="page" v-if="!isLoading">
    <div class="content" :class="{'filter' : isShowDialog}">
      <img class="icon-park" src="../../static/images/icon-park.svg">
      <div class="page-title">停车信息</div>

      <div class="info-box">
        <div class="info-box-title">停车订单信息</div>
        <div class="info-list">
          <div class="info-item">
            <div class="info-item-label">超市购物单：</div>
            <div class="info-item-value">{{params.orderNo}}</div>
          </div>
          <div class="info-item">
            <div class="info-item-label">停车场：</div>
            <div class="info-item-value">{{parkInfo.parkName}}</div>
          </div>
          <div class="info-item">
            <div class="info-item-label">入场时间：</div>
            <div class="info-item-value">{{parkInfo.startTime}}</div>
          </div>
          <div class="info-item">
            <div class="info-item-label">车牌号码</div>
            <div class="info-item-value">{{parkInfo.carNo}}</div>
          </div>
          <div class="info-item">
            <div class="info-item-label">计费时长：</div>
            <div class="info-item-value">{{parkInfo.serviceTime | serviceTime}}分钟</div>
          </div>
          <div class="info-item">
            <div class="info-item-label">停车费：</div>
            <div class="info-item-value">￥{{parkInfo.serviceFee}}</div>
          </div>
        </div>
        <div class="info-item infp-active-item">
          <div class="info-item-label">应付：</div>
          <div class="info-item-value">￥{{parkInfo.serviceFee}}</div>
        </div>
      </div>


      <div class="button" @click="confirm">立即优惠出场</div>
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
      isShowDialog: false,
      isShowSlot: false,
      params: {},
      parkInfo: {},
      isLoading: true,
    }
  },

  onLoad(option) {
    console.log('option', option)
    this.params = option
    this.getParkInfo()
  },

  filters: {
    serviceTime(time) {
      return time ? Math.ceil(time / 60) : 0
    }
  },

  methods: {
    getParkInfo() {
      this.$http.park.getParkInfo({
        data: this.params,
        success: res => {
          console.log('res', res)
          this.parkInfo = res
        },
        fail: err => {

        },
        complete: () => {
          this.isLoading = false
        }
      })
    },
    confirm() {
      console.log(33333)
      let params = window.location.hash.split('?')[1] ? '?' + window.location.hash.split('?')[1] : ''
      uni.navigateTo({
        url: `/pages/park/discount-info${params}`
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
      overflow: hidden;
    }
    .info-item-label {
      flex-shrink: 0;
    }
    .info-item-value {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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