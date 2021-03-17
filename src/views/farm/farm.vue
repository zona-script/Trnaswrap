<template>
  <div id="farm" class="farm">
    <!-- 弹窗 -->
    <deposit-withdraw :show="showDepositWithdraw" :isDeposit='isDeposit' :isWithdraw='isWithdraw' selectedIndex='deposit' :tnsBalance='tnsBalance' :userInfo='userInfoData' @deposit='toDeposit' @withdraw='toWithdraw' @close="depositWithdrawClose"></deposit-withdraw>
    <div class="farm-content-1">
      <div class="tns-pool">
        <img :src="require('@/themes/images/common/icon03@2x.png')" alt="" />
        <div class="txt">{{$t('lang6')}}</div>
      </div>
      <div class="tns-pool-con">
        <div class="pool-info">
          <div class="info-item important">
            <div class="key">{{$t('lang7')}}</div>
            <div class="value">
              <div class="num">{{userInfoData.lockAmount}}</div>
              <div class="unit">TNS</div>
            </div>
          </div>
          <div class="info-item">
            <div class="key">{{$t('Exc.Balance')}}</div>
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
        <el-button :loading="false" class="btn confirm" @click="showDepositWithdraw=true">{{$t('lang42')}}</el-button>
      </div>
    </div>
    <div class="farm-content-2">
      <div class="statistics-title">{{$t('lang8')}}</div>
      <div class="pool-info">
        <div class="info-item">
          <div class="key">{{$t('lang9')}}</div>
          <div class="value">{{userInfoData.depositTotal}}</div>
        </div>
        <div class="info-item">
          <div class="key">{{$t('lang10')}}</div>
          <div class="value">{{userInfoData.withdrawTotal}}</div>
        </div>
        <div class="info-item">
          <div class="key">{{$t('lang11')}}</div>
          <div class="value">{{userInfoData.unlockTime}}</div>
        </div>
        <div class="info-item">
          <div class="key">200% {{$t('lang14')}}</div>
          <div class="value">{{userInfoData.lockAmount}}</div>
        </div>
        <div class="info-item">
          <div class="key">{{$t('lang45')}}</div>
          <div class="value">{{parseFloat(userInfoData.staticIncome).toFixed(2)}}</div>
        </div>
        <div class="info-item">
          <div class="key">{{$t('lang46')}}</div>
          <div class="value">{{parseFloat(userInfoData.teamAmount).toFixed(2)}}</div>
        </div>
        <div class="info-item">
          <div class="key">{{$t('lang13')}}</div>
          <div class="value">{{userInfoData.notExtractedIncome}}</div>
        </div>
        <div class="info-item">
          <div class="key">{{$t('lang47')}}</div>
          <div class="value">{{userInfoData.canExtractedIncome}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BigNumber from 'bignumber.js'
import ipConfig from '../../config/contracts'
import { approved, allowance, getConfirmedTransaction } from '../../utils/tronwebFn'
import { getPools,doDeposit,userInfo,doWithdraw,getInvitedAddress,doWithdrawByTxid } from '@/api/api'
export default {
  name: 'Farm',
  data() {
    return {
      showDepositWithdraw: false,
      collapse: true,
      tnsContract:null,
      tnsBalance:0,
      approveTnsBalance:0,
      userInfoData:{},
      claimHasNum:0,
      isWithdraw:false,
      isDeposit:false
    }
  },
  created(){
    
  },
  mounted(){
    this.getPool()
    this.init()
    this.getUserInfo()
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
        that.tnsBalance = res/Math.pow(10,8)
      } catch (error) {
        console.log(error)
      }
    },
    toDeposit(num){
      const that = this
      getInvitedAddress().then(result => {
          if (result.data.code == 0) {
            if (result.data.data) {
              that.deposit(num)
            } else {
              that.$message.error('邀请人不存在')
            }
          }
        })
      
      // allowance(ipConfig.TnsAddress, ipConfig.TnsAddress).then((res) => {
      //   if (res) {
      //     if(res._hex){
      //       that.approveTnsBalance = parseInt(res._hex,16)
      //     }else if(res.constant_result){
      //       that.approveTnsBalance = parseInt(res.constant_result[0],16)
      //     }else if(res.remaining){
      //       that.approveTnsBalance = parseInt(res.remaining._hex,16)
      //     }
      //     if (that.approveTnsBalance == 0) {
      //       approved(ipConfig.TnsAddress, ipConfig.TnsAddress).then(res => {
      //         that.deposit(num)
      //       })
      //     } else {
      //       that.deposit(num)
      //     }
      //   }
      // })
    },
    toWithdraw(){
      const that = this
      this.isWithdraw = true
      doWithdraw().then(res=>{
        if(res.data.code == 0){
          that.$message.success('合约调取中请稍等')
          setTimeout(function(){
            that.getClaimNum()
          },5000)
          
        }else{
          that.isWithdraw = false
          that.$message.success(res.data.msg)
        }
      })
      
      
    },
    async toWithdrawByhash(){
      const that = this
      let func = 'claim(uint256)'
      let transnum = new BigNumber(this.claimHasNum)
      let params = [
        {'type':'uint256','value':transnum.toFixed()}
      ]
      let transfer = await window.tronWeb.transactionBuilder.triggerSmartContract(ipConfig.TnsAddress,func, {},params)
      window.tronWeb.trx.sign(transfer.transaction).then(function(signedTransaction) {
        window.tronWeb.trx
          .sendRawTransaction(signedTransaction)
          .then(function(res) {
            let claimHasNum = new BigNumber(that.claimHasNum)
            claimHasNum = claimHasNum.div(Math.pow(10,8))
            let data = {
              txhash:res.txid,
              amount:claimHasNum.toFixed()
            }
            setTimeout(function(){
              doWithdrawByTxid(data).then(res=>{
                if(res.data.code == 0){
                  that.$message.success('提取收益成功')
                  window.location.reload()
                }else{
                  that.$message.success(res.data.msg)
                }
                that.isWithdraw = false
              })
            },5000)
          })
      })
    },
    async deposit(num){
      let that = this
      this.isDeposit = true
      let oneToken = sessionStorage.getItem('oneToken')
      if(!oneToken){
        that.$message.error('邀请人不存在')
        this.isDeposit = false
        return
      }
      if(num<10){
        that.$message.error('质押不得少于10个TNS')
        this.isDeposit = false
        return
      }
      let func = 'pledge(uint256)'
      let transnum = new BigNumber(num)
      transnum = transnum.times(Math.pow(10,8))
      let params = [
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
            setTimeout(function(){
              doDeposit(data).then(res=>{
                if(res.data.code == 0){
                  that.$message.success('质押成功')
                }else{
                  that.$message.success('质押失败')
                }
                window.location.reload()
                that.isDeposit = false
              })
            },5000)
          })
      })
    },
    getUserInfo(){
      let that = this
      userInfo().then(res=>{
        if(res.data.code==0){
          if(res.data.data.notExtractedIncome>(res.data.data.depositTotal*2)){
            res.data.data.canExtractedIncome = res.data.data.depositTotal*2-res.data.data.withdrawTotal
          }else{
            res.data.data.canExtractedIncome = res.data.data.notExtractedIncome
          }
          that.userInfoData = res.data.data
        }else if(res.data.code==401){
          window.location.reload()
        }
      })
    },
    async getClaimNum(){
      let that = this
      window.tronWeb.contract().at(ipConfig.TnsAddress).then((Contract) => {
        Contract['claimOf'](window.tronWeb.defaultAddress.base58).call().then((res) => {
          if (res) {
            that.claimHasNum = parseInt(res._hex,16)
            that.toWithdrawByhash()
          }
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
     