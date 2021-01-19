<template>
  <div class="dialog-wrap" v-show="isShow">
    <div class="mantle"></div>
    <div class="dialog-pannel">
      <h3 class="title"><span class="close" @touchstart="close"></span>Select a token</h3>
      <div class="input-warp mt50 mr30 ml30">
        <input type="text" placeholder="Search name or paste" />
      </div>
      <div class="info-list-wrap mlr mt50">
        <div class="info-item nobg" v-for="(item, index) in tokens" :key="index" @touchstart="touchstart(index)" :class="selectedIndex === index ? 'select' : ''">
          <img class="img" :src="item.img" />
          <span class="text">{{ item.txt }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import axios from 'axios'
// import { getOneToken, joinConnection, getTnsPrice, getInvitedAddress } from '@/api/api'
// import { handleClipboard } from '@/assets/js/clipboard.js'
export default {
  name: 'SelectToken',
  props: {
    show: {
      default: true
    },
    tokens: {
      default: () => [
        {
          id: 1,
          img: require('@/themes/images/dialog/b_2x.png'),
          txt: 'WTRX'
        },
        {
          id: 2,
          img: require('@/themes/images/dialog/token_04_2x.png'),
          txt: 'USDT'
        },
        {
          id: 3,
          img: require('@/themes/images/dialog/token_03_2x.png'),
          txt: 'JST'
        },
        {
          id: 4,
          img: require('@/themes/images/dialog/b_2x.png'),
          txt: 'SUN'
        },
        {
          id: 5,
          img: require('@/themes/images/dialog/b_2x.png'),
          txt: 'BTC'
        }
      ]
    }
  },
  data() {
    return {
      isShow: this.show,
      selectedIndex: 0
    }
  },
  methods: {
    init() {
      // 初始化tronweb
      // const that = this
    },
    touchstart(index) {
      this.selectedIndex = index;
      this.$emit('selected-token', this.tokens[index].id);
    },
    close() {
      this.isShow = false;
    }
  },
  mounted() {
    this.init()
  }
}
</script>
<style lang="less">
@import '@/themes/style/common.less';
@import '@/themes/style/dialog.less';
</style>
