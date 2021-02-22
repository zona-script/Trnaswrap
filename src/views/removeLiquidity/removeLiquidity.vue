<template>
  <div id="remove-liquidity" class="remove-liquidity">
    <remove-liquidity-confirm 
      :token1 ="token1"
      :token2 ="token2"
      :token1Num ="token1BalanceInPool"
      :token2Num ="token2BalanceInPool"
      :justPrice = "justPrice"
      :reversePrice = "reversePrice"
      :show="showAlert" 
      :clickFn ="exitPool"
      @close="closePop">
    </remove-liquidity-confirm>
    <div class="inner-wrap">
      <div class="content fir">
        <div class="title">
          <img class="icon" :src="require('@/themes/images/common/telegram@2x.png')" alt="" />
          <div class="txt">Remove Liquidity</div>
        </div>
        <div class="per-container">
          <div class="top-container">
            <div class="current-value">
              <div class="value">{{ slidenum }}</div>
              <div class="percent">%</div>
            </div>
            <div class="slider-outer">
              <el-slider
                :show-tooltip="false"
                :max="100"
                v-model="slidenum"
                @change="changeSlide"
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
            <div class="mode-item" :class="mode == '25' ? 'active' : ''" @click="changeSlide(25)">25%</div>
            <div class="mode-item" :class="mode == '50' ? 'active' : ''" @click="changeSlide(50)">50%</div>
            <div class="mode-item" :class="mode == '75' ? 'active' : ''" @click="changeSlide(75)">75%</div>
            <div class="mode-item" :class="mode == '100' ? 'active' : ''" @click="changeSlide(100)">MAX</div>
          </div>
        </div>
      </div>
      <div class="content sec">
        <div class="info-container">
          <div class="info-item">
            <div class="icon-txt">
              <img class="icon" :src="requierImg(token1.name)" alt="" />
              <div class="key">{{token1.name}}</div>
            </div>
            <div class="value">{{token1BalanceInPool}}</div>
          </div>
          <div class="info-item">
            <div class="icon-txt">
              <img class="icon" :src="requierImg(token2.name)" alt="" />
              <div class="key">{{token2.name}}</div>
            </div>
            <div class="value">{{token2BalanceInPool}}</div>
          </div>
        </div>
        <el-button :loading="false" @click="showAlert = true" class="btn confirm">Receive {{pair.pair}}</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { IsPc } from '@/utils/index'
const Decimal = require('decimal.js')
import BigNumber from 'bignumber.js'
export default {
  name: 'RemoveLiquidity',
  data() {
    return {
      mode: 25,
      showDepositWithdraw: true,
      collapse: true,
      slideValue: 0,
      popShow: false,
      maxBalance: 0,
      slidenum: 0,
      percentage: 0,
      pair: {},
      token1: {},
      token2: {},
      token1BalanceInPool: 0,
      token2BalanceInPool: 0,
      showAlert: false,
      justPrice: 0,
      reversePrice: 0,
      tyepUrl: '',
      showAlert1: false,
      alertType: 'success'
    }
  },
  created() {
    let that = this
    const setData = sessionStorage.getItem('toRemove')
    const paramsData = this.$route.params.pair
    if (this.$route.params.pair || setData) {
      const totatlData = this.$route.params.pair || setData
      this.pair = JSON.parse(totatlData)
      this.token1 = this.pair.token1
      this.token2 = this.pair.token2
      this.token1BalanceInPool = this.token1.balanceInPool
      this.token2BalanceInPool = this.token2.balanceInPool
      this.$initTronWeb().then(function(tronWeb) {
        that.getBalance()
        that.getSpotPrice(that.token1.address, that.token2.address, 'justPrice')
        that.getSpotPrice(that.token2.address, that.token1.address, 'reversePrice')
      })
      
    }
  },
  methods: {
    requierImg(name) {
      if (name) {
        try {
          return require('@/assets/img/currency/' + name + '.png')
        } catch (error) {
          return require('@/assets/img/currency/avitve.png')
        }
      }
    },
    async getBalance() {
      const that = this
      var functionSelector = 'balanceOf(address)'
      var parameter = [
        { type: 'address', value: window.tronWeb.defaultAddress.base58 }
      ]
      const transaction = await window.tronWeb.transactionBuilder.triggerConstantContract(that.pair.address, functionSelector, {}, parameter)
      if (transaction) {
        that.maxBalance = parseInt(transaction.constant_result[0], 16)
      }
    },
    async getSpotPrice(address1, address2, name) {
      var functionSelector = 'getSpotPrice(address,address)'
      var parameter = [
        { type: 'address', value: address1 },
        { type: 'address', value: address2 }
      ]
      const transaction = await window.tronWeb.transactionBuilder.triggerConstantContract(this.pair.address, functionSelector, {}, parameter)
      if (transaction) {
        if (name == 'justPrice') {
          const justPrice = parseInt(transaction.constant_result[0], 16) / Math.pow(10, this.pair.decimals)
          const differ = this.token1.decimals - this.token2.decimals
          if (differ !== 0 && differ > 0) {
            this.justPrice = justPrice / Math.pow(10, Math.abs(differ))
          } else if (differ !== 0 && differ < 0) {
            this.justPrice = justPrice * Math.pow(10, Math.abs(differ))
          }
        } else {
          const reversePrice = parseInt(transaction.constant_result[0], 16) / Math.pow(10, this.pair.decimals)
          const differ = this.token2.decimals - this.token1.decimals
          if (differ !== 0 && differ > 0) {
            this.reversePrice = reversePrice / Math.pow(10, Math.abs(differ))
          } else if (differ !== 0 && differ < 0) {
            this.reversePrice = reversePrice * Math.pow(10, Math.abs(differ))
          }
        }
      }
    },
    async exitPool() {
      const that = this
      var functionSelector = 'exitPool(uint256,uint256[])'
      const slidenum = Decimal(that.slidenum).div(100)
      const maxBalance = Decimal(this.maxBalance)
      // let num = Decimal(slidenum).mul(Decimal(maxBalance)).toString()
      let num = new BigNumber(slidenum)
      num = num.times(maxBalance)
      var parameter = [
        { type: 'uint256', value: num.toFixed() },
        { type: 'uint256[]', value: [0, 0] }
      ]
      const transaction = await window.tronWeb.transactionBuilder.triggerSmartContract(that.pair.address, functionSelector, {}, parameter)
      if (!transaction.result || !transaction.result.result) { return console.error('Unknown error: ' + transaction, null, 2) }
      window.tronWeb.trx.sign(transaction.transaction).then(function(signedTransaction) {
        window.tronWeb.trx.sendRawTransaction(signedTransaction).then(function(res) {
          that.showAlert = false
          that.tyepUrl = 'https://shasta.tronscan.org/#/transaction/' + res.txID
          that.showAlert1 = true
        })
      })
    },
    changeSlide(num) {
      if (num) {
        this.slidenum = num
      }
      this.token1BalanceInPool = this.token1.balanceInPool * this.slidenum / 100
      this.token2BalanceInPool = this.token2.balanceInPool * this.slidenum / 100
    },
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
    },
    closePop() {
      this.showAlert = false;
    }
  }
}
</script>
<style lang="less">
@import '@/themes/style/button.less';
@import '@/themes/style/removeLiquidity.less';
</style>
