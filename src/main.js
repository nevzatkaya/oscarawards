import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'



import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'popper.js/dist/popper.js'

Vue.config.productionTip = false

Vue.use(VueRouter)

new Vue({
  render: h => h(App)
}).$mount('#app')
