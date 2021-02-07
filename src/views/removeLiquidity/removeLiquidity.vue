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
                <div class="track" ref="track" @mousedown="slideStart" @mousemove="slideMove" @mouseup="slideEnd">
                  <div class="process" ref="track"></div>
                  <div class="block" ref="block">
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
            <div class="mode-item" :class="mode == '25' ? 'active' : ''" @click="modeClick(25)">25%</div>
            <div class="mode-item" :class="mode == '50' ? 'active' : ''" @click="modeClick(50)">50%</div>
            <div class="mode-item" :class="mode == '75' ? 'active' : ''" @click="modeClick(75)">75%</div>
            <div class="mode-item" :class="mode == 'max' ? 'active' : ''" @click="modeClick('max')">MAX</div>
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
      mode: 25,
      showDepositWithdraw: true,
      collapse: true,
      // 滑动器变量
      trackWidth: 0,
      trackLeft: 0,
      startLeft: 0,
    }
  },
  methods: {
    collapseFunc() {
      this.collapse = !this.collapse
    },
    depositWithdrawClose() {
      console.log('test')
      this.showDepositWithdraw = false
    },
    modeClick(value){
      this.mode = value;
    },
    slideStart(e) {
      // console.log(this.$refs.track.getBoundingClientRect());
      this.startLeft = e.clientX;
      this.trackLeft = this.$refs.track.getBoundingClientRect().left;
      this.trackWidth = this.$refs.track.getBoundingClientRect().width;

    },
    slideMove() {
      console.log(arguments)
    },
    slideEnd() {
      console.log(arguments)
    }
  }
}
</script>
<style lang="less">
@import '@/themes/style/button.less';
@import '@/themes/style/removeLiquidity.less';
</style>
