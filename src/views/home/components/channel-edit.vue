<template>
  <div class="channel-edit">
    <van-cell :border="false">
        <div slot="title" class="title-text">我的频道</div>
        <van-button
        class="edit-btn"
         type="danger"
         plain
         round
         size="mini" @click="isEdit=!isEdit">{{isEdit ? '完成' : '编辑'}}</van-button>
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item class="grid-item" v-for="(cnannel, index) in myChannels" :key="index"
      @click="onMychannelClick(cnannel, index)">
      <van-icon v-show="isEdit && !fiexdChannels.includes(cnannel.id)" slot="icon" name="clear"></van-icon>
       <!-- v-bind:class 语法一个对象 Key表示css作用，value表示计算值 true false -->
       <span class="text" slot="text" :class="{active: index===active}">{{cnannel.name}}</span>
       </van-grid-item>
    </van-grid>
     <!-- 频道推荐 -->
    <van-cell :border="false">
        <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item class="grid-item" v-for="(channel,index) in recommendChannels" :key="index" icon="plus"  :text="channel.name"
      @click="onAddChannel(channel)" />
    </van-grid>
     <!-- /频道推荐 -->
  </div>
</template>

<script>
import { getAllChannels, addUserChannel, deleteUserChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [], // 所有频道
      isEdit: false, // 控制编辑状态的显示
      fiexdChannels: [0, 1] // 固定频道,不允许删除
    }
  },
  computed: {
    ...mapState(['user']),
    // 计算属性会观测内部依赖数据的变化
    // 如果依赖的数据发生变化,则计算属性会重新执行
    recommendChannels () {
      // 这里是下面的简写版本
      // 数组的 filter方法
      // 便利数组,吧符合条件的元素存储到新数组中并且返回
      return this.allChannels.filter(channel => {
        // const channels = []
        return !this.myChannels.find(myChannel => {
          return myChannel.id === channel.id
        })
        // return channels
      })
    }
    // recommendChannels () {
    //   const channels = []
    //   this.allChannels.forEach(channel => {
    //     // find 便利数组,找到满足条件的元素项
    //     const ret = this.myChannels.find(myChannel => {
    //       return myChannel.id === channel.id
    //     })
    //     // 没有该频道项，则收集到推荐频道中
    //     if (!ret) {
    //       channels.push(channel)
    //     }
    //   })
    //   // 把计算结果返回
    //   return channels
    // }
  },
  watch: {},
  created () {
    this.loadgetAllChannels()
  },
  mounted () {},
  methods: {
    async loadgetAllChannels () {
      try {
        const { data } = await getAllChannels()
        // console.log(data)
        this.allChannels = data.data.channels
      } catch (err) {
        this.$toast('数据获取失败')
      }
    },
    async onAddChannel (channel) {
      // console.log(channel)
      this.myChannels.push(channel)

      // 数据持久化登录处理
      // 已登录,吧数据请求接口放到线上
      try {
        if (this.user) {
          await addUserChannel({
            id: channel.id, // 频道id
            seq: this.myChannels.length // 序号
          })
        } else {
          // 未登录，把数据存储到本地 本地数据持久化
          setItem('TOUTIAO_CHANNELS', this.myChannels)
        }
      } catch (err) {
        this.$toast('保存失败, 请稍后重试')
      }
    },
    onMychannelClick (channel, index) {
      // console.log(channel, index)
      if (this.isEdit) {
        // 1.如果是固定的频道那就不删除
        if (this.fiexdChannels.includes(channel.id)) {
          return
        }
        // 2.如果是编辑状态,执行删除频道
        this.myChannels.splice(index, 1)
        // 3.true是判断isChennelEditshow
        if (index <= this.active) {
          // 让激活频道的索引-1
          this.$emit('update-active', this.active - 1, true)
        }
        // 4.处理删除持久化
        this.deleteChannel(channel)
      } else {
        // 非编辑状态,频道切换
        this.$emit('update-active', index, false)
      }
    },
    async deleteChannel (channel) {
      try {
        if (this.user) {
          // 已登录，则将数据更新到线上
          await deleteUserChannel(channel.id)
        } else {
          // 为登录,将数据更新到本地 数据持久化
          setItem('TOUTIAO_CHANNELS', this.myChannels)
        }
      } catch (err) {
        this.$toast('保存失败, 请稍后重试')
      }
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
    padding: 85px 0;
    .title-text {
        font-size: 32px;
        color: #333333;
    }
    .edit-btn {
        width: 104px;
        height: 48px;
        font-size: 26px;
        color: #f85959;
        border: 1px solid #f85959;
    }
    /deep/ .grid-item {
        width: 160px;
        height: 86px;
       .van-grid-item__content {
          white-space: nowrap;
          background-color: #f4f5f6;
          .van-grid-item__text, .text {
            font-size: 28px;
            color: #222;
             margin-top: 0px;
          }
          .active{
            color:red
          }
          .van-grid-item__icon-wrapper {
            position: unset;
          }
       }
    }
    /deep/ .my-grid {
        .grid-item{
            .van-icon-clear{
                font-size: 15px;
                position: absolute;
                right: -5px;
                top: -5px;
                z-index: 2;
                color: #cacaca;
            }
        }
        }
   /deep/ .recommend-grid {
        .van-grid-item__content{
            flex-direction: row;
            .van-grid-item__icon {
                font-size: 28px;
                margin-right: 6px;
            }
        }
    }
}
</style>
