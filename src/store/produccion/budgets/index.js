import Vue from 'vue'
import axios from 'axios'
axios.defaults.baseURL = process.env.VUE_APP_API_URL
axios.defaults.withCredentials = true
import create from '@/store/produccion/budgets/create'
export default {
	namespaced: true,
	state: {
		models: [],
		loading: false,
		create: null,
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
			if (value) {
				if (!value.observations || !value.observations.length) {
					value.observations = [{text: ''}]
				}
			}
			state.edit = value
		},
		setCreate(state) {
			state.create = {
				client: null,
				products: [],
				start_at: '',
				finish_at: '',
				delivery_and_placement: 0,
				observations: [{text: ''}],
			}
		},
		setDelete(state, value) {
			state.delete = value
		},
		delete(state) {
			let index = state.models.findIndex(model => {
				return model.id == state.delete.id
			})
			console.log(index)
			if (index != -1) {
				state.models.splice(index, 1)
			}
		},
		update(state, value) {
			let index = state.models.findIndex(model => {
				return model.id == value.id
			})
			if (index != -1) {
				state.models.splice(index, 1, value)
			}
		},
	},
	actions: {
		getModels({commit}) {
			commit('setLoading', true)
			return axios.get('api/budgets')
			.then(res => {
				commit('setLoading', false)
				commit('setModels', res.data.budgets)
			})
			.catch(err => {
				commit('setLoading', false)
				console.log(err)
			})
		},
		delete({ commit, state }) {
			return axios.delete('api/budgets/'+ state.delete.id)
			.then(() => {
				commit('delete')
			})
			.catch(err => {
				console.log(err)
			})
		}
	},
	modules: {
		create,
	}
}