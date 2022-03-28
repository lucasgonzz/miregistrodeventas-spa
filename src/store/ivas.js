import Vue from 'vue'
import axios from 'axios'
axios.defaults.baseURL = process.env.VUE_APP_API_URL
axios.defaults.withCredentials = true
export default {
	namespaced: true,
	state: {
		ivas: [],
	},
	mutations: {
		setIvas(state, value) {
			state.ivas = value
		},
	},
	actions: {
		getIvas({ commit }) {
			return axios.get('api/ivas')
			.then(res => {
				commit('setIvas', res.data.ivas)
			})
			.catch(err => {
				console.log(err)
			})
		}
	}
}