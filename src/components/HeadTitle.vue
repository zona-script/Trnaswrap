<template>
  <div>
   <Menu :show="show" @menu-close="menuClose"></Menu>
  <div class="header">
    <div class="header-inner">
      <div class="logo"></div>
      <div class="pc-operation">
        <div class="language" @click="hdel">{{this.$i18n.locale=='zh'?'English':'简体中文'}}</div>
        <!-- <div class="language">Transaction Settings</div> -->
        <div class="connect">{{defaultAddress}}</div>
      </div>
      <div class="menu"  @touchend="clickHand"></div>
    </div>
  </div>
  </div>
</template>

<script>
import {plusXing} from '@/utils/tronwebFn'
export default {
  name: 'HeadTitle',
  data() {
    return {
       show:false,
       defaultAddress:'Connect to a Wallet'
    }
  },
  methods: {
     clickHand(){
        this.show = true
    },
    menuClose() {
      this.show = false
    },
    hdel(n) {
      const i18n = this.$i18n.locale
      this.$i18n.locale = i18n == 'en' ? 'zh' : 'en'
      localStorage.setItem('lang', this.$i18n.locale)
    },
  },
  mounted() {
    let that = this
    this.$initTronWeb().then(function(tronWeb) {
      let defaultAddress = window.tronWeb.defaultAddress.base58
      that.defaultAddress = plusXing(defaultAddress,5,5)
    })
  }
}
</script>

<style lang="less">
@import '../themes/style/header.less';
</style>
