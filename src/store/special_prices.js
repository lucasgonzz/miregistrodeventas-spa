import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
// axios.defaults.baseURL = 'https://micovid.online'
// axios.defaults.baseURL = 'http://localhost:8000'
export default {
	namespaced: true,
	state: {
		special_prices: [],
		special_price_to_delete: {},
		loading: false,
	},
	mutations: {
		setLoading(state, value) {
			state.loading = value
		},
		setSpecialPrices(state, value) {
			state.special_prices = value
		},
		add(state, value) {
			state.special_prices.unshift(value)
		},
		setDelete(state, value) {
			state.special_price_to_delete = value
		},
		delete(state) {
			let index = state.special_prices.findIndex(s => {
				return s.id == state.special_price_to_delete.id
			})
			state.special_prices.splice(index, 1)
		}
	},
	actions: {
		getSpecialPrices({ commit }) {
			commit('setLoading', true)
			axios.get('/api/special-prices')
			.then(res => {
				commit('setLoading', false)
				console.log(res.data.special_prices)
				commit('setSpecialPrices', res.data.special_prices)
			})
			.catch(err => {
				commit('setLoading', false)
				console.log(err)
			})
		}
	},
	modules: {
	}
}
