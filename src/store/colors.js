import axios from 'axios'
export default {
	namespaced: true,
	state: {
		colors: [],
	},
	mutations: {
		setColors(state, value) {
			state.colors = value
		},
	},
	actions: {
		getColors({ commit }) {
			return axios.get('api/colors')
			.then(res => {
				commit('setColors', res.data.colors)
			})
			.catch(err => {
				console.log(err)
			})
		}
	}
}