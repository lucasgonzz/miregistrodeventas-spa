import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
console.log(process.env.VUE_APP_API_URL)
// axios.defaults.baseURL = 'https://micovid.online'
// axios.defaults.baseURL = 'http://localhost:8000'
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
		}
	},
	actions: {
		me({commit}) {
			// console.log('pidiendo cookie')
			// axios.get('/sanctum/csrf-cookie', {withCredentials: true})
			// .then(() => {
			// 	console.log('se pidio cookie')
			// })
			return axios.get('/api/user')
			.then(res => {
				commit('setAuthenticated', true)
				commit('setUser', res.data)
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
