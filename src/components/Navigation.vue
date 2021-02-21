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
    list: {
      default: () => {
        return [
          {
            name: 'home',
            text: 'Home',
            url: '/home'
          },
          {
            name: 'exchange',
            text: 'Exchange',
            url: '/exchange'
          },
          {
            name: 'pool',
            text: 'Pool',
            url: '/pool'
          },
          // {
          //   name: 'abelo',
          //   text: 'Abelo',
          //   url: '/createApair'
          // },
          {
            name: 'convert',
            text: 'Convert',
            url: '/convert'
          },
          // {
          //   name: 'stake',
          //   text: 'Stake',
          //   url: '/addLiquidity'
          // },
          {
            name: 'farm',
            text: 'Farm',
            url: '/farm'
          },
          {
            name: 'vote',
            text: 'Vote',
            url: '/vote'
          },
          {
            name: 'about',
            text: 'About',
            url: '/about'
          }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  data() {
    let self = this
    return {
      navList: [...self.list],
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
