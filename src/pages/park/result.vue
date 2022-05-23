<template>
  <div class="result" v-if="!isLoading">
    <img v-if="payType === 0" class="icon-status" src="../../static/images/icon-success.svg" alt="">
    <img v-else class="icon-status" src="../../static/images/icon-fail.svg" alt="">
    
    <div class="result-text">{{result}}</div>
    <div class="result-text">{{resultTip}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      payType: 1, // 0:成功 1：失败 2：未支付
      result: '支付成功',
      resultTip: '祝您购物愉快',
      params: {},
      isLoading: true,
      orderInfo: {}
    }
  },
  watch: {
    payType: {
      handler(val) {
        if (val === 0) {
          this.result = '支付成功'
          this.resultTip = '祝您购物愉快'
        } else {
          this.result = '支付失败'
          this.resultTip = '请重新扫描二维码支付'
        }
      },
      immediate: true
    }
  },

  onLoad(option) {
    this.params = option
    this.getOrderInfo()
  },

  methods: {
    getOrderInfo() {
      this.$http.park.getOrderInfo({
        data: this.params,
        success: res => {
          console.log('res', res)
          this.orderInfo = res && res.length ? res[0] : {}
          this.payType = res && res.length ? res[0].status : 1
        },
        fail: err => {

        },
        complete: () => {
          this.isLoading = false
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.result {
  padding-top: 160rpx;
  height: 100vh;
  box-sizing: border-box;
  background: #dbe2ef;
  .icon-status {
    width: 280rpx;
    height: 280rpx;
    margin: 0 auto 200rpx;
    display: block;
  }
  .result-text {
    font-size: 42rpx;
    color: #4d5da8;
    margin-bottom: 60rpx;
    text-align: center;
  }
}
</style>