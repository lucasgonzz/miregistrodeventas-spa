import Vue from 'vue'
import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
// axios.defaults.baseURL = 'https://micovid.online'
// axios.defaults.baseURL = 'http://localhost:8000'
export default {
	namespaced: true,
	state: {
		clients: [],
		clients_to_show: [],
		client_to_edit: {},
		client_to_delete: {},
		saldo_inicial: {},
		search_query: '',
		client_current_acounts: null,
		loading_current_acounts: false,
		loading: false,
	},
	getters: {
	},
	mutations: {
		setSearchQuery(state, value) {
			state.search_query = value
		},
		setClients(state, value) {
			state.clients = value
		},
		setClientsToShow(state, value = null) {
			if (value) {
				state.clients_to_show = value
			} else {
				state.clients_to_show = state.clients
			}
		},
		setClientCurrentAcounts(state, value) {
			// Vue.set(state, 'client_current_acounts', value)
			// state.client_current_acounts = null
			state.client_current_acounts = value
		},
		update(state, updated_client) {
			let index = state.clients.findIndex(client => {
				return client.id == updated_client.id
			})
			state.clients.splice(index, 1, updated_client)
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
			state.client_to_edit = value
		},
		setDelete(state, value) {
			state.client_to_delete = value
		},
		setSaldoInicial(state, value) {
			state.saldo_inicial = value
		},
		delete(state) {
			let index = state.clients.findIndex(client => {
				return client.id == state.client_to_delete.id
			})
			state.clients.splice(index, 1)
		},
		setLoading(state, value) {
			state.loading = value
		},
		addClientsToShow(state) {
			let length = state.clients_to_show.length
			let clients_to_add = state.clients.slice(length, length+10)
			state.clients_to_show = state.clients_to_show.concat(clients_to_add)
		},
	},
	actions: {
		getClients({commit}) {
			commit('setLoading', true)
			return axios.get('api/clients')
			.then(res => {
				console.log(res)
				commit('setClients', res.data.clients)
				commit('addClientsToShow')
				commit('setLoading', false)
			})
			.catch(err => {
				commit('setLoading', false)
				console.log(err)
			})
		},
        getClientCurrentAcounts({ commit }, client) {
            commit('setClientCurrentAcounts', client)
        	commit('setLoadingCurrentAcounts', true)
            return axios.get(`/api/clients/current-acounts/${client.id}`)
            .then(res => {
            	client.current_acounts = res.data.current_acounts
                console.log(res.data.current_acounts)
        		commit('setLoadingCurrentAcounts', false)
                commit('setClientCurrentAcounts', null)
                commit('setClientCurrentAcounts', client)
            })
            .catch(err => {
        		commit('setLoadingCurrentAcounts', false)
                console.log(err)
            })
        },
	},
	modules: {
	}
}
