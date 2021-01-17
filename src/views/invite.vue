<template>
  <div id="invite" class="invite">
    <div class="header">
      <div class="logo"></div>
      <div class="menu"></div>
    </div>
    <div class="banner">
      <div class="banner-image"></div>
      <div class="banner-logo"></div>
      <div class="banner-desc">Deposit Tns Tokens and Share Trading Fees Forever</div>
      <div class="banner-info">
        <div class="start">
          <div class="value">1.0</div>
          <div class="unit">TNS</div>
        </div>
        <div class="exchange"></div>
        <div class="end">
          <div class="value">{{tnsPrice}}</div>
          <div class="unit">USDT</div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="background"></div>
      <div class="title">INVITE</div>
      <div class="invite-info">
        <div class="title">My Address</div>
        <div class="value">{{myAddress}}</div>
        <div class="title">My Inviter Address</div>
        <div class="value">{{myInviterAddress}}</div>
        <div class="title">My Invitation Link</div>
        <div class="value">{{myInvitationLink}}</div>
      </div>
      <div class="copy-all" @click="tapHandle">COPY ALL LINKS</div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {getOneToken,joinConnection,getTnsPrice,getInvitedAddress} from '@/api/api'
  import { handleClipboard } from '../assets/js/clipboard.js'
  export default {
    name: 'invite',
    data() {
      return {
        myAddress:'',
        myInviterAddress:'',
        myInvitationLink:'',
        tnsPrice:0
      }
    },
    methods: {
      init() { // 初始化tronweb
        const that = this
        this.$initTronWeb().then(function(tronWeb) {
          that.myAddress = tronWeb.defaultAddress.base58
          that.joinClub()
        })
      },
      getUrlKey(name,url){
        　return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url) || [, ""])[1].replace(/\+/g, '%20')) || null
      },
      tapHandle(e) {
        let self = this;
        handleClipboard(self.myInvitationLink, e, () => {
          console.log('已经复制在剪贴版')
          self.$message({
            message: 'Copy succeeded',
            type: 'success'
          })
        }, () => {
          
        })
      },
      getInviter(){
        let that = this
        //获取推荐人
        if(that.myAddress=='TLtTdid8ap5AQq7jFtWmzRrJ3XX44w8LRi'){
          that.myInviterAddress = '0x0'
          that.myInvitationLink = 'https://tunaswap.pro/#/invite/?inviter='+tronWeb.defaultAddress.base58
        }else{
          getInvitedAddress().then(result=>{
            if(result.data.code==0){
              if(result.data.data){
                that.myInvitationLink = 'https://tunaswap.pro/#/invite/?inviter='+tronWeb.defaultAddress.base58
                that.myInviterAddress = result.data.data.invitedAddress
              }else{
                that.myInviterAddress = 'Please contact your superior'
              }
            }
          })
        }
        
      },
      
      joinClub(){
        let that = this
        let params = {
          address:that.myAddress,
          invitedAddress:that.myInviterAddress
        }
        joinConnection(params).then(result=>{
          if(result.data.code==0){
            axios.defaults.headers.common['Authorization'] = 'Bearer '+result.data.data.token
            
            that.getInviter()
          }else{
            that.myInviterAddress = 'Please contact your superior'
          }
        })
      }
    },
    mounted() {
      let that = this
      this.init()
      this.myInviterAddress = this.getUrlKey('inviter',window.location.href)
      getTnsPrice().then(res=>{
              if(res.data.code==0){
                that.tnsPrice = res.data.data.tnsprice
              }
            })
    }
  }
</script>

<style lang="less">
  @import "../themes/style/invite.less";
</style>