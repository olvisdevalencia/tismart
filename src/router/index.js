import Vue from 'vue'
import Router from 'vue-router'
import frontRoutes from '@/router/front'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    ...frontRoutes
  ]
})
