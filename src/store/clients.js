import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8000'
export default {
	namespaced: true,
	state: {
		clients: [],
		clients_loaded: false
	},
	getters: {
	},
	mutations: {
		setClients(state, value) {
			state.clients = value
		},
		setClientsLoaded(state, value) {
			state.clients_loaded = value
		},
	},
	actions: {
		getClients({commit}) {
			axios.get('api/clients')
			.then(res => {
				commit('setClients', res.data)
				commit('setClientsLoaded', true)
				console.log('Se cargaron clientes')
			})
			.catch(err => {
				console.log(err)
			})
		},
	},
	modules: {
	}
}
