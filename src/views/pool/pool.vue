<template>
 <div>
   <Menu :show="menuShow" @menu-close="menuClose"></Menu>
  <div id="pool" class="pool">
    <headTitle @menu-click="menuClick"></headTitle>
    <div class="content">
      <div class="background"></div>
      <div class="title">Pool</div>
      <div class="pannel-info pd">
        <div class="title mt50">Liquidity provider rewards</div>
        <p class="desc min-height-304 desct-mt">
          Liquidity providers can obtain fee income from the liquidity pools they participate in;The fee income is ’
          distributed according to the proportion of liquidity providers liquidity funds The allocated fees are added to
          the corresponding pool in real time, and the liquidity provider can withdraw as required
        </p>
        <div class="rect">Connect to a wallet to view your liquidity.</div>
        <el-button :loading="false"  class="btn create">Greate a Pair</el-button>
        <el-button :loading="false"  class="btn add mt10">Add Liquidity</el-button>
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
    </div>
  </div>
 </div>
</template>
<script>
export default {
  name: 'Pool',
  data() {
    return {
      collapse: true,
      menuShow:false,
    }
  },
  methods: {
    collapseFunc() {
      this.collapse = !this.collapse;
    },
    menuClose() {
      this.menuShow = false
    },
    menuClick(){
      this.menuShow = true
    }
  }
}
</script>
<style lang="less">
@import '@/themes/style/common.less';
@import '@/themes/style/header.less';
@import '@/themes/style/button.less';
@import '@/themes/style/pannel.less';
@import '@/themes/style/pool.less';
</style>
