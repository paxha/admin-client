import axios from 'axios'

export default {
  namespaced: true,
  state: {
    categories: []
  },
  getters: {
    categories (state) {
      return state.categories
    }
  },
  mutations: {
    SET_CATEGORIES (state, categories) {
      state.categories = categories
    }
  },
  actions: {
    async index ({ dispatch }) {
      await axios.get('categories').then(response => {
        return dispatch('attempt', response.data.categories)
      }).catch(error => {
        throw error
      })
    },
    async attempt ({ commit, state }, categories) {
      commit('SET_CATEGORIES', categories)
    },
    async create ({ dispatch }, form) {
      await axios.post('category/create', form).then(response => {
        dispatch('index')
        return response
      }).catch(error => {
        throw error
      })
    }
  }
}
