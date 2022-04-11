import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
export default {
	namespaced: true,
	state: {
		titles: [],
	},
	mutations: {
		setTitles(state, value) {
			state.titles = value
		},
		add(state, value) {
			state.titles.push(value)
		},
		update(state, value) {
			let index = state.titles.findIndex(t => {
				return t.id == value.id
			})
			state.titles.splice(index, 1, value)
		},
	},
	actions: {
		getTitles({ commit }) {
			return axios.get('api/titles')
			.then(res => {
				commit('setTitles', res.data.titles)
			})
			.catch(err => {
				console.log(err)
			})
		}
	}
}