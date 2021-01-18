import {
  CONNECT_WALLET,
  SET_TOKEN_DATA,
  SET_PAIR_DATA,
  SET_THEME_RED
} from './action-types'

const mutations = {
  [CONNECT_WALLET](state, payload) {
    payload.balance = window.tronWeb.fromSun(payload.balance)
    state.walletAddres = payload
    state.connectFlag = true
  },
  changeTolerance(state, num) {
    state.tolerance = num
  },
  [SET_THEME_RED](state, payload) {
    state.dark = payload
  },
  [SET_TOKEN_DATA](state, payload) {
    const arr = payload.map(el => {
      el.name = el.name.toLocaleUpperCase()
      return el
    })
    state.tokenData = arr
  },
  [SET_PAIR_DATA](state, payload) {
    const arr = payload.map(el => {
      el.pair = el.pair.toLocaleUpperCase()
      el.token1.name = el.token1.name.toLocaleUpperCase()
      el.token2.name = el.token2.name.toLocaleUpperCase()
      return el
    })
    state.pairData = arr
  }

}

export default mutations
