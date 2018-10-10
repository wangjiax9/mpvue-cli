import { request } from '@/utils/request'

// 登录
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data: data
  })
}
// 刷新上次登录时间
export function init() {
  return request({
    url: `/init`,
    method: 'post'
  })
}
