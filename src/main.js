import * as firebase from './firebase'

import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import './registerServiceWorker'

Vue.config.silent = false
Vue.config.devtools = true
Vue.config.productionTip = true

import { sync } from 'vuex-router-sync'
sync(store, router, { moduleName: 'router' })

import LoadingOverlayPlugin from './packages/vue-loading-overlay'
Vue.use(LoadingOverlayPlugin)

import * as utils from './utils/index'
Vue.prototype.$utils = utils

Vue.prototype.$auth = firebase.auth
Vue.prototype.$firestore = firebase.firestore
Vue.prototype.$database = firebase.database

new Vue({
  name: 'root',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
