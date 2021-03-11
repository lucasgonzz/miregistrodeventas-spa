import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
export default {
	namespaced: true,
	state: {
		commissioners: [],
		commissions_to_show: [],
		selected_commissioner: {},
		loading_commissions_to_show: false,
	},
	mutations: {
		setCommissioners(state, value) {
			state.commissioners = value
		},
		setSelectedCommissioner(state, value) {
			state.selected_commissioner = value
		},
		setCommissionsToShow(state, value) {
			state.commissions_to_show = value
		},
		setLoadingCommissionsToShow(state, value) {
			state.loading_commissions_to_show = value
		}
	},
	actions: {
		getCommissioners({ commit }) {
			return axios.get('/api/commissioners')
			.then(res => {
				commit('setCommissioners', res.data.commissioners)
			})
			.catch(err => {
				console.log(err)
			})
		},
		getSelectedCommissioners({ commit, state }) {
			commit('setLoadingCommissionsToShow', true)
			let route = '/api/commissions/from-commissioner/'+state.selected_commissioner.id
			// if (state.selected_commissioner.seller_id && state.selected_commissioner.seller_id != 0) {
			// 	route +=  `/current-acounts/seller-commissions/${state.selected_commissioner.seller_id}`
			// } else if (state.selected_commissioner.seller_id == 0) {
			// 	route += `/current-acounts/perdidas`
			// } else {
			// 	route += `/current-acounts/oscar-fede-papi/${state.selected_commissioner.id}`
			// }
			return axios.get(route)
			.then(res => {
				commit('setLoadingCommissionsToShow', false)
				console.log(res.data)
				commit('setCommissionsToShow', res.data.commissions)
			})
			.catch(err => {
				commit('setLoadingCommissionsToShow', false)
				console.log(err)
			})
		}
	},
	modules: {
	}
}
