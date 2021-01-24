<template>
  <div id="convert" class="convert">
    <headTitle></headTitle>
    <div class="content-wrap">
      <div class="background"></div>
      <div class="title">Convert</div>
      <div class="pannel-info pd">
        <div class="tabs-container">
          <div @click="singleSet" class="tabs fir" :class="assetMode ? '' : 'active'">WTRX - TRX</div>
          <div @click="doubleSet" class="tabs sec" :class="assetMode ? 'active' : ''">WTRX - TRX</div>
        </div>
        <div class="title-inner">Convert</div>
        <div class="convert-container">
          <div class="convert-box convert-1" :class="assetMode ? 'toggle' : ''">
            <div class="form-view bd">
              <div class="img-text-wrap">
                <img class="img" :src="require('@/themes/images/common/token_04_2x.png')" />
                <span class="img-text">WTRX - TRX1</span>
                <img class="img res" :src="require('@/themes/images/common/token_04_2x.png')" />
              </div>
            </div>
            <div class="form-view">
              <div class="form-view-item clearfix mt">
                <div class="form-view-item-top">
                  <div class="max-num">
                    <span class="max-wrap">MAX</span>
                    <div class="input-wrap"><input class="num" /></div>
                  </div>
                </div>
                <div class="balance-wrap">
                  <span class="num">560'000</span>
                  <div class="balance">
                    <span class="img"></span>
                    <span class="balance-text">Balance</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="convert-box-title">You will get</div>
            <div class="result">
              <div class="key">
                <img :src="require('@/themes/images/common/token_02_2x.png')" alt="" />
                <div class="txt">WTRX</div>
              </div>
              <div class="num">0.30</div>
            </div>
            <el-button :loading="false" class="btn create mt50">Confirm</el-button>
          </div>
          <div class="split"></div>
          <div class="convert-box convert-2" :class="assetMode ? '' : 'toggle'">
            <div class="form-view bd">
              <div class="img-text-wrap">
                <img class="img" :src="require('@/themes/images/common/token_04_2x.png')" />
                <span class="img-text">WTRX - TRX2</span>
                <img class="img res" :src="require('@/themes/images/common/token_04_2x.png')" />
              </div>
            </div>
            <div class="form-view">
              <div class="form-view-item clearfix mt">
                <div class="form-view-item-top">
                  <div class="max-num">
                    <span class="max-wrap">MAX</span>
                    <div class="input-wrap"><input class="num" /></div>
                  </div>
                </div>
                <div class="balance-wrap">
                  <span class="num">560'000</span>
                  <div class="balance">
                    <span class="img"></span>
                    <span class="balance-text">Balance</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="convert-box-title">You will get</div>
            <div class="result">
              <div class="key">
                <img :src="require('@/themes/images/common/token_02_2x.png')" alt="" />
                <div class="txt">WTRX</div>
              </div>
              <div class="num">0.30</div>
            </div>
            <el-button :loading="false" class="btn create mt50">Confirm</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Convert',
  data() {
    return {
      assetMode: true
    }
  },
  methods: {
    singleSet() {
      this.assetMode = false
    },
    doubleSet() {
      this.assetMode = true
    }
  },
  mounted() {}
}
</script>
<style lang="less">
@import '@/themes/style/common.less';
@import '@/themes/style/button.less';
@import '@/themes/style/pannel.less';
@import '@/themes/style/formview.less';
@import '@/themes/style/convert.less';
</style>
