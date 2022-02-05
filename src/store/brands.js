import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
export default {
	namespaced: true,
	state: {
		brands: {},
		edit: {},
	},
	mutations: {
		setBrands(state, value) {
			state.brands = value
			console.log(state.brands)
		},
		add(state, value) {
			state.brands.push(value)
		},
		setEdit(state, value) {
			state.edit = value
		},
		update(state, updated) {
			let index = state.brands.findIndex(brand => {
				return brand.id == updated.id
			})
			state.brands.splice(index, 1, updated)
		},
	},
	actions: {
		getBrands({ commit }) {
			return axios.get('api/brands')
			.then(res => {
				commit('setBrands', res.data.brands)
			})
			.catch(err => {
				console.log(err)
			})
		}
	}
}