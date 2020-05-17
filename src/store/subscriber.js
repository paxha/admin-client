import store from './index'
import axios from 'axios'

store.subscribe(mutation => {
  switch (mutation.type) {
    case 'auth/SET_BEARER':
      if (mutation.payload) {
        axios.defaults.headers.common.Authorization = `Bearer ${mutation.payload}`
        localStorage.setItem('bearer', mutation.payload)
      } else {
        axios.defaults.headers.common.Authorization = null
        localStorage.removeItem('bearer')
      }
      break
  }
})
