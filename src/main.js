import Vue from 'vue'
import store from '@/store'

// Mixins
import user from './mixins/user'
Vue.mixin(user)
import images from './mixins/images'
Vue.mixin(images)
import dates from './mixins/dates'
Vue.mixin(dates)
import providers from './mixins/providers'
Vue.mixin(providers)
import percentageCard from './mixins/percentageCard'
Vue.mixin(percentageCard)

// Notificaciones
import VueIziToast from 'vue-izitoast';
import 'izitoast/dist/css/iziToast.min.css'
Vue.use(VueIziToast)

// Introjs
// import introJs from 'intro.js'
import VueIntro from 'vue-introjs'
import 'intro.js/introjs.css';
Vue.use(VueIntro)

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
			baseURL: process.env.VUE_APP_API_URL,
			withCredentials: true
		})
	}
})
Vue.use({
	install (Vue) {
		Vue.prototype.$api = axios.create({
			baseURL: process.env.VUE_APP_API_URL+'/api',
			withCredentials: true
		})
	}
})

import App from './App.vue'
import './registerServiceWorker'
import router from './router'

Vue.config.productionTip = false

store.dispatch('auth/me')
.then(() => {
	new Vue({
		router,
		store,
		render: h => h(App)
	}).$mount('#app')
})

