<template>
  <div class="dialog-wrap" v-show="isShow">
    <div class="mantle"></div>
    <div class="dialog-pannel">
      <h3 class="title"><span class="close" @click="close"></span>You will revive</h3>
      <div class="revive-container">
        <div class="revive-head">
          <div class="num">14.496876</div>
          <div class="prompt-text3">JST SUN Pool Tokens</div>
          <div class="desc-text ml30 mr30 mt30">
            OutPut is estimated.if the price change by more than 0.5% your transaction will revert
          </div>
        </div>
        <div class="info-list-wrap mlr mt50">
          <div class="info-item">
            <span class="num-text fr">1</span>
            <img class="img" :src="require('@/themes/images/dialog/token_03_2x.png')" />
            <span class="text">JST</span>
          </div>
          <div class="info-item mt10">
            <span class="num-text fr">16.013137</span>
            <img class="img" :src="require('@/themes/images/dialog/b_2x.png')" />
            <span class="text">SUN</span>
          </div>
          <div class="info-item mt10">
            <span class="num-text fr">0%</span>
            <span class="num-text">share of Pool</span>
          </div>
          <div class="info-item mt10 mb50">
            <div class="desc-title">Rates</div>
            <div class="desc-info mt10">1 JST = NaN Sun</div>
            <div class="desc-info">1 Sun = 19.630547 JST</div>
          </div>
        </div>
      </div>
      <div class="btn confirm mb50 ml30 mr30" @touchend="confirm">Confirm</div>
    </div>
  </div>
</template>
<script>
// import { mapState } from 'vuex'
export default {
  name: 'Revive',
  props: {
    show: {
      default: false
    }
  },
  computed: {},
  watch: {
    show(newVal) {
      this.isShow = newVal
    }
  },
  data() {
    return {
      isShow: this.show
    }
  },
  created() {},
  methods: {
    wrapTouch(e) {
      e.stopPropagation()
    },
    close() {
      this.$emit('revive-close', false)
    },
    confirm() {
      this.$emit('confirm')
    }
  },
  mounted() {}
}
</script>
<style lang="less">
@import '@/themes/style/dialog.less';
</style>
