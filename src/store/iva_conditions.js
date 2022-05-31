import Vue from 'vue'
import axios from 'axios'
axios.defaults.baseURL = process.env.VUE_APP_API_URL
axios.defaults.withCredentials = true
export default {
	namespaced: true,
	state: {
		models: [],
	},
	mutations: {
		setModels(state, value) {
			state.models = value
		},
	},
	actions: {
		getModels({ commit }) {
			return axios.get('api/iva-conditions')
			.then(res => {
				commit('setModels', res.data.iva_conditions)
			})
			.catch(err => {
				console.log(err)
			})
		}
	}
}