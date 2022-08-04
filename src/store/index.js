import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cargando: false
  },
  getters: {
    getCargando: state => state.cargando
  },
  mutations: {
    setCargando (state, payload) {
      state.cargando = payload
    }
  },
  actions: {},
  modules: {}
})
