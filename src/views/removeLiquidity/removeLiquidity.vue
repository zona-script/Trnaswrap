<template>
  <div id="remove-liquidity" class="remove-liquidity">
    <div class="inner-wrap">
      <div class="content fir">
        <div class="title">Remove Liquidity</div>
        <div class="per-container">
          <div class="top-container">
            <div class="current-value">
              <div class="value">25</div>
              <div class="percent">%</div>
            </div>
            <div class="slider-outer">
              <div class="slider-container">
                <div class="track">
                  <div class="process"></div>
                  <div class="block">
                    <div class="block-inner"></div>
                  </div>
                </div>
              </div>
              <div class="scale">
                <span class="calibration"></span>
                <span class="calibration"></span>
                <span class="calibration"></span>
                <span class="calibration"></span>
                <span class="calibration"></span>
              </div>
            </div>
          </div>
          <div class="mode">
            <div class="mode-item">25%</div>
            <div class="mode-item">50%</div>
            <div class="mode-item">75%</div>
            <div class="mode-item">MAX</div>
          </div>
        </div>
      </div>
      <div class="content sec">
        <div class="info-container">
          <div class="info-item">
            <div class="icon-txt">
              <img class="icon" :src="require('@/themes/images/common/telegram@2x.png')" alt="">
              <div class="key">TSN</div>
            </div>
            <div class="value">280.10330109140338069</div>
          </div>
          <div class="info-item">
            <div class="icon-txt">
              <img class="icon" :src="require('@/themes/images/common/telegram@2x.png')" alt="">
              <div class="key">USDT</div>
            </div>
            <div class="value">560.0002278838844638</div>
          </div>
        </div>
        <el-button :loading="false" class="btn confirm">Select</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'RemoveLiquidity',
  data() {
    return {
      showDepositWithdraw: true,
      collapse: true
    }
  },
  methods: {
    collapseFunc() {
      this.collapse = !this.collapse
    },
    depositWithdrawClose() {
      console.log('test')
      this.showDepositWithdraw = false
    }
  }
}
</script>
<style lang="less">
@import '@/themes/style/button.less';
@import '@/themes/style/removeLiquidity.less';
</style>
