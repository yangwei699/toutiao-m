<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <!-- Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
    <form action="/" class="search-form">
    <van-search
      v-model="searchText"
      show-action
      placeholder="请输入搜索关键词"
      background="#3296fa"
      @search="onSearch"
      @cancel="onCancel"
      @focus="isResultShow = false"
    />
    </form>
    <!-- /搜索栏 -->

    <!-- 搜索结果 -->
    <SearchResult v-if="isResultShow" :search-text="searchText"></SearchResult>
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <!-- searchText如果有内容就成立 -->
    <SearchSuggestion v-else-if="searchText" :search-text="searchText" @search="onSearch"></SearchSuggestion>
    <!-- /联想建议 -->

    <!-- 搜索历史记录 -->
    <SearchHistory v-else :searchHistory="SearchHistories" @updateSearchHistory="clearsearchHistory"
    @search="onSearch"></SearchHistory>
    <!-- /搜索历史记录 -->

  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchSuggestion from './components/search-suggestion.vue'
import SearchResult from './components/search-result.vue'
import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  props: {},
  data () {
    return {
      searchText: '',
      isResultShow: false, // 控制搜索结果的展示
      SearchHistories: getItem('TOUTIAO_SEARCH_HISTORIES') || [] // 搜索的历史纪录数据
    }
  },
  computed: {},
  watch: {
    SearchHistories (value) {
      setItem('TOUTIAO_SEARCH_HISTORIES', value)
    }
  },
  created () {},
  mounted () {},
  methods: {
    onSearch (val) {
      // 更新文本框内容
      // console.log(val)
      this.searchText = val

      // 存储搜索历史记录
      // 要求，不要有重复的历史记录，最新的排在前面
      const index = this.SearchHistories.indexOf(val)
      if (index !== -1) {
        this.SearchHistories.splice(index, 1)
      }
      this.SearchHistories.unshift(val)

      // 渲染搜索结果
      this.isResultShow = true
    },
    onCancel (val) {
      this.$router.back()
    },
    clearsearchHistory () {
      this.SearchHistories = []
    }
  }
}
</script>

<style scoped lang="less">
  .search-container {
    padding-top: 108px;
    .van-search__action {
      color: #fff;
    }
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
</style>
