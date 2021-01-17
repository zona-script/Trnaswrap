<template>
  <div id="invite" class="invite">
    <headTitle></headTitle>
    <div class="banner">
      <div class="banner-image"></div>
      <div class="banner-logo"></div>
      <div class="banner-desc">Deposit Tns Tokens and Share Trading Fees Forever</div>
      <div class="banner-info">
      </div>
    </div>
    <div class="content">
      <div class="background"></div>
      <div class="title">INVITE</div>
      <div class="invite-info">
        <div class="title">My Address</div>
        <div class="value">{{ myAddress }}</div>
        <div class="title">My Inviter Address</div>
        <div class="value">{{ myInviterAddress }}</div>
        <div class="title">My Invitation Link</div>
        <div class="value">{{ myInvitationLink }}</div>
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
    
  },
  mounted() {
  }
}
</script>

<style lang="less">
@import '../themes/style/invite.less';
</style>
