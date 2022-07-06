import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import markers from './markers'
import articles from './articles'
import clients from './clients/clients'
import online from './online/index'
import sales from './sales/index'
import vender from './vender/vender'
import categories from './categories'
import sub_categories from './sub_categories'
import special_prices from './special_prices'
import providers from './providers/index'
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
import conditions from './conditions'
import workdays from './workdays'
import schedules from './schedules'
import prices_lists from './prices_lists'
import icons from './icons'
import titles from './titles'
import brands from './brands'
import sizes from './sizes'
import plans from './plans'
import iva_conditions from './iva_conditions'
import ivas from './ivas'
import _super from './super'
import produccion from './produccion/index'
import current_acount_payment_methods from './current_acount_payment_methods'
import combos from './combos/index'
import payment_methods from './payment_methods'
import delivery_zones from './delivery_zones'
import locations from './locations'

Vue.use(Vuex)
Vue.config.devtools = true

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
		conditions,
		workdays,
		schedules,
		prices_lists,
		icons,
		titles,
		brands,
		sizes,
		plans,
		iva_conditions,
		ivas,
		super: _super,
		produccion,
		current_acount_payment_methods,
		combos,
		payment_methods,
		delivery_zones,
		locations,
	}
})
