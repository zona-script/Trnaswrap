<template>
  <div id="addLiquidity" class="addLiquidity">
    <!-- 第一种弹框样式 -->
    <transaction-submit :show="transactionShow" @transaction-close="transactionClose"></transaction-submit>

    <!-- 第二种弹框样式 -->
    <revive :show="confirmPop" :popsData='popsData' :confirm="confirm" @revive-close="reviveClose"></revive>

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
                  <div class="input-wrap">
                    <input class="num" v-model="token1Num"  @input="calcShare" />
                  </div>
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
                  <span class="max-wrap" @click="token2Num = token2.balance">MAX</span>
                  <div class="input-wrap">
                    <input class="num" v-model="token2Num" @input="calcToken1Num" />
                  </div>
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
                <div class="num">{{justPrice?justPrice.toFixed(4):'--'}}</div>
                <div class="text-info">{{token1.name}} Per {{token2.name}}</div>
              </div>
              <div class="item-box">
                <div class="num">{{reversePrice?reversePrice.toFixed(4):'--'}}</div>
                <div class="text-info">{{token2.name}} Per {{token1.name}}</div>
              </div>
              <div class="item-box">
                <div class="num">{{share}}%</div>
                <div class="text-info">Share of Pool</div>
              </div>
            </div>
            <div class="btn-con mt50">
              <el-button class="btn add" v-show="!isApproved" :loading="charm.btnLoading2" :disabled="charm.disabled2" @click="doApprove">Approve</el-button>
              <el-button :loading="charm.btnLoading1" :disabled="btndisable()" @click="confirmSupply" class="btn add">Supply</el-button>
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
const Web3Utils = require('web3')
const Decimal = require('decimal.js')
import BigNumber from 'bignumber.js'
import { mapState } from 'vuex'
import { decimals, allowance, approved, getLpBalanceInPool, getMyBalanceInPool, getTokenDenormalizedWeight } from '../../utils/tronwebFn'
import ipConfig from '../../config/contracts'
import { calcPoolOutGivenSingleIn, getTokenInGivenPoolOut } from '../../utils/calc_comparisons'
export default {
  name: 'addLiquidity',
  data() {
    return {
      confirmPop:false,
      transactionShow: false,
      selectTokenShow: false,
      assetMode: true,
      charm: {
        btnLoading1: false,
        disabled1: true,
        subimt: false,
        btnLoading2: false,
        disabled2: false
      },
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
      selectType:'',
      pairList:[],
      justPrice:'',
      reversePrice:'',
      isApproved:false,
      token1ApproveBalance:0,
      token2ApproveBalance:0,
      myToken1Balance:0,
      myToken2Balance:0,
      myShare:0,
      share: 0,
      lpTotal:0,
      myBalanceInPool:0,
      popsData:{}
    }
  },
  computed: {
    ...mapState(['pairData'])
  },
  watch: {
    pairData(list) {
      this.pairList = JSON.parse(JSON.stringify(list))
    },
    // pair(news) {
    //   this.changePair()
    // }
  },
  created() {
    this.pairList = JSON.parse(JSON.stringify(this.pairData))
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
        if (this.token1.address && this.token2.address) {
          this.getPairAddress()
        }
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
      if(token.item == 0){
        this.selectType = token.name
      }
      this.getBalance(token)
      this.validity()
    },
    async getPairAddress() {
      const that = this
      const pairname = this.token1.name + '/' + this.token2.name
      const pairname1 = this.token2.name + '/' + this.token1.name
      const pair = this.pairList.filter((item) => {
        return item.pair.toUpperCase() == pairname.toUpperCase() || item.pair.toUpperCase() == pairname1.toUpperCase()
      })
      if (pair && pair.length > 0) {
        this.pair = pair[0]
        this.changePair()
      }
    },
    changePair() {
      const that = this
      const pair = this.pair
      this.getSpotPrice(this.token1.address, this.token2.address, 'justPrice')
      this.getSpotPrice(this.token2.address, this.token1.address, 'reversePrice')
      this.getBalanceInPool(pair, this.token1).then((res) => { // 获取token1在pool中的总量
        console.log('this.token1Balance=====' + res)
        this.token1Balance = res
        getMyBalanceInPool(pair).then((res) => {
          that.myBalanceInPool = Decimal(res)
          console.log('that.myBalanceInPool========' + that.myBalanceInPool)
          if (that.lpTotal) {
            that.myShare = Decimal(that.myBalanceInPool).div(Decimal(that.lpTotal))
            that.myToken1Balance = Decimal(that.token1Balance).mul(Decimal(that.myShare)).toFixed(6)
            that.myToken2Balance = Decimal(that.token2Balance).mul(Decimal(that.myShare)).toFixed(6)
            console.log('that.myShare========' + Decimal(that.myBalanceInPool).div(Decimal(that.lpTotal)).toString())
          }
        })
      })
      this.getBalanceInPool(pair, this.token2).then((res) => { // 获取token2在pool中的总量
        console.log('this.token2Balance=====' + res)
        this.token2Balance = res
        getLpBalanceInPool(this.pair).then((res) => { // 获取lptoken总量
          that.lpTotal = Decimal(res)
          if (that.myBalanceInPool) {
            that.myShare = Decimal(that.myBalanceInPool).div(Decimal(that.lpTotal))
            that.myToken1Balance = Decimal(that.token1Balance).mul(Decimal(that.myShare)).toFixed(6)
            that.myToken2Balance = Decimal(that.token2Balance).mul(Decimal(that.myShare)).toFixed(6)
            console.log('that.myShare========' + Decimal(that.myBalanceInPool).div(Decimal(that.lpTotal)))
          }
        })
      })

      allowance(this.token1.address, pair.address).then((res) => {
        if (res) {
          that.token1ApproveBalance = parseInt(res._hex ? res._hex : res.remaining._hex, 16)
          console.log(that.token1ApproveBalance)
          if (that.token1ApproveBalance == 0) {
            that.isApproved = false
          } else {
            that.isApproved = true
          }
        }
      })
      allowance(this.token2.address, pair.address).then((res) => {
        if (res) {
          that.token2ApproveBalance = parseInt(res._hex ? res._hex : res.remaining._hex, 16)
          if (that.token2ApproveBalance == 0) {
            that.isApproved = false
          } else {
            that.isApproved = true
          }
        }
      })
    },
    getBalanceInPool(pair, coin) { // 获取Pool中的余额
      const that = this
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
    async getSpotPrice(address1, address2, name) {
      var functionSelector = 'getSpotPrice(address,address)'
      var parameter = [
        { type: 'address', value: address1 },
        { type: 'address', value: address2 }
      ]
      console.log('this.pair.address==========' + this.pair.address)
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
        // name == 'justPrice' ? this.justPrice = parseInt(transaction.constant_result[0], 16) / Math.pow(10, this.pair.decimals) : this.reversePrice = parseInt(transaction.constant_result[0], 16) / Math.pow(10, this.pair.decimals)
      }
    },
    doApprove() {
      this.charm2(1)
      if (this.pair) {
        if (this.token1ApproveBalance == 0) {
          approved(this.token1.address, this.pair.address).then((res) => {
            this.getPairAddress()
            this.charm2()
          })
        }
        if (this.token2ApproveBalance == 0 && !this.iSingle) {
          approved(this.token2.address, this.pair.address).then((res) => {
            this.getPairAddress()
            this.charm2()
          })
        }
      } else {
        this.$layer.msg(this.$t('pewe4'))
      }
    },
    confirmSupply() { // 输出的lptoken数量
      if (this.token1Num > this.token1.balance || this.token2Num > this.token2.balance) {
        this.$message({
          message: this.$t('pewe2'),
          type: 'error'
        })
        return
      }

      if (this.iSingle) {
        const reciveLptoken = calcPoolOutGivenSingleIn(this.token1Balance, this.token1denormalizedWeight, Decimal(this.lpTotal).div(Decimal(Math.pow(10, 18))), this.totalDenormalizedWeight, this.token1Num, Decimal(this.foxDex).div(Decimal(Math.pow(10, 18))))
        this.reciveLptoken = Decimal(reciveLptoken).toFixed(6)
      } else {
        const reciveLptoken = getTokenInGivenPoolOut(this.token1Balance, Decimal(this.token1Num), this.token2Balance, Decimal(this.token2Num), Decimal(this.lpTotal).div(Decimal(Math.pow(10, 18))))
        this.reciveLptoken = Decimal(reciveLptoken).toFixed(6)
      }
      this.popsData = {
        reciveLptoken: this.reciveLptoken,
        token1Num: this.token1Num,
        token2Num: this.iSingle ? 0 : this.token2Num,
        t1Per: this.justPrice,
        t2Per: this.reversePrice,
        token1: this.token1,
        token2: this.token2,
        share: this.share
      }
      this.confirmPop = true
    },
    calcToken1Num() {
      if (this.token2Num <= 0) {
        return
      }
      if (this.token1Balance && this.token2Balance) {
        this.token1Num = (this.token2Num / this.token2Balance * this.token1Balance).toFixed(6)
        // let differ = this.token2.decimals-this.token1.decimals
        // if(differ!==0 && differ>0){
        //   this.token1Num = (this.token1Num/Math.pow(10,Math.abs(differ))).toFixed(6)
        // }else if(differ!==0 && differ<0){
        //   this.token1Num = (this.token1Num*Math.pow(10,Math.abs(differ))).toFixed(6)
        // }
      }
    },
    calcShare() {
      if (this.token1Num <= 0) {
        this.share = 0
        return
      }
      if (this.token1Balance && this.token2Balance && !this.iSingle) {
        this.token2Num = (this.token1Num / this.token1Balance * this.token2Balance).toFixed(6)
        // let differ = this.token1.decimals-this.token2.decimals
        // if(differ!==0 && differ>0){
        //   this.token2Num = (this.token2Num/Math.pow(10,Math.abs(differ))).toFixed(6)
        // }else if(differ!==0 && differ<0){
        //   this.token2Num = (this.token2Num*Math.pow(10,Math.abs(differ))).toFixed(6)
        // }
      }
      if (this.pair.address) {
        this.getShare()
      }
    },
    getShare() {
      const that = this
      if (this.token1Num && this.token1Num !== 0) {
        if (this.token1Balance && this.token1denormalizedWeight && this.lpTotal && this.totalDenormalizedWeight) {
          const poolOut = calcPoolOutGivenSingleIn(this.token1Balance, this.token1denormalizedWeight, Decimal(this.lpTotal).div(Decimal(Math.pow(10, 18))), this.totalDenormalizedWeight, this.token1Num, Decimal(this.foxDex).div(Decimal(Math.pow(10, 18))))
          const plus = Decimal(poolOut).plus(Decimal(this.lpTotal).div(Decimal(Math.pow(10, 18))))
          const share = Decimal(poolOut).div(plus).mul(100)
          this.share = share.toFixed(2)
        } else {
          getTokenDenormalizedWeight(this.token1.address, this.pair.address).then((response) => {
            that.token1denormalizedWeight = parseInt(response, 16) / Math.pow(10, that.pair.decimals)
            console.log('token1denormalizedWeight=========' + that.token1denormalizedWeight)
          })
          getTokenDenormalizedWeight(this.token2.address, this.pair.address).then((response) => {
            that.token2denormalizedWeight = parseInt(response, 16) / Math.pow(10, that.pair.decimals)
            console.log('token2denormalizedWeight=========' + that.token2denormalizedWeight)
          })
          this.getTotalDenormalizedWeight()// 获取lptoken总权重
          this.getSwapFeeForDex()// 获取swapfee
          // this.getShare()
        }
      } else {
        this.share = 0
      }
    },
    async getTotalDenormalizedWeight() {
      var functionSelector = 'getTotalDenormalizedWeight()'
      var parameter = []
      const transaction = await window.tronWeb.transactionBuilder.triggerConstantContract(this.pair.address, functionSelector, {}, parameter)
      if (transaction) {
        this.totalDenormalizedWeight = parseInt(transaction.constant_result[0], 16) / Math.pow(10, this.pair.decimals)
      }
    },
    async getSwapFeeForDex() {
      var functionSelector = 'swapFeeForDex()'
      var parameter = []
      const transaction = await window.tronWeb.transactionBuilder.triggerConstantContract(ipConfig.FactoryManager, functionSelector, {}, parameter)
      this.foxDex = parseInt(transaction.constant_result[0], 16)
    },
    btndisable() {
      if (!this.charm.disabled1) { // 可以执行
        if (this.token1ApproveBalance == 0) {
          return true
        } else {
          if (this.token2ApproveBalance == 0) {
            return true
          } else {
            return false
          }
        }
      } else {
        return true
      }
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
    },
    charm1(n) {
      if (n) {
        this.charm.btnLoading1 = true
        this.charm1.disabled1 = true
      } else {
        this.charm.btnLoading1 = false
        this.charm1.disabled1 = false
      }
    },
    validity() {
      if (!this.charm.subimt) {
        if (this.iSingle) { //  单1流动性
          if (this.token1Num != '' && JSON.stringify(this.token1) != '{}' && JSON.stringify(this.token2) != '{}') {
            this.charm.disabled1 = false
          } else {
            this.charm.disabled1 = true
          }
        } else { //  双向
          if (this.token1Num != '' && JSON.stringify(this.token1) != '{}' && this.token2Num != '' && JSON.stringify(this.token2) != '{}') {
            this.charm.disabled1 = false
          } else {
            this.charm.disabled1 = true
          }
        }
      }
    },
    charm2(n) {
      if (n) {
        this.charm.btnLoading2 = true
        this.charm.disabled2 = true
      } else {
        this.charm.btnLoading2 = false
        this.charm.disabled2 = false
      }
    },
  },
  mounted() {}
}
</script>
<style lang="less">
@import '@/themes/style/button.less';
@import '@/themes/style/pannel.less';
@import '@/themes/style/formview.less';
@import '@/themes/style/addLiquidity.less';
</style>
