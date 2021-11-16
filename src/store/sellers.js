import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
export default {
	namespaced: true,
	state: {
		sellers: [],
	},
	mutations: {
		setSellers(state, value) {
			state.sellers = value
		},
		add(state, value) {
			state.sellers.push(value)
		},
	},
	actions: {
		getSellers({ commit }) {
			return axios.get('/api/sellers')
			.then(res => {
				commit('setSellers', res.data.sellers)
			})
			.catch(err => {
				console.log(err)
			})
		}
	},
	modules: {
	}
}
