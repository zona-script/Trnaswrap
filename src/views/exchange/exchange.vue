<template>
  <div class="exchange-wrap">
    <select-token
      :tokens="selectTokens"
      :show="selectTokenShow"
      :selected-token="selectedToken"
      @selected-token-close="selectedTokenClose"
    ></select-token>
    <transaction-setting
      :shareInfo="shareInfo"
      :show="transactionSettingShow"
      @transaction-setting-close="transactionSettingClose"
    ></transaction-setting>

    <div id="exchange" class="exchange">
      <headTitle></headTitle>
      <div class="content-wrap">
        <div class="background"></div>
        <div class="title">Exchange</div>
        <div class="pannel-info pd">
          <div class="headline mt50">Exchange</div> 
          <div class="form-view">
            <div class="form-view-item clearfix mt">
              <div class="form-view-item-top">
                 <div class="droplist">
                  <div class="drop-head" v-on:click="dropHeadClick(item)">
                    <span class="arrow down"></span>
                    <img class="img" :src="require('@/themes/images/common/b_2x.png')" />
                    <span class="drop-head-text">WTRX</span>
                  </div>
                </div>
                <div class="max-num">
                  <span class="max-wrap">MAX</span>
                  <div class="input-wrap"><input class="num" value="94.850.00" /></div>
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
            <div class="btn-icon-wrap"><div class="btn-icon"><span>+</span></div></div>
            <div class="form-view-item clearfix mt">
              <div class="form-view-item-top">
                 <div class="droplist">
                  <div class="drop-head" v-on:click="dropHeadClick(item)">
                    <span class="arrow down"></span>
                     <img class="img" :src="require('@/themes/images/common/b_2x.png')" />
                    <span class="drop-head-text">USDT</span>
                  </div>
                </div>
                <div class="max-num">
                  <span class="max-wrap">MAX</span>
                  <div class="input-wrap"><input class="num" value="94.850.00" /></div>
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
          <el-button :loading="false" class="btn confirm mt50">Supply</el-button>
        </div>
        <div class="icon-btn-tool">
            <img class="img" :src="require('@/themes/images/common/telegram@2x.png')" alt=""/>
            <img class="img" :src="require('@/themes/images/common/twitter@2x.png')" alt=""/>
            <img class="img" :src="require('@/themes/images/common/discord@2x.png')" alt=""/>
            <img class="img" :src="require('@/themes/images/common/medium@2x.png')" alt=""/>
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
  name: 'Exchange',
  data() {
    return {
      transactionSettingShow: false,
      selectTokenShow: false,
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
      shareInfo: [
        {
          num: '1%',
          text: 'Slippage tolerance'
        },
        {
          num: '5%',
          text: 'Slippage tolerance'
        },
        {
          num: '10%',
          text: 'Slippage tolerance'
        },
        {
          num: '30%',
          isSelect: true,
          text: 'Slippage tolerance'
        }
      ]
    }
  },
  methods: {
    init() {
      // 初始化tronweb
      const that = this
    },
    dropHeadClick(item) {
      this.selectTokenShow = true
    },
    formViewDropClick(item, subItem) {
      item.dropListIsShow = false
      item.select.text = subItem.text
    },
    selectedToken(id) {
      console.log(id)
    },
    selectedTokenClose() {
      this.selectTokenShow = false
    },
    transactionSettingClose() {
      this.transactionSettingShow = false
    }
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
@import '@/themes/style/dialog.less';
@import '@/themes/style/exchange.less';
</style>
