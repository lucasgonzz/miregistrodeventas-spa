import axios from 'axios'
export default {
	namespaced: true,
	state: {
		conditions: [],
		edit: {},
		delete: {},
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
		setDelete(state, value) {
			state.delete = value
		},
		delete(state) {
			let index = state.conditions.findIndex(item => {
				return item.id == state.delete.id
			})
			state.conditions.splice(index, 1)
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
		},
		delete({ commit, state }) {
			return axios.delete('api/conditions/'+state.delete.id)
			.then(res => {
				commit('delete')
			})
			.catch(err => {
				console.log(err)
			})
		},
	}
}