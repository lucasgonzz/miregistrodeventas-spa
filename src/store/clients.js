import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
export default {
	namespaced: true,
	state: {
		models: [],
		model: {},

		selected_seller: {},
		index_to_show: 1,

		delete: null,

		loading: false,
	},
	mutations: {
		setLoading(state, value) {
			state.loading = value
		},
		setModel(state, value = null) {
			if (value) {
				state.model = value
			} else {
				state.model = {
					id: null,
					name: '',
					description: '',
					price: '',
				}
			}
		},
		setModels(state, value) {
			state.models = value
		},
		add(state, value) {
			state.models.unshift(value)
		},
		setDelete(state, value) {
			state.delete = value
		},
		setEdit(state, value) {
			state.edit = value
		},
		delete(state) {
			let index = state.models.findIndex(model => {
				return model.id == state.delete.id
			})
			state.models.splice(index, 1)
		},
		update(state, updated) {
			let index = state.models.findIndex(item => {
				return item.id == updated.id
			})
			state.models.splice(index, 1, updated)
		},
		setSelectedSeller(state, value) {
			state.selected_seller = value
		},
		setIndexToShow(state, value) {
			state.index_to_show = value
		},
		incrementIndexToShow(state) {
			state.index_to_show++
		},
	},
	actions: {
		getModels({ commit }) {
			commit('setLoading', true)
			return axios.get('/api/delivery-zones')
			.then(res => {
				commit('setLoading', false)
				commit('setModels', res.data.delivery_zones)
			})
			.catch(err => {
				commit('setLoading', false)
				console.log(err)
			})
		},
		delete({ commit, state }) {
			return axios.delete('/api/delivery-zones/'+state.delete.id)
			.then(() => {
				commit('delete')
			})
			.catch((err) => {
				console.log(err)
			})
		},
	},
}
