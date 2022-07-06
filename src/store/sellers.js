import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
export default {
	namespaced: true,
	state: {
		models: [],
	},
	mutations: {
		setModels(state, value) {
			state.models = value
		},
		add(state, value) {
			state.models.push(value)
		},
	},
	actions: {
		getModels({ commit }) {
			return axios.get('/api/sellers')
			.then(res => {
				commit('setModels', res.data.sellers)
			})
			.catch(err => {
				console.log(err)
			})
		}
	},
	modules: {
	}
}
