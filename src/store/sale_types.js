import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
export default {
	namespaced: true,
	state: {
		sale_types: [],
	},
	mutations: {
		setSaleTypes(state, value) {
			state.sale_types = value
		}
	},
	actions: {
		getSaleTypes({ commit }) {
			return axios.get('/api/sale-types')
			.then(res => {
				commit('setSaleTypes', res.data.sale_types)
			})
			.catch(err => {
				console.log(err)
			})
		}
	},
	modules: {
	}
}
