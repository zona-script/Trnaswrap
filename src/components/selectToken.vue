<template>
  <div class="dialog-wrap select-token" v-show="isShow" @touchstart="wrapTouch">
    <div class="mantle"></div>
    <div class="dialog-pannel">
      <h3 class="title"><span class="close" @click="close"></span>{{$t('Exc.sat')}}</h3>
      <div class="add-btn" @click="checkToken">+</div>
      <div class="input-warp">
        <input type="text" :placeholder="$t('lang33')" v-model="newTokenAddress" @change="change($event)" />
      </div>
      <div class="info-list-wrap mlr">
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
import axios from 'axios'
export default {
  name: 'SelectToken',
  props: {
    show: {
      default: false
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
    checkToken() {
      const that = this
      const data = { address: this.newTokenAddress }
      axios.post('http://47.242.236.26:9899/api/token/addToken',data).then((res)=>{
        if(res.data.code==0){
          alert('添加成功')
        }else{
          alert('添加失败')
        }
      })
    },
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
@import '@/themes/style/dialog.less';
@import '@/themes/style/selectToken.less';
</style>
