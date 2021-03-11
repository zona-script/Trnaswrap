<template>
  <div class="exchange-wrap">
    <select-token
      :item="item"
      :show="selectTokenShow"
      @selected-token="changeCoin"
      @selected-token-close="selectedTokenClose"
    ></select-token>
    <!-- <transaction-setting
      :shareInfo="shareInfo"
      :show="transactionSettingShow"
      @transaction-setting-close="transactionSettingClose"
    ></transaction-setting> -->

    <div id="exchange" class="exchange">
      <div class="content-wrap">
        <div class="background"></div>
        <div class="title">{{$t('homeb1')}}</div>
        <div class="pannel-info pd">
          <div class="headline mt50">{{$t('homeb1')}}</div>
          <div class="form-view">
            <div class="form-view-item clearfix mt">
              <div class="form-view-item-top">
                <div class="droplist">
                  <div class="drop-head" v-on:click="dropHeadClick(0)">
                    <div class="icon-txt">
                      <img class="img" :src="require('@/themes/images/common/b_2x.png')" />
                      <span class="drop-head-text">{{ token1.name }}</span>
                    </div>
                    <span class="arrow down"></span>
                  </div>
                </div>
                <div class="max-num">
                  <div class="input-wrap"><input class="num" v-model="token1Num"  @input="cumpToken2" /></div>
                </div>
              </div>
              <div class="balance-wrap">
                <span class="num">{{ token1.balance }}</span>
                <div class="balance">
                  <span class="img"></span>
                  <span class="balance-text">{{$t('Exc.Balance')}}</span>
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
                    <div class="icon-txt">
                      <img class="img" :src="require('@/themes/images/common/b_2x.png')" />
                      <span class="drop-head-text">{{ token2.name }}</span>
                    </div>
                    <span class="arrow down"></span>
                  </div>
                </div>
                <div class="max-num">
                  <div class="input-wrap"><input class="num" v-model="token2Num" @input="cumpToken1" /></div>
                </div>
              </div>
              <div class="balance-wrap">
                <span class="num">{{ token2.balance }}</span>
                <div class="balance">
                  <span class="img"></span>
                  <span class="balance-text">{{$t('Exc.Balance')}}</span>
                </div>
              </div>
            </div>
          </div>
          <el-button v-show="isApproved" :loading="btnLoading2" :disabled="btnLoading2" @click="doApprove" class="btn confirm mt50">{{$t('Stake.Approve')}}</el-button>
          <el-button  :loading="btnLoading1" :disabled="tobtnDisabled()" @click="doswap" class="btn confirm mt50">{{$t('Supply')}}</el-button>
        </div>
        <div class="pos-con" v-if="JSON.stringify(token1) != '{}' || JSON.stringify(token2) != '{}'" style="box-shadow: 0 0.133333rem 0.266667rem 0 rgb(0 0 0 / 10%);border-radius: 9px;background: #fff;margin-top:20px;">
          <div class="tab-container">
            <div class="item">
              <div class="key">{{$t('Exc.Mrd')}}</div>
              <div class="value">{{token2Num}} {{token2.name}}</div>
            </div>
            <div class="item">
              <div class="key">{{$t('Exc.Pre')}}</div>
              <div class="value">{{percentage}}%</div>
            </div>
            <div class="item">
              <div class="key">{{$t('Exc.Liyee')}}</div>
              <div class="value">{{thisswapFee}} TUSD</div>
            </div>
          </div>
        </div>
        <tool-icon></tool-icon>
      </div>
    </div>
  </div>
</template>

