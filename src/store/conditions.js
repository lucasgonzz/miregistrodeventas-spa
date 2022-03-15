import axios from 'axios'
export default {
	namespaced: true,
	state: {
		conditions: [],
		edit: {},
	},
	mutations: {
		setConditions(state, value) {
			state.conditions = value
		},
		add(state, value) {
			state.conditions.push(value)
		},
		setEdit(state, value) {
			state.edit = value
		},
		update(state, updated) {
			let index = state.conditions.findIndex(condition => {
				return condition.id == updated.id
			})
			state.conditions.splice(index, 1, updated)
		},
	},
	actions: {
		getConditions({ commit }) {
			return axios.get('api/conditions')
			.then(res => {
				commit('setConditions', res.data.conditions)
			})
			.catch(err => {
				console.log(err)
			})
		}
	}
}