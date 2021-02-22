<template>
  <div class="deposit-withdraw" v-show="isShow">
    <div class="mantle" @click="close"></div>
    <div class="container">
      <div class="tabs">
        <div class="tab deposit" @click="tabDeposit" :class="tabSelected === 'deposit' ? 'active' : ''">Deposit</div>
        <div class="tab withdraw" @click="tabWithdraw" :class="tabSelected === 'withdraw' ? 'active' : ''">
          Withdraw
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
                <div class="pecent">%</div>
              </div>
            </div>
          </div>
        </div>
        <div class="btn-container">
          <el-button :loading="false" class="btn confirm" @click="deposit">Deposit</el-button>
          <el-button :loading="false" class="btn confirm unselect" @click="back">Return</el-button>
        </div>
      </div>
      <div class="withdraw content" v-show="tabSelected === 'withdraw'">
        <div class="revenue-container">
          <div class="revenue fir">
            <div class="title">Deposit revenue</div>
            <div class="subtitle">Extracted at any time</div>
            <div class="info-container">
              <div class="info-item">
                <div class="key">Earned</div>
                <div class="value">
                  <div class="num">200</div>
                  <div class="unit">TNS</div>
                </div>
              </div>
              <div class="info-item">
                <div class="key">Extracted</div>
                <div class="value">
                  <div class="num">200</div>
                  <div class="unit">TNS</div>
                </div>
              </div>
            </div>
          </div>
          <div class="revenue sec">
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
          </div>
        </div>
        <div class="btn-container">
          <el-button :loading="false" class="btn confirm" @click="withdraw">Withdraw</el-button>
          <el-button :loading="false" class="btn confirm unselect" @click="back">Return</el-button>
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
