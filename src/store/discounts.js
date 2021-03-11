import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
export default {
	namespaced: true,
	state: {
		discounts: [],
		edit: {},
	},
	mutations: {
		setDiscounts(state, value) {
			state.discounts = value
		},
		setEdit(state, value) {
			state.edit = value
		},
		update(state, updated) {
			let index = state.discounts.findIndex(discount => {
				return discount.id == updated.id
			})
			state.discounts.splice(index, 1, updated)
		},
		add(state, value) {
			state.discounts.push(value)
		},
	},
	actions: {
		getDiscounts({ commit }) {
			return axios.get('/api/discounts')
			.then(res => {
				commit('setDiscounts', res.data.discounts)
			})
			.catch(err => {
				console.log(err)
			})
		}
	},
	modules: {
	}
}
