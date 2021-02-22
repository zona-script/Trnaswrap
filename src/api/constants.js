import axios from 'axios'
const qs = require('qs')
const server = {
  // development: 'https://tunaswap.pro/',
  // production: 'https://tunaswap.pro/'
  development: 'http://47.242.236.26:8010/',
  production: 'http://47.242.236.26:8010/'
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
  let onetoken = localStorage.getItem('oneToken')
  if(onetoken){
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + onetoken
  }
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
