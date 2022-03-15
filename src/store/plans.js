import Vue from 'vue'
import axios from 'axios'
axios.defaults.baseURL = process.env.VUE_APP_API_URL
axios.defaults.withCredentials = true
export default {
	namespaced: true,
	state: {
		plans: [],
		selected: null,
	},
	mutations: {
		setPlans(state, value) {
			state.plans = value
		},
		setSelected(state, value) {
			state.selected = value
		},
	},
	actions: {
		getPlans({ commit }) {
			axios.get('/api/plans')
			.then(res => {
				commit('setPlans', res.data.plans)
			})
			.catch(err => {
				console.log(err)
			})
		}
	}
}