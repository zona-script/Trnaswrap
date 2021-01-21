<template>
    <div class="menu-wrap" v-show="isShow"> 
        <div class="title">
            <span class="close" @touchend="close"></span>
            <div class="logo"></div>
        </div>
        <ul class="menu-info">
             <li class="menu-itme">Home</li>
             <li class="menu-itme select">Exchange</li>
             <li class="menu-itme">Pool</li>
             <li class="menu-itme">About</li>
             <li class="menu-itme">convert</li>
             <li class="menu-itme">Farm</li>
        </ul>
        <div class="btn-wrap">
            <div class="btn-setting-wrap"><el-button :loading="false"  icon="el-icon-setting" class="btn setting">Greate a Pair</el-button></div>
            <div class="btn-tool">
                <el-button :loading="false" class="btn">Greate a Pair</el-button>
                <img class="img ml60" :src="require('@/themes/images/menu/image_02.png')" />
                <img class="img" :src="require('@/themes/images/menu/image_01.png')" />
                <img class="img" :src="require('@/themes/images/menu/image_03.png')" />
                <img class="img" :src="require('@/themes/images/menu/image_04.png')" />
            </div>
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
      this.$emit('menu-close', false)
    },
    confirm() {
      this.$emit('confirm')
    }
  },
  mounted() {}
}
</script>
<style lang="less">
@import '@/themes/style/button.less';
@import '@/themes/style/menu.less';
</style>