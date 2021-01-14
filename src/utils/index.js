import Vue from 'vue'
import { getTokenList, getPairList } from '../api/api'
// import tokenDataDev from './token'
// import tokenProdData from './token.prod.js'
/* eslint-disable */
export const TokenData = function(){
  return new Promise(function (resolve, reject) {
    getTokenList().then((res)=>{
      if(res.data.code==0){
        resolve(res.data.data)
      }else{
        resolve([])
      }
    })
  })
}
export const PairData = function(){
  return new Promise(function (resolve, reject) {
    getPairList().then((res)=>{
      if(res.data.code==0){
        resolve(res.data.data)
      }else{
        resolve([])
      }
    })
  })
}


export const generateId = function() {
  return Math.floor(Math.random() * 10000)
}

export const arrayFind = function(arr, pred) {
  const idx = arrayFindIndex(arr, pred)
  return idx !== -1 ? arr[idx] : undefined
}

export const coerceTruthyValueToArray = function(val) {
  if (Array.isArray(val)) {
    return val
  } else if (val) {
    return [val]
  } else {
    return []
  }
}

export const isIE = function() {
  return !Vue.prototype.$isServer && !isNaN(Number(document.documentMode))
}

export const isEdge = function() {
  return !Vue.prototype.$isServer && navigator.userAgent.indexOf('Edge') > -1
}
export const isEqual = function(value1, value2) {
  if (Array.isArray(value1) && Array.isArray(value2)) {
    return arrayEquals(value1, value2)
  }
  return looseEqual(value1, value2)
}

export const isEmpty = function(val) {
  // null or undefined
  if (val == null) return true

  if (typeof val === 'boolean') return false

  if (typeof val === 'number') return !val

  if (val instanceof Error) return val.message === ''

  switch (Object.prototype.toString.call(val)) {
    // String or Array
    case '[object String]':
    case '[object Array]':
      return !val.length

    // Map or Set or File
    case '[object File]':
    case '[object Map]':
    case '[object Set]': {
      return !val.size
    }
    // Plain Object
    case '[object Object]': {
      return !Object.keys(val).length
    }
  }

  return false
}

export function objToArray(obj) {
  if (Array.isArray(obj)) {
    return obj
  }
  return isEmpty(obj) ? [] : [obj]
}

export function isString(obj) {
  return Object.prototype.toString.call(obj) === '[object String]'
}

export function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

export const isFunction = (functionToCheck) => {
  var getType = {}
  return (
    functionToCheck &&
    getType.toString.call(functionToCheck) === '[object Function]'
  )
}

export function rafThrottle(fn) {
  let locked = false
  return function(...args) {
    if (locked) return
    locked = true
    window.requestAnimationFrame(() => {
      fn.apply(this, args)
      locked = false
    })
  }
}

export const debounce = (fn, delay = 250) => {
  let time
  return function(...args) {
    if (time) {
      clearTimeout(time)
    }
    time = setTimeout(function() {
      fn.apply(this, args)
    }, delay)
  }
}
export const IsPc = () => {
  var userAgentInfo = navigator.userAgent
  var Agents = new Array(
    'Android',
    'iPhone',
    'SymbianOS',
    'Windows Phone',
    'iPad',
    'iPod'
  )
  var flag = true
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false
      break
    }
  }
  return flag
}
/************
 * @param name USDT
 * @param number  如果是单币种 如USDT 就不需要传，多币种 USDT/USDT 就需要0 或1
 */
export const requierImg =(name,number)=> {
    if (name) {
    try {
      name=name.toLocaleUpperCase();
       if (number != undefined) {
          str = name.split('/');
          return require('@/assets/img/currency/'+str[number]+'.png')
          
       }
        return require('@/assets/img/currency/'+name+'.png')
    } catch (error) {
        return require('@/assets/img/currency/avitve.png')
    }
  } else {
       return require('@/assets/img/currency/avitve.png')
  }
}
/* eslint-disable */