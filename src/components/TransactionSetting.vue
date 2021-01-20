<template>
  <div class="dialog-wrap" v-show="isShow">
    <div class="mantle" @touchend="close"></div>
    <div class="dialog-pannel min-h626">
      <h3 class="title"><span class="close"></span>Transaction Settings</h3>
      <p class="desc-text2 ml30 mr30 mt20">
        Your transaction will revert if the price changes unfavorably by more than this percenntage
      </p>
      <div class="pannel-info-share ml30 mr30">
        <div class="item-wrap">
          <div
            class="item-box nobg  mt20"
            :class="{ select: item.isSelect }"
            v-for="(item, index) in shareInfo"
            :key="index"
          >
            <div class="num">{{ item.num }}</div>
            <div class="text-info">{{ item.text }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { mapState } from 'vuex'
export default {
  name: 'TransactionSetting',
  props: {
    show: {
      default: false
    },
    shareInfo: {
      default: []
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
    close() {
      this.$emit('transaction-setting-close', false)
    },
    cancel() {
      this.close()
      this.$emit('cancel')
    }
  },
  mounted() {}
}
</script>
<style lang="less">
@import '@/themes/style/common.less';
@import '@/themes/style/dialog.less';
</style>
