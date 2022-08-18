<template>
  <!--
    Cell 单元格的 to 属性 和VerRouter中的RouterLink组件的to 属性的用法一样的
    路由跳转多种方式
    :to ="'/article/' + article.art_id"
    :to=`/article/${article.art_id}`
    :to="{
      name: 'article',

      //传递路由动态参数
      params: {
        articleId: articke.art_id
      }
    }"
   -->
    <van-cell class="article-item" :to="{name:'article',params:{aticleId:article.art_id}}">
      <div slot="title" class="title van-multi-ellipsis--l2">{{ article.title }}</div>
        <div slot="label">
         <div v-if="article.cover.type===3" class="cover-wrap">
           <div class="cover-item" v-for="(img, index) in article.cover.images" :key="index">
            <van-image
            class="cover-item-img"
            :src="img"
            fit="cover"
            />
          </div>
         </div>
          <div>
            <span>{{ article.aut_name }}</span>
            <span>{{ article.comm_count }}阅读</span>
            <span>{{ article.pubdate | relativeTime}}</span>
          </div>
        </div>
        <van-image
        v-if="article.cover.type===1"
        class="right-cover"
        slot="default"
        :src="article.cover.images[0]"
        fit="cover"
        />
        </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  components: {},
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.article-item{
    .title{
        font-size: 32px;
        color: #3a3a3a;
    }
    .vant-cell_value {
      flex: unset;
      width: 232px;
      height: 146px;
      padding-left: 25px;
    }
    .right-cover {
        width: 232px;
        height: 146px;
    }
    .van-cell__label span{
       font-size: 22px;
       color: #b4b4b4;
       margin-right: 10px;
    }
    .cover-wrap {
      display:  flex;
      padding:  30px 0;
      .cover-item {
        flex: 1;
        height: 146px;
        /* 要使用CSS选择元素中除最后一个之外的所有子元素，可以使用使用:not和:last-child选择器 */
        &:not(:last-child) {
            padding-right: 4px;
        }
        // margin-bottom: 5px;
        .cover-item-img{
            width: 100%;
            height: 146px;
        }
      }
    }
}
</style>
