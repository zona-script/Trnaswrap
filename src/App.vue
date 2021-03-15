<template>
  <div id="app">
    <headTitle></headTitle>
    <navigation></navigation>
    <!-- 开启顶部安全区适配 -->
    <!-- <van-nav-bar safe-area-inset-top /> -->
    <router-view />
    <!-- 开启底部安全区适配 -->
    <!-- <van-nav-bar safe-area-inset-bottom /> -->
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { TokenData, PairData } from './utils/index'
import { joinConnection} from '@/api/api'
export default {
  name: 'App',
  created(){
    let that = this
    this.init()
    TokenData().then((res) => {
      that.$store.dispatch('setTokenData', res)
    })
    PairData().then((res) => {
      that.$store.dispatch('setPairData', res)
    })
    that.setRem();
  },
  methods: {
    ...mapActions(['connectWallett']),
    async init() {
      this.$initTronWeb().then((tronWeb) => {
        this.connectWallett()
        this.joinClub()
      })
    },
    joinClub() {
      let that = this
      let params = {
        address: 'TLQkPTM57B61MRJg8k6ZfAv5rLTvRSnS36',
        invitedAddress: ''
      }
      joinConnection(params).then(result => {
        if (result.data.code == 0) {
          sessionStorage.setItem('oneToken',result.data.data.token)
        }else{
          sessionStorage.setItem('oneToken',null)
        } 
      })
    },
    // 适应PC端函数，设置fontsize:75px;
    setRem() {
      let screenWidth = window.screen.width;
      if (screenWidth > 750) {
        document.getElementsByTagName('html')[0].style['fontSize'] = '75px';
      }
    }
  }
}
</script>
<style lang="less">
@import './themes/style/normalize.less';
@import './themes/style/common.less';
</style>
