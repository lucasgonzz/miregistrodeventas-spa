import axios from 'axios'
import moment from 'moment'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
export default {
	namespaced: true,
	state: {
		days_previus_sales: [],
		day_selected: moment().format('YYYY/MM/DD'),
		index: 0,
		loading: false,
	},
	mutations: {
		setLoading(state, value) {
			state.loading = value
		},
		setDaysPreviusSales(state, value) {
			state.days_previus_sales = value
		},
		setDaySelected(state, value) {
			state.day_selected = value
		},
		incrementIndex(state) {
			state.index++
		},
		decrementIndex(state) {
			state.index--
		},
		setIndex(state, value) {
			state.index = value
		},
	},
	actions: {
		getDaysPreviusSales({ state, commit }) {
			var link = '/api/sales/prev/'+state.index
			commit('setLoading', true)
			axios.get(link)
			.then(res => {
				commit('setLoading', false)
				let days_previus_sales = res.data.days_previus_sales
				console.log(days_previus_sales)
				if (days_previus_sales.length > 0) {
					commit('setDaysPreviusSales', days_previus_sales)
				} 
			})
			.catch(err => {
				commit('setLoading', false)
				console.log(err)
			})
		},
	},
	modules: {
	}
}
