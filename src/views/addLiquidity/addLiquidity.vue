<template>
  <div id="addLiquidity" class="addLiquidity">
    <!-- 第一种弹框样式 -->
    <transaction-submit :show="transactionShow" @transaction-close="transactionClose"></transaction-submit>

    <!-- 第二种弹框样式 -->
    <revive :show="reviveShow" :confirm="confirm" @revive-close="reviveClose"></revive>

    <!-- 第三种弹框样式 -->
    <select-token
      :tokens="selectTokens"
      :show="selectTokenShow"
      :selected-token="selectedToken"
      @selected-token-close="selectedTokenClose"
    ></select-token>
    <headTitle></headTitle>
    <div class="content">
      <div class="background"></div>
      <div class="title">Add Liquidity</div>
      <div class="pannel-info">
        <div class="tabs-container">
          <div class="tabs fir" :class="assetMode ? '' : 'active'">Single assets</div>
          <div class="tabs sec" :class="assetMode ? 'active' : ''">Double assets</div>
        </div>
        <div class="configuration">
          <div class="form-view img-text-wrap bd">
            <img class="img" :src="require('@/themes/images/common/token_02_2x.png')" />
            <img class="img sec" :src="require('@/themes/images/common/token_04_2x.png')" />
            <span class="img-text">TRX - WTRX</span>
          </div>
          <div class="form-view">
            <div class="form-view-item clearfix mt">
              <div class="form-view-item-top">
                <div class="max-num">
                  <span class="max-wrap">MAX</span>
                  <div class="input-wrap"><input class="num" value="94.850.00" /></div>
                </div>
                <div class="droplist">
                  <div class="drop-head" v-on:click="dropHeadClick(item)">
                    <span class="arrow down"></span>
                    <span class="drop-head-text">WTRX</span>
                  </div>
                </div>
              </div>
              <div class="balance-wrap">
                <span class="num">560’000</span>
                <div class="balance">
                  <span class="img"></span>
                  <span class="balance-text">Balance</span>
                </div>
              </div>
            </div>
            <div class="form-view-item clearfix mt">
              <div class="form-view-item-top">
                <div class="max-num">
                  <span class="max-wrap">MAX</span>
                  <div class="input-wrap"><input class="num" value="94.850.00" /></div>
                </div>
                <div class="droplist">
                  <div class="drop-head" v-on:click="dropHeadClick(item)">
                    <span class="arrow down"></span>
                    <span class="drop-head-text">USDT</span>
                  </div>
                </div>
              </div>
              <div class="balance-wrap">
                <span class="num">1’000</span>
                <div class="balance">
                  <span class="img"></span>
                  <span class="balance-text">Balance</span>
                </div>
              </div>
            </div>
          </div>
          <div class="pannel-info-share">
            <div class="title">Prices and pool share</div>
            <div class="item-wrap mt50">
              <div class="item-box">
                <div class="num">10</div>
                <div class="text-info">WTRX Per USDT</div>
              </div>
              <div class="item-box">
                <div class="num">80</div>
                <div class="text-info">USDT Per WTRX</div>
              </div>
              <div class="item-box">
                <div class="num">98%</div>
                <div class="text-info">Share of Pool</div>
              </div>
            </div>
            <div class="btn-con">
              <div class="btn create mt50">Approve</div>
              <div class="btn add mt50">Supply</div>
            </div>
          </div>
        </div>
        <div class="pos-con">
          <div class="your-position">Your position</div>
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
  </div>
</template>
<script>
// import axios from 'axios'
// import { getOneToken, joinConnection, getTnsPrice, getInvitedAddress } from '@/api/api'
// import { handleClipboard } from '@/assets/js/clipboard.js'
export default {
  name: 'addLiquidity',
  data() {
    return {
      reviveShow: false,
      transactionShow: false,
      selectTokenShow: false,
      assetMode: true,
      selectTokens: [
        {
          id: 1,
          img: require('@/themes/images/dialog/b_2x.png'),
          txt: 'WTRX'
        },
        {
          id: 2,
          img: require('@/themes/images/dialog/token_04_2x.png'),
          txt: 'USDT'
        },
        {
          id: 3,
          img: require('@/themes/images/dialog/token_03_2x.png'),
          txt: 'JST'
        },
        {
          id: 4,
          img: require('@/themes/images/dialog/b_2x.png'),
          txt: 'SUN'
        },
        {
          id: 5,
          img: require('@/themes/images/dialog/b_2x.png'),
          txt: 'BTC'
        }
      ],
      origanizationData: [
        {
          type: 'icon',
          firstImg: require('@/themes/images/home/a.png'),
          secondImg: require('@/themes/images/home/b.png'),
          name: 'WTRX-USDT',
          value: '0.00089'
        },
        {
          name: 'Your pool share',
          value: '0.00%'
        },
        {
          name: 'WTRX-USDT',
          value: '0.000000'
        },
        {
          name: 'USDT',
          value: '0.000000'
        }
      ]
    }
  },
  methods: {
    init() {
      // 初始化tronweb
      // const that = this
    },
    dropHeadClick(item) {
      this.selectTokenShow = true
    },
    formViewDropClick(item, subItem) {
      item.dropListIsShow = false
      item.select.text = subItem.text
    },
    dialogCancel() {},
    selectedToken(id) {
      console.log(id)
    },
    selectedTokenClose() {
      this.selectTokenShow = false
    },
    reviveClose() {
      this.reviveShow = false
    },
    transactionClose() {
      this.transactionShow = false
    },
    confirm() {}
  },
  mounted() {
    this.init()
  }
}
</script>
<style lang="less">
@import '@/themes/style/common.less';
@import '@/themes/style/button.less';
@import '@/themes/style/pannel.less';
@import '@/themes/style/formview.less';
@import '@/themes/style/addLiquidity.less';
.form-view.img-text-wrap {
  padding: 15px 0;
  .img {
    width: 40px;
    height: 40px;
    vertical-align: middle;
    &.sec {
      transform: translateX(-20%);
    }
  }
}
</style>
