import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
export default {
	namespaced: true,
	state: {
		schedules: [],
		edit: {},
		delete: null,
		selected: {},
	},
	mutations: {
		setSchedules(state, value) {
			state.schedules = value
		},
		update(state, value) {
			let index = state.schedules.findIndex(schedule => {
				return schedule.id == value.id
			})
			state.schedules.splice(index, 1, value)
		},
		setEdit(state, value) {
			state.edit = value
		},
		add(state, value) {
			state.schedules.push(value)
		},
		setSelected(state, value) {
			state.selected = value
		},
		setDelete(state, value) {
			state.delete = value 
		},
		delete(state) {
			let index = state.schedules.findIndex(item => {
				return item.id == state.delete.id 
			})
			state.schedules.splice(index, 1)
		}
	},
	actions: {
		getSchedules({ commit }) {
			return axios.get('api/schedules')
			.then(res => {
				commit('setSchedules', res.data.schedules)
			})
			.catch(err => {
				console.log(err)
			})
		},
		delete({commit, state}) {
			return axios.delete('api/schedules/'+state.delete.id)
			.then(() => {
				commit('delete')
			})
			.catch(err => {
				console.log(err)
			})
		}
	}
}