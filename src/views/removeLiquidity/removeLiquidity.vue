<template>
  <div id="remove-liquidity" class="remove-liquidity">
    <div class="inner-wrap">
      <div class="content fir">
        <div class="title">
          <img class="icon" :src="require('@/themes/images/common/telegram@2x.png')" alt="" />
          <div class="txt">Remove Liquidity</div>
        </div>
        <div class="per-container">
          <div class="top-container">
            <div class="current-value">
              <div class="value">{{ slideValue }}</div>
              <div class="percent">%</div>
            </div>
            <div class="slider-outer">
              <!-- <div class="slider-container">
                <div class="track" ref="track" @mousedown="slideStart" @mouseup="slideEnd">
                  <div class="process" ref="process" :style="{width: process + '%'}"></div>
                  <div class="block" ref="block" @mousemove="pcMove" :style="{left: process + '%'}">
                    <div class="block-inner"></div>
                  </div>
                </div>
              </div> -->
              <el-slider
                v-model="slideValue"
                :show-tooltip="false"
                @change="sliderChange"
                @input="sliderInput"
              ></el-slider>
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
            <div class="mode-item" :class="mode == '100' ? 'active' : ''" @click="modeClick(100)">MAX</div>
          </div>
        </div>
      </div>
      <div class="content sec">
        <div class="info-container">
          <div class="info-item">
            <div class="icon-txt">
              <img class="icon" :src="require('@/themes/images/common/telegram@2x.png')" alt="" />
              <div class="key">TSN</div>
            </div>
            <div class="value">280.10330109140338069</div>
          </div>
          <div class="info-item">
            <div class="icon-txt">
              <img class="icon" :src="require('@/themes/images/common/telegram@2x.png')" alt="" />
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
import { IsPc } from '@/utils/index'
export default {
  name: 'RemoveLiquidity',
  data() {
    return {
      mode: 25,
      showDepositWithdraw: true,
      collapse: true,
      slideValue: 0,
      // 滑动器变量
      // trackWidth: 0,
      // trackLeft: 0,
      // startLeft: 0,
      // process: 0,
      // drag: false
    }
  },
  methods: {
    depositWithdrawClose() {
      this.showDepositWithdraw = false
    },
    modeClick(value){
      this.mode = value;
      this.slideValue = value;
    },
    // 松手后触发
    sliderChange(value) {

    },
    // 滑动触发
    sliderInput(value) {
      // 滑动式添加按钮激活样式
      // this.mode = value
    }
    // slideStart(e) {
    //   this.drag = true;
    //   // console.log(this.$refs.track.getBoundingClientRect());
    //   this.startLeft = e.clientX;
    //   this.trackLeft = this.$refs.track.getBoundingClientRect().left;
    //   this.trackWidth = this.$refs.track.getBoundingClientRect().width;
    //   let process = Math.round((this.startLeft - this.trackLeft) / this.trackWidth * 100);
    //   process = process < 0 ? 0 : process > 100 ? 100 : process;
    //   this.process = process;
    // },
    // pcMove(e) {
    //   if (!IsPc()) return;
    //   console.log(e)
    //   let currentLeft = e.clientX;

    //   this.process = Math.round((currentLeft - this.trackLeft) / this.trackWidth * 100);

    // },
    // slideEnd() {
      // this.drag = false;
      // console.log(arguments)
    // }
  }
}
</script>
<style lang="less">
@import '@/themes/style/button.less';
@import '@/themes/style/removeLiquidity.less';
</style>
