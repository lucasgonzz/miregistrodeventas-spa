import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8000'
export default {
	namespaced: true,
	state: {
		authenticated: false,
		permissions: [],
		user: {}
	},
	getters: {
		authenticated(state) {
			return state.authenticated
		}
	},
	mutations: {
		setAuthenticated(state, value) {
			state.authenticated = value
		},
		setUser(state, value) {
			state.user = value
		}
	},
	actions: {
		me({commit}) {
			return axios.get('/api/user')
			.then(res => {
				console.log('si')
				commit('setAuthenticated', true)
				commit('setUser', res.data)
			})
			.catch(() => {
				console.log('no')
				commit('setAuthenticated', false)
				commit('setUser', {})
			})
		}
	},
	modules: {
	}
}
