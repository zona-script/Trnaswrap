<template>
  <div id="trading-pair" class="trading-pair">
    <div class="wraper">
      <div class="input-wraper box-shadow">
        <div class="input-container">
          <input type="text" placeholder="Search name or paste address"/>
        </div>
        <div class="search">
          <img :src="require('@/themes/images/common/search@2x.png')" alt="" />
        </div>
      </div>
      <div class="pair box-shadow">
        <div class="fir">
          <div class="title">
            <img :src="require('@/themes/images/common/icon03@2x.png')" alt="" />
            <div class="text">USDT / TNS Pair</div>
          </div>
          <div class="info-container">
            <div class="info-item">
              <div class="icon-txt">
                <img :src="require('@/themes/images/common/token_04@2x.png')" alt="" />
                <div class="txt">1USDT=32.3886TNS</div>
              </div>
              <div class="value">（$1.0038）</div>
            </div>
            <div class="info-item">
              <div class="icon-txt">
                <img :src="require('@/themes/images/common/b@2x.png')" alt="" />
                <div class="txt">1TNS=0.0308 USDT</div>
              </div>
              <div class="value">（$0.0309）</div>
            </div>
          </div>
        </div>
        <div class="btn-container">
          <el-button :loading="loading" :disabled="disabledTag" @click="clickBtn" class="btn add"
            >Add Liquidity</el-button
          >
          <el-button :loading="loading" :disabled="disabledTag" @click="clickBtn" class="btn add"
            >Transaction</el-button
          >
        </div>
      </div>
      <div class="first-title">Trading pair data</div>
      <div class="pair-data">
        <div class="fir">
          <div class="liquidity box-shadow">
            <div class="detail">
              <div class="key">Total liquidity</div>
              <div class="value">-0.76%</div>
            </div>
            <div class="data">$42,669,138</div>
          </div>
          <div class="token box-shadow">
            <div class="detail">
              <div class="key">Fund pool token</div>
              <div class="value">+5.92%</div>
            </div>
            <div class="info-container">
              <div class="info-item">
                <div class="icon-txt">
                  <img :src="require('@/themes/images/common/token_04@2x.png')" alt="" />
                  <div class="txt">696,232,732.4502</div>
                </div>
                <div class="value">TNS</div>
              </div>
              <div class="info-item">
                <div class="icon-txt">
                  <img :src="require('@/themes/images/common/b@2x.png')" alt="" />
                  <div class="txt">21,496,163.059</div>
                </div>
                <div class="value">USDT</div>
              </div>
            </div>
          </div>
        </div>
        <div class="chart-container box-shadow">
          <div class="title-con">
            <div class="title-txt">USDT / TNS Candlestick Chart</div>
            <div class="tab-con">
              <div class="tab">Liquidity</div>
              <div class="tab">Volume</div>
            </div>
          </div>
          <div class="chart-wrap"></div>
        </div>
      </div>
      <div class="first-title">Transactions</div>
      <div class="transactions box-shadow">
        <div class="tab-outer">
          <div class="tab-con">
            <div class="tab" :class="tabSelect === 'all' ? 'active' : ''" @click="tabClick('all')">All</div>
            <div class="tab" :class="tabSelect === 'convert' ? 'active' : ''" @click="tabClick('convert')">Convert</div>
            <div class="tab" :class="tabSelect === 'adds' ? 'active' : ''" @click="tabClick('adds')">Adds</div>
            <div class="tab" :class="tabSelect === 'removes' ? 'active' : ''" @click="tabClick('removes')">Removes</div>
          </div>
          <div class="toggle">
            <div class="pre"></div>
            <div class="next negative"></div>
          </div>
        </div>
        <div class="table-container">
          <el-table :data="pairsData" style="width: 100%" :header-row-class-name="'tab-title-line'">
            <el-table-column prop="category">
              <template slot="header" slot-scope="scope">
                <div class="category-head">Category</div>
              </template>
              <template slot-scope="scope">
                <div class="category">{{ scope.row.category }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="totalValue">
              <template slot="header" slot-scope="scope">
                <div class="totalValue-head">Total Value</div>
              </template>
              <template slot-scope="scope">
                <div class="totalValue">{{ scope.row.totalValue }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="tokenAmount1">
              <template slot="header" slot-scope="scope">
                <div class="tokenAmount1-head">Token Amount</div>
              </template>
              <template slot-scope="scope">
                <div class="tokenAmount1">{{ scope.row.tokenAmount1 }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="tokenAmount2">
              <template slot="header" slot-scope="scope">
                <div class="tokenAmount2-head">Token Amount</div>
              </template>
              <template slot-scope="scope">
                <div class="tokenAmount2">{{ scope.row.tokenAmount2 }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="account">
              <template slot="header" slot-scope="scope">
                <div class="account-head">Account</div>
              </template>
              <template slot-scope="scope">
                <div class="price">{{ scope.row.account }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="time">
              <template slot="header" slot-scope="scope">
                <div class="time-head">Time</div>
              </template>
              <template slot-scope="scope">
                <div class="time">{{ scope.row.time }}</div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="first-title">Pair Information</div>
      <div class="information">
        <div class="box-con box-shadow pair-name">
          <div class="title">Pair Name</div>
          <div class="value-container">
            <div class="value">USDT / TNS</div>
          </div>
        </div>
        <div class="box-con box-shadow pair-address">
          <div class="title">Pair Address</div>
          <div class="value-container">
            <div class="value">TNdG6UZmVeNKu1MQGAW1B94EB1sUgYwG</div>
            <div class="copy-btn">Copy</div>
          </div>
        </div>
        <div class="box-con box-shadow usdt-address">
          <div class="title">USDT Address</div>
          <div class="value-container">
            <div class="value">TNdG6UZmVeNKu1MQGAW1B94EB1sUgYwG</div>
            <div class="copy-btn">Copy</div>
          </div>
        </div>
        <div class="box-con box-shadow tronscan">
          <div class="title"></div>
          <div class="value-container">
            <el-button :loading="loading" :disabled="disabledTag" @click="clickBtn" class="btn add">View on Tronscan</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TradingPair',
  data() {
    return {
      pairsData: [
        {
          category: 'Swap USDT for TRX',
          totalValue: '$229.3749',
          tokenAmount1: '229.6589 USDT',
          tokenAmount2: '46,016.7582 TRX',
          account: 'TQooBX...suim',
          time: '1 hour ago'
        }
      ],
      loading: false,
      disabledTag: false,
      tabSelect: 'all',
      clickBtn: function() {}
    }
  },
  methods: {
    tabClick: function(value) {
      this.tabSelect = value;
    }
  }
}
</script>
<style lang="less">
@import '@/themes/style/tradingPair.less';
</style>
