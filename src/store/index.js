import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import module from './module'
import category from './category'
import unit from './unit'
import attribute from './attribute'
import brand from './brand'
import product from './product'
import variation from './variation'

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
    category,
    unit,
    attribute,
    brand,
    product,
    variation
  }
})
