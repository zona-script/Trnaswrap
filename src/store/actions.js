import * as types from './action-types'

const action = {
  async connectWallett({ commit }, flag) {
    if (flag === false) return
    try {
      const res = await window.tronWeb.trx.getAccount(window.tronWeb.defaultAddress.base58)
      commit(types.CONNECT_WALLET, res)
    } catch (error) {
      console.log(error)
    }
  },
  setTokenData({ commit }, data) {
    commit(types.SET_TOKEN_DATA, data)
  },
  setPairData({ commit }, data) {
    commit(types.SET_PAIR_DATA, data)
  },
  settheme({ commit }, data) {
    commit(types.SET_THEME_RED, data)
  }
}
export default action
