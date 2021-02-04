<template>
  <div class="navigation">
    <div class="wrap">
      <div class="inner">
        <div
          v-for="(item, index) in navList"
          class="nav-item"
          @click="click(item, index)"
          :class="actIndex === index ? 'active' : ''"
        >
          {{ item.name }}
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
          {
            name: 'Abelo',
            url: '/createApair'
          },
          {
            name: 'Convert',
            url: '/convert'
          },
          {
            name: 'Stake',
            url: '/addLiquidity'
          },
          {
            name: 'Farm',
            url: '/farm'
          },
          {
            name: 'Vote',
            url: '/vote'
          },
          {
            name: 'About',
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
      actIndex: 0,
      width: 91,
      left: 0
    }
  },
  created() {},
  methods: {
    click(item, index, target) {
      this.actIndex = index;
      this.$router.push(item.url);
    }
  },
  mounted() {}
}
</script>
<style lang="less">
@import '@/themes/style/navigation.less';
</style>
