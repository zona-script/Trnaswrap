<template>
  <div>
   <Menu :show="show" @menu-close="menuClose"></Menu>
  <div class="header">
    <div class="header-inner">
      <div class="logo"></div>
      <div class="pc-operation">
        <div class="language">English</div>
        <div class="language">Transaction Settings</div>
        <div class="connect">Connect to a Wallet</div>
      </div>
      <div class="menu"  @touchend="clickHand"></div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'HeadTitle',
  data() {
    return {
       show:false,
    }
  },
  methods: {
     clickHand(){
        this.show = true
    },
    menuClose() {
      this.show = false
    }
  },
  mounted() {
  }
}
</script>

<style lang="less">
@import '../themes/style/header.less';
</style>
