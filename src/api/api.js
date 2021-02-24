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

//获取我的邀请人
export function getInvitedAddress(params) {
  return fet('api/getInvitedAddress', params, 'get')
}

//获取用户团队
export function getUserTeam(params) {
  return fet('api/team', params, 'get')
}

//获取token信息
export function getTokenList(params) {
  return fet('api/coin/tokenInfo', params, 'get')
}

//获取交易对信息
export function getPairList(params) {
  return fet('api/coin/pairInfo', params, 'get')
}

//资金池
export function getPools(params){
  return fet('api/capitalPool', params, 'post')
}

//冲币
export function doDeposit(params){
  return fet('api/deposit', params, 'post')
}

//提币
export function doWithdraw(params){
  return fet('api/withdraw', params, 'post')
}

//个人数据统计
export function userInfo(params){
  return fet('api/info', params, 'post')
}
export { api }
