import Promise from 'promise'
import store from '@/store'
import { init } from '@/api/login'

let baseURL = process.env.BASE_API

// 获取login微信code
const getLoginCode = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      success(res) {
        if (res.code) {
          console.log(res.code)
          resolve(res.code)
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

const request = (opt) => {
  let config = Object.assign({
    header: {
      'Content-Type': 'application/json',
      'Yotoo-Token': store.state.user.userToken['Yotoo-Token'] || wx.getStorageSync('userToken')['Yotoo-Token']
    },
    data: {},
    url: ''
  }, opt)
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL + config.url,
      data: config.data,
      header: config.header,
      method: config.method.toUpperCase(), // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: (res) => {
        resolve(res.data)
      },
      fail: (msg) => {
        console.log('reqest error', msg)
        reject(new Error('fail'))
      }
    })
  })
}

const updateLoginStatus = () => {
  init().then((res) => {
    if (res.code === 0) {
      console.log('登录状态已更新')
    } else {
      console.log('登录状态更新失败')
    }
  }).catch(() => {
    console.log('登录状态更新失败')
  })
}

// 获取用户token
const getUserToken = () => {
  return new Promise((resolve, reject) => {
    // 查看是否授权
    wx.getSetting({
      success: function(res) {
        let userToken = wx.getStorageSync('userToken')
        if (res.authSetting['scope.userInfo'] && userToken) {
          store.commit('set_token', userToken)
          updateLoginStatus()
          resolve(userToken)
        } else {
          getLoginCode()
          reject(new Error('fail'))
        }
      }
    })
  })
}

export {
  request,
  getLoginCode,
  getUserToken
}
