import axios from 'axios'

export default {
  namespaced: true,
  state: {
    units: []
  },
  getters: {
    units (state) {
      return state.units
    }
  },
  mutations: {
    SET_UNITS (state, units) {
      state.units = units
    }
  },
  actions: {
    async index ({ dispatch }) {
      await axios.get('units').then(response => {
        return dispatch('attempt', response.data.units)
      }).catch(error => {
        throw error
      })
    },
    async attempt ({ commit, state }, units) {
      commit('SET_UNITS', units)
    },
    async create ({ dispatch }, form) {
      await axios.post('unit/create', form).then(response => {
        dispatch('index')
        return response
      }).catch(error => {
        throw error
      })
    }
  }
}
