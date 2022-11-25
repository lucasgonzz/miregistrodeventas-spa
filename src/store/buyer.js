import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL

import message_store from '@/store/message'
import generals from '@/mixins/generals'
export default {
	namespaced: true,
	state: {
		model_name: 'buyer',

		models: [],
		model: {},
		to_show: [],
		selected: [],

		delete: null,
		delete_image: null,

		messages_not_read: 0,

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
		addMessage(state, message) {
			let index = state.models.findIndex(b => {
				return b.id == message.buyer_id
			})
			if (index != -1) {
				let repeated = state.models[index].messages.findIndex(m => {
					return m.id == message.id
				})
				if (repeated == -1) {
					state.models[index].messages.push(message) 
				}
			}
		},
		setMessagesNotRead(state) {
			state.messages_not_read = 0
			state.models.forEach(buyer => {
				buyer.messages.forEach(message => {
					if (message.from_buyer && !message.read) {
						state.messages_not_read++
					}
				})
			})
		},
		setMessagesRead(state, buyer) {
			let index = state.models.findIndex(b => {
				return b.id == buyer.id
			})
			state.models[index].messages.forEach(message => {
				if (message.from_buyer && !message.read) {
					message.read = 1
				}
			})
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
	},
	actions: {
		getModels({ commit, state }) {
			commit('setLoading', true)
			return axios.get(`/api/${generals.methods.routeString(state.model_name)}`)
			.then(res => {
				commit('setLoading', false)
				commit('setModels', res.data.models)
				commit('setToShow')
				commit('setMessagesNotRead')
				commit('message/setChatsToShow', null, {root: true})
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
