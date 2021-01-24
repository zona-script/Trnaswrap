<template>
  <div class="navigation">
    <div class="wrap">
      <div class="inner">
        <div v-for="(item, index) in navList" class="nav-item" @click="click(item, index)" :class="actIndex === index ? 'active' : ''">{{ item }}</div>
      </div>
      <div class="block" :style="{width: width + 'px',left: left + 'px'}"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Navigation',
  props: {
    list: {
      default: () => {
        return ['Home', 'Exchange', 'Pool', 'Abelo', 'Convert', 'Stake', 'Farm'];
      }
    }
  },
  computed: {},
  watch: {},
  data() {
    let self = this;
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
      console.log(e.target)
    }
  },
  mounted() {}
}
</script>
<style lang="less">
@import '@/themes/style/navigation.less';
</style>
