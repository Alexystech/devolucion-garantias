import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import axios from 'axios'
import urls from '@/utils/urls'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$service = urls.pruebas.servicios
Vue.prototype.$welldocs = urls.pruebas.welldocs

Vue.prototype.$downloadFromUrl = (url) => {
  var a = document.createElement('a')
  a.href = url
  var fileName = url.split('/').pop()
  a.download = fileName
  document.body.appendChild(a)
  a.click()
  window.URL.revokeObjectURL(url)
  a.remove()
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
