import axios from 'axios'

export default {
  namespaced: true,
  state: {
    bearer: null,
    user: {}
  },
  getters: {
    authenticated (state) {
      return !!state.bearer && !!state.user
    },
    user (state) {
      return state.user
    }
  },
  mutations: {
    SET_BEARER (state, bearer) {
      state.bearer = bearer
    },
    SET_USER (state, user) {
      state.user = user
    }
  },
  actions: {
    async login ({ dispatch, commit }, credentials) {
      await axios.post('login', credentials).then(response => {
        return dispatch('attempt', response.data.bearer)
      }).catch(error => {
        throw error
      })
    },
    async attempt ({ commit, state }, bearer) {
      if (bearer) {
        commit('SET_BEARER', bearer)
      }

      if (!state.bearer) {
        return
      }

      await axios.get('user').then(response => {
        commit('SET_USER', response.data.user)
      }).catch(() => {
        commit('SET_BEARER', null)
        commit('SET_USER', {})
      })
    },
    logout ({ commit }) {
      return axios.get('logout').then(() => {
        commit('SET_BEARER', null)
        commit('SET_USER', {})
      })
    }
  }
}
