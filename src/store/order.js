import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL

import moment from 'moment'
import generals from '@/mixins/generals'
export default {
	namespaced: true,
	state: {
		model_name: 'order',

		models: [],
		unconfirmed_models: [],
		model: {},
		to_show: [],
		selected: [],

		from_date: moment().format('YYYY-MM-DD'),
		until_date: '',

		delete: null,
		delete_image: null,

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
		setUnconfirmedModels(state, value) {
			if (value) {
				state.unconfirmed_models = value
			} else {
				state.unconfirmed_models = []
			}
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
		setSelected(state, value) {
			state.selected = []
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
			let index = state.models.findIndex(model => {
				return model.id == state.delete.id
			})
			state.models.splice(index, 1)
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
		setFromDate(state, value) {
			state.from_date = value
		},
		setUntilDate(state, value) {
			state.until_date = value
		},
	},
	actions: {
		getModels({ commit, state }) {
			commit('setLoading', true)
			let url = '/api/'+generals.methods.routeString(state.model_name)+'/'+state.from_date
			if (state.until_date != '') {
				url += '/'+state.until_date
			}
			return axios.get(url)
			.then(res => {
				commit('setLoading', false)
				commit('setModels', res.data.models)
			})
			.catch(err => {
				commit('setLoading', false)
				console.log(err)
			})
		},
		getUnconfirmedModels({ commit, state }) {
			commit('setLoading', true)
			let url = '/api/'+generals.methods.routeString(state.model_name)+'-unconfirmed'
			return axios.get(url)
			.then(res => {
				commit('setLoading', false)
				commit('setUnconfirmedModels', res.data.models)
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
	},
}
