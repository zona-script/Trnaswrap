<template>
    <div class="menu-wrap" v-show="isShow"> 
        <div class="title">
            <span class="close" @touchend="close"></span>
            <div class="logo"></div>
        </div>
        <ul class="menu-info">
             <li class="menu-itme"  v-for="(item, index) in navList"  @click="click(item, index)"
              :class="actIndex === index ? 'select' : ''" ><router-link :to="item.url">{{ item.name }}</router-link></li>
        </ul>
        <div class="btn-wrap">
            <div class="language" @click="hdel">
              <div class="chinese">中文</div>
              <div class="split">/</div>
              <div class="english">English</div>
            </div>
            <tool-icon></tool-icon>
            <div class="btn-setting-wrap"><el-button :loading="false"  class="btn fir">{{defaultAddress}}</el-button></div>
            <!-- <div class="btn-setting-wrap"><el-button :loading="false"  icon="el-icon-setting" class="btn sec">Transaction Settings</el-button></div> -->
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import {plusXing} from '@/utils/tronwebFn'
export default {
  name: 'Menu',
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
    let self = this
    return {
      isShow: this.show,
      actIndex: 0,
      defaultAddress:'Connect to a Wallet',
      navList: [{
            name: this.$t('nav.home1'),
            text: this.$t('nav.home1'),
            url: '/home'
          },
          {
            name: this.$t('nav.Exchange'),
            text: this.$t('nav.Exchange'),
            url: '/exchange'
          },
          {
            name: this.$t('nav.Pool'),
            text: this.$t('nav.Pool'),
            url: '/pool'
          },
          {
            name: this.$t('lang30'),
            text: this.$t('lang30'),
            url: '/convert'
          },
          {
            name: this.$t('lang31'),
            text: this.$t('lang31'),
            url: '/farm'
          },
          {
            name: this.$t('lang15'),
            text: this.$t('lang15'),
            url: '/invite'
          }]
    }
  },
  created() {
    let that = this
    this.$initTronWeb().then(function(tronWeb) {
      let defaultAddress = window.tronWeb.defaultAddress.base58
      that.defaultAddress = plusXing(defaultAddress,5,5)
    })
  },
  methods: {
    wrapTouch(e) {
      e.stopPropagation()
    },
    close() {
      this.$emit('menu-close', false)
    },
    confirm() {
      this.$emit('confirm')
    },
    click(item, index, target) {
      this.actIndex = index;
      this.$emit('menu-close', false)
      //this.$router.push(item.url);
    },
    hdel(n) {
      const i18n = this.$i18n.locale
      this.$i18n.locale = i18n == 'en' ? 'zh' : 'en'
      localStorage.setItem('lang', this.$i18n.locale)
      window.location.reload()
    },
  },
  mounted() {}
}
</script>
<style lang="less">
@import '@/themes/style/button.less';
@import '@/themes/style/menu.less';
</style>