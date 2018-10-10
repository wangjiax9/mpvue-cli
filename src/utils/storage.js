export default {
  getItem(key) {
    try {
      var value = wx.getStorageSync(key)
      if (value) {
        return value
      }
    } catch (e) {
      console.log(e)
    }
  },
  setItem(key, value) {
    try {
      wx.setStorageSync(key, value)
    } catch (e) {
      console.log(e)
    }
  },
  removeItem(key) {
    try {
      wx.removeStorage({
        key: key
      })
    } catch (e) {
      console.log(e)
    }
  }
}
