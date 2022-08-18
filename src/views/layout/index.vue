<template>
  <div class="layout-container">
  <!-- 子路由出口 -->
  <router-view />
  <!-- /子路由出口 -->
  <!--
    route:开启路由模式
   -->
  <!-- 标签导航栏 -->
  <!-- 自能使用vant2自己的图片 icon="home-o" 如果想要自定义图片就在vant中翻找 TabbarItem Slots-->
  <!--默认子路由设置routes 注意官方文档错误是routes  -->
    <van-tabbar class="layout-tabbar" v-model="active" route routes>
        <!-- 自定义 -->
        <!-- 默认子路由一直高亮用exact -->
      <van-tabbar-item  to="/home"  >
        <i slot="icon" class="toutiao toutiao-shouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <!-- <van-tabbar-item icon="home-o">首页</van-tabbar-item> -->
      <van-tabbar-item  to="/qa"  >
        <i slot="icon" class="toutiao toutiao-wenda"></i>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item  to="/video" >
        <i slot="icon" class="toutiao toutiao-shipin"></i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item  to="/my">
        <i slot="icon" class="toutiao toutiao-wode"></i>
        <span class="text">{{$store.state.user ? '我的' : '未登录'}}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
  <!-- /标签导航栏 -->
</template>

<script>
export default {
  name: 'layout',
  components: {},
  porps: {},
  data () {
    return {
      active: 0
    }
  },
  computed: {},
  watch: {},
  beforeCreate () {
  },
  created () {
    const navBarActive = window.location.hash
    if (navBarActive === '#/') {
      this.active = 0
    } else if (navBarActive === '#/qa') {
      this.active = 1
    } else if (navBarActive === '#/video') {
      this.active = 2
    } else if (navBarActive === '#/my') {
      this.active = 3
    }
  },
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.layout-container{
  .layout-tabbar{
    i.toutiao{
      font-size: 40px;
    }
    span.text{
      font-size: 20px;
    }
  }
}
</style>
