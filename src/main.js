import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'


import Artista from './components/artista.vue'
import CD from './components/cd.vue'
import Genero from './components/genero.vue'

Vue.use(VueRouter)
Vue.component('v-select', vSelect)

const routes = [
  { path: '/artista', component: Artista },
  { path: '/cd', component: CD },
  { path: '/genero', component: Genero },
]

const router = new VueRouter({
  routes
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
