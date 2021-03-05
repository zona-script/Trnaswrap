<template>
  <div id="createApair" class="createApair">
    <!-- <headTitle></headTitle> -->
    <select-token
      :show="selectTokenShow"
      :item="selectItem"
      @selected-token="selectToken"
      @selected-token-close="selectedTokenClose"
    ></select-token>
    <div class="background"></div>
    <div class="content-wrap">
      <div class="title">{{$t('pool.cj1')}}</div>
      <div class="pannel-info pd">
        <div class="headline mt50">{{$t('pool.cj1')}}</div>
        <p class="desc mt50">
          {{$t('pool.yat')}}
          {{$t('pool.tro')}}
          {{$t('pool.tro1')}}
          {{$t('pool.tro2')}}
        </p>
        <div class="form-view">
          <!--TRADCOIN-->
          <div class="form-view-item clearfix mt">
            <div class="form-view-item-top">
              <div class="droplist">
                <div class="drop-head">
                  <div class="icon-txt">
                    <img class="img" :src="require('@/themes/images/common/b_2x.png')" />
                    <span class="drop-head-text">{{ token1.name }}</span>
                  </div>
                  <span class="arrow down"></span>
                </div>
              </div>
              <div class="max-num">
                <span class="max-wrap" @click="getMaxBalance(0)">MAX</span>
                <div class="input-wrap"><input type="number" class="num" v-model="firstTokenNum" /></div>
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
          <!--BASECOIN-->
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
                <span class="max-wrap" @click="getMaxBalance(1)">MAX</span>
                <div class="input-wrap"><input class="num" v-model="secondTokenNum" /></div>
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

        <!--Confirm-->
        <el-button class="btn confirm mt50" :loading="isCreateding" :disabled="isCreateding" @click="coinfirmCreate"
          >{{$t('confirm')}}</el-button
        >
      </div>
      <tool-icon></tool-icon>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { approved, getConfirmedTransaction } from '../../utils/tronwebFn'
