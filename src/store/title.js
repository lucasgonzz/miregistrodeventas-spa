import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
export default {
	namespaced: true,
	state: {
		title: {},
	},
	mutations: {
		setTitle(state, value) {
			state.title = value
		},
		update(state, value) {
			state.title = value
		},
	},
	actions: {
		getTitle({ commit }) {
			return axios.get('api/titles')
			.then(res => {
				commit('setTitle', res.data.title)
			})
			.catch(err => {
				console.log(err)
			})
		}
	}
}