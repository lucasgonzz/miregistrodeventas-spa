import 'bootstrap' 
import 'bootstrap/dist/css/bootstrap.min.css'
import Vue from 'vue'

Vue.use({
	install (Vue) {
		Vue.prototype.$jQuery = require('jquery') // you'll have this.$jQuery anywhere in your vue project
	}
})
Vue.use({
	install (Vue) {
		Vue.prototype.$toastr = require('toastr') // you'll have this.$jQuery anywhere in your vue project
	}
})
Vue.use({
	install (Vue) {
		Vue.prototype.$introjs = require('introjs') // you'll have this.$jQuery anywhere in your vue project
	}
})

import axios from 'axios'
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
import store from './store'

// import user from './mixins/user'

Vue.config.productionTip = false

// Vue.mixin(user)
store.dispatch('auth/me').then(() => {
	new Vue({
		router,
		store,
		render: h => h(App)
	}).$mount('#app')
})

