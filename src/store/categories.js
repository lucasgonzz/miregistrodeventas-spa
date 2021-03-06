import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
// axios.defaults.baseURL = 'https://micovid.online'
// axios.defaults.baseURL = 'http://localhost:8000'
export default {
	namespaced: true,
	state: {
		categories: [],
		category_to_delete: {},
		edit: {},
		view: 'categories',
		loading: false,
	},
	mutations: {
		setLoading(state, value) {
			state.loading = value
		},
		setView(state, value) {
			state.view = value
		},
		setEdit(state, value) {
			state.edit = value
		},
		update(state, value) {
			let index = state.categories.findIndex(cat => {
				return cat.id == value.id
			})
			state.categories.splice(index, 1, value)
		},
		orderCategories(state) {
			state.categories.sort((a, b) => (a.name > b.name) ? 1 : -1)
		},
		setCategories(state, value) {
			state.categories = value
		},
		addCategory(state, value) {
			state.categories.unshift(value)
		},
		setDelete(state, value) {
			state.category_to_delete = value
		},
		delete(state) {
			let index = state.categories.findIndex(cat => {
				return cat.id == state.category_to_delete.id
			})
			state.categories.splice(index, 1)
		}
	},
	actions: {
		getCategories({ commit }) {
			commit('setLoading', true)
			return axios.get('/api/categories')
			.then(res => {
				commit('setLoading', false)
				commit('setCategories', res.data.categories)
				commit('orderCategories')
			})
			.catch(err => {
				commit('setLoading', false)
				console.log(err)
			})
		}
	},
	modules: {
	}
}
