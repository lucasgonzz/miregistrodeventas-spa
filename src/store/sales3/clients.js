import axios from 'axios'
import moment from 'moment'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
export default {
	namespaced: true,
	state: {
		selected_seller: {},
		index_clients_to_show: 1,
	},
	mutations: {
		setSelectedSeller(state, value) {
			state.selected_seller = value
		},
		setIndexToShow(state, value) {
			state.index_clients_to_show = value
		},
		incrementIndexClientsToShow(state) {
			state.index_clients_to_show++
		},
	},
	actions: {
	},
	modules: {
	}
}
