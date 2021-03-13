<template>
  <div id="pool" class="pool">
    <div class="background"></div>
    <div class="content-wrap">
      <!-- <div class="title">Pool</div> -->
      <div class="pannel-info pd">
        <!-- <div class="headline mt50">Pool</div> -->
        <div class="banner-img"></div>
        <div class="title mt50">{{$t('pool.Lpr')}}</div>
        <p class="desc min-height-304 desct-mt">
          {{$t('pool.Lpr2')}}
        </p>
        <div class="rect">Connect to a wallet to view your liquidity.</div>
        <div class="btn-box" style="padding-bottom:20px;">
          <el-button :loading="false" @click="toCreate"  class="btn create">{{$t('pool.cj1')}}</el-button>
          <el-button :loading="false" @click="toLiquidity" class="btn add mt10">{{$t('pool.al')}}</el-button>
        </div>
        <!-- <a class="btn-link" href="#">Connect to a wallet</a> -->
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
              <div class="key">{{$t('pool.Ytpt')}}</div>
              <div class="value">{{item.myBalanceInPool}}</div>
            </div>
            <div class="item">
              <div class="key">{{$t('pool.Pooled')}} {{item.token1.name}}</div>
              <div class="value">{{token1Balance.toFixed(6)}}</div>
            </div>
            <div class="item">
              <div class="key">{{$t('pool.Pooled')}} {{item.token2.name}}</div>
              <div class="value">{{token2Balance.toFixed(6)}}</div>
            </div>
            <div class="item">
              <div class="key">{{$t('pool.Yops')}}</div>
              <div class="value">{{(share*100).toFixed(2)}}%</div>
            </div>
            <div class="item" style="padding:10px 0;">
                <el-button class="btn create" style="flex:1;margin-right:10px;" @click="toPool(item)">{{$t('pool.Add')}}</el-button>
                <el-button class="btn" style="flex:1;background:fff;
border-image: linear-gradient(90deg, rgba(255, 142, 24, 1), rgba(255, 109, 15, 1), rgba(255, 72, 4, 1)) 1 1;
border: 1px solid;
color: #FF652B;"  @click="toRemove(item)">{{$t('pool.Remove')}}</el-button>
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
        name: 'addLiquidity',
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
