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
		},
	},
	mutations: {
		setAuthenticated(state, value) {
			state.authenticated = value
		},
		setUser(state, value) {
			state.user = value
		},
		addAddress(state, value) {
			state.user.addresses.push(value)
		},
		deleteAddress(state, value) {
			let index = state.user.addresses.findIndex(address => {
				return address.id == value.id
			})
			state.user.addresses.splice(index, 1)
		},
		setUserWorkdaysId(state) {
			state.user.workdays_id = []
			state.user.workdays.forEach(workday => {
				state.user.workdays_id.push(workday.id)
			})
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
				// commit('setUserWorkdaysId')
			})
			.catch(() => {
				commit('setLoading', false)
				commit('setAuthenticated', false)
				commit('setUser', null)
			})
		},
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
