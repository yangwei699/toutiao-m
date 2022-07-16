<template>
  <div id="app">
    <!-- 路由的出口 -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
  .box{
    width: 375px;
    height: 64px;
    background-color: pink;
  }
</style>
