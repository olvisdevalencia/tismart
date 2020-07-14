import Vue from 'vue'
import App from '@/App.vue'
import '@/registerServiceWorker'
import router from '@/router'
import store from '@/store'
import 'bootstrap/dist/css/bootstrap.min.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.config.productionTip = false

const defaultTpl = require('@/views/layouts/default/Root.vue').default

Vue.component('default-layout', defaultTpl)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
