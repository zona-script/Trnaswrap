<template>
  <div class="deposit-withdraw" v-show="isShow">
    <div class="mantle" @touchend="close"></div>
    <div class="container">
      <div class="tabs">
        <div class="tab deposit" @click="tabDeposit" :class="tabSelected === 'deposit' ? 'active' : ''">Deposit</div>
        <div class="tab withdraw" @click="tabWithdraw" :class="tabSelected === 'withdraw' ? 'active' : ''">Widthdraw</div>
      </div>
      <div class="deposit content" v-show="tabSelected === 'deposit'">
        <div class="top-container">
          <div class="input-container">
            <input type="text" placeholder="Deposit amount"/>
            <div class="unit">TNS</div>
          </div>
          <div class="info-container">
            <div class="info-item">
              <div class="key">balance</div>
              <div class="value">
                <div class="num">200</div>
                <div class="unit">TNS</div>
              </div>
            </div>
            <div class="info-item">
              <div class="key">balance</div>
              <div class="value">
                <div class="num">200</div>
                <div class="pecent">%</div>
              </div>
            </div>
          </div>
        </div>
        <div class="btn-container">
          <el-button :loading="false" class="btn confirm">Select</el-button>
          <el-button :loading="false" class="btn confirm">Select</el-button>
        </div>
      </div>
      <div class="widthdraw content" v-show="tabSelected === 'widthdraw'">
        <div class="revenue-container">
          <div class="revenue-1">
            <div class="title"></div>
            <div class="subtitle"></div>
            <div class="info-container">
              <div class="info-item">
                <div class="key">balance</div>
                <div class="value">
                  <div class="num">200</div>
                  <div class="unit">TNS</div>
                </div>
              </div>
              <div class="info-item">
                <div class="key">balance</div>
                <div class="value">
                  <div class="num">200</div>
                  <div class="unit">TNS</div>
                </div>
              </div>
            </div>
          </div>
          <div class="revenue-1">
            <div class="title"></div>
            <div class="subtitle"></div>
            <div class="info-container">
              <div class="info-item">
                <div class="key">balance</div>
                <div class="value">
                  <div class="num">200</div>
                  <div class="unit">TNS</div>
                </div>
              </div>
              <div class="info-item">
                <div class="key">balance</div>
                <div class="value">
                  <div class="num">200</div>
                  <div class="unit">TNS</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="btn-container">
          <el-button :loading="false" class="btn confirm">Select</el-button>
          <el-button :loading="false" class="btn confirm">Select</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DepositWithdraw',
  props: {
    isShow: {
      default: false
    },
    tabSelected: {
      default: "deposit"
    }
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    clickHand() {
      this.show = true
    },
    menuClose() {
      this.show = false
    },
    close () {

    },
    tabDeposit () {

    },
    tabWithdraw () {

    },
  },
  mounted() {}
}
</script>

<style lang="less">
@import '../themes/style/depositWithdraw.less';
</style>
