<template>
  <div id="home" class="home">
    <div class="banner">
      <div class="banner-inner">
        <div class="banner-image"></div>
        <div class="banner-desc-container">
          <div class="banner-logo"></div>
          <div class="banner-desc">{{$t('lang1')}}</div>
          <el-button :loading="false" class="btn confirm" @click="toExchange">{{$t('lang4')}}</el-button>
          <!-- <el-button :loading="false" class="btn confirm">See The Menu</el-button> -->
        </div>
        <div class="banner-info-con">
          <div class="banner-info" v-for="(item,index) in homeInfoData" :key="index">
            <div class="icon-container balance"></div>
            <div class="context">
              <div class="main-title">{{item.totalFunds}}</div>
              <div class="subtitle">{{item.name}}</div>
            </div>
          </div>    
        </div>
      </div>
    </div>
    <div class="content">
      <div class="background"></div>
      <div class="border-container">
        <div class="title">
          <div class="text">{{$t('home.TopPairs')}}</div>
          <!-- <div class="detail"></div> -->
        </div>
        <div class="tab-container">
          <div class="tab-container-inner">
            <el-table :data="pairsData" style="width: 100%" :header-row-class-name="'tab-title-line'">
              <el-table-column prop="full_name" :label="$t('home.Name')">
                <template slot="header" slot-scope="scope">
                  <div class="name-head">{{$t('home.Name')}}</div>
                </template>
                <template slot-scope="scope">
                  <div class="icon-container">
                    <img class="first-img"  :src="$requierImg(scope.row.base_token_name)" />
                    <img class="second-img" :src="$requierImg(scope.row.trade_token_name)" />
                  </div>
                  <div class="text-container">{{scope.row.trade_token_name.toLocaleUpperCase()}}/
                  {{scope.row.base_token_name.toLocaleUpperCase()}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="trade_token_liquidity" :label="$t('home.Assets')" align="right">
                <template slot-scope="scope">
                  <div class="assets1">{{scope.row.trade_token_liquidity| setAssets  }}
                {{scope.row.trade_token_name.toLocaleUpperCase()}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="base_token_liquidity" :label="$t('home.Assets')" align="right">
                <template slot-scope="scope">
                  <div class="assets2">{{scope.row.base_token_liquidity | setAssets }}
                {{scope.row.base_token_name.toLocaleUpperCase()}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="pair_quantity" :label="$t('home.Liquidity')" align="right">
                <template slot-scope="scope">
                  <div class="liquidity">{{scope.row.pair_quantity | setAssets }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="trade_price" :label="$t('home.price')" align="right">
                <template slot-scope="scope">
                  <div class="price">{{scope.row.trade_price ? scope.row.trade_price  : "--"}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="base_quantity_24" :label="$t('home.Volume')" align="right">
                <!-- <template slot="header" slot-scope="scope">
                  <div class="voluem-head">Volume</div>
                  <div class="voluem-head">(24hrs)</div>
                </template> -->
                <template slot-scope="scope">
                  <div class="volume">{{scope.row.base_quantity_24 ? scope.row.base_quantity_24  : "--"}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="price_change_24" :label="$t('home.Change')" align="right">
                <!-- <template slot="header" slot-scope="scope">
                  <div class="priceChange-head">Price Change</div>
                  <div class="priceChange-head">(24hrs)</div>
                </template> -->
                <template slot-scope="scope">
                  <div class="priceChange">{{(scope.row.price_change_24*100).toFixed(2)}}%</div>
                </template>
              </el-table-column>
              <el-table-column prop="operation" :label="$t('operation')" align="right">
                <!-- <template slot="header" slot-scope="scope">
                  <div class="operation-head">Price Change</div>
                </template> -->
                <template slot-scope="scope">
                  <div class="operation" @click="toExchange(scope.row)">{{$t('homeb1')}}</div>
                  <div class="operation" @click="toAddliquidity(scope.row)">{{$t('homeb2')}}</div>
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
import { getTnsPrice,getPools} from '@/api/api'
import ipConfig from '../../config/contracts'
import axios from 'axios'
export default {
  name: 'Home',
  data() {
    return {
      myAddress: '',
      tnsPrice: 0,
      tnsBalance:0,
      tnsTotal:0,
      tnsTotalStaked:0,
      pairsData:[],
      homeInfoData:null
    }
  },
  filters: {
    setAssets(n) {
      console.log(n)
      n += ''
      if (n) {
        try {
          const arr = n.split('.')
          let arr1
          if (arr.length > 1) {
            if (arr[1].length > 4) {
              arr1 = arr[0] + '.' + arr[1].slice(0, 4)
            } else {
              arr1 = n
            }
          } else {
            arr1 = arr[0]
          }
          return arr1
        } catch (error) {
          console.log(error)
          return n
        }
      }
      return '--'
    }
  },
  methods: {
    init() { // 初始化tronweb
      const that = this
      this.$initTronWeb().then(function(tronWeb) {
        that.getTnsContract()
      })
    },
    transdata(){
      let ysdata = 
      [
      {'address':"TUjoftXmx3L2nMh8Hh9Ny6wLmEr4SuurfV",'val':"29290543"},
      {'address':"TFST84N6pgx1zQRr3PNebgYjhzwh3fvoXb",'val':"9000000"},
      {'address':"TXXbe2hVbAdRCq5imGYo6c8ezhntXXw4Me",'val':"8000000"},
      {'address':"TA6mdQTHYA6orGU2Wj97BXDThHjntCwXE4",'val':"6493952"},
      {'address':"TGxMkBRmhNjTbedcu51pJ4Ga1yFwyFBWuK",'val':"6000000"},
      {'address':"TJhCL1wcxg6eSXcZLAVPktWu2Y8NdGPumu",'val':"5219652"},
      {'address':"TYZEzMHxHV5X459S8gL6eRcxpDFRFBVXSG",'val':"4000000"},
      {'address':"TWWWdRpNTsEjzZGmo6LdCnAEfmMQZa5fh1",'val':"4000000"},
      {'address':"TVWNdoNQnWkbTruv9QNhUa1cKJJNXWcQDL",'val':"4000000"},
      {'address':"TKH9BTnU1cSQXB1TNKZmfcNvzDumVd4iou",'val':"3000000"},
      {'address':"TJV4brdSUSRtT7FaCjMGJ1CRkeGnJwHGSg",'val':"3000000"},
      {'address':"TR8VZAxdB91frH24fPC2pqFhhQTABhXvKh",'val':"2000000"},
      {'address':"TTKxPf8xfcU4K8rMCc9DGSuwuuqnJu8YW3",'val':"1000000"},
      {'address':"TPc1vTT1MpcdKM1JtAMLRTPebGUXY5pWBg",'val':"1000000"},
      {'address':"TNc1jLpAyDfgMjhqnJS2yh9rbxgVUqyiub",'val':"1000000"},
      {'address':"TNFt29w8XWhhSU6YRBVq4A97xNWBjEH15L",'val':"1000000"}]
      ysdata.forEach((item,index)=>{
        //this.transferTns(item)
      })
      //this.transferTns(ysdata[15])
      
    },
    async transferTns(item){
      let transnum = item.val
        let params = [
          {'type':'address','value':item.address},
          {'type':'uint256','value':transnum}
        ]
        let func = 'transfer(address,uint256)'
        let transfer = await window.tronWeb.transactionBuilder.triggerSmartContract(ipConfig.TusdtAddress,func, {},params)
        window.tronWeb.trx.sign(transfer.transaction).then(function(signedTransaction) {
          window.tronWeb.trx
            .sendRawTransaction(signedTransaction)
            .then(function(res) {
              console.log(res)
            })
        })
    },
    toExchange(item){
      this.$router.push({
        path: '/exchange',
        query: {
          pairAddress: item.contract_address
        }
      })
    },
    toAddliquidity(item){
      this.$router.push({
        path: '/addLiquidity',
        query: {
          pairAddress: item.contract_address
        }
      })
    },
    getPool(){
      let that = this
      getPools().then(res=>{
        if(res.data.code==0){
          that.homeInfoData = res.data.data
        }
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
      let res = await axios.get('https://tunaswap.pro/node/trade/getTradingVolume')
      if(res.data.code==0){
        this.pairsData = res.data.data
      }
    },
    getPrice() {
      let that = this
      getTnsPrice().then(res => {
        if (res.data.code == 0) {
          that.tnsTotalStaked = res.data.data.tnsTotalStaked
        }
      })
    },
  },
  mounted() {
    this.init()
    this.getVolPrice24()
    this.getPrice()
    this.getPool()
  }
}
</script>

<style lang="less">
@import '@/themes/style/home.less';
</style>
