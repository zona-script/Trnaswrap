<template>
  <div class="remove-liquidity-confirm" v-show="isShow">
    <div class="mantle" @click="close"></div>
    <div class="container">
      <div class="title-pop">
        <div class="txt">{{$t('pop.Ywr')}}</div>
        <img class="close" :src="require('@/themes/images/common/close.png')" @click="close" />
      </div>
      <div class="container-inner">
        <div class="info-container">
          <div class="info-item">
            <div class="icon-txt">
              <img class="icon" :src="requierImg(token1.name,0)" />
              <div class="txt">{{token1.name}}</div>
            </div>
            <div class="value">{{token1Num}}</div>
          </div>
          <div class="info-item">
            <div class="icon-txt">
              <img class="icon" :src="requierImg(token2.name,0)" />
              <div class="txt">{{token2.name}}</div>
            </div>
            <div class="value">{{token2Num}}</div>
          </div>
        </div>
        <div class="illustration">{{$t('oiei')}}</div>
        <div class="title-price">{{$t('home.price')}}</div>
        <div class="info-container">
          <div class="info-item">
            <div class="icon-txt">
              <div class="txt">1 {{token1.name}} =</div>
            </div>
            <div class="value">
              <div class="txt">{{justPrice.toFixed(6)}}</div>
              <div class="unit">{{token2.name}}</div>
            </div>
          </div>
          <div class="info-item">
            <div class="icon-txt">
              <div class="txt">1 {{token2.name}} =</div>
            </div>
            <div class="value">
              <div class="txt">{{reversePrice.toFixed(6)}}</div>
              <div class="unit">{{token1.name}}</div>
            </div>
          </div>
        </div>
        <el-button :loading="false" class="btn confirm" @click="clickFn">{{$t('confirm')}}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RemoveLiquidityConfirm',
  props: {
    show: {
      default: true
    },
    token1Num: {
      type: [String, Number],
      default: '0'
    },
    token2Num: {
      type: [String, Number],
      default: '0'
    },
    token1: {
      type: Object,
      default: () => {
        return {}
      }
    },
    token2: {
      type: Object,
      default: () => {
        return {}
      }
    },
    reciveLptoken: {
      type: [String, Number, Object],
      default: '0'
    },
    justPrice: {
      type: [String, Number],
      default: '0'
    },
    reversePrice: {
      type: [String, Number],
      default: '0'
    },
    clickFn: {
      type: Function
    },
  },
  data() {
    return {
      isShow: this.show
    }
  },
  watch: {
    show(newVal) {
      this.isShow = newVal
    }
  },
  created(){
    console.log(this.justPrice)
    console.log(this.reciveLptoken)
  },
  methods: {
    close() {
      this.$emit('close', false)
    },
    requierImg(name, number) {
      let str
      // debugger
      if (name) {
        try {
          if (number != undefined) {
            str = name.split('/')
            return require('@/assets/img/currency/' + str[number] + '.png')
          }
          return require('@/assets/img/currency/' + name + '.png')
        } catch (error) {
          return require('@/assets/img/currency/avitve.png')
        }
      } else {
        return require('@/assets/img/currency/avitve.png')
      }
    },
  },
  mounted() {}
}
</script>

<style lang="less">
@import '../themes/style/removeLiquidityConfirm.less';
</style>
