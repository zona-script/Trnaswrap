<template>
  <div id="invite" class="invite">
    <!-- <headTitle></headTitle> -->
    <div class="banner">
      <div class="banner-inner">
        <div class="banner-image"></div>
        <div class="banner-desc-container">
          <div class="banner-logo"></div>
          <div class="banner-desc">{{$t('lang1')}}</div>
          <!-- <div class="banner-info">
            <div class="start">
              <img class="exchange-img fir" :src="require('@/themes/images/common/token_02_2x.png')" alt=""/>
              <div class="txt-container">
                <div class="value">1.0</div>
                <div class="unit">TNS</div>
              </div>
            </div>
            <div class="exchange"></div>
            <div class="end">
              <img class="exchange-img sec" :src="require('@/themes/images/common/token_04_2x.png')" alt=""/>
              <div class="txt-container">
                <div class="value">{{ tnsPrice }}</div>
                <div class="unit">USDT</div>
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
    <div class="content">
      <div class="background"></div>
      <div class="invite-info">
        <div class="container-title">{{$t('lang15')}}</div>
        <div class="info-container">
          <div class="info-item">
            <div class="title">{{$t('lang16')}}</div>
            <div class="value">{{ myAddress }}</div>
          </div>
          <div class="info-item">
            <div class="title">{{$t('lang17')}}</div>
            <div class="value">{{ myInviterAddress }}</div>
          </div>
          <div class="info-item">
            <div class="title">{{$t('lang18')}}</div>
            <div class="value">{{ myInvitationLink }}</div>
          </div>
        </div>
        <div class="copy-all" @click="tapHandle">{{$t('lang19')}}</div>
      </div>
      <div class="org-ref-container">
        <div class="border-container organization">
          <div class="title">{{$t('lang21')}}</div>
          <div class="tab-container">
            <el-table :data="origanizationData" style="width: 100%" :show-header="false">
              <el-table-column prop="name"></el-table-column>
              <el-table-column prop="value" align="right">
                <template slot-scope="scope">
                  <div class="organization-value">{{ scope.row.value }}</div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="border-container referral">
          <div class="title">{{$t('lang20')}}</div>
          <div class="tab-container">
            <el-table :data="referralData" style="width: 100%" :header-row-class-name="'tab-title-line'">
              <el-table-column prop="address" :label="$t('lang39')"></el-table-column>
              <el-table-column prop="teamNum" :label="$t('lang40')" align="center"></el-table-column>
              <el-table-column prop="performance" :label="$t('lang44')" align="center"></el-table-column>
              <el-table-column prop="teamPerformance" :label="$t('lang41')" align="right"></el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <tool-icon></tool-icon>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { getOneToken, joinConnection, getTnsPrice, getInvitedAddress, getUserTeam } from '@/api/api'
import { handleClipboard } from '@/assets/js/clipboard.js'
export default {
  name: 'Invite',
  data() {
    return {
      myAddress: '',
      myInviterAddress: '',
      myInvitationLink: '',
      tnsPrice: 0,
      referralData: [],
      origanizationData: [
        {
          name: this.$t('lang35'),
          value: '0'
        },
        {
          name: this.$t('lang36'),
          value: '0'
        },
        {
          name: this.$t('lang37'),
          value: '0'
        },
        {
          name: this.$t('lang38'),
          value: ''
        }
      ]
    }
  },
  methods: {
    init() {
      // 初始化tronweb
      const that = this
      this.$initTronWeb().then(function(tronWeb) {
        that.myAddress = tronWeb.defaultAddress.base58
        that.joinClub()
      })
    },
    getUrlKey(name, url) {
      return (
        decodeURIComponent(
          (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url) || [, ''])[1].replace(/\+/g, '%20')
        ) || null
      )
    },
    tapHandle(e) {
      let self = this
      handleClipboard(
        self.myInvitationLink,
        e,
        () => {
          console.log('已经复制在剪贴版')
          self.$message({
            message: 'Copy succeeded',
            type: 'success'
          })
        },
        () => {}
      )
    },
    getInviter() {
      let that = this
      // 获取推荐人
      if (that.myAddress == 'TLtTdid8ap5AQq7jFtWmzRrJ3XX44w8LRi') {
        that.myInviterAddress = '0x0'
        that.myInvitationLink = 'https://tunaswap.pro/#/invite/?inviter=' + tronWeb.defaultAddress.base58
      } else {
        getInvitedAddress().then(result => {
          if (result.data.code == 0) {
            if (result.data.data) {
              that.myInvitationLink = 'https://tunaswap.pro/#/invite/?inviter=' + tronWeb.defaultAddress.base58
              that.myInviterAddress = result.data.data.invitedAddress
            } else {
              that.myInviterAddress = 'Please contact your superior'
            }
          }
        })
      }
    },
    joinClub() {
      let that = this
      let params = {
        address: this.myAddress,
        invitedAddress: that.myInviterAddress
      }
      joinConnection(params).then(result => {
        if (result.data.code == 0) {
          sessionStorage.setItem('oneToken',result.data.data.token)
          that.getTeam()
          that.getInviter()
        } else {
          that.myInviterAddress = 'Please contact your superior'
        }
      })
    },
    getPrice() {
      let that = this
      getTnsPrice().then(res => {
        if (res.data.code == 0) {
          that.tnsPrice = res.data.data.tnsprice
        }
      })
    },
    getTeam() {
      let that = this
      getUserTeam().then(res => {
        if (res.data.code == 0) {
          that.origanizationData[0].value = res.data.data.wholeNetworkNum
          that.origanizationData[1].value = res.data.data.teamTotalNum
          that.origanizationData[2].value = parseInt(res.data.data.teamTotalPerformance)
          that.origanizationData[3].value = res.data.data.grade
          that.referralData = res.data.data.teamDto
          if(that.referralData.length>0){
            that.referralData.forEach((item,index)=>{
              item.teamPerformance = parseInt(item.teamPerformance)
              item.performance = parseInt(item.performance)
            })
          }
        }
      })
    }
  },
  mounted() {
    let that = this
    this.init()
    this.myInviterAddress = this.getUrlKey('inviter', window.location.href)
    this.getPrice()
  }
}
</script>

<style lang="less">
@import '@/themes/style/invite.less';
</style>
