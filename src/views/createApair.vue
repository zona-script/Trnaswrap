<template>
    <div id="createApair" class="createApair">
         <div class="header">
            <div class="logo"></div>
            <div class="menu"></div>
        </div>
        <div class="content">
            <div class="background"></div>
            <div class="title">Create a pair</div> 
            <div class="pannel-info pd">
                <p class="desc">You ll be the first liquidity provider of this pool,and your added token proportion will determine the initial price,You can also customize the distribution ratio of the pool fee income.</br>
please click "Confirm" when you have confirmedthe above proportion.</p>
                <div class="form-view">
                    <div class="form-view-item clearfix mt" v-for="item in formItem">
                        <div class="form-view-item-top">
                            <div class="max-num">
                                <span class="max-wrap">MAX</span>
                                <span class="num">94.850.00</span>
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
                <div class="btn confirm mt50">Confirm</div>
            </div>
        </div>
    </div>
</template>
<style lang="less">
  @import "../themes/style/common.less";
  @import "../themes/style/header.less";
  @import "../themes/style/button.less";
  @import "../themes/style/pannel.less";
  @import "../themes/style/formview.less";
  @import "../themes/style/createApair.less";
</style>
<script>
  import axios from 'axios'
  import {getOneToken,joinConnection,getTnsPrice,getInvitedAddress} from '@/api/api'
  import { handleClipboard } from '../assets/js/clipboard.js'
  export default {
    name: 'createApair',
    data() {
      return {
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
      }
    },
    methods: {
      init() { // 初始化tronweb
        const that = this
      },
      dropHeadClick(item){
        item.dropListIsShow=true;
      },
      formViewDropClick(item,subItem){
          item.dropListIsShow=false;
          item.select.text=subItem.text;
      }
    },
    mounted() {
      this.init()
      
    }
  }
</script>
