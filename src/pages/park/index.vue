<template>
  <div class="page">
    <div class="content" :class="{'filter' : isShowDialog}">
      <img class="icon-park" src="../../static/images/icon-park.svg">
      <div class="page-title">输入车牌</div>

      <div class="input-panel">
        <CarInput @getCarNum="getCarNum" ref="carInput" />
      </div>

      <div class="button" :class="{disabled: !isValid}" @click="confirm">确认</div>
    </div>

    <Dialog
      :visible.sync="isShowDialog"
      :has-slot.sync="isShowSlot"
      :tipText="tipText">
      <div class="dialog-btn" v-if="isShowSlot" @click="reset">重新输入</div>
    </Dialog>
  </div>
</template>

<script>
import Dialog from "@/components/Dialog"
import CarInput from "@/components/CarInput"

export default {
  components: {
    Dialog,
    CarInput,
  },
  data() {
    return {
      tipText: '未满足优惠条件，无法减免',
      btnText: '重新输入',
      isShowDialog: false,
      isShowSlot: false,
      carNumArr: [],
      params: {},
      parkInfo: {},
    }
  },

  onShow() {
	},

  onLoad(option) {
    this.params = option
    // this.getParkInfo()
  },

  computed: {
    isValid() {
      return this.checkValidNum()
    },
    carNo() {
      let arr = [...this.carNumArr]
      arr.splice(1, 0, '-')
      let str = arr.join('')
      return str
    }
  },

  methods: {
    getParkInfo() {
      this.$http.park.getParkInfo({
        data: {pNo: this.carNo, ...this.params},
        success: res => {
          this.parkInfo = res
          if (res.retcode != 0) {
            return this.showDialog('查无车辆场内记录，请重新输入', '重新输入')
          } else if (res.tradeStatus > -1) {
            return this.showDialog('消费凭证优惠已被使用，无法减免')
          } else if (res.discountFee <= 0) {
            this.showDialog('未满足优惠条件，无法减免')
          }
          let params = window.location.hash.split('?')[1] ? '?' + window.location.hash.split('?')[1] : ''
          uni.navigateTo({
            url: `/pages/park/info${params}&pNo=${this.carNo}`
          })
        },
        fail: err => {

        }
      })
    },
    getCarNum(numArr) {
      this.carNumArr = numArr
    },
    checkValidNum() {
      let flag = this.carNumArr.length
      for (let i = 0; i < this.carNumArr.length; i++) {
        if (i < this.carNumArr.length - 1) {
          const item = this.carNumArr[i]
          if (item === '') {
            flag = false
            return
          }
        }
      }
      return flag
    },
    showDialog(tipText, btnText) {
      this.isShowDialog = true
      this.tipText = tipText
      this.btnText = btnText
      this.isShowSlot = !!btnText
    },
    reset() {
      this.isShowDialog = false
      this.isShowSlot = false
    },
    confirm() {
      if (!this.checkValidNum()) return
      this.$refs.carInput.focusIndex = null
      this.getParkInfo()
    }
  },
}
</script>

<style>
.dialog-btn {
  margin-top: 80rpx;
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
    display: flex;
    justify-content: center;
    align-items: center;
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
  .disabled {
    background: #b4cbeb;
  }
}
</style>