<template>
  <div id="farm" class="farm">
    <deposit-withdraw :show="showDepositWithdraw" @close="depositWithdrawClose"></deposit-withdraw>
    <div class="farm-content-1">
      <div class="tns-pool">
        <img :src="require('@/themes/images/menu/image_02.png')" alt="" />
        <div class="txt">TNS Pool</div>
      </div>
      <div class="tns-pool-con">
        <div class="pool-info">
          <div class="info-item important">
            <div class="key">Locked position</div>
            <div class="value">
              <div class="num">100</div>
              <div class="unit">TNS</div>
            </div>
          </div>
          <div class="info-item">
            <div class="key">balance</div>
            <div class="value">
              <div class="num">200</div>
              <div class="unit">TNS</div>
            </div>
          </div>
          <div class="info-item">
            <div class="key">APY</div>
            <div class="value">
              <div class="num">200</div>
              <div class="percent">%</div>
            </div>
          </div>
        </div>
        <el-button :loading="false" class="btn confirm">Select</el-button>
      </div>
    </div>
    <div class="farm-content-2">
      <div class="statistics-title">statistics</div>
      <div class="pool-info">
        <div class="info-item">
          <div class="key">Total number of TNS deposited</div>
          <div class="value">0.00%</div>
        </div>
        <div class="info-item">
          <div class="key">Total amount of TNS withdrawn</div>
          <div class="value">0.00%</div>
        </div>
        <div class="info-item">
          <div class="key">Time Countdown Benefit</div>
          <div class="value">0.00%</div>
        </div>
        <div class="info-item">
          <div class="key">200% income</div>
          <div class="value">0.00%</div>
        </div>
        <div class="info-item">
          <div class="key">Daily income</div>
          <div class="value">0.00%</div>
        </div>
        <div class="info-item">
          <div class="key">Direct revenue</div>
          <div class="value">0.00%</div>
        </div>
        <div class="info-item">
          <div class="key">Team benefits</div>
          <div class="value">0.00%</div>
        </div>
        <div class="info-item">
          <div class="key">Unclaimed income</div>
          <div class="value">0.00%</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Farm',
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
@import '@/themes/style/farm.less';
</style>