import ipConfig from '../../config/contracts'
export default {
  name: 'createApair',
  data() {
    return {
      selectTokenShow: false,
      token1: {},
      token2: {},
      selectItem: 0,
      firstTokenNum: '',
      secondTokenNum: '',
      BFactoryContract: null,
      bPoolContract: null,
      foxDex: 0,
      typeUrl: '',
      isCreateding: false
    }
  },
  computed: {
    ...mapState(['tokenData'])
  }, 
  watch: {
    tokenData(list) {
      let tokenList = JSON.parse(JSON.stringify(list))
      let token = tokenList.filter(el => el.name.toUpperCase() == 'TUSD')
      this.token1 = token[0]
      this.token1.item = 0
    }
  },
  created(){

  },
  methods: {
    init() {
      // 初始化tronweb
      const that = this
      this.$initTronWeb().then(function(tronWeb) {
        that.getBalance(that.token1)
        that.getBFactoryContract()
        that.getSwapFeeForDex()
      })
    },
    async getBFactoryContract() {
      // 链接BFactory合约
      this.BFactoryContract = await window.tronWeb.contract().at(ipConfig.BFactory)
    },
    async getSwapFeeForDex() {
      var functionSelector = 'swapFeeForDex()'
      var parameter = []
      const transaction = await window.tronWeb.transactionBuilder.triggerConstantContract(
        ipConfig.FactoryManager,
        functionSelector,
        {},
        parameter
      )
      this.foxDex = parseInt(transaction.constant_result[0], 16) / Math.pow(10, 18)
    },
    async getBalance(token) {
      // 获取余额
      const that = this
      const tokenContract = await window.tronWeb.contract().at(token.address)
      const tokenBalance = await tokenContract['balanceOf'](window.tronWeb.defaultAddress.base58).call()
      if (tokenBalance) {
        const balance = parseFloat(tokenBalance, 16) / Math.pow(10, token.decimals)
        token.item == 0 ? (that.token1.balance = balance) : (that.token2.balance = balance)
      }
    },
    coinfirmCreate() {
      if (
        !this.firstTokenNum ||
        this.firstTokenNum == 0 ||
        this.firstTokenNum == '' ||
        !this.secondTokenNum ||
        this.secondTokenNum == 0 ||
        this.secondTokenNum == ''
      ) {
        this.$message({
          message: 'Please enter the added quantity',
          type: 'error'
        })
        return
      }
      this.createBPool()
    },
    async createBPool() {
      // newBPool
      const that = this
      this.$message({
        message: 'Successful, please wait for block confirmation',
        type: 'success'
      })
      try {
        if (this.BFactoryContract) {
          this.isCreateding = true
          const res = await that.BFactoryContract['newBPool']().send({
            feeLimit: 1000_000_000,
            callValue: 0,
            tokenId: 0,
            shouldPollResponse: true
          })
          if (res) {
            that.bPoolContract = res
            approved(that.token1.address, that.bPoolContract).then(() => {
              approved(that.token2.address, that.bPoolContract).then(() => {
                const number = window.tronWeb
                  .toBigNumber(that.firstTokenNum * Math.pow(10, that.token1.decimals))
                  .toString(10)
                const weight = window.tronWeb.toBigNumber(10 * Math.pow(10, 18)).toString(10)
                const number2 = window.tronWeb
                  .toBigNumber(that.secondTokenNum * Math.pow(10, that.token2.decimals))
                  .toString(10)
                that.bindCoin(that.token1.address, number, weight, that.token2.address, number2, weight)
              })
            })
          }
        }
      } catch (error) {
        this.$message({
          message: 'System error',
          type: 'error'
        })
        console.log(error)
      }
    },
    async bindCoin(token1Address, token1Balance, token1Weight, token2Address, token2Balance, token2Weight) {
      // 绑定币种
      const that = this
      var functionSelector = 'addToken(address,uint256,uint256,address,uint256,uint256)'
      var parameter = [
        { type: 'address', value: token1Address },
        { type: 'uint256', value: token1Balance },
        { type: 'uint256', value: token1Weight },
        { type: 'address', value: token2Address },
        { type: 'uint256', value: token2Balance },
        { type: 'uint256', value: token2Weight }
      ]
      const transaction = await window.tronWeb.transactionBuilder.triggerSmartContract(
        that.bPoolContract,
        functionSelector,
        { shouldPollResponse: true,feeLimit: 1000_000_000 },
        parameter
      )
      if (!transaction.result || !transaction.result.result) {
        return console.error('Unknown error: ' + transaction, null, 2)
      }
      console.log(transaction.transaction)
      const signedTransaction = await window.tronWeb.trx.sign(transaction.transaction)
      that.showAlert1 = true
      that.typeUrl = 'https://shasta.tronscan.org/#/transaction/' + signedTransaction.txID
      console.log(signedTransaction)
      const res = await window.tronWeb.trx.sendRawTransaction(signedTransaction)
      if (res) {
        getConfirmedTransaction(res.txid).then(result => {
          that.showAlert1 = true
          that.$message.success('success')
          that.isCreateding = false
          window.location.reload()
        })
      }
      // window.tronWeb.trx.sign(transaction.transaction).then(function (signedTransaction) {
      //     window.tronWeb.trx.sendRawTransaction(signedTransaction).then(function (res) {
      //         alert('success');
      //     });
      // })
    },
    getMaxBalance(num) {
      num == 0 ? (this.firstTokenNum = this.token1.balance) : (this.secondTokenNum = this.token2.balance)
    },
    dropHeadClick(index) {
      this.selectItem = index
      this.selectTokenShow = true
    },
    formViewDropClick(item, subItem) {
      item.dropListIsShow = false
      item.select.text = subItem.text
    },
    selectedToken(id) {
      console.log(id)
    },
    selectedTokenClose() {
      this.selectTokenShow = false
    },
    selectToken(token) {
      token.item == 0 ? (this.token1 = token) : (this.token2 = token)
      this.getBalance(token)
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
@import '@/themes/style/createApair.less';
</style>
