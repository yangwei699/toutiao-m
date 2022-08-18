/**
 * 用户相关请求模块
 */
import request from '@/utils/request'
// import store from '@/store'

export const login = data => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}
/*
 *发送验证码
 *注意: 每歌手机号每分钟1次
*/
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}
/* 获取用户自己的信息 */
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user'
    // // 发送请求头数据 这个是后端要求的 格式要注意
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}
/* 获取用户频道列表 */
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}
/* 关注用户 */
export const addFollow = target => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target
    }
  })
}
/* 取消关注用户 */
export const deleteFollow = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${target}`
  })
}
