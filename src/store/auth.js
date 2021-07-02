import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
// axios.defaults.baseURL = 'https://micovid.online'
// axios.defaults.baseURL = 'http://localhost:8000'
export default {
	namespaced: true,
	state: {
		authenticated: false,
		permissions: [],
		user: null,
		schedule_edit: {},
		loading: false,
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
		},
		setLoading(state, value) {
			state.loading = value
		},
		setScheduleEdit(state, value) {
			state.schedule_edit = value
		},
	},
	actions: {
		me({commit}) {
			commit('setLoading', true)
			return axios.get('/api/user')
			.then(res => {
				commit('setLoading', false)
				commit('setAuthenticated', true)
				commit('setUser', res.data.user)
			})
			.catch(() => {
				commit('setLoading', false)
				commit('setAuthenticated', false)
				commit('setUser', null)
			})
		},
		// login({ commit }, user) {
		// 	commit('setAuthenticated', false)
		// 	commit('setLoading', true)
		// 	return axios.post('/login', user)
		// 	.then(res => {
		// 		commit('setLoading', false)
		// 		if (res.data.login == 200) {
		// 			commit('setAuthenticated', true)
		// 			commit('setUser', res.data.user)
		// 		} 
		// 	})
		// 	.catch(err => {
		// 		commit('setLoading', false)
		// 		console.log(err)
		// 	})
		// },
		logout({ commit }) {
			commit('setLoading', true)
			return axios.post('/logout')
            .then(() => {
                commit('setLoading', false)
                commit('setAuthenticated', false)
                commit('setUser', null)
            })
            .catch(err => {
                console.log(err)
            })
		}
	},
	modules: {
	}
}
