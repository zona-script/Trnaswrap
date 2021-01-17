<template>
  <div id="app">
    <!-- 开启顶部安全区适配 -->
    <!-- <van-nav-bar safe-area-inset-top /> -->
    <router-view />
    <!-- 开启底部安全区适配 -->
    <!-- <van-nav-bar safe-area-inset-bottom /> -->
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
<style>
@import './themes/style/normalize.less';
</style>
