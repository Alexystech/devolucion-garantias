import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Snotify from 'vue-snotify'

import 'vue-snotify/styles/material.css'

import axios from 'axios'
import urls from '@/utils/urls'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$service = urls.pruebas.servicios
Vue.prototype.$welldocs = urls.pruebas.welldocs
Vue.use(Snotify)

axios.interceptors.response.use(function (response) {
  store.commit('setCargando', false)
  console.log('Hola f')
  Vue.prototype.$notify('warning', 'Message')
  return response
}, function (err) {
  store.commit('setCargando', false)
  if (err.response && (err.response.status !== 500) && err.response.data && err.response.data.message) {
    Vue.prototype.$notify('error', err.response.data.message)
  } else {
    Vue.prototype.$notify('error', err.message)
  }
  return Promise.reject(err)
})

axios.interceptors.request.use(function (config) {
  if (!config.disabledLoading) {
    store.commit('setCargando', true)
  }
  return config
}, function (err) {
  store.commit('setCargando', false)
  Vue.prototype.$snotify('error', err.message)
  return Promise.reject(err)
})

Vue.prototype.$notify = function (type, message) {
  // type: 'success', 'warning', 'error', 'info'
  this.$snotify[type](message, {
    bodyMaxLength: 300,
    timeout: 20000,
    showProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true
  })
}

Vue.prototype.$goToUrl = (url) => {
  window.open(url)
}

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
