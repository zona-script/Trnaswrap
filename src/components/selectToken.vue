<template>
  <div class="dialog-wrap" v-show="isShow" @touchstart="wrapTouch">
    <div class="mantle"></div>
    <div class="dialog-pannel">
      <h3 class="title"><span class="close" @touchend="close"></span>Select a token</h3>
      <div class="input-warp mt50 mr30 ml30">
        <input type="text" placeholder="Search name or paste" @change="change($event)" />
      </div>
      <div class="info-list-wrap mlr mt50">
        <div class="info-item nobg" v-for="(item, index) in tokenData" :key="index" @click="touchstart(item,index)" :class="selectedIndex === index ? 'select' : ''">
          <img class="img" :src="$requierImg(item.name)" />
          <span class="text">{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'SelectToken',
  props: {
    show: {
      default: true
    },
    item:{
      type:Number,
      default:0
    }
  },
  computed: {
    ...mapState(['tokenData', 'pairData'])

  },  
  watch: {
    tokenData(list) {
      this.tokenList = JSON.parse(JSON.stringify(list))
    },
    pairData(list) {
      this.pairList = JSON.parse(JSON.stringify(list))
    },
    show(newVal) {
      this.isShow = newVal;
    }
  },
  data() {
    return {
      isShow: this.show,
      selectedIndex: 0,
      filterName: '',
      iSort: 0,
      tokenList: [],
      pairList: [],
      newTokenAddress: ''
    }
  },
  created() {
    this.tokenList = JSON.parse(JSON.stringify(this.tokenData))
    this.pairList = JSON.parse(JSON.stringify(this.pairData))
  },
  methods: {
    wrapTouch(e) {
      e.stopPropagation();
    },
    touchstart(item,index) {
      this.selectedIndex = index;
      this.close()
      item.item = this.item
      this.$emit('selected-token', item);
    },
    close() {
      this.$emit('selected-token-close', false);
    },
    change(e) {
      this.$emit('change', e);
    }
  },
  mounted() {
  }
}
</script>
<style lang="less">
@import '@/themes/style/common.less';
@import '@/themes/style/dialog.less';
</style>
