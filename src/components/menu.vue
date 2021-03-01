<template>
    <div class="menu-wrap" v-show="isShow"> 
        <div class="title">
            <span class="close" @touchend="close"></span>
            <div class="logo"></div>
        </div>
        <ul class="menu-info">
             <li class="menu-itme"  v-for="(item, index) in navList"  @click="click(item, index)"
              :class="actIndex === index ? 'select' : ''" >{{ item.name }}</li>
        </ul>
        <div class="btn-wrap">
            <!-- <div class="language">
              <div class="chinese">中文</div>
              <div class="split">/</div>
              <div class="english">English</div>
            </div> -->
            <tool-icon></tool-icon>
            <div class="btn-setting-wrap"><el-button :loading="false"  icon="el-icon-setting" class="btn fir">Connect to a Wallet</el-button></div>
            <!-- <div class="btn-setting-wrap"><el-button :loading="false"  icon="el-icon-setting" class="btn sec">Transaction Settings</el-button></div> -->
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'Menu',
  props: {
    show: {
      default: false
    },
    list: {
      default: () => {
        return [
          {
            name: 'Home',
            url: '/home'
          },
          {
            name: 'Exchange',
            url: '/exchange'
          },
          {
            name: 'Pool',
            url: '/pool'
          },
          // {
          //   name: 'Abelo',
          //   url: '/createApair'
          // },
          {
            name: 'Convert',
            url: '/convert'
          },
          // {
          //   name: 'Stake',
          //   url: '/addLiquidity'
          // },
          {
            name: 'Farm',
            url: '/Farm'
          }
        ]
      }
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
      navList: [...self.list]
    }
  },
  created() {},
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
      this.$router.push(item.url);
    }
  },
  mounted() {}
}
</script>
<style lang="less">
@import '@/themes/style/button.less';
@import '@/themes/style/menu.less';
</style>