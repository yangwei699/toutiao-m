<template>
  <div class="search-suggestion">
    <!-- 有插槽slot 可以不用:title   :title="text"-->
    <van-cell  icon="search" v-for="(text,index) in suggestions" :key="index" @click="$emit('search', text)">
      <div slot="title" v-html="highlig(text)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchsuggestions } from '@/api/search'
// 按需加载有好处,指挥把使用到的成员打包到结果中
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: [], // 联想建议数据列表
      htmlStr: 'Hello <span style="color: red">World</span>'
    }
  },
  computed: {},
  watch: {
    searchText: {
      // 当searchText 发生改变就会调用 handle函数
      // 注意: handler 函数名称是固定的
      // handler (value) {
      //   // console.log(value)
      //   this.loadgetSearchsuggestions(value)
      // },
      handler: debounce(function (value) {
        this.loadgetSearchsuggestions(value)
      }, 1000),
      // 防抖 可以用第三方包Lodash
      immediate: true // 该回调将会在侦听开始之后被立即调用
    }
  },
  created () {},
  mounted () {},
  methods: {
    async loadgetSearchsuggestions (q) {
      try {
        const { data } = await getSearchsuggestions(q)
        // console.log(data)
        // 里面没有数值直接返回
        if (data.data.options[0] === null) {
          return
        }
        this.suggestions = data.data.options
      } catch (err) {
        this.$toast('数据获取失败')
      }
    },
    highlig (text) {
      // console.log(text)
      const highligthStr = `<span class="active">${this.searchText}</span>`
      /* 正则表达式 */
      // 中间的内容都会当做匹配字符来使用，而不是数据变量
      // RegExp 正则表达式结果函数
      //  参数1,匹配模式字符串，它会根据这个字符串创建正则对象
      //  参数2，匹配模式,要写到字符串中
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, highligthStr)
    }
  }
}
</script>

<style scoped lang="less">
 .search-suggestion {
  /deep/ span.active {
    color: #3296fa  ;
  }
}
</style>
