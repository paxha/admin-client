import axios from 'axios'

export default {
  namespaced: true,
  state: {
    brands: []
  },
  getters: {
    brands (state) {
      return state.brands
    }
  },
  mutations: {
    SET_BRANDS (state, brands) {
      state.brands = brands
    }
  },
  actions: {
    async index ({ dispatch }) {
      await axios.get('brands').then(response => {
        return dispatch('attempt', response.data.brands)
      }).catch(error => {
        throw error
      })
    },
    async attempt ({ commit, state }, brands) {
      commit('SET_BRANDS', brands)
    },
    async create ({ dispatch }, form) {
      await axios.post('brand/create', form).then(response => {
        dispatch('index')
        return response
      }).catch(error => {
        throw error
      })
    }
  }
}
