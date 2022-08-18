<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="$emit('updateSearchHistory',[])">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon v-else name="delete" @click="isDeleteShow=!isDeleteShow"></van-icon>
    </van-cell>
    <van-cell :title="item" v-for="(item,index) in searchHistory" :key="index" @click="onSearchItemClick(item, index)">
      <van-icon v-if="isDeleteShow" name="close"></van-icon>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  components: {},
  props: {
    // prop 数据 如果是普通数据(数字，字符串，布尔值)绝对不能修改
    // 即便修改了也不会传递给父组件
    /*
      如果引用类型数据(数组，对象)
        可以修改，列如: [].push [].splice
        不能重新赋值,xxx=[]  prop 是受到父组件数据的影响
    */
    searchHistory: {
      type: Array,
      required: true // 这个只读不能改
    }
  },
  data () {
    return {
      isDeleteShow: false // 控制删除显示状态
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onSearchItemClick (item, index) {
      if (this.isDeleteShow) {
        // 删除状态, 删除历史记录
        this.searchHistory.splice(index, 1)
      } else {
        // 非删除状态，直接进入搜索
        this.$emit('search', item)
      }
    }
  }
}
</script>

<style>

</style>
