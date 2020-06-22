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
			console.log('arranco')
			axios.get('/api/user')
			.then(res => {
				commit('setAuthenticated', true)
				commit('setUser', res.data)
				console.log('logeado')
			})
			.catch(() => {
				commit('setAuthenticated', false)
				commit('setUser', {})
				// this.$router.push({name: 'Login'})
				console.log('no logeado')
			})
		}
	},
	modules: {
	}
}
