import axios from 'axios'
const qs = require('qs')
const server = {
  development: 'http://47.242.76.240:8010/',
  production: 'http://47.242.76.240:8010/'
}

const jsonUrl = (json) => {
  const arr = []
  let str = ''
  for (const i in json) {
    str = i + '=' + json[i]
    arr.push(str)
  }
  return arr.join('&')
}

export const fet = (url, data, method, postHeaders) => {
  const realUrl = server[process.env.NODE_ENV] + url
  const type = method.toLowerCase()
  let res = {}
  if (type === 'get') {
    res = axios.get(realUrl + '?' + jsonUrl(data))
      .catch(function(error) {
        alert(error)
      })
  } else if (type === 'post') {
    res = axios.post(realUrl, qs.stringify(data), postHeaders)
      .catch(function(error) {
        alert(error)
      })
  } else if (type === 'put') {
    res = axios.put(realUrl, qs.stringify(data), postHeaders)
      .catch(function(error) {
        alert(error)
      })
  }
  return res
}
