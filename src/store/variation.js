import axios from 'axios'

export default {
  namespaced: true,
  state: {
    variations: []
  },
  getters: {
    variations (state) {
      return state.variations
    }
  },
  mutations: {
    SET_VARIATIONS (state, variations) {
      state.variations = variations
    }
  },
  actions: {
    async index ({ dispatch }) {
      await axios.get('variations').then(response => {
        return dispatch('attempt', response.data.variations)
      }).catch(error => {
        throw error
      })
    },
    async attempt ({ commit, state }, variations) {
      commit('SET_VARIATIONS', variations)
    },
    async create ({ dispatch }, form) {
      await axios.post('variation/create', form).then(response => {
        dispatch('index')
        return response
      }).catch(error => {
        throw error
      })
    }
  }
}
