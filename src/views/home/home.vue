<template>
  <div id="home" class="home">
    <headTitle></headTitle>
    <div class="banner">
      <div class="banner-inner">
        <div class="banner-image"></div>
        <div class="banner-desc-container">
          <div class="banner-logo"></div>
          <div class="banner-desc">Deposit Tns Tokens and Share Trading Fees Forever</div>
          <div class="exchange">Go to exchange</div>
          <div class="menu">See The Menu</div>
        </div>
        <div class="banner-info">
          <div class="icon-container balance"></div>
          <div class="context">
            <div class="main-title">0.00000000</div>
            <div class="subtitle">My Tns Balance</div>
          </div>
        </div>
        <div class="banner-info">
          <div class="icon-container supply"></div>
          <div class="context">
            <div class="main-title">0.00</div>
            <div class="subtitle">Current Total Supply</div>
          </div>
        </div>
        <div class="banner-info">
          <div class="icon-container staked"></div>
          <div class="context">
            <div class="main-title">0.00</div>
            <div class="subtitle">Total Staked</div>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="background"></div>
      <div class="border-container">
        <div class="title">
          <div class="text">Top Pairs</div>
          <div class="detail">&gt;</div>
        </div>
        <div class="tab-container">
          <el-table :data="pairsData" style="width: 100%" :header-row-class-name="'tab-title-line'">
            <el-table-column prop="name" label="Name">
              <template slot-scope="scope">
                <div class="icon-container">
                  <img class="first-img" :src="scope.row.firstImg" />
                  <img class="second-img" :src="scope.row.secondImg" />
                </div>
                <div class="text-container">{{ scope.row.firstType + ' /' + scope.row.secondType }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="assets" label="Assets" align="right">
              <template slot-scope="scope">
                <div class="assets">{{ scope.row.assets + ' ' + scope.row.unit }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="liquidity" label="Liquidity" align="right">
              <template slot-scope="scope">
                <div class="liquidity">{{ scope.row.liquidity }}</div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
// import { getOneToken, joinConnection, getTnsPrice, getInvitedAddress } from '@/api/api'
// import { handleClipboard } from '@/assets/js/clipboard.js'
import { IsPc } from '@/utils/index'

export default {
  name: 'Home',
  props: {
    pairsData: {
      default: () => [
        {
          firstImg: require('@/themes/images/home/a.png'),
          secondImg: require('@/themes/images/home/b.png'),
          firstType: 'WTRX',
          secondType: 'USDT',
          name: '',
          assets: '82719.4073',
          unit: 'WTRX',
          liquidity: '5048.4546'
        },
        {
          firstImg: require('@/themes/images/home/a.png'),
          secondImg: require('@/themes/images/home/b.png'),
          firstType: 'WTRX',
          secondType: 'USDT',
          name: '',
          assets: '82719.4073',
          unit: 'WTRX',
          liquidity: '5048.4546'
        },
        {
          firstImg: require('@/themes/images/home/a.png'),
          secondImg: require('@/themes/images/home/b.png'),
          firstType: 'WTRX',
          secondType: 'USDT',
          name: '',
          assets: '82719.4073',
          unit: 'WTRX',
          liquidity: '5048.4546'
        },
        {
          firstImg: require('@/themes/images/home/a.png'),
          secondImg: require('@/themes/images/home/b.png'),
          firstType: 'WTRX',
          secondType: 'USDT',
          name: '',
          assets: '82719.4073',
          unit: 'WTRX',
          liquidity: '5048.4546'
        },
        {
          firstImg: require('@/themes/images/home/a.png'),
          secondImg: require('@/themes/images/home/b.png'),
          firstType: 'WTRX',
          secondType: 'USDT',
          name: '',
          assets: '82719.4073',
          unit: 'WTRX',
          liquidity: '5048.4546'
        }
      ]
    }
  },
  data() {
    return {
      IsPc: IsPc(),
      myAddress: '',
      myInviterAddress: '',
      myInvitationLink: '',
      tnsPrice: 0
    }
  },
  methods: {},
  mounted() {}
}
</script>

<style lang="less">
@import '@/themes/style/home.less';
</style>
