import axios from 'axios'

export default {
  namespaced: true,
  state: {
    attributes: []
  },
  getters: {
    attributes (state) {
      return state.attributes
    }
  },
  mutations: {
    SET_ATTRIBUTES (state, attributes) {
      state.attributes = attributes
    }
  },
  actions: {
    async index ({ dispatch }) {
      await axios.get('attributes').then(response => {
        return dispatch('attempt', response.data.attributes)
      }).catch(error => {
        throw error
      })
    },
    async attempt ({ commit, state }, attributes) {
      commit('SET_ATTRIBUTES', attributes)
    },
    async create ({ dispatch }, form) {
      await axios.post('attribute/create', form).then(response => {
        dispatch('index')
        return response
      }).catch(error => {
        throw error
      })
    }
  }
}
