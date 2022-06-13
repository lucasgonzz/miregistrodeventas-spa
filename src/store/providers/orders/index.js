import create from './create'
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
		loading: false,
	},
	mutations: {
		setModels(state, value) {
			state.models = value
		},
		add(state, value) {
			state.models.push(value)
		},
		setToShow(state, value) {
			if (value) {
				state.to_show = value
			} else {
				state.to_show = state.models
			}
		},
		setLoading(state, value) {
			state.loading = value
		},
		delete(state) {
			let index = state.models.findIndex(item => {
				return item.id == state.delete.id
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
			return axios.get('/api/provider-orders')
			.then(res => {
				commit('setLoading', false)
				commit('setModels', res.data.provider_orders)
				commit('setToShow')
			})
			.catch(err => {
				commit('setLoading', false)
				console.log(err)
			})
		},
		delete({ commit, state }) {
			axios.delete('/api/provider-orders/'+state.delete.id)
			.then(() => {
				commit('delete')
			})
			.catch((err) => {
				console.log(err)
			})
		},
	},
	modules: {
		create
	}
}
