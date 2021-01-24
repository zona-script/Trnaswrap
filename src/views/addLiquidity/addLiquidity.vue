<template>
  <div id="addLiquidity" class="addLiquidity">
    <!-- 第一种弹框样式 -->
    <transaction-submit :show="transactionShow" @transaction-close="transactionClose"></transaction-submit>

    <!-- 第二种弹框样式 -->
    <revive :show="reviveShow" :confirm="confirm" @revive-close="reviveClose"></revive>

    <!-- 第三种弹框样式 -->
    <select-token
      :item="item"
      :show="selectTokenShow"
      @selected-token="selectedToken"
      @selected-token-close="selectedTokenClose"
    ></select-token>
    <!-- <headTitle></headTitle> -->
    <div class="content">
      <div class="background"></div>
      <div class="title">Add Liquidity</div>
      <div class="pannel-info">
        <div class="tabs-container">
          <div @click="singleSet" class="tabs fir" :class="assetMode ? '' : 'active'">Single assets</div>
          <div @click="doubleSet" class="tabs sec" :class="assetMode ? 'active' : ''">Double assets</div>
        </div>
        <div class="configuration">
          <div class="img-text-wrap bd">
            <img class="img" :src="require('@/themes/images/common/token_02_2x.png')" />
            <img class="img sec" :src="require('@/themes/images/common/token_04_2x.png')" />
            <span class="img-text">TRX - WTRX</span>
          </div>
          <div class="form-view">
            <div class="form-view-item clearfix mt">
              <div class="form-view-item-top">
                <div class="droplist">
                  <div class="drop-head" v-on:click="dropHeadClick(0)">
                    <span class="arrow down"></span>
                    <img class="img" :src="require('@/themes/images/common/b_2x.png')" />
                    <span class="drop-head-text">{{ token1.name }}</span>
                  </div>
                </div>
                <div class="max-num">
                  <span class="max-wrap" @click="token1Num = token1.balance">MAX</span>
                  <div class="input-wrap"><input class="num" v-model="token1Num" /></div>
                </div>
              </div>
              <div class="balance-wrap">
                <span class="num">{{ token1.balance }}</span>
                <div class="balance">
                  <span class="img"></span>
                  <span class="balance-text">Balance</span>
                </div>
              </div>
            </div>
            <div class="btn-icon-wrap">
              <div class="btn-icon"><span>+</span></div>
            </div>
            <div class="form-view-item clearfix mt">
              <div class="form-view-item-top">
                <div class="droplist">
                  <div class="drop-head" v-on:click="dropHeadClick(1)">
                    <span class="arrow down"></span>
                    <img class="img" :src="require('@/themes/images/common/b_2x.png')" />
                    <span class="drop-head-text">{{ token2.name }}</span>
                  </div>
                </div>
                <div class="max-num">
                  <span class="max-wrap" @click="token2Num = token1.balance">MAX</span>
                  <div class="input-wrap"><input class="num" v-model="token2Num" /></div>
                </div>
              </div>
              <div class="balance-wrap">
                <span class="num">{{ token2.balance }}</span>
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
            <div class="btn-con mt50">
              <el-button :loading="false" class="btn add">Approve</el-button>
              <el-button :loading="false" class="btn add">Supply</el-button>
              <!-- <div class="btn create mt50">Approve</div>
              <div class="btn add mt50">Supply</div> -->
            </div>
          </div>
        </div>
        <div class="pos-con">
          <div class="your-position">Your position</div>
          <div class="tab-container">
            <div class="item">
              <div class="key con">
                <img class="img" :src="require('@/themes/images/common/token_02_2x.png')" />
                <img class="img sec" :src="require('@/themes/images/common/token_04_2x.png')" />
                <div class="txt">WTRX-USDT</div>
              </div>
              <div class="value">0.00089</div>
            </div>
            <div class="item">
              <div class="key">Your pool share</div>
              <div class="value">0.00%</div>
            </div>
            <div class="item">
              <div class="key">WTRX-USDT</div>
              <div class="value">0.000000</div>
            </div>
            <div class="item">
              <div class="key">USDT</div>
              <div class="value">0.000000</div>
            </div>
          </div>
        </div>
        <tool-icon></tool-icon>
      </div>
    </div>
  </div>
</template>
<script>
import { approved, getConfirmedTransaction } from '../../utils/tronwebFn'
import ipConfig from '../../config/contracts'
export default {
  name: 'addLiquidity',
  data() {
    return {
      reviveShow: false,
      transactionShow: false,
      selectTokenShow: false,
      assetMode: true,
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
      ],
      token1Num: 0,
      token2Num: 0,
      token1: {},
      token2: {},
      item: 0,
      pairInfo: {
        address: 'TBm7aKuPzBDButgfJmTwmq4tJ7Wippw3Lo',
        decimals: '18',
        pair: 'USDT/FOX',
        token1: {
          address: 'TQKzfGM1F1bvjo2tnQ5Kirqdu2hR8mFWs2',
          decimals: 8,
          name: 'USDT'
        },
        token2: {
          address: 'TE9oQF7Y8tbq5Lqdfr9S47QNXHt7GRcHh4',
          decimals: 12,
          name: 'FOX'
        }
      }
    }
  },
  methods: {
    async getBalance(token) {
      // 获取余额
      const that = this
      const tokenContract = await window.tronWeb.contract().at(token.address)
      const tokenBalance = await tokenContract['balanceOf'](window.tronWeb.defaultAddress.base58).call()
      if (tokenBalance) {
        const balance = parseFloat(tokenBalance, 16) / Math.pow(10, token.decimals)
        token.item == 0 ? (that.token1.balance = balance) : (that.token2.balance = balance)
      }
    },
    dropHeadClick(item) {
      this.item = item
      this.selectTokenShow = true
    },
    formViewDropClick(item, subItem) {
      item.dropListIsShow = false
      item.select.text = subItem.text
    },
    dialogCancel() {},
    selectedToken(token) {
      token.item == 0 ? (this.token1 = token) : (this.token2 = token)
      this.getBalance(token)
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
    confirm() {},
    singleSet() {
      this.assetMode = false
    },
    doubleSet() {
      this.assetMode = true
    }
  },
  mounted() {}
}
</script>
<style lang="less">
@import '@/themes/style/common.less';
@import '@/themes/style/button.less';
@import '@/themes/style/pannel.less';
@import '@/themes/style/formview.less';
@import '@/themes/style/addLiquidity.less';
</style>
