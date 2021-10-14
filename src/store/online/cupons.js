import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
export default {
	namespaced: true,
	state: {
		active_cupons: [],
		new_cupon: {
			amount: '',
			percentage: '',
			buyers: [],
			expiration_date: '',
		},
		delete: {},
		loading: false,
	},
	mutations: {
		setActiveCupons(state, value) {
			state.active_cupons = value
		},
		addActiveCupons(state, cupons) {
			cupons.forEach(cupon => {
				state.active_cupons.push(cupon)
			})
		},
		setLoading(state, value) {
			state.loading = value
		},
		clear(state) {
			state.new_article = {
				amount: '',
				percentage: '',
				buyers: [],
				expiration_date: '',
			}
		},
		setDelete(state, value) {
			state.delete = value
		},
		delete(state) {
			let index = state.active_cupons.findIndex(cupon => {
				return cupon.id == state.delete.id
			})
			state.active_cupons.splice(index, 1)
		},
	},
	actions: {
		getActiveCupons({ commit }) {
			commit('setLoading', true)
			axios.get('/api/cupons')
			.then(res => {
				commit('setLoading', false)
				commit('setActiveCupons', res.data.cupons)
				console.log('getActiveCupons', res.data.cupons)
			})
			.catch(err => {
				commit('setLoading', false)
				console.log(err)
			})
		},
	},
	modules: {
	}
}
