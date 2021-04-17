import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
export default {
	namespaced: true,
	state: {
		commissioners: [],
		commissions_to_show: [],
		selected_commissioner: {},
		commission_to_update_monto: {},
		weeks_ago: 1,
		loading_commissions_to_show: false,
	},
	mutations: {
		setCommissioners(state, value) {
			state.commissioners = value
		},
		setSelectedCommissioner(state, value) {
			state.selected_commissioner = value
		},
		setCommissionToUpdateMonto(state, value) {
			state.commission_to_update_monto = value
		},
		setCommissionsToShow(state, value) {
			state.commissions_to_show = value
		},
		setLoadingCommissionsToShow(state, value) {
			state.loading_commissions_to_show = value
		},
		setWeeksAgo(state, value) {
			state.weeks_ago = value
		},
	},
	actions: {
		getCommissioners({ commit }) {
			return axios.get('/api/commissioners')
			.then(res => {
				commit('setCommissioners', res.data.commissioners)
				commit('setSelectedCommissioner', res.data.commissioners[0])
			})
			.catch(err => {
				console.log(err)
			})
		},
		getSelectedCommissioners({ commit, state }) {
			commit('setLoadingCommissionsToShow', true)
			let route = '/api/commissions/from-commissioner/'+state.selected_commissioner.id+'/'+state.weeks_ago
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
