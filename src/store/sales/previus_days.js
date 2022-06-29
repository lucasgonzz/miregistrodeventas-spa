import axios from 'axios'
import moment from 'moment'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
export default {
	namespaced: true,
	state: {
		days: [],
		selected_day: moment().format('YYYY/MM/DD'),
		index: 0,
		loading: false,
	},
	mutations: {
		setLoading(state, value) {
			state.loading = value
		},
		setDays(state, value) {
			state.days = value
		},
		setSelectedDay(state, value = null) {
			if (value) {
				state.selected_day = value
			} else {
				state.selected_day = moment().format('YYYY/MM/DD')
			}
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
		getDays({ state, commit }) {
			var link = '/api/sales/previus-days/'+state.index
			commit('setLoading', true)
			return axios.get(link)
			.then(res => {
				commit('setLoading', false)
				let days = res.data.days
				if (days.length > 0) {
					commit('setDays', days)
				} 
				console.log(days)
			})
			.catch(err => {
				commit('setLoading', false)
				console.log(err)
			})
		},
	},
}
