import Vue from 'vue'
import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
import current_acounts from '@/store/clients/current_acounts'
import model from '@/models/client'
export default {
	namespaced: true,
	state: {
		models: [],
		model: {},

		to_show: [],
		to_edit: {},
		delete: {},
		saldo_inicial: {},

		selected_seller: null,
		index_to_show: 1,

		search_query: '',

		client_current_acounts: null,

		loading_current_acounts: false,

		loading: false,
	},
	getters: {
	},
	mutations: {
		setModels(state, value) {
			state.models = value
		},
		add(state, value) {
			state.models.push(value)
		},
		setModel(state, value) {
			if (value) {
				state.model = value 
			} else {
				let obj = {
					id: null
				}
				model.props.forEach(prop => {
					obj[prop.key] = prop.value 
				})
				state.model = obj
			}
		},
		setSearchQuery(state, value) {
			state.search_query = value
		},
		setSelectedSeller(state, value) {
			state.selected_seller = value
		},
		setIndexToShow(state, value) {
			state.index_to_show = value
		},
		incrementIndexToShow(state, value) {
			state.index_to_show++
		},
		setClientsToShow(state, value = null) {
			if (value) {
				state.to_show = value
			} else {
				state.to_show = state.models
			}
		},
		setClientCurrentAcounts(state, value) {
			state.client_current_acounts = value
		},
		update(state, updated_client) {
			let index = state.models.findIndex(client => {
				return client.id == updated_client.id
			})
			state.models.splice(index, 1, updated_client)
		},
		setLoadingCurrentAcounts(state, value) {
			state.loading_current_acounts = value
		},
		addCurrentAcounts(state, value) {
			state.client_current_acounts.current_acounts = value
		},
		setEdit(state, value) {
			if (!value.seller_id) {
				value.seller_id = 0
			}
			if (!value.iva_id) {
				value.iva_id = 0
			}
			state.to_edit = value
		},
		setDelete(state, value) {
			state.delete = value
		},
		setSaldoInicial(state, value) {
			state.saldo_inicial = value
		},
		delete(state) {
			let index = state.models.findIndex(client => {
				return client.id == state.delete.id
			})
			state.models.splice(index, 1)
		},
		setLoading(state, value) {
			state.loading = value
		},
		addClientsToShow(state) {
			let length = state.to_show.length
			let clients_to_add = state.models.slice(length, length+10)
			state.to_show = state.to_show.concat(clients_to_add)
		},
	},
	actions: {
		getModels({commit}) {
			commit('setLoading', true)
			return axios.get('api/clients')
			.then(res => {
				console.log(res)
				commit('setModels', res.data.clients)
				commit('addClientsToShow')
				commit('setLoading', false)
			})
			.catch(err => {
				commit('setLoading', false)
				console.log(err)
			})
		},
		delete({ commit, state }) {
			return axios.delete('api/clients/'+state.delete.id)
			.then(res => {
				commit('delete')
			})
			.catch(err => {
				console.log(err)
			})
		},
	},
	modules: {
		current_acounts,
	}
}
