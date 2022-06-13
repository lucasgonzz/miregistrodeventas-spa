import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
export default {
	namespaced: true,
	state: {
		models: [],
		edit: {},
		delete: {},
	},
	mutations: {
		setModels(state, value) {
			state.models = value
			console.log(state.models)
		},
		add(state, value) {
			state.models.push(value)
		},
		setEdit(state, value) {
			state.edit = value
		},
		setDelete(state, value) {
			state.delete = value
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
			return axios.get('api/current-acount-payment-methods')
			.then(res => {
				commit('setModels', res.data.current_acount_payment_methods)
			})
			.catch(err => {
				console.log(err)
			})
		},
		delete({ commit, state }) {
			return axios.delete('api/current-acount-payment-methods/'+state.delete.id)
			.then(res => {
				commit('delete')
			})
			.catch(err => {
				console.log(err)
			})
		},
	}
}