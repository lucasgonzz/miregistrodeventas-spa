import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
export default {
	namespaced: true,
	state: {
		permissions: [],
	},
	mutations: {
		setPermissions(state, value) {
			state.permissions = value
		}
	},
	actions: {
		getPermissions({ commit }) {
			return axios.get('/api/permissions')
			.then(res => {
				console.log(res)
				commit('setPermissions', res.data.permissions)
			})
			.catch(err => {
				console.log(err)
			})
		}
	},
	modules: {
	}
}
