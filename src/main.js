import Vue from 'vue'
import store from '@/store'

// Notificaciones
import VueIziToast from 'vue-izitoast';
import 'izitoast/dist/css/iziToast.min.css'
Vue.use(VueIziToast)

// Bootstrap
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

import axios from 'axios'
Vue.use({
	install (Vue) {
		Vue.prototype.$axios = axios.create({
			baseURL: 'http://localhost:8000',
			withCredentials: true
		})
	}
})
Vue.use({
	install (Vue) {
		Vue.prototype.$api = axios.create({
			baseURL: 'http://localhost:8000/api',
			withCredentials: true
		})
	}
})

import App from './App.vue'
import './registerServiceWorker'
import router from './router'

import user from './mixins/user'
Vue.mixin(user)
import images from './mixins/images'
Vue.mixin(images)
import dates from './mixins/dates'
Vue.mixin(dates)
import providers from './mixins/providers'
Vue.mixin(providers)

import BtnLoader from './components/common/BtnLoader'
Vue.component('bnt-loader', BtnLoader)

Vue.config.productionTip = false

store.dispatch('auth/me')
.then(() => {
	new Vue({
		router,
		store,
		render: h => h(App)
	}).$mount('#app')
})

