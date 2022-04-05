<template>
  <div class="car-section">
    <div class="car-content">
      <!-- 车牌输入框 -->
      <div
        class="car-num-item"
        :class="{active: focusIndex === index}"
        v-for="(item, index) in carNumArr"
        :key="index"
        @click="focusInput(item, index)">
        <span v-if="index === 7 && !item" class="car-num-last">新能源</span>
        <span v-else>{{item}}</span>
      </div>
    </div>

    <!-- 键盘 -->
    <div class="keyboard" v-if="isShowArea || isShowNum">
      <div class="keyboard-top">
        <span class="btn-complete" @click="complete">完成</span>
      </div>
      <!-- 地区 -->
      <div class="keyboard-box" v-if="isShowArea">
        <div
          class="keyboard-row"
          v-for="(row, rowIndex) in areaText"
          :key="rowIndex">
          <div
            class="keyboard-item"
            v-for="(item, index) in row"
            :key="index"
            @click="clickKeyboard(item)">
            {{item}}
          </div>
          <template v-if="rowIndex === areaText.length - 1">
            <div class="keyboard-item no-item"></div>
            <div class="keyboard-item no-item"></div>
            <div class="keyboard-item delete-item" @click="deleteInput">X</div>
          </template>
        </div>
      </div>
      <!-- 数字 -->
      <div class="keyboard-box keyboard-num-box" v-if="isShowNum">
        <div
          class="keyboard-row keyboard-num-row"
          v-for="(row, rowIndex) in carNum"
          :key="rowIndex">
          <div
            class="keyboard-item car-num-item"
            :class="{disabled: focusIndex !== 6 && (((rowIndex === 1 || rowIndex === 2) && index === 9) || (rowIndex === 3 && (index === 7 || index === 8)))}"
            v-for="(item, index) in row"
            :key="index"
            @click="clickKeyboard(item, rowIndex, index)">
            {{item}}
          </div>
          <template v-if="rowIndex === carNum.length - 1">
            <div class="keyboard-item car-num-item delete-item" @click="deleteInput">X</div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const arrLength = 7
export default {
  data() {
    return {
      carNumArr: [],
      areaText: [
        ['京', '津','翼', '晋', '蒙', '沪','苏', '皖','浙'],
        ['闽', '鲁','粤', '桂', '琼', '赣','豫', '鄂','湘'],
        ['陕', '甘','青', '宁', '新', '川','云', '贵','渝'],
        ['藏', '辽','吉', '黑', '使', '无']
      ],
      carNum: [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'O', 'P', '港'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '澳'],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '学', '领'],
      ],
      focusIndex: null,
    }
  },
  computed: {
    isShowArea() {
      return this.focusIndex === 0
    },
    isShowNum() {
      return this.focusIndex > 0
    },
  },
  mounted() {
    this.carNumArr = []
    for (let i = 0; i < 8; i++) {
      this.carNumArr.push('')
    }
  },
  methods: {
    // 判断是否限制位
    isLimited(rowIndex, index) {
      if ([1, 2].includes(rowIndex)) {
        return index === 9
      } else if (rowIndex === 3) {
        return (index === 7 || index === 8)
      }
      return false
    },

    focusInput(item, index) {
      // 第六位没输入不聚焦
      if (index === arrLength && !this.carNumArr[6]) return
      // 如果第六位选择限制输入的不聚焦
      if (this.isInputLimited()) return
      this.focusIndex = index
    },

    // 判断是否有限制输入
    isInputLimited() {
      const val = this.carNumArr[6]
      return ['港', '澳', '学', '领'].includes(val)
    },

    clickKeyboard(val, rowIndex, index) {
      if (this.isLimited(rowIndex, index) && this.focusIndex !== 6) return

      this.setNum(this.focusIndex, val)

      // 如果超出不聚焦下一个
      if (this.focusIndex === arrLength) return
      // 如果第六位选择限制输入的不聚焦下一个
      if (this.focusIndex === 6 && this.isInputLimited()) return

      this.focusIndex += 1
    },

    // 删除输入
    deleteInput() {
      const curInput = this.carNumArr[this.focusIndex]
      if (curInput) {
        this.setNum(this.focusIndex, '')
      } else {
        this.setNum(this.focusIndex - 1, '')
        this.focusIndex -= 1
      }
    },

    // 输入
    setNum(index, val) {
      this.$set(this.carNumArr, index, val)
      this.$emit('getCarNum', this.carNumArr)
    },

    complete() {
      this.focusIndex = null
    }
  }
}
</script>

<style lang="scss" scoped>
.car-section {
  width: 100%;
  box-sizing: border-box;
  .car-content {
    width: 100%;
    box-sizing: border-box;
    padding: 0 30rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .car-num-item {
      position: relative;
      width: 65rpx;
      height: 120rpx;
      text-align: center;
      padding: 0 10rpx 10rpx;
      box-sizing: border-box;
      background: #fff;
      color: #4d5da8;
      font-size: 32rpx;
      font-weight: bold;
      border-radius: 10rpx;
      box-shadow: 2rpx 2rpx 5rpx #6f7cb9;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      &.active::after {
        position: absolute;
        bottom: 10rpx;
        left: 50%;
        transform: translateX(-50%);
        width: 35rpx;
        height: 4rpx;
        background: #4d5da8;
        content: '';
        display: block;
        animation: Blink 1s ease-in 0s infinite;
      }

      @keyframes Blink {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }

      .car-num-last {
        font-size: 24rpx;
      }
    }
  }

  .keyboard {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #d0d4da;

    .keyboard-top {
      width: 100%;
      height: 65rpx;
      background: #fff;
      text-align: right;
      .btn-complete {
        color: rgba(34, 99, 231, 0.8);
        font-size: 24rpx;
        padding-right: 20rpx;
      }
    }

    .keyboard-box {
      width: 100%;
      height: 380rpx;
      padding: 20rpx 8rpx 20rpx;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .keyboard-row {
        display: flex;
        /* margin-top: 20rpx; */
        padding: 0 12rpx;
        justify-content: space-between;
        .keyboard-item {
          width: 60rpx;
          flex-shrink: 0;
          height: 75rpx;
          line-height: 75rpx;
          text-align: center;
          /* margin: 0 12rpx; */
          background: #fff;
          border-radius: 8rpx;
          color: #000;
          font-size: 32rpx;
          &:active {
            background: #6a6f75;
          }
        }
        .no-item {
          background: #d0d4da;
        }
        .delete-item {
          background: #a3a9b3;
        }

        .disabled {
          color: #ccccd2;

          &.disabled:active {
            background: #fff;
          }
        }
      }
    }

    .keyboard-num-box {
      padding: 10rpx 5rpx 20rpx;

      .keyboard-num-row {
        margin-top: 15rpx;
        .car-num-item {
          width: 60rpx;
        }
      }
    }
  }
}
</style>