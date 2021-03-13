<template>
  <div class="deposit-withdraw" v-show="isShow">
    <div class="mantle" @click="close"></div>
    <div class="container">
      <div class="tabs">
        <div class="tab deposit" @click="tabDeposit" :class="tabSelected === 'deposit' ? 'active' : ''">{{$t('lang23')}}</div>
        <div class="tab withdraw" @click="tabWithdraw" :class="tabSelected === 'withdraw' ? 'active' : ''">
          {{$t('lang24')}}
        </div>
      </div>
      <div class="deposit content" v-show="tabSelected === 'deposit'">
        <div class="top-container">
          <div class="input-container">
            <input type="text" v-model="depostNum" placeholder="Deposit amount" />
            <div class="unit">TNS</div>
          </div>
          <div class="info-container">
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
                <div class="pecent">%</div>
              </div>
            </div>
          </div>
        </div>
        <div class="btn-container">
          <el-button :loading="false" class="btn confirm" @click="deposit">{{$t('lang23')}}</el-button>
          <el-button :loading="false" class="btn confirm unselect" @click="back">{{$t('lang25')}}</el-button>
        </div>
      </div>
      <div class="withdraw content" v-show="tabSelected === 'withdraw'">
        <div class="revenue-container">
          <div class="revenue fir">
            <div class="title">{{$t('lang26')}}</div>
            <div class="subtitle">{{$t('lang27')}}</div>
            <div class="info-container">
              <div class="info-item">
                <div class="key">{{$t('lang28')}}</div><!--已赚取-->
                <div class="value">
                  <div class="num">{{userInfo.withdrawTotal+userInfo.notExtractedIncome}}</div>
                  <div class="unit">TNS</div>
                </div>
              </div>
              <div class="info-item">
                <div class="key">{{$t('lang29')}}</div><!--待提取-->
                <div class="value">
                  <div class="num">{{userInfo.notExtractedIncome}}</div>
                  <div class="unit">TNS</div>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="revenue sec" v-show="false">
            <div class="title">Mining revenue</div>
            <div class="subtitle">Automatically withdraw to the wallet after seven days</div>
            <div class="info-container">
              <div class="info-item">
                <div class="key">Issued</div>
                <div class="value">
                  <div class="num">200</div>
                  <div class="unit">TNS</div>
                </div>
              </div>
              <div class="info-item">
                <div class="key">Unreleased</div>
                <div class="value">
                  <div class="num">200</div>
                  <div class="unit">TNS</div>
                </div>
              </div>
            </div>
          </div> -->
        </div>
        <div class="btn-container">
          <!-- <el-button :loading="false" class="btn confirm" @click="withdraw">{{$t('lang24')}}</el-button> -->
          <el-button :loading="false" class="btn confirm unselect" @click="back">{{$t('lang25')}}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DepositWithdraw',
  props: {
    show: {
      default: false
    },
    selectedIndex: {
      default: 'withdraw'
    },
    tnsBalance:{
      type:Number,
      default:0
    },
    userInfo:{
      type:Object,
      default:{}
    }
  },
  data() {
    return {
      isShow: false,
      tabSelected: this.selectedIndex,
      depostNum:0
    }
  },
  watch: {
    show(newVal) {
      this.isShow = newVal
    },
    selectedIndex(newVal) {
      this.tabSelected = newVal
    }
  },
  methods: {
    tabDeposit() {
      this.tabSelected = 'deposit'
    },
    tabWithdraw() {
      this.tabSelected = 'withdraw'
    },
    close() {
      this.$emit('close', false)
    },
    back() {
      this.close();
      this.$emit('back');
    },
    deposit() {
if(this.depostNum>this.tnsBalance){
        this.$message.error('TNS余额不足')
        return
      }
      this.close();
      this.$emit('deposit',this.depostNum);
    },
    withdraw() {
      this.close();
      this.$emit('withdraw');
    }
  },
  mounted() {}
}
</script>

<style lang="less">
@import '../themes/style/depositWithdraw.less';
</style>
