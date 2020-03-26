import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export function createRouter () {
  return new VueRouter({
    mode: 'history',
    routes: [
      {
        path: '/home',
        component: () => import('./component/home')
      },
      {
        path: '/item/:id',
        component: () => import('./component/item')
      }
    ]
  })
}