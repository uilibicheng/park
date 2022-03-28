<template>
  <transition name="fade">
    <div class="dialog-wrap" v-if="visible">
      <div class="mask"></div>
      <div class="dialog">
        <img class="icon-tip" src="../static/images/icon-tip.svg" alt="">
        <span v-if="tipText">{{tipText}}</span>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    hasSlot: {
      type: Boolean,
      default: false
    },
    tipText: {
      type: String,
      default: ''
    }
  },

  watch: {
    visible: {
      handler(value) {
        console.log('value', value, this.hasSlot)
        if (value && !this.hasSlot) {
          let timer = setTimeout(() => {
            this.$emit('update:visible', false)
            console.log(3333, this.visible)
            // this.$emit('update:hasSlot', false)
            clearTimeout(timer)
            timer = null
          }, 2000)
        }
      },
      immediate: true,
    },
    // visible(value) {
    //   console.log('value', value)
    // }
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.dialog-wrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);

  /* .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    filter: blur(750rpx);
  } */

  .dialog {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600rpx;
    padding: 65rpx 40rpx;
    border-radius: 30rpx;
    background: #ffffff;
    color: #4d5da8;
    font-size: 32rpx;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 99;

    .icon-tip {
      width: 60rpx;
      height: 60rpx;
      margin-bottom: 35rpx;
    }
  }
}
</style>