import Vue from 'vue'
import axios from 'axios'
axios.defaults.baseURL = process.env.VUE_APP_API_URL
axios.defaults.withCredentials = true
export default {
	namespaced: true,
	state: {
		model: {},
		delete: null,
	},
	mutations: {
		setModel(state, value) {
			state.model = value
		},
		setDelete(state, value) {
			state.delete = value
		},
		delete(state) {
			let index = state.model.article_stocks.findIndex(item => {
				return item.id == state.delete.id 
			})
			if (index != -1) {
				state.model.article_stocks.splice(index, 1)
			}
		}
	},
	actions: {
		delete({ commit, state }) {
			return axios.delete('api/budget-product-article-stocks/'+ state.delete.id)
			.then(() => {
				commit('delete')
			})
			.catch(err => {
				console.log(err)
			})
		}
	},
}