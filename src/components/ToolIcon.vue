<template>
  <div class="icon-btn-tool">
    <img class="img" :src="require('@/themes/images/common/telegram@2x.png')" alt="" />
    <img class="img" :src="require('@/themes/images/common/twitter@2x.png')" alt="" />
    <img class="img" :src="require('@/themes/images/common/discord@2x.png')" alt="" />
    <img class="img" :src="require('@/themes/images/common/medium@2x.png')" alt="" />
  </div>
</template>
<script>
export default {
  name: 'ToolIcon',
  props: {},
  computed: {},
  watch: {},
  data() {
    return {}
  },
  created() {},
  methods: {},
  mounted() {}
}
</script>
<style lang="less">
.icon-btn-tool {
  display: none;
  text-align: center;
  padding-top: 100px;
  .img {
    height: 52px;
    width: 52px;
  }
}
@media screen and (min-width: 1200px) {
  .icon-btn-tool {
    display: block;
  }
}
</style>
