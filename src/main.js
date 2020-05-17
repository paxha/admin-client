import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

require('./store/subscriber')

axios.defaults.baseURL = 'http://localhost:8000/api'

Vue.config.productionTip = false

Vue.use(Antd)

// store.dispatch('module/loadModules')

store.dispatch('auth/attempt', localStorage.getItem('bearer')).then(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})
