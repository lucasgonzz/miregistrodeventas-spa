import axios from 'axios'
import moment from 'moment'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
export default {
	namespaced: true,
	state: {
		sale: null,
		importes: {},
		loading: false,
	},
	mutations: {
		setLoading(state, value) {
			state.loading = value
		},
		setSale(state, value) {
			state.sale = value
		},
		setImportes(state, value) {
			state.importes = value
			console.log(state.importes)
		},
	},
	actions: {
		getImportes({ commit }, sale) {
			commit('setSale', sale)
			commit('setLoading', true)
			return axios.get('/api/afip/importes/'+sale.id)
			.then(res => {
				commit('setLoading', false)
				commit('setImportes', res.data.importes)
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
