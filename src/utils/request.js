/**
 * 请求模块
 */
import axios from 'axios'
import store from '@/store/index.js'
/* JSONBig这个用来处理超出JS安全整数范围的问题 */
import JSONBig from 'json-bigint'

// const jsonStr = '{"art_id":123421512341231231214}'
// const jsonStr = `{"art_id": 123}`
// JSONBig.parse(jsonStr) // 把JSON格式的字符串转为javaScritp 安全整数的范围
// JSONBig.parse(jsonStr).art_id.toString()
// console.log(JSONBig.stringify(jsonStr))
// console.log(JSONBig.parse(jsonStr))
// console.log(JSON.stringify(JSONBig.parse(jsonStr)))// 把javaScritp对象为JSON格式的字符串转 格式的字符串
// console.log(JSONBig.stringify(JSONBig.parse(jsonStr)))// 把javaScritp对象为JSON格式的字符串转 格式的字符串

/* http://toutiao.itheima.net/ 新接口 */
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net/', // 接口的基准路径

  // 自定义后端返回的原始数据
  // data :后端返回的原始数据 ，说白了就是json格式的字符串
  transformResponse: [function (data) {
    try {
      return JSONBig.parse(data)
    } catch (err) {
      return data
    }
  }]
})

// 请求拦截器 在https://github.com/axios/axios#interceptors 直接复制即可
request.interceptors.request.use(function (config) {
  // 请求发起会经过这里
  // config: 本次请求的请求配置对象
  // console.log(config)
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // 注意: 这里务必放回 config 配置对象,否则请求就停在这里出不去了
  return config
}, function (error) {
  // 如果请求出错了(还没有发出去)会进入这里
  return Promise.reject(error)
})

// 响应拦截器

export default request
