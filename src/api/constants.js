import axios from 'axios'
const qs = require('qs')
const server = {
  development: 'https://tunaswap.pro/',
  production: 'https://tunaswap.pro/'
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

export const fet = (url, data, method) => {
  const realUrl = server[process.env.NODE_ENV] + url
  const type = method.toLowerCase()
  let res = {}
  
  if (type === 'get') {
    res = axios.get(realUrl + '?' + jsonUrl(data))
      .catch(function(error) {
        alert(error)
      })
  } else if (type === 'post') {
    res = axios.post(realUrl, qs.stringify(data))
      .catch(function(error) {
        alert(error)
      })
  } else if (type === 'put') {
    res = axios.put(realUrl, qs.stringify(data))
      .catch(function(error) {
        alert(error)
      })
  }
  return res
}
