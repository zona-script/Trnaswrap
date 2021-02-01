<template>
  <div id="convert" class="convert">
    <!-- <headTitle></headTitle> -->
    <div class="content-wrap">
      <div class="background"></div>
      <div class="title">Convert</div>
      <div class="pannel-info pd">
        <div class="tabs-container">
          <div @click="singleSet" class="tabs fir" :class="assetMode ? '' : 'active'">TRX - WTRX</div>
          <div @click="doubleSet" class="tabs sec" :class="assetMode ? 'active' : ''">WTRX - TRX</div>
        </div>
        <div class="title-inner">Convert</div>
        <div class="convert-container">
          <div class="convert-box convert-1" :class="assetMode ? 'toggle' : ''">
            <div class="form-view bd">
              <div class="img-text-wrap">
                <img class="img" :src="require('@/themes/images/common/token_04_2x.png')" />
                <span class="img-text">TRX - WTRX</span>
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
                         placeholder="Please enter the amout of WTRX"
                         />
                    </div>
                  </div>
                </div>
                <div class="balance-wrap">
                  <span class="num">{{trxBalance}}</span>
                  <div class="balance">
                    <span class="img"></span>
                    <span class="balance-text">Balance</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="convert-box-title">You will get</div>
            <div class="result">
              <div class="key">
                <img :src="require('@/themes/images/common/token_02_2x.png')" alt="" />
                <div class="txt">WTRX</div>
              </div>
              <div class="num">{{trxNum?trxNum:'0'}}</div>
            </div>
            <el-button  :loading="btnLoading1" :disabled="btnDisabled1" @click="changeWtrx" class="btn create mt50">Confirm</el-button>
          </div>
          <div class="split"></div>
          <div class="convert-box convert-2" :class="assetMode ? '' : 'toggle'">
            <div class="form-view bd">
              <div class="img-text-wrap">
                <img class="img" :src="require('@/themes/images/common/token_04_2x.png')" />
                <span class="img-text">WTRX - TRX</span>
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
                         placeholder="Please enter the amout of TRX"
                         />
                    </div>
                  </div>
                </div>
                <div class="balance-wrap">
                  <span class="num">{{wtrxBalance}}</span>
                  <div class="balance">
                    <span class="img"></span>
                    <span class="balance-text">Balance</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="convert-box-title">You will get</div>
            <div class="result">
              <div class="key">
                <img :src="require('@/themes/images/common/token_02_2x.png')" alt="" />
                <div class="txt">WTRX</div>
              </div>
              <div class="num">{{wtrxNum?wtrxNum:0}}</div>
            </div>
            <el-button class="btn create mt50" :loading="btnLoading2" :disabled="btnDisabled2" @click="getAllowance">Confirm</el-button>
          </div>
        </div>
      </div>
      <tool-icon></tool-icon>
    </div>
    <TransactionSubmit :show="showAlert" :url="typeUrl" @transaction-close='showAlert=false' @cancel='showAlert=false'></TransactionSubmit>
  </div>
</template>
<script>
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
      approveUsdtBalance:0
    }
  },
  watch: {
    trxNum(value) {
      this.trxNum = this.inputType(this.trxNum)
      if (value != '') {
        if (value <= parseInt(this.trxBalance)) {
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
        if (value <= parseInt(this.wtrxBalance)) {
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
    singleSet() {
      this.assetMode = false
    },
    doubleSet() {
      this.assetMode = true
    },
    init() { // 初始化tronweb
      const that = this
      this.$initTronWeb().then(function(tronWeb) {
        that.gettrx()
        that.getWtrxContract()
      })
    },
    gettrx() {
      var that = this
      window.tronWeb.trx.getAccount(window.tronWeb.defaultAddress.base58).then(function(account) {
        that.trxBalance = window.tronWeb.fromSun(account.balance)
      })
    },
    async getWtrxContract() { // 链接wtrx合约
      console.log('ipConfig.wtrxAddress===========' + ipConfig.wtrxAddress)
      this.wtrxContract = await window.tronWeb.contract().at(ipConfig.wtrxAddress)
      if (this.wtrxContract) {
        this.getWtrx()
      }
    },
    async getWtrx() { // 获取wtrxbalance
      const that = this
      try {
        const res = await that.wtrxContract['balanceOf'](window.tronWeb.defaultAddress.base58).call()
        that.wtrxBalance = window.tronWeb.fromSun(res)
        this.inputdisabled1 = false
        this.inputdisabled2 = false
      } catch (error) {
        console.log(error)
      }
    },
    async changeWtrx() { // 兑换wtrx
      const that = this
      this.loading1(1)
      try {
        const res = await that.wtrxContract['deposit']().send({
          feeLimit: 100000000,
          callValue: window.tronWeb.toSun(that.trxNum),
          tokenId: 0,
          shouldPollResponse: true
        })
        if (res) {
          this.getWtrx()
          this.gettrx()
        }
        this.loading1()
      } catch (error) {
        if (error == 'Confirmation declined by user') {
          that.$message.success('success')
        }
        this.loading1()
        console.log(error)
      }
    },
    getUsdtAllowance(){
      const that = this
      that.loading1(1)
      allowance(ipConfig.UsdtAddress, ipConfig.TusdAddress).then((res) => {
        if (res) {
          that.approveUsdtBalance = parseInt(res._hex ? res._hex : res.constant_result[0], 16)
          if (that.approveUsdtBalance == 0 || window.tronWeb.toSun(this.wtrxNum) > that.approveUsdtBalance) {
            // alert('    ');
            if (that.proNmae == 'approved') {
              that.loading1(1)
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
      const contractAddress = ipConfig.wtrxAddress
      const functionSelector = 'withdraw(uint256)'
      const options = {}
      that.loading2(1)
      const parameter = [{ type: 'uint256', value: window.tronWeb.toSun(this.wtrxNum) }]
      try {
        const transaction = await window.tronWeb.transactionBuilder.triggerSmartContract(contractAddress, functionSelector, options, parameter)
        if (!transaction.result || !transaction.result.result) {
          that.loading2(0)
          return console.error('Unknown error: ' + transaction, null, 2)
        }
        window.tronWeb.trx.sign(transaction.transaction).then(function(signedTransaction) {
          window.tronWeb.trx.sendRawTransaction(signedTransaction).then(function(res) {
            that.showAlert = true
            that.typeUrl = 'https://shasta.tronscan.org/#/transaction/' + res.txid
            getConfirmedTransaction(res.txid).then((res1) => {
              console.log(res1)
              that.$message.success(this.$t('aut'))
              if (that.stup != 1) {
                that.proNmae = 'Confirm'
              }
              that.stup = 1
              that.getWtrx()
              that.gettrx()
              that.loading2(0)
            })
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
