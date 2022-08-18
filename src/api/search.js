/* 文章请求模块 */
import request from '@/utils/request'
/* 获取联想建议 */
export const getSearchsuggestions = q => {
  return request({
    method: 'GET',
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}
export const getSearchResult = params => {
  return request({
    method: 'GET',
    url: '/v1_0/search',
    params
  })
}
