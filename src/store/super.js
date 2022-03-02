import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
export default {
	namespaced: true,
	state: {
		commerces: [],
		commerce_edit: {},
		plans: [],
		permissions: [],
		plan_permissions: {},
	},
	mutations: {
		setCommerces(state, value) {
			state.commerces = value
		},
		setCommerceEdit(state, value) {
			state.commerce_edit = value 
		},
		setPlans(state, value) {
			state.plans = value
		},
		updatePlan(state, value) {
			let index = state.plans.findIndex(plan => {
				return plan.id == value.id
			})
			state.plans.splice(index, 1, value)
		},
		updateCommerce(state, value) {
			let index = state.commerces.findIndex(commerce => {
				return commerce.id == value.id
			})
			state.commerces.splice(index, 1, value)
		},
		setPermissions(state, value) {
			state.permissions = value
		},
		setPlanPermissions(state, value) {
			state.plan_permissions = value
		},
	},
	actions: {
		getCommerces({ commit }) {
			return axios.get('api/super/commerces')
			.then(res => {
				commit('setCommerces', res.data.commerces)
			})
			.catch(err => {
				console.log(err)
			})
		},
		getPlans({ commit }) {
			return axios.get('api/super/plans')
			.then(res => {
				console.log(res.data.plans)
				commit('setPlans', res.data.plans)
			})
			.catch(err => {
				console.log(err)
			})
		},
		getPermissions({ commit }) {
			return axios.get('api/super/permissions')
			.then(res => {
				commit('setPermissions', res.data.permissions)
			})
			.catch(err => {
				console.log(err)
			})
		},
	}
}