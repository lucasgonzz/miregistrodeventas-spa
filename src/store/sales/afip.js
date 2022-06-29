import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
import previus_days from '@/store/sales/previus_days'
export default {
	namespaced: true,
	state: {
		sale: null,
		importes: [],
		loading: false,	
	},
	mutations: {
		setSale(state, value) {
			state.sale = value
		},
		setImportes(state, value) {
			state.importes = value
		},
		setLoading(state, value) {
			state.loading = value
		}
	},
	actions: {
	},
}
