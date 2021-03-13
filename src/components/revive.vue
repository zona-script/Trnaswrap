<template>
  <div class="dialog-wrap revive" v-show="isShow">
    <div class="mantle"></div>
    <div class="dialog-pannel">
      <h3 class="title">{{$t('ywr')}}<span class="close" @click="close"></span></h3>
      <div class="revive-container">
        <div class="revive-head">
          <div class="num">{{popsData.reciveLptoken}}</div>
          <div class="prompt-text3">{{popsData.token1.name}}{{popsData.token2.name}} Pool Tokens</div>
          <div class="desc-text">
            {{$t('oiei')}}
          </div>
        </div>
        <div class="info-list-wrap mlr mt50">
          <div class="info-item">
            <span class="num-text fr">{{popsData.token1Num}}</span>
            <img class="img" :src="requierImg(popsData.token1.name,0)" />
            <span class="text">{{popsData.token1.name}}</span>
          </div>
          <div class="info-item mt10" v-show="popsData.token2Num>0">
            <span class="num-text fr">{{popsData.token2Num}}</span>
            <img class="img" :src="requierImg(popsData.token2.name,0)" />
            <span class="text">{{popsData.token2.name}}</span>
          </div>
          <div class="info-item mt10">
            <span class="num-text fr">{{popsData.share}}%</span>
            <span class="num-text">{{$t('sopl')}}</span>
          </div>
          <div class="desc-title">{{$t('lang32')}}</div>
          <div class="desc-info-item">
            <div class="desc-info"><span>1 {{popsData.token1.name}} = </span><span>{{popsData.t1Per.toFixed(6)}} {{popsData.token2.name}}</span></div>
            <div class="desc-info"><span>1 {{popsData.token2.name}} = </span><span>{{popsData.t2Per.toFixed(6)}} {{popsData.token1.name}}</span></div>
          </div>
        </div>
      </div>
      <div class="btn confirm" @click="confirm">Confirm</div>
    </div>
  </div>
</template>
<script>
// import { mapState } from 'vuex'
export default {
  name: 'Revive',
  props: {
    show: {
      default: false
    },
    popsData: {
      type: Object,
      default: () => {
        return {
          token1: {},
          token2: {}
        }
      }
    }
  },
  computed: {},
  watch: {
    show(newVal) {
      this.isShow = newVal
    }
  },
  data() {
    return {
      isShow: this.show
    }
  },
  created() {},
  methods: {
    requierImg(name, number) {
      let str
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
    wrapTouch(e) {
      e.stopPropagation()
    },
    close() {
      this.$emit('revive-close', false)
    },
    confirm() {
      this.$emit('change')
    }
  },
  mounted() {}
}
</script>
<style lang="less">
@import '@/themes/style/dialog.less';
@import '@/themes/style/revive.less';
</style>
