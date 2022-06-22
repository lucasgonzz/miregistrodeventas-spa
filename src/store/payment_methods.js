import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
export default {
	namespaced: true,
	state: {
		models: [],
		model: {},
		delete: null,
		edit: {},
		loading: false,
	},
	mutations: {
		setLoading(state, value) {
			state.loading = value
		},
		setModel(state, value = null) {
			if (value) {
				state.model = value
			} else {
				state.model = {
					id: null,
					name: '',
					description: '',
				}
			}
		},
		setModels(state, value) {
			state.models = value
		},
		add(state, value) {
			state.models.unshift(value)
		},
		setDelete(state, value) {
			state.delete = value
		},
		setEdit(state, value) {
			state.edit = value
		},
		delete(state) {
			let index = state.models.findIndex(model => {
				return model.id == state.delete.id
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
			return axios.get('/api/payment-methods')
			.then(res => {
				commit('setLoading', false)
				console.log(res.data.payment_methods)
				commit('setModels', res.data.payment_methods)
			})
			.catch(err => {
				commit('setLoading', false)
				console.log(err)
			})
		},
		delete({ commit, state }) {
			return axios.delete('/api/payment-methods/'+state.delete.id)
			.then(() => {
				commit('delete')
			})
			.catch((err) => {
				console.log(err)
			})
		},
	},
}
