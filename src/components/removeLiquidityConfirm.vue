<template>
  <div class="remove-liquidity-confirm" v-show="isShow">
    <div class="mantle" @click="close"></div>
    <div class="container">
      <div class="title-pop">
        <div class="txt">You will recevive</div>
        <img class="close" :src="require('@/themes/images/common/close.png')" @click="close" />
      </div>
      <div class="container-inner">
        <div class="info-container">
          <div class="info-item">
            <div class="icon-txt">
              <img class="icon" :src="require('@/themes/images/common/token_04_2x.png')" />
              <div class="txt">TSN</div>
            </div>
            <div class="value">280.10330109140338069</div>
          </div>
          <div class="info-item">
            <div class="icon-txt">
              <img class="icon" :src="require('@/themes/images/common/token_04_2x.png')" />
              <div class="txt">USDT</div>
            </div>
            <div class="value">560.0002278838844638</div>
          </div>
        </div>
        <div class="illustration">Output is estimated. If the price change by more than 0.5% your transaction will revert.</div>
        <div class="title-price">Price</div>
        <div class="info-container">
          <div class="info-item">
            <div class="icon-txt">
              <div class="txt">1 TNS =</div>
            </div>
            <div class="value">
              <div class="txt">0.501689</div>
              <div class="unit">USDT</div>
            </div>
          </div>
          <div class="info-item">
            <div class="icon-txt">
              <div class="txt">1 USDT =</div>
            </div>
            <div class="value">
              <div class="txt">2.005279</div>
              <div class="unit">TNS</div>
            </div>
          </div>
        </div>
        <el-button :loading="false" class="btn confirm">Confirm</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RemoveLiquidityConfirm',
  props: {
    show: {
      default: true
    }
  },
  data() {
    return {
      isShow: this.show
    }
  },
  watch: {
    show(newVal) {
      this.isShow = newVal
    }
  },
  methods: {
    close() {
      this.$emit('close', false)
    }
  },
  mounted() {}
}
</script>

<style lang="less">
@import '../themes/style/removeLiquidityConfirm.less';
</style>
