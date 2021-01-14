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
  import {getOneToken,joinConnection,getTnsPrice} from '@/api/api'
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
          that.myInvitationLink = 'http://47.242.76.240/#/invite/?inviter='+tronWeb.defaultAddress.base58
          if(that.myAddress=='TLtTdid8ap5AQq7jFtWmzRrJ3XX44w8LRi'){
            that.myInviterAddress = 'TLtTdid8ap5AQq7jFtWmzRrJ3XX44w8LRi'
          }else{
            that.myInviterAddress = that.getUrlKey('inviter',window.location.href)
            if(!that.myInviterAddress){
              that.$message({
                message: 'You have to have an invitee',
                type: 'error'
              })
            }
          }
          that.oneToken()
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
      oneToken(){
        let that = this
        getOneToken().then(res=>{
          console.log(res)
          if(res.data.code==0){
            let params = {
              address:that.myAddress,
              invitedAddress:that.myInviterAddress,
              onToken:res.data.data
            }
            if(that.myInviterAddress && that.myAddress){
              //加入网体
              joinConnection(params).then(result=>{
                if(result.data.code==0){
                  console.log(result.data.data)
                  that.$message({
                    message: 'Success',
                    type: 'success'
                  })
                }else{
                  that.$message({
                    message: result.data.msg,
                    type: 'error'
                  })
                }
              })
            }
            //获取tns价格
            getTnsPrice({onToken:res.data.data}).then(result=>{
              if(result.data.code==0){
                that.tnsPrice = result.data.data.tnsprice
              }
            })
          }
        })
      }
    },
    mounted() {
      this.init()
      this.myInviterAddress = this.getUrlKey('inviter',window.location.href)
    }
  }
</script>

<style lang="less">
  @import "../themes/style/invite.less";
</style>