<script>
const Web3Utils = require('web3')
const MAX = Web3Utils.utils.toTwosComplement(-1)
import BigNumber from 'bignumber.js'
const Decimal = require('decimal.js')
import { container, frominput, setselect } from '../../components/index'
import { approved, getConfirmedTransaction, allowance } from '../../utils/tronwebFn'
import {
  calcSpotPrice,
  calcOutGivenIn,
  calcInGivenOut,
  calcOutGivenInAfterPrice
} from '../../utils/calc_comparisons'
import { mapState } from 'vuex'
export default {
  name: 'Exchange',
  data() {
    return {
      token1: {},
      token2: {},
      token1Num: '',
      token2Num: '',
      login: true,
      isApproved: false,
      isSelect: false,
      item: 0,
      pair: {},
      decimals: 18,
      token1Balance: 0,
      token2Balance: 0,
      token1Weight: 0,
      token2Weight: 0,
      swapFee: 0,
      thisswapFee: 0,
      spotPrice: 0,
      percentage: 0,
      isConfirm: false,
      selectColor1: false,
      selectColor2: false,
      btnLoading1: false,
      btnDisabled1: true,
      purple: false,
      btnsbmit: false,
      showAlert1: false,
      alertType: 'success',
      btnLoading2: false,
      isPair: true,
      btnDisabled2: false,
      tips: '',
      typeUrl: '',
      minAmountOut: 0,
      tolerance: 0.1,
      maxPrice: MAX,
      pairList: [],
      token1spotPrice: 0,
      selectTokenShow: false,
      connectFlag:true
    }
  },
  computed: {
    ...mapState(['pairData'])
  },
  watch: {
    token1Num() {
      this.inputFlag()
    },
    token2Num() {
      this.inputFlag()
    },
    pairData(list) {
      this.pairList = JSON.parse(JSON.stringify(list))
    },
    pair(news) {
      this.changePair()
    }
  },
  created() {
    const that = this
    this.pairList = JSON.parse(JSON.stringify(this.pairData))
    this.$initTronWeb().then(function(tronWeb) {
      // that.doClaimFactoryFund()
      that.setPair()
    })
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
    setPair() {
      const pairAddress = this.$route.query.pairAddress
      if (this.pairList && this.pairList.length > 0) {
        this.pairList.forEach((item, index) => {
          if (item.address == pairAddress) {
            this.pair = item
            this.token1 = item.token1
            this.token2 = item.token2
            this.token1.item = 0
            this.token2.item = 1
            this.getBalance(this.token1)
            this.getBalance(this.token2)
            this.changePair()
          }
        })
      }
    },
    closeAlert() {
      this.showAlert1 = false

      // window.location.reload()
    },
    selectedTokenClose(){
      this.selectTokenShow = false
    },
    dropHeadClick(item) {
      this.item = item
      this.selectTokenShow = true
    },
    selectedToken(token) {
      token.item == 0 ? (this.token1 = token) : (this.token2 = token)
      if(token.item == 0){
        this.selectType = token.name
      }
      this.getBalance(token)
    },
    btnClick() {
      this.$popup({
        click: () => {
          // 点击按钮事件
          this.$router.push('../../popup/popup')
        }
      })
    },
    tobtnDisabled() {
      if (this.connectFlag) {
        if (this.isApproved) { // true 不需要授权 false 需要授权
          if (this.btnLoading1) {
            return false
          } else {
            return true
          }
        } else {
          if (this.btnDisabled1) {
            return true
          } else {
            return false
          }
        }
      }
      return true
    },
    purples() { // 箭头切换
      this.purple = !this.purple
      const arr = JSON.parse(JSON.stringify(this.token1))
      const arr1 = JSON.parse(JSON.stringify(this.token2))
      if (this.purple) {
        this.token1 = arr1
        this.token2 = arr
      } else {
        this.token2 = arr
        this.token1 = arr1
      }
      this.token1Num = ''
      this.token2Num = ''
      this.percentage = 0
      this.swapFee = 0
      this.spotPrice = 0
      this.inputFlag()
      this.getPairAddress()
    },
    showSelect(index) {
      this.isSelect = true
      this.item = index
    },

    changeCoin(token) {
      this.selectTokenShow = false
      if (token.item == 0) {
        this.token1 = token
      } else {
        this.token2 = token
      }
      this.getPairAddress()
      this.getBalance(token)
      this.inputFlag()
    },
    async getBalance(token) { // 获取余额
      const that = this
      const tokenContract = await window.tronWeb.contract().at(token.address)
      const tokenBalance = await tokenContract['balanceOf'](window.tronWeb.defaultAddress.base58).call()
      if (token) {
        let balance = parseInt(tokenBalance._hex, 16)
        console.log(balance.toFixed())
        balance = new BigNumber(balance)
        console.log(balance.toFixed())
        balance = balance/Math.pow(10, token.decimals)
        console.log(balance.toFixed())
        token.item == 0 ? that.token1.balance = balance : that.token2.balance = balance
      }
    },
    Approved() {
      if (this.connectFlag) {
        if (this.isApproved) {
          return true
        } else {
          //  if(this.token1.address!=null&&this.token2.address!=null) {
          //    return true
          //  } else {
          //     return false
          //  }
          return false
        }
      }
    },
    doApprove() {
      this.btnDisabled2 = true
      this.btnLoading2 = true
      if (this.token1.address && this.token2.address) {
        approved(this.token1.address, this.pair.address).then((res) => {
          this.isApproved = false
          this.btnLoading2 = false
          this.btnDisabled2 = false
        })
      } else {
        this.$message.error(this.$t('Exc.plsec'))
      }
    },
    async getPairAddress() {
      const pairname = this.token1.name + '/' + this.token2.name
      const pairname1 = this.token2.name + '/' + this.token1.name
      const pair = this.pairList.filter((item) => {
        return item.address == item.pairAddress || item.pair.toUpperCase() == pairname.toUpperCase() || item.pair.toUpperCase() == pairname1.toUpperCase()
      })
      if (pair && pair.length > 0) {
        this.pair = pair[0]
      } else {
        this.isPair = false
      }
    },
    changePair() {
      const that = this
      const pair = this.pair
      this.isPair = true
      allowance(that.token1.address, pair.address).then((res) => {
        if (res) {
          let hex = ''
          if (res._hex) {
            hex = parseInt(res._hex, 16)
          } else if (res.remaining._hex) {
            hex = parseInt(res.remaining._hex, 16)
          } else {
            hex = parseInt(res.constant_result[0], 16)
          }
          that.approveBalance1 = hex
          allowance(that.token2.address, pair.address).then((res) => {
            if (res) {
              let hex1 = ''
              if (res._hex) {
                hex1 = parseInt(res._hex, 16)
              } else if (res.remaining._hex) {
                hex1 = parseInt(res.remaining._hex, 16)
              } else {
                hex1 = parseInt(res.constant_result[0], 16)
              }
              // that.approveBalance2 = hex1
              if (that.approveBalance1 == 0) {
                that.isApproved = true
              } else {
                that.isApproved = false
              }
            }
          })
        }
      })
      this.getBalanceInPool(pair, this.token1).then((res) => {
        this.token1Balance = res
        this.getSpotPrice()
      })
      this.getBalanceInPool(pair, this.token2).then((res) => {
        this.token2Balance = res
        this.getSpotPrice()
      })
      this.getWeight(pair, this.token1).then((res) => {
        this.token1Weight = res
        this.getSpotPrice()
      })
      this.getWeight(pair, this.token2).then((res) => {
        this.token2Weight = res
        this.getSpotPrice()
      })
      this.getSwapFee(pair).then((res) => {
        this.tips = "A protion of each trade ('+(res*1000).toFixed(4)+'%)goes to liquidity providers as a protocal incentive."
        this.swapFee = res
        this.thisswapFee = res
        this.getSpotPrice()
      })
    },
    cumpToken1() { // 计算兑换的token1
      if (!this.isPair) {
        this.$message({
          message: this.$t('ttpd'),
          type: 'error'
        })
        return
      }
      if (this.token1Balance && this.token1Weight && this.token2Balance && this.token2Weight && this.swapFee && this.token2Num) {
        const token1Num = calcInGivenOut(this.token1Balance, this.token1Weight, this.token2Balance, this.token2Weight, this.token2Num, this.swapFee)
        if (token1Num.toString() == 'NaN') {
          this.$message({
            message: 'Insufficient balance of flow pool',
            type: 'error'
          })
          return
        }
        this.token1Num = token1Num.toFixed(6)
      }
    },
    cumpToken2() { // 计算兑换的token2
      if (!this.isPair) {
        this.$message({
          message: this.$t('ttpd'),
          type: 'error'
        })
        return
      }
      if (this.token1Num == 0) {
        this.percentage = 0
        this.thisswapFee = 0
        return
      }
      if (this.token1Balance && this.token1Weight && this.token2Balance && this.token2Weight && this.swapFee && this.token1Num) {
        const token2Num = calcOutGivenIn(this.token1Balance, this.token1Weight, this.token2Balance, this.token2Weight, this.token1Num, this.swapFee)
        this.token2Num = token2Num.toFixed(6)
        const afterPrice = calcOutGivenInAfterPrice(this.token1Balance, this.token1Weight, this.token2Balance, this.token2Weight, this.token1Num, this.swapFee)
        console.log('spotPrice' + this.spotPrice.toString())
        const percentage = (Decimal(afterPrice).minus(this.spotPrice)).div(this.spotPrice).mul(Decimal(100))
        console.log('afterPrice=======' + afterPrice.toString())
        // console.log('token1spotPrice======='+this.token1spotPrice.toString())
        // this.maxPrice = Decimal(this.spotPrice).mul(1-this.tolerance).mul(this.token1Num).mul(Math.pow(10,this.token2.decimals)).toFixed(0)
        this.percentage = percentage.toFixed(2)
        this.thisswapFee = (this.token1Num * this.swapFee).toFixed(6)
      }
    },
    getMinAmountOut() {
      this.tolerance = this.$store.state.tolerance
      if (this.tolerance == 0) {
        this.maxPrice = 0
      } else {
        const token2Num = calcOutGivenIn(this.token1Balance, this.token1Weight, this.token2Balance, this.token2Weight, 1, this.swapFee)
        let maxNumber = Decimal(this.token1Num).mul(token2Num).mul(1 - this.tolerance)
        maxNumber = new BigNumber(maxNumber)
        this.maxPrice = maxNumber.times(Math.pow(10, this.token2.decimals)).toFixed(0)
      }
    },
    getSpotPrice() { // 计算token1的价格
      if (this.token2Balance && this.token2Weight && this.token1Balance && this.token1Weight && this.swapFee) {
        this.spotPrice = calcSpotPrice(this.token1Balance, this.token1Weight, this.token2Balance, this.token2Weight, this.swapFee)
        this.token1spotPrice = calcSpotPrice(this.token2Balance, this.token2Weight, this.token1Balance, this.token1Weight, this.swapFee)
      }
      if (this.token1Num) {
        this.cumpToken2()
      }
    },
    getBalanceInPool(pair, coin) { // 获取Pool中的余额
      return new Promise(function(resolve, reject) {
        var functionSelector = 'getBalance(address)'
        var parameter = [
          { type: 'address', value: coin.address }
        ]
        window.tronWeb.transactionBuilder.triggerConstantContract(pair.address, functionSelector, {}, parameter).then((transaction) => {
          const tokenBalanceInPool = parseInt(transaction.constant_result[0], 16) / Math.pow(10, coin.decimals)
          resolve(tokenBalanceInPool)
        })
      })
    },
    getWeight(pair, coin) { // 获取权重
      return new Promise(function(resolve, reject) {
        var functionSelector = 'getDenorm(address)'
        var parameter = [
          { type: 'address', value: coin.address }
        ]
        window.tronWeb.transactionBuilder.triggerConstantContract(pair.address, functionSelector, {}, parameter).then((transaction) => {
          const weight = parseInt(transaction.constant_result[0], 16) / Math.pow(10, pair.decimals)
          resolve(weight)
        })
      })
    },
    getSwapFee(pair) { // 获取swapfee
      return new Promise(function(resolve, reject) {
        var functionSelector = 'getSwapFee()'
        var parameter = []
        window.tronWeb.transactionBuilder.triggerConstantContract(pair.address, functionSelector, {}, parameter).then((transaction) => {
          const swapFee = parseInt(transaction.constant_result[0], 16) / Math.pow(10, pair.decimals)
          console.log('swapFee==========================' + parseInt(transaction.constant_result[0], 16))
          resolve(swapFee)
        })
      })
    },
    submitInit() {
      this.btnDisabled1 = false
      this.btnLoading1 = false
      this.btnsbmit = false
    },
    confirmSwap() {
      this.isConfirm = true
    },
    inputFlag() {
      if (this.btnsbmit) return
      if (this.token1Num != '' && this.token2Num != '' && JSON.stringify(this.token1) != '{}' && JSON.stringify(this.token2) != '{}') {
        this.btnDisabled1 = false
      } else {
        this.btnDisabled1 = true
      }
    },
    convert() {
      const token1 = this.token1
      const token2 = this.token2
      this.token1 = token2
      this.token2 = token1
      this.token2Balance = 0
      this.token2Weight = 0
      this.token1Balance = 0
      this.token1Weight = 0
      this.swapFee = 0
      this.getPairAddress()
    },
    async doswap() {
      const that = this
      let token1num = new BigNumber(that.token1Num)
      token1num = token1num.times(Math.pow(10, that.token1.decimals)).toFixed()
      if (token1num > that.approveBalance1) {
        that.doApprove()
      }
      this.isConfirm = false
      this.btnDisabled1 = true
      this.btnLoading1 = true
      this.btnsbmit = true
      if (that.token2Num > that.token2Balance) {
        this.$message.error('The exchange amount cannot be greater than the liquidity pool balance')
        that.btnDisabled1 = false
        that.btnLoading1 = false
        return
      }
      var functionSelector = 'swapExactAmountIn(address,uint256,address,uint256,uint256)'

      this.getMinAmountOut()
      console.log('that.maxPrice======' + that.maxPrice)
      var parameter = [
        { type: 'address', value: that.token1.address },
        { type: 'uint256', value: token1num },
        { type: 'address', value: that.token2.address },
        { type: 'uint256', value: that.maxPrice },
        { type: 'uint256', value: MAX }
      ]
      const transaction = await window.tronWeb.transactionBuilder.triggerSmartContract(that.pair.address, functionSelector, {}, parameter)
      if (!transaction.result || !transaction.result.result) { return console.error('Unknown error: ' + transaction, null, 2) }
      window.tronWeb.trx.sign(transaction.transaction).then(function(signedTransaction) {
        window.tronWeb.trx.sendRawTransaction(signedTransaction).then(function(res) {
          that.typeUrl = 'https://tronscan.org/#/transaction/' + signedTransaction.txID
          that.showAlert1 = true
          that.$message.success('交易成功，等待区块确认')
          that.token1Num = 0
            that.token2Num = 0
            that.getBalance(that.token1)
            that.getBalance(that.token2)
            that.submitInit()
        }).catch((err) => {
          console.log(err)
          that.submitInit()
        })
      }).catch(err => {
        console.log(err)
        that.submitInit()
      })
    },
    async doClaimFactoryFund(){
      var functionSelector = 'claimFactoryFund()'
      const transaction = await window.tronWeb.transactionBuilder.triggerSmartContract('TFpWo6peU4HDb4g7xFKn33DLD47xQFPABK', functionSelector, {}, [])
      window.tronWeb.trx.sign(transaction.transaction).then(function(signedTransaction) {
        window.tronWeb.trx.sendRawTransaction(signedTransaction).then(function(res) {
          console.log(res)
        })
      })  
    }
  },
  mounted() {
    
  }
}
</script>
<style lang="less">
@import '@/themes/style/button.less';
@import '@/themes/style/pannel.less';
@import '@/themes/style/formview.less';
@import '@/themes/style/dialog.less';
@import '@/themes/style/exchange.less';
@import '@/themes/style/addLiquidity.less';
</style>
