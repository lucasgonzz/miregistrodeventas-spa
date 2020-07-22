import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import markers from './markers'
import articles from './articles'
import clients from './clients'

Vue.use(Vuex)

import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8000'

export default new Vuex.Store({
	state: {
		special_prices: [],
	},
	mutations: {
		setSpecialPrices(state, value) {
			state.special_prices = value
		},
	},
	actions: {
		getSpecialPrices({commit}) {
			axios.get('/api/special-prices')
			.then(res => {
				console.log('se cargaron precios especiales')
				commit('setSpecialPrices', res.data)
			})
			.catch(err => {
				console.log(err)
			})
		},
	},
	modules: {
		auth,
		markers,
		articles,
		clients
	}
})
