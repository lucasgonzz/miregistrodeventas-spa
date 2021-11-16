import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
export default {
	namespaced: true,
	state: {
		workdays: [],
		selected: {},
	},
	mutations: {
		setWorkdays(state, value) {
			state.workdays = value
		},
		update(state, value) {
			let index = state.workdays.findIndex(workday => {
				return workday.id == value.id
			})
			state.workdays.splice(index, 1, value)
		},
		setSelected(state, value) {
			state.selected = value
		},
	},
	actions: {
		getWorkdays({ commit }) {
			return axios.get('api/workdays')
			.then(res => {
				commit('setWorkdays', res.data.workdays)
			})
			.catch(err => {
				console.log(err)
			})
		}
	}
}