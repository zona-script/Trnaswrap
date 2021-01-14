const state = {
  defaultAccout: ''
}
const mutations = {
  SET_DEFAULT_ACCOUT(state, name) {
    debugger
    state.defaultAccout = name
  }
}
const actions = {
  // 设置name
  setDefaultAccout({ commit }, name) {
    commit('SET_DEFAULT_ACCOUT', name)
  }
}
export default {
  state,
  mutations,
  actions
}
