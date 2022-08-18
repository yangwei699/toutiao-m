<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button   class="search-btn" slot="title" type="info" size="small" round icon="search" to="/search">搜索</van-button>
    </van-nav-bar>
    <!--/导航栏 -->
    <!-- 频道列表 -->
    <!--
      通过tab 组件直接实现
      animated 专场动画
      swipeable 滑动切换 滑动的区域内容决定的
     -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab :title="channel.name" v-for="channel in channels" :key="channel.id">
        <!-- 文章列表 -->
        <ArticleList :channel="channel"></ArticleList>
        <!-- /文章列表 -->
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="bambuger-btn" @click="isChennelEditshow=true">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- /频道列表 -->
    <!-- 频道编辑弹出层 -->
     <van-popup
      v-model="isChennelEditshow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
     >
     <ChannelEdit :myChannels="channels" :active="active" @update-active="onUpdateActive"></ChannelEdit>
     </van-popup>
    <!-- /频道编辑弹出层 -->
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    ChannelEdit
  },
  props: {},
  data () {
    return {
      active: 0,
      channels: [], // 频道列表
      isChennelEditshow: false // 控制编辑频道弹出层的状态
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    this.loadChannels()
  },
  mounted () {},
  methods: {
    async loadChannels () {
      try {
        // const { data } = await getUserChannels()
        // // console.log(data)
        // this.channels = data.data.channels
        let channels = []

        if (this.user) {
          const { data } = await getUserChannels()
          channels = data.data.channels
        } else {
          // 未登录, 判断是否有本地的频道列表数据
          const loadChannels = getItem('TOUTIAO_CHANNELS')
          // 有,拿来使用
          if (loadChannels) {
            channels = loadChannels
          } else {
            // 没，请求获取默认频道列表
            const { data } = await getUserChannels()
            channels = data.data.channels
          }
        }
        this.channels = channels
        // 本地缓存数据持久化
        // 已登录, 请求获取用户频道列表
      } catch (err) {
        this.$toast('获取频道数据失败')
      }
    },
    onUpdateActive (index, isChennelEditshow = true) {
      // console.log('home', index)
      this.active = index
      this.isChennelEditshow = isChennelEditshow
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon{
      font-size: 32px;
   }
  }
}
/* /deep/ >>> 深度操作符不然显示不了颜色*/
/deep/ .channel-tabs {
  .van-tabs__wrap{
    position: fixed;
    top:92px;
    z-index: 1;
    left: 0;
    right: 0;
    height: 82px;
  }
  .van-tab {
    border-right: 1px solid #edeff3;
    min-width: 200px;
    font-size: 30px;
    color: #777777;
  }
  .van-tab--active{
    color: #333333;
  }
  .van-tabs__nav {
    padding-bottom: 0;
  }
  .van-tabs__line {
    bottom: 8px;
    width: 31px !important;
    height: 6px;
    background-color: #3296fa;
  }
  .placeholder{
    flex-shrink: 0;
    width: 66px;
    height: 82px;
  }
  .bambuger-btn{
    position: fixed;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 66px;
    height: 82px;
    background-color: #fff;
    opacity: 0.902;
    i.toutiao{
      font-size: 33px;
    }
    &::before{
    content: "";
    position: absolute;
    left: 0;
    width: 1px;
    height: 100%;
    /* ~@ 等于 ../../ */
    background-image: url(~@/assets/gradient-gray-line.png);
    background-size: contain;
    }
  }
}
</style>
