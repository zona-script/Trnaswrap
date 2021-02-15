<template>
  <div id="trading-pair" class="trading-pair">
    <div class="wraper">
      <div class="input-wraper">
        <div class="input-container">
          <input type="text">
        </div>
        <div class="search"></div>
      </div>
      <div class="pair">
        <div class="fir">
          <div class="title">
            <img src="" alt="">
            <div class="text"></div>
          </div>
          <div class="info-container">
            <div class="info-item">
              <div class="icon-txt">
                <img src="" alt="">
                <div class="txt"></div>
              </div>
              <div class="value"></div>
            </div>
          </div>
        </div>
        <div class="btn-container">
          <el-button :loading="charm.btnLoading1" :disabled="btndisable()" @click="confirmSupply" class="btn add">Supply</el-button>
          <el-button :loading="charm.btnLoading1" :disabled="btndisable()" @click="confirmSupply" class="btn add">Supply</el-button>
        </div>
      </div>
      <div class="first-title"></div>
      <div class="pair-data">
        <div class="fir">
          <div class="liquidity">
            <div class="detail">
              <div class="key"></div>
              <div class="value"></div>
            </div>
            <div class="data"></div>
          </div>
          <div class="token">
            <div class="detail">
              <div class="key"></div>
              <div class="value"></div>
            </div>
            <div class="info-container">
              <div class="info-item">
                <div class="icon-txt">
                  <img src="" alt="">
                  <div class="txt"></div>
                </div>
                <div class="value"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="chart-container">
          <div class="title-con">
            <div class="title-txt"></div>
            <div class="tab-con">
              <div class="tab"></div>
              <div class="tab"></div>
            </div>
          </div>
          <div class="chart-wrap"></div>
        </div>
      </div>
      <div class="first-title"></div>
      <div class="transactions">
        <div class="tab-outer">
          <div class="tab-con">
            <div class="tab"></div>
            <div class="tab"></div>
            <div class="tab"></div>
          </div>
          <div class="toggle">
            <div class="pre"></div>
            <div class="next"></div>
          </div>
        </div>
        <div class="table-container"></div>
      </div>
      <div class="first-title"></div>
      <div class="information">
        <div class="box-shadow">
          <div class="title"></div>
          <div class="value"></div>
        </div>
        <div class="box-shadow">
          <div class="title"></div>
          <div class="value"></div>
          <div class="copy-btn"></div>
        </div>
        <div class="box-shadow">
          <div class="title"></div>
          <div class="value"></div>
          <div class="copy-btn"></div>
        </div>
        <div class="box-shadow">
          <div class="title"></div>
          <el-button :loading="charm.btnLoading1" :disabled="btndisable()" @click="confirmSupply" class="btn add">Supply</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Pool',
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>
<style lang="less">
@import '@/themes/style/tradingPair.less';
</style>
