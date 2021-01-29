<template>
  <div id="pool" class="pool">
    <!-- <headTitle></headTitle> -->
    <div class="content-wrap">
      <div class="background"></div>
      <div class="title">Pool</div>
      <div class="pannel-info pd">
        <div class="headline mt50">Pool</div>
        <div class="title mt50">Liquidity provider rewards</div>
        <p class="desc min-height-304 desct-mt">
          Liquidity providers can obtain fee income from the liquidity pools they participate in;The fee income is ’
          distributed according to the proportion of liquidity providers liquidity funds The allocated fees are added to
          the corresponding pool in real time, and the liquidity provider can withdraw as required
        </p>
        <div class="rect">Connect to a wallet to view your liquidity.</div>
        <div class="btn-box">
          <el-button :loading="false"  class="btn create">Greate a Pair</el-button>
          <el-button :loading="false"  class="btn add mt10">Add Liquidity</el-button>
        </div>
        <a class="btn-link" href="#">Connect to a wallet</a>
      </div>
      <div class="pannel-info">
        <div class="tb-head" @click="collapseFunc">
          <span class="arrow down"></span>
          <div class="info-wrap">
            <img src="@/themes/images/home/a.png" class="img first-img" />
            <img src="@/themes/images/home/b.png" class="img second-img" />
            <span class="title">AI/OPC</span>
          </div>
        </div>
        <div class="tab-container" :class="collapse ? 'collapse' : ''">
          <div class="item">
            <div class="key">Your tatal pool tokens</div>
            <div class="value">0.00089</div>
          </div>
          <div class="item">
            <div class="key">Pooled DAI</div>
            <div class="value">801.411</div>
          </div>
          <div class="item">
            <div class="key">Pooled OPC</div>
            <div class="value">988.899</div>
          </div>
          <div class="item">
            <div class="key">Your Pool share</div>
            <div class="value">42.79%</div>
          </div>
        </div>
      </div>
      <tool-icon></tool-icon>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Pool',
  data() {
    return {
      collapse: true
    }
  },
  methods: {
    collapseFunc() {
      this.collapse = !this.collapse;
    }
  }
}
</script>
<style lang="less">
@import '@/themes/style/button.less';
@import '@/themes/style/pannel.less';
@import '@/themes/style/pool.less';
</style>
