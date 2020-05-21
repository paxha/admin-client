import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login'

import store from '../store'
import Master from '../components/layouts/Master'
import Product from '../views/product/Product'
import Category from '../views/product/category'
import Brand from '../views/product/Brand'
import Attribute from '../views/product/attribute'
import Unit from '../views/product/unit'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (store.getters['auth/authenticated']) {
        return next({
          name: 'home'
        })
      }
      next()
    }
  },
  {
    path: '/',
    name: 'home',
    component: Master,
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
      next()
    },
    children: [
      {
        path: '/',
        name: 'home',
        component: Home
      },
      {
        path: '/product',
        name: 'product',
        component: Product
      },
      {
        path: '/brand',
        name: 'brand',
        component: Brand
      },
      {
        path: '/category',
        name: 'category',
        component: Category
      },
      {
        path: '/attribute',
        name: 'attribute',
        component: Attribute
      },
      {
        path: '/unit',
        name: 'unit',
        component: Unit
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
