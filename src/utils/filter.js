export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }

  if ((time + '').length === 10) {
    time = +time * 1000
  }

  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    date = new Date(parseInt(time))
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()
  const timeNow = new Date(now)
  const diff = (now - d) / 1000

  if (diff < 60) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.floor(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.floor(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '昨天'
  } else if (diff < 3600 * 24 * 7) {
    const day = Math.floor(diff / (3600 * 24))
    return `${day}天前`
  } else if (d.getFullYear() === timeNow.getFullYear()) {
    return `${d.getMonth() + 1}月${d.getDate()}日`
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
  }
}

export function formatDate(time) {
  if (!time) {
    return ''
  }
  time = +time * 1000
  const d = new Date(time)
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}

export function formatNum(num) {
  if (!num) {
    return 0
  }
  let rNum = Number(num)
  return rNum >= 10000 ? (rNum / 10000).toFixed(1) + '万' : rNum
}
