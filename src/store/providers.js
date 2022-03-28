import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
// axios.defaults.baseURL = 'https://micovid.online'
// axios.defaults.baseURL = 'http://localhost:8000'
export default {
	namespaced: true,
	state: {
		providers: [],
		delete: {},
		edit: {},
		loading: false,
	},
	mutations: {
		setLoading(state, value) {
			state.loading = value
		},
		setProviders(state, value) {
			state.providers = value
		},
		addProvider(state, value) {
			state.providers.unshift(value)
		},
		setDelete(state, value) {
			state.delete = value
		},
		setEdit(state, value) {
			state.edit = value
		},
		delete(state) {
			let index = state.providers.findIndex(pro => {
				return pro.id == state.delete.id
			})
			state.providers.splice(index, 1)
		},
		update(state, updated) {
			let index = state.providers.findIndex(item => {
				return item.id == updated.id
			})
			state.providers.splice(index, 1, updated)
		},
	},
	actions: {
		getProviders({ commit }) {
			commit('setLoading', true)
			return axios.get('/api/providers')
			.then(res => {
				commit('setLoading', false)
				console.log(res.data.providers)
				commit('setProviders', res.data.providers)
			})
			.catch(err => {
				commit('setLoading', false)
				console.log(err)
			})
		},
		delete({ commit, state }) {
			axios.delete('/api/providers/'+state.delete.id)
			.then(() => {
				commit('delete')
			})
			.catch((err) => {
				console.log(err)
			})
		},
	},
	modules: {
	}
}
