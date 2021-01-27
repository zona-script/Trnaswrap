<template>
  <div id="vote" class="vote">
    <div class="vote-banner">
      <div class="vote-banner-inner">
        <div class="banner-img">
          <img :src="require('@/themes/images/vote/banner.jpg')" alt="">
        </div>
        <div class="banner-des">
          <div class="title">Vote</div>
          <div class="describe">Based on the current market conditions and in order to alleviate the selling pressure of market currency prices, a whole network vote was initiated to apply for TCC to suspend currency mining. The restart will be decided based on market conditions.</div>
          <div class="note">
            <div class="note-item">
              <div class="key">Countdown</div>
              <div class="value">2d 6h 58m 5s</div>
            </div>
            <div class="note-item">
              <div class="key">My voting rights</div>
              <div class="value">12份</div>
            </div>
          </div>
          <div class="code">TNdG6UZmVeNKu1MQGAW1B94EB1sUgYwG</div>
          <div class="btn-container">
            <el-button :loading="false" class="btn confirm">Agree</el-button>
            <el-button :loading="false" class="btn confirm">negative</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="vote-content">
      <div class="background"></div>
      <div class="vote-content-inner">
        <div class="statistic">
          <div class="title">Vote statistics</div>
          <div class="statis-container">
            <div class="statis-container-item">
              <div class="key">Voting participants</div>
              <div class="value">20</div>
            </div>
            <div class="statis-container-item">
              <div class="key">Voting votes</div>
              <div class="value">3576</div>
            </div>
            <div class="statis-container-item">
              <div class="key">In favor of the vote</div>
              <div class="value">100%</div>
            </div>
            <div class="statis-container-item">
              <div class="key">Negative</div>
              <div class="value">0.00%</div>
            </div>
  
          </div>
        </div>
        <el-button :loading="false" class="btn confirm mt50">poll</el-button>
        <div class="poll">
          <div class="title">Poll</div>
          <textarea class="text-area" name="" id="" cols="30" rows="10" resize="none" placeholder="Voting content"></textarea>
          <el-button :loading="false" class="btn confirm">Submit</el-button>
        </div>
      </div>
      <tool-icon></tool-icon>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Pool',
  data() {
    return {
      collapse: true
    }
  },
  methods: {
    collapseFunc() {
      this.collapse = !this.collapse;
    }
  }
}
</script>
<style lang="less">
@import '@/themes/style/button.less';
@import '@/themes/style/vote.less';
</style>
