import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
export default {
	namespaced: true,
	state: {
		tags: [],
		loading: false,
	},
	mutations: {
		setLoading(state, value) {
			state.loading = value
		},
		setTags(state, value) {
			state.tags = value
		},
		add(state, value) {
			state.tags.push(value)
		},
	},
	actions: {
		getTags({ commit }) {
			commit('setLoading', true)
			return axios.get('/api/tags')
			.then(res => {
				commit('setLoading', false)
				commit('setTags', res.data.tags)
			})
			.catch(err => {
				commit('setLoading', false)
				console.log(err)
			})
		}
	},
	modules: {
	}
}
