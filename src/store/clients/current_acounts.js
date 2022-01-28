import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
export default {
	namespaced: true,
	state: {
		client: {},
		update_debe: {},
		current_acounts: [],
		selected: [],
		delete: {},
		months_ago: 1,
		loading: false,
		loading_check_saldos: false,
	},
	mutations: {
		setClient(state, value) {
			state.client = value
		},
		setSelected(state, value) {
			state.selected = value
		},
		setDelete(state, value) {
			state.delete = value
		},
		setUpdateDebe(state, value) {
			state.update_debe = value
		},
		setLoading(state, value) {
			state.loading = value
		},
		setLoadingCheckSaldos(state, value) {
			state.loading_check_saldos = value
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
		},
	},
	actions: {
		getCurrentAcounts({ state, commit }, client) {
			commit('setLoading', true)
			return axios.get(`/api/clients/current-acounts/${state.client.id}/${state.months_ago}`)
			.then(res => {
				commit('setLoading', false)
				commit('setCurrentAcounts', res.data.current_acounts)
			})
			.catch(err => {
				commit('setLoading', false)
				console.log(err)
			})
		},
		checkSaldos({ state, commit }) {
			commit('setLoadingCheckSaldos', true)
			return axios.get(`/api/clients/check-saldos/${state.client.id}`)
			.then(() => {
				commit('setLoadingCheckSaldos', false)
			})
			.catch(err => {
				commit('setLoadingCheckSaldos', false)
				console.log(err)
			})
		}
	},
	modules: {
	}
}
