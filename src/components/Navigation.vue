<template>
  <div class="navigation">
    <div class="wrap">
      <div class="inner">
        <div
          v-for="(item, index) in navList"
          class="nav-item"
          @click="click(item, index)"
          :class="actIndex === item.name ? 'active' : ''"
        >
          {{ item.text }}
        </div>
      </div>
      <!-- 留着做动画用 -->
      <!-- <div class="block" :style="{ width: width + 'px', left: left + 'px' }"></div> -->
    </div>
  </div>
</template>
<script>
export default {
  name: 'Navigation',
  props: {
  },
  computed: {},
  watch: {},
  data() {
    let self = this
    return {
      navList: [{
            name: 'home',
            text: this.$t('nav.home1'),
            url: '/home'
          },
          {
            name: 'exchange',
            text: this.$t('nav.Exchange'),
            url: '/exchange'
          },
          {
            name: 'pool',
            text: this.$t('nav.Pool'),
            url: '/pool'
          },
          {
            name: 'convert',
            text: this.$t('lang30'),
            url: '/convert'
          },
          {
            name: 'farm',
            text: this.$t('lang31'),
            url: '/farm'
          }],
      actIndex: 'home',
      width: 91,
      left: 0
    }
  },
  created() {
    let hash = window.location.hash.split('/')[1];//获取当前路由哈希
    this.actIndex = hash;
  },
  methods: {
    click(item, index, target) {
      this.actIndex = item.name;
      this.$router.push(item.url);
    }
  },
  mounted() {}
}
</script>
<style lang="less">
@import '@/themes/style/navigation.less';
</style>
