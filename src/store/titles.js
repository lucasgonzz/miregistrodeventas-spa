import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
export default {
	namespaced: true,
	state: {
		titles: [],
		detele: {},
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
		setDelete(state, value) {
			state.delete = value
		},
		delete(state) {
			let index = state.titles.findIndex(title => {
				return title.id == state.delete.id
			})
			state.titles.splice(index, 1)
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
		},
		delete({ commit, state }) {
			return axios.delete('api/titles/'+state.delete.id)
			.then(res => {
				commit('delete')
			})
			.catch(err => {
				console.log(err)
			})
		},
	}
}