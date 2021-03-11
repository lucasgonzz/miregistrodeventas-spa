import axios from 'axios'
import moment from 'moment'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
export default {
	namespaced: true,
	state: {
		selected_seller: {}
	},
	mutations: {
		setSelectedSeller(state, value) {
			state.selected_seller = value
		},
	},
	actions: {
	},
	modules: {
	}
}
