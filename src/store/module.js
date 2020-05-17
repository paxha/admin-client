import modules from '../data/modules'
import axios from 'axios'

export default {
  namespaced: true,
  state: {
    modules: modules
  },
  getters: {
    modules (state) {
      return state.modules
    }
  },
  mutations: {
    SET_MODULES (state, modules) {
      state.modules = modules
    }
  },
  actions: {
    async loadModules ({ dispatch, commit }) {
      await axios.get('modules').then(response => {
        return dispatch('attempt', response.data.modules)
      }).catch(error => {
        throw error
      })
    },
    async attempt ({ commit, state }, modules) {
      commit('SET_MODULES', modules)
    }
  }
}
