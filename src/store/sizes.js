import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
export default {
	namespaced: true,
	state: {
		sizes: [],
		loading: false,
	},
	mutations: {
		setLoading(state, value) {
			state.loading = value
		},
		setSizes(state, value) {
			state.sizes = value
		},
	},
	actions: {
		getSizes({ commit }) {
			commit('setLoading', true)
			return axios.get('/api/sizes')
			.then(res => {
				commit('setLoading', false)
				commit('setSizes', res.data.sizes)
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
