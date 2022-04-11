import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
import buyers_store from '@/store/online/buyers'
import online from '@/mixins/online'
export default {
	namespaced: true,
	state: {
		calls: [],
		loading: false,
	},
	mutations: {
		setCalls(state, value) {
			state.calls = value
		},
		add(state, value) {
			let index = state.calls.findIndex(call => {
				return call.id == value.id
			})
			if (index == -1) {
				state.calls.unshift(value)
			}
		},
		remove(state, value) {
			let index = state.calls.findIndex(call => {
				return call.id == value.id
			})
			state.calls.splice(index, 1)
		},
		setLoading(state, value) {
			state.loading = value
		},
	},
	actions: {
		getCalls({ commit, state }) {
			commit('setLoading', true)
			return axios.get('api/calls')
			.then(res => {
				commit('setLoading', false)
				commit('setCalls', res.data.calls)
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
