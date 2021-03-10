<template>
  <div id="convert" class="convert">
    <!-- <headTitle></headTitle> -->
    <div class="content-wrap">
      <div class="background"></div>
      <div class="title">{{$t('lang5')}}</div>
      <div class="pannel-info pd">
        <div class="tabs-container">
          <div @click="singleSet" class="tabs fir" :class="assetMode ? '' : 'active'">USDT - TUSD</div>
          <div @click="doubleSet" class="tabs sec" :class="assetMode ? 'active' : ''">TUSD - USDT</div>
        </div>
        <!-- <div class="title-inner">Convert</div> -->
        <div class="convert-container">
          <div class="convert-box convert-1" :class="assetMode ? 'toggle' : ''">
            <div class="form-view bd">
              <div class="img-text-wrap">
                <img class="img" :src="require('@/themes/images/common/token_04_2x.png')" />
                <span class="img-text">USDT - TUSD</span>
                <img class="img res" :src="require('@/themes/images/common/token_04_2x.png')" />
              </div>
            </div>
            <div class="form-view">
              <div class="form-view-item clearfix mt">
                <div class="form-view-item-top">
                  <div class="max-num">
                    <span class="max-wrap" @click="trxNum = trxBalance">MAX</span>
                    <div class="input-wrap">
                      <input class="num"
                         type="number" 
                         v-model="trxNum" 
                         :disabled="inputdisabled1" 
                         onKeypress="return (/[\d,.]/.test(String.fromCharCode(event.keyCode)))"
                         placeholder="Please enter the amout of TUSD"
                         />
                    </div>
                  </div>
                </div>
                <div class="balance-wrap">
                  <div class="balance">
                    <span class="img"></span>
                    <span class="balance-text">{{$t('Exc.Balance')}}</span>
                  </div>
                  <span class="num">{{trxBalance}}</span>
                </div>
              </div>
            </div>
            <div class="convert-box-title">{{$t('wtrx.yog')}}</div>
            <div class="result">
              <div class="key">
                <img :src="require('@/themes/images/common/token_02_2x.png')" alt="" />
                <div class="txt">TUSD</div>
              </div>
              <div class="num">{{trxNum?trxNum:'0'}}</div>
            </div>
            <el-button  :loading="btnLoading1" :disabled="btnDisabled1" @click="getUsdtAllowance" class="btn create mt50">{{$t('confirm')}}</el-button>
          </div>
          <div class="split"></div>
          <div class="convert-box convert-2" :class="assetMode ? '' : 'toggle'">
            <div class="form-view bd">
              <div class="img-text-wrap">
                <img class="img" :src="require('@/themes/images/common/token_04_2x.png')" />
                <span class="img-text">TUSD - USDT</span>
                <img class="img res" :src="require('@/themes/images/common/token_04_2x.png')" />
              </div>
            </div>
            <div class="form-view">
              <div class="form-view-item clearfix mt">
                <div class="form-view-item-top">
                  <div class="max-num">
                    <span class="max-wrap" @click="wtrxNum = wtrxBalance">MAX</span>
                    <div class="input-wrap">
                      <input class="num"
                         type="number" 
                         v-model="wtrxNum" 
                         :disabled="inputdisabled1" 
                         onKeypress="return (/[\d,.]/.test(String.fromCharCode(event.keyCode)))"
                         placeholder="Please enter the amout of USDT"
                         />
                    </div>
                  </div>
                </div>
                <div class="balance-wrap">
                  <div class="balance">
                    <span class="img"></span>
                    <span class="balance-text">{{$t('Exc.Balance')}}</span>
                  </div>
                  <span class="num">{{wtrxBalance}}</span>
                </div>
              </div>
            </div>
            <div class="convert-box-title">You will get</div>
            <div class="result">
              <div class="key">
                <img :src="require('@/themes/images/common/token_02_2x.png')" alt="" />
                <div class="txt">USDT</div>
              </div>
              <div class="num">{{wtrxNum?wtrxNum:0}}</div>
            </div>
            <el-button class="btn create mt50" :loading="btnLoading2" :disabled="btnDisabled2" @click="changeTrx">{{$t('confirm')}}</el-button>
          </div>
        </div>
      </div>
      <tool-icon></tool-icon>
    </div>
    <TransactionSubmit :show="showAlert" :url="typeUrl" @transaction-close='showAlert=false' @cancel='reloadWindow'></TransactionSubmit>
  </div>
