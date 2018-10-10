var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"',
  // 开发API
  BASE_API: '"http://10.242.78.201:12345/wechat/fuchsiabox"'
  // 体验版API
  // BASE_API: '"https://dev.ypw.163.com/wechat/fuchsiabox"'
  // 线上API
  // BASE_API: '"https://applets.ypw.163.com/wechat/fuchsiabox"'
})
