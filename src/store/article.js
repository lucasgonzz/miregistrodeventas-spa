import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
import store_article from '@/mixins/store_article'

import generals from '@/mixins/generals'
export default {
	namespaced: true,
	state: {
		model_name: 'article',

		inactive_models: [],
		models: [],
		loaded_models: [],
		model: {},
		page: 1,

		from_filter: false,
		filters: [],
		filtered: [],
		is_filtered: false,
		selected: [],

		delete: null,
		delete_image: null,

		display: 'table',

		inactive_loading: false,
		loading: false,
	},
	mutations: {
		setInactiveLoading(state, value) {
			state.inactive_loading = value
		},
		setLoading(state, value) {
			state.loading = value
		},
		setPage(state, value) {
			state.page = value
		},
		incrementPage(state) {
			state.page++
		},
		setModel(state, value) {
			if (value.model) {
				state.model = value.model
				if (value.properties.length) {
					value.properties.forEach(prop => {
						state.model[prop.key] = prop.value 
					})
				}
			} else {
				let obj = {
					id: null
				}
				require(`@/models/${state.model_name}`).default.properties.forEach(prop => {
					obj[prop.key] = prop.value 
				})
				if (value.properties.length) {
					value.properties.forEach(prop => {
						obj[prop.key] = prop.value 
					})
				}
				state.model = obj
			}
		},
		setModels(state, value) {
			if (value) {
				state.models = value
			} else {
				state.models = []
			}
		},
		setLoadedModels(state, value) {
			state.loaded_models = value 
		},
		addModels(state, value) {
			state.models = state.models.concat(value)
		},
		setInactiveModels(state, value) {
			if (value) {
				state.inactive_models = value
			} else {
				state.inactive_models = []
			}
		},
		setFromFilter(state, value) {
			state.from_filter = value
		},
		setFilters(state, value) {
			state.filters = value
		},
		setFiltered(state, value) {
			state.filtered = value 
		},
		setIsFiltered(state, value) {
			state.is_filtered = value 
		},
		setSelected(state, value) {
			state.selected = value 
		},
		add(state, value) {
			let index = state.models.findIndex(item => {
				return item.id == value.id
			})
			if (index == -1) {
				state.models.unshift(value)
			} else {
				state.models.splice(index, 1, value)
			} 

			index = state.filtered.findIndex(item => {
				return item.id == value.id
			})
			if (index != -1) {
				state.filtered.splice(index, 1, value)
			} 
		},
		setDelete(state, value) {
			state.delete = value
		},
		delete(state) {
			let index 
			let articles 
			if (state.from_filter) {
				articles = state.filtered
			} else {
				articles = state.selected
			}
			articles.forEach(article => {
				index = state.models.findIndex(art => {
					return art.id == article.id
				})
				state.models.splice(index, 1)
			})
		},
		setDeleteImage(state, value) {
			state.delete_image = value
		},
		deleteImage(state, value) {
			let index = state.models.images.findIndex(model => {
				return model.id == state.delete.id
			})
			state.models.splice(index, 1)
		},
		setDisplay(state, value) {
			state.display = value 
		},
		removeStock(state, articles) {
			let state_model 
			let index 
			let stock_resultante
			articles.forEach(article => {
				if (article.is_article) {
					state_model = state.models.find(model => {
						return model.id == article.id
					})
					index = state.models.findIndex(item => {
						return item.id == article.id
					})
					if (state_model != 'undefined' && state_model.stock) {
						stock_resultante = state_model.stock - article.amount
						if (stock_resultante > 0) {
							state_model.stock = stock_resultante
						} else {
							state_model.stock = 0
						}
						state.models.splice(index, 1, state_model)
					}
				}
			})
		}
	},
	actions: {
		getModels({ commit, dispatch, state }) {
			commit('setLoading', true)
			commit('setPage', 1)
			commit('setModels', [])
			commit('setLoadedModels', [])
			return dispatch('getArticles')	
		},
		getArticles({ commit, dispatch, state }) {
			let per_page = 500
			console.log('page: '+state.page)
			return axios.get(`/api/article/index/active?page=${state.page}`)
			.then(res => {

				let loaded_models = res.data.models.data
				commit('incrementPage')
				commit('setLoadedModels', loaded_models)
				console.log('loaded_models:')
				console.log(loaded_models)
				commit('addModels', loaded_models)

				if (state.loaded_models.length == per_page) {
					dispatch('getArticles')
				} else {
					commit('setLoading', false)
				}

			})
			.catch(err => {
				console.log(err)
			})		
		},
		// async getModels({ commit, state }) {
		// 	commit('setLoading', true)
		// 	console.log('page: '+state.page)
		// 	return axios.get(`/api/article/index/active?page=${state.page}`)
		// 	.then(res => {
		// 		let loaded_models = res.data.models.data
		// 		commit('incrementPage')
		// 		commit('setLoadedModels', loaded_models)
		// 		console.log('loaded_models:')
		// 		console.log(loaded_models)
		// 		commit('addModels', loaded_models)
		// 	})
		// 	.catch(err => {
		// 		console.log(err)
		// 	})		
		// },
		getInactiveModels({ commit, state }) {
			commit('setInactiveLoading', true)
			return axios.get(`/api/${generals.methods.routeString(state.model_name)}/index/inactive`)
			.then(res => {
				commit('setInactiveLoading', false)
				commit('setInactiveModels', res.data.models)
			})
			.catch(err => {
				commit('setInactiveLoading', false)
				console.log(err)
			})
		},
		delete({ commit, state }) {

			let articles_id = []
			if (state.from_filter) {
				state.filtered.forEach(article => {
					articles_id.push(article.id)
				})
			} else {
				state.selected.forEach(article => {
					articles_id.push(article.id)
				})
			}
			return axios.post('api/article/delete', {
				articles_id: articles_id 
			})
			.then(res => {
				commit('delete')
				commit('setToShow')
			})
			.catch(err => {
				console.log(err)
			})
		},
		deleteImage({ commit, state }) {
			return axios.delete(`/api/${generals.methods.routeString(state.model_name)}/image/${state.delete_image.id}`)
			.then((res) => {
				commit('add', res.data.model)
			})
			.catch((err) => {
				console.log(err)
			})
		},
	},
}
