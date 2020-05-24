import axios from 'axios'

export default {
  namespaced: true,
  state: {
    products: []
  },
  getters: {
    products (state) {
      return state.products
    }
  },
  mutations: {
    SET_PRODUCTS (state, products) {
      state.products = products
    }
  },
  actions: {
    async index ({ dispatch }) {
      await axios.get('products').then(response => {
        return dispatch('attempt', response.data.products)
      }).catch(error => {
        throw error
      })
    },
    async attempt ({ commit, state }, products) {
      commit('SET_PRODUCTS', products)
    },
    async create ({ dispatch }, form) {
      await axios.post('product/create', form).then(response => {
        dispatch('index')
        return response
      }).catch(error => {
        throw error
      })
    }
  }
}
