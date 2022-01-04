import Vue from 'vue'
import axios from 'axios'
axios.defaults.baseURL = process.env.VUE_APP_API_URL
axios.defaults.withCredentials = true
export default {
	namespaced: true,
	state: {
		prices_lists: [],
	},
	mutations: {
		setPricesLists(state, value) {
			state.prices_lists = value
		},
		add(state, value) {
			state.prices_lists.push(value)
		},
	},
	actions: {
		getPircesLists({ commit }) {
			return axios.get('/api/prices-lists')
			.then(res => {
				console.log(res)
				commit('setPricesLists', res.data.prices_lists)
			})
			.catch(err => {
				console.log(err)
			})
		}
	}
}