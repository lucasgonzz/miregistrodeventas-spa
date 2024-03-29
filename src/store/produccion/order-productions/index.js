import statuses from '@/store/produccion/order-productions/statuses'
import product_deliveries from '@/store/produccion/order-productions/product_deliveries'
import product_article_stocks from '@/store/produccion/order-productions/product_article_stocks'
import Vue from 'vue'
import axios from 'axios'
axios.defaults.baseURL = process.env.VUE_APP_API_URL
axios.defaults.withCredentials = true
export default {
	namespaced: true,
	state: {
		models: [],
		loading: false,
		edit: null,
		delete: null,
	},
	mutations: {
		add(state, value) {
			state.models.unshift(value)
		},
		setModels(state, value) {
			state.models = value
		},
		setLoading(state, value) {
			state.loading = value
		},
		setEdit(state, value) {
			state.edit = value
		},
		update(state, value) {
			let index = state.models.findIndex(model => {
				return model.id == value.id
			})
			if (index != -1) {
				state.models.splice(index, 1, value)
			}
		},
		setDelete(state, value) {
			state.delete = value
		},
		delete(state) {
			let index = state.models.findIndex(model => {
				return model.id == state.delete.id
			})
			if (index != -1) {
				state.models.splice(index, 1)
			}
		}
	},
	actions: {
		getModels({commit}) {
			commit('setLoading', true)
			return axios.get('api/order-productions')
			.then(res => {
				commit('setLoading', false)
				commit('setModels', res.data.order_productions)
			})
			.catch(err => {
				commit('setLoading', false)
				console.log(err)
			})
		},
		delete({ commit, state }) {
			return axios.delete('api/order-productions/'+ state.delete.id)
			.then(() => {
				commit('delete')
			})
			.catch(err => {
				console.log(err)
			})
		}
	},
	modules: {
		statuses,
		product_deliveries,
		product_article_stocks,
	},
}