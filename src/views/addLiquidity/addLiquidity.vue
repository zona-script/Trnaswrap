<template>
    <div id="addLiquidity" class="addLiquidity">
         <div class="header">
            <div class="logo"></div>
            <div class="menu"></div>
        </div>
        <div class="content">
            <div class="background"></div>
            <div class="title">Add Liquidity</div> 
            <div class="pannel-info pd">
                <div class="tab">
                    <div class="tab-head-item"><router-link to="/doubleAssets">double assets</router-link> </div>
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
  @import "@/themes/style/tab.less";
  @import "@/themes/style/addLiquidity.less";
</style>
<script>
  import Vue from 'vue'
  import Router from 'vue-router'
  import axios from 'axios'
  import {getOneToken,joinConnection,getTnsPrice,getInvitedAddress} from '@/api/api'
  import { handleClipboard } from '@/assets/js/clipboard.js'
  Vue.use(Router) 

</script>
