import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
export default {
	namespaced: true,
	state: {
		icons: [],
		loading: false,
	},
	mutations: {
		setLoading(state, value) {
			state.loading = value
		},
		setIcons(state, value) {
			state.icons = value
		},
	},
	actions: {
		getIcons({ commit }) {
			commit('setLoading', true)
			return axios.get('/api/icons')
			.then(res => {
				commit('setLoading', false)
				commit('setIcons', res.data.icons)
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
