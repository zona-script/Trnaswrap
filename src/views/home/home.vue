<template>
  <div id="home" class="home">
    <div class="banner">
      <div class="banner-inner">
        <div class="banner-image"></div>
        <div class="banner-desc-container">
          <div class="banner-logo"></div>
          <div class="banner-desc">Deposit Tns Tokens and Share Trading Fees Forever</div>
          <el-button :loading="false" class="btn confirm">Go to exchange</el-button>
          <el-button :loading="false" class="btn confirm">See The Menu</el-button>
        </div>
        <div class="banner-info-con">
          <div class="banner-info">
            <div class="icon-container balance"></div>
            <div class="context">
              <div class="main-title">{{tnsBalance}}</div>
              <div class="subtitle">My Tns Balance</div>
            </div>
          </div>
          <div class="banner-info">
            <div class="icon-container supply"></div>
            <div class="context">
              <div class="main-title">{{tnsTotal}}</div>
              <div class="subtitle">Current Total Supply</div>
            </div>
          </div>
          <div class="banner-info">
            <div class="icon-container staked"></div>
            <div class="context">
              <div class="main-title">0.00</div>
              <div class="subtitle">Total Staked</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="background"></div>
      <div class="border-container">
        <div class="title">
          <div class="text">Top Pairs</div>
          <!-- <div class="detail"></div> -->
        </div>
        <div class="tab-container">
          <div class="tab-container-inner">
            <el-table :data="pairsData" style="width: 100%" :header-row-class-name="'tab-title-line'">
              <el-table-column prop="name" label="Name">
                <template slot="header" slot-scope="scope">
                  <div class="name-head">Name</div>
                </template>
                <template slot-scope="scope">
                  <div class="icon-container">
                    <img class="first-img" :src="scope.row.firstImg" />
                    <img class="second-img" :src="scope.row.secondImg" />
                  </div>
                  <div class="text-container">{{ scope.row.firstType + ' /' + scope.row.secondType }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="assets1" label="Assets" align="right">
                <template slot-scope="scope">
                  <div class="assets1">{{ scope.row.assets1 + ' ' + scope.row.unit1 }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="assets2" label="Assets" align="right">
                <template slot-scope="scope">
                  <div class="assets2">{{ scope.row.assets2 + ' ' + scope.row.unit2 }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="liquidity" label="Liquidity" align="right">
                <template slot-scope="scope">
                  <div class="liquidity">{{ scope.row.liquidity }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="price" label="Price" align="right">
                <template slot-scope="scope">
                  <div class="price">{{ scope.row.price }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="volume" label="Volume(24hrs)" align="right">
                <template slot="header" slot-scope="scope">
                  <div class="voluem-head">Volume</div>
                  <div class="voluem-head">(24hrs)</div>
                </template>
                <template slot-scope="scope">
                  <div class="volume">{{ scope.row.volume }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="priceChange" label="Price Change(24hrs)" align="right">
                <template slot="header" slot-scope="scope">
                  <div class="priceChange-head">Price Change</div>
                  <div class="priceChange-head">(24hrs)</div>
                </template>
                <template slot-scope="scope">
                  <div class="priceChange">{{ scope.row.priceChange }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="operation" label="Operation" align="right">
                <template slot="header" slot-scope="scope">
                  <div class="operation-head">Price Change</div>
                </template>
                <template slot-scope="scope">
                  <div class="operation">{{ scope.row.operationExchange }}</div>
                  <div class="operation">{{ scope.row.operationAddLiquidity }}</div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <tool-icon></tool-icon>
    </div>
  </div>
</template>

<script>
import ipConfig from '../../config/contracts'
import axios from 'axios'
export default {
  name: 'Home',
  props: {
    pairsData: {
      default: () => [
        {
          firstImg: require('@/themes/images/home/a.png'),
          secondImg: require('@/themes/images/home/b.png'),
          firstType: 'WTRX',
          secondType: 'USDT',
          name: '',
          assets1: '82719.4073',
          unit1: 'WTRX',
          assets2: '82719.4073',
          unit2: 'USDT',
          liquidity: '5048.4546',
          price: '0.028658',
          volume: '--',
          priceChange: '--%',
          operationExchange: 'Exchange',
          operationAddLiquidity: 'AddLiquidity'
        }
      ]
    }
  },
  data() {
    return {
      myAddress: '',
      myInviterAddress: '',
      myInvitationLink: '',
      tnsPrice: 0,
      tnsBalance:0,
      tnsTotal:0
    }
  },
  methods: {
    init() { // 初始化tronweb
      const that = this
      this.$initTronWeb().then(function(tronWeb) {
        that.getTnsContract()
      })
    },
    async getTnsContract() { // 链接tusdt合约
      this.tnsContract = await window.tronWeb.contract().at(ipConfig.TnsAddress)
      if (this.tnsContract) {
        this.getTns()
        this.getTotalTns()
      }
    },
    async getTns() { // 获取wtrxbalance
      const that = this
      try {
        const res = await that.tnsContract['balanceOf'](window.tronWeb.defaultAddress.base58).call()
        that.tnsBalance = res/Math.pow(10,6)
      } catch (error) {
        console.log(error)
      }
    },
    async getTotalTns() { // 获取wtrxbalance
      const that = this
      try {
        const res = await that.tnsContract['totalSupply']().call()
        that.tnsTotal = res/Math.pow(10,6)
      } catch (error) {
        console.log(error)
      }
    },
    async getVolPrice24() { 
      let res = await axios.get('http://chixin157.55555.io/api/trade/getTradingVolume')
      if(res){

      }
    }
    
  },
  mounted() {
    this.init()
    this.getVolPrice24()
  }
}
</script>

<style lang="less">
@import '@/themes/style/home.less';
</style>