</template>
<script>
import BigNumber from 'bignumber.js'
import ipConfig from '../../config/contracts'
import { approved, allowance, getConfirmedTransaction } from '../../utils/tronwebFn'
import TransactionSubmit from '../../components/TransactionSubmit'
export default {
  name: 'Convert',
  components: {
    TransactionSubmit
  },
  data() {
    return {
      assetMode: true,
      wtrxContract: null,
      trxBalance: 0,
      wtrxBalance: 0,
      approveBalance: 0,
      trxNum: null,
      wtrxNum: null,
      btnDisabled1: true,
      btnDisabled2: true,
      inputdisabled1: true,
      inputdisabled2: true,
      btnLoading1: false,
      btnLoading2: false,
      proNmae: 'Confirm',
      showAlert: false,
      typeName: 'success',
      stup: 1,
      typeUrl: '',
      approveUsdtBalance:0,
      usdtContract:null
    }
  },
  watch: {
    trxNum(value) {
      this.trxNum = this.inputType(this.trxNum)
      if (value != '') {
        if (parseFloat(value) <= parseFloat(this.trxBalance)) {
          this.btnDisabled1 = false
          return
        }
        this.btnDisabled1 = true
      } else {
        this.btnDisabled1 = true
      }
    },
    wtrxNum(value) {
      this.wtrxNum = this.inputType(this.wtrxNum)
      if (value != '') {
        if (parseFloat(value) <= parseFloat(this.wtrxBalance)) {
          this.btnDisabled2 = false
          return
        }
        this.btnDisabled2 = true
      } else {
        this.btnDisabled2 = true
      }
    }
  },
  methods: {
    reloadWindow(){
      window.location.reload()
    },
    singleSet() {
      this.assetMode = false
    },
    doubleSet() {
      this.assetMode = true
    },
    init() { // 初始化tronweb
      const that = this
      this.$initTronWeb().then(function(tronWeb) {
        that.getWtrxContract()
        that.getUsdtContract()
      })
    },
    async gettrx() {
      const that = this
      try {
        const res = await that.usdtContract['balanceOf'](window.tronWeb.defaultAddress.base58).call()
        that.trxBalance = res/Math.pow(10,6)
        if(that.trxBalance>0){
          that.inputdisabled1 = false
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getUsdtContract() { // 链接usdt合约
      this.usdtContract = await window.tronWeb.contract().at(ipConfig.UsdtAddress)
      if (this.usdtContract) {
        this.gettrx()
      }
    },
    async getWtrxContract() { // 链接tusdt合约
      this.wtrxContract = await window.tronWeb.contract().at(ipConfig.TusdtAddress)
      if (this.wtrxContract) {
        this.getWtrx()
      }
    },
    async getWtrx() { // 获取wtrxbalance
      const that = this
      try {
        const res = await that.wtrxContract['balanceOf'](window.tronWeb.defaultAddress.base58).call()
        that.wtrxBalance = res/Math.pow(10,6)
        this.inputdisabled1 = false
        this.inputdisabled2 = false
      } catch (error) {
        console.log(error)
      }
    },
    async changeWtrx() { // 兑换wtrx
      const that = this
      this.loading1(1)
        let trxNum = new BigNumber(that.trxNum)
        trxNum = trxNum.times(Math.pow(10,6))
        const functionSelector = 'deposit(address,uint256)'
        const options = {}
        const parameter = [
          { type: 'address', value: ipConfig.UsdtAddress },
          { type: 'uint256', value: trxNum.toFixed() }
        ]
        const transaction = await window.tronWeb.transactionBuilder.triggerSmartContract(ipConfig.TusdtAddress, functionSelector, options, parameter)
        if (!transaction.result || !transaction.result.result) {
          that.loading1()
          return console.error('Unknown error: ' + transaction, null, 2)
        }
        window.tronWeb.trx.sign(transaction.transaction).then(function(signedTransaction) {
          window.tronWeb.trx.sendRawTransaction(signedTransaction).then(function(res) {
            that.loading1()
            that.$message.success('Success')
            that.showAlert = true
          })
        })    
    },

    getUsdtAllowance(){
      const that = this
      that.loading1(1)
      allowance(ipConfig.UsdtAddress, ipConfig.TusdtAddress).then((res) => {
        if (res) {
          if(res._hex){
            that.approveUsdtBalance = parseInt(res._hex,16)
          }else if(res.constant_result){
            that.approveUsdtBalance = parseInt(res.constant_result[0],16)
          }else if(res.remaining){
            that.approveUsdtBalance = parseInt(res.remaining._hex,16)
          }
          if (that.approveUsdtBalance == 0) {
            approved(ipConfig.UsdtAddress, ipConfig.TusdtAddress).then(res => {
              that.changeWtrx()
            })
          } else {
            that.changeWtrx()
          }
        } else {
          that.loading1()
        }
      })
    },
    getAllowance() { // 查询授权
      const that = this
      that.loading2(1)
      allowance(ipConfig.wtrxAddress, ipConfig.wtrxAddress).then((res) => {
        if (res) {
          that.approveBalance = parseInt(res._hex ? res._hex : res.constant_result[0], 16)
          if (that.approveBalance == 0 || window.tronWeb.toSun(this.wtrxNum) > that.approveBalance) {
            // alert('    ');
            if (that.proNmae == 'approved') {
              that.loading2(1)
              // that.showAlert = true;
              approved(ipConfig.wtrxAddress, ipConfig.wtrxAddress).then(res => {
                console.log(res)
                that.proNmae = 'Confirm'
                that.loading2(0)
              }).catch(() => {
                that.$message.error('privilege grant failed')
                that.loading2(0)
              })
            } else {
              if (that.stup == 1) {
                that.proNmae = 'approved'
                that.loading2(0)
                that.stup += 1
              } else {
                that.changeTrx()
              }
            }
          } else {
            that.changeTrx()
          }
        } else {
          that.loading2()
        }
      })
    },
    async changeTrx() { // 兑换trx
      const that = this
      const functionSelector = 'withdraw(uint256)'
      const options = {}
      that.loading2(1)
      let wtrxNum = new BigNumber(this.wtrxNum) 
      wtrxNum = wtrxNum.times(Math.pow(10,6))
      const parameter = [{ type: 'uint256', value: wtrxNum.toFixed() }]
      try {
        const transaction = await window.tronWeb.transactionBuilder.triggerSmartContract(ipConfig.TusdtAddress, functionSelector, options, parameter)
        if (!transaction.result || !transaction.result.result) {
          that.loading2(0)
          return console.error('Unknown error: ' + transaction, null, 2)
        }
        window.tronWeb.trx.sign(transaction.transaction).then(function(signedTransaction) {
          window.tronWeb.trx.sendRawTransaction(signedTransaction).then(function(res) {
            that.getWtrx()
            that.gettrx()
            that.loading2(0)
            that.showAlert = true
            that.typeUrl = 'https://shasta.tronscan.org/#/transaction/' + res.txid
          })
        })
      } catch (error) {
        that.loading2(0)
        console.log(error)
      }
    },
    loading1(n) {
      if (n) {
        this.btnLoading1 = true
        this.btnDisabled1 = true
      } else {
        this.btnLoading1 = false
        this.btnDisabled1 = false
      }
    },
    loading2(n) {
      if (n) {
        this.btnLoading2 = true
        this.btnDisabled2 = true
      } else {
        this.btnLoading2 = false
        this.btnDisabled2 = false
      }
    },
    inputType(n) {
      if (n.indexOf('.') != -1) {
        const str = n.split('.')
        if (str[1].length > 8) {
          n = str[0] + '.' + str[1].slice(0, 8)
          return n
        }
      }
      return n
    }
  },
  mounted() {
    this.init()
  }
}
</script>
<style lang="less">
@import '@/themes/style/button.less';
@import '@/themes/style/pannel.less';
@import '@/themes/style/formview.less';
@import '@/themes/style/convert.less';
</style>
