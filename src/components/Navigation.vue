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
          <router-link :to="item.url">{{ item.text }}</router-link>
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
      //this.$router.push(item.url);
    }
  },
  mounted() {}
}
</script>
<style lang="less">
@import '@/themes/style/navigation.less';
</style>
