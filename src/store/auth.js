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
		},
		user(state) {
			return state.user
		}
	},
	mutations: {
		setAuthenticated(state, value) {
			state.authenticated = value
		},
		setUser(state, value) {
			state.user = value
			console.log('se cargo el usuario desde setUser()')
		}
	},
	actions: {
		me({commit}) {
			return axios.get('/api/user')
			.then(res => {
				commit('setAuthenticated', true)
				commit('setUser', res.data)
				console.log('se cargo el usuario desde me()')
			})
			.catch(() => {
				commit('setAuthenticated', false)
				commit('setUser', {})
			})
		}
	},
	modules: {
	}
}
