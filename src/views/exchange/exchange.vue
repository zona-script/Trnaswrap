<template>
<div>
    
    <select-token :tokens="selectTokens" :show="selectTokenShow" :selected-token="selectedToken" @selected-token-close="selectedTokenClose"></select-token>
    <div class="dialog-wrap" v-if="transactionSettings">
        <div class="mantle"></div>
        <div class="dialog-pannel min-h626">
            <h3 class="title"><span class="close"></span>Transaction Settings</h3>
            <p class="desc-text2 ml30 mr30 mt20">Your transaction will revert if the price changes unfavorably by more than this percenntage</p>
              <div class="pannel-info-share ml30 mr30">
                <div class="item-wrap">
                    <div class="item-box nobg  mt20" :class="{ 'select': item.isSelect }" v-for="(item, index) in shareInfo" :key="index">
                        <div class="num">{{ item.num }}</div>
                        <div class="text-info">{{ item.text }}</div>
                    </div>
                </div>
             </div>
        </div>
      </div>
    <div id="exchange" class="exchange">
      <headTitle></headTitle>
        <div class="content">
            <div class="background"></div>
            <div class="title">Exchange</div> 
            <div class="pannel-info pd">
                <div class="form-view">
                    <div class="form-view-item clearfix mt" v-for="item in formItem">
                        <div class="form-view-item-top">
                            <div class="max-num">
                                <span class="max-wrap">MAX</span>
                                <div class="input-wrap"><input class="num" value="94.850.00"></input></div>
                            </div>
                            <div class="droplist">
                                <div class="drop-head" v-on:click="dropHeadClick(item)"> 
                                    <span class="arrow down"></span>
                                    <span class="drop-head-text">{{item.select.text}}</span>   
                                </div>
                                <ul class="dorp-content" v-show="item.dropListIsShow">
                                     <li class="dorp-content-item" v-on:click="formViewDropClick(item,liItem)" v-for="liItem in item.dropList">{{liItem.text}}</li>
                                </ul>
                            </div>
                        </div>
                        <div class="balance-wrap">
                            <span class="num">{{item.balance.num}}</span>
                            <div class="balance">
                                <span class="img"></span>
                                 <span class="balance-text">{{item.balance.text}}</span>
                            </div>
                           
                        </div>
                    </div>
                </div>
                <div class="btn confirm mt50">Supply</div>
            </div>
        </div>
    </div>
</div>
</template>
<style lang="less">
  @import "@/themes/style/common.less";
  @import "@/themes/style/header.less";
  @import "@/themes/style/button.less";
  @import "@/themes/style/pannel.less";
  @import "@/themes/style/formview.less";
  @import "@/themes/style/dialog.less";
  @import "@/themes/style/exchange.less";
</style>
<script>
  import axios from 'axios'
  import {getOneToken,joinConnection,getTnsPrice,getInvitedAddress} from '@/api/api'
  import { handleClipboard } from '@/assets/js/clipboard.js'
  export default {
    name: 'exchange',
    data() {
      return {
        transactionSettings: false,
        selectTokenShow: false,
        selectTokens: [
          {
            id: 1,
            img: require('@/themes/images/dialog/b_2x.png'),
            txt: 'WTRX'
          },
          {
            id: 2,
            img: require('@/themes/images/dialog/token_04_2x.png'),
            txt: 'USDT'
          },
          {
            id: 3,
            img: require('@/themes/images/dialog/token_03_2x.png'),
            txt: 'JST'
          },
          {
            id: 4,
            img: require('@/themes/images/dialog/b_2x.png'),
            txt: 'SUN'
          },
          {
            id: 5,
            img: require('@/themes/images/dialog/b_2x.png'),
            txt: 'BTC'
          }
        ],
        formItem:[
        {
            select:{
                value:1,
                text:"wtrx"
            },
            dropListIsShow:false,
            dropList:[{
                value:1,
                text:"wtrx"
            },{
                value:2,
                text:"wtrx2"
            },{
                value:3,
                text:"wtrx3"
            }],
            num:"94.850.00" ,
            max:"max",
            balance:{
                text:"Balance",
                num:"560’000"
            }
        },{
             select:{
                value:1,
                text:"usdt"
            },
            dropListIsShow:false,
            dropList:[{
                value:1,
                text:"usdt"
            },{
                value:2,
                text:"usdt2"
            },{
                value:3,
                text:"usdt3"
            }],
            num:"0.00" ,
            max:"max",
            balance:{
                text:"Balance",
                num:"1’000"
            }
        }],
        shareInfo: [
            {
                num: "1%",
                text: 'Slippage tolerance'
            },
            {
                num:"5%",
                text: 'Slippage tolerance'
            },
            {
                num: "10%",
                text: 'Slippage tolerance'
            },
            {
                num: "30%",
                isSelect:true,
                text: 'Slippage tolerance'
            }
        ]
      }
    },
    methods: {
      init() { // 初始化tronweb
        const that = this
      },
      dropHeadClick(item){
        this.selectTokenShow = true;
      },
      formViewDropClick(item,subItem){
          item.dropListIsShow=false;
          item.select.text=subItem.text;
      },
      selectedToken(id) {
        console.log(id);
      },
      selectedTokenClose() {
        this.selectTokenShow = false;
      }
    },
    mounted() {
      this.init()
      
    }
  }
</script>
