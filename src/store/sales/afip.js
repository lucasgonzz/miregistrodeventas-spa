import axios from 'axios'
import moment from 'moment'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
export default {
	namespaced: true,
	state: {
		importes: {
			gravado: null,
			iva: null,
			subtotal: null,
			total: null,
		},
		loading: false,
	},
	mutations: {
		setLoading(state, value) {
			state.loading = value
		},
		setImportes(state, value) {
			state.importes = value
			console.log(state.importes)
		}
	},
	actions: {
		getImportes({ commit }, sale) {
			commit('setLoading', true)
			axios.get('/api/afip/importes/'+sale.id)
			.then(res => {
				commit('setLoading', false)
				let importes = res.data.importes
				console.log(importes)
				commit('setImportes', {
					gravado: importes.importe_gravado,
					iva: importes.importe_iva,
					subtotal: importes.importe_subtotal,
					total: importes.importe_total,
				})
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
