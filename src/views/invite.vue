<template>
  <div id="invite" class="invite">
    <headTitle></headTitle>
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
          <div class="value">{{ tnsPrice }}</div>
          <div class="unit">USDT</div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="background"></div>
      <div class="invite-info">
        <div class="container-title">INVITE</div>
        <div class="info-container">
          <div class="title">My Address</div>
          <div class="value">{{ myAddress }}</div>
          <div class="title">My Inviter Address</div>
          <div class="value">{{ myInviterAddress }}</div>
          <div class="title">My Invitation Link</div>
          <div class="value">{{ myInvitationLink }}</div>
        </div>
      </div>
      <div class="copy-all" @click="tapHandle">COPY ALL LINKS</div>
      <div class="border-container organization">
        <div class="title">Organization</div>
        <div class="tab-container organization">
          <el-table :data="origanizationData" style="width: 100%" :show-header="false">
            <el-table-column prop="name"></el-table-column>
            <el-table-column prop="value"></el-table-column>
          </el-table>
        </div>
      </div>
      <div class="border-container referral">
        <div class="title">Referral</div>
        <div class="tab-container">
          <el-table :data="referralData" style="width: 100%" :header-row-class-name="'tab-title-line'">
            <el-table-column prop="referral" label="Referral"></el-table-column>
            <el-table-column prop="partner" label="Partner" align="right"></el-table-column>
            <el-table-column prop="performance" label="Performance" align="right"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { getOneToken, joinConnection, getTnsPrice, getInvitedAddress } from '@/api/api'
import { handleClipboard } from '../assets/js/clipboard.js'
export default {
  name: 'Invite',
  props: {
    origanizationData: {
      default: () => [
        {
          name: 'Global quantity',
          value: '73560'
        },
        {
          name: 'Team partner',
          value: '3576'
        },
        {
          name: 'Team performance',
          value: '57985'
        },
        {
          name: 'Grade',
          value: 'T3'
        }
      ]
    },
    referralData: {
      default: () => [
        {
          referral: 'TBu3750F25W',
          partner: '317',
          performance: '7965'
        },
        {
          referral: 'BTXubABT23a',
          partner: '523',
          performance: '3174'
        }
      ]
    }
  },
  data() {
    return {
      myAddress: '',
      myInviterAddress: '',
      myInvitationLink: '',
      tnsPrice: 0
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
        address: that.myAddress,
        invitedAddress: that.myInviterAddress
      }
      joinConnection(params).then(result => {
        if (result.data.code == 0) {
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + result.data.data.token
          getTnsPrice().then(res => {
            if (res.data.code == 0) {
              that.tnsPrice = res.data.data.tnsprice
            }
          })
          that.getInviter()
        } else {
          that.myInviterAddress = 'Please contact your superior'
        }
      })
    }
  },
  mounted() {
    this.init()
    this.myInviterAddress = this.getUrlKey('inviter', window.location.href)
  }
}
</script>

<style lang="less">
@import '../themes/style/invite.less';
</style>
