import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
export default {
	namespaced: true,
	state: {
		sub_categories: [],
		edit: {},
		delete: {},
		loading: false,
	},
	mutations: {
		setLoading(state, value) {
			state.loading = value
		},
		setEdit(state, value) {
			state.edit = value
		},
		update(state, value) {
			let index = state.sub_categories.findIndex(cat => {
				return cat.id == value.id
			})
			state.sub_categories.splice(index, 1, value)
		},
		setSubCategories(state, value) {
			state.sub_categories = value
		},
		orderSubCategories(state) {
			state.sub_categories.sort((a, b) => (a.category.name > b.category.name) ? 1 : -1)
		},
		addSubCategory(state, value) {
			state.sub_categories.unshift(value)
		},
		setDelete(state, value) {
			state.delete = value
		},
		delete(state) {
			let index = state.sub_categories.findIndex(cat => {
				return cat.id == state.delete.id
			})
			state.sub_categories.splice(index, 1)
		},
		deleteFromCategory(state, category) {
			let sub_categories = state.sub_categories.filter(sub_category => {
				return sub_category.category_id == category.id
			})
			let index
			sub_categories.forEach(sub => {
				index = state.sub_categories.findIndex(s => {
					return s.id == sub.id
				})
				state.sub_categories.splice(index, 1)
			})
		}
	},
	actions: {
		getSubCategories({ commit }) {
			commit('setLoading', true)
			return axios.get('/api/sub-categories')
			.then(res => {
				commit('setLoading', false)
				commit('setSubCategories', res.data.sub_categories)
				commit('orderSubCategories')
			})
			.catch(err => {
				commit('setLoading', false)
				console.log(err)
			})
		},
		delete({ commit, state }) {
			return axios.delete('/api/sub-categories/'+state.delete.id)
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
