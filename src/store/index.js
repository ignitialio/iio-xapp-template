import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

var storeInstance

export function getStore(Vue) {
  if (storeInstance) return storeInstance
  console.log('creating new store...')
  Vue.use(Vuex)

  const state = {
    user: null
  }

  const mutations = {
    user(state, value) {
      state.user = value
    }
  }

  const actions = {}

  storeInstance = new Vuex.Store({
    state,
    mutations,
    actions,
    plugins: [ createPersistedState() ]
  })

  return storeInstance
}
