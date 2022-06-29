import orders from './orders/index'
import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
// axios.defaults.baseURL = 'https://micovid.online'
// axios.defaults.baseURL = 'http://localhost:8000'
export default {
	namespaced: true,
	state: {
		models: [],
		to_show: [],
		delete: {},
		edit: {},
		loading: false,
	},
	mutations: {
		setLoading(state, value) {
			state.loading = value
		},
		setModels(state, value) {
			state.models = value
		},
		setToShow(state, value = null) {
			if (value) {
				state.to_show = value
			} else {
				state.to_show = state.models
			}
		},
		addProvider(state, value) {
			state.models.unshift(value)
		},
		setDelete(state, value) {
			state.delete = value
		},
		setEdit(state, value) {
			state.edit = value
		},
		delete(state) {
			let index = state.models.findIndex(pro => {
				return pro.id == state.delete.id
			})
			state.models.splice(index, 1)
		},
		update(state, updated) {
			let index = state.models.findIndex(item => {
				return item.id == updated.id
			})
			state.models.splice(index, 1, updated)
		},
	},
	actions: {
		getModels({ commit }) {
			commit('setLoading', true)
			return axios.get('/api/providers')
			.then(res => {
				commit('setLoading', false)
				console.log(res.data.providers)
				commit('setModels', res.data.providers)
				commit('setToShow')
			})
			.catch(err => {
				commit('setLoading', false)
				console.log(err)
			})
		},
		delete({ commit, state }) {
			return axios.delete('/api/providers/'+state.delete.id)
			.then(() => {
				commit('delete')
			})
			.catch((err) => {
				console.log(err)
			})
		},
	},
	modules: {
		orders,
	}
}
