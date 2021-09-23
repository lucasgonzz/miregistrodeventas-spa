import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import markers from './markers'
import articles from './articles'
import clients from './clients/clients'
import online from './online/index'
import sales from './sales/sales'
import vender from './vender/vender'
import categories from './categories'
import sub_categories from './sub_categories'
import special_prices from './special_prices'
import providers from './providers'
import discounts from './discounts'
import sellers from './sellers'
import commissioners from './commissioners'
import sale_types from './sale_types'
import employees from './employees'
import permissions from './permissions'
import tags from './tags'
import confirm from './confirm'
import map from './map'
import coins from './coins'
import address from './address'
import political from './political'
import colors from './colors'

Vue.use(Vuex)

import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
// axios.defaults.baseURL = 'https://micovid.online'
// axios.defaults.baseURL = 'http://localhost:8000'

export default new Vuex.Store({
	state: {
	},
	mutations: {
	},
	actions: {
	},
	modules: {
		auth,
		markers,
		articles,
		clients,
		online,
		sales, 
		vender,
		categories,
		sub_categories,
		special_prices,
		providers,
		discounts,
		sellers,
		commissioners,
		sale_types,
		employees,
		permissions,
		tags,
		confirm,
		map,
		coins,
		address,
		political,
		colors,
	}
})
