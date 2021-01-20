<template>
  <div id="convert" class="convert">
    <headTitle></headTitle>
    <div class="content">
      <div class="background"></div>
      <div class="title">Convert</div>
      <div class="pannel-info pd">
        <div class="form-view bd mt50">
          <div class="img-text-wrap">
            <img class="img" :src="require('@/themes/images/common/token_04_2x.png')"/>
            <span class="img-text">TRX - WTRX</span>
          </div>
        </div>
        <div class="form-view">
          <div class="form-view-item clearfix mt" v-for="(item, index) in formItem" :key="index">
            <div class="form-view-item-top">
              <div class="max-num">
                <span class="max-wrap">MAX</span>
                <div class="input-wrap"><input class="num" value="94.850.00"></input></div>
              </div>
              <div class="price-text">=¥0.30</div>
            </div>
            <div class="balance-wrap">
              <span class="num">{{ item.balance.num }}</span>
              <div class="balance">
                <span class="img"></span>
                <span class="balance-text">{{ item.balance.text }}</span>
              </div>
            </div>
          </div>
        </div>
        <el-button :loading="false"  class="btn create mt50">Greate a Pair</el-button>
        <div class="split mt50"></div>
        <div class="form-view bd mt50">
          <div class="img-text-wrap">
            <img class="img" :src="require('@/themes/images/common/token_02_2x.png')"/>
            <span class="img-text">WTRX - TRX</span>
          </div>
        </div>
        <div class="form-view">
          <div class="form-view-item clearfix mt" v-for="(item, index) in formItem" :key="index">
            <div class="form-view-item-top">
              <div class="max-num">
                <span class="max-wrap">MAX</span>
                <div class="input-wrap"><input class="num" value="94.850.00"></input></div>
              </div>
              <div class="price-text">{{ item.price }}</div>
            </div>
            <div class="balance-wrap">
              <span class="num">{{ item.balance.num }}</span>
              <div class="balance">
                <span class="img"></span>
                <span class="balance-text">{{ item.balance.text }}</span>
              </div>
            </div>
          </div>
        </div>
        <el-button :loading="false"  class="btn add mt50">Greate a Pair</el-button>
      </div>
    </div>
  </div>
</template>
<script>
// import axios from 'axios'
// import { getOneToken, joinConnection, getTnsPrice, getInvitedAddress } from '@/api/api'
// import { handleClipboard } from '@/assets/js/clipboard.js'
export default {
  name: 'Convert',
  data() {
    return {
      origanizationData: [
        {
          type: 'icon',
          firstImg: require('@/themes/images/home/a.png'),
          secondImg: require('@/themes/images/home/b.png'),
          name: 'WTRX-USDT',
          value: '0.00089'
        },
        {
          name: 'Your pool share',
          value: '0.00%'
        },
        {
          name: 'WTRX-USDT',
          value: '0.000000'
        },
        {
          name: 'USDT',
          value: '0.000000'
        }
      ],
      formItem: [
        {
          select: {
            value: 1,
            text: 'wtrx'
          },
          dropListIsShow: false,
          price:"=¥0.30",
          num: '94.850.00',
          max: 'max',
          balance: {
            text: 'Balance',
            num: '560’000'
          }
        }
      ],
      imgDropList: {
        select: {
          value: 1,
          text: 'wtrx'
        },
        dropListIsShow: false,
        dropList: [
          {
            value: 1,
            text: 'WTRX-USDT'
          },
          {
            value: 2,
            text: 'WTRX-USDT2'
          },
          {
            value: 3,
            text: 'WTRX-USDT3'
          }
        ]
      },
      shareInfo: [
        {
          num: 10,
          text: 'WTRX Per USDT'
        },
        {
          num: 80,
          text: 'USDT Per WTRX'
        },
        {
          num: 10,
          text: 'Share of Pool'
        }
      ]
    }
  },
  methods: {
    init() {
      // 初始化tronweb
      // const that = this
    },
    dropHeadClick(item) {
      item.dropListIsShow = true
    },
    formViewDropClick(item, subItem) {
      item.dropListIsShow = false
      item.select.text = subItem.text
    }
  },
  mounted() {
    this.init()
  }
}
</script>
<style lang="less">
@import '@/themes/style/common.less';
@import '@/themes/style/button.less';
@import '@/themes/style/pannel.less';
@import '@/themes/style/formview.less';
/* @import "@/themes/style/tab.less"; */
@import '@/themes/style/addLiquidity.less';
.your-position {
  height: 100px;
  font-size: 30px;
  font-family: AlibabaSans-Bold, AlibabaSans;
  font-weight: bold;
  color: #313131;
  line-height: 100px;
  border-bottom: 1px solid #d8d8d8;
}
.tab-container {
  margin: 0 30px 0;
  .cell {
    padding: 0;
  }
  .organization-name {
    font-size: 24px;
    font-family: AlibabaSans-Regular, AlibabaSans;
    font-weight: 400;
    color: #323232;
    line-height: 38px;
  }
  .organization-value {
    font-size: 30px;
    font-family: AlibabaSans-Medium, AlibabaSans;
    font-weight: bold;
    color: #323232;
    line-height: 47px;
  }
}
</style>
