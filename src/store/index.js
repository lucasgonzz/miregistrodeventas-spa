import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import markers from './markers'
import articles from './articles'
import article from './article'
import client from './client'
import online from './online/index'
import sale from './sale'
import vender from './vender/vender'
import category from './category'
import sub_category from './sub_category'
import special_prices from './special_prices'
import provider from './provider'
import provider_order from './provider_order'
import discount from './discount'
import seller from './seller'
import commissioners from './commissioners'
import sale_types from './sale_types'
import employee from './employee'
import permissions from './permissions'
import tags from './tags'
import confirm from './confirm'
import map from './map'
import coins from './coins'
import address from './address' 
import political from './political'
import colors from './colors'
import condition from './condition'
import workdays from './workdays'
import schedules from './schedules'
import prices_list from './prices_list'
import icons from './icons'
import title from './title'
import brand from './brand'
import sizes from './sizes'
import plans from './plans'
import iva_condition from './iva_condition'
import iva from './iva'
import _super from './super'
import produccion from './produccion/index'
import budget from './budget'
import order_production from './order_production'
import order_production_status from './order_production_status'
import current_acount from './current_acount'
import current_acount_payment_methods from './current_acount_payment_methods'
import combos from './combos/index'
import payment_method from './payment_method'
import delivery_zone from './delivery_zone'
import location from './location'
import platelet from './platelet'
import payment_method_types from './payment_method_types'
import price_type from './price_type'
import budget_status from './budget_status'
import recipe from './recipe'
import deposit from './deposit'
import order from './order'
import buyer from './buyer'
import order_status from './order_status'
import provider_order_status from './provider_order_status'
import credit_card from './credit_card'
import message from './message'
import cupon from './cupon'
import surchage from './surchage'
import user_payment from './user_payment'

// SUPER
import user from './user'
import super_budget from './super_budget'
import extencion from './extencion'

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
		article,
		client,
		online,
		sale, 
		vender,
		category,
		sub_category,
		special_prices,
		provider,
		provider_order,
		discount,
		seller,
		commissioners,
		sale_types,
		employee,
		permissions,
		tags,
		confirm,
		map,
		coins,
		address,
		political,
		colors,
		condition,
		workdays,
		schedules,
		prices_list,
		icons,
		title,
		brand,
		sizes,
		plans,
		iva_condition,
		iva,
		super: _super,
		produccion,
		budget, 
		order_production,
		order_production_status,
		current_acount,
		current_acount_payment_methods,
		combos,
		payment_method,
		delivery_zone,
		location,
		platelet,
		payment_method_types,
		price_type,
		budget_status,
		recipe,
		deposit,
		order,
		buyer,
		order_status,
		provider_order_status,
		credit_card,
		message,
		cupon,
		surchage,
		user_payment,
		
		user,
		super_budget,
		extencion,
	}
})
