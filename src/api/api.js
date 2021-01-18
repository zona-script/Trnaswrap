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

export { api }
