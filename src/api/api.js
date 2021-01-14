import { fet } from './constants.js'

const api = {}
//获取一次性TOKEN
export function getOneToken(params) {
  return fet('api/v1/token/get', params, 'get')
}
//加入网体
export function joinConnection(params) {
  return fet('api/connection', params, 'post')
}
//获取TNS价格
export function getTnsPrice(params) {
  return fet('api/getTnsPrice', params, 'get')
}

export { api }
