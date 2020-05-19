import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import module from './module'
import category from './category'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    module,
    category
  }
})
