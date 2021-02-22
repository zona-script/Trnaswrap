<template>
  <div id="farm" class="farm">
    <!-- 弹窗 -->
    <deposit-withdraw :show="showDepositWithdraw" selectedIndex='deposit' :tnsBalance='tnsBalance' @deposit='toDeposit' @close="depositWithdrawClose"></deposit-withdraw>
    <div class="farm-content-1">
      <div class="tns-pool">
        <img :src="require('@/themes/images/menu/image_02.png')" alt="" />
        <div class="txt">TNS Pool</div>
      </div>
      <div class="tns-pool-con">
        <div class="pool-info">
          <div class="info-item important">
            <div class="key">Locked position</div>
            <div class="value">
              <div class="num">100</div>
              <div class="unit">TNS</div>
            </div>
          </div>
          <div class="info-item">
            <div class="key">balance</div>
            <div class="value">
              <div class="num">{{tnsBalance}}</div>
              <div class="unit">TNS</div>
            </div>
          </div>
          <div class="info-item">
            <div class="key">APY</div>
            <div class="value">
              <div class="num">200</div>
              <div class="percent">%</div>
            </div>
          </div>
        </div>
        <el-button :loading="false" class="btn confirm" @click="showDepositWithdraw=true">Select</el-button>
      </div>
    </div>
    <div class="farm-content-2">
      <div class="statistics-title">statistics</div>
      <div class="pool-info">
        <div class="info-item">
          <div class="key">Total number of TNS deposited</div>
          <div class="value">0.00%</div>
        </div>
        <div class="info-item">
          <div class="key">Total amount of TNS withdrawn</div>
          <div class="value">0.00%</div>
        </div>
        <div class="info-item">
          <div class="key">Time Countdown Benefit</div>
          <div class="value">0.00%</div>
        </div>
        <div class="info-item">
          <div class="key">200% income</div>
          <div class="value">0.00%</div>
        </div>
        <div class="info-item">
          <div class="key">Daily income</div>
          <div class="value">0.00%</div>
        </div>
        <div class="info-item">
          <div class="key">Direct revenue</div>
          <div class="value">0.00%</div>
        </div>
        <div class="info-item">
          <div class="key">Team benefits</div>
          <div class="value">0.00%</div>
        </div>
        <div class="info-item">
          <div class="key">Unclaimed income</div>
          <div class="value">0.00%</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BigNumber from 'bignumber.js'
import ipConfig from '../../config/contracts'
import { approved, allowance, getConfirmedTransaction } from '../../utils/tronwebFn'
import { getPools,doDeposit } from '@/api/api'
export default {
  name: 'Farm',
  data() {
    return {
      showDepositWithdraw: false,
      collapse: true,
      tnsContract:null,
      tnsBalance:0,
      approveTnsBalance:0
    }
  },
  created(){
    this.getPool()
    this.init()
  },
  methods: {
    init() { // 初始化tronweb
      const that = this
      this.$initTronWeb().then(function(tronWeb) {
        that.getTnsContract()
      })
    },
    collapseFunc() {
      this.collapse = !this.collapse
    },
    depositWithdrawClose() {
      console.log('test')
      this.showDepositWithdraw = false
    },
    getPool(){
      getPools().then(res=>{
        console.log(res.data)
      })
    },
    async getTnsContract() { // 链接tns合约
      this.tnsContract = await window.tronWeb.contract().at(ipConfig.TnsAddress)
      if (this.tnsContract) {
        this.getTns()
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
    toDeposit(num){
      const that = this
      allowance(ipConfig.TnsAddress, ipConfig.TnsAddress).then((res) => {
        if (res) {
          if(res._hex){
            that.approveTnsBalance = parseInt(res._hex,16)
          }else if(res.constant_result){
            that.approveTnsBalance = parseInt(res.constant_result[0],16)
          }else if(res.remaining){
            that.approveTnsBalance = parseInt(res.remaining._hex,16)
          }
          if (that.approveTnsBalance == 0) {
            approved(ipConfig.TnsAddress, ipConfig.TnsAddress).then(res => {
              that.deposit(num)
            })
          } else {
            that.deposit(num)
          }
        }
      })
    },
    async deposit(num){
      let that = this
      let func = 'transfer(address,uint256)'
      let transnum = new BigNumber(num)
      transnum = transnum.times(Math.pow(10,6))
      let params = [
        {'type':'address','value':'TA6mdQTHYA6orGU2Wj97BXDThHjntCwXE4'},
        {'type':'uint256','value':transnum.toFixed()}
      ]
      let transfer = await window.tronWeb.transactionBuilder.triggerSmartContract(ipConfig.TnsAddress,func, {},params)
      window.tronWeb.trx.sign(transfer.transaction).then(function(signedTransaction) {
        window.tronWeb.trx
          .sendRawTransaction(signedTransaction)
          .then(function(res) {
            let data = {
              address:window.tronWeb.defaultAddress.base58,
              amount:num,
              txhash:res.txid
            }
            doDeposit(data).then(res=>{
              if(res.data.code == 0){
                
              }
            })
          })
      })
    }
  }  
}
</script>
<style lang="less">
@import '@/themes/style/button.less';
@import '@/themes/style/farm.less';
</style>
