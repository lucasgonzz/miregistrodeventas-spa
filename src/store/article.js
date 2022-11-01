import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL

import generals from '@/mixins/generals'
export default {
	namespaced: true,
	state: {
		model_name: 'article',

		inactive_models: [],
		models: [],
		model: {},
		to_show: [],

		filter: {
            category_id: 0,
            sub_category_id: 0,
            provider_id: 0,
            with_images: false,
            featured: false,
            precio_min: '',
            precio_max: '',
            fecha_min: '',
            fecha_max: '',
            mantener: false,
		},
		from_filter: false,
		filtered: [],
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
		setInactiveModels(state, value) {
			if (value) {
				state.inactive_models = value
			} else {
				state.inactive_models = []
			}
		},
		setFilter(state, value) {
			if (value) {
				state.filter = value 
			} else {
				state.filter = {
			        category_id: 0,
			        sub_category_id: 0,
			        provider_id: 0,
			        with_images: false,
			        featured: false,
			        precio_min: '',
			        precio_max: '',
			        fecha_min: '',
			        fecha_max: '',
			        mantener: false,
				}
			}
		},
		setFromFilter(state, value) {
			state.from_filter = value
		},
		setToShow(state, value) {
			if (value) {
				state.to_show = value
			} else {
				state.to_show = state.models.slice(0, 20)
			}
		},
		addToShow(state, value) {
			state.to_show = state.to_show.concat(state.models.slice(state.to_show.length, state.to_show.length + 20))
		},
		setFiltered(state, value) {
			state.filtered = value 
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
		getModels({ commit, state }) {
			commit('setLoading', true)
			return axios.get(`/api/${generals.methods.routeString(state.model_name)}/index/active`)
			.then(res => {
				commit('setLoading', false)
				commit('setModels', res.data.models)
				commit('setToShow')
				commit('setSelected', [])
			})
			.catch(err => {
				commit('setLoading', false)
				console.log(err)
			})
		},
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
