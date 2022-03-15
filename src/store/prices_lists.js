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
		delete(state, value) {
			let index = state.prices_lists.findIndex(p => {
				return p.id == value.id
			})
			state.prices_lists.splice(index, 1)
		},
		update(state, value) {
			let index 
			index = state.prices_lists.findIndex(prices_list => {
				return prices_list.id == value.id
			})
			if (index != -1) {
				state.prices_lists.splice(index, 1, value)
			}
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