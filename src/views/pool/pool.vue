<template>
  <div id="pool" class="pool">
    <headTitle></headTitle>
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
        <div class="tb-head">
          <span class="arrow down"></span>
          <div class="info-wrap">
            <img src="@/themes/images/home/a.png" class="img first-img" />
            <img src="@/themes/images/home/b.png" class="img second-img" />
            <span class="title">AI/OPC</span>
          </div>
        </div>
        <div class="tab-container">
          <el-table :data="origanizationData" style="width: 100%" :show-header="false">
            <el-table-column prop="name">
              <template slot-scope="scope">
                <div class="organization-name">{{ scope.row.name }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="value" align="right">
              <template slot-scope="scope">
                <div class="organization-value">{{ scope.row.value }}</div>
              </template>
            </el-table-column>
          </el-table>
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
      origanizationData: [
        {
          name: 'Your tatal pool tokens',
          value: '0.00089'
        },
        {
          name: 'Pooled DAI',
          value: '801.411'
        },
        {
          name: 'Pooled OPC',
          value: '988.899'
        },
        {
          name: 'Your Pool share',
          value: '42.79%'
        }
      ]
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
