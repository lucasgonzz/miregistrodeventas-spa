import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL

import generals from '@/mixins/generals'
export default {
	namespaced: true,
	state: {
		model_name: 'provider',

		models: [],
		model: {},
		to_show: [],
		selected: [],
		filtered: [],
		is_filtered: false,

		delete: null,
		delete_image: null,

		prop_model_to_delete: null,

		display: 'table',

		loading: false,
	},
	mutations: {
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
			let index = state.models.findIndex(model => {
				return model.id == state.delete.id
			})
			state.models.splice(index, 1)
		},
		setDeleteImage(state, value) {
			state.delete_image = value
		},
		setPropModelToDelete(state, value) {
			state.prop_model_to_delete = value
		},
		deletePropModel(state) {
			let index = state.model[state.prop_model_to_delete.key].findIndex(model => {
				return model.id == state.prop_model_to_delete.id
			})
			state.model[state.prop_model_to_delete.key].splice(index, 1)
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
	},
	actions: {
		getModels({ commit, state }) {
			commit('setLoading', true)
			return axios.get(`/api/${generals.methods.routeString(state.model_name)}`)
			.then(res => {
				commit('setLoading', false)
				commit('setModels', res.data.models)
			})
			.catch(err => {
				commit('setLoading', false)
				console.log(err)
			})
		},
		delete({ commit, state }) {
			return axios.delete(`/api/${generals.methods.routeString(state.model_name)}/${state.delete.id}`)
			.then(() => {
				commit('delete')
				commit('setToShow')
			})
			.catch((err) => {
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
		deletePropModel({ commit, state }) {
			return axios.delete(`/api/${generals.methods.routeString(state.prop_model_to_delete.has_many.model_name)}/${state.prop_model_to_delete.id}`)
			.then(res => {
				commit('deletePropModel')
			})
			.catch(err => {
				console.log(err)
			})
		}
	},
}
