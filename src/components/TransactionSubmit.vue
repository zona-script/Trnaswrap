<template>
  <div class="dialog-wrap transaction-submit" v-show="isShow">
    <div class="mantle"></div>
    <div class="dialog-pannel">
      <img class="submitte-img mt100" :src="require('@/themes/images/dialog/submit_illustration.png')" />
      <div class="prompt-text mt50">Transaction Submitted</div>
      <div class="prompt-text2 mt20"><a :href="url">View on Tronscan</a></div>
      <div class="btn cancel mt100 mt50 ml30 mr30 confirm" @click="cancel">Cancel</div>
    </div>
  </div>
</template>
<script>
// import { mapState } from 'vuex'
export default {
  name: 'TransactionSubmit',
  props: {
    show: {
      default: false
    },
    url: {
      default: ''
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
      e.stopPropagation();
    },
    close() {
      this.$emit('transaction-close', false);
    },
    cancel() {
      this.close();
      this.$emit('cancel');
    }
  },
  mounted() {}
}
</script>
<style lang="less">
@import '@/themes/style/dialog.less';
</style>
