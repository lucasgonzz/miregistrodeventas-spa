import Vue from 'vue'
import store from '@/store'

// Mixins
import user from './mixins/user'
Vue.mixin(user)
import general from './mixins/general'
Vue.mixin(general)
import images from './mixins/images'
Vue.mixin(images)
import dates from './mixins/dates'
Vue.mixin(dates)
import providers from './mixins/providers'
Vue.mixin(providers)
import percentageCard from './mixins/percentageCard'
Vue.mixin(percentageCard)
import articles from './mixins/articles'
Vue.mixin(articles)

// Metadata
import VueMeta from 'vue-meta'
Vue.use(VueMeta, {
	// optional pluginOptions
	refreshOnceOnNavigation: true
})

// Vue Scrool
Vue.prototype.$scrollToTop = (() => {
	setTimeout(() => {
	 	window.scrollTo(0,0)
	}, 500)
}) 

// VueScrollTo
import VueScrollTo from 'vue-scrollto'
Vue.use(VueScrollTo, {
     container: "body",
     duration: 1000,
     easing: "ease",
     offset: 0,
     force: true,
     cancelable: true,
     onStart: false,
     onDone: false,
     onCancel: false,
     x: false,
     y: true
 })

// Notifications
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
 
// Scroll Effect
import VueAnimateOnScroll from 'vue-animate-onscroll'
Vue.use(VueAnimateOnScroll)

Vue.use(VueToast, {
	position: 'bottom'
});

// Vue offline
import VueOffline from 'vue-offline'
Vue.use(VueOffline)

// Introjs
import VueIntro from 'vue-introjs'
import 'intro.js/introjs.css';
Vue.use(VueIntro)

// Bootstrap
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)

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

// Cloudnary
import Cloudinary, { CldImage } from "cloudinary-vue";
Vue.use(Cloudinary, {
  configuration: { cloudName: "lucas-cn" },
  components: [ "CldImage" ]
});

// Laravel-echo
window.Pusher = require('pusher-js');
import Echo from "laravel-echo"

Vue.prototype.Echo = new Echo({
    broadcaster: 'pusher',
    key: '097847a6c6eba580084d',
    cluster: 'us2',
    forceTLS: false
});

// import Pusher from 'pusher-js'; 

import App from './App.vue'
import './registerServiceWorker'
import router from './router'

Vue.config.productionTip = false
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')

