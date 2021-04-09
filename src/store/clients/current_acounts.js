import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
export default {
	namespaced: true,
	state: {
		client: {},
		current_acounts: [],
		months_ago: 1,
		loading: false,
	},
	mutations: {
		setClient(state, value) {
			state.client = value
		},
		setLoading(state, value) {
			state.loading = value
		},
		incrementMonthsAgo(state) {
			state.months_ago++
		},
		decrementMonthsAgo(state) {
			state.months_ago--
		},
		setMonthsAgo(state, value) {
			state.months_ago = value
		},
		setCurrentAcounts(state, value) {
			state.current_acounts = value
		}
	},
	actions: {
		getCurrentAcounts({ state, commit }, client) {
			commit('setLoading', true)
			axios.get(`/api/clients/current-acounts/${state.client.id}/${state.months_ago}`)
			.then(res => {
				commit('setLoading', false)
				commit('setCurrentAcounts', res.data.current_acounts)
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
