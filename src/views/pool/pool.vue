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
          <el-button :loading="false" @click="toCreate"  class="btn create">Greate a Pair</el-button>
          <el-button :loading="false" @click="toLiquidity" class="btn add mt10">Add Liquidity</el-button>
        </div>
        <a class="btn-link" href="#">Connect to a wallet</a>
      </div>
      <div class="pannel-info">
        <div  v-for="(item,index) in pairList" :key="index" v-show="parseFloat(item.myBalanceInPool)>0">
          <div class="tb-head" @click="collapseFunc(item)">
            <span class="arrow down"></span>
            <div class="info-wrap">
              <img :src="requierImg(item.pair,0)" class="img first-img" />
              <img :src="requierImg(item.pair,1)" class="img second-img" />
              <span class="title">{{item.pair}}</span>
            </div>
          </div>
          <div class="tab-container" :class="!item.show ? 'collapse' : ''">
            <div class="item">
              <div class="key">Your tatal pool tokens</div>
              <div class="value">{{item.myBalanceInPool}}</div>
            </div>
            <div class="item">
              <div class="key">Pooled {{item.token1.name}}</div>
              <div class="value">{{token1Balance.toFixed(6)}}</div>
            </div>
            <div class="item">
              <div class="key">Pooled {{item.token2.name}}</div>
              <div class="value">{{token2Balance.toFixed(6)}}</div>
            </div>
            <div class="item">
              <div class="key">Your Pool share</div>
              <div class="value">{{(share*100).toFixed(2)}}%</div>
            </div>
          </div>
        </div>
      </div>
      <tool-icon></tool-icon>
    </div>
  </div>
</template>
<script>
const Decimal = require('decimal.js')
import { mapState } from 'vuex'
import { getBalanceInPool, getMyBalanceInPool, getLpBalanceInPool } from '../../utils/tronwebFn'
export default {
  name: 'Pool',
  data() {
    return {
      collapse: false,
      pairList:[],
      token1Balance: 0,
      token2Balance: 0,
      myBalanceInPool: 0,
      lpTotal: 0,
      share: 0
    }
  },
  computed: {
    ...mapState(['pairData'])
  },
  watch:{
    pairData(list) {
      this.pairList = JSON.parse(JSON.stringify(list))
      if (this.pairList && this.pairList.length > 0) {
        this.init()
      }
    }
  },
  created() {
    this.pairList = JSON.parse(JSON.stringify(this.pairData))
    if (this.pairList && this.pairList.length > 0) {
      this.init()
    }
  },
  methods: {
    init() { // 初始化tronweb
      const that = this
      this.$initTronWeb().then(function(tronWeb) {
        that.getpairList()
      })
    },
    collapseFunc(item) {
      const that = this
      that.pairList.forEach((ktem) => {
        if (ktem.pair !== item.pair) {
          ktem.show = false
        } else {
          ktem.show = !item.show
        }
      })

      if (item.show) {
        getLpBalanceInPool(item).then((res) => {
          that.lpTotal = Decimal(res).div(Math.pow(10, 18))
          if (that.lpTotal) {
            that.share = Decimal(item.myBalanceInPool).div(that.lpTotal)
            that.getBalance(item)
          }
        })
      }
    },
    toCreate(){
      this.$router.push('/createApair')
    },
    toLiquidity(){
      this.$router.push('/addLiquidity')
    },
    toPool(item) {
      this.$router.push({
        name: '/addLiquidity',
        params: {
          pair: JSON.stringify(item)
        }
      })
    },
    toRemove(item) {
      item.token1.balanceInPool = this.token1Balance
      item.token2.balanceInPool = this.token2Balance
      sessionStorage.setItem('toRemove', JSON.stringify(item))
      this.$router.push({
        name: 'removeLiquidity',
        params: {
          pair: JSON.stringify(item)
        }
      })
    },
    getpairList() {
      const that = this
      this.pairList.forEach((item, index) => {
        item.show = false
        getMyBalanceInPool(item).then((res) => {
          item.myBalanceInPool = Decimal(res).div(Math.pow(10, 18)).toFixed(6).toString()
          that.$set(that.pairList, index, item)
        })
      })
    },
    getBalance(item) {
      const that = this
      getBalanceInPool(item, item.token1).then((res) => {
        that.token1Balance = Decimal(res).mul(that.share)
      })
      getBalanceInPool(item, item.token2).then((res) => {
        that.token2Balance = Decimal(res).mul(that.share)
      })
    },
    requierImg(name, number) {
      let str
      if (name) {
        try {
          if (number != undefined) {
            str = name.split('/')
            return require('@/assets/img/currency/' + str[number] + '.png')
          }
          return require('@/assets/img/currency/' + name + '.png')
        } catch (error) {
          return require('@/assets/img/currency/avitve.png')
        }
      } else {
        return require('@/assets/img/currency/avitve.png')
      }
    }
  }
}
</script>
<style lang="less">
@import '@/themes/style/button.less';
@import '@/themes/style/pannel.less';
@import '@/themes/style/pool.less';
</style>
