<template>
   <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录"/>
    <!--/导航栏 -->
    <!--登录表单-->
    <!--
      表单验证:
      1.给 Van-field 组件配置 rules 验证规则
      参考文档https://vant-contrib.gitee.io/vant/v2/#/zh-CN/form#rule-shu-ju-jie-gou
      2.当表单提交的时候会自动触发表单验证
        如果验证通过，会触发 submit 事件
        如果验证失败,不会触发 submit
     -->
     <van-form ref="loginForm" @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        type="number"
      >
       <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
      <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <!--
            time:倒计时时间
           -->
           <van-count-down @finish="isCountDownShow = false" v-if="isCountDownShow" :time="1000 * 60" format="ss s"/>
          <van-button v-else native-type="button"  round class="send-sms-btn" size="small" type="default" @click="onSendSms">发送验证码</van-button>
        </template>
      </van-field>
      <div  class="login-btn-wrap">
        <van-button class="login-btn"  block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
    <!--/登录表单-->
   </div>
</template>

<script>
import { login, sendSms } from '@/api/user'

export default {
  name: 'LoginIndex',
  components: {},
  parops: {},
  data () {
    return {
      // username: '',
      // password: ''
      user: {
        mobile: '', // 手机号13911111111
        code: '' // 验证码246810
      },
      userFormRules: {
        mobile: [{ required: true, message: '手机号不能为空' }, { pattern: /1[3|5|7|8]\d{9}/, message: '手机号格式错误' }],
        code: [{ required: true, message: '验证码不能为空' }, { pattern: /\d{6}/, message: '验证码格式错误' }]
      },
      isCountDownShow: false // 是否展示倒计时
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onSubmit () {
      // 1.获取表单数据
      const user = this.user
      // 2.表单验证
      // 在组件中必须通过this.$toast 来调用 Tost 组件
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true, // 禁用背景点击
        duration: 0// 持续时间默认2秒 如果是0就持续展示
      })
      // 3.提交表单请求登录
      try {
        // const res = await login(this.user)
        // console.log(res)
        /* 结构 */
        const { data } = await login(user)
        // console.log(res)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功')// 会自动关闭上面的表单验证
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$$toast.fail('登录失败,请扫后重试')
        }
      }
      // 4.根据请求相应结果处理后续操作
    },
    async onSendSms () {
      console.log('onSendSms')
      // 1. 校验手机号
      try {
        await this.$refs.loginForm.validate('mobile')
        // console.log('验证通过')
      } catch (err) {
        return console.log('验证失败', err)
      }
      // console.log(123)
      // 2. 验证通过， 显示倒计时
      this.isCountDownShow = true
      // 3. 请求发送验证码
      try {
        // const res = await sendSms(this.user.mobile)
        // console.log('发送成功', res)
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        // console.log('发送失败', err)
        // 发送失败，关闭倒计时
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁,请稍后重试')
        } else {
          this.$toast('发送失败,请稍后重试')
        }
      }
    }
  }
}
</script>
<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 27px;
  }
  .send-sms-btn {
   width: 156px;
   height: 46px;
   line-height: 15px;
   background-color: #dedede;
   font-size: 5px;
   color: #666666;
  }
  .login-btn-wrap{
    padding: 53px 33px;
    .login-btn{
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
