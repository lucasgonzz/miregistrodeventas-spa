import Vue from 'vue'
import axios from 'axios'
axios.defaults.baseURL = process.env.VUE_APP_API_URL
axios.defaults.withCredentials = true
export default {
	namespaced: true,
	state: {
		models: [],
		loading: false,
	},
	mutations: {
		setModels(state, value) {
			state.models = value
		},
		setLoading(state, value) {
			state.loading = value
		},
	},
	actions: {
		getModels({commit}) {
			commit('setLoading', true)
			return axios.get('api/order-production-statuses')
			.then(res => {
				commit('setLoading', false)
				commit('setModels', res.data.order_production_statuses)
			})
			.catch(err => {
				commit('setLoading', false)
				console.log(err)
			})
		},
	},
}