<template>
   <div>
      <!-- 第一种弹框样式 可以去除注释看效果 -->
      <!-- <div class="dialog-wrap">
          <div class="mantle"></div>
          <div class="dialog-pannel">
               <img class="submitte-img mt100" :src="require('@/themes/images/dialog/submit_illustration.png')"/>
               <div class="prompt-text mt50">Transaction Submitted</div>
               <div class="prompt-text2 mt20"><a href="#">View on Tronscan</a></div>
               <div class="btn cancel mt100 mt50 ml30 mr30" v-on:click="dialogCancel()">Cancel</div>
          </div>
      </div> -->
       <div class="dialog-wrap">
          <div class="mantle"></div>
          <div class="dialog-pannel">
               <h3 class="title"><span class="close"></span>You will revive</h3>
               <div class="num">14.496876</div>
               <div class="prompt-text3">JST SUN Pool Tokens</div>
               <div class="desc-text ml30 mr30 mt30">OutPut is estimated.if the price change by more than 0.5% your transaction will revert</div>
               <div class="info-list-wrap mlr mt50">
                   <div class="info-item">
                        <span class="num-text fr">1</span>
                        <img class="img" :src="require('@/themes/images/dialog/token_03_2x.png')"/>
                        <span class="text">JST</span>
                   </div>
                   <div class="info-item mt10">
                        <span class="num-text fr">16.013137</span>
                        <img class="img" :src="require('@/themes/images/dialog/b_2x.png')"/>
                        <span class="text">SUN</span>
                   </div>
                   <div class="info-item mt10">
                        <span class="num-text fr">0%</span>
                        <span class="num-text">share of Pool</span>
                   </div>
                   <div class="info-item mt10 mb50">
                       <div class="desc-title">Rates</div>
                       <div class="desc-info mt10">1 JST = NaN Sun</div>
                       <div class="desc-info">1 Sun = 19.630547 JST</div>
                   </div>
               </div>
               <div class="btn confirm mb50 ml30 mr30" >Confirm</div>
          </div>
      </div>

       <div id="addLiquidity" class="addLiquidity"> 
          <div class="header">
            <div class="logo"></div>
            <div class="menu"></div>
          </div>
          <div class="content">
            <div class="background"></div>
            <div class="title">Add Liquidity</div>
            <div class="pannel-info">
              <el-tabs type="border-card">
                  <el-tab-pane>
                  <span slot="label" class="single">Single assets</span>
                  <div class="pannel-info pd">
                      <div class="form-view bd">
                      <img src="" />
                      <img src="" />
                      <div class="droplist">
                          <div class="drop-head noborde" v-on:click="dropHeadClick(imgDropList)">
                          <span class="arrow down"></span>
                          <span class="drop-head-text">{{ imgDropList.select.text }}</span>
                          </div>
                          <ul class="dorp-content" v-show="imgDropList.dropListIsShow">
                          <li
                              class="dorp-content-item"
                              v-on:click="formViewDropClick(imgDropList, liItem)"
                              v-for="(liItem, liIndex) in imgDropList.dropList"
                              :key="liIndex"
                          >
                              {{ liItem.text }}
                          </li>
                          </ul>
                      </div>
                      </div>
                      <div class="form-view">
                      <div class="form-view-item clearfix mt" v-for="(item, index) in formItem" :key="index">
                          <div class="form-view-item-top">
                          <div class="max-num">
                              <span class="max-wrap">MAX</span>
                              <span class="num">94.850.00</span>
                          </div>
                          <div class="droplist">
                              <div class="drop-head" v-on:click="dropHeadClick(item)">
                              <span class="arrow down"></span>
                              <span class="drop-head-text">{{ item.select.text }}</span>
                              </div>
                              <ul class="dorp-content" v-show="item.dropListIsShow">
                              <li
                                  class="dorp-content-item"
                                  v-on:click="formViewDropClick(item, liItem)"
                                  v-for="(liItem, idx) in item.dropList"
                                  :key="idx"
                              >
                                  {{ liItem.text }}
                              </li>
                              </ul>
                          </div>
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
                      <div class="pannel-info-share">
                      <div class="btn create mt50">Approve</div>
                      <div class="btn add mt50">Supply</div>
                      </div>
                  </div>
                  </el-tab-pane>
                  <el-tab-pane>
                  <span slot="label" class="single">Double assets</span>
                  <div class="pannel-info pd">
                      <div class="form-view bd">
                      <img src="" />
                      <img src="" />
                      <div class="droplist">
                          <div class="drop-head noborde" v-on:click="dropHeadClick(imgDropList)">
                          <span class="arrow down"></span>
                          <span class="drop-head-text">{{ imgDropList.select.text }}</span>
                          </div>
                          <ul class="dorp-content" v-show="imgDropList.dropListIsShow">
                          <li
                              class="dorp-content-item"
                              v-on:click="formViewDropClick(imgDropList, liItem)"
                              v-for="(liItem, liIndex) in imgDropList.dropList"
                              :key="liIndex"
                          >
                              {{ liItem.text }}
                          </li>
                          </ul>
                      </div>
                      </div>
                      <div class="form-view">
                      <div class="form-view-item clearfix mt" v-for="(item, index) in formItem" :key="index">
                          <div class="form-view-item-top">
                          <div class="max-num">
                              <span class="max-wrap">MAX</span>
                              <span class="num">94.850.00</span>
                          </div>
                          <div class="droplist">
                              <div class="drop-head" v-on:click="dropHeadClick(item)">
                              <span class="arrow down"></span>
                              <span class="drop-head-text">{{ item.select.text }}</span>
                              </div>
                              <ul class="dorp-content" v-show="item.dropListIsShow">
                              <li
                                  class="dorp-content-item"
                                  v-on:click="formViewDropClick(item, liItem)"
                                  v-for="(liItem, liIndex) in item.dropList"
                                  :key="liIndex"
                              >
                                  {{ liItem.text }}
                              </li>
                              </ul>
                          </div>
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
                      <div class="pannel-info-share">
                      <div class="title">Prices and pool share</div>
                      <div class="item-wrap mt50">
                          <div class="item-box" v-for="(item, index) in shareInfo" :key="index">
                          <div class="num">{{ item.num }}</div>
                          <div class="text-info">{{ item.text }}</div>
                          </div>
                      </div>
                      <div class="btn create mt50">Approve</div>
                      <div class="btn add mt50">Supply</div>
                      </div>
                      <div class="your-position">Your position</div>
                      <div class="tab-container">
                      <el-table :data="origanizationData" style="width: 100%" :show-header="false">
                          <el-table-column prop="name">
                          <template slot-scope="scope">
                              <div class="organization-name">{{ scope.row.name }}</div>
                          </template>
                          </el-table-column>
                          <el-table-column prop="value" align="right">
                          <template slot-scope="scope">
                              <div class="organization-value">{{ scope.row.value }}</div>
                          </template>
                          </el-table-column>
                      </el-table>
                      </div>
                  </div>
                  </el-tab-pane>
              </el-tabs>
            </div>
            
          </div>
      </div>
   </div>
</template>
<script>
// import axios from 'axios'
// import { getOneToken, joinConnection, getTnsPrice, getInvitedAddress } from '@/api/api'
// import { handleClipboard } from '@/assets/js/clipboard.js'
export default {
  name: 'addLiquidity',
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
          dropList: [
            {
              value: 1,
              text: 'wtrx'
            },
            {
              value: 2,
              text: 'wtrx2'
            },
            {
              value: 3,
              text: 'wtrx3'
            }
          ],
          num: '94.850.00',
          max: 'max',
          balance: {
            text: 'Balance',
            num: '560’000'
          }
        },
        {
          select: {
            value: 1,
            text: 'usdt'
          },
          dropListIsShow: false,
          dropList: [
            {
              value: 1,
              text: 'usdt'
            },
            {
              value: 2,
              text: 'usdt2'
            },
            {
              value: 3,
              text: 'usdt3'
            }
          ],
          num: '0.00',
          max: 'max',
          balance: {
            text: 'Balance',
            num: '1’000'
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
    },
    dialogCancel(){
     
    }
  },
  mounted() {
    this.init()
  }
}
</script>
<style lang="less">
@import '@/themes/style/common.less';
@import '@/themes/style/dialog.less';
@import '@/themes/style/header.less';
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
