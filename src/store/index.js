import Vue from 'vue'
import Vuex from 'vuex'
import defaultQueries from './modules/defaultQueries'
import layout from './modules/layout'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    defaultQueries,
    layout
  },
  strict: debug
})
